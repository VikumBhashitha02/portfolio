import { certifications } from "../data/achievements";
import "./styles/Certifications.css";
import { MdArrowOutward, MdVerified } from "react-icons/md";
import { FaLinkedinIn } from "react-icons/fa6";

const Certifications = () => {
  return (
    <div className="certifications-section" aria-labelledby="certs-heading">
      <div className="certifications-container section-container">
        <div className="certifications-header">
          <span className="section-label">// CERTIFICATIONS</span>
          <h2 className="section-title" id="certs-heading">
            Certificates & <span className="accent">Learning</span>
          </h2>
        </div>

        <div className="certs-grid">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="cert-card"
              style={{ "--cert-color": cert.color } as React.CSSProperties}
            >
              <div className="cert-icon" style={{ color: cert.color }}>
                <MdVerified />
              </div>
              <div className="cert-content">
                <h3 className="cert-title">{cert.title}</h3>
                <p className="cert-issuer">{cert.issuer}</p>
              </div>
              <div className="cert-glow" aria-hidden="true" />
            </div>
          ))}
        </div>

        <div className="certs-more">
          <p className="certs-more-text">
            View my LinkedIn profile for more certifications and professional
            updates.
          </p>
          <a
            href="https://www.linkedin.com/in/vikum-bhashitha-187541246/"
            target="_blank"
            rel="noopener noreferrer"
            className="certs-more-btn"
            aria-label="View more certifications on LinkedIn (opens in new tab)"
            data-cursor="disable"
          >
            <FaLinkedinIn />
            View More Certifications
            <MdArrowOutward />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Certifications;
