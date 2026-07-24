const featuredProjectsList = [
  {
    name: 'DealHunt',
    description: 'Cross-platform price comparison app with real-time deal tracking, smart scoring, and price history insights.',
    problem: 'Finding the best deals across platforms is manual, tedious, and time-consuming.',
    solution: 'Built a real-time price tracking system with smart deal scoring and visual price history.',
    tech: ['React Native', 'Python', 'PostgreSQL', 'Firebase'],
    features: ['Real-time price tracking', 'Smart deal scoring', 'Price history visualization'],
    repoUrl: 'https://github.com/hrdk04/DealHunt',
    color: '#3b82f6',
    featured: true,
    image: "/images/project1.png",            // Make sure this points to your screenshot
    presentationUrl: "/docs/project1.pdf",    // Make sure this points to your PDF
  },
  {
    name: 'CareDAC',
    description: 'Caregiver and patient management platform with appointment scheduling, profile management, and dashboard workflows.',
    problem: 'Coordinating caregiver schedules and patient data across multiple workflows is error-prone.',
    solution: 'Created a unified dashboard platform for managing caregivers, patients, and appointments.',
    tech: ['Flask', 'Python', 'MySQL'],
    features: ['Caregiver management', 'Patient workflows', 'Dashboard tooling'],
    repoUrl: 'https://github.com/hrdk04/CareDAC',
    color: '#10b981',
    featured: true,
    image: "/images/project2.png", 
  },
  {
    name: 'Playzone',
    description: 'Full-stack gaming tournament platform for creating events, joining matches, and chatting in real time.',
    problem: 'Organizing gaming tournaments requires juggling multiple tools for scheduling, communication, and tracking.',
    solution: 'Built an all-in-one platform with tournament creation, real-time chat, and admin dashboards.',
    tech: ['JavaScript', 'Node.js', 'Socket.io'],
    features: ['Tournament creation', 'Real-time chat', 'User and admin dashboards'],
    repoUrl: 'https://github.com/hrdk04/Playzone',
    color: '#8b5cf6',
    featured: true,
    image: "/images/project3.png",            // Make sure this points to your screenshot
    presentationUrl: "/docs/project3.pdf", 
  },
];

const otherProjects = [
  {
    name: 'DealHunt Scraper',
    description: 'Multi-platform data scraper that normalizes deal data for discovery workflows.',
    tech: ['JavaScript', 'Node.js'],
    repoUrl: 'https://github.com/hrdk-rootmode/dealhunt-scraper',
  },
  {
    name: 'BachatKaro',
    description: 'Python-based savings and deal assistant built around practical automation workflows.',
    tech: ['Python'],
    repoUrl: 'https://github.com/hrdk-rootmode/BachatKaro',
  },
  {
    name: 'LiveChat',
    description: 'Real-time chat implementation using socket-based communication patterns.',
    tech: ['JavaScript', 'Socket.io'],
    repoUrl: 'https://github.com/hrdk04/LiveChat-using-socket.io',
  },
  {
    name: 'DealHunt Mono',
    description: 'Monorepo foundation for organizing DealHunt features and shared modules.',
    tech: ['JavaScript'],
    repoUrl: 'https://github.com/hrdk-rootmode/Dealhunt-MONO',
  },
  {
    name: 'Product Monitoring',
    description: 'Tracks product updates and monitors changing information over time.',
    tech: ['Python'],
    repoUrl: 'https://github.com/hrdk-rootmode/ProductMonitoring',
  },
  {
    name: 'Medicine Reminder',
    description: 'Mobile reminder app concept for managing medication schedules.',
    tech: ['Kotlin'],
    repoUrl: 'https://github.com/hrdk-rootmode/Medicin_reminder',
  },
  {
    name: 'Smart Reminder',
    description: 'Smart notification-based utility app with intelligent reminder logic.',
    tech: ['Kotlin'],
    repoUrl: 'https://github.com/hrdk-rootmode/Smart-Reminder',
  },
  {
    name: 'Microservices Demo',
    description: 'Workshop demo showing the basics of service-based architecture.',
    tech: ['JavaScript'],
    repoUrl: 'https://github.com/hrdk04/Microservices-Demo-Day-1-',
  },
];

export const featuredProjects = featuredProjectsList;

export const allProjects = [...featuredProjectsList, ...otherProjects];