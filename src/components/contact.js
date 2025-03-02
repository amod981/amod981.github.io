import "./contact.css";

function ContactPage() {
  return (
    <div className="contact-container">
      <h1>Contact Me</h1>
      <p>
        Let's connect! Feel free to reach out via email or social platforms.
      </p>

      {/* Contact Details */}
      <div className="contact-info">
        <p>
          <strong>Email:</strong>{" "}
          <a href="mailto:amod.shanker@example.com">amod.shanker@example.com</a>
        </p>
        <p>
          <strong>LinkedIn:</strong>{" "}
          <a
            href="https://www.linkedin.com/in/amod-shanker-20a0a1187/"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin.com/in/amod-shanker
          </a>
        </p>
        <p>
          <strong>GitHub:</strong>{" "}
          <a
            href="https://github.com/amod981"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/amod981
          </a>
        </p>
      </div>

      {/* Optional Contact Form */}
      <div className="contact-form">
        <h2>Send a Message</h2>
        <form>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
