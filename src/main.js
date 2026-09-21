/**
 * YASHU (#17) CINEMATIC 3D VOLLEYBALL ATHLETE PORTFOLIO
 * Main Application Orchestrator with Lenis Smooth Momentum Scrolling & GSAP Integration
 */

import { ATHLETE_DATA } from './data/athleteData.js';
import { VolleyballScene } from './canvas/VolleyballScene.js';
import { InteractiveCourt } from './canvas/InteractiveCourt.js';
import { ImpactEffects } from './canvas/ImpactEffects.js';
import { CustomCursor } from './components/CustomCursor.js';
import { soundEngine } from './audio/AudioEngine.js';

class App {
  constructor() {
    this.scene = null;
    this.court = null;
    this.impactFX = null;
    this.cursor = null;
    this.lenis = null;
    this.hasSmashFired = false;
    this.lastScrollSection = -1;

    this.init();
  }

  init() {
    // 1. Initialize Lenis Smooth Scrolling
    this.initSmoothScroll();

    // 2. Populate Dynamic Data
    this.renderDynamicContent();

    // 3. Initialize Lucide Icons
    if (window.lucide) {
      window.lucide.createIcons();
    }

    // 4. Initialize 3D Main Scene
    const canvasContainer = document.getElementById('webgl-container');
    if (canvasContainer) {
      this.scene = new VolleyballScene(canvasContainer);
    }

    // 5. Initialize Impact Effects
    const speedlinesCanvas = document.getElementById('speedlines-canvas');
    const flashOverlay = document.querySelector('.impact-flash-overlay');
    if (speedlinesCanvas && flashOverlay) {
      this.impactFX = new ImpactEffects(speedlinesCanvas, flashOverlay);
      if (this.scene) {
        this.scene.onSmashContactCallback = () => {
          this.impactFX.triggerSmashImpact();
        };
      }
    }

    // 6. Initialize Tactical Court
    const tacticalCanvas = document.getElementById('court-tactical-canvas');
    if (tacticalCanvas) {
      this.court = new InteractiveCourt(tacticalCanvas);
    }

    // 7. Initialize Custom Magnet Cursor
    this.cursor = new CustomCursor();

    // 8. Setup Controls & Listeners
    this.setupNavigation();
    this.setupAudioToggle();
    this.setupScrollCinematics();
    this.setupSkillsTabs();
    this.setupGallery();
    this.setupStatsCounters();
    this.setupReplayExperience();
  }

  initSmoothScroll() {
    if (window.Lenis) {
      this.lenis = new window.Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.1
      });

      const raf = (time) => {
        this.lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }
  }

  renderDynamicContent() {
    const bioStatementEl = document.querySelector('.profile-bio-quote');
    if (bioStatementEl) {
      bioStatementEl.textContent = `"${ATHLETE_DATA.identity.bioStatement}"`;
    }

    const whyQuoteEl = document.querySelector('.spotlight-quote-body');
    if (whyQuoteEl) {
      whyQuoteEl.textContent = `"${ATHLETE_DATA.identity.personalQuote}"`;
    }
  }

  setupNavigation() {
    document.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          if (this.lenis) {
            this.lenis.scrollTo(targetSection, { duration: 1.5 });
          } else {
            targetSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  }

  setupAudioToggle() {
    const soundBtn = document.querySelector('.sound-btn');
    const soundLabel = document.querySelector('.sound-btn-label');
    if (!soundBtn) return;

    soundBtn.addEventListener('click', () => {
      const isSoundOn = soundEngine.toggle();
      if (isSoundOn) {
        soundBtn.classList.add('active');
        if (soundLabel) soundLabel.textContent = 'SOUND ON';
      } else {
        soundBtn.classList.remove('active');
        if (soundLabel) soundLabel.textContent = 'SOUND OFF';
      }
    });
  }

  setupScrollCinematics() {
    const pinnedTrack = document.querySelector('.cinematic-pinned-track');
    const heroContent = document.querySelector('.hero-prologue-content');
    const chapter1 = document.getElementById('stage-approach');
    const chapter2 = document.getElementById('stage-jump');
    const chapter3 = document.getElementById('stage-smash');
    const progressRing = document.querySelector('.scroll-ring-indicator');

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const totalScrollProgress = Math.min(1, Math.max(0, scrollY / (totalHeight || 1)));

      if (progressRing) {
        const offset = 100 - (totalScrollProgress * 100);
        progressRing.style.strokeDashoffset = String(offset);
      }

      if (pinnedTrack && this.scene) {
        const trackRect = pinnedTrack.getBoundingClientRect();
        const trackHeight = pinnedTrack.clientHeight - window.innerHeight;
        const trackScroll = -trackRect.top;
        const p = Math.min(1, Math.max(0, trackScroll / (trackHeight || 1)));

        this.scene.setScrollProgress(p);

        if (p < 0.22) {
          if (heroContent) heroContent.style.opacity = String(Math.max(0, 1 - p * 4));
          if (chapter1) chapter1.classList.remove('active');
          if (chapter2) chapter2.classList.remove('active');
          if (chapter3) chapter3.classList.remove('active');
          if (this.impactFX) this.impactFX.setIntensity(0);
        } else if (p < 0.50) {
          if (heroContent) heroContent.style.opacity = '0';
          if (chapter1) chapter1.classList.add('active');
          if (chapter2) chapter2.classList.remove('active');
          if (chapter3) chapter3.classList.remove('active');
          if (this.impactFX) this.impactFX.setIntensity(0);

          const words = chapter1 ? chapter1.querySelectorAll('.kinetic-word') : [];
          const step = (p - 0.22) / 0.28;
          words.forEach((w, idx) => {
            if (step > idx * 0.25) {
              w.classList.add('lit');
            } else {
              w.classList.remove('lit');
            }
          });

          if (this.lastScrollSection !== 1 && p > 0.3) {
            soundEngine.playCourtSqueak();
            this.lastScrollSection = 1;
          }

        } else if (p < 0.75) {
          if (chapter1) chapter1.classList.remove('active');
          if (chapter2) chapter2.classList.add('active');
          if (chapter3) chapter3.classList.remove('active');
          if (this.impactFX) this.impactFX.setIntensity(0.18);

          const words2 = chapter2 ? chapter2.querySelectorAll('.kinetic-word') : [];
          const step2 = (p - 0.50) / 0.25;
          words2.forEach((w, idx) => {
            if (step2 > idx * 0.4) {
              w.classList.add('lit');
            } else {
              w.classList.remove('lit');
            }
          });

          if (this.lastScrollSection !== 2 && p > 0.52) {
            soundEngine.playJumpWhoosh();
            this.lastScrollSection = 2;
          }

        } else if (p <= 1.0) {
          if (chapter1) chapter1.classList.remove('active');
          if (chapter2) chapter2.classList.remove('active');
          if (chapter3) chapter3.classList.add('active');

          const step3 = (p - 0.75) / 0.25;
          if (this.impactFX) {
            this.impactFX.setIntensity(step3 * 1.6);
          }

          if (step3 > 0.15 && !this.hasSmashFired) {
            this.hasSmashFired = true;
            if (this.impactFX) this.impactFX.triggerSmashImpact();
          } else if (step3 < 0.1) {
            this.hasSmashFired = false;
          }
        }
      }
    });
  }

  setupSkillsTabs() {
    const tabs = document.querySelectorAll('.skill-tab-btn');
    const metricFocus = document.getElementById('metric-focus');
    const metricStyle = document.getElementById('metric-style');
    const metricPower = document.getElementById('metric-power');

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');

        const skillId = tab.getAttribute('data-skill');
        const skillData = ATHLETE_DATA.strengths.find((s) => s.id === skillId);

        if (skillData && this.court) {
          this.court.updateTrajectory(skillId);
          if (metricFocus) metricFocus.textContent = skillData.metrics.focus;
          if (metricStyle) metricStyle.textContent = skillData.metrics.style;
          if (metricPower) metricPower.textContent = skillData.metrics.power || skillData.metrics.pressure || skillData.metrics.mindset;
        }
        soundEngine.playHoverTick();
      });
    });
  }

  setupStatsCounters() {
    let hasAnimated = false;
    const statsSection = document.getElementById('stats-section');
    if (!statsSection) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasAnimated) {
        hasAnimated = true;
        this.animateStats();
      }
    }, { threshold: 0.25 });

    observer.observe(statsSection);
  }

  animateStats() {
    const counters = document.querySelectorAll('.stat-num-val');
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      let current = 0;
      const duration = 1200;
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(1, elapsed / duration);
        const easeVal = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        current = Math.floor(easeVal * target);
        counter.textContent = String(current);

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          counter.textContent = String(target);
        }
      };

      requestAnimationFrame(updateCount);
    });
  }

  setupGallery() {
    const filterBtns = document.querySelectorAll('.gallery-filter-btn');
    const galleryCards = document.querySelectorAll('.gallery-panel-card');
    const modal = document.querySelector('.lightbox-modal');
    const modalImg = document.querySelector('.lightbox-img-view');
    const modalTitle = document.querySelector('.lightbox-title');
    const closeBtn = document.querySelector('.lightbox-close-btn');

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const cat = btn.getAttribute('data-category');
        galleryCards.forEach((card) => {
          const cardCat = card.getAttribute('data-category');
          if (cat === 'ALL' || cardCat === cat) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
        soundEngine.playHoverTick();
      });
    });

    galleryCards.forEach((card) => {
      card.addEventListener('click', () => {
        const imgSrc = card.querySelector('.gallery-panel-img').getAttribute('src');
        const title = card.querySelector('.gallery-panel-title').textContent;

        if (modalImg) modalImg.src = imgSrc;
        if (modalTitle) modalTitle.textContent = title;
        if (modal) modal.classList.add('active');
        soundEngine.playHoverTick();
      });
    });

    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
      });
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
        }
      });
    }
  }

  setupReplayExperience() {
    const replayBtn = document.querySelector('.play-again-btn');
    if (replayBtn) {
      replayBtn.addEventListener('click', () => {
        soundEngine.playCourtSqueak();
        if (this.lenis) {
          this.lenis.scrollTo(0, { duration: 1.8 });
        } else {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
      });
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new App();
});
