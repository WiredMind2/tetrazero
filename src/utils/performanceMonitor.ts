/**
 * Performance Monitor
 * Tracks FPS and detects performance degradation to adjust animation quality
 */

export type PerformanceLevel = 'high' | 'medium' | 'low' | 'disabled';

export interface PerformanceMetrics {
  fps: number;
  averageFps: number;
  poorFrameCount: number;
  level: PerformanceLevel;
}

export class PerformanceMonitor {
  private frameCount = 0;
  private lastTime = performance.now();
  private fps = 60;
  private fpsHistory: number[] = [];
  private readonly historySize = 60; // Track last 60 frames
  private poorFrameCount = 0;
  private animationFrameId: number | null = null;
  private callback: ((metrics: PerformanceMetrics) => void) | null = null;
  private currentLevel: PerformanceLevel = 'high';
  
  // Thresholds for quality degradation
  private readonly FPS_THRESHOLD_MEDIUM = 45; // Drop to medium if average FPS < 45
  private readonly FPS_THRESHOLD_LOW = 30; // Drop to low if average FPS < 30
  private readonly FPS_THRESHOLD_DISABLED = 20; // Disable if average FPS < 20
  private readonly POOR_FRAME_THRESHOLD = 30; // Number of consecutive poor frames before downgrade
  
  // Thresholds for quality improvement (with hysteresis to avoid oscillation)
  private readonly FPS_RECOVERY_HIGH = 55; // Return to high if average FPS > 55
  private readonly FPS_RECOVERY_MEDIUM = 40; // Return to medium if average FPS > 40
  private readonly FPS_RECOVERY_LOW = 25; // Return to low if average FPS > 25
  private readonly GOOD_FRAME_THRESHOLD = 60; // Number of consecutive good frames before upgrade

  private goodFrameCount = 0;
  
  constructor() {
    this.tick = this.tick.bind(this);
  }

  /**
   * Start monitoring performance
   */
  start(callback: (metrics: PerformanceMetrics) => void): void {
    this.callback = callback;
    this.lastTime = performance.now();
    this.frameCount = 0;
    this.fpsHistory = [];
    this.poorFrameCount = 0;
    this.goodFrameCount = 0;
    this.tick();
  }

  /**
   * Stop monitoring performance
   */
  stop(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.callback = null;
  }

  /**
   * Main tick function to calculate FPS
   */
  private tick(): void {
    const now = performance.now();
    const delta = now - this.lastTime;
    
    this.frameCount++;
    
    // Calculate FPS every second
    if (delta >= 1000) {
      this.fps = Math.round((this.frameCount * 1000) / delta);
      this.fpsHistory.push(this.fps);
      
      // Keep history at fixed size
      if (this.fpsHistory.length > this.historySize) {
        this.fpsHistory.shift();
      }
      
      // Calculate average FPS
      const averageFps = this.getAverageFps();
      
      // Detect performance issues and adjust quality
      this.adjustQualityLevel(averageFps);
      
      // Reset counters
      this.frameCount = 0;
      this.lastTime = now;
      
      // Notify callback
      if (this.callback) {
        this.callback({
          fps: this.fps,
          averageFps,
          poorFrameCount: this.poorFrameCount,
          level: this.currentLevel,
        });
      }
    }
    
    this.animationFrameId = requestAnimationFrame(this.tick);
  }

  /**
   * Calculate average FPS from history
   */
  private getAverageFps(): number {
    if (this.fpsHistory.length === 0) return 60;
    const sum = this.fpsHistory.reduce((acc, fps) => acc + fps, 0);
    return Math.round(sum / this.fpsHistory.length);
  }

  /**
   * Adjust quality level based on performance
   */
  private adjustQualityLevel(averageFps: number): void {
    const previousLevel = this.currentLevel;
    
    // Check for degradation
    if (averageFps < this.FPS_THRESHOLD_DISABLED) {
      this.poorFrameCount++;
      this.goodFrameCount = 0;
      
      if (this.poorFrameCount >= this.POOR_FRAME_THRESHOLD && this.currentLevel !== 'disabled') {
        this.currentLevel = 'disabled';
        this.poorFrameCount = 0;
      }
    } else if (averageFps < this.FPS_THRESHOLD_LOW) {
      this.poorFrameCount++;
      this.goodFrameCount = 0;
      
      if (this.poorFrameCount >= this.POOR_FRAME_THRESHOLD) {
        if (this.currentLevel === 'high' || this.currentLevel === 'medium') {
          this.currentLevel = 'low';
          this.poorFrameCount = 0;
        }
      }
    } else if (averageFps < this.FPS_THRESHOLD_MEDIUM) {
      this.poorFrameCount++;
      this.goodFrameCount = 0;
      
      if (this.poorFrameCount >= this.POOR_FRAME_THRESHOLD && this.currentLevel === 'high') {
        this.currentLevel = 'medium';
        this.poorFrameCount = 0;
      }
    } else {
      // Check for recovery with hysteresis
      this.goodFrameCount++;
      this.poorFrameCount = 0;
      
      if (this.goodFrameCount >= this.GOOD_FRAME_THRESHOLD) {
        if (averageFps >= this.FPS_RECOVERY_HIGH && this.currentLevel !== 'high') {
          this.currentLevel = 'high';
          this.goodFrameCount = 0;
        } else if (averageFps >= this.FPS_RECOVERY_MEDIUM && 
                   (this.currentLevel === 'low' || this.currentLevel === 'disabled')) {
          this.currentLevel = 'medium';
          this.goodFrameCount = 0;
        } else if (averageFps >= this.FPS_RECOVERY_LOW && this.currentLevel === 'disabled') {
          this.currentLevel = 'low';
          this.goodFrameCount = 0;
        }
      }
    }
    
    // Log level changes
    if (previousLevel !== this.currentLevel) {
      console.log(`[PerformanceMonitor] Quality level changed: ${previousLevel} -> ${this.currentLevel} (avg FPS: ${averageFps})`);
    }
  }

  /**
   * Get current performance level
   */
  getCurrentLevel(): PerformanceLevel {
    return this.currentLevel;
  }

  /**
   * Get current FPS
   */
  getCurrentFps(): number {
    return this.fps;
  }

  /**
   * Get average FPS
   */
  getAverageFrameRate(): number {
    return this.getAverageFps();
  }
}
