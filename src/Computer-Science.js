import React from 'react';
import './App.css';
import logo from './favicon.ico';

function ComputerScience({categoryData, setCategoryData}){
    console.log(categoryData)
    return(
    <div id="grad1" className="App">
      <div className="navbar">
        <div className="navbar-left">
          <div className="home-logo-group">
            <a href="/">
              <img src={logo} alt="Logo" className="navbar-logo" />
            </a>
            <a href="/">MyGapMentor</a>
          </div>
          </div>
          <div className="navbar-center">
            <a href="about">About us</a>
            <a href="stories">Success Stories</a>
            <a href="plans">Plans</a>
            <a href="contact">Contact us</a>
          </div>

          <div className="navbar-right">
            <a href="account">Account</a>
          </div>
      </div>

      <h2>Computer Science</h2>

      <div class="pp">Personal Plan</div>

      <div className="personal-plan">
        <a className="personal-plan-title">pp-title</a>
      </div>

      <h2 id='activ-title'>Internships</h2>

      <div className="cs-internships">

        <div className="cs-internship">
          <a className='intern-title' target="_blank" href="https://buildyourfuture.withgoogle.com/programs/computer-science-summer-institute">1. Google Computer Science Summer Institute (CSSI)</a>
          <p><strong>Application Deadline:</strong> N/A</p>
          <p><strong>Duration:</strong> Four weeks</p>
          <p>
          CSSI is a four-week introduction to computer science for rising college freshmen, particularly those who have been marginalized in the field. The program is intended to provide an intensive, interactive experience in computer science and inspire them to earn a degree in tech, as well as help them build their technical skills and confidence. Participants will also get an inside look at Google’s environment and culture.
          </p>
        </div>

        <div className="cs-internship">
        <a className='intern-title' target="_blank" href="https://careers.microsoft.com/v2/global/en/discoveryprogram">2. Microsoft High School Internship Program</a>
          <p><strong>Application Deadline:</strong></p>
          <p><strong>Duration:</strong> </p>
          <p><strong>Location:</strong> Redmond, Washington</p>
          <p>
          During this 4-week internship, Discoverers will be introduced to core computer science concepts and develop career readiness skills while gaining mentorship from Microsoft employees. You will discover how your passions can evolve into a career in tech at Microsoft and beyond.
          </p>
          <p>
          Microsoft’s High School Discovery Program is open to rising first-year students of a bachelor’s degree program (graduating high school seniors) that live within 50 miles of Redmond, Washington and who have an interest in technology. Students must be at least 16 years old and have a legal right to work in the U.S. for the duration of the program. Applicants will be paid and should be available to work full-time for 4 consecutive weeks (July 10 - August 4, 2023).
          </p>
        </div>

        <div className="cs-internship">
        <a className='intern-title' target="_blank" href="https://intern.nasa.gov">3. NASA Internships for High School Students</a>
          <p><strong>Application Deadline:</strong> </p>
          <p><strong>Duration:</strong> </p>
          <p>
          NASA Office of STEM Engagement (OSTEM) paid internships allow high school and college-level students to contribute to agency projects under the guidance of a NASA mentor.
          </p>
          <p>Intern Information</p>
          <ul>
            <li>Applicants for this internship must be U.S. Citizens and meet a minimum 3.0 GPA requirement.</li>
            <li>These paid internships are offered across NASA facilities in fall, spring, and summer sessions.</li>
            <li>One application is viewed agencywide.</li>
            <li>OSTEM interns may receive a stipend based on academic level and session length.</li>
            <li>Prior experience is not required.</li>
            <li>Applicants must be a full-time student (high school through graduate-level) or a part-time college-level student enrolled in a minimum of 6 semester hours.</li>
            <li>Opportunities are available at the high school, undergraduate, graduate, and educator levels.</li>
            <li>NASA also sponsors interns at the Jet Propulsion Laboratory (JPL) in California. To learn more or apply, click <a target='_blank' href="https://www.jpl.nasa.gov/edu/intern/" class="my-link">here</a>.</li>

          </ul>
        </div>

        <div className="cs-internship">
          <a className='intern-title' target="_blank" href="https://metasummeracademy.com/eligibility-3/about-3/">4. Meta Summer Academy</a>
          <p><strong>Application Deadline:</strong> March 1</p>
          <p><strong>Duration:</strong> Six weeks (June through July)</p>
          <p>
          Externs of Meta Summer Academy (formerly known as Facebook Summer Academy) will have the opportunity to learn about the day-to-day operations of one of the world’s leading social media networks by being part of a dynamic workforce. Externs will work closely with Meta Summer Academy Mentors in their respective capacities to gain real-world work experience and on-the-job skills that will help propel them into successful careers. Our goal is to inspire and motivate young people to achieve economic success, stability, and mobility through skills development and early career exploration in the tech industry.
          </p>
        </div>

        <div className="cs-internship">
        <a className='intern-title' target="_blank" href="https://engineering.nyu.edu/academics/programs/k12-stem-education/computer-science-cyber-security-cs4cs">5. Computer Science for Cyber Security (CS4CS)</a>
          <p><strong>Application Deadline:</strong> N/A</p>
          <p><strong>Duration:</strong> Three weeks</p>
          <p><strong>Eligibility:</strong> NYC residents</p>
          <p>
          CS4CS is an introduction to the fundamentals of cybersecurity and computer science for high school students with any or no background experience in cybersecurity or computer programming. Throughout the program, students will learn from lessons focused on a spectrum of topics such as “white-hat” hacking, cryptography, steganography, digital forensics, privacy, data usage, and other issues relevant to the fast-growing cyber industry.
          </p>
        </div>

        <div className="cs-internship">
        <a className='intern-title' target="_blank" href="https://www.nist.gov/iaao/summer-high-school-intern-program-research">6. National Institute of Standards and Technology (NIST) Summer High School Intern Program Research</a>
          <p><strong>Application Deadline:</strong> February 14</p>
          <p><strong>Duration:</strong> Eight weeks (June through August)</p>
          <p>Divided into six NIST laboratories, NIST performs research in a variety of engineering and physical sciences topics. Through this program, students may work in any of these laboratories:</p>
          <ul>
            <li>Communications Technology Laboratory (CTL)</li>
            <li>Engineering Laboratory (EL)</li>
            <li>Information Technology Laboratory (ITL)</li>
            <li>Material Measurement Laboratory (MML)</li>
            <li>NIST Center for Neutron Research (NCNR)</li>
            <li>Physical Measurement Laboratory (PML)</li>
          </ul>
          <p>Students apply to the specific lab that interests them. The program is open to high school juniors and seniors with an interest in scientific research.</p>
        </div>

        <div className="cs-internship">
        <a className='intern-title' target="_blank" href="https://www.intelligencecareers.gov/nsa/students-and-internships">7. National Security Agency Student Programs</a>
          <p><strong>Application Deadline:</strong> October 31</p>
          <p><strong>Duration:</strong> Varies</p>
          <p>
          {
          "The NSA provides a number of opportunities for students, including internships and " +
          "scholarships. (Bear in mind that the Agency selects candidates for its programs up to a year in " +
          "advance, so students should apply early for a better chance at acceptance.) "
          }
          </p>
          <p>
          {
          "One notable opportunity is the Stokes Program, open to high school seniors, especially minority " +
          "students, who intend to major in computer science or computer/electrical engineering. Your " +
          "college costs will be fully compensated up to $30k per year and you’ll earn a year-round salary. " +
          "In return, you must work at the NSA for at least 1.5 times the length of study upon graduation. " +
          "Participants are also required to work at the NSA during their summer breaks. To participate, " +
          "students must have certain minimum GPAs and test scores."
          }
          </p>
        </div>

        <div className="cs-internship">
          <a className='intern-title' target="_blank" href="https://www.bu.edu/summer/high-school-programs/rise-internship-practicum/internship-track/">8. Research in Science &amp; Engineering (RISE) Internship</a>
          <p><strong>Application Deadline:</strong> February 14</p>
          <p><strong>Duration:</strong> Six weeks (July through August)</p>
          <p>
          "A six-week program for academically-motivated rising seniors, RISE gives students the opportunity to conduct real research under the guidance of Boston University faculty, postdoctoral fellow, or graduate student mentor. There are a number of STEM tracks available, including computer science."
          </p>
          <p>
          "In addition to partaking in a research project, you’ll present your work at a Poster Symposium and may even be able to submit it to national contests. You’ll also participate in weekly workshops that will help you gain insight and skills necessary for being a valuable contributor to the STEM community."
          </p>
        </div>

        <div className="cs-internship">
        <a className='intern-title' target="_blank" href="https://www.sandia.gov/careers/career-possibilities/students-and-postdocs/internships-co-ops/">9. Sandia Internships</a>
          <p><strong>Application Deadline:</strong> Varies</p>
          <p><strong>Duration:</strong> Varies</p>
          <p>
          "Sandia encourages students from high school to the Ph.D. level to tackle real-world, challenging projects that impact the nation and globe. Interns partake in projects, often at technical institutes, in disciplines like cybersecurity, software development, and more. In their roles, students will receive mentorship and have the opportunity to engage in social activities."
          </p>
          <p>
          "Students will be paid for their work and potentially receive academic credit, along with training and practical work experience. The program is open to high school students 16 years and older—those pursuing R&amp;D and technical positions will need a minimum 3.0 GPA."
          </p>
        </div>

        <div className="cs-internship">
        <a className='intern-title' target="_blank" href="https://www.stonybrook.edu/simons/">10. Simons Summer Research Program</a>
          <p><strong>Application Deadline:</strong> Varies</p>
          <p><strong>Duration:</strong> Seven weeks (June 26 through August 11)</p>
          <p>
          "Participate in hands-on research under the guidance of faculty mentors. In this program, you’ll learn laboratory techniques and tools, be a part of an active research team, and get a taste of college life. Along with their work, apprentices attend weekly faculty talks and participate in events. At the culmination of the program, apprentices produce a written abstract and research poster."
          </p>
          <p>
          "The apprenticeship is open to rising seniors."
          </p>
        </div>

        <div className="cs-internship">
          <a className='intern-title' target="_blank" href="https://www.sparksip.org/">11. Spark Summer Internship Program</a>
          <p><strong>Application Deadline:</strong> April 1</p>
          <p><strong>Duration:</strong> June through August</p>
          <p>
          "Through Spark SIP, high school students will be able to connect with industry experts, educators, and mentors in disciplines like computer science. While participating in research in real-world settings, students receive mentorship from these industry leaders."
          </p>
        </div>

        <div className="cs-internship">
        <a className='intern-title' target="_blank" href="https://www.americaontech.org/tech360.html">12. Tech360</a>
          <p><strong>Application Deadline:</strong></p>
          <ul>
            <li>June 5 – New York City and Los Angeles County</li>
            <li>July 17 – Miami-Dade and Broward County</li>
          </ul>
          <p><strong>Duration:</strong> Three weeks (July and August)</p>
          <p>
          "This three-week program is open to 10th- and 11th-grade students enrolled in New York City (all boroughs), Los Angeles County, Miami-Dade, and Broward County high schools. The program teaches students how to code through web design and development. At the culmination of the program, participants will work in teams to create a website and present it to their peers. Students receive a $500 stipend upon successful completion of the program."
          </p>
        </div>

        <div className="cs-internship">
        <a className='intern-title' target="_blank" href="https://careers.microsoft.com/students/us/en/ushighschoolprogram">13. Microsoft Discovery Program</a>
          <p><strong>Application Deadline:</strong> March 14</p>
          <p><strong>Duration:</strong> Four weeks (July through August)</p>
          <p>
          "The Microsoft Discovery Program is open to rising seniors with an interest in technology who live within 50 miles of Redmond, Washington. Participants will learn the fundamentals of programming and get firsthand experience working at one of the world’s largest technology companies. Students will also receive mentorship from Microsoft employees and build valuable career skills."
          </p>
        </div>

        <div className="cs-internship">
          <a className='intern-title' target="_blank" href="https://careers.mitre.org/us/en/nationwide-high-school-student-program">14. MITRE Nationwide High School Student Program</a>
          <p><strong>Application Deadline:</strong> N/A</p>
          <p><strong>Duration:</strong> Eight weeks (beginning in June)</p>
          <p>
          "The MITRE Nationwide High School Student Program provides students with the chance to participate in a paid, eight-week internship aimed at making the world a safer place. Positions are available in fields such as research, development, engineering, and analysis and are open to students 14 years of age or older."
          </p>
        </div>

        <div className="cs-internship">
        <a className='intern-title' target="_blank" href="https://metasummeracademy.com/">15. Meta Summer Academy</a>
          <p><strong>Application Deadline:</strong> March 1</p>
          <p><strong>Duration:</strong> Six weeks (June through July)</p>
          <p>
          "This awesome opportunity offers students the chance to gain real-world experience working at one of the world’s largest social media companies. Meta Summer Academy participants receive mentorship, build career skills, explore career paths, and learn about the day-to-day operations of a leading technology company."
          </p>
          <p>
          "This program is open to students from:"
          <ul>
            <li>East Palo Alto</li>
            <li>Belle Haven</li>
            <li>North Fair Oaks</li>
            <li>Redwood City</li>
          </ul>
          "Participants must also have a minimum 2.5 GPA."
          </p>
        </div>

        <div className="cs-internship">
        <a className='intern-title' target="_blank" href="https://mites.mit.edu/discover-mites/mites-summer/">16. MITES Summer</a>
          <p><strong>Application Deadline:</strong> February 1</p>
          <p><strong>Duration:</strong> Six weeks (June through August)</p>
          <p>
          This free, on-campus program aims to introduce students from diverse and underrepresented backgrounds to STEM fields at one of the nation’s top schools, MIT. MITES packs a semester of college into one summer program—participants will take five classes along with participating in labs, workshops, special events, and tours. The program is open to super-motivated high school juniors and students from underrepresented backgrounds and underserved communities, along with potential first-generation college students. 
          </p>
        </div>

        <div className="cs-internship">
        <a className='intern-title' target="_blank" href="https://www.cmu.edu/pre-college/academic-programs/computer-science-scholars.html#selection-criteria">17. Carnegie Mellon Computer Science Scholars (CSS)</a>
          <p><strong>Application Deadline:</strong> March 15</p>
          <p><strong>Duration:</strong> Four weeks (July)</p>
          <p>
          Carnegie Mellon’s CSS is a grant-funded, merit-based program that introduces students from backgrounds historically excluded from STEM fields to computer science. Participants learn about the world of computer science through a combination of classroom instruction, hands-on research projects, faculty lectures, and programs in conjunction with the country’s leading tech companies. The program is open to current high school sophomores who are 16 years of age or older. Preference is given to students historically excluded from computer science—for example, certain ethnicities, genders, social classes, or family experiences attending college.
          </p>
        </div>

        <div className="cs-internship">
          <a className='intern-title' target="_blank" href="https://www.theforage.com/">18. Forage Virtual Work Experience Programs </a>
          <p><strong>Application Deadline:</strong> Varies</p>
          <p><strong>Duration:</strong> Five to six hours</p>
          <p><strong>Location:</strong> Online</p>
          <p>
          Forage provides students with bite-sized experiences at some of the world’s top companies in a variety of fields, including computer science. Partners include companies like Electronic Arts, Lyft, and SAP. Programs are just five to six hours long and are designed to provide students with insight into what a day of work is like and the skills needed for a successful career. All Forage programs are open-source and free.
          </p>
        </div>

        <div className="cs-internship">
        <a className='intern-title' target="_blank" href="https://internships.fnal.gov/target/">19. Fermilab TARGET </a>
          <p><strong>Application Deadline:</strong> February 1</p>
          <p><strong>Duration:</strong> Seven weeks (June through August)</p>
          <p>
          TARGET is open to Illinois high school sophomores and juniors with an interest in and aptitude for physics, mathematics, computer science, and engineering. This highly competitive opportunity only selects between 15 and 25 participants annually. Priority is given to minorities underrepresented in the STEM fields and women. To participate, you must be enrolled in an Illinois high school and have a minimum 3.0 GPA.
          </p>
        </div>

        <div className="cs-internship">
        <a className='intern-title' target="_blank" href="https://datascience.uchicago.edu/engage/summerlab/#program-overview">20. Data Science Institute (DSI) Summer Lab at the University of Chicago</a>
          <p><strong>Application Deadline:</strong> February 20</p>
          <p><strong>Duration:</strong> Ten weeks</p>
          <p>
          The DSI Summer Lab program is an immersive 10-week paid summer research program that pairs high school (freshman through seniors), undergraduate, and UChicago Masters students with a data science mentor to work on a research project. Projects are available in a variety of computer-focused fields, such as computer systems and architecture, hardware and devices, and networking. High school participants will earn a $5,625 stipend for participating in the program.
          </p>
        </div>

        <div className="cs-internship">
          <a className='intern-title' target="_blank" href="https://www.bu.edu/summer/high-school-programs/rise-internship-practicum/how-to-apply/">21. Boston University's RISE Internships</a>
          <p><strong>Location:</strong> Boston, MA</p>
          <p><strong>Duration:</strong> Six weeks</p>
          <p>
          Current high school juniors are eligible to apply for BU's Research in Science and Engineering (RISE) internships. The internships are a way to get an in-depth look at university laboratory research for six weeks, working under the guidance of a faculty member, postdoctoral fellow, or graduate student mentor. The research project you work on will culminate in a poster symposium, and you may have the opportunity to submit your work to national science fair competitions as well. Interns will get a lot of hands-on experience at this internship, but a significant drawback is that you don't get paid, and, in fact, must pay nearly $5,000 in tuition costs.
          </p>
        </div>

        <div className="cs-internship">
        <a className='intern-title' target="_blank" href="https://acasummer.com/internships/">22. American Collegiate Adventures Internship Program</a>
          <p><strong>Location:</strong> NYC or Boston</p>
          <p><strong>Duration:</strong> Four weeks</p>
          <p>
          We're always a bit wary of for-profit programs that charge high fees to match students with internships. They're out of reach for many families and, even if you can afford it, you're essentially paying someone to let you work for them. Know that in no way do you need to pay for an internship to get a good job down the line, but if you have the money and interest, they can be a good way to get experience. American Collegiate Adventures is well-reviewed and will match you with an internship tailored to your interests. Internships are full-time and last four weeks. The program also offers the option of room and board, as well as evening activities and weekend excursions.
          </p>
        </div>

      </div>

    <h2 id='activ-title'>Pet Projects</h2>

    <div className="cs-pets">

        <div className="cs-pet">
          <a className='intern-title' target="_blank" href="">1. Mobile Apps</a>
          <p>
            Creating an iOS or Android app can show that you're capable of building something from start to finish. This could be anything from a productivity app, a game, or an app that helps solve a local community problem.
          </p>
          <p>
            For instance, you might develop a mobile app that promotes local tourism, providing information about local attractions, restaurants, and events. This project not only shows your coding abilities, but it also demonstrates a sense of community and creativity.
          </p>
        </div>

        <div className="cs-pet">
        <a className='intern-title' target="_blank" href="">2. Web Development</a>
          <p>
            Building a dynamic website using technologies like HTML/CSS, JavaScript, and backend frameworks like Node.js or Django can be a great project. An example might be a website that offers a unique service or information that isn't currently available or is not well-executed.
          </p>
          <p>
            A unique service website could be a platform that connects local farmers with consumers interested in organic produce. This project would demonstrate not just your coding skills, but also your understanding of databases, user interfaces, and possibly even e-commerce.
          </p>
        </div>

        <div className="cs-pet">
          <a className='intern-title' target="_blank" href="">3. Data Analysis Projects</a>
          <p>
            If you're interested in data science, you might work on a project analyzing a public dataset, predicting trends, or visualizing data. This could involve using tools like Python, R, or SQL, and libraries like Pandas, Matplotlib, or Scikit-learn.
          </p>
          <p>
            You could work on a project that uses public data to analyze environmental issues in your area, such as air quality or water pollution. This would involve extracting data, analyzing it, and presenting it in a clear, easy-to-understand format.
          </p>
        </div>

        <div className="cs-pet">
        <a className='intern-title' target="_blank" href="">4. Machine Learning Projects</a>
          <p>
            More advanced students might consider building a simple machine learning model to predict stock prices, recognize images, or recommend products. This would demonstrate a strong understanding of algorithms and data structures.
          </p>
          <p>
            For example, you could develop a predictive model that uses machine learning to forecast local weather patterns based on historical data. This would show your understanding of complex algorithms and your ability to work with large datasets.
          </p>
        </div>

        <div className="cs-pet">
          <a className='intern-title' target="_blank" href="">5. Open Source Contributions</a>
          <p>
            Contributing to an open source project related to your field of interest can show your ability to work in a team and handle large codebases.
          </p>
          <p>
            You might contribute to an open-source project by adding a new feature, improving functionality, or fixing bugs. This could be a project related to a cause you care about, such as an open-source project that promotes education or environmental sustainability.
          </p>
        </div>

        <div className="cs-pet">
        <a className='intern-title' target="_blank" href="">6. Game Development</a>
          <p>
            Developing a video game, either from scratch or using a game engine like Unity or Unreal Engine, shows creativity and problem-solving skills.
          </p>
          <p>
            Perhaps you could design a game that educates players about a particular topic you're passionate about, such as history or science. This would require coding skills, creativity, and an understanding of what makes a game enjoyable and engaging.
          </p>
        </div>

        <div className="cs-pet">
          <a className='intern-title' target="_blank" href="">7. Automation Tools</a>
          <p>
            Creating a script or bot to automate a mundane task can be an interesting project. For example, a social media bot, an automated data scraper, or a personal assistant bot.
          </p>
          <p>
            For example, you might build a bot that automates checking multiple online sources for the latest news on a specific topic, such as climate change, and compiles the information into a single, easily digestible format.
          </p>
        </div>

        <div className="cs-pet">
        <a className='intern-title' target="_blank" href="">8. Internet of Things (IoT) Projects</a>
          <p>
            If you have access to a Raspberry Pi or Arduino, creating a home automation project, a weather station, or other hardware projects can be quite impressive.
          </p>
          <p>
            An IoT project could be a home automation system that uses sensors to control lighting, heating, and security based on various conditions. This would demonstrate your coding skills, your ability to work with hardware, and your understanding of practical applications for technology.
          </p>
        </div>

        <div className="cs-pet">
        <a className='intern-title' target="_blank" href="">9. Security Projects</a>
          <p>
            Projects that involve ethical hacking or building secure systems can also be interesting if you're passionate about cybersecurity.
          </p>
          <p>
          You could create a project that simulates a simple network and demonstrate how various security measures can protect against different types of cyber attacks. This would show your understanding of network security principles and your ability to think critically about problem-solving.
          </p>
        </div>
        </div>

      <h2 id='activ-title'>Hackathons</h2>

      <div className="cs-hackathons">

        <div className="cs-hackathon">
        <a className='intern-title'>1. Major League Hacking (MLH) Hackathons</a>
        <p><strong>Location:</strong> Varies</p>
          <p>
          <a target='_blank' href="https://mlh.io/" class="my-link">MLH</a> is the official student hackathon league. Each year, they power over 200 weekend-long invention competitions that inspire innovation, cultivate communities, and teach computer science skills to more than 65,000 students around the world. MLH is recognized by many universities and employers.
          </p>
          <p>
          As the official student hackathon league, MLH oversees a vast number of hackathons globally, providing standardized rules and resources. Participating in these hackathons allows you to compete with a diverse group of students and engage with a vast community. Winning at these events would certainly be a significant accomplishment.
          </p>
        </div>

        <div className="cs-hackathon">
        <a className='intern-title'>2. HackMIT</a>
        <p><strong>Location:</strong> Cambridge, Massachusetts</p>
          <p>
          This is one of the biggest collegiate hackathons and is highly competitive. It's hosted by MIT, one of the top universities in the world, especially for tech-related fields.
          </p>
          <p>
          <a target='_blank' href="https://hackmit.org/" class="my-link">HackMIT</a> is MIT's annual hackathon, where students work in teams to create innovative technological solutions to real-world problems. Being accepted to and participating in HackMIT is prestigious due to MIT's reputation as one of the world's leading universities in technology and engineering.
          </p>
        </div>

        <div className="cs-hackathon">
        <a className='intern-title'>3. PennApps</a>
        <p><strong>Location:</strong> Philadelphia, Pennsylvania</p>
          <p>
          Held at the University of Pennsylvania, <a target='_blank' href="https://pennapps.com/" class="my-link">PennApps</a> was the first student-run college hackathon and has grown to be one of the largest in the world.
          </p>
          <p>
          The University of Pennsylvania's PennApps is known as the original college hackathon. The event brings together the best student hackers from across the globe for a weekend of building and sharing. The fact that it's student-run could also show admissions you're part of a community that fosters peer-to-peer learning.
          </p>
        </div>

        <div className="cs-hackathon">
        <a className='intern-title'>4. Stanford's TreeHacks</a>
        <p><strong>Location:</strong> Stanford, California</p>
          <p>
          Stanford's annual hackathon, <a target='_blank' href="https://www.treehacks.com/" class="my-link">TreeHacks</a>, brings together hundreds of students from North America and beyond.
          </p>
          <p>
          TreeHacks is Stanford University's annual 36-hour hackathon. The event attracts participants from around the world. This hackathon focuses not only on creating useful projects but also on promoting health and wellness during the event, which may resonate with you if you're interested in a balanced approach to coding.
          </p>
        </div>

        <div className="cs-hackathon">
        <a className='intern-title'>5. NASA's Space Apps Challenge</a>
        <p><strong>Location:</strong> Varies</p>
          <p>
          This international hackathon happens over a weekend and involves not just coders but also scientists, designers, storytellers, makers, builders, and technologists.
          </p>
          <p>
          <a target='_blank' href="https://www.spaceappschallenge.org/" class="my-link">NASA's Space Apps Challenge</a> is a global hackathon engaging thousands of citizens each year across the globe to work with NASA in designing innovative solutions to global challenges. This event is particularly exciting if you're interested in space and want to use your coding skills to contribute to real-life space exploration and earth science issues.
          </p>
        </div>

        <div className="cs-hackathon">
        <a className='intern-title'>6. TechCrunch Disrupt Hackathon</a>
        <p><strong>Location:</strong> San Francisco, California</p>
          <p>
          This is a high-profile event that often gets a lot of media attention, making it a prestigious event at which to make a good showing.
          </p>
          <p>
          The <a target='_blank' href="https://techcrunch.com/events/disrupt-sf-2023/hackathon/" class="my-link">TechCrunch</a> Disrupt Hackathon is an event where developers and engineers have just hours to create a new application from scratch. It precedes the main TechCrunch Disrupt conference, and winners often get to present on the main stage in front of thousands of attendees. This hackathon is renowned and can provide exposure to major tech players.
          </p>
        </div>

        <div className="cs-hackathon">
          <a className='intern-title'>7. Hack the North</a>
          <p><strong>Location:</strong> Waterloo, Canada</p>
            <p>
            This is Canada's biggest hackathon, held annually at the University of Waterloo. It brings together over a thousand students from around the world. More information can be found on their <a target='_blank' href="https://hackthenorth.com/" class="my-link">website</a>.
            </p>
            <p>
            Held at the University of Waterloo in Canada, this 36-hour event Hack the North encourages students to come together, make new connections, and create something extraordinary from scratch. The event promotes a fun, inclusive environment where all participants can enjoy hacking.
            </p>
        </div>

        <div className="cs-hackathon">
          <a className='intern-title'>8. HackingEDU</a>
          <p><strong>Location:</strong> San Francisco, California</p>
            <p>
            Billed as the world's largest education hackathon, HackingEDU encourages developers to disrupt and innovate the stagnant education industry. You can learn more about it <a target='_blank' href="http://www.hackingedu.co/" class="my-link">here</a>.
            </p>
            <p>
            As the world's largest education-themed hackathon, HackingEDU aims to solve problems in education with innovative technology solutions. It encourages students to disrupt the traditional education system and create something more engaging and effective.
            </p>
        </div>

        <div className="cs-hackathon">
          <a className='intern-title'>9. LA Hacks</a>
          <p><strong>Location:</strong> Los Angeles, California</p>
            <p>
            Organized by UCLA students, this is one of the largest hackathons on the west coast of the United States. Find out more on their <a target='_blank' href="https://lahacks.com/" class="my-link">website</a>.
            </p>
            <p>
            LA Hacks is a 36-hour event that encourages innovation, collaboration, and the creation of technological solutions to solve contemporary issues. Being based in Los Angeles, this hackathon has strong connections with the tech industry.
            </p>
        </div>

        <div className="cs-hackathon">
          <a className='intern-title'>10. Junction</a>
          <p><strong>Location:</strong> Espoo, Finland</p>
            <p>
            Based in Finland, Junction is Europe's largest hackathon and brings together developers, designers, and entrepreneurs from different corners of the world. More information can be found on their <a target='_blank' href="https://hackjunction.com/" class="my-link">website</a>.
            </p>
            <p>
            Junction brings together hackers from all backgrounds to develop solutions for real-world problems. The hackathon focuses on several tracks, including cybersecurity, finance, climate change, and more, offering a broad scope for participants.
            </p>
        </div>

        <div className="cs-hackathon">
          <a className='intern-title'>11. HackZurich</a>
          <p><strong>Location:</strong> Zurich, Switzerland</p>
            <p>
            Europe's largest and most renowned Hackathon, where students, graduates, and PhD candidates develop innovative prototypes for real-world problems. Visit their <a target='_blank' href="https://www.hackzurich.com/" class="my-link">website</a> for more details.
            </p>
            <p>
            HackZurich is a 40-hour hackathon where participants across Europe come together to develop functional, innovative, or entertaining projects. HackZurich collaborates with various top-tier partners to provide participants with a series of challenging problems.
            </p>
        </div>

        <div className="cs-hackathon">
          <a className='intern-title'>12. AngelHack</a>
          <p><strong>Location:</strong> San Francisco, California</p>
            <p>
            A global hackathon with locations in cities all over the world. Winning teams from each city get to participate in AngelHack's HACKcelerator program, a pre-accelerator program for promising startups. You can learn more on their <a target='_blank' href="https://angelhack.com/" class="my-link">website</a>.
            </p>
            <p>
            AngelHack offers global hackathons with a significant reward. Winners enter the HACKcelerator program to continue developing their projects, culminating in a demo day where they can present their ideas to investors, media, and other stakeholders.
            </p>
        </div>

        <div className="cs-hackathon">
          <a className='intern-title'>13. DubHacks</a>
          <p><strong>Location:</strong> Seattle, Washington</p>
            <p>
            This is the largest collegiate hackathon in the Pacific Northwest, hosted at the University of Washington. More information can be found <a target='_blank' href="https://www.dubhacks.co/" class="my-link">here</a>.
            </p>
            <p>
            DubHacks is the premier hackathon in the Pacific Northwest, where participants create innovative solutions to tackle everyday challenges. It brings together talented students to engage in collaborative problem-solving. The event promotes learning, inclusivity, and creating impactful projects.
            </p>
        </div>
      </div>

    <h2 id='activ-title'>Research Ideas</h2>

    <div className="cs-researches">

      <div className="cs-research">
        <a className='intern-title'>1. Generative AI</a>
          <p>
            Tools such as ChatGPT, Jasper.ai, StableDiffusion and NeuralText have taken the world by storm. But this is just one major application of what AI is capable of accomplishing. These are deep learning-based models, a field of computer science that is inspired by the structure of the human brain and tries to build systems that can learn! AI is a vast field with substantial overlaps with machine learning, with multiple intersections with disciplines such as medicine, art, and other STEM subjects. You could pick any of the following topics (as an example) on which to base your research. 
          </p>
          <p>
            <strong>1. </strong>Research on how to use AI systems to create tools that augment human skills. For example, how to use AI to create detailed templates for websites, apps, and all sorts of technical and non-technical documentation.
          </p>
          <p>
            <strong>2. </strong>Research on how to create multi-modal systems. For example, use AI to create a chatbot that can allow users Q&amp;A capabilities on the contents of a podcast series, a television show, and a very diverse range of content.
          </p>
          <p>
            <strong>3. </strong>Research on how to use AI to create tools that can do automated checks for quality and ease of understanding for student essays and other natural language tasks. This can help students quickly improve their writing skills by improving the feedback mechanism.
          </p>
          <p>
            <strong>4. </strong>Develop a computer vision system to monitor wildlife populations in a specific region.
          </p>
          <p>
            <strong>5. </strong>Investigate the use of computer vision in detecting and diagnosing medical conditions from medical images.
          </p>
          <p>
            <strong>6. </strong>Extracting fashion trends (or insert any other observable here) from public street scene data (i.e. Google Street View, dash cam datasets, etc.)
          </p>
          <p>
            <strong>Ideas by a Lumiere Mentor from Cornell University.</strong>
          </p>
      </div>

      <div className="cs-research">
        <a className='intern-title'>2. Data Science</a>
          <p>
            As a budding computer scientist, you must have studied the importance of sound, accurate data that can be used by computer systems for multiple uses. A good example of data science used in education is tools that help calculate your chances of admission to a particular college. By collecting a small amount of data from you, and by comparing it with a much larger database that has been refined and updated regularly, these tools effectively use data science to calculate acceptance rates for students in a matter of seconds.
          </p>
          <p>
            Another area is Natural Language Processing, or NLP, for short, aims to understand and improve machines' ability to understand and interpret human language. Be it the auto-moderation of content on Reddit, or developing more helpful, intuitive chatbots, you can pick any research idea that you're interested in.
          </p>
          <p>
            You could pick one of the following, or related questions to study, that come under the umbrella of data science.
          </p>
          <p>
            <strong>7. </strong>Develop a predictive model to forecast traffic congestion in your city.
          </p>
          <p>
            <strong>8. </strong>Analyze the relationship between social media usage and mental health outcomes in a specific demographic.
          </p>
          <p>
            <strong>9. </strong>Research on how to use AI to create tools that can do automated checks for quality and ease of understanding for student essays and other natural language tasks. This can help students quickly improve their writing skills by improving the feedback mechanism.
          </p>
          <p>
            <strong>10. </strong>Develop a chatbot that can answer questions about a specific topic or domain, such as healthcare or sports.
          </p>
          <p>
            <strong>11. </strong>Learn the different machine learning and natural language processing methods to categorize text (e.g. Amazon reviews) as positive or negative.
          </p>
          <p>
            <strong>12. </strong>Investigate the use of natural language processing techniques in sentiment analysis of social media data.
          </p>
          <p>
            <strong>Ideas by a Lumiere Mentor from the University of California, Irvine.</strong>
          </p>
      </div>

      <div className="cs-research">
        <a className='intern-title'>3. Robotics</a>
          <p>
            A perfect research area if you're interested in both engineering and computer science, robotics is a vast field with multiple real-world applications. Robotics as a research area is a lot more hands-on than the other topics covered in this blog, so it's a good idea to make a note of all the possible tools, guides, time, and space that you may need for the following ideas. You can also pitch some of these ideas to your school if equipped with a robotics lab so that you can conduct your research in the safety of your school, and also receive guidance from your teachers!
          </p>
          <p>
            <strong>13. </strong>Design and build a robot that can perform a specific task, such as picking up and stacking blocks.
          </p>
          <p>
            <strong>14. </strong>Investigate the use of robots in medicine, such as high-precision surgical robots.
          </p>
          <p>
            <strong>15. </strong>Develop algorithms to enable a robot to navigate and interact with an unfamiliar environment.
          </p>
          <p>
            <strong>Ideas by a Lumiere Mentor from University College London.</strong>
          </p>
      </div>

      <div className="cs-research">
        <a className='intern-title'>4. Ethics in Computer Science</a>
          <p>
            With the rapid development of technology, ethics has become a significant area of study. Ethical principles and moral values in computer science can relate to the design, development, use, and impact of computer systems and technology. It involves analyzing the potential ethical implications of new technologies and considering how they may affect individuals, society, and the environment. Some of the key ethical issues in computer science include privacy, security, fairness, accountability, transparency, and responsibility. If this sounds interesting, you could consider the following topics:
          </p>
          <p>
            <strong>16. </strong>Investigate fairness in machine learning. There is growing concern about the potential for machine learning algorithms to perpetuate and amplify biases in data. Research in this area could explore ways to ensure that machine learning models are fair and do not discriminate against certain groups of people.
          </p>
          <p>
            <strong>17. </strong>Study the energy consumption and carbon footprint of machine learning can have significant environmental impacts. Research in this area could explore ways to make machine learning more energy-efficient and environmentally sustainable.
          </p>
          <p>
            <strong>18. </strong>Conduct Privacy Impact Assessments for a variety of tools for identifying and evaluating the privacy risks associated with a particular technology or system.
          </p>
      </div>

      <div className="cs-research">
        <a className='intern-title'>5. Game Development</a>
          <p>
          According to statistics, the number of gamers worldwide is expected to hit 3.32 billion by 2024. This leaves an enormous demand for innovation and research in the field of game design, an exciting field of research. You could explore the field from multiple viewpoints, such as backend game development, analysis of various games, user targeting, as well as using AI to build and improve gaming models. If you're a gamer, or someone interested in game design, pursuing ideas like the one below can be a great starting point for your research -
          </p>
          <p>
            <strong>19. </strong>Design and build a serious game that teaches users about a specific topic, such as renewable energy or financial literacy.
          </p>
          <p>
            <strong>20. </strong>Analyze the impact of different game mechanics on player engagement and enjoyment.
          </p>
          <p>
            <strong>21. </strong>Develop an AI-powered game that can adjust difficulty based on player skill level.
          </p>
      </div>

      <div className="cs-research">
        <a className='intern-title'>6. Cybersecurity</a>
          <p>
            According to past research, there are over 2,200 attacks each day which breaks down to nearly 1 cyberattack every 39 seconds. In a world where digital privacy is of utmost importance, research in the field of cybersecurity deals with improving security in online platforms, spotting malware and potential attacks, and protecting databases and systems from malware and cybercrime is an excellent, relevant area of research. Here are a few ideas you could explore -
          </p>
          <p>
            <strong>22. </strong>Investigate the use of blockchain technology in enhancing cybersecurity in a specific industry or application.
          </p>
          <p>
            <strong>23. </strong>Apply ML to solve real-world security challenges, detect malware, and build solutions to safeguard critical infrastructure.
          </p>
          <p>
            <strong>24. </strong>Analyze the effectiveness of different biometric authentication methods in enhancing cybersecurity.
          </p>
          <p>
            <strong>Ideas by Lumiere Mentor from Columbia University.</strong>
          </p>
      </div>

      <div className="cs-research">
        <a className='intern-title'>7. Human-Computer Interaction</a>
          <p>
            Human-Computer Interaction, or HCI, is a growing field in the world of research. As a high school student, tapping into the various applications of HCI-based research can be a fruitful path for further research in college. You can delve into fields such as medicine, marketing, and even design using tools developed using concepts in HCI. Here are a few research ideas that you could pick -
          </p>
          <p>
            <strong>25. </strong>Research the use of color in user interfaces and how it affects user experience.
          </p>
          <p>
            <strong>26. </strong>Investigate the use of machine learning in predicting and improving user satisfaction with a specific software application.
          </p>
          <p>
            <strong>27. </strong>Develop a system to allow individuals with mobility impairments to control computers and mobile devices using eye tracking.
          </p>
          <p>
            <strong>28. </strong>Use tools like WAVE or WebAIM to evaluate the accessibility of different websites.
          </p>
      </div>

      <div className="cs-research">
        <a className='intern-title'>8. Computer Networks</a>
          <p>
            Computer networks refer to the communication channels that allow multiple computers and other devices to connect and communicate with each other. An advantage of conducting research in the field of computer networks is that these networks span from local, regional, and other small-scale networks to global networks. This gives you a great amount of flexibility while scoping out your research, enabling you to study a particular region that is accessible to you and is achievable in terms of time, resources, and complexity. Here are a few ideas -
          </p>
          <p>
            <strong>29. </strong>Investigate the use of software-defined networking in enhancing network security and performance.
          </p>
          <p>
            <strong>30. </strong>Develop a network traffic classification system to detect and block malicious traffic.
          </p>
          <p>
            <strong>31. </strong>Analyze the effectiveness of different network topology designs in reducing network latency and congestion.
          </p>
      </div>

      <div className="cs-research">
        <a className='intern-title'>9. Cryptography</a>
          <p>
            Cryptography is the practice of secure communication in the presence of third parties or adversaries. It uses mathematical algorithms and protocols to transform plain text into a form that is unintelligible to unauthorized users - the process known as encryption.
          </p>
          <p>
            Cryptography has grown in uses - starting from securing communication over the internet, protecting sensitive information like passwords and financial transactions, and securing digital signatures and certificates.
          </p>
          <p>
            <strong>32. </strong>Investigating side-channel attacks that exploit weaknesses in the physical implementation of cryptographic systems.
          </p>
          <p>
            <strong>33. </strong>Research techniques that can enable secure and private machine learning using cryptographic methods.
          </p>
      </div>
    </div>

    <h2 id='activ-title'>Coding Bootcamps</h2>

      <div className="cs-bootcamps">

        <div className="cs-bootcamp">
        <a className='intern-title'>1. Lambda School</a>
        <p><strong>Location:</strong> Online</p>
          <p>
          <a target='_blank' href="https://lambdaschool.com/" class="my-link">Lambda School</a> provides an immersive online coding bootcamp where students can learn from anywhere. It offers a full-time, 6-month computer science and software engineering program that covers an in-depth curriculum. The curriculum includes real-time, live classes that provide an interactive learning experience, coupled with weekly assignments and monthly projects that offer hands-on coding experience. A unique aspect of Lambda School is their income share agreement model, which allows students to defer tuition payment until they secure a job post-graduation, thus minimizing the upfront financial burden.
          </p>
        </div>

        <div className="cs-bootcamp">
        <a className='intern-title'>2. Le Wagon</a>
        <p><strong>Location:</strong> Varies</p>
          <p>
          <a target='_blank' href="https://www.lewagon.com/" class="my-link">Le Wagon</a> stands out as a widely recognized coding bootcamp with campuses spanning across 39 cities worldwide, catering to students seeking both full-time and part-time learning options. The 9-week full-time and 24-week part-time courses in web development and data science are expertly designed to impart crucial technical skills, including but not limited to Ruby on Rails, HTML, CSS, JavaScript, SQL for web development, and Python, SQL, and machine learning for data science. Le Wagon emphasizes practical skill-building, encouraging students to develop and deploy their own web applications.
          </p>
        </div>

        <div className="cs-bootcamp">
        <a className='intern-title'>3. Thinkful</a>
        <p><strong>Locations:</strong> Online</p>
          <p>
          <a target='_blank' href="https://www.thinkful.com/" class="my-link">Thinkful</a> offers an innovative online learning platform providing mentor-led, career-focused courses. Course offerings span across data science, full-stack web development, data analytics, and more, each designed to ensure students gain thorough practical knowledge in their chosen field. To support students' career aspirations, Thinkful provides 1-on-1 mentorship with industry experts and offers a job guarantee, backing its commitment with career services like resume and portfolio reviews to enhance job readiness.
          </p>
        </div>

        <div className="cs-bootcamp">
        <a className='intern-title'>4. Fullstack Academy</a>
        <p><strong>Locations:</strong> New York City and Chicago</p>
          <p>
          <a target='_blank' href="https://www.fullstackacademy.com/" class="my-link">Fullstack Academy</a> is a respected coding bootcamp offering immersive full-time and part-time programs in software engineering and cybersecurity, both online and at their NYC and Chicago campuses. The curriculum at Fullstack is innovative and rigorous, with a central focus on JavaScript and the associated tech stack, preparing students to build complete web applications. Fullstack Academy prides itself on its commitment to student success, offering extensive support services, including career counseling and networking opportunities.
          </p>
        </div>

        <div className="cs-bootcamp">
        <a className='intern-title'>5. Ironhack</a>
        <p><strong>Locations:</strong> Madrid, Barcelona, Paris, Mexico City, Berlin, Amsterdam, Sao Paulo, Lisbon, Miami, and remotely.</p>
          <p>
          <a target='_blank' href="https://www.ironhack.com/en" class="my-link">Ironhack</a> is an international tech and design school that puts the emphasis on project-based, hands-on learning. Across its global campuses, Ironhack offers courses in web development, UX/UI design, and data analytics. Students are guided through the process of designing and building their own full-fledged web applications, learning practical skills that will be immediately useful in the tech industry. Ironhack maintains strong connections with tech companies and startups, enhancing job prospects for graduates.
          </p>
        </div>

        <div className="cs-bootcamp">
        <a className='intern-title'>6. Springboard</a>
        <p><strong>Location:</strong> Online</p>
          <p>
          <a target='_blank' href="https://www.springboard.com/" class="my-link">Springboard</a> is a forward-thinking online coding school that offers flexible, self-paced, mentor-led courses. Specializing in Data Science, UX Design, and Machine Learning, each course is designed with a project-based curriculum that ensures students gain practical, job-ready skills. Springboard stands by its commitment to student success, guaranteeing a job within six months of graduation and offering a full tuition refund if this criterion is not met.
          </p>
        </div>

        <div className="cs-bootcamp">
        <a className='intern-title'>7. Hack Reactor</a>
        <p><strong>Locations:</strong> San Francisco, Austin, Los Angeles, New York City, and remotely.</p>
          <p>
          <a target='_blank' href="https://www.hackreactor.com/" class="my-link">Hack Reactor</a> provides a rigorous coding bootcamp experience with both online and in-person programs across the U.S. The school's immersive software engineering program delves into all aspects of software development, including browser-based programming, data structures, algorithms, and complexity analysis. Hack Reactor prides itself on producing industry-ready graduates, with an alumni network that spans over 800 companies worldwide.
          </p>
        </div>

        <div className="cs-bootcamp">
        <a className='intern-title'>8. The Tech Academy</a>
        <p><strong>Locations:</strong> Portland (Oregon), Salt Lake City (Utah), and remotely.</p>
          <p>
          <a target='_blank' href="https://lambdaschool.com/" class="my-link">The Tech Academy</a>  is a comprehensive tech school that offers online and in-person bootcamps for aspiring software developers. The curriculum covers a wide array of programming languages and tech skills, including frontend and backend development, databases, HTML & CSS, and version control. The Tech Academy is known for its flexible, self-paced learning options, making it an excellent choice for individuals who need to balance learning with other commitments.
          </p>
        </div>

      </div>

    </div>
    )
}

export default ComputerScience
