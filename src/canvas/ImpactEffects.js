/**
 * ANIME SPEEDLINES & SMASH IMPACT FX CONTROLLER (CLEAN ULTRA-SHARP EDITION)
 * Generates anime radial speedlines, contact spark bursts, and cinematic camera shake.
 */

import { soundEngine } from '../audio/AudioEngine.js';

export class ImpactEffects {
  constructor(speedlinesCanvas, flashOverlay) {
    this.canvas = speedlinesCanvas;
    this.ctx = this.canvas.getContext('2d');
    this.flash = flashOverlay;
    this.isActive = false;
    this.intensity = 0; // 0 to 1
    this.lines = [];
    this.numLines = 75;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', this.resize.bind(this));
    this.generateLines();
    this.loop();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;
  }

  generateLines() {
    this.lines = [];
    for (let i = 0; i < this.numLines; i++) {
      const angle = (Math.PI * 2 * i) / this.numLines + (Math.random() - 0.5) * 0.08;
      this.lines.push({
        angle,
        length: Math.random() * 0.6 + 0.4,
        width: Math.random() * 2.8 + 1.0,
        dist: Math.random() * 0.35 + 0.25
      });
    }
  }

  setIntensity(val) {
    this.intensity = Math.max(0, Math.min(1, val));
    this.canvas.style.opacity = this.intensity > 0.04 ? String(this.intensity) : '0';
  }

  /**
   * TRIGGER DEVASTATING ANIME SMASH CONTACT IMPACT
   */
  triggerSmashImpact() {
    // 1. Play Multi-layer Synthesized Sub-bass & Hard Slap Sound
    soundEngine.playSmashImpactBoom();

    // 2. Violent Camera Shake
    document.body.classList.remove('shake-screen');
    void document.body.offsetWidth; // Force reflow
    document.body.classList.add('shake-screen');
    setTimeout(() => {
      document.body.classList.remove('shake-screen');
    }, 900);

    // 3. Screen Flash & Transition Glow
    if (this.flash) {
      this.flash.style.transition = 'none';
      this.flash.style.opacity = '1';
      setTimeout(() => {
        this.flash.style.transition = 'opacity 0.95s cubic-bezier(0.16, 1, 0.3, 1)';
        this.flash.style.opacity = '0';
      }, 60);
    }
  }

  loop() {
    requestAnimationFrame(this.loop.bind(this));

    if (this.intensity <= 0.02) {
      this.ctx.clearRect(0, 0, this.width, this.height);
      return;
    }

    this.ctx.clearRect(0, 0, this.width, this.height);
    const maxRadius = Math.max(this.width, this.height) * 0.9;

    for (let i = 0; i < this.lines.length; i++) {
      const line = this.lines[i];
      const jitterAngle = line.angle + (Math.random() - 0.5) * 0.02;
      const startR = maxRadius * (line.dist + (Math.random() - 0.5) * 0.06);
      const endR = startR + maxRadius * line.length;

      const x1 = this.centerX + Math.cos(jitterAngle) * startR;
      const y1 = this.centerY + Math.sin(jitterAngle) * startR;
      const x2 = this.centerX + Math.cos(jitterAngle) * endR;
      const y2 = this.centerY + Math.sin(jitterAngle) * endR;

      const gradient = this.ctx.createLinearGradient(x1, y1, x2, y2);
      gradient.addColorStop(0, 'rgba(255, 85, 0, 0)');
      gradient.addColorStop(0.3, Math.random() > 0.6 ? '#ff5500' : '#ffffff');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0.95)');

      this.ctx.lineWidth = line.width * this.intensity;
      this.ctx.strokeStyle = gradient;
      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.stroke();
    }
  }
}
