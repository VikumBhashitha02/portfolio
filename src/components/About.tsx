import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about" aria-labelledby="about-heading">
      <div className="about-me">
        <div className="about-header">
          <span className="section-label">// ABOUT ME</span>
          <h2 className="title" id="about-heading">
            Turning ideas into practical software<span className="accent">practical software.</span>
          </h2>
        </div>
        <p className="para about-bio">
          I'm a final-year Information Technology undergraduate at the{" "}
          <span className="accent">
            Sri Lanka Institute of Information Technology (SLIIT)
          </span>
          , with a strong interest in full-stack software engineering and AI/ML.
        </p>
        <p className="para about-bio">
          I enjoy designing and developing real-world applications, from enterprise
          management systems and learning platforms to AI-powered and interactive
          educational solutions. My development interests span frontend
          applications, RESTful APIs, database architecture, authentication and
          authorization, AI/ML integrations, and modern software engineering
          practices.
        </p>
        <p className="para about-bio">
          I'm particularly interested in building{" "}
          <span className="accent">reliable, scalable, secure</span>, and
          user-focused software while continuously learning new technologies and
          solving challenging problems.
        </p>
      </div>
    </div>
  );
};

export default About;
