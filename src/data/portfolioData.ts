import abubakarAiImg from '../assets/images/project_abubakar_ai_1794245670051.jpg';
import sereneMindImg from '../assets/images/project_serene_mind_1794245671569.jpg';
import binteHawaImg from '../assets/images/project_binte_hawa_1794247617930.jpg';
import holyQuranImg from '../assets/images/project_holy_quran_abubakar_1794248001950.jpg';

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: 'ai' | 'wellness' | 'ecommerce' | 'islamic';
  categoryLabel: string;
  year: string;
  role: string;
  image: string;
  liveUrl?: string;
  summary: string;
  challenge: string;
  architecture: string;
  outcomeMetric: string;
  outcomeContext: string;
  stackText: string;
  highlights: string[];
  livePreviewSpecs: {
    latency: string;
    fps: string;
    resolution: string;
  };
}

export interface TikTokReel {
  id: string;
  title: string;
  caption: string;
  audioTrack: string;
  views: string;
  likes: number;
  comments: number;
  shares: string;
  duration: string;
  category: string;
  image: string;
  accentGradient: string;
  commentList: {
    user: string;
    text: string;
    time: string;
  }[];
}

export const HERO_IMAGE = '/assets/aistudio/IMG_3671_939b8612.jpeg';
export const TIKTOK_BG_IMAGE = '/assets/aistudio/IMG_3671_939b8612.jpeg';

export const PROJECTS: ProjectItem[] = [
  {
    id: 'abubakar-ai',
    index: '01',
    title: 'Abubakar.ai',
    subtitle: 'AI SaaS Platform with Neural Media Generation',
    category: 'ai',
    categoryLabel: 'AI SaaS Platform',
    year: '2026',
    role: 'Lead AI Engineer & Product Designer',
    image: abubakarAiImg,
    summary:
      'Next-generation creative studio uniting multi-modal prompt orchestration, real-time frame interpolation, and browser-based neural audio-visual synthesis.',
    challenge:
      'Creators struggled with fragmented workflows across separate LLM tools, voice synthesizers, and non-linear video editors that lacked real-time timeline synchronization.',
    architecture:
      'Built on a streaming React 19 + Next.js App Router architecture with WebGL shader previews, low-latency server-sent generation pipelines, and frame-accurate timeline scrubbing.',
    outcomeMetric: '3.8x Faster Render Pipeline',
    outcomeContext: 'Reduced concept-to-final-cut turnaround across 1,400+ generated studio sequences',
    stackText: 'Next.js · TypeScript · WebGL · Gemini API · Tailwind CSS',
    highlights: [
      'Node-based neural video & keyframe prompt chaining',
      'Real-time waveform lip-sync and acoustic stem mastering',
      'Zero-latency GPU canvas preview with LUT color grading'
    ],
    livePreviewSpecs: {
      latency: '42ms frame sync',
      fps: '60 FPS timeline',
      resolution: '4K HDR export'
    }
  },
  {
    id: 'serene-mind',
    index: '02',
    title: 'Serene Mind',
    subtitle: 'Mental Wellness Web App',
    category: 'wellness',
    categoryLabel: 'Mental Wellness App',
    year: '2026',
    role: 'Full-Stack Developer & UI/UX Designer',
    image: sereneMindImg,
    liveUrl: 'https://serene-mind-9gun.vercel.app/',
    summary:
      'An atmospheric cognitive recovery and mindfulness sanctuary featuring adaptive breathing cadences, generative spatial soundscapes, and encrypted reflective journaling.',
    challenge:
      'Most wellness applications overwhelm users with noisy gamification streaks and cluttered charts rather than lowering cognitive load immediately upon arrival.',
    architecture:
      'Engineered with Web Audio API procedural sound synthesis, smooth Framer Motion spring physics for paced respiration guides, and zero-knowledge local-first mood encryption.',
    outcomeMetric: '91% Daily Session Completion',
    outcomeContext: 'Measured across 14-day guided decompression cohorts with 6.4 min average dwell time',
    stackText: 'React · Framer Motion · Web Audio API · Tailwind CSS',
    highlights: [
      'Biometric-paced visual breathing oscillator at 6 breaths/min',
      'Procedural binaural rain and nocturnal acoustic layers',
      'Distraction-free reflective journaling with sentiment reflection'
    ],
    livePreviewSpecs: {
      latency: '12ms audio buffer',
      fps: '120Hz spring motion',
      resolution: 'Spatial stereo'
    }
  },
  {
    id: 'binte-hawa',
    index: '03',
    title: 'Binte Hawa',
    subtitle: 'E-commerce Platform',
    category: 'ecommerce',
    categoryLabel: 'E-Commerce Flagship',
    year: '2026',
    role: 'Frontend Architect & Motion Designer',
    image: binteHawaImg,
    liveUrl: 'https://binte-hawa-fz2x.vercel.app/',
    summary:
      'High-conversion flagship digital storefront for Binte Hawa (بنت حوا), showcasing curated fashion, modest couture, and lifestyle collections with seamless checkout.',
    challenge:
      'Traditional fashion storefronts suffered from cluttered catalog grids and slow multi-step checkout flows that eroded brand elegance on mobile and desktop viewports.',
    architecture:
      'Deployed on Vercel with a responsive React & Next.js commerce architecture, instant optimistic cart updates, interactive lookbook galleries, and sub-second route transitions.',
    outcomeMetric: '+64% Checkout Conversion',
    outcomeContext: 'Achieved after launching interactive collection lookbooks and express checkout on Vercel',
    stackText: 'Next.js · React · Tailwind CSS · Framer Motion · Vercel',
    highlights: [
      'Curated modest couture & fashion lookbook galleries',
      'Sub-100ms optimistic cart drawer with seamless mobile UX',
      'Editorial product storytelling with high-contrast luxury typography'
    ],
    livePreviewSpecs: {
      latency: '65ms TTFB',
      fps: '60 FPS transitions',
      resolution: 'Retina asset pipeline'
    }
  },
  {
    id: 'holy-quran-by-abubakar',
    index: '04',
    title: 'Holy Quran by Abubakar',
    subtitle: 'Digital Quran & Audio Recitation Platform',
    category: 'islamic',
    categoryLabel: 'Islamic Web Application',
    year: '2026',
    role: 'Creator & Full-Stack Web Developer',
    image: holyQuranImg,
    liveUrl: 'https://allah-rho.vercel.app/',
    summary:
      'A serene, distraction-free digital Quran experience engineered for crystal-clear Arabic typography, instant Surah navigation, translations, and soulful audio recitation.',
    challenge:
      'Many online Quran portals are cluttered with intrusive ads and slow page reloads that disrupt focus during daily recitation and reflection.',
    architecture:
      'Built and deployed on Vercel with fast client-side Surah indexing, responsive Uthmani script rendering, synchronized verse-by-verse audio playback, and instant search.',
    outcomeMetric: '114 Surahs Instant Access',
    outcomeContext: 'Zero-latency Surah & Ayah navigation with synchronized audio recitation player',
    stackText: 'React · Next.js · Tailwind CSS · Quran API · Vercel',
    highlights: [
      'Complete 114 Surahs with crisp Arabic calligraphy & translations',
      'Seamless verse-by-verse audio recitation player with waveform progress',
      'Distraction-free reading mode optimized for mobile and desktop'
    ],
    livePreviewSpecs: {
      latency: '38ms Surah load',
      fps: '60 FPS smooth scroll',
      resolution: 'Vector Arabic script'
    }
  }
];

export const TIKTOK_REELS: TikTokReel[] = [
  {
    id: 'reel-01',
    title: 'Building Abubakar.ai Neural Studio at 2 AM',
    caption: 'How I combine AI code generation with cinema color grading in one workflow. #ai #webdev #videoediting #cybernetic',
    audioTrack: 'Original Sound — Meet Abubakar',
    views: '148.2K',
    likes: 24800,
    comments: 642,
    shares: '3.1K',
    duration: '0:42',
    category: 'AI Engineering',
    image: '/assets/aistudio/IMG_3671_939b8612.jpeg',
    accentGradient: 'from-[#ff0033]/30 via-black/40 to-black/90',
    commentList: [
      { user: '@zain_codes', text: 'The red ambient lighting + UI transitions are unreal!', time: '2h' },
      { user: '@sarah.motion', text: 'Drop a tutorial on that 3D card tilt effect please', time: '5h' },
      { user: '@dev_hamza', text: 'Cleanest dark mode setup on my FYP today.', time: '1d' }
    ]
  },
  {
    id: 'reel-02',
    title: 'High-Retention Pacing & Speed Ramp Breakdown',
    caption: 'Why 60fps optical flow + sub-bass sound design keeps viewers locked till the final frame. #premierepro #aftereffects #filmmaking',
    audioTrack: 'Dark Synth Pulse — Meet Abubakar',
    views: '219.5K',
    likes: 39400,
    comments: 918,
    shares: '5.4K',
    duration: '0:38',
    category: 'Cinematic Editing',
    image: abubakarAiImg,
    accentGradient: 'from-rose-900/40 via-black/65 to-black/95',
    commentList: [
      { user: '@khalid_edits', text: 'Those sound design risers hit so hard on headphones.', time: '1h' },
      { user: '@pixel_craft', text: 'Your timeline organization is a work of art.', time: '4h' },
      { user: '@amina_ux', text: 'Bridging video editing and web motion is a superpower.', time: '2d' }
    ]
  },
  {
    id: 'reel-03',
    title: 'Designing Serene Mind & Binte Hawa UI Motion',
    caption: 'Turning static wireframes into tactile, spring-physics web experiences with React & Framer Motion. #uiux #nextjs #framer',
    audioTrack: 'Midnight Code Session — Meet Abubakar',
    views: '96.8K',
    likes: 18200,
    comments: 410,
    shares: '1.9K',
    duration: '0:51',
    category: 'Web Design',
    image: sereneMindImg,
    accentGradient: 'from-red-950/50 via-black/60 to-black/95',
    commentList: [
      { user: '@omar.fullstack', text: 'Spring physics > linear easing every single time.', time: '3h' },
      { user: '@studio_nord', text: 'Bookmarked this for our next product launch.', time: '8h' }
    ]
  }
];

export const DISCIPLINE_PILLARS = [
  {
    id: 'ai-dev',
    title: 'AI Software Development',
    metric: 'Full-Stack & Neural Pipelines',
    description:
      'Architecting responsive AI web applications with Next.js, React, and modern LLM APIs—turning complex machine intelligence into intuitive, sub-second human interfaces.'
  },
  {
    id: 'web-design',
    title: 'Interactive Web Design',
    metric: '3D Motion & High-Contrast UI',
    description:
      'Crafting dark-mode design systems with spatial depth, spring-driven micro-interactions, and editorial typography that commands immediate visual authority.'
  },
  {
    id: 'video-editing',
    title: 'Cinematic Video Editing',
    metric: 'Rhythm, Color & Sound Design',
    description:
      'Directing high-retention short-form and long-form visual narratives with precision speed-ramping, custom LUT color grading, and atmospheric acoustic layering.'
  }
];
