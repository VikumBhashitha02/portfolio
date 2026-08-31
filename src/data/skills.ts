export interface Skill {
  name: string;
  level?: "expert" | "advanced" | "intermediate";
}

export interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    name: "Programming Languages",
    icon: "code",
    color: "#5eead4",
    skills: [
      { name: "Python", level: "expert" },
      { name: "JavaScript", level: "expert" },
      { name: "TypeScript", level: "expert" },
      { name: "Java", level: "advanced" },
      { name: "SQL", level: "advanced" },
    ],
  },
  {
    id: "frontend",
    name: "Frontend",
    icon: "monitor",
    color: "#818cf8",
    skills: [
      { name: "React.js", level: "expert" },
      { name: "Next.js", level: "advanced" },
      { name: "Angular", level: "intermediate" },
      { name: "HTML5", level: "expert" },
      { name: "CSS", level: "expert" },
      { name: "Tailwind CSS", level: "expert" },
    ],
  },
  {
    id: "backend",
    name: "Backend & APIs",
    icon: "server",
    color: "#34d399",
    skills: [
      { name: "Node.js", level: "expert" },
      { name: "Express.js", level: "expert" },
      { name: "NestJS", level: "intermediate" },
      { name: "Spring Boot", level: "intermediate" },
      { name: "FastAPI", level: "intermediate" },
      { name: "Flask", level: "intermediate" },
      { name: "REST APIs", level: "expert" },
      { name: "Microservices", level: "advanced" },
    ],
  },
  {
    id: "databases",
    name: "Databases",
    icon: "database",
    color: "#fb923c",
    skills: [
      { name: "MongoDB", level: "expert" },
      { name: "PostgreSQL", level: "advanced" },
      { name: "MySQL", level: "advanced" },
      { name: "SQLite", level: "advanced" },
    ],
  },
  {
    id: "aiml",
    name: "AI / ML",
    icon: "brain",
    color: "#e879f9",
    skills: [
      { name: "Natural Language Processing", level: "advanced" },
      { name: "Sentiment Analysis", level: "advanced" },
      { name: "Hugging Face Transformers", level: "advanced" },
      { name: "Transformer Models", level: "intermediate" },
      { name: "OpenCV", level: "advanced" },
      { name: "MediaPipe", level: "advanced" },
      { name: "DeepFace", level: "intermediate" },
      { name: "Computer Vision", level: "advanced" },
    ],
  },
  {
    id: "cloud",
    name: "Cloud / DevOps / Tools",
    icon: "cloud",
    color: "#38bdf8",
    skills: [
      { name: "AWS", level: "intermediate" },
      { name: "Docker", level: "intermediate" },
      { name: "Git", level: "expert" },
      { name: "GitHub", level: "expert" },
      { name: "Postman", level: "expert" },
      { name: "VS Code", level: "expert" },
      { name: "Linux", level: "intermediate" },
      { name: "Windows", level: "expert" },
    ],
  },
  {
    id: "engineering",
    name: "Software Engineering",
    icon: "settings",
    color: "#fbbf24",
    skills: [
      { name: "SDLC", level: "advanced" },
      { name: "Testing & Debugging", level: "advanced" },
      { name: "Secure Coding", level: "advanced" },
      { name: "JWT Authentication", level: "expert" },
      { name: "Role-Based Access Control", level: "expert" },
      { name: "Agile", level: "advanced" },
      { name: "Code Review", level: "advanced" },
      { name: "Clean Architecture", level: "advanced" },
    ],
  },
];

export default skillCategories;
