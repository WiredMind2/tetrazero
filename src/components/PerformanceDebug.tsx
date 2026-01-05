'use client';

import React, { useState } from 'react';
import { useAnimationQuality } from './AnimationQualityProvider';

export default function PerformanceDebug() {
  const { qualityLevel, metrics, forceLevel, enableAutoAdjust } = useAnimationQuality();
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isExpanded) {
    return (
      <div 
        onClick={() => setIsExpanded(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '10px 15px',
          borderRadius: '8px',
          fontSize: '12px',
          fontFamily: 'monospace',
          zIndex: 9999,
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        <div>FPS: {metrics?.fps || '...'}</div>
        <div>Quality: {qualityLevel}</div>
      </div>
    );
  }

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        fontSize: '12px',
        fontFamily: 'monospace',
        zIndex: 9999,
        minWidth: '250px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <strong>Performance Monitor</strong>
        <button 
          onClick={() => setIsExpanded(false)}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          ×
        </button>
      </div>
      
      <div style={{ marginBottom: '10px' }}>
        <div>Current FPS: {metrics?.fps || '...'}</div>
        <div>Average FPS: {metrics?.averageFps || '...'}</div>
        <div>Poor Frames: {metrics?.poorFrameCount || 0}</div>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <div style={{ marginBottom: '5px' }}>
          Quality Level: <strong>{qualityLevel}</strong>
        </div>
        <div style={{ 
          width: '100%', 
          height: '6px', 
          backgroundColor: '#333', 
          borderRadius: '3px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: qualityLevel === 'disabled' ? '0%' : 
                   qualityLevel === 'low' ? '33%' : 
                   qualityLevel === 'medium' ? '66%' : '100%',
            height: '100%',
            backgroundColor: qualityLevel === 'disabled' ? '#dc2626' : 
                            qualityLevel === 'low' ? '#f59e0b' : 
                            qualityLevel === 'medium' ? '#3b82f6' : '#10b981',
            transition: 'width 0.3s ease',
          }} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
        <button
          onClick={() => forceLevel('high')}
          style={{
            padding: '5px 10px',
            fontSize: '11px',
            backgroundColor: qualityLevel === 'high' ? '#10b981' : '#444',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          High
        </button>
        <button
          onClick={() => forceLevel('medium')}
          style={{
            padding: '5px 10px',
            fontSize: '11px',
            backgroundColor: qualityLevel === 'medium' ? '#3b82f6' : '#444',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Medium
        </button>
        <button
          onClick={() => forceLevel('low')}
          style={{
            padding: '5px 10px',
            fontSize: '11px',
            backgroundColor: qualityLevel === 'low' ? '#f59e0b' : '#444',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Low
        </button>
        <button
          onClick={() => forceLevel('disabled')}
          style={{
            padding: '5px 10px',
            fontSize: '11px',
            backgroundColor: qualityLevel === 'disabled' ? '#dc2626' : '#444',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Off
        </button>
        <button
          onClick={enableAutoAdjust}
          style={{
            padding: '5px 10px',
            fontSize: '11px',
            backgroundColor: '#6366f1',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '100%',
            marginTop: '5px',
          }}
        >
          Auto Adjust
        </button>
      </div>

      <div style={{ marginTop: '10px', fontSize: '10px', opacity: 0.7 }}>
        Click to collapse
      </div>
    </div>
  );
}
