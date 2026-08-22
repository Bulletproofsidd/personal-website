import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Github, Linkedin, Mail, ChevronLeft, ChevronRight, ArrowUpRight,
  Radio, Zap, Layers, Users, Boxes, Sun, Moon,
} from "lucide-react";

/* ============================================================
   EDIT THESE THREE LINES WITH YOUR REAL LINKS BEFORE DEPLOYING
   ============================================================ */
const LINKS = {
  github: "https://github.com/Bulletproofsidd",
  linkedin: "https://linkedin.com/in/your-profile", // <-- replace
  email: "your-email@example.com",                  // <-- replace
};

const STACK = [
  { label: "languages", items: ["JavaScript (ES6+)", "HTML5", "CSS3/Sass", "Python", "Java", "C++"] },
  { label: "frontend", items: ["React.js", "Tailwind CSS", "Material-UI", "Responsive Design", "Webpack/Vite"] },
  { label: "backend", items: ["Node.js", "Express.js", "REST API Design", "MVC Architecture", "JWT", "bcrypt"] },
  { label: "real-time & communication", items: ["Socket.IO", "WebSockets"] },
  { label: "databases & caching", items: ["MongoDB (Mongoose)", "MySQL", "Redis", "DB Clustering & Optimization"] },
  { label: "devops & tools", items: ["Git/GitHub", "Docker", "CI/CD (GitHub Actions)", "Linux", "Vercel", "Railway"] },
  { label: "testing & quality", items: ["Postman", "Unit & Integration Testing", "k6"] },
];

const PROJECTS = [
  {
    tag: "flagship",
    name: "chat-app",
    blurb:
      "Real-time MERN chat, clustered on Node.js with Socket.io fanned out over Redis pub/sub so any server can reach any socket. Adding cluster mode took the failed-request rate under load from 91% to 0%, measured with k6.",
    stack: ["React", "Node.js", "Socket.io", "Redis", "MongoDB", "JWT"],
    github: "https://github.com/Bulletproofsidd/chat-app",
    live: "https://chat-app-frontend-two-xi.vercel.app",
  },
  {
    tag: "product",
    name: "Unscroll",
    blurb:
      "An Android app that intervenes on doomscrolling using UsageStatsManager and a rule-based risk engine, backed by a Node/Express + Socket.io service. Roadmap includes a real-time web dashboard and group focus sessions.",
    stack: ["Android", "Node.js", "Express", "Socket.io", "MongoDB", "JWT"],
    github: null,
    live: null,
  },
  {
    tag: "e-commerce",
    name: "Furni",
    blurb:
      "A complete MERN storefront — auth, sessions, and password hashing built from scratch, product catalog and checkout flow wired end-to-end on MongoDB.",
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT", "bcrypt"],
    github: null,
    live: null,
  },
];

const STATS = [
  { icon: Zap, value: "0%", label: "failed requests under load — down from 91%, after adding cluster mode", tone: "lime" },
  { icon: Users, value: "100+", label: "students reached running IBM ICE Committee workshops", tone: "grey" },
  { icon: Boxes, value: "3", label: "shipped MERN projects, backend to frontend, solo", tone: "grey" },
  { icon: Layers, value: "8+", label: "core tools in daily rotation — Node, Redis, Socket.io, and more", tone: "grey" },
];

function ProjectCards() {
  const [active, setActive] = useState(0);
  const dragStart = useRef(null);

  const go = useCallback((dir) => {
    setActive((a) => (a + dir + PROJECTS.length) % PROJECTS.length);
  }, []);

  const onPointerDown = (e) => { dragStart.current = e.clientX; };
  const onPointerUp = (e) => {
    if (dragStart.current === null) return;
    const delta = e.clientX - dragStart.current;
    if (delta > 60) go(-1);
    else if (delta < -60) go(1);
    dragStart.current = null;
  };

  return (
    <div className="stage">
      <div className="stage-3d" onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
        {PROJECTS.map((p, i) => {
          let offset = i - active;
          if (offset > PROJECTS.length / 2) offset -= PROJECTS.length;
          if (offset < -PROJECTS.length / 2) offset += PROJECTS.length;
          const isActive = offset === 0;
          return (
            <div
              key={p.name}
              className={`card ${isActive ? "card-active" : ""}`}
              style={{
                transform: `translateX(${offset * 62}%) rotateY(${offset * -32}deg) scale(${1 - Math.abs(offset) * 0.14})`,
                zIndex: 10 - Math.abs(offset),
                opacity: Math.abs(offset) > 1 ? 0 : 1,
                pointerEvents: isActive ? "auto" : "none",
              }}
              onClick={() => !isActive && setActive(i)}
            >
              <span className="card-tag">{p.tag}</span>
              <h3 className="card-title">{p.name}</h3>
              <p className="card-blurb">{p.blurb}</p>
              <div className="card-stack">
                {p.stack.map((s) => <span key={s} className="chip">{s}</span>)}
              </div>
              <div className="card-links">
                {p.github && (
                  <a href={p.github} target="_blank" rel="noreferrer" className="card-link">
                    <Github size={15} /> repo
                  </a>
                )}
                {p.live && (
                  <a href={p.live} target="_blank" rel="noreferrer" className="card-link">
                    <ArrowUpRight size={15} /> live
                  </a>
                )}
                {!p.github && !p.live && <span className="card-link muted">private repo</span>}
              </div>
            </div>
          );
        })}
      </div>
      <div className="stage-controls">
        <button aria-label="previous project" onClick={() => go(-1)}><ChevronLeft size={18} /></button>
        <div className="dots">
          {PROJECTS.map((_, i) => (
            <button key={i} aria-label={`go to project ${i + 1}`} className={`dot ${i === active ? "dot-active" : ""}`} onClick={() => setActive(i)} />
          ))}
        </div>
        <button aria-label="next project" onClick={() => go(1)}><ChevronRight size={18} /></button>
      </div>
    </div>
  );
}

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

export default function Portfolio() {
  const [theme, setTheme] = useState("light");
  const [heroRef, heroIn] = useReveal();
  const [visualRef, visualIn] = useReveal();
  const [floatRef, floatIn] = useReveal();
  const [aboutRef, aboutIn] = useReveal();
  const [statRef, statIn] = useReveal();
  const [stackRef, stackIn] = useReveal();
  const [projRef, projIn] = useReveal();
  const [connectRef, connectIn] = useReveal();
  return (
    <div className="root" data-theme={theme}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        html { scroll-behavior: smooth; }
        section[id] { scroll-margin-top: 84px; }

        * { box-sizing: border-box; }
        .root {
          --blue-a: #1b4fe0;
          --blue-b: #0a2a8c;
          --lime: #d6ff4f;
          --ink: #0b0d12;
          --white: #ffffff;
          --offwhite: #f6f7f9;
          --grey-card: #eef0f4;
          --muted: #6b7280;
          --text-dark: #10131a;
          --border: rgba(16,19,26,0.08);
          background: var(--white);
          color: var(--text-dark);
          font-family: 'Inter', system-ui, sans-serif;
          min-height: 100vh;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
          transition: background 0.25s ease, color 0.25s ease;
        }
        .root[data-theme="dark"] {
          --white: #0e1116;
          --offwhite: #141821;
          --grey-card: #1b2029;
          --muted: #9aa3b5;
          --text-dark: #eef1f7;
          --border: rgba(255,255,255,0.10);
        }
        .root[data-theme="dark"] .float-card,
        .root[data-theme="dark"] .card {
          box-shadow: 0 20px 40px -18px rgba(0,0,0,0.55);
        }
        .root[data-theme="dark"] .float-card.dark { border: 1px solid rgba(255,255,255,0.12); }
        .root[data-theme="dark"] .nav { background: rgba(14,17,22,0.85); }
        .root[data-theme="dark"] .connect-email { color: var(--ink); background: var(--lime); }
        h1, h2, h3 { font-family: 'Space Grotesk', system-ui, sans-serif; margin: 0; }
        .mono { font-family: 'JetBrains Mono', monospace; }
        a { color: inherit; text-decoration: none; }
        button { font-family: inherit; cursor: pointer; }

        .nav {
          position: sticky; top: 0; z-index: 50;
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px clamp(20px, 5vw, 64px);
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--border);
        }
        .logo { font-weight: 700; font-size: 18px; letter-spacing: 0.02em; }
        .logo span { color: var(--blue-a); }
        .nav-links { display: none; gap: 28px; font-size: 13.5px; letter-spacing: 0.04em; text-transform: uppercase; color: var(--muted); }
        .nav-links a:hover { color: var(--text-dark); }
        .nav-right { display: flex; align-items: center; gap: 10px; }
        .icon-btn {
          display: flex; align-items: center; justify-content: center;
          width: 36px; height: 36px; border-radius: 10px;
          border: 1px solid var(--border); color: var(--muted);
          transition: all 0.2s ease;
        }
        .icon-btn:hover { color: var(--blue-a); border-color: var(--blue-a); }
        .pill {
          display: inline-flex; align-items: center; gap: 6px;
          background: var(--lime); color: var(--ink);
          font-size: 12.5px; font-weight: 700; letter-spacing: 0.02em;
          padding: 10px 18px; border-radius: 999px;
        }
        .pill:hover { filter: brightness(0.96); }

        /* HERO */
        .hero {
          position: relative;
          background: linear-gradient(135deg, var(--blue-a), var(--blue-b) 70%);
          padding: clamp(50px, 8vw, 90px) clamp(20px, 5vw, 64px) 130px;
          overflow: visible;
        }
        .hero-inner { max-width: 700px; }
        .hero h1 {
          color: var(--white); font-size: clamp(34px, 5.2vw, 56px);
          line-height: 1.1; font-weight: 700; letter-spacing: -0.01em;
        }
        .hero h1 .hl { color: var(--lime); }
        .hero p {
          color: rgba(255,255,255,0.78); margin-top: 18px; font-size: 15.5px;
          line-height: 1.7; max-width: 52ch;
        }
        .hero-cta { margin-top: 28px; }
        .hero-status {
          margin-top: 26px; display: flex; align-items: center; gap: 8px;
          font-size: 13px; color: rgba(255,255,255,0.7);
        }
        .hero-status .live-dot {
          width: 8px; height: 8px; border-radius: 50%; background: var(--lime);
          box-shadow: 0 0 0 0 rgba(214,255,79,0.6);
          animation: livePulse 1.8s infinite;
        }
        @keyframes livePulse {
          0% { box-shadow: 0 0 0 0 rgba(214,255,79,0.5); }
          70% { box-shadow: 0 0 0 9px rgba(214,255,79,0); }
          100% { box-shadow: 0 0 0 0 rgba(214,255,79,0); }
        }
        .hero-visual {
          position: absolute; right: clamp(10px, 5vw, 60px); top: clamp(30px, 6vw, 60px);
          width: min(46vw, 400px); height: min(46vw, 400px);
          border-radius: 28px;
          background:
            radial-gradient(120% 120% at 20% 15%, rgba(214,255,79,0.28), transparent 55%),
            radial-gradient(100% 100% at 85% 85%, rgba(255,255,255,0.18), transparent 60%),
            linear-gradient(160deg, rgba(255,255,255,0.10), rgba(255,255,255,0.02));
          border: 1px solid rgba(255,255,255,0.15);
          display: none;
          align-items: center; justify-content: center;
        }
        @media (min-width: 860px) { .hero-visual { display: flex; } }

        .code-window {
          width: 86%; border-radius: 12px; overflow: hidden;
          background: rgba(10,15,30,0.55); backdrop-filter: blur(6px);
          border: 1px solid rgba(255,255,255,0.14);
          box-shadow: 0 20px 50px -20px rgba(0,0,0,0.5);
          transform: rotate(-2deg);
        }
        .cw-head {
          display: flex; align-items: center; gap: 6px;
          padding: 10px 12px; background: rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .cw-head .dot { width: 9px; height: 9px; border-radius: 50%; }
        .cw-head .dot.r { background: #ff5f57; }
        .cw-head .dot.y { background: #febc2e; }
        .cw-head .dot.g { background: #28c840; }
        .cw-file { margin-left: 8px; font-family: 'JetBrains Mono', monospace; font-size: 11px; color: rgba(255,255,255,0.6); }
        .cw-badge {
          margin-left: auto; display: flex; align-items: center; gap: 6px;
          font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--lime);
        }
        .cw-body {
          padding: 16px 14px; font-family: 'JetBrains Mono', monospace;
          font-size: 12.5px; line-height: 1.9; color: rgba(255,255,255,0.82);
          white-space: pre;
        }
        .cw-body-single { padding: 34px 18px; white-space: normal; font-size: 14px; }
        .tok-kw { color: var(--lime); }
        .tok-fn { color: #7dd3fc; }
        .tok-str { color: #fca5f1; }
        .cw-comment { color: rgba(255,255,255,0.4); font-style: italic; }

        /* FLOATING CARD ROW */
        .float-row {
          position: relative; z-index: 5;
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 16px; margin-top: -90px;
          padding: 0 clamp(20px, 5vw, 64px);
        }
        .float-card {
          background: var(--white); border-radius: 16px; padding: 18px;
          box-shadow: 0 20px 40px -18px rgba(10,25,80,0.25);
          border: 1px solid var(--border);
        }
        .float-card.dark { background: var(--ink); color: var(--white); }
        .float-card .fc-label { font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.05em; }
        .float-card.dark .fc-label { color: rgba(255,255,255,0.55); }
        .float-card .fc-chips { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
        .float-card .fc-stat { font-size: 26px; font-weight: 700; font-family: 'Space Grotesk', sans-serif; margin-top: 6px; }
        .float-card .fc-sub { font-size: 12.5px; color: var(--muted); margin-top: 4px; line-height: 1.4; }
        .float-card.dark .fc-sub { color: rgba(255,255,255,0.7); }
        .float-card .fc-status { display: flex; align-items: center; gap: 8px; margin-top: 10px; font-size: 13px; }
        .float-card .fc-icon { width: 30px; height: 30px; border-radius: 8px; background: var(--grey-card); display: flex; align-items: center; justify-content: center; color: var(--blue-a); margin-bottom: 10px; }

        section { position: relative; padding: 0 clamp(20px, 5vw, 64px); }

        /* ABOUT */
        .about { padding-top: 140px; padding-bottom: 40px; }
        .about-eyebrow { font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--blue-a); font-weight: 600; margin-bottom: 14px; }
        .about h2 {
          font-size: clamp(24px, 4vw, 40px); line-height: 1.25; max-width: 15ch; font-weight: 600;
        }
        .about h2 .accent { color: var(--muted); }
        .about-body { margin-top: 20px; color: var(--muted); max-width: 60ch; font-size: 15px; line-height: 1.75; }
        .value-list { list-style: none; padding: 0; margin: 22px 0 0; max-width: 56ch; display: flex; flex-direction: column; gap: 10px; }
        .value-list li { font-size: 14px; color: var(--text-dark); padding-left: 22px; position: relative; line-height: 1.5; }
        .value-list li::before { content: ''; position: absolute; left: 0; top: 7px; width: 8px; height: 8px; border-radius: 2px; background: var(--lime); }

        .stat-grid {
          margin-top: 46px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px;
        }
        .stat-card { border-radius: 16px; padding: 20px; min-height: 150px; display: flex; flex-direction: column; justify-content: space-between; }
        .stat-card.grey { background: var(--grey-card); color: var(--text-dark); }
        .stat-card.lime { background: var(--lime); color: var(--ink); }
        .stat-card .sc-value { font-size: 30px; font-weight: 700; font-family: 'Space Grotesk', sans-serif; }
        .stat-card .sc-label { font-size: 12.5px; line-height: 1.5; opacity: 0.75; margin-top: 8px; }

        /* STACK */
        section.block { padding-top: 90px; }
        .section-head { display: flex; align-items: baseline; gap: 12px; margin-bottom: 34px; }
        .section-head .cmd { color: var(--blue-a); font-size: 13px; font-weight: 600; letter-spacing: 0.03em; text-transform: uppercase; }
        .section-head h2 { font-size: clamp(22px, 3vw, 28px); }
        .stack-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; }
        .stack-group { border: 1px solid var(--border); background: var(--offwhite); border-radius: 14px; padding: 18px; }
        .stack-group .glabel { font-size: 11.5px; color: var(--blue-a); letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 12px; display: block; font-weight: 600; }
        .stack-group .items { display: flex; flex-wrap: wrap; gap: 8px; }
        .chip { font-size: 12.5px; font-family: 'JetBrains Mono', monospace; padding: 5px 10px; border-radius: 7px; background: var(--white); border: 1px solid var(--border); color: var(--text-dark); }
        .float-card .chip { background: var(--offwhite); }
        .float-card.dark .chip { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.15); color: var(--white); }

        /* PROJECTS 3D STAGE */
        .stage { position: relative; padding-bottom: 40px; }
        .stage-3d { position: relative; height: 340px; perspective: 1200px; display: flex; align-items: center; justify-content: center; touch-action: pan-y; }
        .card {
          position: absolute; width: min(78vw, 420px);
          background: var(--offwhite); border: 1px solid var(--border); border-radius: 18px;
          padding: 26px; transition: transform 0.45s cubic-bezier(.22,.9,.28,1), opacity 0.4s ease;
          transform-style: preserve-3d; cursor: pointer;
        }
        .card-active { cursor: default; box-shadow: 0 30px 60px -24px rgba(27,79,224,0.25); border-color: rgba(27,79,224,0.25); }
        .card-tag { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--blue-a); text-transform: uppercase; letter-spacing: 0.06em; font-weight: 600; }
        .card-title { font-size: 22px; margin-top: 8px; margin-bottom: 10px; }
        .card-blurb { font-size: 14px; color: var(--muted); line-height: 1.6; min-height: 84px; }
        .card-stack { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 14px; }
        .card-links { display: flex; gap: 16px; margin-top: 18px; }
        .card-link { display: flex; align-items: center; gap: 6px; font-size: 13px; color: var(--blue-a); font-weight: 600; }
        .card-link.muted { color: var(--muted); font-weight: 400; }
        .stage-controls { display: flex; align-items: center; justify-content: center; gap: 18px; margin-top: 10px; }
        .stage-controls button:not(.dot) { width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--border); background: var(--offwhite); color: var(--muted); display: flex; align-items: center; justify-content: center; }
        .stage-controls button:not(.dot):hover { color: var(--blue-a); border-color: var(--blue-a); }
        .dots { display: flex; gap: 8px; }
        .dot { width: 7px; height: 7px; border-radius: 50%; border: none; background: var(--border); padding: 0; }
        .dot-active { background: var(--blue-a); width: 20px; border-radius: 4px; }

        /* CONNECT */
        .connect { text-align: center; padding-top: 100px; padding-bottom: 90px; }
        .connect h2 { font-size: clamp(26px, 4vw, 40px); }
        .connect p { color: var(--muted); margin-top: 12px; }
        .connect-email {
          display: inline-flex; align-items: center; gap: 10px; margin-top: 26px;
          font-family: 'JetBrains Mono', monospace; font-size: clamp(15px, 2.4vw, 20px);
          padding: 14px 24px; border-radius: 12px; background: var(--ink); color: var(--lime);
        }
        .connect-email:hover { filter: brightness(1.15); }
        .email-label { display: block; font-size: 11px; letter-spacing: 0.08em; color: var(--muted); margin-top: 26px; }
        .connect-row { display: flex; justify-content: center; gap: 12px; margin-top: 22px; }

        footer { border-top: 1px solid var(--border); padding: 22px clamp(20px, 5vw, 64px); display: flex; justify-content: space-between; color: var(--muted); font-size: 12.5px; }

        @media (min-width: 720px) { .nav-links { display: flex; } }
        @media (max-width: 900px) { .float-row { grid-template-columns: repeat(2, 1fr); margin-top: 20px; } .hero { padding-bottom: 40px; } }
        @media (max-width: 560px) { .stat-grid { grid-template-columns: repeat(2, 1fr); } }

        /* SCROLL REVEAL */
        .reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.7s cubic-bezier(.22,.9,.28,1), transform 0.7s cubic-bezier(.22,.9,.28,1); }
        .reveal-in { opacity: 1; transform: translateY(0); }
        .float-card { opacity: 0; transform: translateY(26px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .float-row.reveal-in .float-card { opacity: 1; transform: translateY(0); }
        .float-row.reveal-in .float-card:nth-child(1) { transition-delay: 0s; }
        .float-row.reveal-in .float-card:nth-child(2) { transition-delay: 0.1s; }
        .float-row.reveal-in .float-card:nth-child(3) { transition-delay: 0.2s; }
        .float-row.reveal-in .float-card:nth-child(4) { transition-delay: 0.3s; }
        .stat-card { opacity: 0; transform: translateY(26px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .stat-grid.reveal-in .stat-card { opacity: 1; transform: translateY(0); }
        .stat-grid.reveal-in .stat-card:nth-child(1) { transition-delay: 0s; }
        .stat-grid.reveal-in .stat-card:nth-child(2) { transition-delay: 0.1s; }
        .stat-grid.reveal-in .stat-card:nth-child(3) { transition-delay: 0.2s; }
        .stat-grid.reveal-in .stat-card:nth-child(4) { transition-delay: 0.3s; }
        @media (prefers-reduced-motion: reduce) {
          .reveal, .float-card, .stat-card { transition: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>

      <nav className="nav">
        <div />
        <div className="nav-links">
          <a href="#stack">Stack</a>
          <a href="#projects">Projects</a>
          <a href="#connect">Connect</a>
        </div>
        <div className="nav-right">
          <button className="icon-btn" onClick={() => setTheme(theme === "light" ? "dark" : "light")} aria-label="toggle theme">
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          <a className="icon-btn" href={LINKS.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={16} /></a>
          <a className="icon-btn" href={LINKS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={16} /></a>
          <a className="pill" href={`mailto:${LINKS.email}`}>SAY HI <ArrowUpRight size={14} /></a>
        </div>
      </nav>

      <section className="hero">
        <div ref={heroRef} className={`hero-inner reveal ${heroIn ? "reveal-in" : ""}`}>
          <h1>Building real-time systems <span className="hl">that don't fall over.</span></h1>
          <p>
            I've always liked
            the parts of a product most people never see — what happens on the server
            when a thousand people hit it at once, why a socket drops, why a query is
            slow. That's the stuff I spend my free time on, and it's what this site
            is built to show.
          </p>
          <div className="hero-cta">
            <a className="pill" style={{ padding: "13px 24px", fontSize: "13px" }} href="#connect">GET IN TOUCH <ArrowUpRight size={14} /></a>
          </div>
          <div className="hero-status">
            <span className="live-dot" /> Open to startup / full-stack roles right now
          </div>
        </div>
        <div ref={visualRef} className={`hero-visual reveal ${visualIn ? "reveal-in" : ""}`}>
          <div className="code-window">
            <div className="cw-head">
              <span className="dot r" /><span className="dot y" /><span className="dot g" />
              <span className="cw-file">cluster.js</span>
              <span className="cw-badge"><span className="live-dot" style={{ background: "#22c55e" }} /> clustered</span>
            </div>
            <div className="cw-body cw-body-single">
              <span className="tok-fn">console</span>.<span className="tok-fn">log</span>(<span className="tok-str">"Scale the systems."</span>);
            </div>
          </div>
        </div>
      </section>

      <div ref={floatRef} className={`float-row ${floatIn ? "reveal-in" : ""}`}>
        <div className="float-card">
          <div className="fc-icon"><Layers size={15} /></div>
          <span className="fc-label">Core Stack</span>
          <div className="fc-chips">
            <span className="chip">React</span>
            <span className="chip">Node.js</span>
            <span className="chip">Socket.io</span>
          </div>
        </div>
        <div className="float-card">
          <span className="fc-label">Failed Requests</span>
          <div className="fc-stat">91% → 0%</div>
          <div className="fc-sub">after adding Node.js cluster mode, verified with k6</div>
        </div>
        <div className="float-card dark">
          <span className="fc-label">Expertise</span>
          <div className="fc-sub" style={{ color: "rgba(255,255,255,0.85)", fontSize: "13.5px", marginTop: "10px" }}>
            Backend-leaning full-stack — real-time systems, MERN, and cluster architecture.
          </div>
        </div>
        <div className="float-card">
          <div className="fc-icon"><Radio size={15} /></div>
          <span className="fc-label">Status</span>
          <div className="fc-status">
            <span className="live-dot" style={{ background: "#22c55e" }} /> Available for work
          </div>
          <div className="fc-sub">reply within a day, usually sooner</div>
        </div>
      </div>

      <section className="about">
        <div ref={aboutRef} className={`reveal ${aboutIn ? "reveal-in" : ""}`}>
          <div className="about-eyebrow">• ABOUT ME</div>
          <h2>A CS student building systems that stay <span className="accent">reliable</span> and <span className="accent">adaptive</span></h2>
          <p className="about-body">
            I care more about what happens under load than what happens in the demo.
            My flagship project is a real-time chat app where clustering the Node.js
            server took failed requests under load from 91% down to 0% — that's the
            kind of problem I want to keep solving, at a startup that ships fast and
            builds for scale from day one.
          </p>
          <ul className="value-list">
            <li>Owns a feature end-to-end — frontend, backend, and the database in between</li>
            <li>Builds for the load it'll actually see, not just the demo</li>
            <li>Ships fast, but hands off work that's documented and easy to pick up</li>
          </ul>
        </div>

        <div ref={statRef} className={`stat-grid ${statIn ? "reveal-in" : ""}`}>
          {STATS.map((s) => (
            <div key={s.label} className={`stat-card ${s.tone}`}>
              <s.icon size={20} />
              <div>
                <div className="sc-value">{s.value}</div>
                <div className="sc-label">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="block" id="stack">
        <div ref={stackRef} className={`reveal ${stackIn ? "reveal-in" : ""}`}>
          <div className="section-head">
            <span className="cmd mono">Stack</span>
            <h2>Tools I build with</h2>
          </div>
          <div className="stack-grid">
            {STACK.map((g) => (
              <div className="stack-group" key={g.label}>
                <span className="glabel">{g.label}</span>
                <div className="items">
                  {g.items.map((it) => <span className="chip" key={it}>{it}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block" id="projects">
        <div ref={projRef} className={`reveal ${projIn ? "reveal-in" : ""}`}>
          <div className="section-head">
            <span className="cmd mono">Projects</span>
            <h2>Drag, click, or use the arrows</h2>
          </div>
          <ProjectCards />
        </div>
      </section>

      <section className="connect" id="connect">
        <div ref={connectRef} className={`reveal ${connectIn ? "reveal-in" : ""}`}>
          <div className="about-eyebrow" style={{ justifyContent: "center", display: "flex" }}>• CONNECT</div>
          <h2>Want to build something real-time together?</h2>
          <p>Startup roles, backend-heavy projects, or just talking systems design — my inbox is open.</p>
          <a className="connect-email" href={`mailto:${LINKS.email}`}><Mail size={18} /> Email Me</a>
          <div className="connect-row">
            <a className="icon-btn" href={LINKS.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a>
            <a className="icon-btn" href={LINKS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a>
          </div>
        </div>
      </section>

    </div>
  );
}
