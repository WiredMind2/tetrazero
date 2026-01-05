'use client';

import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <a href="/" className="footer-logo-link">
              <img 
                src="/favicon.webp" 
                alt="TetraZero Logo" 
                width={40} 
                height={40} 
                className="footer-logo"
              />
              <span className="footer-title">TETRAZERO</span>
            </a>
            <p className="footer-description">
              Crafting exceptional digital experiences through innovative web development.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>Navigation</h4>
              <ul>
                <li><a href="#hero">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#projects">Projects</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Connect</h4>
              <ul>
                <li><a href="#experience">Experience</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Social</h4>
              <ul>
                <li><a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li><a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {currentYear} TetraZero. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="/privacy.html">Privacy Policy</a>
            <span>•</span>
            <a href="/terms.html">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
