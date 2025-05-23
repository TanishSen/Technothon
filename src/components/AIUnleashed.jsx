// AI Unleashed section component
import React from "react";
import "../styles/glassmorphism.css"; // Import glassmorphism styles

function AIUnleashed() {
  // Sample project data since the actual projects data isn't provided
  const sampleProjects = [
    {
      id: 1,
      title: "BOOLEAN BITS",
      description: "A PROJECT EXPLORING LOGICAL OPERATIONS THROUGH AI",
    },
    {
      id: 2,
      title: "GRAFEST HACKATHON 1",
      description: "24 HOURS OF PURE CREATION AT GRAPHIC ERA UNIVERSITY",
    },
  ];

  return (
    <section className="ai-unleashed min-h-screen bg-black flex items-center justify-center p-6">
      <div className="ai-unleashed-container max-w-5xl w-full flex flex-col md:flex-row items-center gap-8">
        {/* Image */}
        <div className="ai-unleashed-image w-full md:w-1/2">
          <img
            className="scroll-animate-image w-full h-auto rounded-lg shadow-lg"
            src="/images/ai-unleashed.jpg"
            alt="AI UNLEASHED EVENT"
          />
        </div>
        {/* Text */}
        <div className="ai-unleashed-text w-full md:w-1/2 flex flex-col gap-4">
          <p className="text-white text-sm md:text-base uppercase opacity-70">
            REDEFINE POSSIBLE. REIMAGINE EVERYTHING.
          </p>
          <h2
            className="scroll-animate-text text-5xl md:text-7xl font-extrabold uppercase"
            style={{
              background:
                "linear-gradient(to bottom, #FFFFFF 50%, #A0A0A0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            AI UNLEASHED
          </h2>
          <p className="sub-tagline text-md md:text-lg uppercase text-white">
            JOIN THE ULTIMATE TECH SHOWDOWN. WHERE YOUR CODE SHAPES THE FUTURE.
          </p>
          <div className="ai-unleashed-projects flex flex-col gap-4">
            {sampleProjects.map((project, index) => (
              <div
                key={project.id}
                className={`project-card glassmorphism scroll-animate-card p-4`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-xl font-semibold uppercase text-white">
                  {project.title}
                </h3>
                <p className="text-sm uppercase text-gray-300">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
          <p className="event-info text-sm uppercase text-gray-400 mt-4">
            POWERED BY GRAPHIC ERA UNIVERSITY | 24 HOURS OF PURE CREATION
          </p>
        </div>
      </div>
    </section>
  );
}

// Import project data
import { projects } from "../data/projects";

export default AIUnleashed;
