import { useEffect, useState } from "react";
import {
  MdClose,
  MdArrowOutward,
  MdArrowBack,
  MdArrowForward,
} from "react-icons/md";
import { FaGithub, FaLinkedinIn, FaGlobe } from "react-icons/fa6";
import { Project } from "../data/projects";
import "./styles/ProjectModal.css";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const linkIcon = (type: string) => {
  if (type === "github") return <FaGithub />;
  if (type === "linkedin") return <FaLinkedinIn />;
  return <FaGlobe />;
};

const ModalImage = ({
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
      className="modal-gallery-img"
      onError={handleError}
    />
  );
};

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  const [imgIndex, setImgIndex] = useState(0);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (isOpen) {
      setImgIndex(0);
      setImgError({});
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && project && project.images.length > 1)
        setImgIndex((i) => (i + 1) % project.images.length);
      if (e.key === "ArrowLeft" && project && project.images.length > 1)
        setImgIndex(
          (i) => (i - 1 + project.images.length) % project.images.length
        );
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, project, onClose]);

  if (!isOpen || !project) return null;

  const hasImages = project.images && project.images.length > 0;
  const validImages = hasImages
    ? project.images.filter((_, i) => !imgError[i])
    : [];

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        className="modal-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close project details"
        >
          <MdClose />
        </button>

        {/* Scroll container */}
        <div className="modal-body">
          {/* Image gallery */}
          {hasImages && (
            <div className="modal-gallery">
              {imgError[imgIndex] || validImages.length === 0 ? (
                <div className="modal-img-placeholder">
                  <span className="modal-img-placeholder-icon">🖼️</span>
                  <span>Image coming soon</span>
                </div>
              ) : (
                <ModalImage
                  key={imgIndex}
                  src={project.images[imgIndex]}
                  alt={`${project.title} screenshot ${imgIndex + 1}`}
                  onError={() =>
                    setImgError((prev) => ({ ...prev, [imgIndex]: true }))
                  }
                />
              )}

              {project.images.length > 1 && (
                <>
                  <button
                    className="modal-img-nav modal-img-nav-prev"
                    onClick={() =>
                      setImgIndex(
                        (i) =>
                          (i - 1 + project.images.length) % project.images.length
                      )
                    }
                    aria-label="Previous image"
                  >
                    <MdArrowBack />
                  </button>
                  <button
                    className="modal-img-nav modal-img-nav-next"
                    onClick={() =>
                      setImgIndex((i) => (i + 1) % project.images.length)
                    }
                    aria-label="Next image"
                  >
                    <MdArrowForward />
                  </button>
                  <div className="modal-img-counter">
                    {imgIndex + 1} / {project.images.length}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Content */}
          <div className="modal-content">
            {/* Header */}
            <div className="modal-header">
              <span className="modal-category">{project.category}</span>
              <div className="modal-num-wrap">
                <span className="modal-num">{project.number}</span>
                {project.isResearch && (
                  <span className="modal-research-badge">Research</span>
                )}
              </div>
            </div>
            <h2 className="modal-title" id="modal-title">
              {project.title}
            </h2>

            {/* Description */}
            <div className="modal-section">
              <h3 className="modal-section-title">Overview</h3>
              <p className="modal-description">{project.description}</p>
            </div>

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <div className="modal-section">
                <h3 className="modal-section-title">Key Features</h3>
                <ul className="modal-features-list">
                  {project.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech stack */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="modal-section">
                <h3 className="modal-section-title">Technology Stack</h3>
                <div className="modal-tech-grid">
                  {project.technologies.map((t) => (
                    <span key={t} className="tech-badge">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Architecture */}
            {project.architecture && project.architecture.length > 0 && (
              <div className="modal-section">
                <h3 className="modal-section-title">Architecture</h3>
                <div className="modal-tags">
                  {project.architecture.map((a) => (
                    <span key={a} className="modal-tag">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Workflow */}
            {project.workflow && project.workflow.length > 0 && (
              <div className="modal-section">
                <h3 className="modal-section-title">Workflow</h3>
                <div className="modal-workflow">
                  {project.workflow.map((step, i) => (
                    <div key={step} className="modal-workflow-step">
                      <span className="modal-workflow-num">{i + 1}</span>
                      <span>{step}</span>
                      {i < project.workflow!.length - 1 && (
                        <span className="modal-workflow-arrow">→</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Security */}
            {project.security && project.security.length > 0 && (
              <div className="modal-section">
                <h3 className="modal-section-title">Security</h3>
                <ul className="modal-features-list">
                  {project.security.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Links */}
            {project.links && project.links.length > 0 && (
              <div className="modal-section modal-links-section">
                <h3 className="modal-section-title">Links</h3>
                <div className="modal-links">
                  {project.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`modal-link modal-link-${link.type}`}
                      aria-label={`${link.label} (opens in new tab)`}
                    >
                      <span className="modal-link-icon">
                        {linkIcon(link.type)}
                      </span>
                      {link.label}
                      <MdArrowOutward className="modal-link-arrow" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
