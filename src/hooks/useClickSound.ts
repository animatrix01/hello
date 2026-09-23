import { useCallback, useRef } from "react";

type AudioContextCtor = typeof AudioContext;

/** Mechanical mouse-click synthesized with WebAudio — no asset file needed. */
export function useClickSound() {
  const ctxRef = useRef<AudioContext | null>(null);

  // Crisp mechanical-click tuning — nudge in one place
  const CLICK_FREQ = 3500; // bandpass center: brightness of the snap
  const CLICK_Q = 0.9; // filter width: lower = sharper
  const DURATION = 0.05; // snap length in seconds
  const VOLUME = 0.3; // peak gain

  const playClick = useCallback(() => {
    try {
      if (typeof window === "undefined") return;
      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: AudioContextCtor }).webkitAudioContext;
      if (!Ctor) return;

      let ctx = ctxRef.current;
      if (!ctx || ctx.state === "closed") {
        ctx = new Ctor();
        ctxRef.current = ctx;
      }
      if (ctx.state === "suspended") {
        void ctx.resume().catch(() => undefined);
      }

      const t = ctx.currentTime;
      const len = Math.max(1, Math.floor(ctx.sampleRate * DURATION));

      // 1) Broadband transient: short white-noise burst = the "snap"
      const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < len; i++) {
        // slight front-weight so the attack hits like a switch
        const falloff = 1 - i / len;
        data[i] = (Math.random() * 2 - 1) * (0.4 + 0.6 * falloff);
      }

      const src = ctx.createBufferSource();
      src.buffer = buffer;

      const bandpass = ctx.createBiquadFilter();
      bandpass.type = "bandpass";
      bandpass.frequency.value = CLICK_FREQ;
      bandpass.Q.value = CLICK_Q;

      const snapGain = ctx.createGain();
      snapGain.gain.setValueAtTime(VOLUME, t);
      snapGain.gain.exponentialRampToValueAtTime(0.0001, t + DURATION);

      src.connect(bandpass);
      bandpass.connect(snapGain);
      snapGain.connect(ctx.destination);
      src.start(t);
      src.stop(t + DURATION + 0.01);

      // 2) Physical body: faint low thump under the snap (Omron-switch feel)
      const bodyOsc = ctx.createOscillator();
      const bodyGain = ctx.createGain();
      bodyOsc.type = "sine";
      bodyOsc.frequency.setValueAtTime(170, t);
      bodyOsc.frequency.exponentialRampToValueAtTime(120, t + 0.025);
      bodyGain.gain.setValueAtTime(0.07, t);
      bodyGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.03);

      bodyOsc.connect(bodyGain);
      bodyGain.connect(ctx.destination);
      bodyOsc.start(t);
      bodyOsc.stop(t + 0.04);
    } catch {
      // autoplay policy or unsupported — silent fail
    }
  }, []);

  return playClick;
}
