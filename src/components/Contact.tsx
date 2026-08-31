import { useState } from "react";
import "./styles/Contact.css";
import { MdArrowOutward, MdEmail, MdSend, MdCheckCircle, MdError } from "react-icons/md";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";

type FormState = "idle" | "submitting" | "success" | "error";

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  btnLabel: string;
  href: string;
  color?: string;
}

const ContactCard = ({
  icon,
  title,
  desc,
  btnLabel,
  href,
  color,
}: ContactCardProps) => (
  <a
    href={href}
    target={href.startsWith("mailto:") ? undefined : "_blank"}
    rel="noopener noreferrer"
    className="contact-card"
    style={{ "--contact-card-color": color } as React.CSSProperties}
    aria-label={`${title}: ${btnLabel}`}
    data-cursor="disable"
  >
    <div className="contact-card-icon" style={{ color }}>
      {icon}
    </div>
    <h3 className="contact-card-title">{title}</h3>
    <p className="contact-card-desc">{desc}</p>
    <div className="contact-card-btn">
      {btnLabel} <MdArrowOutward />
    </div>
    <div className="contact-card-glow" aria-hidden="true" />
  </a>
);

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formState, setFormState] = useState<FormState>("idle");

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Please enter a valid email address.";
    if (!form.subject.trim()) newErrors.subject = "Subject is required.";
    if (!form.message.trim()) newErrors.message = "Message is required.";
    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setFormState("submitting");

    try {
      const res = await fetch("https://formspree.io/f/xpwdkdaj", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      });

      if (res.ok) {
        setFormState("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  return (
    <div
      className="contact-section"
      id="contact"
      aria-labelledby="contact-heading"
    >
      {/* Background decoration */}
      <div className="contact-bg-decoration" aria-hidden="true">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="contact-particle" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${3 + Math.random() * 3}s`,
          }} />
        ))}
      </div>

      <div className="contact-container section-container">
        {/* Header */}
        <div className="contact-header">
          <span className="section-label">// CONTACT</span>
          <h2 className="section-title" id="contact-heading">
            Let's Build <span className="accent">Something Together.</span>
          </h2>
          <p className="section-subtitle">
            Have a project, opportunity, or idea? I'm always open to connecting,
            discussing ideas, and exploring opportunities.
          </p>
        </div>

        {/* Contact cards */}
        <div className="contact-cards-grid">
          <ContactCard
            icon={<FaLinkedinIn />}
            title="LinkedIn"
            desc="Connect with me professionally."
            btnLabel="Visit LinkedIn"
            href="https://www.linkedin.com/in/vikum-bhashitha-187541246/"
            color="#0077b5"
          />
          <ContactCard
            icon={<FaGithub />}
            title="GitHub"
            desc="Explore my projects and code."
            btnLabel="Visit GitHub"
            href="https://github.com/VikumBhashitha02"
            color="#6e7681"
          />
          <ContactCard
            icon={<MdEmail />}
            title="Email"
            desc="Send me an email directly."
            btnLabel="Send Email"
            href="mailto:vbhashitha02@gmail.com"
            color="#5eead4"
          />
          <ContactCard
            icon={<FaWhatsapp />}
            title="WhatsApp"
            desc="Let's discuss an opportunity or project."
            btnLabel="Message Me"
            href="https://wa.me/qr/WKUXFL4JYL7VH1"
            color="#25d366"
          />
        </div>

        {/* Contact form */}
        <div className="contact-form-wrap">
          <div className="contact-form-header">
            <h3 className="contact-form-title">Send a Message</h3>
            <p className="contact-form-subtitle">
              Fill in the form and I'll get back to you as soon as possible.
            </p>
          </div>

          {formState === "success" ? (
            <div className="form-success" role="alert">
              <MdCheckCircle className="form-success-icon" />
              <p>
                Thanks for reaching out! I'll get back to you as soon as
                possible.
              </p>
              <button
                className="form-reset-btn"
                onClick={() => setFormState("idle")}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form
              className="contact-form"
              onSubmit={handleSubmit}
              noValidate
              aria-label="Contact form"
            >
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="name" className="form-label">
                    Name <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className={`form-input ${errors.name ? "form-input-error" : ""}`}
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                    aria-required="true"
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <span
                      className="form-error"
                      id="name-error"
                      role="alert"
                    >
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className="form-field">
                  <label htmlFor="email" className="form-label">
                    Email <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={`form-input ${errors.email ? "form-input-error" : ""}`}
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    aria-required="true"
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <span
                      className="form-error"
                      id="email-error"
                      role="alert"
                    >
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="subject" className="form-label">
                  Subject <span aria-hidden="true">*</span>
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  className={`form-input ${errors.subject ? "form-input-error" : ""}`}
                  placeholder="What's this about?"
                  value={form.subject}
                  onChange={handleChange}
                  aria-required="true"
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                />
                {errors.subject && (
                  <span
                    className="form-error"
                    id="subject-error"
                    role="alert"
                  >
                    {errors.subject}
                  </span>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="message" className="form-label">
                  Message <span aria-hidden="true">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  className={`form-textarea ${errors.message ? "form-input-error" : ""}`}
                  placeholder="Tell me about your project or idea..."
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  aria-required="true"
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && (
                  <span
                    className="form-error"
                    id="message-error"
                    role="alert"
                  >
                    {errors.message}
                  </span>
                )}
              </div>

              {formState === "error" && (
                <div className="form-error-banner" role="alert">
                  <MdError />
                  Something went wrong. Please try again or contact me directly.
                </div>
              )}

              <button
                type="submit"
                className="form-submit"
                disabled={formState === "submitting"}
                aria-busy={formState === "submitting"}
                data-cursor="disable"
              >
                {formState === "submitting" ? (
                  <>
                    <span className="form-spinner" aria-hidden="true" />
                    Sending...
                  </>
                ) : (
                  <>
                    <MdSend />
                    Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
