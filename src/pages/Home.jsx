import React from "react";
import "./Home.css"; // Import the CSS file
import { FaRocket, FaCode, FaUser } from "react-icons/fa"; // Icons for added flair

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <h1 className="hero-title">Welcome to Dk ChatBot</h1>
        <p className="hero-subtitle">
          Experience the Future of Interaction with AI
        </p>
        <div className="hero-buttons">
          <a href="/projects" className="btn primary-btn">
            Explore Projects <FaRocket className="btn-icon" />
          </a>
          <a href="/about" className="btn secondary-btn">
            About Me <FaUser className="btn-icon" />
          </a>
        </div>
      </section>

      <section className="intro-section">
        <h2 className="section-title">What This Project Offers</h2>
        <p className="intro-text">
          My ChatBot is more than just a conversation tool—it's a demonstration
          of modern web development. Built with cutting-edge technologies, this
          project showcases real-time chat functionality, user authentication,
          and a sleek, responsive design. Whether you're here to chat with an
          AI or explore my work, there's something for everyone.
        </p>
      </section>

      <section className="features-section">
        <h2 className="section-title">Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <FaCode className="feature-icon" />
            <h3 className="feature-title">Real-Time Chat</h3>
            <p className="feature-text">
              Engage in seamless conversations with an AI assistant powered by
              advanced APIs, with messages updating instantly.
            </p>
          </div>
          <div className="feature-card">
            <FaUser className="feature-icon" />
            <h3 className="feature-title">User Profiles</h3>
            <p className="feature-text">
              Customize your experience with editable profiles, including
              nicknames and profile pictures, stored securely.
            </p>
          </div>
          <div className="feature-card">
            <FaRocket className="feature-icon" />
            <h3 className="feature-title">Responsive Design</h3>
            <p className="feature-text">
              Enjoy a consistent experience across all devices, from desktops
              to smartphones, with a fully responsive layout.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2 className="cta-title">Ready to Dive In?</h2>
        <p className="cta-text">
          Start chatting, explore my projects, or learn more about the tech
          behind this creation. The journey begins here!
        </p>
        <a href="/projects" className="btn cta-btn">
          Start Chatting Now
        </a>
      </section>
    </div>
  );
};

export default Home;