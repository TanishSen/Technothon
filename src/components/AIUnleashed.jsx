// AI Unleashed section component
import "../styles/glassmorphism.css"; // Import glassmorphism styles

function AIUnleashed() {
  return (
    <section className="ai-unleashed">
      <div className="ai-unleashed-container">
        {/* Image */}
        <div className="ai-unleashed-image">
          <img src="/images/ai-unleashed.jpg" alt="AI Unleashed" />
        </div>
        {/* Text */}
        <div className="ai-unleashed-text">
          <h2>AI UNLEASHED</h2>
          <div className="ai-unleashed-projects">
            {projects.map((project) => (
              <div key={project.id} className="project-card glassmorphism">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Import project data
import { projects } from "../data/projects";

export default AIUnleashed;
