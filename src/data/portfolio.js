export const PROFILE = {
  name: 'Muhammad Usaid',
  shortName: 'Muhammad Usaid',
  role: 'Full Stack AI Developer | MERN Stack',
  location: 'Nazimabad, Karachi, Pakistan',
  address: "Block # 5E 16/11 Near Mak'ki Masjid, Nazimabad, Karachi",
  email: 'usaidamin21@gmail.com',
  phone: '+923242069379',
  photoUrl: '/assets/profile/muhammad-usaid.jpg',
  resumeUrl: '/assets/aistudio/Muhammad_Usaid_Resume_cd433b27.pdf',
  headline: 'Engineering scalable MERN apps & AI-powered web experiences.',
  subheadline:
    'Full Stack Developer crafting responsive React interfaces, Node.js & MongoDB backends, and modern AI API integrations—while mentoring future developers at Aptech MSG.',
  aboutParagraphs: [
    'I specialize in MERN-stack web applications and modern, AI-powered solutions—translating complex product requirements into responsive, user-focused interfaces backed by clean RESTful architectures.',
    'From crafting high-clarity frontends in React, Tailwind CSS, and MUI to designing relational and document schemas across MongoDB, MySQL, SQL Server, and Supabase, I focus on reliability, maintainability, and speed.',
    'As a Teaching Associate at Aptech MSG, I mentor students daily in web development, debugging, and real-world project architecture—keeping my fundamentals sharp and practical.'
  ],
  metrics: [
    { value: '3+ Years', label: 'Technical & Operational Experience' },
    { value: 'MERN + AI', label: 'Full Stack & AI API Architecture' },
    { value: 'BSCS 2026', label: 'Federal Urdu University Karachi' },
    { value: 'Aptech MSG', label: 'Teaching Associate & Mentor' }
  ]
};

export const SPECIALIZATIONS = [
  'Full Stack MERN Developer',
  'AI-Powered Web Engineer',
  'React & Node.js Architect',
  'Aptech Technical Mentor'
];

export const WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'Architecture & Schema Design',
    detail:
      'Structuring MongoDB, MySQL, or Supabase data models and clean REST contracts before writing UI state.'
  },
  {
    step: '02',
    title: 'Responsive Interface Craft',
    detail:
      'Building modular React JS components with Redux, Tailwind CSS, and MUI tuned for mobile and desktop clarity.'
  },
  {
    step: '03',
    title: 'AI Workflows & Delivery',
    detail:
      'Integrating modern AI APIs with server-side validation, clean error handling, and Git-backed deployment.'
  }
];

export const ENGINEERING_TABS = [
  {
    id: 'mern',
    label: 'MERN Architecture',
    title: 'Typed REST APIs & MongoDB Modeling',
    subtitle: 'Clean separation of Express controllers, query indexing, and React state.',
    snippetTitle: 'routes/listings.controller.js',
    code: `export async function getMarketplaceFeed(req, res) {
  const { category, q, page = 1 } = req.query;
  const filter = {
    status: "active",
    ...(category && category !== "all" ? { category } : {}),
    ...(q ? { title: { $regex: q, $options: "i" } } : {})
  };

  const [items, total] = await Promise.all([
    Listing.find(filter).sort({ createdAt: -1 }).skip((page - 1) * 12).limit(12),
    Listing.countDocuments(filter)
  ]);

  return res.json({ items, total, page: Number(page) });
}`,
    specs: [
      { label: 'Frontend', value: 'React JS · Redux · Tailwind CSS · MUI' },
      { label: 'Backend', value: 'Node.js · Express.js · REST APIs' },
      { label: 'Persistence', value: 'MongoDB · MySQL · Supabase' }
    ]
  },
  {
    id: 'ai',
    label: 'AI Integration',
    title: 'AI-Driven Application Workflows',
    subtitle: 'Connecting modern AI APIs with structured UI feedback and server guards.',
    snippetTitle: 'services/ai-assistant.js',
    code: `export async function generateSmartSummary(content, tone = "concise") {
  const response = await fetch("/api/ai/summarize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, tone })
  });

  if (!response.ok) {
    throw new Error("Unable to process AI summary request");
  }

  return response.json(); // { summary, keywords, readingMinutes }
}`,
    specs: [
      { label: 'Capabilities', value: 'AI APIs · Smart Content Flows' },
      { label: 'Architecture', value: 'Server-Proxied Keys · Responsive UI' },
      { label: 'Focus', value: 'Real-World Problem Solving' }
    ]
  },
  {
    id: 'mentorship',
    label: 'Mentorship',
    title: 'Teaching Associate at Aptech MSG',
    subtitle: 'Training cohorts in modern JavaScript, React, backend logic, and live debugging.',
    snippetTitle: 'curriculum/mentorship-focus.md',
    code: `01. Core Foundations  -> Semantic HTML5, CSS3 Grid/Flexbox, ES6+ JS
02. UI Engineering    -> React Components, State, Tailwind & MUI
03. Backend Systems   -> Node.js, Express Routing, MongoDB / MySQL
04. Code Reviews      -> Git Workflows, Debugging & Clean Architecture`,
    specs: [
      { label: 'Role', value: 'Teaching Associate (Mar 2025 – Present)' },
      { label: 'Previous', value: 'Teaching Assistant (Aug 2024 – Mar 2025)' },
      { label: 'Impact', value: 'Hands-On Labs · Assessments · Reviews' }
    ]
  }
];

export const PROJECTS = [
  {
    id: 'olx-marketplace',
    index: '01',
    title: 'OLX-Style Marketplace',
    category: 'Full Stack',
    year: '2025',
    role: 'Full Stack MERN Developer',
    stack: ['MongoDB', 'Express.js', 'React JS', 'Node.js', 'Tailwind CSS'],
    summary:
      'Peer-to-peer classifieds marketplace featuring multi-category browsing, instant search filtering, dynamic product detail pages, and seller ad publishing.',
    problem:
      'Local buyers and sellers needed a fast, clutter-free classifieds interface where listings load predictably across categories without heavy page reloads.',
    architecture:
      'Built on a MERN REST API with indexed MongoDB queries for category and keyword filtering, paired with a responsive React frontend using modular card grids and seller form validation.',
    highlights: [
      'Category-driven discovery across Laptops, Audio, Workspace, and Cameras',
      'Seller listing workflow with structured pricing, condition, and location metadata',
      'Responsive grid layout engineered for seamless mobile and desktop browsing'
    ],
    previewType: 'marketplace'
  },
  {
    id: 'blogging-app',
    index: '02',
    title: 'Blogging Application',
    category: 'Full Stack',
    year: '2025',
    role: 'Full Stack Developer',
    stack: ['React JS', 'Node.js', 'Express.js', 'MongoDB', 'MUI'],
    summary:
      'Editorial publishing platform supporting rich post creation, category curation, author attribution, and distraction-free article reading.',
    problem:
      'Writers and readers needed an organized publishing workflow that balances a structured authoring dashboard with crisp editorial typography.',
    architecture:
      'Designed RESTful CRUD endpoints in Express and MongoDB for posts and categories, paired with a clean React reading view and state-driven editor.',
    highlights: [
      'Complete Create, Read, Update, and Delete lifecycle for articles',
      'Topic filtering and estimated reading-time organization',
      'Clean editorial layout optimized for long-form readability'
    ],
    previewType: 'blog'
  },
  {
    id: 'weather-app',
    index: '03',
    title: 'Weather Application',
    category: 'AI-Ready',
    year: '2024',
    role: 'Frontend & API Developer',
    stack: ['React JS', 'JavaScript', 'REST APIs', 'CSS3', 'Tailwind CSS'],
    summary:
      'Live meteorological dashboard consuming external weather REST APIs to present current conditions, humidity, wind metrics, and city-based lookups.',
    problem:
      'Weather tools often bury essential forecast metrics beneath visual noise; the goal was instant legibility for temperature, conditions, and regional lookup.',
    architecture:
      'Asynchronous API integration with graceful loading and error states, converting raw meteorological payloads into clear visual forecast cards and tabular metrics.',
    highlights: [
      'Instant city search with error handling for unrecognized locations',
      'Tabular display for temperature, humidity, wind speed, and pressure',
      'Dynamic condition indicators adapting cleanly to atmospheric states'
    ],
    previewType: 'weather'
  },
  {
    id: 'todo-app',
    index: '04',
    title: 'Todo Application',
    category: 'Frontend & UI',
    year: '2024',
    role: 'Frontend Developer',
    stack: ['React JS', 'JavaScript', 'Redux', 'HTML5', 'CSS3'],
    summary:
      'Focused task management workspace with instant creation, status filtering, inline editing, and persistent task synchronization.',
    problem:
      'Everyday task managers frequently slow users down with unnecessary nested menus for simple daily planning.',
    architecture:
      'Predictable unidirectional state flow supporting zero-latency task toggling, active/completed segmentation, and clean keyboard-first interactions.',
    highlights: [
      'Real-time task filtering across All, Active, and Completed views',
      'Quick task creation, completion toggling, and removal controls',
      'Minimalist layout tuned for rapid daily task capture'
    ],
    previewType: 'todo'
  }
];

export const EXPERIENCES = [
  {
    id: 'aptech-associate',
    role: 'Teaching Associate',
    organization: 'Aptech - MSG',
    period: 'Mar 2025 – Present',
    location: 'Karachi, Pakistan',
    type: 'work',
    summary:
      'Leading practical web development instruction, cohort mentorship, and full-stack project evaluations.',
    bullets: [
      'Train students in modern Web Development and Programming fundamentals.',
      'Mentor students through hands-on capstone projects and industry coding practices.',
      'Conduct practical lab sessions, technical assessments, and structured coding activities.'
    ],
    focusAreas: ['Web Development Instruction', 'Project Mentorship', 'Practical Labs']
  },
  {
    id: 'aptech-assistant',
    role: 'Teaching Assistant',
    organization: 'Aptech - MSG',
    period: 'Aug 2024 – Mar 2025',
    location: 'Karachi, Pakistan',
    type: 'work',
    summary:
      'Supported instructors and students with live debugging, technical troubleshooting, and core programming concepts.',
    bullets: [
      'Helped students debug frontend and backend code and resolve technical blockers.',
      'Assisted the lead instructor in delivering Web Development and Programming coursework.'
    ],
    focusAreas: ['Live Debugging', 'Student Support', 'JavaScript & UI']
  },
  {
    id: 'shahjee-brothers',
    role: 'Office Assistant',
    organization: 'Shahjee Brothers & Co',
    period: 'Oct 2021 – Jul 2024',
    location: 'Karachi, Pakistan',
    type: 'work',
    summary:
      'Managed structured operational records, documentation workflows, and daily administrative coordination.',
    bullets: [
      'Managed daily administrative tasks including filing, accurate data entry, and document handling.',
      'Maintained organized records, paperwork pipelines, and daily office operations.'
    ],
    focusAreas: ['Operations', 'Data Accuracy', 'Documentation']
  }
];

export const EDUCATION = [
  {
    id: 'fuuast-bscs',
    role: 'Bachelor in Computer Science',
    organization: 'Federal Urdu University Karachi',
    period: '2022 – 2026',
    location: 'Karachi, Pakistan',
    type: 'education',
    summary:
      'Undergraduate computer science degree focused on software engineering, database systems, algorithms, and modern web architectures.',
    bullets: [
      'Core coursework in Data Structures, Database Management Systems, Software Engineering, and Web Technologies.',
      'Applied academic principles directly into full-stack MERN projects and AI-enabled web apps.'
    ],
    focusAreas: ['Computer Science', 'Database Systems', 'Software Engineering']
  },
  {
    id: 'bik-inter',
    role: 'Intermediate in Computer Science',
    organization: 'Board of Intermediate Karachi',
    period: '2018 – 2020',
    location: 'Karachi, Pakistan',
    type: 'education',
    summary:
      'Pre-university foundation in computer science fundamentals, mathematics, and analytical problem solving.',
    bullets: [
      'Built strong foundations in structured programming, logic design, and mathematics.'
    ],
    focusAreas: ['Computing Foundations', 'Mathematics', 'Problem Solving']
  }
];

export const SKILL_GROUPS = [
  {
    id: 'frontend',
    index: '01',
    title: 'Frontend Engineering',
    description: 'Accessible, responsive component systems with clean state management.',
    items: [
      'React JS',
      'JavaScript (ES6+)',
      'Redux',
      'Tailwind CSS',
      'MUI (Material UI)',
      'Bootstrap',
      'HTML5 & CSS3',
      'jQuery'
    ]
  },
  {
    id: 'mern',
    index: '02',
    title: 'MERN & Backend APIs',
    description: 'End-to-end JavaScript architecture from REST routing to database persistence.',
    items: [
      'Node.js',
      'Express.js',
      'MongoDB',
      'REST APIs',
      'Server Validation',
      'MVC & Service Patterns'
    ]
  },
  {
    id: 'databases',
    index: '03',
    title: 'Databases & Cloud',
    description: 'Relational and NoSQL data modeling tailored to application query patterns.',
    items: ['MongoDB', 'MySQL', 'SQL Server', 'Supabase']
  },
  {
    id: 'ai-tools',
    index: '04',
    title: 'AI Development & Tooling',
    description: 'Integrating modern AI APIs alongside disciplined Git and UI design workflows.',
    items: ['AI APIs', 'AI-Powered Web Apps', 'Git', 'GitHub', 'Figma']
  }
];

export const MARQUEE_ITEMS = [
  'React JS',
  'Node.js',
  'Express.js',
  'MongoDB',
  'AI APIs',
  'Tailwind CSS',
  'MUI',
  'Redux',
  'MySQL',
  'SQL Server',
  'Supabase',
  'REST APIs',
  'Figma',
  'Git & GitHub'
];
