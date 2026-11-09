/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowUp } from 'lucide-react';
import { ParticleBackground } from './components/ParticleBackground';
import { HeroSection } from './components/HeroSection';
import { AboutEducationSection } from './components/AboutEducationSection';
import { ProjectsSection } from './components/ProjectsSection';
import { TikTokShowcaseSection } from './components/TikTokShowcaseSection';
import { ContactSection } from './components/ContactSection';

export default function App() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-zinc-100 selection:bg-[#ff0033] selection:text-white">
      {/* Subtle Animated Dark Red Glowing Particles & Gradient Mesh */}
      <ParticleBackground />

      {/* Top Navigation Bar — Strict 3-Zone Contract */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050505]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-8 px-6 py-4">
          {/* Zone 1: Single Text Element Brand Wordmark */}
          <a
            href="#hero"
            className="font-display text-lg font-bold tracking-tight text-white transition-colors hover:text-[#ff0033] whitespace-nowrap shrink-0"
          >
            Abubakar Hussain
          </a>

          {/* Zone 2: 4 Concise Single-Line Text Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden items-center gap-7 text-sm font-medium text-zinc-400 md:flex"
          >
            <a
              href="#about"
              className="decoration-[#ff0033] decoration-2 underline-offset-8 transition-colors hover:text-white hover:underline whitespace-nowrap shrink-0"
            >
              About
            </a>
            <a
              href="#projects"
              className="decoration-[#ff0033] decoration-2 underline-offset-8 transition-colors hover:text-white hover:underline whitespace-nowrap shrink-0"
            >
              Projects
            </a>
            <a
              href="#showreel"
              className="decoration-[#ff0033] decoration-2 underline-offset-8 transition-colors hover:text-white hover:underline whitespace-nowrap shrink-0"
            >
              Showreel
            </a>
            <a
              href="#contact"
              className="decoration-[#ff0033] decoration-2 underline-offset-8 transition-colors hover:text-white hover:underline whitespace-nowrap shrink-0"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="rounded-lg bg-[#ff0033] px-4 py-2 text-xs font-semibold text-white shadow-[0_0_20px_-4px_rgba(255,0,51,0.65)] transition-all duration-200 hover:bg-[#e6002e] hover:shadow-[0_0_28px_0px_rgba(255,0,51,0.85)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff0033] whitespace-nowrap shrink-0 cursor-pointer"
            >
              Start a Project
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        {/* 1. HERO SECTION */}
        <HeroSection
          onExploreProjects={() => scrollToSection('projects')}
          onWatchShowreel={() => scrollToSection('showreel')}
        />

        {/* Editorial Section Divider Ribbon */}
        <div
          aria-hidden="true"
          className="relative z-10 overflow-hidden border-y border-white/10 bg-zinc-950/60 py-3.5"
        >
          <div className="animate-marquee flex items-center gap-8 text-xs font-medium tracking-wider text-zinc-400">
            {[...Array(2)].map((_, groupIndex) => (
              <React.Fragment key={groupIndex}>
                <span>AI Software Development</span>
                <span className="text-[#ff0033]">·</span>
                <span>Interactive 3D Web Architecture</span>
                <span className="text-[#ff0033]">·</span>
                <span>Cinematic Post-Production</span>
                <span className="text-[#ff0033]">·</span>
                <span>Abubakar.ai Neural Studio</span>
                <span className="text-[#ff0033]">·</span>
                <span>Serene Mind Wellness</span>
                <span className="text-[#ff0033]">·</span>
                <span>Binte Hawa Commerce</span>
                <span className="text-[#ff0033]">·</span>
                <span>Holy Quran by Abubakar</span>
                <span className="text-[#ff0033]">·</span>
                <span>Meet Abubakar</span>
                <span className="text-[#ff0033]">·</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 2. EDUCATION & ABOUT */}
        <AboutEducationSection />

        {/* 3. PROJECTS (3D Floating Cards) */}
        <ProjectsSection />

        {/* 4. TIKTOK & SOCIAL SHOWCASE (The Masterpiece) */}
        <TikTokShowcaseSection />

        {/* 5. CONTACT & CONNECT (Magnetic Socials) */}
        <ContactSection />
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-[#050505]">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-4 px-6 py-8 text-xs text-zinc-400 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="font-display font-semibold text-white">
              Abubakar Hussain
            </span>
            <span aria-hidden="true">·</span>
            <span>AI Software Developer, Web Designer & Video Editor</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://wa.me/923095704438"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white whitespace-nowrap"
            >
              WhatsApp
            </a>
            <a
              href="https://www.instagram.com/abu.baker_777?psln=MXB3MTliOWtocGxrbg%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white whitespace-nowrap"
            >
              Instagram
            </a>
            <a
              href="https://snapchat.com/t/uMJxH7R6"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white whitespace-nowrap"
            >
              Snapchat
            </a>
            <a
              href="mailto:abubakarofficial47@gmail.com"
              className="transition-colors hover:text-white whitespace-nowrap"
            >
              Email
            </a>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Scroll back to top"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-zinc-900 text-zinc-300 transition-colors hover:border-[#ff0033] hover:text-white cursor-pointer"
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
