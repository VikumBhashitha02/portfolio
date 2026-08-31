import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(true);

    // Scroll-based navbar glass effect
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setScrolled(scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);

    // Desktop smooth scroll links
    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          let anchor = e.currentTarget as HTMLAnchorElement;
          let section = anchor.getAttribute("data-href");
          smoother.scrollTo(section, true, "top top");
        }
      });
    });

    window.addEventListener("resize", () => {
      ScrollSmoother.refresh(true);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMobileNavClick = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      const section = document.querySelector(href);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  const handleDesktopNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (window.innerWidth > 1024) {
      e.preventDefault();
      smoother.scrollTo(href, true, "top top");
    }
  };

  return (
    <>
      <div className={`header ${scrolled ? "header-scrolled" : ""}`}>
        <a href="/#" className="navbar-title" data-cursor="disable">
          VIKUM<span className="navbar-dot">.</span>
        </a>

        {/* Desktop Navigation */}
        <ul className="navbar-desktop-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                data-href={link.href}
                href={link.href}
                onClick={(e) => handleDesktopNavClick(e, link.href)}
              >
                <HoverLinks text={link.label.toUpperCase()} />
              </a>
            </li>
          ))}
        </ul>

        {/* Right side: social icons + hamburger */}
        <div className="navbar-right">
          <a
            href="https://www.linkedin.com/in/vikum-bhashitha-187541246/"
            className="navbar-social-icon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            data-cursor="disable"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://github.com/VikumBhashitha02"
            className="navbar-social-icon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            data-cursor="disable"
          >
            <FaGithub />
          </a>
          <button
            className="hamburger-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            data-cursor="disable"
          >
            {menuOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu ${menuOpen ? "mobile-menu-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <nav className="mobile-menu-nav">
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              className="mobile-menu-link"
              onClick={() => handleMobileNavClick(link.href)}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className="mobile-menu-num">0{i + 1}</span>
              {link.label}
            </button>
          ))}
        </nav>
        <div className="mobile-menu-social">
          <a
            href="https://www.linkedin.com/in/vikum-bhashitha-187541246/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://github.com/VikumBhashitha02"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
        </div>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
