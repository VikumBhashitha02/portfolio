import { PropsWithChildren, useEffect, useState } from "react";
import "./styles/Landing.css";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { MdEmail, MdArrowForward, MdDownload } from "react-icons/md";

const PHRASES = [
  { prefix: "Building Digital", suffix: "Experiences." },
  { prefix: "Building Intelligent", suffix: "Systems." },
];

const Landing = ({ children }: PropsWithChildren) => {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [animState, setAnimState] = useState<"visible" | "exit" | "enter">("visible");

  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Smoothly glide up & fade out
      setAnimState("exit");

      setTimeout(() => {
        // 2. Switch text & position below
        setPhraseIdx((prev) => (prev + 1) % PHRASES.length);
        setAnimState("enter");

        // 3. Glide up into place & fade in
        requestAnimationFrame(() => {
          setTimeout(() => {
            setAnimState("visible");
          }, 40);
        });
      }, 400);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="landing-section" id="home" aria-label="Hero section">
        <div className="landing-container">
          {/* LEFT: Hero Text */}
          <div className="landing-intro">
            <div className="landing-label">
              FULL-STACK DEVELOPER · AI/ML ENGINEER
            </div>
            <h2 className="landing-greeting">Hi, I'm</h2>
            <h1 className="landing-name">
              VIKUM
              <br />
              <span>BHASHITHA</span>
            </h1>
          </div>

          {/* RIGHT: Tagline + CTA */}
          <div className="landing-info">
            <div className="landing-headline-container">
              <div className={`landing-headline-content ${animState}`}>
                <h2 className="landing-headline-prefix">
                  {PHRASES[phraseIdx].prefix}
                </h2>
                <h2 className="landing-headline-suffix">
                  {PHRASES[phraseIdx].suffix}
                </h2>
              </div>
            </div>

            <p className="landing-tagline">
              I build modern, scalable web applications and intelligent software
              solutions using full-stack technologies, AI/ML, and secure
              software engineering practices.
            </p>

            <div className="landing-cta">
              <a
                href="#projects"
                className="landing-btn landing-btn-primary"
                onClick={scrollToProjects}
                aria-label="View my projects"
                data-cursor="disable"
              >
                View My Projects <MdArrowForward />
              </a>
              <a
                href="/Vikum%20CV.pdf"
                className="landing-btn landing-btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download CV"
                data-cursor="disable"
              >
                Download CV <MdDownload />
              </a>
            </div>

            <div className="landing-social">
              <a
                href="https://www.linkedin.com/in/vikum-bhashitha-187541246/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="landing-social-icon"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://github.com/VikumBhashitha02"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="landing-social-icon"
              >
                <FaGithub />
              </a>
              <a
                href="mailto:vbhashitha02@gmail.com"
                aria-label="Send Email"
                className="landing-social-icon"
              >
                <MdEmail />
              </a>
              <a
                href="https://wa.me/qr/WKUXFL4JYL7VH1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="landing-social-icon"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
