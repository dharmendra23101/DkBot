import React from "react";
import "./Footer.css"; // Import the CSS file
import { FaEnvelope, FaLinkedin } from "react-icons/fa"; // Using react-icons for icons

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} My Project. All rights reserved.</p>
        <h4>Developer</h4>
        <p>Dharmendra Dhruw</p>
        <div className="social-links">
          <a
            href="mailto:ddhruw3337@gmail.com"
            className="social-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaEnvelope className="social-icon" />
            <span>ddhruw3337@gmail.com</span>
          </a>
          <a
            href="https://www.linkedin.com/in/dharmendra-dhruw-7a7291290/"
            className="social-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="social-icon" />
            <span>LinkedIn Profile</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;