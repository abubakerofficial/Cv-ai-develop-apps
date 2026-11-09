import React, { useEffect, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform
} from 'motion/react';
import {
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Eye,
  Layers,
  Sparkles,
  X
} from 'lucide-react';
import { PROJECTS, ProjectItem } from '../data/portfolioData';

interface TiltCardProps {
  project: ProjectItem;
  index: number;
  onSelect: (project: ProjectItem) => void;
}

const ProjectTiltCard: React.FC<TiltCardProps> = ({ project, index, onSelect }) => {
  const [imgFailed, setImgFailed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Parallax Tilt Motion Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 260, damping: 22 });
  const mouseYSpring = useSpring(y, { stiffness: 260, damping: 22 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['11deg', '-11deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-11deg', '11deg']);
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);
  const glareBackground = useTransform(
    [glareX, glareY],
    ([gx, gy]) =>
      `radial-gradient(360px circle at ${gx} ${gy}, rgba(255, 0, 51, 0.14), transparent 70%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0.95, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1]
      }}
      style={{ perspective: '1200px' }}
      className="h-full"
    >
      <motion.article
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => onSelect(project)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect(project);
          }
        }}
        aria-label={`Open case study for ${project.title}`}
        className="group relative flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0e] transition-colors duration-300 hover:border-[#ff0033] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff0033]"
      >
        {/* Top Media Viewport with Sliding Red Design Overlay on Hover */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-950">
          {!imgFailed ? (
            <img
              src={project.image}
              alt={`${project.title} — ${project.subtitle}`}
              referrerPolicy="no-referrer"
              onError={() => setImgFailed(true)}
              className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-zinc-900 via-black to-[#33000a] p-6 text-center">
              <Sparkles className="mb-2 h-8 w-8 text-[#ff0033]" />
              <span className="font-display text-lg font-bold text-white">
                {project.title}
              </span>
            </div>
          )}

          {/* Permanent Measured Scrim for Contrast */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0b0e] via-black/35 to-transparent" />

          {/* Sliding Red Design Overlay on Hover (Requested Feature) */}
          <motion.div
            initial={false}
            animate={{
              y: isHovered ? '0%' : '102%',
              opacity: isHovered ? 1 : 0.9
            }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className=" absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-[#ff0033]/95 via-[#b80024]/90 to-black/75 p-6 backdrop-blur-[3px]"
          >
            <div className="flex items-center justify-between text-xs font-mono text-white/90">
              <span>{project.index} · ARCHITECTURE SPECS</span>
              <span>{project.year}</span>
            </div>

            <div className="my-auto space-y-2">
              <p className="font-mono text-xs tracking-wider text-white/80">
                VERIFIED OUTCOME
              </p>
              <p className="font-display text-2xl font-extrabold text-white">
                {project.outcomeMetric}
              </p>
              <p className="text-xs leading-relaxed text-white/90">
                {project.outcomeContext}
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-white/25 pt-3 text-xs font-semibold text-white">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex w-full items-center justify-between rounded-lg bg-black/40 px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-black/70"
                >
                  <span>Open {project.title} Live Website</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              ) : (
                <>
                  <span>Inspect Interactive Case Study</span>
                  <ArrowUpRight className="h-4 w-4" />
                </>
              )}
            </div>
          </motion.div>
        </div>

        {/* Card Body Content (3D Elevated Layer) */}
        <div
          style={{ transform: 'translateZ(28px)' }}
          className="relative z-10 flex flex-1 flex-col justify-between p-6"
        >
          <div>
            {/* Clean Unboxed Metadata with Typographic Separators */}
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span className="font-mono text-[#ff0033]">{project.index}</span>
              <span aria-hidden="true">·</span>
              <span>{project.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{project.year}</span>
            </div>

            <h3 className="mt-2.5 font-display text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-[#ff0033]">
              {project.title}
            </h3>

            <p className="mt-1 text-xs font-medium text-zinc-300">
              {project.subtitle}
            </p>

            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              {project.summary}
            </p>
          </div>

          <div className="mt-6 border-t border-white/10 pt-4">
            <p className="text-xs text-zinc-400">{project.stackText}</p>
            {project.liveUrl ? (
              <div className="mt-3 flex items-center justify-between gap-2">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#ff0033] px-4 py-2.5 text-xs font-semibold text-white shadow-[0_0_20px_rgba(255,0,51,0.5)] transition-all hover:bg-[#e6002e] hover:shadow-[0_0_28px_rgba(255,0,51,0.8)] whitespace-nowrap shrink-0"
                >
                  <span>Visit {project.title} Live</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(project);
                  }}
                  className="rounded-xl border border-white/15 bg-zinc-900 px-3 py-2.5 text-xs font-medium text-zinc-300 transition-colors hover:border-[#ff0033] hover:text-white whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Details
                </button>
              </div>
            ) : (
              <div className="mt-3 flex items-center justify-between text-xs font-semibold text-zinc-200 group-hover:text-white">
                <span>Explore Architecture & Preview</span>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-zinc-900 text-white transition-colors group-hover:border-[#ff0033] group-hover:bg-[#ff0033]">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Subtle 3D Specular Glare */}
        <motion.div
          style={{
            background: glareBackground
          }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      </motion.article>
    </motion.div>
  );
};

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [modalTab, setModalTab] = useState<'overview' | 'architecture' | 'demo'>('overview');

  const filteredProjects =
    selectedCategory === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openProjectModal = (project: ProjectItem) => {
    setModalTab('overview');
    setActiveProject(project);
  };

  return (
    <section
      id="projects"
      className="relative z-10 mx-auto max-w-[1280px] px-6 py-20 md:py-28"
    >
      {/* Header & Interactive Filter Controls */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
      >
        <div>
          <div className="mb-3 flex items-center gap-2 text-xs text-zinc-400">
            <span className="font-mono text-[#ff0033]">03</span>
            <span aria-hidden="true">·</span>
            <span>Selected Works & Case Studies</span>
          </div>
          <h2
            style={{ textWrap: 'balance' }}
            className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            3D Floating Project Showcase
          </h2>
        </div>

        {/* Interactive Filter Controls */}
        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="flex flex-wrap items-center gap-1.5 rounded-xl border border-white/10 bg-zinc-950/90 p-1.5"
        >
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'ai', label: 'AI SaaS' },
            { id: 'wellness', label: 'Wellness App' },
            { id: 'ecommerce', label: 'E-Commerce' },
            { id: 'islamic', label: 'Islamic App' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selectedCategory === tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`rounded-lg px-3.5 py-2 text-xs font-medium transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCategory === tab.id
                  ? 'bg-[#ff0033] text-white shadow-[0_0_20px_rgba(255,0,51,0.5)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Balanced 2x2 3D Floating Cards Grid for 4 Flagship Projects */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {filteredProjects.map((project, idx) => (
          <ProjectTiltCard
            key={project.id}
            project={project}
            index={idx}
            onSelect={openProjectModal}
          />
        ))}
      </div>

      {/* Fullscreen Lightbox Case Study Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActiveProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-[#ff0033]/50 bg-[#0a0a0d] p-6 shadow-[0_0_70px_-15px_rgba(255,0,51,0.45)] sm:p-8"
            >
              {/* Modal Top Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <span className="font-mono text-[#ff0033]">{activeProject.index}</span>
                    <span aria-hidden="true">·</span>
                    <span>{activeProject.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{activeProject.role}</span>
                  </div>
                  <h3 className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">
                    {activeProject.title} — {activeProject.subtitle}
                  </h3>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {activeProject.liveUrl && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-[#ff0033] px-4 py-2.5 text-xs font-semibold text-white shadow-[0_0_25px_rgba(255,0,51,0.6)] transition-all hover:bg-[#e6002e] whitespace-nowrap"
                    >
                      <span>Open Live Website</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => setActiveProject(null)}
                    aria-label="Close case study modal"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-zinc-900 text-zinc-300 transition-colors hover:border-[#ff0033] hover:bg-[#ff0033] hover:text-white cursor-pointer shrink-0"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Hero Image Banner or Live Embedded Storefront inside Modal */}
              {activeProject.liveUrl && modalTab === 'demo' ? (
                <div className="mt-6 overflow-hidden rounded-xl border border-[#ff0033]/40 bg-zinc-950">
                  <div className="flex items-center justify-between border-b border-white/10 bg-zinc-900/90 px-4 py-2.5 text-xs">
                    <span className="font-mono text-zinc-300">{activeProject.liveUrl}</span>
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-[#ff0033] hover:underline"
                    >
                      <span>Open Fullscreen Tab</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                  <iframe
                    src={activeProject.liveUrl}
                    title={`${activeProject.title} Live Preview`}
                    className="h-[420px] w-full bg-white"
                  />
                </div>
              ) : (
                <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-950">
                  <img
                    src={activeProject.image}
                    alt={activeProject.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <div className="absolute right-5 bottom-4 left-5 flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <p className="font-mono text-xs text-[#ff0033]">MEASURED IMPACT</p>
                      <p className="font-display text-2xl font-bold text-white">
                        {activeProject.outcomeMetric}
                      </p>
                    </div>
                    <p className="text-xs text-zinc-300">{activeProject.stackText}</p>
                  </div>
                </div>
              )}

              {/* Modal Interactive Sub-Navigation */}
              <div className="mt-6 flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
                <button
                  type="button"
                  onClick={() => setModalTab('overview')}
                  className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    modalTab === 'overview'
                      ? 'bg-[#ff0033] text-white'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white'
                  }`}
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>Executive Overview</span>
                </button>
                <button
                  type="button"
                  onClick={() => setModalTab('architecture')}
                  className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    modalTab === 'architecture'
                      ? 'bg-[#ff0033] text-white'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white'
                  }`}
                >
                  <Cpu className="h-3.5 w-3.5" />
                  <span>System Architecture</span>
                </button>
                <button
                  type="button"
                  onClick={() => setModalTab('demo')}
                  className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    modalTab === 'demo'
                      ? 'bg-[#ff0033] text-white'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white'
                  }`}
                >
                  <Layers className="h-3.5 w-3.5" />
                  <span>{activeProject.liveUrl ? 'Live Interactive Preview' : 'Performance Metrics'}</span>
                </button>
              </div>

              {/* Tab Content */}
              <div className="mt-6">
                {modalTab === 'overview' && (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="font-display text-lg font-semibold text-white">
                        Problem & Creative Direction
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                        {activeProject.challenge}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                        {activeProject.summary}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-display text-lg font-semibold text-white">
                        Key Capabilities Delivered
                      </h4>
                      <ul className="mt-3 space-y-2.5">
                        {activeProject.highlights.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-sm text-zinc-300"
                          >
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#ff0033]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {modalTab === 'architecture' && (
                  <div className="space-y-4">
                    <h4 className="font-display text-lg font-semibold text-white">
                      Full-Stack Engineering & Motion Pipeline
                    </h4>
                    <p className="text-sm leading-relaxed text-zinc-300">
                      {activeProject.architecture}
                    </p>
                    <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-3">
                      <div className="rounded-xl border border-white/10 bg-zinc-950 p-4">
                        <p className="text-xs text-zinc-400">Primary Stack</p>
                        <p className="mt-1 text-sm font-semibold text-white">
                          {activeProject.stackText}
                        </p>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-zinc-950 p-4">
                        <p className="text-xs text-zinc-400">Role</p>
                        <p className="mt-1 text-sm font-semibold text-white">
                          {activeProject.role}
                        </p>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-zinc-950 p-4">
                        <p className="text-xs text-zinc-400">Release Year</p>
                        <p className="mt-1 font-mono text-sm font-semibold text-[#ff0033]">
                          {activeProject.year}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {modalTab === 'demo' && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border border-white/10 bg-zinc-950 p-5">
                      <p className="text-xs text-zinc-400">Pipeline Latency</p>
                      <p className="mt-1 font-mono text-xl font-bold text-white tabular-nums">
                        {activeProject.livePreviewSpecs.latency}
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-zinc-950 p-5">
                      <p className="text-xs text-zinc-400">Motion Frame Rate</p>
                      <p className="mt-1 font-mono text-xl font-bold text-[#ff0033] tabular-nums">
                        {activeProject.livePreviewSpecs.fps}
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-zinc-950 p-5">
                      <p className="text-xs text-zinc-400">Output Fidelity</p>
                      <p className="mt-1 font-mono text-xl font-bold text-white tabular-nums">
                        {activeProject.livePreviewSpecs.resolution}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
