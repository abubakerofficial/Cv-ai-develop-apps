import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, Code2, Film, Layers } from 'lucide-react';
import { DISCIPLINE_PILLARS } from '../data/portfolioData';

export const AboutEducationSection: React.FC = () => {
  const [activePillar, setActivePillar] = useState<string>(DISCIPLINE_PILLARS[0].id);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <section
      id="about"
      className="relative z-10 mx-auto max-w-[1280px] px-6 py-20 md:py-28"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0.95, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end"
      >
        <div>
          <div className="mb-3 flex items-center gap-2 text-xs text-zinc-400">
            <span className="font-mono text-[#ff0033]">02</span>
            <span aria-hidden="true">·</span>
            <span>Education & Creative Philosophy</span>
          </div>
          <h2
            style={{ textWrap: 'balance' }}
            className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Where Neural Code Meets Cinema Post-Production
          </h2>
        </div>
        <p className="max-w-md text-sm text-zinc-400">
          Hover over the interactive glass surface to inspect academic credentials and
          multi-disciplinary engineering capabilities.
        </p>
      </motion.div>

      {/* Main Sleek Glassmorphism Card with Glowing Red Border on Hover */}
      <motion.div
        initial={{ opacity: 0.95, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        onMouseMove={handleMouseMove}
        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/90 p-7 transition-all duration-300 hover:border-[#ff0033]/85 hover:shadow-[0_0_55px_-12px_rgba(255,0,51,0.45)] sm:p-10"
      >
        {/* Dynamic Cursor-Following Crimson Spotlight */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 0, 51, 0.12), transparent 65%)`
          }}
        />

        <div className="relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left Column: Narrative & Passion for Cinematic Media + AI Web Apps */}
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <span>Biography</span>
                <span aria-hidden="true">·</span>
                <span>Multidisciplinary Builder</span>
              </div>

              <h3 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
                Crafting High-Impact Digital Experiences & Visual Stories
              </h3>

              <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-zinc-300">
                I am <strong className="font-semibold text-white">Abubakar Hussain</strong>, a
                developer and creator driven by the convergence of{' '}
                <span className="text-white underline decoration-[#ff0033]/70 decoration-2 underline-offset-4">
                  cinematic media
                </span>{' '}
                and{' '}
                <span className="text-white underline decoration-[#ff0033]/70 decoration-2 underline-offset-4">
                  AI-powered web applications
                </span>
                . Whether I am architecting full-stack neural SaaS interfaces in Next.js or
                cutting high-retention visual reels, I obsess over pacing, lighting, and fluid
                human interaction.
              </p>

              <p className="mt-4 max-w-[65ch] text-sm leading-relaxed text-zinc-400">
                Every product I ship is treated like a film sequence: zero wasted frames,
                deliberate contrast, and immediate emotional resonance—from mental wellness
                platforms to intelligent creative suites.
              </p>
            </div>

            {/* Interactive Discipline Selector Tabs */}
            <div className="mt-8 border-t border-white/10 pt-6">
              <div className="flex flex-wrap items-center gap-2">
                {DISCIPLINE_PILLARS.map((pillar, idx) => {
                  const isActive = activePillar === pillar.id;
                  const Icon = idx === 0 ? Code2 : idx === 1 ? Layers : Film;
                  return (
                    <button
                      key={pillar.id}
                      type="button"
                      onClick={() => setActivePillar(pillar.id)}
                      className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-medium transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                        isActive
                          ? 'bg-[#ff0033] text-white shadow-[0_0_20px_rgba(255,0,51,0.45)]'
                          : 'bg-zinc-900/90 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span>{pillar.title}</span>
                    </button>
                  );
                })}
              </div>

              {DISCIPLINE_PILLARS.map((pillar) =>
                pillar.id === activePillar ? (
                  <motion.div
                    key={pillar.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-4"
                  >
                    <div className="flex items-center gap-2 text-xs font-mono text-[#ff0033]">
                      <span>{pillar.metric}</span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-zinc-300">
                      {pillar.description}
                    </p>
                  </motion.div>
                ) : null
              )}
            </div>
          </div>

          {/* Right Column: Academic Credential & Neon Matriculation Highlight */}
          <div className="flex flex-col justify-between border-t border-white/10 pt-8 lg:col-span-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
            <div>
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <Award className="h-4 w-4 text-[#ff0033]" />
                <span>Academic Foundation</span>
              </div>

              <div className="mt-5">
                <p className="text-xs text-zinc-400">Qualification & Credential</p>
                <div className="mt-2.5 flex flex-wrap items-center gap-3.5">
                  <h4 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    Matriculation
                  </h4>

                  {/* Neon Badge Effect Next to Matriculation as Requested */}
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-[#ff0033] bg-[#ff0033]/15 px-3 py-1 font-mono text-xs font-semibold tracking-wider text-[#ff0033] shadow-[0_0_20px_rgba(255,0,51,0.55),inset_0_0_10px_rgba(255,0,51,0.25)] whitespace-nowrap shrink-0">
                    <span>VERIFIED CREDENTIAL</span>
                  </span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                  Completed secondary academic foundation with a concentrated self-directed
                  specialization in modern software development, neural media tools, and
                  digital production systems.
                </p>
              </div>

              {/* Core Technical & Creative Matrix */}
              <div className="mt-8 space-y-4 border-t border-white/10 pt-6">
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-zinc-200">Frontend & AI Stack</span>
                    <span className="font-mono text-zinc-400">Next.js · React · TypeScript</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-900">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 0.95 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                      style={{ transformOrigin: 'left' }}
                      className="h-full w-full bg-gradient-to-r from-[#ff0033] to-rose-500 shadow-[0_0_12px_#ff0033]"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-zinc-200">UI/UX & 3D Web Motion</span>
                    <span className="font-mono text-zinc-400">Tailwind CSS · Framer Motion</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-900">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 0.92 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                      style={{ transformOrigin: 'left' }}
                      className="h-full w-full bg-gradient-to-r from-[#ff0033] to-rose-500 shadow-[0_0_12px_#ff0033]"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-zinc-200">Cinematic Post & Color</span>
                    <span className="font-mono text-zinc-400">Premiere Pro · After Effects · DaVinci</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-900">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 0.96 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      style={{ transformOrigin: 'left' }}
                      className="h-full w-full bg-gradient-to-r from-[#ff0033] to-rose-500 shadow-[0_0_12px_#ff0033]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5 text-xs text-zinc-400">
              <span>Focus Areas</span>
              <span>AI SaaS · E-Commerce · Short-Form Cinema</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
