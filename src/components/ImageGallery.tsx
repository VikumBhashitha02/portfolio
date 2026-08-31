import { useState, useEffect, useCallback } from "react";
import { MdArrowBack, MdArrowForward, MdClose } from "react-icons/md";
import "./styles/ImageGallery.css";

interface ImageGalleryProps {
  images: string[];
  alt: string;
  isOpen: boolean;
  initialIndex?: number;
  onClose: () => void;
}

const ImageGallery = ({
  images,
  alt,
  isOpen,
  initialIndex = 0,
  onClose,
}: ImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, goNext, goPrev, onClose]);

  if (!isOpen || images.length === 0) return null;

  return (
    <div
      className="gallery-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery"
      onClick={onClose}
    >
      <div
        className="gallery-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="gallery-close"
          onClick={onClose}
          aria-label="Close gallery"
        >
          <MdClose />
        </button>

        {images.length > 1 && (
          <>
            <button
              className="gallery-nav gallery-nav-prev"
              onClick={goPrev}
              aria-label="Previous image"
            >
              <MdArrowBack />
            </button>
            <button
              className="gallery-nav gallery-nav-next"
              onClick={goNext}
              aria-label="Next image"
            >
              <MdArrowForward />
            </button>
          </>
        )}

        <div className="gallery-image-wrap">
          {imageError[currentIndex] ? (
            <div className="gallery-placeholder" aria-label={alt}>
              <span className="gallery-placeholder-icon">🖼️</span>
              <span>Image not available</span>
            </div>
          ) : (
            <img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`${alt} — ${currentIndex + 1} of ${images.length}`}
              className="gallery-image"
              onError={() =>
                setImageError((prev) => ({ ...prev, [currentIndex]: true }))
              }
            />
          )}
        </div>

        {images.length > 1 && (
          <div className="gallery-counter" aria-live="polite">
            {currentIndex + 1} / {images.length}
          </div>
        )}

        {images.length > 1 && (
          <div className="gallery-dots">
            {images.map((_, i) => (
              <button
                key={i}
                className={`gallery-dot ${i === currentIndex ? "gallery-dot-active" : ""}`}
                onClick={() => setCurrentIndex(i)}
                aria-label={`View image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
