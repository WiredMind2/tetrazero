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
              Third-year Computer Science student at INSA Lyon. Passionate about algorithms, competitive programming, and distributed systems. 
              Active in algorithm competitions and student associations.
            </p>
            
            <div className="about-details">
              <div className="about-detail-item">
                <h3>Competitive Programming</h3>
                <p>
                  I often compete in many programming contests, such as ICPC or Prologin. I'm part of multiple associations, 
                  and I'm also helping organize coding competitions like the MatchUp's Coding Battle.
                </p>
              </div>
              
              <div className="about-detail-item">
                <h3>Academic Background</h3>
                <p>
                  Currently pursuing advanced studies in computer science at INSA Lyon, with a focus on algorithms, distributed systems, and software engineering. 
                  Working on various academic projects including image processing and system architecture.
                </p>
              </div>
              
              <div className="about-detail-item">
                <h3>Languages & Interests</h3>
                <p>
                  I can fluently speak five different languages, but I'm most comfortable in French and English. Passionate about mathematics, astronomy, algorithms, 
                  going to the gym and trail running.
                </p>
              </div>
            </div>
          </div>
          
          <div className="about-stats">
            <div className="stat-card">
              <div className="stat-number">6</div>
              <div className="stat-label">Competitions Participated</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">13</div>
              <div className="stat-label">Years Python Experience</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">200+</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">2</div>
              <div className="stat-label">Years Association Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
