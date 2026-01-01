"use client";

import React from "react";
import experiencesData from '../experiences.json';

interface Experience {
  title: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

const experiences: Experience[] = experiencesData as Experience[];

export default function Experience() {
  return (
    <section id="experience" className="experience-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">Competitions & leadership</span>
          <h2 className="section-title">Achievements & Experience</h2>
          <div className="section-divider"></div>
        </div>

        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`timeline-item ${
                index % 2 === 0 ? "timeline-left" : "timeline-right"
              }`}
            >
              <div className="timeline-marker">
                <div className="timeline-dot"></div>
              </div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3 className="timeline-role">{exp.title}</h3>
                  <div className="timeline-period">{exp.period}</div>
                </div>

                <p className="timeline-description">{exp.description}</p>

                <div className="timeline-achievements">
                  <strong>Key Achievements:</strong>
                  <ul>
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>

                <div className="timeline-technologies">
                  {exp.technologies.map((tech, i) => (
                    <span key={i} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="experience-cta">
          <p>Want to know more about my experience?</p>
            <a href="/Resume.pdf" className="btn btn-primary" target="_blank" rel="noopener noreferrer">
            Download Resume
            </a>
        </div>
      </div>
    </section>
  );
}
