"use client";

import React from "react";

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
    role: "Competition Finalist",
    company: "Prologin - France's Largest CS Competition",
    period: "2022 - 2024",
    description:
      "3-time finalist in France's premier computer science competition.",
    achievements: [
      "Finalist in 2022, 2023, and 2024 editions",
      "Participated among thousands of competitors",
      "Developed advanced algorithmic and problem-solving skills",
      "Representing INSA Lyon at national level",
    ],
    technologies: ["Algorithms", "C/C++", "Python", "Competitive Programming"],
  },
  {
    id: 2,
    role: "Competition Participant",
    company: "Le Shaker Coding Competition",
    period: "2024",
    description:
      "Participated in Le Shaker, a major French coding competition.",
    achievements: [
      "Competed in the 2024 edition",
      "Gained experience in competitive programming challenges",
      "Enhanced skills in algorithm optimization",
      "Networked with other competitive programmers",
    ],
    technologies: [
      "Algorithms",
      "Programming",
      "Problem Solving",
      "Time Management",
    ],
  },
  {
    id: 3,
    role: "Active Member & Organizer",
    company: "INSAlgo - INSA Lyon Algorithms Association",
    period: "2023 - Present",
    description:
      "Active member of INSA Lyon's algorithms association, helping organize coding competitions.",
    achievements: [
      "Helped organize the Coding Battle competition",
      "Participated in association activities and events",
      "Contributed to team efforts in event organization",
      "Developed leadership and coordination skills",
    ],
    technologies: [
      "Leadership",
      "Event Management",
      "Team Coordination",
      "Algorithms",
    ],
  },
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
            <div
              key={exp.id}
              className={`timeline-item ${
                index % 2 === 0 ? "timeline-left" : "timeline-right"
              }`}
            >
              <div className="timeline-marker">
                <div className="timeline-dot"></div>
              </div>
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
          <a href="/resume.pdf" className="btn btn-primary" download>
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}
