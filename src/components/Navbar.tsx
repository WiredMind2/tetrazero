'use client';

import React, { useState, useEffect } from 'react';

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
          <a href="/" className="navbar-brand">
            <img 
              src="/favicon.webp" 
              width={40} 
              height={40} 
              alt="TetraZero Logo" 
              className="navbar-logo"
            />
            <span className="navbar-title">TETRAZERO</span>
          </a>

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
    </>
  );
}
