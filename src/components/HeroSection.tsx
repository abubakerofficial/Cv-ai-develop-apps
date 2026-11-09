import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Play, Sparkles, Terminal } from 'lucide-react';
import { HERO_IMAGE } from '../data/portfolioData';

interface HeroSectionProps {
  onExploreProjects: () => void;
  onWatchShowreel: () => void;
}

const FULL_SUBTITLE = 'AI Software Developer | Web Designer | Video Editor';

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProjects,
  onWatchShowreel
}) => {
  const [typedText, setTypedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    setTypedText('');
    setIsTypingComplete(false);

    const interval = setInterval(() => {
      currentIndex += 1;
      setTypedText(FULL_SUBTITLE.slice(0, currentIndex));
      if (currentIndex >= FULL_SUBTITLE.length) {
        setIsTypingComplete(true);
        clearInterval(interval);
      }
    }, 42);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative z-10 mx-auto max-w-[1280px] px-6 pt-12 pb-20 md:pt-20 md:pb-28"
    >
      {/* Main Split-Screen Hero */}
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
        {/* Left Column: Typographic Hierarchy & CTAs */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0.9, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5 flex items-center gap-3 text-xs tracking-wider text-zinc-400"
          >
            <span className="font-mono text-[#ff0033]">01</span>
            <span aria-hidden="true">·</span>
            <span>Creative Technologist & Filmmaker</span>
            <span aria-hidden="true">·</span>
            <span>Pakistan / Global</span>
          </motion.div>

          {/* 3D Cinematic Fade-Up Reveal of "Abubakar Hussain" */}
          <div>
            <motion.h1
              initial={{
                opacity: 0.9,
                y: 24,
                scale: 0.98
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1
              }}
              transition={{
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1]
              }}
              style={{ textWrap: 'balance' }}
              className="font-display text-[clamp(2.6rem,5.4vw,4.75rem)] font-extrabold leading-[1.03] tracking-tight text-white"
            >
              Abubakar{' '}
              <span className="bg-gradient-to-r from-white via-zinc-100 to-[#ff0033] bg-clip-text text-transparent">
                Hussain
              </span>
            </motion.h1>
          </div>

          {/* Typewriter Subtitle */}
          <motion.div
            initial={{ opacity: 0.95, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 flex min-h-[3.25rem] items-center rounded-xl border border-white/10 bg-zinc-950/90 px-4 py-3"
          >
            <Terminal className="mr-3 h-4 w-4 shrink-0 text-[#ff0033]" />
            <p className="font-mono text-sm font-medium tracking-wide text-zinc-100 sm:text-base">
              <span>{typedText || FULL_SUBTITLE}</span>
              <span
                aria-hidden="true"
                className={`ml-1 inline-block h-4 w-[2px] align-middle bg-[#ff0033] shadow-[0_0_8px_#ff0033] ${
                  isTypingComplete ? 'animate-pulse' : ''
                }`}
              />
            </p>
          </motion.div>

          {/* Lead Prose */}
          <motion.p
            initial={{ opacity: 0.95, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-[62ch] text-base leading-relaxed text-zinc-400 sm:text-[17px]"
          >
            Engineering next-generation AI web platforms, tactile 3D digital interfaces, and
            high-retention cinematic edits. Blending neural software architecture with
            frame-accurate visual storytelling.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0.95, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <button
              type="button"
              onClick={onExploreProjects}
              className="group relative inline-flex items-center gap-2.5 rounded-xl bg-[#ff0033] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_-5px_rgba(255,0,51,0.65)] transition-all duration-200 hover:bg-[#e6002e] hover:shadow-[0_0_40px_0px_rgba(255,0,51,0.85)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff0033] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Explore Featured Work</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <button
              type="button"
              onClick={onWatchShowreel}
              className="group inline-flex items-center gap-2.5 rounded-xl border border-white/15 bg-zinc-900/90 px-6 py-3.5 text-sm font-medium text-zinc-200 transition-all duration-200 hover:border-[#ff0033]/60 hover:bg-zinc-900 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff0033] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Play className="h-4 w-4 fill-[#ff0033] text-[#ff0033] transition-transform duration-200 group-hover:scale-110" />
              <span>Launch TikTok Showreel</span>
            </button>
          </motion.div>
        </div>

        {/* Right Column: Circular Avatar Wrapped in Glowing Cybernetic Scanning Circle */}
        <div className="flex items-center justify-center lg:col-span-5">
          <motion.div
            initial={{ opacity: 0.95, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex h-[340px] w-[340px] items-center justify-center sm:h-[390px] sm:w-[390px]"
          >
            {/* Ambient Crimson Core Glow (WebKit hardware-safe radial gradient) */}
            <div
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255,0,51,0.32) 0%, rgba(255,0,51,0.08) 50%, transparent 72%)'
              }}
            />

            {/* Outer Rotating Cybernetic Reticle Ring (Clockwise) */}
            <motion.svg
              animate={{ rotate: 360 }}
              transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
              viewBox="0 0 400 400"
              className="pointer-events-none absolute inset-0 h-full w-full"
            >
              <defs>
                <linearGradient id="cyberRedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff0033" stopOpacity="1" />
                  <stop offset="50%" stopColor="#ff0033" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#ff3355" stopOpacity="0.9" />
                </linearGradient>
              </defs>
              {/* Dashed orbital ring */}
              <circle
                cx="200"
                cy="200"
                r="188"
                fill="none"
                stroke="url(#cyberRedGrad)"
                strokeWidth="1.75"
                strokeDasharray="18 10 4 10"
              />
              {/* Precision cardinal calibration arcs */}
              <path
                d="M 200 6 A 194 194 0 0 1 335 61"
                fill="none"
                stroke="#ff0033"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M 200 394 A 194 194 0 0 1 65 339"
                fill="none"
                stroke="#ff0033"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </motion.svg>

            {/* Counter-Rotating Inner Telemetry Ring */}
            <motion.svg
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              viewBox="0 0 400 400"
              className="pointer-events-none absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)]"
            >
              <circle
                cx="200"
                cy="200"
                r="170"
                fill="none"
                stroke="rgba(255, 0, 51, 0.45)"
                strokeWidth="1.2"
                strokeDasharray="6 14"
              />
              <circle cx="200" cy="30" r="4" fill="#ff0033" />
              <circle cx="200" cy="370" r="4" fill="#ff0033" />
              <circle cx="30" cy="200" r="3" fill="#ff0033" />
              <circle cx="370" cy="200" r="3" fill="#ff0033" />
            </motion.svg>

            {/* Pulsing Conic Radar Sweep */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              className="pointer-events-none absolute h-[292px] w-[292px] rounded-full sm:h-[332px] sm:w-[332px]"
              style={{
                background:
                  'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(255, 0, 51, 0.38) 360deg)'
              }}
            />

            {/* Circular Avatar Frame with Vertical Laser Scan Line */}
            <div className="relative h-[264px] w-[264px] overflow-hidden rounded-full border-2 border-[#ff0033]/80 bg-zinc-950 shadow-[0_0_45px_rgba(255,0,51,0.45)] sm:h-[300px] sm:w-[300px]">
              {!imgError ? (
                <img
                  src={HERO_IMAGE}
                  alt="Abubakar Hussain — AI Software Developer, Web Designer, and Video Editor"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="h-full w-full object-cover object-[center_28%] transition-transform duration-700 hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-zinc-900 via-black to-[#2a0008] p-6 text-center">
                  <Sparkles className="mb-2 h-10 w-10 text-[#ff0033]" />
                  <span className="font-display text-2xl font-bold text-white">AH</span>
                </div>
              )}

              {/* Subtle Cybernetic Vertical Scanning Laser */}
              <motion.div
                animate={{ top: ['-10%', '110%', '-10%'] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="pointer-events-none absolute right-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff0033] to-transparent shadow-[0_0_16px_2px_#ff0033]"
              />

              {/* Subtle dark bottom vignette */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Full-Width Quantitative Proof Strip Below the Hero Split */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mt-16 grid grid-cols-2 gap-6 border-y border-white/10 py-7 md:grid-cols-4"
      >
        <div>
          <p className="font-display font-mono text-2xl font-bold text-white tabular-nums sm:text-3xl">
            4 Flagship
          </p>
          <p className="mt-1 text-xs text-zinc-400">
            Production Web & AI Platforms Deployed
          </p>
        </div>
        <div>
          <p className="font-display font-mono text-2xl font-bold text-white tabular-nums sm:text-3xl">
            464K+ Views
          </p>
          <p className="mt-1 text-xs text-zinc-400">
            Organic Reach Across Short-Form Edits
          </p>
        </div>
        <div>
          <p className="font-display font-mono text-2xl font-bold text-[#ff0033] tabular-nums sm:text-3xl">
            60 FPS
          </p>
          <p className="mt-1 text-xs text-zinc-400">
            Interactive Motion & Timeline Precision
          </p>
        </div>
        <div>
          <p className="font-display font-mono text-2xl font-bold text-white tabular-nums sm:text-3xl">
            3-in-1 Craft
          </p>
          <p className="mt-1 text-xs text-zinc-400">
            AI Engineering · Web UI · Cinema Post
          </p>
        </div>
      </motion.div>
    </section>
  );
};
