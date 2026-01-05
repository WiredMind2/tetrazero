'use client';

import { useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useAnimationQuality } from './AnimationQualityProvider';

export default function AnimationController() {
  const [isClient, setIsClient] = useState(false);
  const { qualityLevel } = useAnimationQuality();

  useEffect(() => {
    setIsClient(true);
    
    if (typeof window === 'undefined') return;
    
    // Small delay to ensure DOM is ready
    const initAnimations = () => {
      try {
        gsap.registerPlugin(ScrollTrigger);

        // Clear any existing ScrollTriggers
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        gsap.set('.skill-bar-fill', { width: '0%' }); // Reset skill bars

        // Disable animations if quality level is disabled
        if (qualityLevel === 'disabled') {
          // Show all content immediately without animations
          gsap.set('.hero-text, section, .skill-bar-fill, .timeline-item', { 
            opacity: 1, 
            y: 0, 
            x: 0 
          });
          return;
        }

        // Simplified animations for low quality
        const isLowQuality = qualityLevel === 'low';
        const isMediumQuality = qualityLevel === 'medium';

        // Hero animations
        if (!isLowQuality) {
          gsap.from('.hero-text', {
            scrollTrigger: {
              trigger: '.hero-section',
              start: 'top center',
              end: 'bottom center',
              toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            duration: isLowQuality ? 0.5 : 1,
            ease: 'power3.out'
          });
        }

        // Section reveal animations
        const sections = gsap.utils.toArray('section:not(.hero-section):not(.projects-section)');
        sections.forEach((section: any) => {
          gsap.from(section, {
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'top 20%',
              toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: isLowQuality ? 20 : 50,
            duration: isLowQuality ? 0.4 : 0.8,
            ease: 'power2.out'
          });
        });

        // Skills bars animation
        const skillBars = gsap.utils.toArray('.skill-bar-fill');
        skillBars.forEach((bar: any) => {
          const targetWidth = bar.getAttribute('data-width') || '0%';
          gsap.to(bar, {
            scrollTrigger: {
              trigger: bar,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: 'play none none reverse'
            },
            width: targetWidth,
            duration: isLowQuality ? 0.8 : 1.5,
            ease: 'power2.out'
          });
        });


        // Featured projects parallax - only on medium and high
        if (!isLowQuality) {
          const featuredProjects = gsap.utils.toArray('.featured-project-image');
          featuredProjects.forEach((project: any) => {
            gsap.to(project, {
              scrollTrigger: {
                trigger: project,
                start: 'top bottom',
                end: 'bottom top',
                scrub: isMediumQuality ? 0.5 : 1
              },
              y: isMediumQuality ? -25 : -50,
              ease: 'none'
            });
          });
        }

        // Timeline items animation
        gsap.from('.timeline-item', {
          scrollTrigger: {
            trigger: '.experience-timeline',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          x: isLowQuality ? 0 : (index) => (index % 2 === 0 ? -50 : 50),
          stagger: isLowQuality ? 0.1 : 0.2,
          duration: isLowQuality ? 0.4 : 0.8,
          ease: 'power2.out'
        });

        // Stats counter animation - only animate numeric stats
        const statNumbers = gsap.utils.toArray('.stat-number');
        statNumbers.forEach((stat: any) => {
          const text = stat.textContent;
          const numberMatch = text.match(/^\d+/); // Only match numbers at the start
          if (numberMatch) {
            const endValue = parseInt(numberMatch[0]);
            const obj = { value: 0 };
            
            gsap.to(obj, {
              scrollTrigger: {
                trigger: stat,
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none reverse'
              },
              value: endValue,
              duration: isLowQuality ? 1 : 2,
              ease: 'power1.out',
              onUpdate: () => {
                stat.textContent = text.replace(/^\d+/, Math.round(obj.value).toString());
              }
            });
          }
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function (this: HTMLAnchorElement, e: Event) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href !== '#') {
              const target = document.querySelector(href);
              if (target) {
                target.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
              }
            }
          });
        });

        // Parallax effect for hero background - only on medium and high
        if (!isLowQuality) {
          gsap.to('.hero-image-bg', {
            scrollTrigger: {
              trigger: '.hero-section',
              start: 'top top',
              end: 'bottom top',
              scrub: isMediumQuality ? 0.5 : 1
            },
            scale: isMediumQuality ? 1.1 : 1.2,
            opacity: 0.1,
            ease: 'none'
          });
        }

        // Tech icons hover animation (GSAP can enhance CSS hover) - only on high quality
        if (qualityLevel === 'high') {
          const techIcons = gsap.utils.toArray('.tech-icon');
          techIcons.forEach((icon: any) => {
            icon.addEventListener('mouseenter', () => {
              gsap.to(icon, {
                scale: 1.1,
                duration: 0.3,
                ease: 'power2.out'
              });
            });
            
            icon.addEventListener('mouseleave', () => {
              gsap.to(icon, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
              });
            });
          });
        }

      } catch (error) {
        console.error('Error initializing animations:', error);
      }
    };

    // Initialize animations after a short delay
    const timer = setTimeout(initAnimations, 100);

    // Cleanup
    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [qualityLevel]);  return null;
}
