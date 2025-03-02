import "./landingPage.css";

function LandingPage() {
  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero">
        <h1>Hi, I'm Amod Shanker</h1>
        <p>Data & AI Engineer | NLP | Distributed Systems</p>
        <img
          src="your-profile-image.jpg"
          alt="Amod's Profile"
          className="profile-img"
        />
      </section>

      {/* About Me */}
      <section className="about">
        <h2>About Me</h2>
        <p>
          Passionate about **Machine Learning, NLP, and Distributed Data
          Processing**, I specialize in designing AI-driven solutions and
          scalable data systems. With experience at **Generated Health, AB
          InBev, and Ola Cabs**, I’ve built **ETL pipelines, AI-powered
          assistants, and predictive ML models**.
        </p>
      </section>

      {/* Highlighted Projects */}
      <section className="projects-preview">
        <h2>Featured Work</h2>
        <div className="projects-grid">
          <div className="project-card">
            <h3>AI-driven Patient Assistant</h3>
            <p>
              Designed an **AI-powered system** using OpenAI, DynamoDB &
              TypeScript, improving **intent accuracy by 83%**.
            </p>
          </div>
          <div className="project-card">
            <h3>RAG-based FAQ System</h3>
            <p>
              Built a **retrieval-augmented generation framework** with Pinecone
              & OpenAI, achieving a **92% accuracy rate**.
            </p>
          </div>
          <div className="project-card">
            <h3>Customer Purchase Prediction</h3>
            <p>
              Developed an **ML model** for AB InBev to predict **customer
              purchase probability with 83% accuracy**.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <a href="/resume.pdf" className="cta-button">
          Download Resume
        </a>
        <a href="#contact" className="cta-button">
          Get in Touch
        </a>
        <div className="social-links">
          <a
            href="https://www.linkedin.com/in/amod-shanker-20a0a1187/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://leetcode.com/amod981/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LeetCode
          </a>
          <a
            href="https://www.hackerrank.com/onlinelearning91"
            target="_blank"
            rel="noopener noreferrer"
          >
            HackerRank
          </a>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
