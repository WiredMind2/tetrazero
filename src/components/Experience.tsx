'use client';

import React from 'react';

interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

const experiences: Experience[] = [
  {
    id: 1,
    role: 'Competition Finalist & Exercise Designer',
    company: 'Prologin - France\'s Largest CS Competition',
    period: '2022 - 2025',
    description: '4-time finalist in France\'s premier computer science competition, now responsible for designing competition exercises.',
    achievements: [
      '4-time finalist (2022, 2023, 2024, 2025)',
      '5th place in 2023 edition among ~2,000 participants',
      'Currently designing competition exercises and challenges',
      'Representing INSA Lyon at national level'
    ],
    technologies: ['Algorithms', 'C/C++', 'Python', 'Competitive Programming']
  },
  {
    id: 2,
    role: 'European Competition Representative',
    company: 'SWERC & ICPC European Selections',
    period: '2024 - 2025',
    description: 'Part of the INSA Lyon team competing at European level in prestigious programming competitions.',
    achievements: [
      'Selected for SWERC (Southwestern Europe Regional Contest)',
      'Participating in ICPC European qualification rounds',
      'Team member representing INSA Lyon internationally',
      'Developing advanced algorithmic and problem-solving skills'
    ],
    technologies: ['Algorithms', 'C++', 'Team Programming', 'Problem Solving']
  },
  {
    id: 3,
    role: 'Competition Winner',
    company: 'Match\'Up Coding Battle (formerly Le Shaker)',
    period: '2020',
    description: 'Won 1st place in one of France\'s largest coding competitions among over 500,000 participants.',
    achievements: [
      '1st place among 500,000+ participants',
      'Demonstrated exceptional coding and algorithmic skills',
      'National recognition in competitive programming community',
      'Showcased ability to perform under competitive pressure'
    ],
    technologies: ['Algorithms', 'Programming', 'Problem Solving', 'Time Management']
  },
  {
    id: 4,
    role: 'Association President',
    company: 'INSAlgo - INSA Lyon Algorithms Association',
    period: '2025',
    description: 'Leading INSA Lyon\'s premier algorithms and competitive programming association.',
    achievements: [
      'President of INSAlgo for 2025',
      'Organizing competitive programming events and workshops',
      'Managing association budget and team coordination',
      'Previously served as Treasurer (2024)'
    ],
    technologies: ['Leadership', 'Event Management', 'Team Coordination', 'Project Management']
  },
  {
    id: 5,
    role: 'Association Vice-President',
    company: 'AEDI - INSA Lyon Computer Science Association',
    period: '2025',
    description: 'Vice-President of INSA Lyon\'s computer science student association.',
    achievements: [
      'Supporting association leadership and initiatives',
      'Coordinating computer science events and activities',
      'Collaborating with other student associations',
      'Contributing to student community development'
    ],
    technologies: ['Leadership', 'Event Planning', 'Community Management', 'Collaboration']
  }
];

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
            <div key={exp.id} className={`timeline-item ${index % 2 === 0 ? 'timeline-left' : 'timeline-right'}`}>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3 className="timeline-role">{exp.role}</h3>
                  <div className="timeline-company">{exp.company}</div>
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
                    <span key={i} className="tech-badge">{tech}</span>
                  ))}
                </div>
              </div>
              
              <div className="timeline-marker">
                <div className="timeline-dot"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="experience-cta">
          <p>Want to know more about my experience?</p>
          <a href="/resume.pdf" className="btn btn-primary" download>
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}
