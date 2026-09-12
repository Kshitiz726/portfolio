/* ---------------------------------------------------------------
   Every word on the site comes from this file. Edit here, not in
   the components.

   Rules of the road: entries are only filled in from something
   verifiable — a DOI, a certificate, a repo. Anything still marked
   TODO is waiting on you. Empty arrays render a visible "nothing
   here yet" note rather than placeholder cards, so an unfinished
   section can never be mistaken for a real one.

   `media: [{ src, caption, url }]` may hang off any research, experience,
   or achievement entry — scans, photos, anything worth showing. Each item
   becomes a thumbnail that opens full size; several items get arrow-key
   navigation. `url` adds a "Verify online" action — only CS50 has one.
   Captions are read aloud by screen readers, so write them as descriptions,
   not labels.
   --------------------------------------------------------------- */

export const profile = {
  // Spelling is consistent across the CS50 certificate, the InJET paper
  // byline, and all five scanned certificates.
  name: 'Kshitiz Raj Paudyal',

  // DRAFT — rewrite in your own voice.
  tagline:
    'Computer engineer and researcher. I like the mathematics behind AI, the core computing that makes it run, and building systems that turn real-world data into models that work.',

  // DRAFT — every sentence below is drawn from your paper and your FYP award.
  // The last sentence needs your target field filled in.
  // Paragraphs are split on the blank line between them.
  bio: `I like what sits underneath: the core systems, how neural networks actually work, and the mathematics moving under the data. Give me numbers and I am happy, and I would rather wrestle an odd, hard problem than redo one that is already solved.

For a master's, I am drawn to where mathematics meets AI: machine learning, applied and computational mathematics, and the systems that make models run at scale.`,

  location: 'Kathmandu, Nepal',
  email: 'kshitizrajpaudyal@gmail.com',
  phone: '',
  resume: '/cv.html', // Print-ready CV page in public/; open it and use the browser's Print to PDF for a file copy.
  // Full-length campus portrait, shown beside the name in the hero.
  photo: '/campus.jpg',
  photoAlt: 'Kshitiz Raj Paudyal at the Institute of Engineering, Thapathali Campus',
}

// Only rows with a url render.
export const links = [
  { label: 'GitHub', url: 'https://github.com/Kshitiz726' },
  { label: 'LinkedIn', url: '' }, // TODO
  { label: 'Google Scholar', url: '' }, // TODO (optional)
  { label: 'ORCID', url: '' }, // TODO (optional)
]

// Reverse-chronological, the CV convention.
export const education = [
  {
    degree: 'Bachelor of Engineering (B.E.), Computer Engineering',
    institution: 'Institute of Engineering, Thapathali Campus, Tribhuvan University',
    period: '2022 to 2026',
    detail: 'Aggregate 76.32%.',
  },
  {
    degree: 'Higher Secondary Education (Grade 11–12), Science',
    institution: 'Oxford Secondary School',
    period: '2019 to 2021',
    // I dropped the "SLC" label you had on Grade 12 — SLC refers to the old
    // Grade 10 exam, so it would read as an error next to a Grade 12 GPA.
    // Say the word if you want it shown differently.
    detail: 'GPA 3.50 (Grade 12); GPA 3.73 (Grade 11).',
  },
  {
    degree: 'Secondary Education Examination (SEE)',
    institution: 'Ganesh Gyan Jyoti Public Ma.Vi., Semlar',
    period: '2019',
    detail: 'GPA 3.80.',
  },
]

export const research = [
  {
    title:
      'Spatiotemporal PM2.5 Estimation in Kathmandu Using Deep Learning with OpenMeteo and NASA MERRA-2 Data: Performance Benchmarking Against Machine Learning Model',
    // Order as printed on the paper. `corresponding: true` renders a
    // superscript * and the footnote beneath the citation.
    authors: [
      { name: 'Kshitiz Raj Paudyal', corresponding: true },
      { name: 'Rajad Shakya' },
      { name: 'Jesis Upadhayaya' },
    ],
    venue:
      'International Journal on Engineering Technology (InJET), 3(1), 36–45. Published by Kantipur Engineering College',
    year: '2025',
    status: 'Published',
    url: 'https://doi.org/10.3126/injet.v3i1.87012',
    // Rendered as a visible, clickable DOI chip — the identifier itself is
    // the credential, so it shouldn't hide behind the title link.
    doi: '10.3126/injet.v3i1.87012',
    // The DOI verifies the paper, so the certificate here is just the
    // journal's author recognition — no separate verification link.
    media: [
      {
        src: '/certificates/pm2.5.jpg',
        caption: 'InJET certificate of appreciation for the published paper',
      },
    ],
  },
  {
    title: 'Multimodal AI System for Clip Extraction from Long Videos',
    authors: [{ name: 'Kshitiz Raj Paudyal', corresponding: true }],
    venue: 'Manuscript in preparation, based on the undergraduate final year project',
    year: '2026',
    status: 'Ongoing',
    url: 'https://github.com/Kshitiz726/Semantic-Video-Synthesis-with-BERT',
    media: [
      {
        src: '/certificates/best_project_conference.jpg',
        caption:
          'Certificate of appreciation for selection as one of the best final year projects and presentation at the 4th Thapathali Graduate Conference',
      },
    ],
  },
]

export const projects = [
  {
    name: 'OurMynd: ADHD Productivity, Wellness and Community App',
    summary:
      'A cross-platform ADHD-focused productivity, wellness, and community app built on a single idea: plan your day by energy, not priority, inside a deliberately low-stimulation interface. Tasks are grouped by energy level so you take on work that matches how you feel, and the whole UI can desaturate and quiet itself on demand.',
    outcome:
      'Launching soon at ourmynd.com. Registered under UK Gov, registered trademark.',
    stack: [
      'Flutter (Android, iOS, web, desktop)',
      'Node.js',
      'TypeScript',
      'Socket.IO',
      'Supabase / Postgres',
      'Redis',
      'LiveKit',
      'Stripe',
      'Fly.io',
    ],
    repo: 'https://github.com/Kshitiz726/Mynd-APP',
    demo: 'https://ourmynd.com',
    demoLabel: 'ourmynd.com',
  },
  {
    name: 'Multimodal AI System for Clip Extraction from Long Videos',
    summary:
      'Takes a long video and pulls out the short clips worth keeping. It scores each scene on three channels at once, what is shown, what is said, and what is heard, then fuses those scores to rank the strongest moments and cut them automatically.',
    outcome:
      'Selected as one of the best final year projects by the Department Project Committee and presented at the 4th Thapathali Graduate Conference, June 2026.',
    stack: ['Python', 'BERT', 'Multimodal deep learning'],
    repo: 'https://github.com/Kshitiz726/Semantic-Video-Synthesis-with-BERT',
    demo: '',
    // Inline click-to-play player; videoStart jumps in at 3:35 (215s).
    video: 'MG6cTkaCo7Y',
    videoStart: 215,
  },
  {
    name: 'PM2.5 reconstruction for the Kathmandu Valley',
    summary:
      'Reconstructed high-resolution historical PM2.5 concentrations from Open-Meteo weather data and NASA MERRA-2 satellite reanalysis, benchmarking a deep neural network against XGBoost.',
    outcome:
      'The DNN reached R² = 0.8725 (RMSE 18.23 µg/m³) on hourly data; XGBoost performed best on daily data. Published in InJET.',
    stack: ['Python', 'TensorFlow', 'XGBoost'],
    repo: 'https://github.com/Kshitiz726/spatiotemporal-pm25-estimation',
    demo: 'https://doi.org/10.3126/injet.v3i1.87012',
    demoLabel: 'Read research paper',
  },
  {
    name: 'Motion Analyzer',
    summary:
      'Detects and analyzes motion in video in real time, pairing a TensorFlow CNN with optical flow to flag moving objects, estimate their speed, and render motion heatmaps. Results stream to an interactive Flask dashboard with object counts and zone-based activity analytics.',
    stack: ['Python', 'TensorFlow', 'OpenCV', 'Flask'],
    repo: 'https://github.com/Kshitiz726/motion_analyser',
    demo: '',
  },
  {
    name: 'Fractal Visualizer',
    summary:
      'An interactive explorer for fractals like the Mandelbrot and Julia sets. It renders the underlying maths in real time, so you can zoom in and watch endless detail appear from a handful of simple equations.',
    outcome: 'Final project for Harvard CS50x.',
    stack: [],
    repo: 'https://github.com/Kshitiz726/Fractal_Visualizer',
    demo: '', // TODO (optional)
    // A YouTube video id renders an inline click-to-play player at the top of
    // the card. From https://youtu.be/oTZYG4s-0h0
    video: 'oTZYG4s-0h0',
  },
  {
    name: 'Yathartha Event Card Creator',
    summary:
      'A web tool that generates personalized, on-brand event and speaker cards for the Yathartha Tech Fest, so organizers produce consistent graphics in seconds instead of designing each one by hand.',
    stack: [],
    repo: 'https://github.com/Kshitiz726/yathartha-event-card-creator',
    demo: '',
  },
]

export const experience = [
  {
    role: 'Developer and Outreach Manager (Freelance, Remote)',
    org: 'The Social Globe, United Kingdom (registered under UK Gov)',
    period: 'Oct 2025 to Jun 2026',
    points: [
      'Contributed to website and application development.',
      'Managed outreach and communications remotely for the UK-registered company.',
    ],
  },
  {
    role: 'Campus Ambassador',
    org: 'LOCUS 2025, 21st National Technological Festival, IOE Pulchowk Campus',
    period: '2025',
    points: [], // TODO: 1–2 lines on what you actually did
    media: [
      {
        src: '/certificates/locus.jpg',
        caption: 'LOCUS 2025 certificate of appreciation for campus ambassadorship',
      },
    ],
  },
  {
    // Two roles at the same fest, merged into one entry so it reads as a
    // single richer contribution rather than two thin ones. Both cards attach.
    role: 'Organizer and Graphics Designer',
    org: 'Yathartha Tech Fest, IOE Thapathali Campus',
    // Certificate reads 17–18 Magh 2080 B.S. Converted to Gregorian, please
    // sanity-check the conversion.
    period: '2024',
    points: [
      'Helped coordinate and run several of the fest\'s technical events, managing scheduling and on-the-day logistics.',
      'Designed graphics and visual material for the event.',
    ],
    media: [
      {
        src: '/certificates/organizer.jpg',
        caption: 'Organizer card for Yathartha, IOE Thapathali Campus',
      },
      {
        src: '/certificates/graphics_designer_yathartha.jpg',
        caption: 'Yathartha certificate of appreciation for graphic design',
      },
    ],
  },
]

// A starting draft grounded in your paper, projects, and CS50 work. Trim
// anything you would not want to defend in an interview, and add what is
// missing (especially specific frameworks you actually use).
export const skills = [
  { group: 'Languages', items: ['Python', 'C', 'C++', 'SQL'] },
  {
    group: 'Machine Learning & AI',
    items: [
      'Deep neural networks',
      'Gradient boosting (XGBoost)',
      'Multimodal learning',
      'Model training & evaluation',
      'scikit-learn',
    ],
  },
  {
    group: 'Mathematics',
    items: ['Linear algebra', 'Probability & statistics', 'Optimization', 'Calculus'],
  },
  {
    group: 'Data',
    items: [
      'Cleaning & preprocessing',
      'NumPy & pandas',
      'Feature engineering',
      'Time-series & geospatial data',
    ],
  },
  {
    group: 'Tools & Web',
    items: ['Git & GitHub', 'Flask', 'HTML & CSS', 'Matplotlib'],
  },
]

export const achievements = [
  {
    title:
      'Best Final Year Project, presented at the 4th Thapathali Graduate Conference',
    awarder:
      'Department Project Committee, IOE, Thapathali Campus, Tribhuvan University',
    year: '2026',
    detail:
      'Selected as one of the best final year projects by the Department Project Committee for "Multimodal AI System for Clip Extraction from Long Videos", and presented at the 4th Thapathali Graduate Conference on 5 June 2026.',
    media: [
      {
        src: '/certificates/best_project_conference.jpg',
        caption:
          'Certificate of appreciation for selection as one of the best final year projects and presentation at the conference',
      },
      {
        src: '/certificates/presenter.jpg',
        caption:
          'Presenter card for the 4th Thapathali Graduate Conference, 5 June 2026',
      },
      {
        src: '/certificates/conference.jpg',
        caption:
          'Presenting "Multimodal AI System for Clip Extraction from Long Videos" at the 4th Thapathali Graduate Conference',
      },
    ],
  },
]

/* Online courses and professional certificates. Rendered as a compact grid
   beneath the achievements, since these are lighter-weight than the awards
   above and there are enough of them to bloat a single stacked list. Each
   carries a public verification link. */
export const certifications = [
  {
    title: 'Machine Learning Specialization',
    awarder: 'University of Washington, via Coursera',
    year: '2026',
    detail:
      'A four-course specialization on regression, classification, clustering, and information retrieval, taught through applied case studies.',
    stats: ['4 courses'],
    media: [
      {
        src: '/certificates/ML_wasington.png',
        caption: 'Machine Learning Specialization certificate, issued 12 September 2026',
        url: 'https://coursera.org/share/d6328f1343eb7e1afaaf9d002d76f134',
      },
    ],
  },
  {
    title: 'CS50AI: Introduction to Artificial Intelligence with Python',
    awarder: 'Harvard University',
    year: '2026',
    detail: 'Twelve projects across search, knowledge, optimization, and machine learning.',
    // Emphasised as pills under the detail line.
    stats: ['12 projects'],
    media: [
      {
        src: '/certificates/cs50ai.png',
        caption: 'CS50AI certificate, awarded 2026',
        url: 'https://cs50.harvard.edu/certificates/c2369b0d-46a1-45c2-bba9-36a565e78c3c',
      },
    ],
  },
  {
    title: 'CS50x: Introduction to Computer Science',
    awarder: 'Harvard University',
    year: '2025',
    detail: 'Ten problem sets and one final project.',
    stats: ['10 problem sets', '1 final project'],
    media: [
      {
        src: '/certificates/cs50x.png',
        caption: 'CS50x certificate, awarded 2025',
        url: 'https://cs50.harvard.edu/certificates/e955f42e-5818-4fb7-8e48-5c1e2a5f59e4',
      },
    ],
  },
  {
    title: 'Supervised Machine Learning: Regression and Classification',
    awarder: 'DeepLearning.AI and Stanford Online, via Coursera',
    year: '2026',
    detail:
      'The first course of the Machine Learning Specialization, covering linear and logistic regression and gradient descent.',
    media: [
      {
        src: '/certificates/stanford_certificate-1.png',
        caption:
          'Supervised Machine Learning: Regression and Classification certificate, issued 6 September 2026',
        url: 'https://coursera.org/share/9770f059895585b10cf8ebab2e8e4f61',
      },
    ],
  },
  {
    title: 'Software Architecture',
    awarder: 'University of Alberta, via Coursera',
    year: '2026',
    detail:
      'A course on architectural styles, design patterns, and documenting the architecture of large software systems.',
    media: [
      {
        src: '/certificates/university_of_alberta.png',
        caption: 'Software Architecture certificate, issued 7 September 2026',
        url: 'https://coursera.org/share/53e42a9f9f36ae79d6421e0333f8aa73',
      },
    ],
  },
  {
    title: 'Elements of AI',
    awarder: 'University of Helsinki',
    year: '2026',
    detail: 'A 2 ECTS credit online course on the foundations of artificial intelligence.',
    stats: ['2 ECTS credits'],
    media: [
      {
        src: '/certificates/certificate-elements-of-ai.png',
        caption: 'Elements of AI certificate of completion, issued 27 July 2026',
        url: 'https://certificates.mooc.fi/validate/bxxhg1z8wmc',
      },
    ],
  },
  {
    title: 'Data Visualization with Python',
    awarder: 'IBM Developer Skills Network',
    year: '2026',
    detail: 'Course DV0101EN, completed with a passing grade.',
    stats: ['DV0101EN'],
    media: [
      {
        src: '/certificates/ibm-data-visualization.png',
        caption: 'Data Visualization with Python certificate, issued 19 July 2026',
        url: 'https://courses.cognitiveclass.ai/certificates/8584e5c0d33f4f4c8ac2b66f94673d92',
      },
    ],
  },
  {
    title: 'Advanced SQL for Query Tuning and Performance Optimization',
    awarder: 'LinkedIn Learning',
    year: '2026',
    detail: 'A course on SQL query tuning and performance optimization, completed 28 July 2026.',
    media: [
      {
        src: '/certificates/advance_sql.png',
        caption:
          'Advanced SQL for Query Tuning and Performance Optimization certificate, completed 28 July 2026',
        url: 'https://www.linkedin.com/learning/certificates/61597b3fd25643c89c2dc02ba0fb4eae8cf17d98bcc77eef70d78935adbba527',
      },
    ],
  },
  {
    title: 'Basic Web Design & Development',
    awarder: 'HUB IT Training & Solution, Butwal',
    // The course ran Apr–Jul 2019; the certificate was issued 29/09/2021.
    // Listing the year you did the work — say the word if you'd rather show 2021.
    year: '2019',
    detail:
      'A three-month course completed with grade A, held from 10 April to 16 July 2019. Certificate issued 2021.',
    stats: ['3-month course', 'Grade A'],
    media: [
      {
        src: '/certificates/basic_web.jpg',
        caption: 'HUB IT certificate of completion, grade A',
      },
    ],
  },
]

/* Essays and blog posts. `body` is an ordered list of blocks the Writing
   section renders: 'h' a subheading, 'p' a paragraph, 'eq' a display equation
   with a caption. `url` links to the published version (Medium, etc.) when
   there is one. */
export const writing = [
  {
    slug: 'brain-network',
    title: 'The Possible Future: Toward a Human Brain Network',
    date: 'July 2026',
    readingTime: '7 min read',
    tags: ['Neuroscience', 'Brain-Computer Interfaces', 'Speculation'],
    url: '', // TODO: Medium link once published
    summary:
      'A walk from carrier pigeons to a future where brains route thoughts like packets, and an honest look at whether the neuroscience could ever get us there.',
    disclaimer:
      'These are my own thoughts and questions, mixed with a few scientific possibilities. Nothing here claims to be settled science or to break the laws of physics.',
    body: [
      { type: 'h', text: 'The possible future' },
      {
        type: 'p',
        text: `It is the year 2100. A man sits in a small apartment in Kathmandu, staring out the window, but his attention is somewhere else entirely, resting inside the thoughts of someone he loves hundreds of kilometres away. No call. No message. Just a direct link between two minds. When he remembers something from years ago, she laughs in the same instant, as if she were in the room. Words are not needed anymore. Emotions, memories, and half-formed ideas move between them like packets across a living network. For the first time, communication feels less like talking and more like thinking together.`,
      },
      {
        type: 'p',
        text: `That image is where I want to start, because to see why it is interesting you first have to see how slow we used to be.`,
      },
      { type: 'h', text: 'From pigeons to IP addresses' },
      {
        type: 'p',
        text: `There was a time when a message took days, weeks, sometimes months. People tied letters to pigeons and hoped. The note usually arrived, but the delay was brutal. Imagine wanting to tell someone you loved her, and by the time the letter reached her she had already married someone else. That is not only a joke about romance. It is a real property of the channel. The information was fine. The latency was the problem.`,
      },
      {
        type: 'p',
        text: `Then we made ourselves the network. Postal riders carried written words from hand to hand, which was more reliable but still limited by how fast a body could move. The real jump came with the telegraph, when we stopped moving paper and started moving electric pulses down a wire. From pigeons, to riders, to pulses, the speed of information did not creep up. It jumped by orders of magnitude at each step.`,
      },
      {
        type: 'p',
        text: `Email, the internet, and the smartphone finished the job. Every device now carries a unique identifier, its IP address, so a message can be routed to exactly one machine anywhere on Earth in a fraction of a second. Distance stopped mattering. The letter that once cost a marriage now arrives before you have finished the thought.`,
      },
      { type: 'h', text: 'What comes after this?' },
      {
        type: 'p',
        text: `So what is the next step? I think it is direct brain to brain communication.`,
      },
      {
        type: 'p',
        text: `Picture explaining the modern internet to a medieval letter carrier. You tell him you can send a thought through the air with no paper at all, and he decides you are dangerous and locks you up. We are that letter carrier right now. Compared to what communication might look like in a few decades, we are still in the pigeon age. Pigeons carried letters, wires carried pulses, IP addresses route packets between devices, and the next carrier might be the brain itself, moving thoughts and memories straight from one mind to another.`,
      },
      { type: 'h', text: 'Brains as nodes' },
      {
        type: 'p',
        text: `In a fully realised brain network, each brain would behave like a node. It would need a unique identity, a neural signature that plays the role an IP address plays for a device. Thoughts become packets. Emotions become data streams. Memories become files you could, in principle, share.`,
      },
      {
        type: 'p',
        text: `I keep coming back to the same questions. What if I could load my friend's memory of the night before an exam, the one where he read every page and I did not? What if a teacher could hand me a concept the way a server hands over a file, already structured, already understood? That is the fantasy the brain network points at.`,
      },
      { type: 'h', text: 'Is any of this actually possible?' },
      {
        type: 'p',
        text: `This is the part where it stops being only a daydream. Over the last decade, brain computer interfaces have moved quickly. Neuralink and others have shown paralysed patients typing and moving robotic arms using nothing but intention decoded from neural activity.`,
      },
      {
        type: 'p',
        text: `The clearest proof of concept came in August 2013 at the University of Washington. Rajesh Rao wore an EEG cap that recorded his brain's electrical activity. Andrea Stocco, in a different building, received transcranial magnetic stimulation over his motor cortex. When Rao imagined moving his hand, the signal crossed the link and Stocco's finger moved. One brain influenced another brain's action with no words at all. It was crude, it carried barely a single bit of information, but it happened.`,
      },
      { type: 'h', text: 'The science behind a neural address' },
      {
        type: 'p',
        text: `An IP address is just a unique label, a way to point at one device and no other. A brain would need the same thing, and the natural candidate is the pattern of how your neurons fire and connect. That pattern is enormously specific to you.`,
      },
      {
        type: 'p',
        text: `There is also a hard limit worth stating honestly. Any channel between two minds is still a communication channel, and communication channels obey Shannon's law:`,
      },
      {
        type: 'eq',
        text: 'C = B · log₂(1 + S / N)',
        caption:
          'The most a link can carry, its capacity C in bits per second, is bounded by the bandwidth B you can read and write and by the signal-to-noise ratio S / N.',
      },
      {
        type: 'p',
        text: `That single line is the whole problem. A thought is not a tidy file. Reading it faithfully demands enormous bandwidth, and writing it into another brain without garbling it demands keeping the noise absurdly low. Today we are nowhere near either.`,
      },
      { type: 'h', text: 'The reality in 2025' },
      {
        type: 'p',
        text: `The human brain holds roughly 86 billion neurons, each wired to thousands of others. Capturing that in enough detail to build a stable neural address, and then writing a message into a second brain without distortion, is far beyond anything we can do now. The 2013 experiment moved one bit. A shared memory lives in a completely different universe of complexity.`,
      },
      { type: 'h', text: 'What I actually think' },
      {
        type: 'p',
        text: `I find the brain network both thrilling and, honestly, mostly imaginary for now. The odds are low. But low is not zero, and if it ever worked it would change how humans live and think by a hundred and eighty degrees. The real question is not only whether we can build it. It is whether we would be willing to let our minds become nodes, and our thoughts become packets, in the largest network we have ever made.`,
      },
      {
        type: 'p',
        text: `That idea excites me more than almost anything else in technology. I do not think it is impossible. A network of brains. Honestly, I hope I live to see it.`,
      },
    ],
  },
]
