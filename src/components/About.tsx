'use client';

import React from 'react';

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">Get to know me</span>
          <h2 className="section-title">About Me</h2>
          <div className="section-divider"></div>
        </div>
        
        <div className="about-content">
          <div className="about-text">
            <p className="about-intro">
              Hey there, I'm William! I'm a student in computer science and engineering at INSA Lyon. I've loved IT and programming since a young age, and I regularly participate in computer science competitions. I've also developed numerous personal projects, that you can check out on my Github!
            </p>
            
            <div className="about-details">
              <div className="about-detail-item">
                <h3>Competitive Programming</h3>
                <p>
                  I regularly compete in various computer science competitions. Recently, my team and I was ranked 3rd in France during the ICPC (SWERC 2026), so we will compete in the ICPC European Championship in February!
                </p>
              </div>
              
              <div className="about-detail-item">
                <h3>Background</h3>
                <p>
                  I'm studying computer science and engineering at INSA Lyon. I'm also volunteering in multiple student associations!
                </p>
              </div>
              
              <div className="about-detail-item">
                <h3>Languages & Interests</h3>
                <p>
                  I'm fluent in five languages: French (native), English (C2), Japanese (JLPT N4), German (B2) and Creole (native). I like computers, mathematics, video games, going to the gym and running.
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
