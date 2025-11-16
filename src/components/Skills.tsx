import React from "react";
import ScrollingIcons from "./ScrollingIcons";

interface Skill {
  name: string;
  level: number;
  category: "programming" | "domains" | "languages" | "other";
}

const skills: Skill[] = [
  // Programming Languages
  { name: "Python", level: 95, category: "programming" },
  { name: "C / C++", level: 90, category: "programming" },
  { name: "JavaScript / React", level: 85, category: "programming" },
  { name: "C#", level: 80, category: "programming" },
  { name: "PHP", level: 75, category: "programming" },
  { name: "Java", level: 70, category: "programming" },

  // Technical Domains
  { name: "Algorithms", level: 95, category: "domains" },
  { name: "Distributed Systems", level: 85, category: "domains" },
  { name: "Web Development", level: 85, category: "domains" },
  { name: "Image Processing", level: 80, category: "domains" },
  { name: "AI / Machine Learning", level: 75, category: "domains" },
  { name: "Big Data", level: 70, category: "domains" },
  { name: "Cybersecurity", level: 65, category: "domains" },
  { name: "Algorithmic Trading", level: 70, category: "domains" },

  // Languages
  { name: "French", level: 95, category: "languages" },
  { name: "English", level: 90, category: "languages" },
  { name: "Creole", level: 85, category: "languages" },
  { name: "Japanese", level: 80, category: "languages" },
  { name: "German", level: 75, category: "languages" },
];

export default function Skills() {
  const categories = {
    programming: "Programming Languages",
    domains: "Technical Domains",
    languages: "Languages",
    other: "Other Skills",
  };

  return (
    <section id="skills" className="skills-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">What I bring to the table</span>
          <h2 className="section-title">Skills & Expertise</h2>
          <div className="section-divider"></div>
        </div>

        <div className="skills-content">
          {Object.entries(categories).map(([key, label]) => {
            const categorySkills = skills.filter(
              (skill) => skill.category === key
            );
            if (categorySkills.length === 0) return null;

            return (
              <div key={key} className="skill-category">
                <h3 className="skill-category-title">{label}</h3>
                <div className="skill-list">
                  {categorySkills.map((skill, index) => (
                    <div key={index} className="skill-item">
                      <div className="skill-header">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-level">{skill.level}%</span>
                      </div>
                      <div className="skill-bar">
                        <div
                          className="skill-bar-fill"
                          style={{ width: "0%" }}
                          data-width={`${skill.level}%`}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <ScrollingIcons />
      </div>
    </section>
  );
}
