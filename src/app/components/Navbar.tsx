'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <Link href="/" className="navbar-brand">
            <Image 
              src="/favicon.webp" 
              width={40} 
              height={40} 
              alt="TetraZero Logo" 
              className="navbar-logo"
            />
            <span className="navbar-title">TETRAZERO</span>
          </Link>

          <button 
            className="navbar-mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          <div className={`navbar-menu ${isMobileMenuOpen ? 'open' : ''}`}>
            <a href="#hero" className="navbar-link" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </a>
            <a href="#about" className="navbar-link" onClick={() => setIsMobileMenuOpen(false)}>
              About
            </a>
            <a href="#skills" className="navbar-link" onClick={() => setIsMobileMenuOpen(false)}>
              Skills
            </a>
            <a href="#projects" className="navbar-link" onClick={() => setIsMobileMenuOpen(false)}>
              Projects
            </a>
            <a href="#experience" className="navbar-link" onClick={() => setIsMobileMenuOpen(false)}>
              Experience
            </a>
            <a href="#contact" className="navbar-link" onClick={() => setIsMobileMenuOpen(false)}>
              Contact
            </a>
            <a href="https://manga.tetrazero.com" className="navbar-link" target="_blank" rel="noopener noreferrer">
              Manga
            </a>
          </div>
        </div>
      </nav>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: transparent;
          transition: all 0.3s ease;
          padding: 20px 0;
        }

        .navbar.scrolled {
          background: rgba(10, 10, 10, 0.95);
          backdrop-filter: blur(10px);
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
          padding: 15px 0;
        }

        .navbar-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: var(--text-primary);
          transition: all 0.3s ease;
        }

        .navbar-brand:hover {
          transform: translateY(-2px);
        }

        .navbar-logo {
          border-radius: 8px;
        }

        .navbar-title {
          font-size: 1.3rem;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .navbar-menu {
          display: flex;
          gap: 30px;
          align-items: center;
        }

        .navbar-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          position: relative;
        }

        .navbar-link::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--accent-gradient);
          transition: width 0.3s ease;
        }

        .navbar-link:hover {
          color: var(--accent-primary);
        }

        .navbar-link:hover::after {
          width: 100%;
        }

        .navbar-mobile-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
          padding: 8px;
        }

        @media (max-width: 768px) {
          .navbar-mobile-toggle {
            display: block;
          }

          .navbar-menu {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: rgba(10, 10, 10, 0.98);
            backdrop-filter: blur(10px);
            flex-direction: column;
            padding: 30px;
            gap: 20px;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
          }

          .navbar-menu.open {
            transform: translateX(0);
          }

          .navbar-link {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </>
  );
}
