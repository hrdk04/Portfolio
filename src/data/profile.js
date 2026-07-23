export const profile = {
  name: 'Hardik Patel',
  firstName: 'Hardik',
  lastName: 'Patel',
  role: 'Software Developer',
  headline: 'Building polished mobile & web products with a product-minded approach.',
  email: 'patelhardik.contact@gmail.com',
  location: 'Valsad, Gujarat, India',
  githubPrimary: 'https://github.com/hrdk04',
  githubSecondary: 'https://github.com/hrdk-rootmode',
  linkedin: import.meta.env.VITE_LINKEDIN_URL || '',
  resumeFileName: 'Hardik_Patel_Resume.pdf',
  availability: {
    status: 'available',
    text: 'Open to full-time roles',
  },
};

export const techStack = ['React Native', 'React', 'Node.js', 'Python', 'MongoDB', 'PostgreSQL'];

export const aboutBlocks = [
  {
    label: 'Who I Am',
    content: 'A software developer pursuing MSc in Computer Applications, focused on shipping real-world mobile and web applications that solve practical problems.',
  },
  {
    label: 'What I Build',
    content: 'Cross-platform mobile apps with React Native, full-stack web applications with the MERN stack, and automation tools with Python and Flask.',
  },
  {
    label: 'How I Work',
    content: 'Product-minded approach — clean code, practical delivery, strong fundamentals. I build to ship, not just to learn.',
  },
];

export const stats = [
  { value: '19', label: 'Public Repositories' },
  { value: '139', label: 'Contributions' },
  { value: '6+', label: 'Technologies' },
];

export const education = [
  {
    degree: 'MSc in Computer Application',
    school: 'Dolat-Usha Institute of Applied Science, Valsad',
    board: 'VNSGU, Surat',
    period: '2025 — Present',
    current: true,
  },
  {
    degree: 'BSc in Computer Science',
    school: 'Dolat-Usha Institute of Applied Science, Valsad',
    board: 'VNSGU, Surat',
    period: '2022 — 2025',
    details: 'CGPA: 7.39 / 10 · First Class with Distinction',
  },
];

export const achievements = [
  'First-Year Practical Top Ranker',
  'Published Research Abstract',
  'Research Poster Presenter — AFTBIS International Conference',
];

export const certifications = [
  {
    title: 'Python Completion',
    issuer: 'YHILLs',
    date: '2025',
    description: 'Comprehensive Python programming course covering fundamentals through advanced application development.',
    color: '#3B82F6',
  },
  {
    title: 'Web Development Project Completion',
    issuer: 'YHILLs',
    date: '2025',
    description: 'Full-stack web development project certification demonstrating practical implementation skills.',
    color: '#10B981',
  },
];

export const primaryExpertise = [
  {
    title: 'React Native Development',
    description: 'Cross-platform mobile apps with strong UX and maintainable architecture.',
    technologies: ['React Native', 'Expo', 'JavaScript'],
  },
  {
    title: 'MERN Stack',
    description: 'Full-stack web applications with React, Node.js, Express, and MongoDB.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
  },
  {
    title: 'Python Development',
    description: 'Automation, APIs, and backend workflows with Python and Flask.',
    technologies: ['Python', 'Flask', 'SQLite'],
  },
];

export const supportingSkills = [
  { category: 'Languages', items: ['JavaScript', 'Python', 'Java', 'C', 'C++', 'C#', 'PHP', 'Kotlin'] },
  { category: 'Frontend', items: ['HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap'] },
  { category: 'Databases', items: ['MongoDB', 'PostgreSQL', 'MySQL', 'SQLite', 'Firebase'] },
  { category: 'Tools', items: ['Git', 'GitHub', 'VS Code', 'Postman'] },
];

export const currentlyLearning = [
  'Advanced React Native patterns',
  'System design fundamentals',
  'AI-enabled product development',
];

export const socialLinks = [
  { label: 'GitHub', href: profile.githubPrimary, icon: 'github' },
  { label: 'GitHub 2', href: profile.githubSecondary, icon: 'github' },
  { label: 'Email', href: `mailto:${profile.email}`, icon: 'mail' },
  { label: 'LinkedIn', href: profile.linkedin || '#', icon: 'linkedin' },
];