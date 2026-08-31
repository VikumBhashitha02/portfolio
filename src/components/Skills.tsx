import { useState } from "react";
import skillCategories from "../data/skills";
import "./styles/Skills.css";
import {
  FiCode,
  FiMonitor,
  FiServer,
  FiDatabase,
  FiCpu,
  FiCloud,
  FiSettings,
} from "react-icons/fi";

const iconMap: Record<string, React.ReactNode> = {
  code: <FiCode />,
  monitor: <FiMonitor />,
  server: <FiServer />,
  database: <FiDatabase />,
  brain: <FiCpu />,
  cloud: <FiCloud />,
  settings: <FiSettings />,
};

const Skills = () => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCategory = (id: string) => {
    setOpenCategory(openCategory === id ? null : id);
  };

  return (
    <div className="skills-section" id="skills" aria-labelledby="skills-heading">
      <div className="skills-container section-container">
        <div className="skills-header">
          <span className="section-label">// TECHNICAL SKILLS</span>
          <h2 className="section-title" id="skills-heading">
            Technologies & <span className="accent">Tools</span>
          </h2>
          <p className="section-subtitle">
            Technologies and tools I use to build software.
          </p>
        </div>

        <div className="skills-grid">
          {skillCategories.map((category) => {
            const isOpen = openCategory === category.id;
            return (
              <div
                key={category.id}
                className={`skill-card ${isOpen ? "skill-card-open" : ""}`}
                style={{ "--cat-color": category.color } as React.CSSProperties}
                onClick={() => toggleCategory(category.id)}
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                aria-label={`${category.name} skills`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleCategory(category.id);
                  }
                }}
              >
                <div className="skill-card-header">
                  <div
                    className="skill-card-icon"
                    style={{ color: category.color }}
                    aria-hidden="true"
                  >
                    {iconMap[category.icon]}
                  </div>
                  <div className="skill-card-title-wrap">
                    <h3 className="skill-card-title">{category.name}</h3>
                    <span className="skill-card-count">
                      {category.skills.length} skills
                    </span>
                  </div>
                  <div className="skill-card-chevron" aria-hidden="true">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>

                {/* Preview pills — always visible */}
                <div className="skill-card-preview">
                  {category.skills.slice(0, 3).map((skill) => (
                    <span key={skill.name} className="skill-pill skill-pill-preview">
                      {skill.name}
                    </span>
                  ))}
                  {category.skills.length > 3 && (
                    <span className="skill-pill-more">
                      +{category.skills.length - 3}
                    </span>
                  )}
                </div>

                {/* Expanded — all skills */}
                <div className={`skill-card-expand ${isOpen ? "skill-card-expand-open" : ""}`}>
                  <div className="skill-pills-grid">
                    {category.skills.map((skill) => (
                      <span
                        key={skill.name}
                        className={`skill-pill skill-pill-${skill.level || "intermediate"}`}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Decorative corner glow */}
                <div className="skill-card-glow" aria-hidden="true" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Skills;
