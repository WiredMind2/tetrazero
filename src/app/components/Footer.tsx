'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <Link href="/" className="footer-logo-link">
              <Image 
                src="/favicon.webp" 
                width={50} 
                height={50} 
                alt="TetraZero Logo" 
                className="footer-logo"
              />
              <span className="footer-title">TETRAZERO</span>
            </Link>
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
                <li><a href="https://manga.tetrazero.com" target="_blank" rel="noopener noreferrer">Manga</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Social</h4>
              <ul>
                <li><a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li><a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {currentYear} TetraZero. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="/privacy">Privacy Policy</a>
            <span>•</span>
            <a href="/terms">Terms of Service</a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          padding: 60px 20px 30px;
          margin-top: 100px;
        }

        .footer-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .footer-content {
          display: grid;
          grid-template-columns: 2fr 3fr;
          gap: 60px;
          margin-bottom: 50px;
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .footer-logo-link {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: var(--text-primary);
          transition: all 0.3s ease;
          width: fit-content;
        }

        .footer-logo-link:hover {
          transform: translateY(-2px);
        }

        .footer-logo {
          border-radius: 8px;
        }

        .footer-title {
          font-size: 1.3rem;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .footer-description {
          color: var(--text-secondary);
          line-height: 1.6;
          max-width: 300px;
        }

        .footer-links {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }

        .footer-column h4 {
          color: var(--text-primary);
          font-size: 1.1rem;
          margin-bottom: 20px;
          font-weight: 600;
        }

        .footer-column ul {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-column a {
          color: var(--text-secondary);
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-block;
        }

        .footer-column a:hover {
          color: var(--accent-primary);
          transform: translateX(5px);
        }

        .footer-bottom {
          padding-top: 30px;
          border-top: 1px solid var(--border-color);
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: var(--text-tertiary);
          font-size: 0.9rem;
        }

        .footer-bottom-links {
          display: flex;
          gap: 15px;
          align-items: center;
        }

        .footer-bottom-links a {
          color: var(--text-tertiary);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-bottom-links a:hover {
          color: var(--accent-primary);
        }

        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .footer-links {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .footer-bottom {
            flex-direction: column;
            gap: 15px;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
