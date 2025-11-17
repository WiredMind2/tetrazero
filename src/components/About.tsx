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
              Student in computer science and engineering at INSA Lyon. Passionate about IT and programming since a young age. Regularly participates in national computer science competitions and has developed numerous applications as part of personal projects.
            </p>
            
            <div className="about-details">
              <div className="about-detail-item">
                <h3>Competitive Programming</h3>
                <p>
                  4-time finalist in Prologin (2022, 2023, 2024, 2025), 5th place in 2023, responsible for designing competition exercises. Winner of Match'Up Coding Battle 2020 among 500,000+ participants. Participant in Castor Informatique (France-IOI). Part of SWERC/ICPC team representing INSA at European level (2024, 2025). Associative: President INSAlgo 2025, Vice-President AEDI 2025, Treasurer ADT 2023, INSAlgo 2024.
                </p>
              </div>
              
              <div className="about-detail-item">
                <h3>Academic Background</h3>
                <p>
                  Student in computer science and engineering at INSA Lyon.
                </p>
              </div>
              
              <div className="about-detail-item">
                <h3>Languages & Interests</h3>
                <p>
                  Fluent in five languages: French (native), English (C2), Japanese (JLPT N4), German (B2), Creole. Passionate about mathematics, astronomy, algorithms, gym and trail running.
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
