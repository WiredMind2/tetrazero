'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  category: 'web' | 'mobile' | 'fullstack' | 'other';
}

const astronautImageCount = 6;

const getRandomAstronautImage = () => {
  const randomIndex = Math.floor(Math.random() * astronautImageCount) + 1;
  return `/projects/astronauts/${randomIndex}.webp`;
};

const projects: Project[] = [
  {
    id: 1,
    title: 'Awale Game',
    description: 'Implementation of the traditional African board game Awale in C',
    longDescription: 'A complete implementation of the Awale game, featuring strategic gameplay and AI opponents. Developed in C for optimal performance.',
    techStack: ['C'],
    image: getRandomAstronautImage(),
    githubUrl: 'https://github.com/WiredMind2/Awale-Game',
    featured: true,
    category: 'other'
  },
  {
    id: 2,
    title: 'OpenRouter Client',
    description: 'Python client for interacting with OpenRouter API',
    longDescription: 'A Python library to easily integrate with OpenRouter services, providing a simple interface for API calls and data handling.',
    techStack: ['Python'],
    image: getRandomAstronautImage(),
    githubUrl: 'https://github.com/WiredMind2/OpenRouterClient',
    featured: true,
    category: 'other'
  },
  {
    id: 3,
    title: 'PLD AGILE Project',
    description: 'Repository for the PLD AGILE course project',
    longDescription: 'A project developed as part of the PLD AGILE course, demonstrating agile development practices and software engineering principles.',
    techStack: ['Python'],
    image: getRandomAstronautImage(),
    githubUrl: 'https://github.com/WiredMind2/PLD-AGILE',
    featured: true,
    category: 'other'
  },
  {
    id: 4,
    title: 'Gym Tracker',
    description: 'Web application for tracking gym workouts and progress',
    longDescription: 'A JavaScript-based web app that helps users log their gym sessions, track exercises, and monitor fitness progress over time.',
    techStack: ['JavaScript'],
    image: getRandomAstronautImage(),
    githubUrl: 'https://github.com/WiredMind2/GymTracker',
    featured: false,
    category: 'web'
  },
  {
    id: 5,
    title: 'Anime Manager',
    description: 'Tool for managing anime collections and watchlists',
    longDescription: 'A Python application for organizing and tracking anime series, including watch status, ratings, and recommendations.',
    techStack: ['Python'],
    image: getRandomAstronautImage(),
    githubUrl: 'https://github.com/WiredMind2/AnimeManager',
    featured: false,
    category: 'other'
  },
  {
    id: 6,
    title: 'Manga Reader',
    description: 'Application for reading and managing manga collections',
    longDescription: 'A Python-based manga reader with features for downloading, organizing, and reading manga chapters with a user-friendly interface.',
    techStack: ['Python'],
    image: getRandomAstronautImage(),
    githubUrl: 'https://github.com/WiredMind2/Manga-Reader',
    featured: false,
    category: 'other'
  }
];

export default function Projects() {
  const [filter, setFilter] = useState<'all' | 'web' | 'mobile' | 'fullstack' | 'other'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter);

  const featuredProjects = projects.filter(p => p.featured);

  useEffect(() => {
    gsap.from('.project-card', {
      opacity: 0,
      y: 30,
      stagger: 0.15,
      duration: 0.6,
      ease: 'power2.out'
    });
  }, []);

  return (
    <section id="projects" className="projects-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">My work</span>
          <h2 className="section-title">Featured Projects</h2>
          <div className="section-divider"></div>
        </div>

        {/* Featured Projects */}
        <div className="featured-projects">
          {featuredProjects.map((project, index) => (
            <div key={project.id} className={`featured-project featured-project-${index % 2 === 0 ? 'left' : 'right'}`}>
              <div className="featured-project-image">
                <Image 
                  src={project.image} 
                  alt={project.title}
                  width={600}
                  height={400}
                  className="project-img"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect width='600' height='400' fill='%23374151'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239CA3AF' font-family='system-ui' font-size='24'%3E${project.title}%3C/text%3E%3C/svg%3E`;
                  }}
                />
              </div>
              <div className="featured-project-content">
                <span className="project-featured-label">Featured Project</span>
                <h3 className="featured-project-title">{project.title}</h3>
                <div className="featured-project-description">
                  <p>{project.longDescription}</p>
                </div>
                <div className="featured-project-tech">
                  {project.techStack.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="featured-project-links">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="View code">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="View live site">
                      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* All Projects */}
        <div className="all-projects">
          <h3 className="all-projects-title">All Projects</h3>
          
          <div className="project-filters">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`filter-btn ${filter === 'web' ? 'active' : ''}`}
              onClick={() => setFilter('web')}
            >
              Web
            </button>
            <button 
              className={`filter-btn ${filter === 'fullstack' ? 'active' : ''}`}
              onClick={() => setFilter('fullstack')}
            >
              Full Stack
            </button>
            <button 
              className={`filter-btn ${filter === 'mobile' ? 'active' : ''}`}
              onClick={() => setFilter('mobile')}
            >
              Mobile
            </button>
          </div>

          <div className="projects-grid">
            {filteredProjects.map((project) => {
              return (
                <div key={project.id} className="project-card">
                  <div className="project-card-image">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={400}
                      height={250}
                      className="project-card-img"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250'%3E%3Crect width='400' height='250' fill='%23374151'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239CA3AF' font-family='system-ui' font-size='16'%3E${project.title}%3C/text%3E%3C/svg%3E`;
                      }}
                    />
                    <div className="project-card-overlay">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => setSelectedProject(project)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                  <div className="project-card-content">
                    <h4 className="project-card-title">{project.title}</h4>
                    <p className="project-card-description">{project.description}</p>
                    <div className="project-card-tech">
                      {project.techStack.slice(0, 3).map((tech, i) => (
                        <span key={i} className="tech-badge">{tech}</span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="tech-badge">+{project.techStack.length - 3}</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div className="project-modal" onClick={() => setSelectedProject(null)}>
          <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="project-modal-close"
              onClick={() => setSelectedProject(null)}
              aria-label="Close modal"
            >
              ×
            </button>
            <div className="project-modal-image">
              <Image 
                src={selectedProject.image} 
                alt={selectedProject.title}
                width={800}
                height={500}
                className="modal-img"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500'%3E%3Crect width='800' height='500' fill='%23374151'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239CA3AF' font-family='system-ui' font-size='24'%3E${selectedProject.title}%3C/text%3E%3C/svg%3E`;
                }}
              />
            </div>
            <div className="project-modal-body">
              <h3>{selectedProject.title}</h3>
              <p>{selectedProject.longDescription}</p>
              <div className="project-modal-tech">
                <strong>Tech Stack:</strong>
                <div className="tech-tags">
                  {selectedProject.techStack.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
              <div className="project-modal-links">
                {selectedProject.githubUrl && (
                  <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                    View Code
                  </a>
                )}
                {selectedProject.liveUrl && (
                  <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    View Live
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
