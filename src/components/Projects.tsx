'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import projectsData from '../projects.json';
import { getRandomAstronautImage } from '../utils/imageUtils';

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
  ignore?: boolean;
}

// Add images to projects data and filter out ignored projects
const projects: Project[] = (projectsData as Omit<Project, 'image'>[])
  .filter(project => !project.ignore)
  .map((project) => ({
    ...project,
    image: getRandomAstronautImage()
  }));

export default function Projects() {
  const [filter, setFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const filtersRef = useRef<HTMLDivElement>(null);

  // Get unique technologies from projects data
  const availableTechnologies = Array.from(new Set(projects.flatMap(p => p.techStack))).sort();

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.techStack.includes(filter));

  const visibleProjects = filteredProjects.slice(0, visibleCount);

  const featuredProjects = projects.filter(p => p.featured);

  useEffect(() => {
    setVisibleCount(6);
  }, [filter]);

  useEffect(() => {
    // Simple animation without ScrollTrigger to ensure it always runs
    gsap.fromTo('.project-card', 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        stagger: 0.15, 
        duration: 0.6, 
        ease: 'power2.out',
        delay: 0.2 // Small delay to ensure DOM is ready
      }
    );
  }, []);

  useEffect(() => {
    const filtersContainer = filtersRef.current;
    if (filtersContainer) {
      const handleWheel = (e: WheelEvent) => {
        if (e.deltaY !== 0) {
          e.preventDefault();
          filtersContainer.scrollLeft += e.deltaY;
        }
      };
      
      filtersContainer.addEventListener('wheel', handleWheel, { passive: false });
      
      return () => {
        filtersContainer.removeEventListener('wheel', handleWheel);
      };
    }
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
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-img"
                  data-retry="0"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    const retry = parseInt(target.dataset.retry || '0');
                    if (retry < 5) {
                      target.dataset.retry = (retry + 1).toString();
                      target.src = getRandomAstronautImage();
                    } else {
                      target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect width='600' height='400' fill='%23374151'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239CA3AF' font-family='system-ui' font-size='24'%3E${project.title}%3C/text%3E%3C/svg%3E`;
                    }
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
          
          <div className="project-filters" ref={filtersRef}>
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            {availableTechnologies.map((technology) => (
              <button
                key={technology}
                className={`filter-btn ${filter === technology ? 'active' : ''}`}
                onClick={() => setFilter(technology)}
              >
                {technology}
              </button>
            ))}
          </div>

          <div className="projects-grid">
            {visibleProjects.map((project) => {
              return (
                <div key={project.id} className="project-card">
                  <div className="project-card-image">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-card-img"
                      data-retry="0"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        const retry = parseInt(target.dataset.retry || '0');
                        if (retry < 5) {
                          target.dataset.retry = (retry + 1).toString();
                          target.src = getRandomAstronautImage();
                        } else {
                          target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250'%3E%3Crect width='400' height='250' fill='%23374151'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239CA3AF' font-family='system-ui' font-size='16'%3E${project.title}%3C/text%3E%3C/svg%3E`;
                        }
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

          {visibleCount < filteredProjects.length && (
            <div className="projects-load-more" style={{ textAlign: 'center', marginTop: '40px' }}>
              <button 
                className="btn btn-secondary"
                onClick={() => setVisibleCount(prev => prev + 6)}
              >
                See More Projects
              </button>
            </div>
          )}
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
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="modal-img"
                data-retry="0"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  const retry = parseInt(target.dataset.retry || '0');
                  if (retry < 5) {
                    target.dataset.retry = (retry + 1).toString();
                    target.src = getRandomAstronautImage();
                  } else {
                    target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500'%3E%3Crect width='800' height='500' fill='%23374151'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239CA3AF' font-family='system-ui' font-size='24'%3E${selectedProject.title}%3C/text%3E%3C/svg%3E`;
                  }
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
