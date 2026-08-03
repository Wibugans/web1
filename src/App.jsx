import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Play, Mic2, Zap, Smartphone, ListMusic, Wifi, 
  Terminal, Target, Download, Check, Shield, Monitor,
  Music, Volume2, Globe, Layers, ArrowRight
} from 'lucide-react';
import img1 from './assets/1.jpg';
import img2 from './assets/2.jpg';
import './index.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function Section({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={stagger}>
      {children}
    </motion.div>
  );
}

const APK_URL = 'https://github.com/Wibugans/AusDMusic/releases/download/Rilis/androidApp-universal-release-sign.apk';
const WINDOWS_URL = 'https://github.com/Wibugans/AusDMusic/releases/download/windows/AusDMusic-8.9.1.exe';

export default function App() {
  const [version, setVersion] = useState('v8.9.1');
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    fetch('https://api.github.com/repos/Wibugans/AusDMusic/releases/latest')
      .then(r => r.json())
      .then(data => { if (data?.tag_name) setVersion(data.tag_name); })
      .catch(() => setVersion('v8.9.1'));
  }, []);

  useEffect(() => {
    const audio = new Audio('/lagu.mp3');
    audio.loop = true;
    audio.volume = 0.8;
    audioRef.current = audio;

    const tryPlay = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    };

    // Auto-play immediately (invisible interaction)
    audio.play().then(() => setIsPlaying(true)).catch(() => {
      const startOnInteraction = () => {
        tryPlay();
        ['click', 'scroll', 'touchstart', 'keydown'].forEach(e => 
          document.removeEventListener(e, startOnInteraction)
        );
      };
      ['click', 'scroll', 'touchstart', 'keydown'].forEach(e =>
        document.addEventListener(e, startOnInteraction, { once: false })
      );
    });

    return () => { audio.pause(); };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <>
      <div className="bg-mesh" />

      {/* FLOATING NAVBAR */}
      <div className="nav-wrapper">
        <nav>
          <a href="#" className="nav-logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            AusDMusic
          </a>
          <div className="nav-links">
            <a href="#fitur" className="nav-link">Features</a>
            <a href="#blog" className="nav-link">Updates</a>
            <a href="#pengembang" className="nav-link">About</a>
          </div>
          <a href="#download" className="nav-cta">Download</a>
        </nav>
      </div>

      <div className="page">
        {/* HERO */}
        <section className="hero">
          <Section>
            <motion.div variants={fadeUp}>
              <div className="hero-badge">
                <span className="badge-dot" />
                <span>AusDMusic <span className="badge-highlight">{version}</span> is now available</span>
              </div>
            </motion.div>
            <motion.h1 variants={fadeUp}>
              Experience music <br />
              <span className="hero-gradient-text">without boundaries.</span>
            </motion.h1>
            <motion.p className="hero-sub" variants={fadeUp}>
              A premium, ad-free streaming client with real-time lyrics, offline playback, and an uncompromising design aesthetic. Engineered for performance.
            </motion.p>
            <motion.div className="hero-actions" variants={fadeUp}>
              <a href={APK_URL} className="btn-primary" download>
                <Smartphone size={20} /> Get for Android
              </a>
              <a href={WINDOWS_URL} className="btn-secondary" download>
                <Monitor size={20} /> Get for Windows
              </a>
            </motion.div>

            <motion.div className="hero-visual" variants={fadeUp}>
              <div className="hero-glow" />
              <div className="hero-visual-inner">
                <img src={img2} alt="AusDMusic Interface" className="hero-visual-img" />
              </div>
            </motion.div>
          </Section>
        </section>

        {/* BENTO GRID FEATURES */}
        <section id="fitur" className="section-pad">
          <div className="container">
            <Section>
              <div className="section-header">
                <div className="section-tag">Architecture</div>
                <h2 className="section-title">Designed for perfection.</h2>
                <p className="section-sub">Every pixel and interaction is crafted to provide a fluid, immersive listening experience that respects your time and attention.</p>
              </div>

              <div className="bento-grid">
                {/* Large Bento */}
                <motion.div className="bento-item bento-large" variants={fadeUp}>
                  <div className="bento-icon"><Globe size={24} /></div>
                  <h3 className="bento-title">Infinite Streaming</h3>
                  <p className="bento-desc">Harness the power of an unlimited music catalog. Stream millions of tracks ad-free, with seamless playback transitions and intelligent buffering that never skips a beat.</p>
                  <Globe className="bento-bg-icon" />
                </motion.div>

                {/* Standard Bentos */}
                <motion.div className="bento-item" variants={fadeUp}>
                  <div className="bento-icon"><Mic2 size={24} /></div>
                  <h3 className="bento-title">Real-time Lyrics</h3>
                  <p className="bento-desc">Perfectly synced lyrics that scroll dynamically as the song progresses.</p>
                  <Mic2 className="bento-bg-icon" />
                </motion.div>

                <motion.div className="bento-item" variants={fadeUp}>
                  <div className="bento-icon"><Layers size={24} /></div>
                  <h3 className="bento-title">Native UX</h3>
                  <p className="bento-desc">Fluid animations and material elements that feel inherently native to your device.</p>
                  <Layers className="bento-bg-icon" />
                </motion.div>

                {/* Wide Bento */}
                <motion.div className="bento-item bento-wide" variants={fadeUp}>
                  <div className="bento-icon"><Wifi size={24} /></div>
                  <h3 className="bento-title">True Offline Mode</h3>
                  <p className="bento-desc">Download entire libraries in high fidelity. Complete with metadata and lyrics, your music stays with you even when the connection drops.</p>
                  <Wifi className="bento-bg-icon" />
                </motion.div>

                <motion.div className="bento-item" variants={fadeUp}>
                  <div className="bento-icon"><Zap size={24} /></div>
                  <h3 className="bento-title">Blazing Fast</h3>
                  <p className="bento-desc">Zero telemetry, zero bloat. Instant launches.</p>
                  <Zap className="bento-bg-icon" />
                </motion.div>
              </div>
            </Section>
          </div>
        </section>

        {/* BLOG / UPDATES */}
        <section id="blog" className="section-pad">
          <div className="container">
            <Section>
              <div className="section-header">
                <div className="section-tag">Changelog</div>
                <h2 className="section-title">Continuous iteration.</h2>
              </div>

              <div className="blog-grid">
                <motion.a href="#" className="blog-card" variants={fadeUp}>
                  <div className="blog-tag">Release</div>
                  <h3 className="blog-title">AusDMusic v8.9.1: The Desktop Evolution</h3>
                  <p className="blog-excerpt">Our biggest update yet brings the full AusDMusic experience to Windows PC, complete with cross-platform synchronization and memory optimizations.</p>
                  <div className="blog-footer">
                    <span>Aug 2, 2026</span>
                    <span className="read-more">Read notes &rarr;</span>
                  </div>
                </motion.a>

                <motion.a href="#" className="blog-card" variants={fadeUp}>
                  <div className="blog-tag">Engineering</div>
                  <h3 className="blog-title">Migrating to Compose Multiplatform</h3>
                  <p className="blog-excerpt">How we unified our Android and Windows codebase using Kotlin Multiplatform, reducing technical debt by 40% while improving rendering performance.</p>
                  <div className="blog-footer">
                    <span>Jul 28, 2026</span>
                    <span className="read-more">Read article &rarr;</span>
                  </div>
                </motion.a>

                <motion.a href="#" className="blog-card" variants={fadeUp}>
                  <div className="blog-tag">Roadmap</div>
                  <h3 className="blog-title">The Future of Audio Playback</h3>
                  <p className="blog-excerpt">A look ahead at what's coming: AI-driven equalizers, spatial audio enhancements, and algorithmic playlist generation.</p>
                  <div className="blog-footer">
                    <span>Jul 20, 2026</span>
                    <span className="read-more">View roadmap &rarr;</span>
                  </div>
                </motion.a>
              </div>
            </Section>
          </div>
        </section>

        {/* DOWNLOAD / CTA */}
        <section id="download" className="section-pad download-section">
          <div className="container">
            <Section>
              <motion.div className="dl-card" variants={fadeUp}>
                <h2 className="section-title">Start listening.</h2>
                <p className="section-sub" style={{ margin: '0 auto' }}>
                  Available now for Android and Windows. <br />
                  Free forever. Open source. No subscriptions.
                </p>

                <div className="dl-buttons">
                  <a href={APK_URL} className="btn-primary" download>
                    <Smartphone size={20} /> Download for Android
                  </a>
                  <a href={WINDOWS_URL} className="btn-secondary" download>
                    <Monitor size={20} /> Download for Windows
                  </a>
                </div>

                <div className="dl-chips">
                  <div className="chip"><Check size={16} /> Auto-updates</div>
                  <div className="chip"><Shield size={16} /> Privacy First</div>
                  <div className="chip"><Terminal size={16} /> Open Source</div>
                </div>
              </motion.div>
            </Section>
          </div>
        </section>

        {/* FOOTER */}
        <footer>
          <div className="container">
            <div className="footer-inner">
              <div className="footer-brand">
                <Music size={20} /> AusDMusic
              </div>
              <div className="footer-links">
                <a href="#fitur" className="footer-link">Features</a>
                <a href="#blog" className="footer-link">Updates</a>
                <a href="https://github.com/Wibugans/AusDMusic" target="_blank" rel="noreferrer" className="footer-link">GitHub</a>
              </div>
              <div className="footer-copy">
                Created by Yusril When &bull; &copy; 2026 AusDMusic. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* DISCREET MUSIC CONTROLLER */}
      <div className="music-controller" onClick={toggleAudio} title={isPlaying ? "Pause background music" : "Play background music"}>
        {isPlaying ? <Volume2 size={20} /> : <Play size={20} />}
      </div>
    </>
  );
}
