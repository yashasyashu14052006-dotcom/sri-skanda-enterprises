/**
 * CUSTOM MAGNET CURSOR CONTROLLER
 * Smooth fluid cursor with dynamic context labels (VIEW, EXPLORE, PLAY, SMASH).
 */

import { soundEngine } from '../audio/AudioEngine.js';

export class CustomCursor {
  constructor() {
    this.cursorEl = document.querySelector('.custom-cursor');
    this.ringEl = document.querySelector('.cursor-ring');
    this.labelEl = document.querySelector('.cursor-label');

    this.targetX = window.innerWidth / 2;
    this.targetY = window.innerHeight / 2;
    this.currentX = this.targetX;
    this.currentY = this.targetY;
    this.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!this.isTouch && this.cursorEl) {
      this.init();
    }
  }

  init() {
    window.addEventListener('mousemove', (e) => {
      this.targetX = e.clientX;
      this.targetY = e.clientY;
    });

    // Attach interactive hover listeners
    this.setupInteractiveElements();
    this.render();
  }

  setupInteractiveElements() {
    const interactiveSelectors = [
      { selector: 'a, button, .skill-tab-btn, .gallery-filter-btn', label: 'SELECT' },
      { selector: '.gallery-panel-card', label: 'VIEW' },
      { selector: '.play-again-btn', label: 'PLAY' },
      { selector: '#court-tactical-canvas', label: 'EXPLORE' },
      { selector: '.cinematic-pinned-track', label: 'SCROLL' }
    ];

    interactiveSelectors.forEach(({ selector, label }) => {
      document.querySelectorAll(selector).forEach((el) => {
        el.addEventListener('mouseenter', () => {
          this.setLabel(label);
          this.cursorEl.classList.add('active');
          soundEngine.playHoverTick();
        });
        el.addEventListener('mouseleave', () => {
          this.cursorEl.classList.remove('active');
        });
      });
    });
  }

  setLabel(text) {
    if (this.labelEl) {
      this.labelEl.textContent = text;
    }
  }

  render() {
    requestAnimationFrame(this.render.bind(this));

    // Smooth Lerp
    this.currentX += (this.targetX - this.currentX) * 0.18;
    this.currentY += (this.targetY - this.currentY) * 0.18;

    if (this.cursorEl) {
      this.cursorEl.style.transform = `translate3d(${this.currentX}px, ${this.currentY}px, 0)`;
    }
  }
}
