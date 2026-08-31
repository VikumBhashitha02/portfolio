export interface Achievement {
  id: string;
  year: string;
  title: string;
  subtitle?: string;
  description: string;
  images: string[];
  highlight?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  color: string;
}

export const achievements: Achievement[] = [
  {
    id: "mercon-2026",
    year: "2026",
    title: "MERCon 2026 (IEEE)",
    highlight: "Research Paper Accepted for Publication",
    description:
      "Accepted and presented research work on CogniAnimate, an AI-driven adaptive visual learning system for Grade 6 Science education, at the IEEE International Multidisciplinary Research Conference (MERCon 2026), University of Moratuwa.",
    images: [
      "/images/achievements/reserach1.png",
      "/images/achievements/research2.png",
    ],
  },
  {
    id: "ai-expo-2025",
    year: "2025",
    title: "National AI Expo & Conference 2025",
    description:
      "Represented SLT Mobitel and showcased live AI-based projects at the National AI Expo & Conference 2025.",
    images: [
      "/images/achievements/aiexpo1.png",
      "/images/achievements/aiexpo2.png",
    ],
  },
  {
    id: "techno-2025",
    year: "2025",
    title: "TECHNO 2025 — BMICH",
    description:
      "Presented Gesture Drive, a real-time computer-vision gesture-controlled application at TECHNO 2025.",
    images: [
      "/images/achievements/techno1.png",
      "/images/achievements/techno2.png",
    ],
  },
  {
    id: "agentic-hackathon",
    year: "2025",
    title: "Agentic AI Hackathon",
    description:
      "Participated in an international team competition focused on building AI-driven solutions using agentic AI technologies and IBM watsonx Orchestrate.",
    images: ["/images/achievements/agentic1.png"],
  },
  {
    id: "codearena-2025",
    year: "2025",
    title: "CodeArena 2025",
    highlight: "Finalist — Team Null Pointers",
    description:
      "Demonstrated algorithmic problem-solving, teamwork, and competitive programming skills.",
    images: [
      "/images/achievements/codearena1.png",
      "/images/achievements/codearena2.png",
    ],
  },
];

export const certifications: Certification[] = [
  {
    id: "aiml-1",
    title: "AI/ML Engineer Stage 1 & Stage 2",
    issuer: "SLIIT",
    color: "#5eead4",
  },
  {
    id: "devops-aws",
    title: "Getting Started with DevOps on AWS",
    issuer: "Amazon Web Services",
    color: "#fb923c",
  },
  {
    id: "aws-beginners",
    title: "AWS for Beginners",
    issuer: "Great Learning",
    color: "#fb923c",
  },
  {
    id: "python-beginners",
    title: "Python for Beginners",
    issuer: "CODL, University of Moratuwa",
    color: "#818cf8",
  },
  {
    id: "web-design",
    title: "Web Design for Beginners",
    issuer: "CODL, University of Moratuwa",
    color: "#38bdf8",
  },
];

export default achievements;
