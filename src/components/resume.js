import "./resume.css";

function ResumePage() {
  return (
    <div className="resume-container">
      <h1>My Resume</h1>
      <a href="/resume.pdf" download className="download-button">
        Download Resume (PDF)
      </a>

      {/* Work Experience Section */}
      <section className="resume-section">
        <h2>Work Experience</h2>
        <div className="job">
          <h3>Data & AI Engineer - Generated Health</h3>
          <p>
            <strong>Sep 2023 - Present | London, UK</strong>
          </p>
          <ul>
            <li>
              Designed an AI-driven solution using DynamoDB, TypeScript, and
              OpenAI, improving intent interpretation accuracy by 83%.
            </li>
            <li>
              Built a RAG framework using Pinecone and OpenAI, achieving a 92%
              success rate in generating accurate FAQ responses.
            </li>
            <li>
              Optimized ETL pipelines, reducing processing time by 40% using AWS
              ETL tools.
            </li>
          </ul>
        </div>

        <div className="job">
          <h3>Data Science Intern - AB InBev</h3>
          <p>
            <strong>June 2023 - Aug 2023 | London, UK</strong>
          </p>
          <ul>
            <li>
              Developed a machine learning model to predict new customer
              purchase probability with 83% accuracy.
            </li>
            <li>
              Conducted inferential analysis to improve purchase pattern
              predictions by 20%.
            </li>
          </ul>
        </div>

        <div className="job">
          <h3>Analytics Engineer - Ola Cabs</h3>
          <p>
            <strong>July 2019 - Aug 2022 | Bangalore, India</strong>
          </p>
          <ul>
            <li>
              Built PySpark-based distributed data pipelines, improving
              real-time query performance by 50%.
            </li>
            <li>
              Developed a lineage tracking tool using Oozie CLI, reducing
              dependency identification time by 80%.
            </li>
          </ul>
        </div>
      </section>

      {/* Skills Section */}
      <section className="resume-section">
        <h2>Skills & Technologies</h2>
        <ul className="skills-list">
          <li>
            <strong>Programming:</strong> Python, SQL, JavaScript, TypeScript,
            R, Bash
          </li>
          <li>
            <strong>Data & ML:</strong> Spark, PyTorch, Scikit-learn, OpenAI,
            LangChain, Pandas
          </li>
          <li>
            <strong>Cloud & Storage:</strong> AWS (Redshift, Glue, DynamoDB,
            Lambda), MongoDB, PostgreSQL
          </li>
        </ul>
      </section>

      {/* Education Section */}
      <section className="resume-section">
        <h2>Education</h2>
        <div className="education">
          <h3>MSc Business Analytics - Imperial College London</h3>
          <p>Sep 2022 - Sep 2023 | Graduated with Distinction (77%)</p>
        </div>
        <div className="education">
          <h3>B.Tech Civil Engineering - IIT Madras</h3>
          <p>July 2015 - May 2019 | CGPA: 8.46/10</p>
        </div>
      </section>
    </div>
  );
}

export default ResumePage;
