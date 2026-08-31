import * as THREE from "three";
import gsap from "gsap";

export function setCharTimeline(
  character: THREE.Object3D<THREE.Object3DEventMap> | null,
  camera: THREE.PerspectiveCamera
) {
  let intensity: number = 0;
  setInterval(() => {
    intensity = Math.random();
  }, 200);

  const tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: ".landing-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".about-section",
      start: "center 55%",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  const tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: ".skills-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  character?.children.forEach((object: any) => {
    if (object.name === "Plane004") {
      object.children.forEach((child: any) => {
        child.material.transparent = true;
        child.material.opacity = 0;
        if (child.material.name === "Material.018") {
          child.material.color.set("#FFFFFF");
        }
      });
    }
    if (object.name === "screenlight") {
      object.material.transparent = true;
      object.material.opacity = 0;
      object.material.emissive.set("#B0F5EA");
      gsap.timeline({ repeat: -1, repeatRefresh: true }).to(object.material, {
        emissiveIntensity: () => intensity * 8,
        duration: () => Math.random() * 0.6,
        delay: () => Math.random() * 0.1,
      });
    }
  });

  if (window.innerWidth > 1024) {
    if (character) {
      tl1
        .fromTo(character.rotation, { y: 0 }, { y: 0.7, duration: 1 }, 0)
        .to(camera.position, { z: 22 }, 0)
        .fromTo(".character-model", { x: 0 }, { x: "-25%", duration: 1 }, 0)
        .to(".landing-container", { opacity: 0, duration: 0.4 }, 0)
        .fromTo(
          ".about-me",
          { opacity: 0, x: "20%", y: "0%" },
          { opacity: 1, x: "0%", y: "0%", duration: 0.8, ease: "power2.out" },
          0.1
        );

      tl2
        .to(
          ".about-section",
          { opacity: 0, y: "-20%", duration: 2, ease: "power2.in" },
          0
        )
        .to(
          ".character-model",
          {
            opacity: 0,
            y: "-20%",
            duration: 2.5,
            ease: "power2.inOut",
            pointerEvents: "none",
          },
          0.2
        )
        .to(character.rotation, { y: 0.3, duration: 2.5 }, 0.2)
        .to(camera.position, { z: 26, duration: 2.5 }, 0.2)
        .to(".character-rim", { opacity: 0, duration: 1.5 }, 0);

      tl3
        .fromTo(
          ".skills-section",
          { y: 30, opacity: 0.8 },
          { y: 0, opacity: 1, duration: 1.5, ease: "power2.out" },
          0
        );
    }
  }
}

export function setAllTimeline() {
  // Achievements timeline animation (replaces career timeline)
  const achievementsTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".achievements-section",
      start: "top 40%",
      end: "100% center",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  achievementsTimeline
    .fromTo(
      ".achievements-timeline-track",
      { maxHeight: "0%" },
      { maxHeight: "100%", duration: 0.5 },
      0
    )
    .fromTo(
      ".achievement-card",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.08, duration: 0.4 },
      0
    );

  // Skills section entrance
  gsap.fromTo(
    ".skill-card",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.06,
      duration: 0.5,
      scrollTrigger: {
        trigger: ".skills-section",
        start: "top 70%",
        toggleActions: "play none none none",
      },
    }
  );

  // Projects entrance
  gsap.fromTo(
    ".project-card",
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.08,
      duration: 0.5,
      scrollTrigger: {
        trigger: ".projects-section",
        start: "top 70%",
        toggleActions: "play none none none",
      },
    }
  );
}
