"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ChevronDown } from "lucide-react";
import "./sozorockschool.css";

const programs = [
  {
    signal: "Build",
    name: "Applied AI Systems",
    description: "Build AI systems that use tools, memory, data, and human oversight.",
  },
  {
    signal: "Assure",
    name: "Cybersecurity GRC",
    description: "Turn risk, policy, controls, and evidence into decisions people can trust.",
  },
  {
    signal: "Control",
    name: "Cybersecurity Identity and Access Management",
    description: "Design who gets access, why they get it, and how that access stays controlled.",
  },
  {
    signal: "Govern",
    name: "AI Governance",
    description: "Set the rules, evidence, and accountability that keep AI useful and responsible.",
  },
];

const practiceSteps = [
  ["Build", "With real tools, systems, and briefs."],
  ["Test", "Against real constraints and consequences."],
  ["Explain", "So technical work becomes clear decisions."],
  ["Defend", "With evidence, judgment, and confidence."],
];

const outcomes = [
  ["At work", "Take on systems and decisions that used to sit beyond your role."],
  ["In business", "Build technology with trust, control, and accountability from the start."],
  ["In life", "See complex technology clearly and move with more confidence."],
];

function Wordmark({ className = "" }) {
  return (
    <span className={`srs-wordmark ${className}`.trim()}>
      <strong>Sozo</strong>RockSchool
    </span>
  );
}

function HeroScene() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    damping: 35,
    stiffness: 90,
    restDelta: 0.001,
  });

  const brandScale = useTransform(progress, [0, 0.35], [1, 0.66]);
  const brandY = useTransform(progress, [0, 0.35], [0, -6]);
  const navOpacity = useTransform(progress, [0, 0.24], [0.92, 1]);
  const navY = useTransform(progress, [0, 0.24], [-6, 0]);
  const panelOpacity = useTransform(progress, [0, 0.24], [1, 0]);
  const panelX = useTransform(progress, [0, 0.24], [0, -100]);
  const panelScale = useTransform(progress, [0, 0.24], [1, 0.92]);
  const programsOpacity = useTransform(progress, [0, 0.24], [1, 0]);
  const programsX = useTransform(progress, [0, 0.24], [0, 100]);
  const programsScale = useTransform(progress, [0, 0.24], [1, 0.92]);
  const indicatorOpacity = useTransform(progress, [0, 0.1], [0.7, 0]);
  const stageTwoLeftOpacity = useTransform(progress, [0.52, 0.78], [0, 1]);
  const stageTwoLeftX = useTransform(progress, [0.52, 0.78], [-120, 0]);
  const stageTwoRightOpacity = useTransform(progress, [0.58, 0.86], [0, 1]);
  const stageTwoRightX = useTransform(progress, [0.58, 0.86], [120, 0]);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video || prefersReducedMotion) return undefined;

    let animationFrameId = 0;
    let targetProgress = 0;
    let currentProgress = 0;
    let seekInFlight = false;
    let pendingSeekTime = null;
    const lerpFactor = 0.08;
    const openingTime = 2.2;

    const performSeek = (requestedTime) => {
      if (!Number.isFinite(requestedTime) || !Number.isFinite(video.duration)) return;
      const safeTime = Math.max(0, Math.min(requestedTime, video.duration - 0.001));
      if (seekInFlight || video.seeking) {
        pendingSeekTime = safeTime;
        return;
      }
      seekInFlight = true;
      try {
        video.currentTime = safeTime;
      } catch {
        seekInFlight = false;
      }
    };

    const handleSeeking = () => {
      seekInFlight = true;
    };
    const handleSeeked = () => {
      seekInFlight = false;
      if (pendingSeekTime !== null) {
        const nextTime = pendingSeekTime;
        pendingSeekTime = null;
        if (Math.abs(video.currentTime - nextTime) > 0.01) performSeek(nextTime);
      }
    };
    const keepPaused = () => video.pause();
    const handleMetadata = () => {
      video.pause();
      video.currentTime = Math.min(openingTime, video.duration - 0.001);
    };

    const tick = () => {
      const rect = container.getBoundingClientRect();
      const totalScrollableHeight = container.clientHeight - window.innerHeight;
      if (totalScrollableHeight > 0) {
        targetProgress = Math.max(0, Math.min(-rect.top / totalScrollableHeight, 1));
      }
      currentProgress += (targetProgress - currentProgress) * lerpFactor;
      const duration = video.duration || 8.5;
      const targetTime = openingTime + currentProgress * (duration - openingTime);
      const sceneIsNearViewport = rect.bottom >= 0 && rect.top <= window.innerHeight;
      if (sceneIsNearViewport && Math.abs(video.currentTime - targetTime) > 0.01) {
        performSeek(targetTime);
      }
      animationFrameId = requestAnimationFrame(tick);
    };

    video.addEventListener("seeking", handleSeeking);
    video.addEventListener("seeked", handleSeeked);
    video.addEventListener("play", keepPaused);
    video.addEventListener("loadedmetadata", handleMetadata);
    video.pause();
    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      video.removeEventListener("seeking", handleSeeking);
      video.removeEventListener("seeked", handleSeeked);
      video.removeEventListener("play", keepPaused);
      video.removeEventListener("loadedmetadata", handleMetadata);
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      className="srs-hero relative h-[300vh] w-full select-none bg-neutral-950"
      aria-label="SozoRockSchool introduction"
    >
      <div className="sticky left-0 top-0 flex h-[100svh] w-full flex-col overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-0">
          {prefersReducedMotion ? (
            <img
              src="/media/ripple-04-impact.png"
              alt="A dark stone creating four ripples in calm water"
              className="h-full w-full object-cover"
            />
          ) : (
            <video
              ref={videoRef}
              playsInline
              muted
              loop
              preload="auto"
              poster="/media/ripple-01-impact.png"
              className="h-full w-full object-cover"
              aria-label="A stone touching water as four ripples expand"
            >
              <source src="/media/ripple-scroll.mp4" type="video/mp4" />
            </video>
          )}
        </div>

        <header className="srs-hero-header relative z-30 flex w-full items-start justify-between">
          <motion.a
            href="#top"
            aria-label="SozoRockSchool home"
            className="srs-hero-wordmark origin-top-left text-white"
            style={{
              scale: prefersReducedMotion ? 0.66 : brandScale,
              y: prefersReducedMotion ? -6 : brandY,
            }}
          >
            <Wordmark />
          </motion.a>
          <motion.nav
            aria-label="Primary navigation"
            className="srs-primary-nav hidden items-center md:flex"
            style={{
              opacity: prefersReducedMotion ? 1 : navOpacity,
              y: prefersReducedMotion ? 0 : navY,
            }}
          >
            <a href="#courses">Courses</a>
            <a href="#experience">Experience</a>
            <a href="#outcomes">Outcomes</a>
          </motion.nav>
          <a className="srs-apply-button" href="#apply">Apply</a>
        </header>

        <div className="srs-hero-stage relative z-20 flex flex-1">
          <div className="srs-stage-one absolute inset-0">
            <motion.article
              className="srs-glass-panel"
              style={{
                opacity: prefersReducedMotion ? 1 : panelOpacity,
                x: prefersReducedMotion ? 0 : panelX,
                scale: prefersReducedMotion ? 1 : panelScale,
              }}
            >
              <h1>What you learn should change what you can do.</h1>
              <p>At work. In business. In life.</p>
            </motion.article>
            <motion.div
              className="srs-hero-programs"
              style={{
                opacity: prefersReducedMotion ? 1 : programsOpacity,
                x: prefersReducedMotion ? 0 : programsX,
                scale: prefersReducedMotion ? 1 : programsScale,
              }}
            >
              <p className="srs-programs-label">Hands-on programs</p>
              <ul>
                {programs.map((program) => <li key={program.name}>{program.name}</li>)}
              </ul>
            </motion.div>
          </div>

          <div className="srs-stage-two pointer-events-none absolute inset-0">
            <motion.h2
              style={{
                opacity: prefersReducedMotion ? 0 : stageTwoLeftOpacity,
                x: prefersReducedMotion ? 0 : stageTwoLeftX,
              }}
            >
              Learn it. Apply it. Become more capable.
            </motion.h2>
            <motion.p
              style={{
                opacity: prefersReducedMotion ? 0 : stageTwoRightOpacity,
                x: prefersReducedMotion ? 0 : stageTwoRightX,
              }}
            >
              Build the technology. Earn the trust.
            </motion.p>
          </div>
        </div>

        <motion.div
          className="srs-scroll-indicator pointer-events-none absolute bottom-6 left-1/2 z-30 -translate-x-1/2 text-center text-white"
          style={{ opacity: prefersReducedMotion ? 0 : indicatorOpacity }}
        >
          <span>Scroll to make an impact</span>
          <motion.div
            animate={prefersReducedMotion ? undefined : { y: [0, 6, 0] }}
            transition={prefersReducedMotion ? undefined : { repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ChevronDown aria-hidden="true" size={18} strokeWidth={2} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function CoursesSection() {
  return (
    <section id="courses" tabIndex={-1} className="srs-courses" aria-labelledby="courses-title">
      <div className="srs-section-shell">
        <div className="srs-section-intro">
          <p>Courses</p>
          <h2 id="courses-title">Four disciplines. Built to be used.</h2>
          <div>Each program is focused enough to master and connected enough to matter in real work.</div>
        </div>
        <div className="srs-program-list">
          {programs.map((program, index) => (
            <motion.article
              key={program.name}
              className="srs-program-row"
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.32 }}
              transition={{ duration: 0.6, delay: index * 0.04 }}
            >
              <p>{program.signal}</p>
              <h3>{program.name}</h3>
              <div>{program.description}</div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="srs-experience" aria-labelledby="experience-title">
      <div className="srs-section-shell">
        <div className="srs-experience-heading">
          <p>Experience</p>
          <h2 id="experience-title">You do the work here.</h2>
          <div>Real briefs. Working deliverables. Direct review. Practice is the point.</div>
        </div>
        <div className="srs-practice-list">
          {practiceSteps.map(([title, body], index) => (
            <motion.div
              key={title}
              className="srs-practice-row"
              initial={{ opacity: 0, x: index % 2 === 0 ? -48 : 48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.55 }}
            >
              <h3>{title}</h3>
              <p>{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OutcomesSection() {
  return (
    <section id="outcomes" className="srs-outcomes" aria-labelledby="outcomes-title">
      <div className="srs-section-shell">
        <div className="srs-outcomes-copy">
          <p>Outcomes</p>
          <h2 id="outcomes-title">Leave able to do more.</h2>
          <div>Knowledge is the starting point. Capability is the outcome.</div>
        </div>
        <div className="srs-outcomes-grid">
          {outcomes.map(([title, body], index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
            >
              <h3>{title}</h3>
              <p>{body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ApplySection() {
  return (
    <section id="apply" className="srs-application" aria-labelledby="apply-title">
      <div className="srs-section-shell">
        <div className="srs-application-heading">
          <p>Apply</p>
          <h2 id="apply-title">Plan your next step.</h2>
          <div>Online applications are not available yet. Explore the four programs while admissions details are being prepared.</div>
        </div>
        <a className="srs-apply-button" href="#courses">Explore courses</a>
      </div>
    </section>
  );
}

function LegalFooter() {
  return (
    <footer id="legal" className="srs-footer">
      <div className="srs-footer-top">
        <Wordmark />
        <nav aria-label="Footer navigation">
          <a href="#courses">Courses</a>
          <a href="#experience">Experience</a>
          <a href="#outcomes">Outcomes</a>
          <a href="#apply">Apply</a>
        </nav>
      </div>
      <div className="srs-footer-legal">
        <p>© 2026 Sozorock Tech Inc. All rights reserved.</p>
        <p>SozoRockSchool is a professional development and technical skills initiative owned and operated by Sozorock Tech Inc. Programs are structured for professional development and do not grant public vocational degrees or provincial career college diplomas.</p>
      </div>
    </footer>
  );
}

export function SozoRockSchoolHomepage() {
  return (
    <div id="top" className="srs-page">
      <a className="srs-skip-link" href="#courses">Skip to courses</a>
      <HeroScene />
      <CoursesSection />
      <ExperienceSection />
      <OutcomesSection />
      <ApplySection />
      <LegalFooter />
    </div>
  );
}
