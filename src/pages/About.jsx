import React from "react";
import "./About.css"; // Import the CSS file
import {
  FaReact,
  FaJsSquare,
  FaFire,
  FaGithub,
} from "react-icons/fa"; // Icons for tech stack
import { SiVite, SiFirebase } from "react-icons/si"; // Additional icons

const About = () => {
  return (
    <div className="about-container">
      <h2 className="about-title">About Me</h2>
      <section className="about-section">
        <p className="about-text">
          Hello! I'm <strong>Dharmendra Dhruw</strong>, a passionate web developer with a keen interest in building interactive and user-friendly applications. I specialize in front-end development and enjoy creating seamless digital experiences using modern technologies.
        </p>
        <p className="about-text">
          I'm currently working on this <strong>ChatBot project</strong>, a real-time chat application designed to provide users with an AI-powered conversational experience. My goal is to blend creativity with functionality, ensuring every project I work on is both visually appealing and technically sound.
        </p>
      </section>

      <h3 className="about-subtitle">About the Project</h3>
      <section className="about-section">
        <p className="about-text">
          The <strong>ChatBot</strong> is a web application built to demonstrate real-time communication between users and an AI assistant. It features user authentication, chat history persistence, and a clean, responsive UI. The project leverages cutting-edge tools to ensure performance and scalability.
        </p>
        <p className="about-text">
          <strong>How it Works:</strong> Users can sign up or log in via Firebase Authentication. Once authenticated, they can interact with the AI chatbot powered by an external API (Mistral AI via OpenRouter). Messages are stored in Firebase Firestore, allowing users to pick up where they left off. The UI is designed to be intuitive, with a smooth scroll feature and responsive layout for all devices.
        </p>
      </section>

      <h3 className="about-subtitle">Technologies Used</h3>
      <div className="tech-stack">
        <div className="tech-item">
          <FaReact className="tech-icon" />
          <span>React</span>
        </div>
        <div className="tech-item">
          <FaJsSquare className="tech-icon" />
          <span>JavaScript</span>
        </div>
        <div className="tech-item">
          <SiVite className="tech-icon" />
          <span>Vite</span>
        </div>
        <div className="tech-item">
          <SiFirebase className="tech-icon" />
          <span>Firebase</span>
        </div>
        <div className="tech-item">
          <FaFire className="tech-icon" />
          <span>Firestore</span>
        </div>
        <div className="tech-item">
          <FaGithub className="tech-icon" />
          <span>GitHub</span>
        </div>
      </div>
    </div>
  );
};

export default About;