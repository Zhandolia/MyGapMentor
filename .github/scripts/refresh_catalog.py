"""Refresh public listings, preserving each source's last successful snapshot.

Uses organizer metadata only; never infers application eligibility or deadlines.
No third-party packages, credentials, LLM, or browser session required.
"""
import concurrent.futures
import datetime as dt
import hashlib
import json
import re
import sys
import urllib.error
import urllib.request
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUTPUT = ROOT / 'src/catalog-feed.json'
HEADERS = {'User-Agent': 'MyGapMentor/1.0 public catalog (+https://github.com/Zhandolia/MyGapMentor)'}


def fetch(url, api=False):
    headers = dict(HEADERS)
    if api:
        headers['Accept'] = 'application/vnd.api+json; version=1'
    with urllib.request.urlopen(urllib.request.Request(url, headers=headers), timeout=35) as response:
        body = response.read(16_000_001)
    if len(body) > 16_000_000:
        raise ValueError('Source response exceeded size limit')
    return json.loads(body) if api else body.decode('utf-8')


def clean(value, limit=180):
    return re.sub(r'\s+', ' ', str(value)).strip()[:limit]


class MLHEvents(HTMLParser):
    def __init__(self):
        super().__init__()
        self.events, self.current, self.heading = [], None, False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'a' and attrs.get('itemtype') == 'https://schema.org/Event':
            self.current = {'name': '', 'text': ''}
        if self.current is not None:
            if tag == 'meta' and attrs.get('itemprop'):
                self.current[attrs['itemprop']] = attrs.get('content', '')
            if tag in ('h3', 'h4'):
                self.heading = True

    def handle_endtag(self, tag):
        if tag in ('h3', 'h4'):
            self.heading = False
        if tag == 'a' and self.current is not None:
            self.events.append(self.current)
            self.current = None

    def handle_data(self, data):
        if self.current is not None:
            self.current['text'] += ' ' + data
            if self.heading:
                self.current['name'] += data


def base(ident, title, provider, source, now):
    return dict(id=ident, title=clean(title), provider=provider, source=source,
                checked=now[:10], sourceCheckedAt=now, active=True)


def mlh(now):
    date = dt.date.fromisoformat(now[:10])
    season = date.year + (date.month >= 7)
    events = []
    for year in (season, season + 1):
        source = f'https://www.mlh.com/seasons/{year}/events'
        try:
            page = fetch(source)
        except urllib.error.HTTPError as error:
            if year > season and error.code == 404:
                continue
            raise
        parser = MLHEvents()
        parser.feed(page)
        if not parser.events:
            if year > season:
                continue
            raise ValueError('MLH event markup missing; keeping previous snapshot')
        for event in parser.events:
            start, end = event.get('startDate', '')[:10], event.get('endDate', '')[:10]
            try:
                dt.date.fromisoformat(start)
                dt.date.fromisoformat(end)
            except ValueError:
                raise ValueError('MLH date schema changed')
            if end < now[:10]:
                continue
            url = event.get('url', '')
            if not url.startswith(('https://', 'http://')) or not event['name']:
                raise ValueError('MLH event missing name or URL')
            key = hashlib.sha256((url + start).encode()).hexdigest()[:20]
            record = base('live-mlh-' + key, event['name'], 'mlh', source, now)
            record.update(url=url, eventDate=start, endDate=end,
                          format='Remote' if 'OnlineEvent' in event.get('eventAttendanceMode', '') else 'Local',
                          location=clean(', '.join(filter(None, [event.get('addressLocality'), event.get('addressRegion'), event.get('addressCountry')]))),
                          highSchool='HIGH SCHOOL' in event['text'].upper())
            events.append(record)
    return list({event['id']: event for event in events}.values())


def zooniverse(now):
    root = 'https://www.zooniverse.org/api/projects?launch_approved=true&live=true&page_size=100'
    first = fetch(root + '&page=1', True)
    meta = first.get('meta', {}).get('projects', {})
    pages = meta.get('page_count')
    if not isinstance(pages, int) or not 1 <= pages <= 50 or not isinstance(first.get('projects'), list):
        raise ValueError('Zooniverse pagination schema changed')
    projects = first['projects']
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
        for page in pool.map(lambda number: fetch(root + f'&page={number}', True), range(2, pages + 1)):
            if not isinstance(page.get('projects'), list):
                raise ValueError('Zooniverse project page missing')
            projects.extend(page['projects'])
    if len(projects) < meta.get('count', 0):
        raise ValueError('Incomplete Zooniverse pagination; keeping previous snapshot')
    records = []
    for project in projects:
        if (project.get('private') is not False or project.get('launch_approved') is not True
                or project.get('live') is not True or project.get('state') != 'live'
                or project.get('completeness', 1) >= 1 or project.get('redirect')
                or not project.get('links', {}).get('active_workflows')):
            continue
        slug = project.get('slug', '')
        if not re.fullmatch(r'[a-zA-Z0-9_-]+/[a-zA-Z0-9_-]+', slug):
            continue
        url = 'https://www.zooniverse.org/projects/' + slug
        record = base('live-zoo-' + str(project['id']), project['display_name'], 'zooniverse', url, now)
        record.update(url=url, tags=[clean(tag, 40) for tag in project.get('tags', [])[:20]], format='Remote')
        records.append(record)
    if not records:
        raise ValueError('No active Zooniverse records parsed; keeping previous snapshot')
    return records


def refresh(previous, loaders, now):
    sources, records, failures = {}, [], []
    cutoff = (dt.date.fromisoformat(now[:10]) - dt.timedelta(days=730)).isoformat()
    for name, loader in loaders.items():
        old = [op for op in previous.get('opportunities', []) if op.get('provider') == name]
        try:
            current = loader(now)
            ids = {op['id'] for op in current}
            # Preserve retired records for saved links; they no longer rank as active.
            retired = [{**op, 'active': False} for op in old if op['id'] not in ids and op.get('checked', now[:10]) >= cutoff]
            records.extend(current + retired)
            sources[name] = {'status': 'ok', 'lastSuccessAt': now, 'activeCount': len(current)}
        except Exception as error:
            records.extend(old)
            sources[name] = {**previous.get('sources', {}).get(name, {}), 'status': 'error',
                             'error': clean(str(error), 180)}
            failures.append(name)
    return {'version': 1, 'generatedAt': now, 'sources': sources,
            'opportunities': sorted(records, key=lambda op: op['id'])}, failures


if __name__ == '__main__':
    previous = json.loads(OUTPUT.read_text(encoding='utf-8')) if OUTPUT.exists() else {}
    now = dt.datetime.now(dt.timezone.utc).isoformat(timespec='seconds').replace('+00:00', 'Z')
    result, failures = refresh(previous, {'mlh': mlh, 'zooniverse': zooniverse}, now)
    OUTPUT.write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    for source, status in result['sources'].items():
        print(source + ': ' + json.dumps(status))
    print(f"Stored {len(result['opportunities'])} records")
    sys.exit(1 if failures else 0)
