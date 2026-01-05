'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { PerformanceMonitor, PerformanceLevel, PerformanceMetrics } from '../utils/performanceMonitor';

interface AnimationQualityContextType {
  qualityLevel: PerformanceLevel;
  metrics: PerformanceMetrics | null;
  forceLevel: (level: PerformanceLevel) => void;
  enableAutoAdjust: () => void;
}

const AnimationQualityContext = createContext<AnimationQualityContextType | undefined>(undefined);

export const useAnimationQuality = () => {
  const context = useContext(AnimationQualityContext);
  if (!context) {
    throw new Error('useAnimationQuality must be used within AnimationQualityProvider');
  }
  return context;
};

interface AnimationQualityProviderProps {
  children: ReactNode;
}

export const AnimationQualityProvider: React.FC<AnimationQualityProviderProps> = ({ children }) => {
  const [qualityLevel, setQualityLevel] = useState<PerformanceLevel>('high');
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [monitor] = useState(() => new PerformanceMonitor());
  const [autoAdjust, setAutoAdjust] = useState(true);

  useEffect(() => {
    // Start monitoring performance
    monitor.start((newMetrics) => {
      setMetrics(newMetrics);
      if (autoAdjust) {
        setQualityLevel(newMetrics.level);
      }
    });

    return () => {
      monitor.stop();
    };
  }, [monitor, autoAdjust]);

  const forceLevel = (level: PerformanceLevel) => {
    setAutoAdjust(false);
    setQualityLevel(level);
  };

  const enableAutoAdjust = () => {
    setAutoAdjust(true);
  };

  return (
    <AnimationQualityContext.Provider value={{ qualityLevel, metrics, forceLevel, enableAutoAdjust }}>
      {children}
    </AnimationQualityContext.Provider>
  );
};
