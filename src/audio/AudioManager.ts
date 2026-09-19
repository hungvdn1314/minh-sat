// AudioManager compliant with web-storage-audio-policy:
// 1. Gesture-based audio unlock ({ once: true })
// 2. Tab visibility listener (auto-mute on document.hidden)
// 3. Web Audio synthesis fallback for noir rain ambience, typewriter click, evidence discovery chord, and page flips

class AudioManager {
  private static instance: AudioManager;
  private audioCtx: AudioContext | null = null;
  private isUnlocked: boolean = false;
  private isMuted: boolean = false;
  private rainGainNode: GainNode | null = null;
  private isRainPlaying: boolean = false;

  private constructor() {
    this.setupVisibilityListener();
  }

  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  public unlockAudio(): void {
    if (this.isUnlocked) return;

    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.audioCtx) {
        this.audioCtx = new AudioContextClass();
      }

      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      this.isUnlocked = true;
      this.playSfx('click');
      this.startRainAmbience();
    } catch (e) {
      console.warn('AudioContext unlock failed:', e);
    }
  }

  private setupVisibilityListener(): void {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (this.audioCtx && this.audioCtx.state === 'running') {
          this.audioCtx.suspend();
        }
      } else {
        if (this.audioCtx && this.isUnlocked && !this.isMuted) {
          this.audioCtx.resume();
        }
      }
    });
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.audioCtx) {
      if (this.isMuted) {
        this.audioCtx.suspend();
      } else if (this.isUnlocked) {
        this.audioCtx.resume();
      }
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getIsUnlocked(): boolean {
    return this.isUnlocked;
  }

  // Synthesize Noir Rain Ambience (Pink noise with bandpass filtering)
  public startRainAmbience(): void {
    if (!this.audioCtx || this.isRainPlaying || this.isMuted) return;

    try {
      const bufferSize = this.audioCtx.sampleRate * 2;
      const noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      // Pink noise approximation for rain
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.03;
        b6 = white * 0.115926;
      }

      const whiteNoise = this.audioCtx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 850;

      this.rainGainNode = this.audioCtx.createGain();
      this.rainGainNode.gain.setValueAtTime(0.35, this.audioCtx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(this.rainGainNode);
      this.rainGainNode.connect(this.audioCtx.destination);

      whiteNoise.start(0);
      this.isRainPlaying = true;
    } catch (e) {
      console.warn('Rain synthesis error:', e);
    }
  }

  // Synthesize Sound Effects
  public playSfx(type: 'click' | 'evidence' | 'dialogue' | 'puzzle_solve' | 'page_turn' | 'stamp'): void {
    if (!this.audioCtx || !this.isUnlocked || this.isMuted) return;

    const ctx = this.audioCtx;
    const now = ctx.currentTime;

    try {
      if (type === 'click') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === 'evidence') {
        // Mysterious detective minor chord sting (D minor: D4, F4, A4)
        [293.66, 349.23, 440.0].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.05);
          gain.gain.setValueAtTime(0.18, now + idx * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.05);
          osc.stop(now + 1.2);
        });
      } else if (type === 'dialogue') {
        // Typewriter click
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(1200 + Math.random() * 400, now);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.03);
      } else if (type === 'puzzle_solve') {
        // Bright resolution chord (F# - A - C# - E)
        [369.99, 440.0, 554.37, 659.25].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);
          gain.gain.setValueAtTime(0.15, now + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.08);
          osc.stop(now + 1.5);
        });
      } else if (type === 'page_turn') {
        // Soft paper rustle
        const bufferSize = ctx.sampleRate * 0.15;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.03));
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 1800;
        const gain = ctx.createGain();
        gain.gain.value = 0.15;
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start(now);
      } else if (type === 'stamp') {
        // Case file stamp thud
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.18);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.2);
      }
    } catch (e) {
      console.warn('SFX trigger error:', e);
    }
  }
}

export const audioManager = AudioManager.getInstance();
