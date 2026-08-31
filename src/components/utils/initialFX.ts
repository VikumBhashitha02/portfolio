import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { smoother } from "../Navbar";

export function initialFX() {
  document.body.style.overflowY = "auto";
  smoother.paused(false);
  document.getElementsByTagName("main")[0].classList.add("main-active");
  gsap.to("body", {
    backgroundColor: "#0a0e17",
    duration: 0.5,
    delay: 1,
  });

  // Animate hero text characters
  const landingTextElements = [
    ".landing-label",
    ".landing-greeting",
    ".landing-name",
  ].filter((sel) => document.querySelector(sel));

  if (landingTextElements.length > 0) {
    var landingText = new SplitText(landingTextElements, {
      type: "chars,lines",
      linesClass: "split-line",
    });
    gsap.fromTo(
      landingText.chars,
      { opacity: 0, y: 80, filter: "blur(5px)" },
      {
        opacity: 1,
        duration: 1.2,
        filter: "blur(0px)",
        ease: "power3.inOut",
        y: 0,
        stagger: 0.025,
        delay: 0.3,
      }
    );
  }

  // Animate the rotating headline container entrance
  const headlineEl = document.querySelector(".landing-headline-container");
  if (headlineEl) {
    gsap.fromTo(
      headlineEl,
      { opacity: 0, y: 40, filter: "blur(6px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power3.out",
        delay: 0.5,
      }
    );
  }

  // Animate tagline and CTA
  gsap.fromTo(
    [".landing-tagline", ".landing-cta", ".landing-social"],
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      y: 0,
      stagger: 0.15,
      delay: 0.9,
    }
  );

  // Animate header and icons
  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );
}
