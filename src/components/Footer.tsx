import "./styles/Footer.css";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About Me", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" aria-label="Site footer">
      <div className="footer-container section-container">
        <div className="footer-top">
          {/* Brand */}
          <div className="footer-brand">
            <a href="/#" className="footer-logo" data-cursor="disable">
              VIKUM<span className="footer-logo-dot">.</span>
            </a>
            <p className="footer-tagline">
              Full-Stack Developer &amp; AI/ML Engineer
            </p>
            <div className="footer-social">
              <a
                href="https://www.linkedin.com/in/vikum-bhashitha-187541246/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://github.com/VikumBhashitha02"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="GitHub Profile"
              >
                <FaGithub />
              </a>
              <a
                href="mailto:vbhashitha02@gmail.com"
                className="footer-social-icon"
                aria-label="Email"
              >
                <MdEmail />
              </a>
              <a
                href="https://wa.me/qr/WKUXFL4JYL7VH1"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <nav className="footer-nav" aria-label="Footer navigation">
            <h3 className="footer-nav-title">Navigation</h3>
            <ul className="footer-nav-list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="footer-nav-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Divider */}
        <div className="footer-divider" aria-hidden="true" />

        {/* Bottom */}
        <div className="footer-bottom">
          <p className="footer-copy">
            © {currentYear} Vikum Bhashitha. All rights reserved.
          </p>
          <p className="footer-built">
            Built with modern web technologies.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
