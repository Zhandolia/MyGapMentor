import unittest
from refresh_catalog import MLHEvents, refresh


class RefreshTests(unittest.TestCase):
    def test_mlh_microdata(self):
        parser = MLHEvents()
        parser.feed('<a itemScope="" itemType="https://schema.org/Event"><meta itemProp="startDate" content="2027-01-01T12:00:00Z"/><h4>Test &amp; Build</h4></a>')
        self.assertEqual(parser.events[0]['name'], 'Test & Build')
        self.assertEqual(parser.events[0]['startDate'], '2027-01-01T12:00:00Z')

    def test_failure_retains_last_good_records_and_timestamp(self):
        old = {'opportunities': [{'id': 'old', 'provider': 'mlh', 'active': True}],
               'sources': {'mlh': {'lastSuccessAt': '2026-09-24T00:00:00Z'}}}
        def fail(now):
            raise ValueError('Source unavailable')
        result, failures = refresh(old, {'mlh': fail}, '2026-09-25T00:00:00Z')
        self.assertEqual(result['opportunities'], old['opportunities'])
        self.assertEqual(result['sources']['mlh']['lastSuccessAt'], old['sources']['mlh']['lastSuccessAt'])
        self.assertEqual(failures, ['mlh'])

    def test_removed_records_are_retired_without_breaking_saved_links(self):
        old = {'opportunities': [{'id': 'old', 'provider': 'mlh', 'active': True}]}
        result, failures = refresh(old, {'mlh': lambda now: [{'id': 'new', 'provider': 'mlh', 'active': True}]}, '2026-09-25T00:00:00Z')
        self.assertFalse(next(op for op in result['opportunities'] if op['id'] == 'old')['active'])
        self.assertTrue(next(op for op in result['opportunities'] if op['id'] == 'new')['active'])
        self.assertFalse(failures)
