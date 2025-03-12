import React from "react";
import Chatbot from "../components/Chatbot";
import "./Projects.css"; // Import the CSS file
import { FaLock } from "react-icons/fa"; // Icon for locked state

const Projects = ({ user }) => {
  return (
    <div className="projects-container">
      <h2 className="projects-title">BOT</h2>
      <section className="projects-content">
        {user ? (
          <Chatbot />
        ) : (
          <div className="login-prompt">
            <FaLock className="lock-icon" />
            <p className="prompt-text">
              Please log in to access the Chatbot and explore its features.
            </p>
            <a href="/login" className="login-link">
              Go to Login
            </a>
          </div>
        )}
      </section>
    </div>
  );
};

export default Projects;