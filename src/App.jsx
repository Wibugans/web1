import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { 
  Play, Mic2, Zap, Smartphone, Wifi, 
  Terminal, Shield, Monitor, Check,
  Music, Volume2, Globe, Layers
} from 'lucide-react';
import img2 from './assets/2.jpg';
import './index.css';

// Parallax Section Wrapper
function ParallaxSection({ children, offset = 50 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
  const springY = useSpring(y, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div ref={ref}>
      <motion.div style={{ y: springY }}>
        {children}
      </motion.div>
    </div>
  );
}

// Staggered Fade Up
const fadeUp = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

// Interactive 3D Card
function BentoCard({ children, className = "" }) {
  const cardRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });

    // 3D Tilt calculation
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    }
  };

  return (
    <motion.div 
      ref={cardRef}
      className={`bento-card ${className}`}
      variants={fadeUp}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        '--mouse-x': `${position.x}px`,
        '--mouse-y': `${position.y}px`,
      }}
    >
      <div className="bento-spotlight" />
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
  
  // Hero Parallax Setup
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const imgY = useTransform(scrollY, [0, 1000], [0, -150]);

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
      <div className="aurora-bg">
        <div className="aurora-blob aurora-1"></div>
        <div className="aurora-blob aurora-2"></div>
        <div className="aurora-blob aurora-3"></div>
      </div>
      <div className="noise-overlay" />

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
          </div>
          <a href="#download" className="nav-cta">Download Now</a>
        </nav>
      </div>

      <div className="page-wrapper">
        {/* HERO */}
        <section className="hero">
          <motion.div 
            style={{ y: heroY, opacity: heroOpacity }}
            initial="hidden" animate="visible" variants={staggerContainer}
            className="container"
          >
            <motion.div variants={fadeUp} style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="hero-badge">
                <span className="badge-dot" />
                <span>AusDMusic <span style={{color:'#fff'}}>{version}</span> Released</span>
              </div>
            </motion.div>
            
            <motion.h1 variants={fadeUp}>
              Immersive audio. <br />
              <span className="hero-gradient-text">Absolute freedom.</span>
            </motion.h1>
            
            <motion.p className="hero-sub" variants={fadeUp}>
              Experience a highly animated, deeply immersive streaming client. Fully open source, visually breathtaking, and engineered to run flawlessly on Windows and Android.
            </motion.p>
            
            <motion.div className="hero-actions" variants={fadeUp}>
              <a href={APK_URL} className="btn-animated" download>
                <span><Smartphone size={20} style={{display:'inline', verticalAlign:'middle', marginRight:8}}/> Android APK</span>
              </a>
              <a href={WINDOWS_URL} className="btn-animated" download>
                <span><Monitor size={20} style={{display:'inline', verticalAlign:'middle', marginRight:8}}/> Windows PC</span>
              </a>
            </motion.div>
          </motion.div>

          <motion.div className="hero-visual-wrapper" style={{ y: imgY }} initial={{opacity:0, y:100}} animate={{opacity:1, y:0}} transition={{delay: 0.6, duration: 1}}>
            <div className="hero-visual-inner">
              <img src={img2} alt="AusDMusic App" className="hero-visual-img" />
            </div>
            {/* Floating Ornaments */}
            <div className="floating-element float-1">
              <div style={{display:'flex', alignItems:'center', gap:10, color:'#fff', fontWeight:600}}>
                <div style={{background:'linear-gradient(135deg, #00d2ff, #3a7bd5)', padding:8, borderRadius:12}}><Music size={20}/></div>
                Lossless Audio
              </div>
            </div>
            <div className="floating-element float-2">
              <div style={{display:'flex', alignItems:'center', gap:10, color:'#fff', fontWeight:600}}>
                <div style={{background:'linear-gradient(135deg, #ff00b3, #7000ff)', padding:8, borderRadius:12}}><Mic2 size={20}/></div>
                Synced Lyrics
              </div>
            </div>
          </motion.div>
        </section>

        {/* FEATURES - INTERACTIVE BENTO GRID */}
        <section id="fitur" className="section-pad">
          <div className="container">
            <ParallaxSection offset={30}>
              <div className="section-header">
                <div className="section-tag">Next-Gen Architecture</div>
                <h2 className="section-title">Beyond limits.</h2>
                <p className="section-sub">Interact with the cards below. Built with Framer Motion and 3D CSS transforms for a fluid, tactile experience.</p>
              </div>
            </ParallaxSection>

            <motion.div 
              className="bento-grid"
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <BentoCard className="bento-large">
                <div className="bento-icon"><Globe size={32} /></div>
                <h3 className="bento-title">Infinite Universe</h3>
                <p className="bento-desc">Dive into a limitless catalog of high-fidelity music without a single ad interrupting your flow. The backend aggressively caches data to ensure instant playback anywhere on Earth.</p>
                <Globe className="bento-bg-icon" />
              </BentoCard>

              <BentoCard>
                <div className="bento-icon"><Mic2 size={32} /></div>
                <h3 className="bento-title">Dynamic Lyrics</h3>
                <p className="bento-desc">Real-time synced lyrics that glow and scroll alongside the music tempo.</p>
                <Mic2 className="bento-bg-icon" />
              </BentoCard>

              <BentoCard>
                <div className="bento-icon"><Layers size={32} /></div>
                <h3 className="bento-title">Immersive UX</h3>
                <p className="bento-desc">Silky smooth 60fps animations wrapped in an award-winning aesthetic.</p>
                <Layers className="bento-bg-icon" />
              </BentoCard>

              <BentoCard className="bento-wide">
                <div className="bento-icon"><Wifi size={32} /></div>
                <h3 className="bento-title">Uncompromising Offline</h3>
                <p className="bento-desc">Your music, your rules. Download thousands of tracks and lyrics with one tap. Zero DRM restrictions, pure freedom.</p>
                <Wifi className="bento-bg-icon" />
              </BentoCard>
              
              <BentoCard>
                <div className="bento-icon"><Zap size={32} /></div>
                <h3 className="bento-title">Hyper Fast</h3>
                <p className="bento-desc">Written in Kotlin for maximum hardware utilization.</p>
                <Zap className="bento-bg-icon" />
              </BentoCard>
            </motion.div>
          </div>
        </section>

        {/* DOWNLOAD / CTA */}
        <section id="download" className="section-pad download-section">
          <div className="container">
            <ParallaxSection offset={-40}>
              <div className="dl-card">
                <h2 className="section-title">The future of audio.</h2>
                <p className="section-sub" style={{ margin: '0 auto', color: '#fff' }}>
                  Available today for Android and Windows. <br />
                  No ads. No tracking. Just pure music.
                </p>

                <div className="dl-buttons">
                  <a href={APK_URL} className="btn-animated" download>
                    <span><Smartphone size={20} style={{display:'inline', verticalAlign:'middle', marginRight:8}}/> Android APK</span>
                  </a>
                  <a href={WINDOWS_URL} className="btn-animated" download>
                    <span><Monitor size={20} style={{display:'inline', verticalAlign:'middle', marginRight:8}}/> Windows PC</span>
                  </a>
                </div>

                <div className="dl-chips">
                  <div className="chip"><Check size={16} /> Auto Updates</div>
                  <div className="chip"><Shield size={16} /> Maximum Privacy</div>
                  <div className="chip"><Terminal size={16} /> Open Source</div>
                </div>
              </div>
            </ParallaxSection>
          </div>
        </section>

        {/* FOOTER */}
        <footer>
          <div className="container">
            <div className="footer-inner">
              <div className="footer-brand">
                <div style={{background:'linear-gradient(135deg, #00d2ff, #7000ff)', padding:8, borderRadius:12, color:'#fff'}}>
                  <Music size={24} />
                </div>
                AusDMusic
              </div>
              <div className="footer-links">
                <a href="#fitur" className="footer-link">Features</a>
                <a href="https://github.com/Wibugans/AusDMusic" target="_blank" rel="noreferrer" className="footer-link">Source Code</a>
              </div>
              <div className="footer-copy">
                Created by Yusril When &bull; &copy; 2026 AusDMusic. Open Source under GPL-3.0.
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* DISCREET MUSIC CONTROLLER */}
      <div className="music-controller" onClick={toggleAudio} title={isPlaying ? "Pause audio" : "Play audio"}>
        {isPlaying ? <Volume2 size={24} /> : <Play size={24} />}
      </div>
    </>
  );
}
