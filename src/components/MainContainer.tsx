import { lazy, PropsWithChildren, Suspense, useEffect, useState } from "react";
import About from "./About";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import Skills from "./Skills";
import Projects from "./Projects";
import Achievements from "./Achievements";
import Certifications from "./Certifications";
import Footer from "./Footer";
import setSplitText from "./utils/splitText";

const TechStack = lazy(() => import("./TechStack"));

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);

    // Hide 3D character once user scrolls to Skills section
    const containerEl = document.querySelector(".container-main") as HTMLElement;
    const handleCharVisibility = () => {
      if (window.innerWidth <= 1024) return;
      const skillsEl = document.querySelector(".skills-section");
      if (!skillsEl || !containerEl) return;
      const skillsTop = skillsEl.getBoundingClientRect().top;
      if (skillsTop < 0) {
        containerEl.classList.add("char-hidden");
      } else {
        containerEl.classList.remove("char-hidden");
      }
    };
    window.addEventListener("scroll", handleCharVisibility, { passive: true });

    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("scroll", handleCharVisibility);
    };
  }, [isDesktopView]);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main className="container-main">
            <Landing>{!isDesktopView && children}</Landing>
            <About />
            <Skills />
            <Projects />
            <Achievements />
            <Certifications />
            {isDesktopView && (
              <Suspense fallback={<div></div>}>
                <TechStack />
              </Suspense>
            )}
            <Contact />
            <Footer />
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
