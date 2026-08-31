export interface ProjectLink {
  label: string;
  url: string;
  type: "live" | "github" | "linkedin" | "post";
}

export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  images: string[];
  description: string;
  technologies: string[];
  features: string[];
  architecture?: string[];
  workflow?: string[];
  security?: string[];
  links: ProjectLink[];
  isResearch?: boolean;
}

const projects: Project[] = [
  {
    id: "vikum-agro-erp",
    number: "01",
    title: "Vikum Agro ERP & Supply Chain Management System",
    category: "Enterprise ERP & Supply Chain Management",
    images: [
      "/images/projects/vikumagro1.png",
    ],
    description:
      "A full-stack Enterprise Resource Planning and Supply Chain Management System developed for Vikum Agro Products (Pvt) Ltd. The platform centralizes agricultural business operations including supplier registration, crop collections, inventory, warehouse management, transportation, payments, finance, customer orders, notifications, and reporting.",
    technologies: [
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Shadcn/UI",
      "TanStack Query",
      "React Router",
      "Recharts",
      "Framer Motion",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "JWT",
      "Bcrypt",
      "Multer",
    ],
    features: [
      "Role-Based Access Control",
      "Supplier Portal",
      "Inventory Management",
      "Warehouse Management",
      "Transport & Logistics",
      "Financial Management",
      "Analytics & Reporting",
      "Audit Logging",
      "Supplier Data Isolation",
    ],
    architecture: [
      "Clean Architecture",
      "Service Layer Pattern",
      "Repository Pattern",
      "REST API Design",
    ],
    workflow: [
      "Supplier Registration",
      "Admin Review",
      "Approval",
      "Account Activation",
      "Supplier Portal",
      "Harvest Request",
      "Collection",
      "Payment",
    ],
    security: [
      "JWT Authentication",
      "Refresh Tokens",
      "Bcrypt Password Hashing",
      "Role-Based API Protection",
      "Rate Limiting",
      "Input Validation",
      "Audit Logging",
    ],
    links: [
      {
        label: "Live Demo",
        url: "https://vikumagroproducts022.netlify.app/",
        type: "live",
      },
      {
        label: "GitHub",
        url: "https://github.com/VikumBhashitha02",
        type: "github",
      },
      {
        label: "LinkedIn Post",
        url: "https://www.linkedin.com/posts/vikum-bhashitha-187541246_fullstackdevelopment-reactjs-typescript-activity-7499380398255296512-O1JV?utm_source=share&utm_medium=member_desktop&rcm=ACoAADzyp7cBcNAtAX5NCFX2kMeFh6Hko-FbqhA",
        type: "linkedin",
      },
    ],
  },
  {
    id: "saaga-lms",
    number: "02",
    title: "SAAGA Institute LMS",
    category: "Full-Stack Learning Management System",
    images: ["/images/projects/saaga1.png"],
    description:
      "A role-based Learning Management System designed to streamline student, teacher, class, attendance, enrollment, payment, and reporting management through dedicated Admin, Staff, and Student portals.",
    technologies: [
      "Next.js 16",
      "TypeScript",
      "Tailwind CSS",
      "MongoDB",
      "Mongoose",
      "JWT",
      "HTTP-only Cookies",
      "bcrypt",
      "Cloudinary",
      "qrcode",
      "html5-qrcode",
    ],
    features: [
      "Admin Management Portal",
      "Staff Workspace",
      "Student Portal",
      "QR Code Attendance",
      "Payment Management",
      "Reports & Analytics",
      "Role-Based Access Control",
      "Secure Authentication",
    ],
    security: [
      "JWT Authentication",
      "HTTP-only Secure Cookies",
      "Role-Based Access Control",
      "Protected Routes",
      "Server-side Permission Verification",
      "Bcrypt",
      "Secure Random Attendance Tokens",
    ],
    workflow: [
      "Student Registration",
      "Admin Approval",
      "Account Activation",
      "Login",
      "Class Enrollment",
      "QR Attendance",
      "Payment",
      "Reports & Analytics",
    ],
    links: [
      {
        label: "GitHub",
        url: "https://lnkd.in/gzPFw_9q",
        type: "github",
      },
      {
        label: "LinkedIn Post",
        url: "https://www.linkedin.com/posts/vikum-bhashitha-187541246_nextjs-typescript-mongodb-activity-7499371802238963712-dNzM?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAADzyp7cBcNAtAX5NCFX2kMeFh6Hko-FbqhA",
        type: "linkedin",
      },
    ],
  },
  {
    id: "printing-press",
    number: "03",
    title: "Printing Press Management System",
    category: "MERN Full-Stack Management System",
    images: [
      "/images/projects/printing1.png",
    ],
    description:
      "A MERN-stack Printing Press Management System developed to manage printing press operations, including product and category management.",
    technologies: ["MongoDB", "Express.js", "React.js", "Node.js"],
    features: ["Product Management", "Category Management", "Order Tracking"],
    links: [
      {
        label: "Live Demo",
        url: "https://clinquant-sable-3d800.netlify.app/",
        type: "live",
      },
      {
        label: "GitHub",
        url: "https://github.com/VikumBhashitha02/Printing-Press-Management-System",
        type: "github",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/vikum-bhashitha-187541246/",
        type: "linkedin",
      },
    ],
  },
  {
    id: "intellitask",
    number: "04",
    title: "IntelliTask",
    category: "Cross-Platform Personal Assistant",
    images: ["/images/projects/intellitask.png"],
    description:
      "A full-stack task-management and personal assistant application combining a React interface, Node.js/Express REST API, MongoDB, secure authentication, and natural-language voice/text interaction.",
    technologies: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "bcrypt",
      "Google Speech API",
    ],
    features: [
      "Task Management",
      "Voice Interaction",
      "Natural Language Processing",
      "Secure Authentication",
      "REST API",
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/VikumBhashitha02/Intellitask",
        type: "github",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/vikum-bhashitha-187541246/",
        type: "linkedin",
      },
    ],
  },
  {
    id: "yc-scraper",
    number: "05",
    title: "YC Startup Scraper",
    category: "Python Automation Pipeline",
    images: ["/images/projects/scraper.png"],
    description:
      "A Python-based web scraping and automation pipeline designed to extract structured information from 500+ startup records and export the collected data for downstream analysis.",
    technologies: ["Python", "Selenium", "Pandas", "ChromeDriver"],
    features: [
      "500+ Startup Records",
      "Structured Data Extraction",
      "Automated Browser Control",
      "CSV Export",
      "Data Pipeline",
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/VikumBhashitha02/Web-Scrapting-and-Automation",
        type: "github",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/vikum-bhashitha-187541246/",
        type: "linkedin",
      },
    ],
  },
  {
    id: "learnly",
    number: "06",
    title: "Learnly",
    category: "Student Learning Web Application",
    images: ["/images/projects/Learnly.png"],
    description:
      "Learnly is an intuitive web application designed to help students organize, track, and enhance their learning experience efficiently.",
    technologies: [],
    features: [
      "Learning Organization",
      "Progress Tracking",
      "Study Enhancement",
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/VikumBhashitha02/Learnly",
        type: "github",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/vikum-bhashitha-187541246/",
        type: "linkedin",
      },
    ],
  },
  {
    id: "cognianimate",
    number: "07",
    title: "CogniAnimate",
    category: "AI-Driven Visual Learning System for Grade 6 Science Education",
    images: ["/images/projects/cognianimate.png"],
    description:
      "An independent academic research project exploring interactive visual learning through procedural 2D/3D educational visualizations and AI-assisted content processing.",
    technologies: [
      "JavaScript",
      "HTML5 Canvas",
      "WebGL",
      "GLSL",
      "Hugging Face Transformers",
    ],
    features: [
      "Solar System Module",
      "Gravity Module",
      "Procedural 2D/3D Visualizations",
      "AI-Assisted Content Processing",
      "Interactive Education",
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/VikumBhashitha02",
        type: "github",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/vikum-bhashitha-187541246/",
        type: "linkedin",
      },
    ],
    isResearch: true,
  },
];

export default projects;
