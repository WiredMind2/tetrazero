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
              Computer Science student at INSA Lyon with a passion for algorithms, competitive programming,
              and developing innovative applications. I&apos;ve been competing in France&apos;s largest computer science
              competitions and have held leadership roles in student associations.
            </p>
            
            <div className="about-details">
              <div className="about-detail-item">
                <h3>Competitive Programming</h3>
                <p>
                  4-time finalist in Prologin (France&apos;s largest computer science competition) and winner of
                  the 2020 Match&apos;Up Coding Battle among 500,000+ participants. Currently responsible for
                  designing Prologin competition exercises and representing INSA Lyon in European competitions
                  like SWERC and ICPC European selections.
                </p>
              </div>
              
              <div className="about-detail-item">
                <h3>Leadership & Associations</h3>
                <p>
                  Active in student associations at INSA Lyon: President of INSAlgo (2025), Vice-President
                  of AEDI (2025), and Treasurer of ADT (2023) and INSAlgo (2024). These roles have developed
                  my project management, team coordination, and organizational skills.
                </p>
              </div>
              
              <div className="about-detail-item">
                <h3>Technical Expertise</h3>
                <p>
                  Proficient in multiple programming languages including Python, C/C++, JavaScript/React,
                  C#, PHP, and Java. Special interests in algorithms, web development, AI/ML, big data,
                  cybersecurity, and algorithmic trading. Always exploring new technologies and frameworks.
                </p>
              </div>
            </div>
          </div>
          
          <div className="about-stats">
            <div className="stat-card">
              <div className="stat-number">4</div>
              <div className="stat-label">Prologin Finalist</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">1</div>
              <div className="stat-label">Competition Winner</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">500000</div>
              <div className="stat-label">Participants Beaten</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">6</div>
              <div className="stat-label">Programming Languages</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
