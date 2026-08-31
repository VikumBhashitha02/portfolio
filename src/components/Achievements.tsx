import { Fragment, useState } from "react";
import { achievements } from "../data/achievements";
import ImageGallery from "./ImageGallery";
import "./styles/Achievements.css";
import { MdPhotoLibrary } from "react-icons/md";

const Achievements = () => {
  const [galleryState, setGalleryState] = useState<{
    isOpen: boolean;
    images: string[];
    title: string;
    index: number;
  }>({ isOpen: false, images: [], title: "", index: 0 });

  const openGallery = (images: string[], title: string, index = 0) => {
    setGalleryState({ isOpen: true, images, title, index });
  };

  const closeGallery = () => {
    setGalleryState((s) => ({ ...s, isOpen: false }));
  };

  return (
    <div
      className="achievements-section"
      id="achievements"
      aria-labelledby="achievements-heading"
    >
      <div className="achievements-container section-container">
        <div className="achievements-header">
          <span className="section-label">// ACHIEVEMENTS</span>
          <h2 className="section-title" id="achievements-heading">
            Milestones &amp; <span className="accent">Recognition</span>
          </h2>
          <p className="section-subtitle">
            Showcases, competitions, and academic achievements.
          </p>
        </div>

        {/* Timeline */}
        <div className="achievements-timeline">
          <div
            className="achievements-timeline-track"
            aria-hidden="true"
          />

          {achievements.map((achievement, index) => {
            const isFirstOfYear =
              index === 0 || achievement.year !== achievements[index - 1].year;
            return (
              <Fragment key={achievement.id}>
                {isFirstOfYear && (
                  <div className="achievements-year">
                    <div className="achievements-year-line" aria-hidden="true" />
                    <span className="achievements-year-badge">{achievement.year}</span>
                    <div className="achievements-year-line" aria-hidden="true" />
                  </div>
                )}
                <div
                  className={`achievement-item ${index % 2 === 0 ? "achievement-item-left" : "achievement-item-right"}`}
                >
              {/* Timeline dot */}
              <div className="achievement-dot" aria-hidden="true">
                <div className="achievement-dot-inner" />
              </div>

              {/* Card */}
              <div className="achievement-card">
                {achievement.highlight && (
                  <div className="achievement-highlight">
                    🏆 {achievement.highlight}
                  </div>
                )}

                <h3 className="achievement-title">{achievement.title}</h3>
                <p className="achievement-desc">{achievement.description}</p>

                {/* Image preview grid */}
                {achievement.images.length > 0 && (
                  <div
                    className="achievement-images"
                    role="group"
                    aria-label={`Photos from ${achievement.title}`}
                  >
                    {achievement.images.slice(0, 2).map((img, i) => (
                      <button
                        key={i}
                        className="achievement-img-btn"
                        onClick={() =>
                          openGallery(achievement.images, achievement.title, i)
                        }
                        aria-label={`View photo ${i + 1} from ${achievement.title}`}
                      >
                        <AchievementImage src={img} alt={achievement.title} index={i} />
                        {i === 1 && achievement.images.length > 2 && (
                          <div className="achievement-img-more">
                            +{achievement.images.length - 2}
                          </div>
                        )}
                      </button>
                    ))}
                    {achievement.images.length > 0 && (
                      <button
                        className="achievement-gallery-btn"
                        onClick={() =>
                          openGallery(achievement.images, achievement.title, 0)
                        }
                        aria-label={`View all ${achievement.images.length} photos`}
                      >
                        <MdPhotoLibrary />
                        View {achievement.images.length > 1 ? "Photos" : "Photo"}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
              </Fragment>
            );
          })}
        </div>
      </div>

    {/* Lightbox */}
    <ImageGallery
      images={galleryState.images}
      alt={galleryState.title}
      isOpen={galleryState.isOpen}
      initialIndex={galleryState.index}
      onClose={closeGallery}
    />
  </div>
);
};

// Helper component for achievement images with fallback
const AchievementImage = ({
  src,
  alt,
  index,
}: {
  src: string;
  alt: string;
  index: number;
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [triedFallback, setTriedFallback] = useState(false);
  const [error, setError] = useState(false);

  const handleError = () => {
    if (!triedFallback) {
      setTriedFallback(true);
      // Automatically handle reserach <-> research spelling variations
      if (currentSrc.includes("reserach")) {
        setCurrentSrc(currentSrc.replace("reserach", "research"));
        return;
      } else if (currentSrc.includes("research")) {
        setCurrentSrc(currentSrc.replace("research", "reserach"));
        return;
      } else if (currentSrc.includes("/images/achievements/")) {
        setCurrentSrc(currentSrc.replace("/images/achievements/", "/images/"));
        return;
      }
    }
    setError(true);
  };

  if (error) {
    return (
      <div className="achievement-img-placeholder">
        <span>📷</span>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={`${alt} — photo ${index + 1}`}
      className="achievement-img"
      loading="lazy"
      onError={handleError}
    />
  );
};

export default Achievements;
