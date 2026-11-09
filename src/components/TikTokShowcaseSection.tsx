import React, { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform
} from 'motion/react';
import {
  Bookmark,
  Check,
  Disc,
  Heart,
  MessageCircle,
  Music2,
  Pause,
  Play,
  Plus,
  Send,
  Share2,
  Sparkles,
  Volume2,
  VolumeX,
  X
} from 'lucide-react';
import { HERO_IMAGE, TIKTOK_REELS, TikTokReel } from '../data/portfolioData';

export const TikTokShowcaseSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Scroll-driven 3D iPhone rotation into full view
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 90%', 'center 52%']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001
  });

  const rotateY = useTransform(smoothProgress, [0, 1], [-36, 0]);
  const rotateX = useTransform(smoothProgress, [0, 1], [24, 0]);
  const rotateZ = useTransform(smoothProgress, [0, 1], [-7, 0]);
  const phoneScale = useTransform(smoothProgress, [0, 1], [0.86, 1]);
  const phoneTranslateY = useTransform(smoothProgress, [0, 1], [48, 0]);

  // Interactive phone state
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [likedReels, setLikedReels] = useState<Record<string, boolean>>({});
  const [savedReels, setSavedReels] = useState<Record<string, boolean>>({});
  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [customComments, setCustomComments] = useState<
    Record<string, { user: string; text: string; time: string }[]>
  >({});
  const [heartBursts, setHeartBursts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [shareCopied, setShareCopied] = useState(false);

  const currentReel: TikTokReel = TIKTOK_REELS[activeIndex];

  // Auto-scrolling TikTok feed timer
  useEffect(() => {
    if (!isAutoScrolling || showComments) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TIKTOK_REELS.length);
    }, 5200);

    return () => clearInterval(timer);
  }, [isAutoScrolling, showComments]);

  const handleToggleLike = (reelId: string) => {
    setLikedReels((prev) => ({
      ...prev,
      [reelId]: !prev[reelId]
    }));

    // Spawn floating crimson heart burst inside phone
    const burstId = Date.now() + Math.random();
    setHeartBursts((prev) => [
      ...prev,
      {
        id: burstId,
        x: Math.floor(Math.random() * 120) - 60,
        y: Math.floor(Math.random() * 40) - 20
      }
    ]);
    setTimeout(() => {
      setHeartBursts((prev) => prev.filter((b) => b.id !== burstId));
    }, 950);
  };

  const handleToggleSave = (reelId: string) => {
    setSavedReels((prev) => ({
      ...prev,
      [reelId]: !prev[reelId]
    }));
  };

  const handleShareReel = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('https://www.tiktok.com/@abubakericloud777').catch(() => {});
    }
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = commentInput.trim();
    if (!trimmed) return;
    const reelId = currentReel.id;
    setCustomComments((prev) => ({
      ...prev,
      [reelId]: [
        { user: '@visitor_studio', text: trimmed, time: 'Just now' },
        ...(prev[reelId] || [])
      ]
    }));
    setCommentInput('');
  };

  const allCommentsForCurrent = [
    ...(customComments[currentReel.id] || []),
    ...currentReel.commentList
  ];

  const isLiked = !!likedReels[currentReel.id];
  const isSaved = !!savedReels[currentReel.id];
  const displayLikes = currentReel.likes + (isLiked ? 1 : 0);

  return (
    <section
      id="showreel"
      ref={sectionRef}
      className="relative z-10 mx-auto max-w-[1280px] px-6 py-24 md:py-32"
    >
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-12">
        {/* Left Column: Creator Narrative, Handle & Interactive Reel Controls */}
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6"
        >
          <div className="mb-3 flex items-center gap-2 text-xs text-zinc-400">
            <span className="font-mono text-[#ff0033]">04</span>
            <span aria-hidden="true">·</span>
            <span>TikTok & Social Showcase</span>
            <span aria-hidden="true">·</span>
            <span>Motion Showreel</span>
          </div>

          <h2
            style={{ textWrap: 'balance' }}
            className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[42px] lg:leading-[1.1]"
          >
            Meet Abubakar{' '}
            <span className="block font-mono text-xl font-semibold text-[#ff0033] sm:text-2xl mt-2">
              Meet Abubakar
            </span>
          </h2>

          <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-zinc-300">
            Scroll to watch the 3D iPhone lock into perspective. Inside the live viewport,
            explore my auto-scrolling vertical feed blending dark-mode code sessions, speed-ramp
            visual edits, and AI motion design.
          </p>

          {/* Creator Performance Metrics (Clean Unboxed Typography) */}
          <div className="mt-8 grid grid-cols-3 gap-4 border-y border-white/10 py-5">
            <div>
              <p className="font-mono text-2xl font-bold text-white tabular-nums">
                464.5K
              </p>
              <p className="mt-0.5 text-xs text-zinc-400">Combined Reel Views</p>
            </div>
            <div>
              <p className="font-mono text-2xl font-bold text-[#ff0033] tabular-nums">
                82.4K
              </p>
              <p className="mt-0.5 text-xs text-zinc-400">Total Likes</p>
            </div>
            <div>
              <p className="font-mono text-2xl font-bold text-white tabular-nums">
                100%
              </p>
              <p className="mt-0.5 text-xs text-zinc-400">Custom Color & Sound</p>
            </div>
          </div>

          {/* Interactive Reel Selector Cards */}
          <div className="mt-8 space-y-3">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Select Active Reel in Phone</span>
              <button
                type="button"
                onClick={() => setIsAutoScrolling((prev) => !prev)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-zinc-900/90 px-3 py-1.5 font-mono text-xs text-zinc-200 transition-colors hover:border-[#ff0033] hover:text-white cursor-pointer whitespace-nowrap shrink-0"
              >
                {isAutoScrolling ? (
                  <>
                    <Pause className="h-3 w-3 text-[#ff0033]" />
                    <span>Auto-Scroll: ON</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3 w-3 text-[#ff0033]" />
                    <span>Auto-Scroll: PAUSED</span>
                  </>
                )}
              </button>
            </div>

            {TIKTOK_REELS.map((reel, idx) => {
              const isCurrent = idx === activeIndex;
              return (
                <button
                  key={reel.id}
                  type="button"
                  onClick={() => {
                    setActiveIndex(idx);
                    setShowComments(false);
                  }}
                  className={`flex w-full items-center justify-between gap-4 rounded-xl border p-4 text-left transition-all duration-200 cursor-pointer ${
                    isCurrent
                      ? 'border-[#ff0033] bg-[#ff0033]/10 shadow-[0_0_25px_-5px_rgba(255,0,51,0.35)]'
                      : 'border-white/10 bg-zinc-950/70 hover:border-white/25 hover:bg-zinc-900/70'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <span className="font-mono text-[#ff0033]">0{idx + 1}</span>
                      <span aria-hidden="true">·</span>
                      <span>{reel.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">{reel.duration}</span>
                    </div>
                    <p className="mt-1 truncate font-display text-sm font-semibold text-white sm:text-base">
                      {reel.title}
                    </p>
                  </div>
                  <div className="text-right font-mono text-xs text-zinc-300 tabular-nums shrink-0">
                    <span className="text-[#ff0033]">{reel.views}</span> views
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Right Column: 3D Animated iPhone Mockup Floating & Rotating on Scroll */}
        <div className="flex items-center justify-center lg:col-span-6">
          <div style={{ perspective: '1600px' }} className="relative flex items-center justify-center py-4">
            {/* Ambient Crimson Halo Behind 3D Phone */}
            <div
              className="pointer-events-none absolute h-[520px] w-[320px] rounded-full opacity-45 blur-[110px]"
              style={{
                background:
                  'radial-gradient(circle, #ff0033 0%, rgba(160, 0, 32, 0.35) 55%, transparent 100%)'
              }}
            />

            {/* Floating 3D iPhone Chassis */}
            <motion.div
              style={{
                rotateY,
                rotateX,
                rotateZ,
                scale: phoneScale,
                y: phoneTranslateY,
                transformStyle: 'preserve-3d'
              }}
              animate={{
                y: [0, -10, 0]
              }}
              transition={{
                y: {
                  duration: 5.5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }
              }}
              onMouseEnter={() => setIsAutoScrolling(false)}
              onMouseLeave={() => setIsAutoScrolling(true)}
              className="relative h-[650px] w-[326px] rounded-[50px] border-[6px] border-zinc-800 bg-[#070709] p-2.5 shadow-[0_30px_90px_-15px_rgba(255,0,51,0.45),0_0_0_1px_rgba(255,0,51,0.35),inset_0_0_18px_rgba(255,255,255,0.08)] sm:h-[680px] sm:w-[342px]"
            >
              {/* Metallic Hardware Side Buttons */}
              <div className="pointer-events-none absolute top-28 -left-[8px] h-8 w-[3px] rounded-l-md bg-zinc-700" />
              <div className="pointer-events-none absolute top-40 -left-[8px] h-14 w-[3px] rounded-l-md bg-zinc-700" />
              <div className="pointer-events-none absolute top-58 -left-[8px] h-14 w-[3px] rounded-l-md bg-zinc-700" />
              <div className="pointer-events-none absolute top-44 -right-[8px] h-20 w-[3px] rounded-r-md bg-[#ff0033]/80 shadow-[0_0_10px_#ff0033]" />

              {/* Inner OLED Screen Viewport */}
              <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[40px] border border-white/10 bg-black">
                {/* Dynamic Island Notch with Live Audio Visualizer */}
                <div className="relative z-30 mx-auto mt-2.5 flex h-7 w-32 items-center justify-between rounded-full border border-white/10 bg-black/95 px-3 shadow-md">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#ff0033]" />
                    <span className="font-mono text-[10px] font-semibold tracking-wider text-zinc-200">
                      REC
                    </span>
                  </div>
                  {/* Animated Equalizer Bars */}
                  <div className="flex items-end gap-[2px] h-3">
                    {[0.6, 1, 0.4, 0.85, 0.55].map((h, i) => (
                      <motion.span
                        key={i}
                        animate={
                          !isMuted
                            ? { height: ['25%', `${h * 100}%`, '35%'] }
                            : { height: '20%' }
                        }
                        transition={{
                          duration: 0.55 + i * 0.1,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                        className="w-[2px] rounded-full bg-[#ff0033]"
                      />
                    ))}
                  </div>
                </div>

                {/* Top TikTok Feed Navigation Overlay */}
                <div className="relative z-20 flex items-center justify-between px-4 pt-2 text-xs font-medium text-white">
                  <span className="rounded bg-[#ff0033] px-1.5 py-0.5 font-mono text-[10px] font-bold tracking-wider text-white shadow-[0_0_12px_#ff0033]">
                    LIVE
                  </span>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-zinc-400">Following</span>
                    <span className="relative font-semibold text-white">
                      For You
                      <span className="absolute right-1 -bottom-1 left-1 h-[2px] rounded-full bg-[#ff0033]" />
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMuted((m) => !m)}
                    aria-label={isMuted ? 'Unmute reel audio' : 'Mute reel audio'}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-[#ff0033]/80 cursor-pointer"
                  >
                    {isMuted ? (
                      <VolumeX className="h-3.5 w-3.5" />
                    ) : (
                      <Volume2 className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>

                {/* Auto-Scrolling Vertical Video Reel Slide */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentReel.id}
                    initial={{ opacity: 0, y: 80, scale: 1.03 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -80, scale: 0.97 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    onDoubleClick={() => handleToggleLike(currentReel.id)}
                    className="absolute inset-0 z-10 select-none"
                  >
                    <img
                      src={currentReel.image}
                      alt={currentReel.title}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover object-center"
                    />

                    {/* Dynamic Ambient Color Scrim */}
                    <div
                      className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${currentReel.accentGradient}`}
                    />

                    {/* Animated Scanning Grid / Motion Effect Overlay */}
                    <motion.div
                      animate={{ opacity: [0.12, 0.25, 0.12] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="pointer-events-none absolute inset-0"
                      style={{
                        backgroundImage:
                          'radial-gradient(circle at 50% 40%, rgba(255, 0, 51, 0.22), transparent 65%)'
                      }}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Floating Heart Bursts when Liked */}
                <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
                  <AnimatePresence>
                    {heartBursts.map((burst) => (
                      <motion.div
                        key={burst.id}
                        initial={{ opacity: 1, scale: 0.4, x: burst.x, y: burst.y }}
                        animate={{ opacity: 0, scale: 1.75, y: burst.y - 90 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="absolute"
                      >
                        <Heart className="h-14 w-14 fill-[#ff0033] text-[#ff0033] drop-shadow-[0_0_20px_#ff0033]" />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Bottom-Right Interaction Column & Bottom-Left Creator Info */}
                <div className="relative z-20 mt-auto flex items-end justify-between gap-2 px-3.5 pb-5">
                  {/* Left: Meet Abubakar, Caption & Audio */}
                  <div className="max-w-[215px] space-y-2">
                    <div className="inline-flex items-center gap-1.5 rounded-md border border-[#ff0033]/50 bg-black/65 px-2 py-0.5 backdrop-blur-md">
                      <Sparkles className="h-3 w-3 text-[#ff0033]" />
                      <span className="font-mono text-[10px] font-semibold text-white">
                        Meet Abubakar
                      </span>
                    </div>

                    <h3 className="font-display text-sm font-bold text-white drop-shadow">
                      Meet Abubakar
                    </h3>

                    <p className="line-clamp-3 text-[11px] leading-snug text-zinc-200">
                      {currentReel.caption}
                    </p>

                    {/* Scrolling Audio Ticker */}
                    <div className="flex items-center gap-1.5 overflow-hidden pt-1 text-[11px] text-zinc-200">
                      <Music2 className="h-3 w-3 shrink-0 text-[#ff0033]" />
                      <div className="overflow-hidden whitespace-nowrap">
                        <motion.p
                          animate={{ x: ['0%', '-50%'] }}
                          transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
                          className="inline-block font-mono text-[10px]"
                        >
                          {currentReel.audioTrack} &nbsp; • &nbsp; {currentReel.audioTrack}
                        </motion.p>
                      </div>
                    </div>
                  </div>

                  {/* Right: TikTok Action Rail */}
                  <div className="flex flex-col items-center gap-4">
                    {/* Creator Avatar + Follow Toggle */}
                    <div className="relative mb-1">
                      <div className="h-11 w-11 overflow-hidden rounded-full border-2 border-[#ff0033] bg-zinc-900 shadow-[0_0_15px_rgba(255,0,51,0.6)]">
                        <img
                          src={HERO_IMAGE}
                          alt="Meet Abubakar"
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover object-[center_28%]"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsFollowing((f) => !f)}
                        aria-label={isFollowing ? 'Following Abubakar' : 'Follow Abubakar'}
                        className={`-bottom-2 left-1/2 -translate-x-1/2 absolute flex h-5 w-5 items-center justify-center rounded-full text-white shadow transition-colors cursor-pointer ${
                          isFollowing ? 'bg-emerald-500' : 'bg-[#ff0033]'
                        }`}
                      >
                        {isFollowing ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <Plus className="h-3 w-3" />
                        )}
                      </button>
                    </div>

                    {/* Like Button */}
                    <button
                      type="button"
                      onClick={() => handleToggleLike(currentReel.id)}
                      className="flex flex-col items-center gap-1 text-white cursor-pointer group"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 backdrop-blur-md transition-transform group-active:scale-125">
                        <Heart
                          className={`h-5 w-5 transition-colors ${
                            isLiked
                              ? 'fill-[#ff0033] text-[#ff0033] drop-shadow-[0_0_10px_#ff0033]'
                              : 'text-white group-hover:text-[#ff0033]'
                          }`}
                        />
                      </span>
                      <span className="font-mono text-[10px] font-semibold tabular-nums">
                        {(displayLikes / 1000).toFixed(1)}K
                      </span>
                    </button>

                    {/* Comments Button */}
                    <button
                      type="button"
                      onClick={() => setShowComments(true)}
                      className="flex flex-col items-center gap-1 text-white cursor-pointer group"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 backdrop-blur-md transition-colors group-hover:bg-[#ff0033]/30">
                        <MessageCircle className="h-5 w-5 text-white" />
                      </span>
                      <span className="font-mono text-[10px] font-semibold tabular-nums">
                        {currentReel.comments + (customComments[currentReel.id]?.length || 0)}
                      </span>
                    </button>

                    {/* Bookmark Button */}
                    <button
                      type="button"
                      onClick={() => handleToggleSave(currentReel.id)}
                      className="flex flex-col items-center gap-1 text-white cursor-pointer group"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 backdrop-blur-md">
                        <Bookmark
                          className={`h-5 w-5 ${
                            isSaved ? 'fill-[#ff0033] text-[#ff0033]' : 'text-white'
                          }`}
                        />
                      </span>
                      <span className="font-mono text-[10px] font-semibold">
                        {isSaved ? 'Saved' : 'Save'}
                      </span>
                    </button>

                    {/* Share Button */}
                    <button
                      type="button"
                      onClick={handleShareReel}
                      className="flex flex-col items-center gap-1 text-white cursor-pointer group"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 backdrop-blur-md">
                        <Share2 className="h-4 w-4 text-white" />
                      </span>
                      <span className="font-mono text-[10px] font-semibold">
                        {shareCopied ? 'Copied!' : currentReel.shares}
                      </span>
                    </button>

                    {/* Spinning Audio Vinyl Disc */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                      className="mt-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-zinc-700 bg-zinc-950 shadow-[0_0_12px_rgba(255,0,51,0.5)]"
                    >
                      <Disc className="h-5 w-5 text-[#ff0033]" />
                    </motion.div>
                  </div>
                </div>

                {/* Interactive In-Phone Comments Sheet Drawer */}
                <AnimatePresence>
                  {showComments && (
                    <motion.div
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      exit={{ y: '100%' }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-x-0 bottom-0 z-40 flex h-[62%] flex-col rounded-t-3xl border-t border-[#ff0033]/50 bg-zinc-950/95 p-4 backdrop-blur-xl"
                    >
                      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                        <span className="font-display text-xs font-bold text-white">
                          {allCommentsForCurrent.length} Comments
                        </span>
                        <button
                          type="button"
                          onClick={() => setShowComments(false)}
                          aria-label="Close comments"
                          className="rounded-full p-1 text-zinc-400 hover:bg-white/10 hover:text-white cursor-pointer"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="my-3 flex-1 space-y-3 overflow-y-auto pr-1">
                        {allCommentsForCurrent.map((c, idx) => (
                          <div key={idx} className="text-xs">
                            <div className="flex items-center justify-between text-[11px] text-zinc-400">
                              <span className="font-semibold text-zinc-200">{c.user}</span>
                              <span>{c.time}</span>
                            </div>
                            <p className="mt-0.5 text-zinc-300">{c.text}</p>
                          </div>
                        ))}
                      </div>

                      <form onSubmit={handleAddComment} className="flex items-center gap-2 pt-1">
                        <input
                          type="text"
                          value={commentInput}
                          onChange={(e) => setCommentInput(e.target.value)}
                          placeholder="Add a comment..."
                          className="flex-1 rounded-full border border-white/15 bg-zinc-900 px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:border-[#ff0033] focus:outline-none"
                        />
                        <button
                          type="submit"
                          aria-label="Post comment"
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ff0033] text-white hover:bg-[#e6002e] cursor-pointer shrink-0"
                        >
                          <Send className="h-3.5 w-3.5" />
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Auto-Scroll Timeline Progress Indicator at Phone Bottom */}
                <div className="relative z-30 h-1 w-full bg-zinc-900">
                  <motion.div
                    key={`${currentReel.id}-${isAutoScrolling}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isAutoScrolling ? 1 : 0.45 }}
                    transition={{
                      duration: isAutoScrolling ? 5.2 : 0.3,
                      ease: 'linear'
                    }}
                    style={{ transformOrigin: 'left' }}
                    className="h-full w-full bg-[#ff0033] shadow-[0_0_8px_#ff0033]"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
