import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import {
  ArrowUpRight,
  Check,
  Copy,
  Instagram,
  Mail,
  MessageSquare,
  Send
} from 'lucide-react';

interface MagneticWrapProps {
  children: React.ReactNode;
  strength?: number;
}

const MagneticWrap: React.FC<MagneticWrapProps> = ({ children, strength = 0.34 }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 220, damping: 16, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 220, damping: 16, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

export const ContactSection: React.FC = () => {
  const [copiedField, setCopiedField] = useState<'whatsapp' | 'email' | null>(null);
  const [senderName, setSenderName] = useState('');
  const [projectScope, setProjectScope] = useState('AI Web Application');
  const [projectMessage, setProjectMessage] = useState('');

  const handleCopy = (value: string, field: 'whatsapp' | 'email', e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(value).catch(() => {});
    }
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const encodedBrief = encodeURIComponent(
    `Hi Abubakar, I'm ${senderName || 'a prospective client'} interested in collaborating on a ${projectScope} project.\n\nDetails: ${
      projectMessage || 'Let us schedule a quick call to discuss scope and timeline.'
    }`
  );

  const whatsappDirectHref = `https://wa.me/923095704438?text=${encodedBrief}`;
  const mailtoDirectHref = `mailto:abubakarofficial47@gmail.com?subject=${encodeURIComponent(
    `Project Inquiry: ${projectScope} — ${senderName || 'Portfolio Visitor'}`
  )}&body=${encodedBrief}`;

  return (
    <section
      id="contact"
      className="relative z-10 mx-auto max-w-[1280px] px-6 pt-20 pb-28 md:pt-28 md:pb-36"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="mb-14 flex flex-col justify-between gap-4 md:flex-row md:items-end"
      >
        <div>
          <div className="mb-3 flex items-center gap-2 text-xs text-zinc-400">
            <span className="font-mono text-[#ff0033]">05</span>
            <span aria-hidden="true">·</span>
            <span>Contact & Connect</span>
          </div>
          <h2
            style={{ textWrap: 'balance' }}
            className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Initiate Your Next Flagship Build
          </h2>
        </div>
        <p className="max-w-md text-sm text-zinc-400">
          Hover over the magnetic social channels below—each card tracks your cursor before
          snapping back with elastic spring physics.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Left Column: 3 Magnetic Social Buttons (WhatsApp, Instagram, Email) */}
        <div className="flex flex-col justify-between gap-5 lg:col-span-7">
          {/* 1. WhatsApp Button: Connect to "03095704438" with a glowing green/red pulse */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <MagneticWrap strength={0.28}>
              <a
                href="https://wa.me/923095704438"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl border border-white/15 bg-zinc-950/85 p-6 backdrop-blur-xl transition-all duration-300 hover:border-emerald-400/80 hover:shadow-[0_0_45px_-5px_rgba(16,185,129,0.45),0_0_25px_-5px_rgba(255,0,51,0.45)]"
              >
                {/* Dual Glowing Green/Red Ambient Pulse */}
                <motion.div
                  animate={{
                    opacity: [0.18, 0.42, 0.18],
                    scale: [0.98, 1.04, 0.98]
                  }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="pointer-events-none absolute -top-12 -left-12 h-44 w-44 rounded-full blur-3xl"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(16, 185, 129, 0.55) 0%, rgba(255, 0, 51, 0.45) 65%, transparent 100%)'
                  }}
                />

                <div className="relative z-10 flex items-center gap-4 min-w-0">
                  <div className="relative flex h-13 w-13 shrink-0 items-center justify-center rounded-xl border border-emerald-500/40 bg-gradient-to-br from-emerald-500/20 via-zinc-900 to-[#ff0033]/25 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.35)]">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <span className="font-semibold text-emerald-400">WhatsApp Direct</span>
                      <span aria-hidden="true">·</span>
                      <span>Instant Response</span>
                    </div>
                    <p className="mt-1 font-mono text-xl font-bold tracking-tight text-white tabular-nums sm:text-2xl">
                      03095704438
                    </p>
                  </div>
                </div>

                <div className="relative z-10 flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => handleCopy('03095704438', 'whatsapp', e)}
                    aria-label="Copy WhatsApp phone number"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-zinc-900/90 px-3 py-2 text-xs font-medium text-zinc-200 transition-colors hover:border-emerald-400 hover:text-white cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {copiedField === 'whatsapp' ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-emerald-500">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
              </a>
            </MagneticWrap>
          </motion.div>

          {/* 2. Instagram Button: Exact URL */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <MagneticWrap strength={0.28}>
              <a
                href="https://www.instagram.com/abu.baker_777?psln=MXB3MTliOWtocGxrbg%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl border border-white/15 bg-zinc-950/85 p-6 backdrop-blur-xl transition-all duration-300 hover:border-[#ff0033] hover:shadow-[0_0_45px_-8px_rgba(255,0,51,0.5)]"
              >
                <div className="relative z-10 flex items-center gap-4 min-w-0">
                  <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl border border-[#ff0033]/40 bg-[#ff0033]/15 text-[#ff0033] shadow-[0_0_20px_rgba(255,0,51,0.3)]">
                    <Instagram className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <span className="font-semibold text-[#ff0033]">Instagram Portfolio</span>
                      <span aria-hidden="true">·</span>
                      <span>Visual Reels & Behind the Scenes</span>
                    </div>
                    <p className="mt-1 truncate font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                      @abu.baker_777
                    </p>
                  </div>
                </div>

                <div className="relative z-10 flex items-center gap-3 shrink-0">
                  <span className="hidden text-xs font-medium text-zinc-400 group-hover:text-white sm:inline whitespace-nowrap">
                    Open Profile
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-[#ff0033]">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
              </a>
            </MagneticWrap>
          </motion.div>

          {/* 3. Snapchat Button: https://snapchat.com/t/uMJxH7R6 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <MagneticWrap strength={0.28}>
              <a
                href="https://snapchat.com/t/uMJxH7R6"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl border border-white/15 bg-zinc-950/85 p-6 backdrop-blur-xl transition-all duration-300 hover:border-yellow-400/80 hover:shadow-[0_0_45px_-8px_rgba(250,204,21,0.45),0_0_25px_-5px_rgba(255,0,51,0.35)]"
              >
                <div className="relative z-10 flex items-center gap-4 min-w-0">
                  <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl border border-yellow-400/40 bg-yellow-400/15 text-yellow-300 shadow-[0_0_20px_rgba(250,204,21,0.3)]">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6"
                      aria-hidden="true"
                    >
                      <path d="M12.166 3c-2.66 0-4.969 1.637-5.588 4.24-.222.933-.125 2.028-.048 2.898.027.303.052.587.052.815 0 .353-.295.552-.644.677-.428.153-.988.203-1.351.448-.282.19-.414.487-.352.801.084.428.574.732 1.196.953.153.054.682.226.824.492.092.172.049.423-.095.774-.54 1.318-1.696 2.382-3.093 2.846-.351.116-.562.416-.527.748.037.35.335.626.794.756.697.197 1.448.295 2.095.487.386.115.614.33.864.622.467.545 1.12 1.153 2.415 1.153.758 0 1.425-.225 2.099-.452.426-.143.84-.283 1.298-.283.458 0 .872.14 1.298.283.674.227 1.341.452 2.099.452 1.295 0 1.948-.608 2.415-1.153.25-.292.478-.507.864-.622.647-.192 1.398-.29 2.095-.487.459-.13.757-.406.794-.756.035-.332-.176-.632-.527-.748-1.397-.464-2.553-1.528-3.093-2.846-.144-.351-.187-.602-.095-.774.142-.266.671-.438.824-.492.622-.221 1.112-.525 1.196-.953.062-.314-.07-.611-.352-.801-.363-.245-.923-.295-1.351-.448-.349-.125-.644-.324-.644-.677 0-.228.025-.512.052-.815.077-.87.174-1.965-.048-2.898C17.135 4.637 14.826 3 12.166 3z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <span className="font-semibold text-yellow-300">Snapchat Connect</span>
                      <span aria-hidden="true">·</span>
                      <span>Daily Stories & Direct Snap</span>
                    </div>
                    <p className="mt-1 truncate font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                      Add on Snapchat
                    </p>
                  </div>
                </div>

                <div className="relative z-10 flex items-center gap-3 shrink-0">
                  <span className="hidden text-xs font-medium text-zinc-400 group-hover:text-white sm:inline whitespace-nowrap">
                    Connect Now
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-yellow-400 group-hover:text-black">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
              </a>
            </MagneticWrap>
          </motion.div>

          {/* 4. Email Button: abubakarofficial47@gmail.com */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <MagneticWrap strength={0.28}>
              <a
                href="mailto:abubakarofficial47@gmail.com"
                className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl border border-white/15 bg-zinc-950/85 p-6 backdrop-blur-xl transition-all duration-300 hover:border-[#ff0033] hover:shadow-[0_0_45px_-8px_rgba(255,0,51,0.5)]"
              >
                <div className="relative z-10 flex items-center gap-4 min-w-0">
                  <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl border border-[#ff0033]/40 bg-[#ff0033]/15 text-[#ff0033] shadow-[0_0_20px_rgba(255,0,51,0.3)]">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <span className="font-semibold text-[#ff0033]">Official Email</span>
                      <span aria-hidden="true">·</span>
                      <span>Project Inquiries & Contracts</span>
                    </div>
                    <p className="mt-1 truncate font-mono text-base font-bold tracking-tight text-white sm:text-xl">
                      abubakarofficial47@gmail.com
                    </p>
                  </div>
                </div>

                <div className="relative z-10 flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => handleCopy('abubakarofficial47@gmail.com', 'email', e)}
                    aria-label="Copy Email address"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-zinc-900/90 px-3 py-2 text-xs font-medium text-zinc-200 transition-colors hover:border-[#ff0033] hover:text-white cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {copiedField === 'email' ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#ff0033]" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-[#ff0033]">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
              </a>
            </MagneticWrap>
          </motion.div>
        </div>

        {/* Right Column: Interactive Quick Project Dispatcher */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-between rounded-2xl border border-white/10 bg-zinc-950/80 p-7 backdrop-blur-xl lg:col-span-5"
        >
          <div>
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span>Direct Brief Composer</span>
              <span aria-hidden="true">·</span>
              <span>Zero Latency</span>
            </div>
            <h3 className="mt-2 font-display text-2xl font-bold text-white">
              Configure Collaboration Scope
            </h3>

            <div className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="visitor-name"
                  className="block text-xs font-medium text-zinc-300"
                >
                  Your Name or Studio
                </label>
                <input
                  id="visitor-name"
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g., Tariq Vance / Apex Labs"
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-zinc-900/90 px-4 py-2.5 text-sm text-white placeholder-zinc-500 transition-colors focus:border-[#ff0033] focus:outline-none"
                />
              </div>

              <div>
                <span className="block text-xs font-medium text-zinc-300">
                  Primary Discipline Needed
                </span>
                <div className="mt-1.5 grid grid-cols-3 gap-2">
                  {[
                    'AI Web App',
                    '3D UI Design',
                    'Video Editing'
                  ].map((scope) => (
                    <button
                      key={scope}
                      type="button"
                      onClick={() => setProjectScope(scope)}
                      className={`rounded-lg border px-2.5 py-2 text-xs font-medium transition-all cursor-pointer whitespace-nowrap truncate ${
                        projectScope === scope
                          ? 'border-[#ff0033] bg-[#ff0033]/20 text-white'
                          : 'border-white/10 bg-zinc-900/70 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {scope}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="visitor-brief"
                  className="block text-xs font-medium text-zinc-300"
                >
                  Project Vision & Timeline
                </label>
                <textarea
                  id="visitor-brief"
                  rows={3}
                  value={projectMessage}
                  onChange={(e) => setProjectMessage(e.target.value)}
                  placeholder="Describe your product goals, target launch window, or creative deliverables..."
                  className="mt-1.5 w-full resize-none rounded-xl border border-white/10 bg-zinc-900/90 px-4 py-2.5 text-sm text-white placeholder-zinc-500 transition-colors focus:border-[#ff0033] focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 pt-2 sm:flex-row">
            <a
              href={whatsappDirectHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#ff0033] px-4 py-3 text-xs font-semibold text-white shadow-[0_0_25px_-5px_rgba(255,0,51,0.65)] transition-all hover:bg-[#e6002e] whitespace-nowrap shrink-0"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Send Brief via WhatsApp</span>
            </a>

            <a
              href={mailtoDirectHref}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-zinc-900 px-4 py-3 text-xs font-semibold text-zinc-200 transition-colors hover:border-[#ff0033] hover:text-white whitespace-nowrap shrink-0"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Send via Email</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
