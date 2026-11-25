import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Check,
  Clock,
  Code2,
  Command,
  Copy,
  Download,
  Mail,
  MapPin,
  Menu,
  Moon,
  Phone,
  Send,
  Share2,
  Sun,
  X,
} from 'lucide-react';
import {
  EDUCATION,
  ENGINEERING_TABS,
  EXPERIENCES,
  MARQUEE_ITEMS,
  PROFILE,
  PROJECTS,
  SKILL_GROUPS,
  SPECIALIZATIONS,
  WORKFLOW_STEPS,
} from './data/portfolio.js';
import { ProjectPreview } from './components/ProjectPreview.jsx';
import { ProjectModal } from './components/ProjectModal.jsx';
import { ResumeModal } from './components/ResumeModal.jsx';
import { CommandPalette } from './components/CommandPalette.jsx';
import { SpotlightCard } from './components/SpotlightCard.jsx';
import { AmbientBackground } from './components/AmbientBackground.jsx';

export default function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('usaid-theme-v2');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'dark';
  });

  const [roleIndex, setRoleIndex] = useState(0);
  const [activeEngTab, setActiveEngTab] = useState('mern');
  const [activeWorkflowStep, setActiveWorkflowStep] = useState('01');
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const [projectFilter, setProjectFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const [timelineTrack, setTimelineTrack] = useState('work');
  const [selectedTimelineId, setSelectedTimelineId] = useState(EXPERIENCES[0].id);

  const [selectedSkill, setSelectedSkill] = useState(null);

  const [resumeOpen, setResumeOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [copiedContact, setCopiedContact] = useState(null);
  const [sharedLink, setSharedLink] = useState(false);
  const [karachiTime, setKarachiTime] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Inquiry form state
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [inquiryTopic, setInquiryTopic] = useState('Full-Stack Project');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [formError, setFormError] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const heroRef = useRef(null);

  // Smooth top scroll progress bar & hero parallax
  const { scrollY, scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    restDelta: 0.001,
  });

  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const portraitY = useTransform(heroScrollProgress, [0, 1], [0, 32]);

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setShowBackToTop(latest > 450);
    });
    return () => unsubscribe();
  }, [scrollY]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    window.localStorage.setItem('usaid-theme-v2', theme);
  }, [theme]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % SPECIALIZATIONS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const updateClock = () => {
      try {
        const formatted = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Karachi',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }).format(new Date());
        setKarachiTime(formatted);
      } catch {
        setKarachiTime('PKT (UTC+5)');
      }
    };
    updateClock();
    const interval = setInterval(updateClock, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentEngTab = useMemo(
    () => ENGINEERING_TABS.find((t) => t.id === activeEngTab) ?? ENGINEERING_TABS[0],
    [activeEngTab]
  );

  const filteredProjects = useMemo(() => {
    if (projectFilter === 'All') return PROJECTS;
    return PROJECTS.filter((p) => p.category === projectFilter);
  }, [projectFilter]);

  const matchingSkillProjects = useMemo(() => {
    if (!selectedSkill) return [];
    const needle = selectedSkill.toLowerCase().split(' ')[0];
    return PROJECTS.filter((p) =>
      p.stack.some((s) => s.toLowerCase().includes(needle)) ||
      p.summary.toLowerCase().includes(needle) ||
      p.architecture.toLowerCase().includes(needle)
    );
  }, [selectedSkill]);

  const timelineItems = timelineTrack === 'work' ? EXPERIENCES : EDUCATION;
  const activeTimelineItem =
    timelineItems.find((item) => item.id === selectedTimelineId) ?? timelineItems[0];

  const handleTrackSwitch = (track) => {
    setTimelineTrack(track);
    setSelectedTimelineId(track === 'work' ? EXPERIENCES[0].id : EDUCATION[0].id);
  };

  const handleCopySnippet = async () => {
    try {
      await navigator.clipboard.writeText(currentEngTab.code);
      setCopiedSnippet(true);
      setTimeout(() => setCopiedSnippet(false), 1600);
    } catch {
      // Clipboard fallback ignored
    }
  };

  const handleCopyContact = async (type, value) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedContact(type);
      setTimeout(() => setCopiedContact(null), 1800);
    } catch {
      // Clipboard fallback ignored
    }
  };

  const handleSharePortfolio = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setSharedLink(true);
      setTimeout(() => setSharedLink(false), 1800);
    } catch {
      // Clipboard fallback ignored
    }
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleInquireFromProject = (projectTitle) => {
    setInquiryTopic('Full-Stack Project');
    setInquiryMessage(
      `Hi Muhammad, I reviewed your ${projectTitle} case study and would like to discuss a similar build.`
    );
    setFormSubmitted(false);
    scrollToSection('contact');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!senderName.trim() || !senderEmail.trim() || !inquiryMessage.trim()) {
      setFormError('Please fill in your name, email address, and project message.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmail.trim())) {
      setFormError('Please enter a valid email address.');
      return;
    }
    setFormError(null);
    setFormSubmitted(true);
  };

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(
      `[Portfolio Inquiry] ${inquiryTopic} — ${senderName || 'Visitor'}`
    );
    const body = encodeURIComponent(
      `Name: ${senderName}\nEmail: ${senderEmail}\nTopic: ${inquiryTopic}\n\n${inquiryMessage}`
    );
    return `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
  }, [inquiryMessage, inquiryTopic, senderEmail, senderName]);

  return (
    <MotionConfig reducedMotion="user">
      <div
        id="top"
        className="relative min-h-screen bg-[#F4F7FB] dark:bg-[#07070A] text-zinc-950 dark:text-zinc-100 transition-colors duration-200"
      >
        <AmbientBackground />

        {/* Scroll Progress Indicator */}
        <motion.div
          style={{ scaleX: smoothProgress }}
          className="fixed top-0 left-0 right-0 h-[2px] bg-blue-600 dark:bg-blue-500 origin-left z-50 pointer-events-none"
        />

        {/* Strict 3-Zone Top Navigation Bar */}
        <header className="sticky top-0 z-40 bg-white/75 dark:bg-[#07070A]/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-zinc-800/80">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
            {/* Zone 1: Single text element wordmark */}
            <a
              href="#top"
              className="text-lg font-display font-bold tracking-tight text-zinc-950 dark:text-zinc-50 whitespace-nowrap shrink-0"
            >
              Muhammad Usaid
            </a>

            {/* Zone 2: 4 single-line text nav links */}
            <nav
              aria-label="Primary navigation"
              className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-600 dark:text-zinc-400"
            >
              <a
                href="#about"
                className="hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors whitespace-nowrap shrink-0"
              >
                About
              </a>
              <a
                href="#projects"
                className="hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors whitespace-nowrap shrink-0"
              >
                Projects
              </a>
              <a
                href="#experience"
                className="hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors whitespace-nowrap shrink-0"
              >
                Experience
              </a>
              <a
                href="#contact"
                className="hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors whitespace-nowrap shrink-0"
              >
                Contact
              </a>
            </nav>

            {/* Zone 3: 1 primary action (plus mobile menu toggle strictly < md) */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setResumeOpen(true)}
                className="px-4 py-2 text-xs font-medium rounded-lg bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Resume
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                className="md:hidden p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200/60 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.nav
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.16 }}
                aria-label="Mobile navigation"
                className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-[#FAFAFA] dark:bg-[#07070A] px-4 py-4 flex flex-col gap-3 text-sm font-medium"
              >
                {[
                  { label: 'About', id: 'about' },
                  { label: 'Projects', id: 'projects' },
                  { label: 'Experience', id: 'experience' },
                  { label: 'Capabilities', id: 'capabilities' },
                  { label: 'Contact', id: 'contact' },
                ].map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => scrollToSection(link.id)}
                    className="text-left py-1.5 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
                  >
                    {link.label}
                  </button>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>
        </header>

        <main className="relative z-10">
          {/* Editorial Hero with Architectural Grid, Animated Specialization & Real Portrait */}
          <section
            ref={heroRef}
            className="relative overflow-hidden border-b border-slate-200/80 dark:border-zinc-800/80"
          >
            <div
              className="absolute -top-40 right-0 w-[520px] h-[520px] rounded-full bg-blue-500/12 dark:bg-blue-500/12 blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-14">
              {/* Hero Utility Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-zinc-200/80 dark:border-zinc-800/80 mb-10">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 h-6 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={SPECIALIZATIONS[roleIndex]}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="font-medium text-zinc-900 dark:text-zinc-100 whitespace-nowrap"
                    >
                      {SPECIALIZATIONS[roleIndex]}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-zinc-300 dark:text-zinc-700" aria-hidden="true">
                    ·
                  </span>
                  <span className="whitespace-nowrap">Karachi, Pakistan</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleSharePortfolio}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {sharedLink ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                        <span>Link Copied</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5 text-zinc-400" aria-hidden="true" />
                        <span className="hidden sm:inline">Share</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setCommandOpen(true)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Command className="w-3.5 h-3.5 text-zinc-400" aria-hidden="true" />
                    <span>Quick Jump</span>
                    <kbd className="font-mono text-[10px] text-zinc-400 hidden sm:inline">⌘K</kbd>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
                    aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {theme === 'light' ? (
                      <>
                        <Moon className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Dark</span>
                      </>
                    ) : (
                      <>
                        <Sun className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Light</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* 2-Column Hero Split with Matched Height & Real Portrait */}
              <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:col-span-7 flex flex-col justify-between gap-8 py-2"
                >
                  <div className="space-y-6">
                    <h1 className="text-4xl sm:text-5xl lg:text-[3.65rem] font-display font-bold tracking-tight leading-[1.05] text-zinc-950 dark:text-zinc-50 [text-wrap:balance]">
                      Engineering scalable{' '}
                      <span className="text-blue-600 dark:text-blue-400">MERN apps</span> &amp;
                      AI-powered web experiences.
                    </h1>
                    <p className="text-base sm:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-xl">
                      {PROFILE.subheadline}
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => scrollToSection('projects')}
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98] transition-all whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <span>Explore Live Projects</span>
                        <ArrowDown className="w-4 h-4" aria-hidden="true" />
                      </button>
                      <a
                        href={PROFILE.resumeUrl}
                        download="Muhammad_Usaid_Resume.pdf"
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-[0.98] transition-all whitespace-nowrap shrink-0"
                      >
                        <Download className="w-4 h-4 text-zinc-500 dark:text-zinc-400" aria-hidden="true" />
                        <span>Download CV</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => scrollToSection('contact')}
                        className="inline-flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <span>Hire / Collaborate</span>
                        <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400 flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span>React JS · Node.js · MongoDB · AI APIs</span>
                      <span aria-hidden="true">·</span>
                      <span>Teaching Associate @ Aptech MSG</span>
                    </div>
                  </div>
                </motion.div>

                {/* Right Column: Real Studio Portrait with Parallax & Scrim */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:col-span-5 flex"
                >
                  <div className="group relative w-full min-h-[380px] lg:h-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-900 shadow-2xl">
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-900 to-blue-950 flex flex-col items-center justify-center p-6 text-center"
                      aria-hidden="true"
                    >
                      <Code2 className="w-10 h-10 text-blue-400 mb-3" />
                      <span className="font-display text-lg font-bold text-white">
                        {PROFILE.name}
                      </span>
                      <span className="text-xs text-zinc-400 mt-1">{PROFILE.role}</span>
                    </div>

                    <motion.img
                      style={{ y: portraitY }}
                      src={PROFILE.photoUrl}
                      alt="Muhammad Usaid — Full Stack AI and MERN Stack Developer"
                      referrerPolicy="no-referrer"
                      className="relative z-10 w-full h-[108%] -top-[4%] object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />

                    <div
                      className="absolute inset-0 z-20 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none"
                      aria-hidden="true"
                    />

                    <div className="absolute bottom-0 left-0 right-0 z-30 p-6 flex items-end justify-between gap-4">
                      <div>
                        <div className="text-xs font-mono text-blue-400">
                          Karachi, Pakistan
                        </div>
                        <div className="text-xl font-display font-bold text-white mt-0.5">
                          {PROFILE.name}
                        </div>
                        <div className="text-xs text-zinc-300 mt-0.5">
                          Full Stack AI &amp; MERN Developer
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setResumeOpen(true)}
                        className="px-3.5 py-2 text-xs font-medium rounded-lg bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/20 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        View CV
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Full-Width 4-Column Proof Strip */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                className="mt-12 grid grid-cols-2 lg:grid-cols-4 border border-slate-200/90 dark:border-zinc-800 rounded-xl bg-white/85 dark:bg-zinc-900/80 backdrop-blur-md shadow-[0_2px_12px_-4px_rgba(15,23,42,0.06)] dark:shadow-none divide-y lg:divide-y-0 lg:divide-x divide-slate-200/80 dark:divide-zinc-800"
              >
                {PROFILE.metrics.map((metric, idx) => (
                  <div
                    key={metric.label}
                    className={`p-5 ${
                      idx % 2 === 1
                        ? 'border-l border-zinc-200 dark:border-zinc-800 lg:border-l-0'
                        : ''
                    }`}
                  >
                    <div className="text-xl sm:text-2xl font-display font-bold tabular-nums text-zinc-950 dark:text-zinc-50">
                      {metric.value}
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Subtle Marquee Ribbon Divider */}
          <div
            className="marquee-wrapper overflow-hidden border-b border-zinc-200 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-950/80 py-3.5"
            aria-label="Core technologies marquee"
          >
            <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap text-xs font-mono text-zinc-500 dark:text-zinc-400">
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                <span key={`${item}-${i}`} className="flex items-center gap-8">
                  <span>{item}</span>
                  <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-700">
                    ·
                  </span>
                </span>
              ))}
            </div>
          </div>

          {/* 01. Selected Projects with Shared-Layout Filter Tabs & Spotlight Cards */}
          <section id="projects" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div className="space-y-2 max-w-xl">
                <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                  01. Selected Projects
                </h2>
                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                  Interact directly with each live preview—filter listings, switch forecast cities, read posts, or manage sprint tasks—then open any Case Study for full architecture notes.
                </p>
              </div>

              <div
                role="tablist"
                aria-label="Filter projects by category"
                className="flex flex-wrap items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg self-start md:self-auto"
              >
                {['All', 'Full Stack', 'Frontend & UI', 'AI-Ready'].map((cat) => {
                  const active = projectFilter === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setProjectFilter(cat)}
                      className={`relative px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        active
                          ? 'text-zinc-950 dark:text-zinc-50'
                          : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100'
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="project-filter-bg"
                          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute inset-0 bg-white dark:bg-zinc-800 rounded-md shadow-xs"
                        />
                      )}
                      <span className="relative z-10">{cat}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {filteredProjects.map((project, idx) => {
                const spanClass =
                  filteredProjects.length === 4
                    ? idx === 0 || idx === 3
                      ? 'lg:col-span-7'
                      : 'lg:col-span-5'
                    : 'lg:col-span-6';

                return (
                  <motion.article
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className={`${spanClass} group`}
                  >
                    <SpotlightCard className="h-full bg-white/85 dark:bg-zinc-900/90 backdrop-blur-md border border-slate-200/90 dark:border-zinc-800 rounded-2xl p-6 shadow-[0_2px_10px_-3px_rgba(15,23,42,0.05),0_12px_28px_-14px_rgba(15,23,42,0.08)] dark:shadow-none hover:border-blue-300 dark:hover:border-zinc-700 transition-colors">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between gap-2 text-xs font-mono tabular-nums text-zinc-500 dark:text-zinc-400">
                          <span>
                            {project.index} · {project.category} · {project.year}
                          </span>
                          <button
                            type="button"
                            onClick={() => setSelectedProject(project)}
                            className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-sans font-medium hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            <span>Case Study</span>
                            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                        </div>

                        <div>
                          <h3 className="text-xl font-display font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                            <button
                              type="button"
                              onClick={() => setSelectedProject(project)}
                              className="text-left hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                            >
                              {project.title}
                            </button>
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                            {project.summary}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
                          <ProjectPreview type={project.previewType} interactive />
                        </div>

                        <div className="flex items-center justify-between gap-3">
                          <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400 truncate">
                            {project.stack.join(' · ')}
                          </div>
                          <button
                            type="button"
                            onClick={() => setSelectedProject(project)}
                            className="text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            Inspect Architecture
                          </button>
                        </div>
                      </div>
                    </SpotlightCard>
                  </motion.article>
                );
              })}
            </div>
          </section>

          {/* 02. Engineering Workbench & 3-Step Delivery Process */}
          <section className="border-y border-slate-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-950/50 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 space-y-12">
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-5">
                  <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                    02. How I Engineer Systems
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                    Inspect the patterns I ship in production and teach in practical labs—from indexed MERN controllers and AI API handlers to component craftsmanship.
                  </p>

                  <div className="inline-flex flex-wrap items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg">
                    {ENGINEERING_TABS.map((tab) => {
                      const active = tab.id === activeEngTab;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setActiveEngTab(tab.id)}
                          className={`relative px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            active
                              ? 'text-white'
                              : 'text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white'
                          }`}
                        >
                          {active && (
                            <motion.span
                              layoutId="eng-tab-bg"
                              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                              className="absolute inset-0 bg-blue-600 rounded-md"
                            />
                          )}
                          <span className="relative z-10">{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <SpotlightCard className="bg-[#FAFAFA] dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-zinc-200 dark:border-zinc-800">
                      <div className="min-w-0">
                        <div className="text-sm font-display font-semibold text-zinc-950 dark:text-zinc-50 truncate">
                          {currentEngTab.title}
                        </div>
                        <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400 truncate">
                          {currentEngTab.snippetTitle}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopySnippet}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        {copiedSnippet ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="px-5 pb-5 space-y-4">
                      <AnimatePresence mode="wait">
                        <motion.pre
                          key={currentEngTab.id}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.16 }}
                          className="p-4 rounded-xl bg-zinc-950 text-zinc-200 font-mono text-[11px] sm:text-xs leading-relaxed overflow-x-auto border border-zinc-800"
                        >
                          <code>{currentEngTab.code}</code>
                        </motion.pre>
                      </AnimatePresence>

                      <div className="grid sm:grid-cols-3 gap-3 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                        {currentEngTab.specs.map((spec) => (
                          <div key={spec.label} className="min-w-0">
                            <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
                              {spec.label}
                            </div>
                            <div className="text-xs text-zinc-900 dark:text-zinc-200 font-medium mt-0.5 truncate">
                              {spec.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </SpotlightCard>
                </div>
              </div>

              {/* 3-Step Delivery Process Strip */}
              <div className="grid md:grid-cols-3 gap-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                {WORKFLOW_STEPS.map((item) => {
                  const isActive = activeWorkflowStep === item.step;
                  return (
                    <button
                      key={item.step}
                      type="button"
                      onClick={() => setActiveWorkflowStep(item.step)}
                      onMouseEnter={() => setActiveWorkflowStep(item.step)}
                      className={`text-left p-5 rounded-xl border transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#FAFAFA] dark:bg-zinc-900 border-blue-600/60 dark:border-blue-500/60'
                          : 'bg-transparent border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-mono tabular-nums text-blue-600 dark:text-blue-400">
                          Step {item.step}
                        </span>
                      </div>
                      <div className="text-base font-display font-bold text-zinc-950 dark:text-zinc-50 mt-2">
                        {item.title}
                      </div>
                      <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 mt-1.5">
                        {item.detail}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* 03. Experience & Education Interactive Timeline */}
          <section id="experience" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div className="space-y-2 max-w-xl">
                <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                  03. Experience &amp; Education
                </h2>
                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                  Teaching modern web engineering at Aptech MSG alongside academic training in Computer Science.
                </p>
              </div>

              <div className="flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg self-start md:self-auto">
                <button
                  type="button"
                  onClick={() => handleTrackSwitch('work')}
                  className={`relative px-4 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    timelineTrack === 'work'
                      ? 'text-zinc-950 dark:text-zinc-50'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100'
                  }`}
                >
                  {timelineTrack === 'work' && (
                    <motion.span
                      layoutId="timeline-track-bg"
                      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 bg-white dark:bg-zinc-800 rounded-md shadow-xs"
                    />
                  )}
                  <span className="relative z-10">Work Experience</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleTrackSwitch('education')}
                  className={`relative px-4 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    timelineTrack === 'education'
                      ? 'text-zinc-950 dark:text-zinc-50'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100'
                  }`}
                >
                  {timelineTrack === 'education' && (
                    <motion.span
                      layoutId="timeline-track-bg"
                      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 bg-white dark:bg-zinc-800 rounded-md shadow-xs"
                    />
                  )}
                  <span className="relative z-10">Education</span>
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-5 flex flex-col gap-3">
                {timelineItems.map((item) => {
                  const selected = item.id === activeTimelineItem.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedTimelineId(item.id)}
                      className={`w-full text-left p-5 rounded-xl border transition-all cursor-pointer ${
                        selected
                          ? 'bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 border-zinc-950 dark:border-zinc-100 shadow-sm'
                          : 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                      }`}
                    >
                      <div
                        className={`text-xs font-mono tabular-nums ${
                          selected
                            ? 'text-zinc-300 dark:text-zinc-600'
                            : 'text-zinc-500 dark:text-zinc-400'
                        }`}
                      >
                        {item.period}
                      </div>
                      <div className="text-base font-display font-bold mt-1">
                        {item.role}
                      </div>
                      <div
                        className={`text-xs mt-0.5 ${
                          selected
                            ? 'text-zinc-300 dark:text-zinc-700'
                            : 'text-zinc-600 dark:text-zinc-400'
                        }`}
                      >
                        {item.organization} · {item.location}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="lg:col-span-7 flex">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTimelineItem.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col justify-between gap-6"
                  >
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-4">
                        <div>
                          <h3 className="text-xl sm:text-2xl font-display font-bold text-zinc-950 dark:text-zinc-50">
                            {activeTimelineItem.role}
                          </h3>
                          <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mt-0.5">
                            {activeTimelineItem.organization}
                          </p>
                        </div>
                        <span className="text-xs font-mono tabular-nums text-zinc-500 dark:text-zinc-400">
                          {activeTimelineItem.period}
                        </span>
                      </div>

                      <p className="text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                        {activeTimelineItem.summary}
                      </p>

                      <ul className="space-y-2.5 pt-2">
                        {activeTimelineItem.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300 flex items-start gap-2.5"
                          >
                            <span className="font-mono text-blue-600 dark:text-blue-400 text-xs mt-1">
                              —
                            </span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                      Focus: {activeTimelineItem.focusAreas.join(' · ')}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </section>

          {/* 04. Technical Capabilities Matrix with Interactive Skill Cross-Reference */}
          <section
            id="capabilities"
            className="border-y border-slate-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-950/50 backdrop-blur-sm"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                <div className="space-y-2 max-w-xl">
                  <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                    04. Technical Capabilities
                  </h2>
                  <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                    Click any technology below to inspect which projects apply it in practice.
                  </p>
                </div>
                {selectedSkill && (
                  <button
                    type="button"
                    onClick={() => setSelectedSkill(null)}
                    className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline self-start md:self-auto whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Clear filter ({selectedSkill})
                  </button>
                )}
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-[#FAFAFA] dark:bg-zinc-900 divide-y sm:divide-y-0 sm:divide-x divide-zinc-200 dark:divide-zinc-800 overflow-hidden">
                {SKILL_GROUPS.map((group, idx) => (
                  <motion.div
                    key={group.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className={`p-6 flex flex-col justify-between gap-6 ${
                      idx >= 2
                        ? 'sm:border-t lg:border-t-0 border-zinc-200 dark:border-zinc-800'
                        : ''
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="text-xs font-mono tabular-nums text-blue-600 dark:text-blue-400">
                        {group.index}
                      </div>
                      <h3 className="text-lg font-display font-bold text-zinc-950 dark:text-zinc-50">
                        {group.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                        {group.description}
                      </p>
                    </div>

                    <ul className="space-y-1 pt-4 border-t border-zinc-200/80 dark:border-zinc-800">
                      {group.items.map((item) => {
                        const active = selectedSkill === item;
                        return (
                          <li key={item}>
                            <button
                              type="button"
                              onClick={() =>
                                setSelectedSkill((prev) => (prev === item ? null : item))
                              }
                              className={`w-full text-left text-sm py-0.5 transition-colors cursor-pointer ${
                                active
                                  ? 'text-blue-600 dark:text-blue-400 font-semibold'
                                  : 'text-zinc-800 dark:text-zinc-200 hover:text-blue-600 dark:hover:text-blue-400'
                              }`}
                            >
                              {item}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </motion.div>
                ))}
              </div>

              <AnimatePresence>
                {selectedSkill && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="mt-4 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#FAFAFA] dark:bg-zinc-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="text-sm text-zinc-700 dark:text-zinc-300">
                      <span className="font-semibold text-zinc-950 dark:text-zinc-50">
                        {selectedSkill}
                      </span>{' '}
                      {matchingSkillProjects.length > 0
                        ? 'appears directly in:'
                        : 'is part of my core engineering & Aptech MSG mentorship toolkit.'}
                    </div>
                    {matchingSkillProjects.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2">
                        {matchingSkillProjects.map((proj) => (
                          <button
                            key={proj.id}
                            type="button"
                            onClick={() => setSelectedProject(proj)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 hover:border-blue-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            <span>{proj.title}</span>
                            <ArrowUpRight className="w-3 h-3 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                          </button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          {/* 05. About & Contact Section */}
          <section id="about" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
            <div id="contact" className="grid lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Portrait Card + Narrative + Live Local Time + Direct Contact */}
              <div className="lg:col-span-5 space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-900 shrink-0">
                    <img
                      src={PROFILE.photoUrl}
                      alt={PROFILE.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                      05. About &amp; Contact
                    </h2>
                    <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-medium mt-0.5">
                      Available for Full-Stack MERN, Frontend &amp; AI Roles
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {PROFILE.aboutParagraphs.map((para) => (
                    <p key={para}>{para}</p>
                  ))}
                </div>

                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between gap-3 py-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <Clock className="w-4 h-4 text-zinc-400 shrink-0" aria-hidden="true" />
                      <span className="text-sm text-zinc-700 dark:text-zinc-300">
                        Local Time (Karachi, PKT)
                      </span>
                    </div>
                    <span className="text-xs font-mono tabular-nums text-zinc-950 dark:text-zinc-100">
                      {karachiTime || 'PKT (UTC+5)'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 py-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <Mail className="w-4 h-4 text-zinc-400 shrink-0" aria-hidden="true" />
                      <a
                        href={`mailto:${PROFILE.email}`}
                        className="text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 truncate"
                      >
                        {PROFILE.email}
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyContact('email', PROFILE.email)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {copiedContact === 'email' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-zinc-400" aria-hidden="true" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-3 py-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <Phone className="w-4 h-4 text-zinc-400 shrink-0" aria-hidden="true" />
                      <a
                        href={`tel:${PROFILE.phone}`}
                        className="text-sm font-mono tabular-nums font-medium text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 truncate"
                      >
                        {PROFILE.phone}
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyContact('phone', PROFILE.phone)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {copiedContact === 'phone' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-zinc-400" aria-hidden="true" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-start gap-3 py-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <MapPin className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{PROFILE.address}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Clean Interactive Inquiry Form */}
              <div className="lg:col-span-7">
                <form
                  onSubmit={handleFormSubmit}
                  noValidate
                  className="p-6 sm:p-8 rounded-2xl border border-slate-200/90 dark:border-zinc-800 bg-white/85 dark:bg-zinc-900/90 backdrop-blur-md shadow-[0_2px_12px_-4px_rgba(15,23,42,0.06)] dark:shadow-none space-y-6"
                >
                  <div className="space-y-1">
                    <h3 className="text-xl font-display font-bold text-zinc-950 dark:text-zinc-50">
                      Start a Conversation
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                      Share your project scope, hiring inquiry, or collaboration idea.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
                      Inquiry Focus
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'Full-Stack Project',
                        'AI Integration',
                        'Hiring / Role',
                        'Mentorship',
                      ].map((topic) => (
                        <button
                          key={topic}
                          type="button"
                          onClick={() => setInquiryTopic(topic)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            inquiryTopic === topic
                              ? 'bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 border-zinc-950 dark:border-zinc-100'
                              : 'bg-[#FAFAFA] dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                          }`}
                        >
                          {topic}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-medium text-zinc-700 dark:text-zinc-300"
                      >
                        Your Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="Ahmed Raza"
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-[#FAFAFA] dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-medium text-zinc-700 dark:text-zinc-300"
                      >
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-[#FAFAFA] dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-medium text-zinc-700 dark:text-zinc-300"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      placeholder="Tell me about the timeline, stack, or role..."
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-[#FAFAFA] dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-y"
                    />
                  </div>

                  {formError && (
                    <div
                      role="alert"
                      className="text-xs font-medium text-red-600 dark:text-red-400"
                    >
                      {formError}
                    </div>
                  )}

                  {formSubmitted ? (
                    <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/70 dark:bg-blue-950/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="text-sm font-semibold text-zinc-950 dark:text-zinc-50 flex items-center gap-2">
                          <Check
                            className="w-4 h-4 text-blue-600 dark:text-blue-400"
                            aria-hidden="true"
                          />
                          <span>Inquiry Prepared for {PROFILE.name}</span>
                        </div>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400">
                          Launch your email client with the pre-filled message or copy {PROFILE.email}.
                        </p>
                      </div>
                      <a
                        href={mailtoHref}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors whitespace-nowrap shrink-0"
                      >
                        <Send className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Send via Email App</span>
                      </a>
                    </div>
                  ) : (
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        Direct reply via {PROFILE.email}
                      </span>
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98] transition-all whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <Send className="w-4 h-4" aria-hidden="true" />
                        <span>Prepare Message</span>
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </section>
        </main>

        {/* Quiet Editorial Footer */}
        <footer className="relative z-10 border-t border-slate-200/80 dark:border-zinc-800/80 bg-white/50 dark:bg-transparent backdrop-blur-sm py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
            <div>
              © 2026 {PROFILE.name} · {PROFILE.location}
            </div>
            <div className="flex flex-wrap items-center gap-5">
              <a
                href="#projects"
                className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0"
              >
                Projects
              </a>
              <a
                href="#experience"
                className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0"
              >
                Experience
              </a>
              <button
                type="button"
                onClick={() => setResumeOpen(true)}
                className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                View Resume
              </button>
              <button
                type="button"
                onClick={() => setCommandOpen(true)}
                className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Quick Jump (⌘K)
              </button>
            </div>
          </div>
        </footer>

        {/* Subtle Back-to-Top Control */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 12, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.9 }}
              transition={{ duration: 0.18 }}
              onClick={() => scrollToSection('top')}
              aria-label="Back to top"
              className="fixed bottom-6 right-6 z-30 w-10 h-10 rounded-xl bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 border border-zinc-800 dark:border-zinc-200 shadow-lg flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" aria-hidden="true" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Modals */}
        <ProjectModal
          project={selectedProject}
          projects={PROJECTS}
          onSelectProject={setSelectedProject}
          onClose={() => setSelectedProject(null)}
          onInquire={handleInquireFromProject}
        />
        <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
        <CommandPalette
          open={commandOpen}
          onClose={() => setCommandOpen(false)}
          theme={theme}
          onToggleTheme={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
          onOpenResume={() => setResumeOpen(true)}
          onNavigate={scrollToSection}
        />
      </div>
    </MotionConfig>
  );
}
