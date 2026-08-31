import { useState, useRef, useEffect } from "react";
import projects, { Project } from "../data/projects";
import ProjectModal from "./ProjectModal";
import "./styles/Projects.css";
import { MdArrowOutward, MdArrowForward } from "react-icons/md";
import { FaGithub, FaLinkedinIn, FaGlobe } from "react-icons/fa6";

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
}

const ProjectCardImage = ({
  src,
  alt,
  onError,
}: {
  src: string;
  alt: string;
  onError: () => void;
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [triedFallback, setTriedFallback] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setTriedFallback(false);
  }, [src]);

  const handleError = () => {
    if (!triedFallback) {
      setTriedFallback(true);
      if (currentSrc.includes("learnly.png")) {
        setCurrentSrc(currentSrc.replace("learnly.png", "Learnly.png"));
        return;
      }
      if (currentSrc.includes("Learnly.png")) {
        setCurrentSrc(currentSrc.replace("Learnly.png", "learnly.png"));
        return;
      }
    }
    onError();
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      className="project-card-img"
      loading="lazy"
      onError={handleError}
    />
  );
};

const ProjectCard = ({ project, onOpen }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);
  const hasImage = project.images.length > 0;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth <= 768) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(4px)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform =
        "perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0)";
    }
  };

  const linkIcon = (type: string) => {
    if (type === "github") return <FaGithub />;
    if (type === "linkedin") return <FaLinkedinIn />;
    return <FaGlobe />;
  };

  return (
    <div
      ref={cardRef}
      className={`project-card ${project.isResearch ? "project-card-research" : ""}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image area */}
      <div className="project-card-img-wrap">
        {hasImage && !imgError ? (
          <ProjectCardImage
            src={project.images[0]}
            alt={project.title}
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className={`project-card-placeholder ${project.isResearch ? "project-card-placeholder-research" : ""}`}
          >
            <div className="project-card-placeholder-content">
              {project.isResearch ? (
                <>
                  <span className="project-card-placeholder-icon">🧠</span>
                  <span>Research Project</span>
                  <span className="project-card-placeholder-sub">
                    Academic Visualization
                  </span>
                </>
              ) : (
                <>
                  <span className="project-card-placeholder-icon">💻</span>
                  <span>{project.category}</span>
                </>
              )}
            </div>
            {/* Decorative grid lines */}
            <div className="project-card-placeholder-grid" aria-hidden="true">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="project-placeholder-line-h" />
              ))}
              {[...Array(6)].map((_, i) => (
                <div key={i} className="project-placeholder-line-v" />
              ))}
            </div>
          </div>
        )}

        {/* Number badge */}
        <div className="project-num-badge">{project.number}</div>

        {/* Quick Navigate Icons in Top-Right of Card */}
        {project.links.length > 0 && (
          <div
            className="project-card-overlay-links"
            role="group"
            aria-label="Quick links"
          >
            {project.links.map((link) => (
              <a
                key={link.label + link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`project-nav-icon-btn project-nav-${link.type}`}
                aria-label={`${link.label} for ${project.title} (opens in new tab)`}
                title={link.label}
                onClick={(e) => e.stopPropagation()}
                data-cursor="disable"
              >
                {linkIcon(link.type)}
                <span className="project-nav-tooltip">{link.label}</span>
              </a>
            ))}
          </div>
        )}

        {/* Category badge */}
        <div className="project-category-badge">{project.category}</div>
      </div>

      {/* Content */}
      <div className="project-card-content">
        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-desc">
          {project.description.slice(0, 160)}
          {project.description.length > 160 ? "…" : ""}
        </p>

        {/* Tech badges */}
        {project.technologies.length > 0 && (
          <div className="project-card-tech">
            {project.technologies.slice(0, 5).map((t) => (
              <span key={t} className="tech-badge">
                {t}
              </span>
            ))}
            {project.technologies.length > 5 && (
              <span className="tech-badge tech-badge-more">
                +{project.technologies.length - 5}
              </span>
            )}
          </div>
        )}

        {/* Features preview */}
        {project.features.length > 0 && (
          <div className="project-card-features">
            {project.features.slice(0, 3).map((f) => (
              <span key={f} className="project-feature-tag">
                ✓ {f}
              </span>
            ))}
          </div>
        )}

        {/* Footer with links */}
        <div className="project-card-footer">
          <button
            className="project-detail-btn"
            onClick={() => onOpen(project)}
            aria-label={`View details for ${project.title}`}
            data-cursor="disable"
          >
            View Details <MdArrowForward />
          </button>

          {project.links.length > 0 && (
            <div className="project-card-links" role="group" aria-label="Project links">
              {project.links.map((link) => (
                <a
                  key={link.label + link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`project-card-link project-card-link-${link.type}`}
                  aria-label={`${link.label} for ${project.title} (opens in new tab)`}
                  title={link.label}
                  onClick={(e) => e.stopPropagation()}
                  data-cursor="disable"
                >
                  <span className="project-link-icon">{linkIcon(link.type)}</span>
                  <span className="project-link-tooltip">{link.label}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Hover glow */}
      <div className="project-card-glow" aria-hidden="true" />
    </div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div
      className="projects-section"
      id="projects"
      aria-labelledby="projects-heading"
    >
      <div className="projects-container section-container">
        <div className="projects-header">
          <span className="section-label">// FEATURED PROJECTS</span>
          <h2 className="section-title" id="projects-heading">
            Things I've <span className="accent">Built</span>
          </h2>
          <p className="section-subtitle">
            Real-world systems, applications, and research projects I've built.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={setSelectedProject}
            />
          ))}
        </div>

        {/* More Projects */}
        <div className="more-projects">
          <div className="more-projects-content">
            <h3 className="more-projects-title">More Projects</h3>
            <p className="more-projects-desc">
              Explore more of my development work and experiments.
            </p>
            <div className="more-projects-btns">
              <a
                href="https://github.com/VikumBhashitha02"
                target="_blank"
                rel="noopener noreferrer"
                className="more-btn more-btn-primary"
                aria-label="Explore GitHub profile"
                data-cursor="disable"
              >
                <FaGithub /> Explore GitHub <MdArrowOutward />
              </a>
              <a
                href="https://www.linkedin.com/in/vikum-bhashitha-187541246/"
                target="_blank"
                rel="noopener noreferrer"
                className="more-btn more-btn-secondary"
                aria-label="View LinkedIn profile"
                data-cursor="disable"
              >
                <FaLinkedinIn /> View LinkedIn <MdArrowOutward />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};

export default Projects;
