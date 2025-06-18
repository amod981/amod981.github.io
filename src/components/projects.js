import "./projects.css";
import { Link } from "react-router-dom";

function ProjectsPage() {
  const projects = [
    {
      title: "AI-Driven Patient Assistant",
      description:
        "Developed an AI-powered system using OpenAI, DynamoDB & TypeScript, improving patient intent interpretation accuracy by 83%...",
      technologies: ["OpenAI", "DynamoDB", "TypeScript", "Node.js"],
      link: "https://github.com/amod981/amod981",
    },
    {
      title: "RAG-Based FAQ System",
      description:
        "Built a retrieval-augmented generation (RAG) framework using Pinecone, OpenAI embeddings, and LangChain, achieving a 92% success rate in generating accurate FAQ responses.",
      technologies: ["Pinecone", "OpenAI", "LangChain"],
      link: "/rag-blog",
    },
    {
      title: "Customer Purchase Prediction",
      description:
        "Developed a machine learning model for AB InBev to predict new customer purchase probability, achieving 83% test accuracy.",
      technologies: ["Python", "Scikit-Learn", "Pandas", "NumPy"],
    },
    {
      title: "Optimized MongoDB ETL Pipelines",
      description:
        "Enhanced ETL pipelines for migrating MongoDB database records, achieving 99.9% reliability and reducing processing time by 40% using AWS ETL tools.",
      technologies: ["AWS Glue", "MongoDB", "Redshift"],
    },
    {
      title: "Real-Time Data Processing",
      description:
        "Built distributed data pipelines using PySpark, improving query performance for large-scale real-time data processing at Ola Cabs.",
      technologies: ["PySpark", "Hadoop", "Kafka", "Presto SQL"],
    },
  ];

  return (
    <div className="projects-container">
      <h1>My Projects</h1>
      <p>
        Here are some of the best projects I've worked on, showcasing AI, ML,
        and scalable data solutions.
      </p>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <h3>
              {project.link ? (
                project.link.startsWith("http") ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.title}
                  </a>
                ) : (
                  <Link to={project.link}>{project.title}</Link>
                )
              ) : (
                project.title
              )}
            </h3>
            <p>{project.description}</p>
            <p>
              <strong>Technologies:</strong> {project.technologies.join(", ")}
            </p>
          </div>
        ))}
      </div>

      <div className="cta">
        <a
          href="https://github.com/yourgithub"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-button"
        >
          View More on GitHub
        </a>
      </div>
    </div>
  );
}

export default ProjectsPage;
