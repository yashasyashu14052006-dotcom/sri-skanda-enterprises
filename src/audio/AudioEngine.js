/**
 * PROCEDURAL WEB AUDIO SYNTHESIZER FOR CINEMATIC SPORTS DESIGN
 * High-fidelity, zero-dependency sound generation tailored for volleyball physics and anime impact.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = false;
    this.masterGain = null;
    this.ambienceGain = null;
    this.ambienceOsc = null;
    this.ambienceNoise = null;
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.isInitialized = true;
    } catch (e) {
      console.warn("Web Audio initialization error:", e);
    }
  }

  toggle() {
    if (!this.isInitialized) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.enabled = !this.enabled;
    if (this.enabled) {
      this.startAmbience();
      this.playCourtSqueak();
    } else {
      this.stopAmbience();
    }
    return this.enabled;
  }

  startAmbience() {
    if (!this.ctx || !this.enabled) return;
    try {
      // Warm arena low-frequency resonance
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(55, this.ctx.currentTime); // A1 note arena hum

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(120, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      this.ambienceOsc = osc;
      this.ambienceGain = gain;
    } catch (e) {}
  }

  stopAmbience() {
    if (this.ambienceOsc) {
      try {
        this.ambienceOsc.stop();
        this.ambienceOsc.disconnect();
      } catch (e) {}
      this.ambienceOsc = null;
    }
  }

  /**
   * Volleyball Floor Bounce Sound
   */
  playBallBounce(volume = 0.3) {
    if (!this.ctx || !this.enabled) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.12);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(350, now);

    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  /**
   * Athletic Rubber Court Shoe Squeak
   */
  playCourtSqueak(volume = 0.25) {
    if (!this.ctx || !this.enabled) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(2400, now);
    osc.frequency.linearRampToValueAtTime(3200, now + 0.04);
    osc.frequency.exponentialRampToValueAtTime(1800, now + 0.09);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2600, now);
    filter.Q.setValueAtTime(5, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.11);
  }

  /**
   * Heartbeat pulse for tension build-up
   */
  playHeartbeat(volume = 0.4) {
    if (!this.ctx || !this.enabled) return;
    const now = this.ctx.currentTime;

    // First lub
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(80, now);
    osc1.frequency.exponentialRampToValueAtTime(35, now + 0.1);
    gain1.gain.setValueAtTime(volume, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc1.connect(gain1);
    gain1.connect(this.masterGain);
    osc1.start(now);
    osc1.stop(now + 0.13);

    // Second dub
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(70, now + 0.14);
    osc2.frequency.exponentialRampToValueAtTime(30, now + 0.24);
    gain2.gain.setValueAtTime(volume * 0.85, now + 0.14);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.26);
    osc2.connect(gain2);
    gain2.connect(this.masterGain);
    osc2.start(now + 0.14);
    osc2.stop(now + 0.27);
  }

  /**
   * Jump & Flight Whoosh
   */
  playJumpWhoosh(volume = 0.35) {
    if (!this.ctx || !this.enabled) return;
    const now = this.ctx.currentTime;

    const bufferSize = this.ctx.sampleRate * 0.4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(300, now);
    filter.frequency.exponentialRampToValueAtTime(1400, now + 0.25);
    filter.frequency.exponentialRampToValueAtTime(400, now + 0.4);
    filter.Q.setValueAtTime(2.5, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.18);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(now);
    noise.stop(now + 0.42);
  }

  /**
   * MASSIVE ANIME SMASH BOOM IMPACT
   * Multi-layer: Sub-bass 45Hz drop + explosive noise transient + chest punch resonance
   */
  playSmashImpactBoom() {
    if (!this.ctx || !this.enabled) return;
    const now = this.ctx.currentTime;

    // Layer 1: Sub Bass Boom (45Hz -> 20Hz drop)
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(160, now);
    subOsc.frequency.exponentialRampToValueAtTime(38, now + 0.35);
    subGain.gain.setValueAtTime(1.0, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    subOsc.connect(subGain);
    subGain.connect(this.masterGain);
    subOsc.start(now);
    subOsc.stop(now + 1.25);

    // Layer 2: Hard Leather Slap Transient (Noise spike)
    const bufferSize = this.ctx.sampleRate * 0.2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.03));
    }
    const snap = this.ctx.createBufferSource();
    snap.buffer = buffer;

    const snapFilter = this.ctx.createBiquadFilter();
    snapFilter.type = 'bandpass';
    snapFilter.frequency.setValueAtTime(1800, now);
    snapFilter.Q.setValueAtTime(1.5, now);

    const snapGain = this.ctx.createGain();
    snapGain.gain.setValueAtTime(0.9, now);
    snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    snap.connect(snapFilter);
    snapFilter.connect(snapGain);
    snapGain.connect(this.masterGain);
    snap.start(now);
    snap.stop(now + 0.22);

    // Layer 3: Distorted Punch Body
    const bodyOsc = this.ctx.createOscillator();
    const bodyGain = this.ctx.createGain();
    const distortion = this.ctx.createWaveShaper();

    // Soft clip curve
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;
    const k = 50;
    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    distortion.curve = curve;

    bodyOsc.type = 'triangle';
    bodyOsc.frequency.setValueAtTime(220, now);
    bodyOsc.frequency.exponentialRampToValueAtTime(50, now + 0.2);

    bodyGain.gain.setValueAtTime(0.7, now);
    bodyGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    bodyOsc.connect(distortion);
    distortion.connect(bodyGain);
    bodyGain.connect(this.masterGain);
    bodyOsc.start(now);
    bodyOsc.stop(now + 0.55);
  }

  /**
   * UI Click / Hover tick
   */
  playHoverTick() {
    if (!this.ctx || !this.enabled) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, now);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.035);
  }
}

export const soundEngine = new SoundEngine();
