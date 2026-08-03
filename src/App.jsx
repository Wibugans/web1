import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Play, Mic2, Zap, Smartphone, ListMusic, Wifi,
  Terminal, Check, Shield, Monitor, Volume2, Music,
  Download, Globe, ArrowRight, Star, Users, Clock, Headphones
} from 'lucide-react';
import img1 from './assets/1.jpg';
import img2 from './assets/2.jpg';
import './index.css';

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};
const slideRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

function AnimWrap({ children, variants = fadeUp, once = true }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-80px' });
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={variants}>
      {children}
    </motion.div>
  );
}

function StaggerWrap({ children, once = true }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-80px' });
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={stagger}>
      {children}
    </motion.div>
  );
}

const APK_URL = 'https://github.com/Wibugans/AusDMusic/releases/download/Rilis/androidApp-universal-release-sign.apk';
const WIN_URL = 'https://github.com/Wibugans/AusDMusic/releases/download/windows/AusDMusic-8.9.1.exe';

export default function App() {
  const [version, setVersion] = useState('v8.9.1');
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    fetch('https://api.github.com/repos/Wibugans/AusDMusic/releases/latest')
      .then(r => r.json()).then(d => { if (d?.tag_name) setVersion(d.tag_name); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const audio = new Audio('/lagu.mp3');
    audio.loop = true; audio.volume = 0.75;
    audioRef.current = audio;
    const play = () => audio.play().then(() => setIsPlaying(true)).catch(() => {});
    play();
    const onInteract = () => { play(); ['click','scroll','touchstart','keydown'].forEach(e => document.removeEventListener(e, onInteract)); };
    ['click','scroll','touchstart','keydown'].forEach(e => document.addEventListener(e, onInteract, {once:false}));
    return () => audio.pause();
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); }
    else { audioRef.current.play(); setIsPlaying(true); }
  };

  return (
    <>
      {/* ATMOSPHERIC BACKGROUND */}
      <div className="bg-atmosphere">
        <div className="atm-blob atm-1" />
        <div className="atm-blob atm-2" />
        <div className="atm-blob atm-3" />
      </div>

      {/* NAVBAR */}
      <nav>
        <a href="#" className="nav-logo">
          <div className="nav-logo-icon">
            <Music size={20} color="#fff" />
          </div>
          AusDMusic
        </a>
        <div className="nav-links">
          <a href="#features" className="nav-link">Fitur</a>
          <a href="#platform" className="nav-link">Platform</a>
          <a href="#developer" className="nav-link">Pengembang</a>
        </div>
        <div className="nav-actions">
          <a href="#platform" className="nav-btn-outline">
            <Download size={16} /> Download
          </a>
          <a href="https://github.com/Wibugans/AusDMusic" target="_blank" rel="noreferrer" className="nav-btn-primary">
            GitHub
          </a>
        </div>
      </nav>

      <div className="page">

        {/* ===== HERO ===== */}
        <section className="hero">
          <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp} style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="hero-eyebrow">
                  <span className="eyebrow-dot" />
                  AusDMusic {version} — Now on Windows & Android
                </div>
              </motion.div>

              <motion.h1 variants={fadeUp}>
                Musik tanpa batas.<br />
                <span className="hero-text-gradient">Suara yang sebenarnya.</span>
              </motion.h1>

              <motion.p className="hero-sub" variants={fadeUp}>
                Pemutar musik premium lintas platform yang dibangun untuk mereka yang peduli pada kualitas.
                Bebas iklan, open source, dengan lirik real-time dan antarmuka yang memukau.
              </motion.p>

              <motion.div className="hero-cta-group" variants={fadeUp}>
                <a href={APK_URL} className="btn-hero-primary" download>
                  <Smartphone size={22} /> Download Android
                </a>
                <a href={WIN_URL} className="btn-hero-secondary" download>
                  <Monitor size={22} /> Download Windows
                </a>
              </motion.div>
            </motion.div>

            {/* PHONE MOCKUP */}
            <AnimWrap variants={fadeIn}>
              <div className="hero-visual">
                <div className="hero-phone-outer">
                  <div className="hero-phone-notch" />
                  <div className="hero-phone-screen">
                    <img src={img2} alt="AusDMusic Player Interface" />
                  </div>
                </div>
                <div className="hero-phone-glow" />

                {/* Floating cards */}
                <div className="hero-float-card hero-float-left">
                  <div className="float-icon float-icon-cyan">
                    <Mic2 size={18} color="#000" />
                  </div>
                  <div>
                    <div className="float-label">Lyrics Mode</div>
                    <div className="float-value">Real-time Sync</div>
                  </div>
                </div>
                <div className="hero-float-card hero-float-right">
                  <div className="float-icon float-icon-green">
                    <Headphones size={18} color="#000" />
                  </div>
                  <div>
                    <div className="float-label">Audio Quality</div>
                    <div className="float-value">Lossless HD</div>
                  </div>
                </div>
              </div>
            </AnimWrap>
          </div>
        </section>

        {/* ===== STATS BAR ===== */}
        <div className="stats-bar">
          <div className="container">
            <StaggerWrap>
              <div className="stats-inner">
                {[
                  { num: '100', unit: '%', label: 'Bebas Iklan', color: '#a78bfa' },
                  { num: '60', unit: 'fps', label: 'Animasi Native', color: '#0bf0c4' },
                  { num: '8.9', unit: '', label: 'Versi Stabil', color: '#f72585' },
                  { num: '2', unit: '+', label: 'Platform Didukung', color: '#22c55e' },
                ].map((s, i) => (
                  <motion.div key={i} className="stat-item" variants={fadeUp}>
                    <div className="stat-number" style={{ color: s.color }}>
                      {s.num}<span className="stat-unit">{s.unit}</span>
                    </div>
                    <div className="stat-desc">{s.label}</div>
                  </motion.div>
                ))}
              </div>
            </StaggerWrap>
          </div>
        </div>

        {/* ===== FEATURE 1: LYRICS ===== */}
        <section id="features" className="feature-section">
          <div className="container">
            <div className="feature-layout">
              <AnimWrap variants={slideLeft}>
                <div className="feature-label label-purple">
                  <Mic2 size={14} /> Lirik Premium
                </div>
                <h2 className="feature-title">
                  Lirik tersinkronisasi yang<br />bergerak bersama lagu.
                </h2>
                <p className="feature-desc">
                  Setiap kata menyala tepat saat dinyanyikan. AusDMusic mendukung tampilan lirik real-time dengan terjemahan otomatis dari jutaan lagu di seluruh dunia. Tak perlu buka tab browser lain.
                </p>
                <div className="feature-checks">
                  {[
                    'Sinkronisasi lirik karakter per karakter',
                    'Terjemahan multi-bahasa otomatis',
                    'Mode Karaoke dengan highlight dinamis',
                    'Unduh lirik untuk digunakan offline',
                  ].map((c, i) => (
                    <div key={i} className="check-item">
                      <div className="check-icon check-purple">✓</div>
                      {c}
                    </div>
                  ))}
                </div>
              </AnimWrap>
              <AnimWrap variants={slideRight}>
                <div className="feature-visual">
                  <div className="fv-glow fv-glow-purple" />
                  <div className="fv-phone">
                    <img src={img2} alt="Lyrics Mode" />
                  </div>
                  <div className="fv-badge" style={{ top: '10%', right: '-30px' }}>
                    <div className="fv-badge-title">Now Displaying</div>
                    <div className="fv-badge-val" style={{ color: '#a78bfa' }}>🎵 Synced Lyrics</div>
                  </div>
                </div>
              </AnimWrap>
            </div>
          </div>
        </section>

        {/* ===== FEATURE 2: OFFLINE ===== */}
        <section className="feature-section feature-section--alt">
          <div className="container">
            <div className="feature-layout feature-layout--reverse">
              <AnimWrap variants={slideRight}>
                <div className="feature-label label-cyan">
                  <Wifi size={14} /> Offline Mode
                </div>
                <h2 className="feature-title">
                  Unduh sekali,<br />dengarkan selamanya.
                </h2>
                <p className="feature-desc">
                  Tidak ada sinyal? Tidak masalah. Simpan seluruh album favorit Anda beserta lirik dan metadata ke penyimpanan lokal. Kualitas audio tetap terjaga sempurna, tidak ada kompresi tambahan.
                </p>
                <div className="feature-checks">
                  {[
                    'Format FLAC & MP3 320kbps didukung',
                    'Metadata & artwork otomatis tersimpan',
                    'Lirik ikut tersimpan saat diunduh',
                    'Manajemen storage yang cerdas',
                  ].map((c, i) => (
                    <div key={i} className="check-item">
                      <div className="check-icon check-cyan">✓</div>
                      {c}
                    </div>
                  ))}
                </div>
              </AnimWrap>
              <AnimWrap variants={slideLeft}>
                <div className="feature-visual">
                  <div className="fv-glow fv-glow-cyan" />
                  <div className="fv-phone">
                    <img src={img2} alt="Offline Mode" />
                  </div>
                  <div className="fv-badge" style={{ bottom: '15%', left: '-30px' }}>
                    <div className="fv-badge-title">Status</div>
                    <div className="fv-badge-val" style={{ color: '#0bf0c4' }}>✓ Available Offline</div>
                  </div>
                </div>
              </AnimWrap>
            </div>
          </div>
        </section>

        {/* ===== FEATURE 3: PERFORMANCE ===== */}
        <section className="feature-section">
          <div className="container">
            <div className="feature-layout">
              <AnimWrap variants={slideLeft}>
                <div className="feature-label label-pink">
                  <Zap size={14} /> Performa Tinggi
                </div>
                <h2 className="feature-title">
                  Ringan di baterai,<br />berat dalam fitur.
                </h2>
                <p className="feature-desc">
                  Ditulis dalam Kotlin native dengan optimasi memori tingkat lanjut. AusDMusic beroperasi di latar belakang tanpa menguras baterai, memutar musik dengan latensi serendah mungkin.
                </p>
                <div className="feature-checks">
                  {[
                    'Konsumsi RAM di bawah 150MB',
                    'Startup kurang dari 0.5 detik',
                    'Animasi UI native 60fps',
                    'Tanpa pelacak atau telemetri tersembunyi',
                  ].map((c, i) => (
                    <div key={i} className="check-item">
                      <div className="check-icon check-pink">✓</div>
                      {c}
                    </div>
                  ))}
                </div>
              </AnimWrap>
              <AnimWrap variants={slideRight}>
                <div className="feature-visual">
                  <div className="fv-glow fv-glow-pink" />
                  <div className="fv-phone">
                    <img src={img2} alt="Performance" />
                  </div>
                  <div className="fv-badge" style={{ top: '10%', right: '-30px' }}>
                    <div className="fv-badge-title">CPU Usage</div>
                    <div className="fv-badge-val" style={{ color: '#f72585' }}>≤ 3%</div>
                  </div>
                </div>
              </AnimWrap>
            </div>
          </div>
        </section>

        {/* ===== WHY AUSDDMUSIC ===== */}
        <section className="why-section">
          <div className="container">
            <AnimWrap>
              <div className="center">
                <div className="section-eyebrow">Kenapa AusDMusic?</div>
                <h2 className="section-title-large">Dibuat dengan standar yang lebih tinggi.</h2>
                <p className="section-subtitle">Kami tidak berkompromi pada privasi, performa, atau estetika. Setiap keputusan desain diambil demi pengalaman terbaik Anda.</p>
              </div>
            </AnimWrap>
            <StaggerWrap>
              <div className="why-grid">
                {[
                  {
                    icon: '🛡️', cls: 'wi-purple', top: 'why-top-purple',
                    title: 'Privasi Mutlak',
                    desc: 'Zero telemetri. Tidak ada data pengguna yang dikumpulkan atau dikirim ke server mana pun. Kode sumber terbuka untuk siapa saja yang ingin memverifikasinya.'
                  },
                  {
                    icon: '🎨', cls: 'wi-cyan', top: 'why-top-cyan',
                    title: 'Desain Tanpa Kompromi',
                    desc: 'Setiap piksel dirancang dengan cermat. Menggunakan Jetpack Compose untuk animasi yang terasa native dan transisi yang membuat Anda tidak mau menutup aplikasinya.'
                  },
                  {
                    icon: '⚡', cls: 'wi-pink', top: 'why-top-pink',
                    title: 'Selalu Diperbarui',
                    desc: 'Tim pengembang aktif merilis pembaruan secara konsisten. Setiap bug yang dilaporkan komunitas ditangani serius dan diperbaiki dengan cepat.'
                  },
                ].map((w, i) => (
                  <motion.div key={i} className={`why-card ${w.top}`} variants={fadeUp}>
                    <div className={`why-icon-wrap ${w.cls}`}>{w.icon}</div>
                    <h3 className="why-card-title">{w.title}</h3>
                    <p className="why-card-desc">{w.desc}</p>
                  </motion.div>
                ))}
              </div>
            </StaggerWrap>
          </div>
        </section>

        {/* ===== PLATFORM SECTION ===== */}
        <section id="platform" className="platform-section">
          <div className="container">
            <AnimWrap>
              <div className="center">
                <div className="section-eyebrow">Tersedia Di</div>
                <h2 className="section-title-large">Satu aplikasi, dua platform.</h2>
                <p className="section-subtitle">Pengalaman mendengarkan yang konsisten dan premium, baik di genggaman maupun di meja kerja Anda.</p>
              </div>
            </AnimWrap>
            <StaggerWrap>
              <div className="platform-grid">
                <motion.div className="platform-card platform-card-android" variants={slideLeft}>
                  <div className="platform-icon pi-android">🤖</div>
                  <h3 className="platform-title">Android</h3>
                  <span className="platform-version pv-android">Versi 8.9.1 · Universal APK</span>
                  <p className="platform-desc">
                    Dioptimalkan untuk semua perangkat Android 8.0 ke atas. Mendukung arsitektur arm64-v8a, armeabi-v7a, dan x86_64 dalam satu file APK universal yang ringan.
                  </p>
                  <div className="platform-features">
                    {['Android 8.0+', 'arm64 / x86', 'Material You', 'Offline Support', 'Background Play'].map(f => (
                      <span key={f} className="pf-chip">{f}</span>
                    ))}
                  </div>
                  <a href={APK_URL} className="btn-platform btn-android" download>
                    <Smartphone size={20} /> Download APK
                  </a>
                </motion.div>

                <motion.div className="platform-card platform-card-windows" variants={slideRight}>
                  <div className="platform-icon pi-windows">🖥️</div>
                  <h3 className="platform-title">Windows PC</h3>
                  <span className="platform-version pv-windows">Versi 8.9.1 · 64-bit Installer</span>
                  <p className="platform-desc">
                    Aplikasi desktop native dengan tampilan yang identik dengan versi Android. Dibuat menggunakan Kotlin Multiplatform dan Compose Desktop untuk performa maksimal di Windows 10/11.
                  </p>
                  <div className="platform-features">
                    {['Windows 10/11', '64-bit', 'MPV Engine', 'Full Screen', 'Keyboard Shortcuts'].map(f => (
                      <span key={f} className="pf-chip">{f}</span>
                    ))}
                  </div>
                  <a href={WIN_URL} className="btn-platform btn-windows" download>
                    <Monitor size={20} /> Download .exe
                  </a>
                </motion.div>
              </div>
            </StaggerWrap>
          </div>
        </section>

        {/* ===== DEVELOPER PROFILE ===== */}
        <section id="developer" className="dev-section">
          <div className="container">
            <StaggerWrap>
              <div className="dev-layout">
                <motion.div variants={fadeUp}>
                  <div className="dev-card">
                    <div className="dev-avatar">
                      <img src={img1} alt="Yusril When" />
                    </div>
                    <div className="dev-name">Yusril When</div>
                    <div className="dev-title">Software Engineer & Mobile Developer</div>
                    <p className="dev-bio">
                      Pengembang independen berbasis Indonesia yang berfokus pada rekayasa aplikasi Android berkualitas tinggi, desain antarmuka yang elegan, dan pengalaman pengguna yang bermakna.
                    </p>
                    <div className="dev-links">
                      <a href="https://github.com/Wibugans" target="_blank" rel="noreferrer" className="dev-link">
                        <span>🐙 GitHub / Wibugans</span>
                        <ArrowRight size={16} className="dev-link-arrow" />
                      </a>
                      <a href="https://saweria.co/yusrilwhen" target="_blank" rel="noreferrer" className="dev-link">
                        <span>☕ Dukung Lewat Saweria</span>
                        <ArrowRight size={16} className="dev-link-arrow" />
                      </a>
                      <a href="https://github.com/Wibugans/AusDMusic" target="_blank" rel="noreferrer" className="dev-link">
                        <span>⭐ Beri Bintang di GitHub</span>
                        <ArrowRight size={16} className="dev-link-arrow" />
                      </a>
                    </div>
                  </div>
                </motion.div>

                <motion.div className="dev-info" variants={fadeUp}>
                  <div className="section-eyebrow">Di Balik Aplikasi</div>
                  <h2 className="dev-info-title">Satu pengembang, standar setara industri.</h2>
                  <p className="dev-info-desc">
                    AusDMusic lahir dari keresahan terhadap pemutar musik modern yang semakin hari semakin penuh iklan, semakin rakus data, dan semakin membosankan tampilannya.
                  </p>
                  <p className="dev-info-desc">
                    Dibangun seluruhnya menggunakan Kotlin Multiplatform dan Jetpack Compose, aplikasi ini dirancang dengan prinsip Clean Architecture agar mudah dikembangkan, aman, dan transparan bagi siapa saja yang ingin melihat kodenya.
                  </p>

                  <div className="timeline">
                    <div className="timeline-title">Perjalanan Pengembangan</div>
                    <div className="tl-list">
                      {[
                        { icon: '🚀', date: 'Agustus 2026', title: 'Ekspansi ke Windows PC', sub: 'Rilis pertama aplikasi desktop AusDMusic menggunakan Compose Multiplatform, mendukung Windows 10/11 secara native.' },
                        { icon: '🎨', date: 'Juli 2026', title: 'Rebrand Total: AusDMusic', sub: 'Identitas baru, desain UI yang dirombak sepenuhnya, dan sistem animasi yang diperbarui untuk pengalaman yang lebih premium.' },
                        { icon: '📖', date: 'April 2026', title: 'Sistem Lirik Real-time', sub: 'Integrasi sistem lirik tersinkronisasi dengan akurasi tinggi dan dukungan terjemahan multi-bahasa.' },
                        { icon: '⚡', date: '2025', title: 'Fondasi Diletakkan', sub: 'Pengembangan awal dimulai sebagai fork dari SimpMusic dengan tujuan jangka panjang untuk menjadi aplikasi streaming terbaik.' },
                      ].map((t, i) => (
                        <div key={i} className="tl-item">
                          <div className="tl-dot">{t.icon}</div>
                          <div className="tl-content">
                            <div className="tl-date">{t.date}</div>
                            <div className="tl-text">{t.title}</div>
                            <div className="tl-sub">{t.sub}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </StaggerWrap>
          </div>
        </section>

        {/* ===== DOWNLOAD CTA ===== */}
        <section className="cta-section">
          <div className="cta-glow" />
          <div className="container cta-inner">
            <AnimWrap>
              <div className="cta-tag">Mulai Sekarang</div>
              <h2 className="cta-title">
                Rasakan perbedaannya.<br />
                <span style={{ color: 'var(--purple-light)' }}>Gratis selamanya.</span>
              </h2>
              <p className="cta-sub">
                Tidak perlu mendaftar. Tidak ada langganan berbayar. Hanya musik berkualitas tinggi yang bisa Anda nikmati langsung setelah instalasi.
              </p>
              <div className="cta-buttons">
                <a href={APK_URL} className="cta-btn cta-btn-primary" download>
                  <Smartphone size={24} /> Download untuk Android
                </a>
                <a href={WIN_URL} className="cta-btn cta-btn-secondary" download>
                  <Monitor size={24} /> Download untuk Windows
                </a>
              </div>
              <div className="cta-chips">
                <div className="cta-chip"><div className="chip-dot" style={{ background: '#22c55e' }} /> Bebas Iklan</div>
                <div className="cta-chip"><div className="chip-dot" style={{ background: '#a78bfa' }} /> 100% Open Source</div>
                <div className="cta-chip"><div className="chip-dot" style={{ background: '#0bf0c4' }} /> Tanpa Akun</div>
                <div className="cta-chip"><div className="chip-dot" style={{ background: '#f72585' }} /> Update Otomatis</div>
              </div>
            </AnimWrap>
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <footer>
          <div className="container">
            <div className="footer-grid">
              <div className="footer-brand">
                <a href="#" className="footer-logo">
                  <div className="footer-logo-icon"><Music size={18} color="#fff" /></div>
                  AusDMusic
                </a>
                <p className="footer-tagline">
                  Pemutar musik premium lintas platform yang dibuat untuk mereka yang peduli pada kualitas audio dan privasi.
                </p>
                <div className="footer-social">
                  <a href="https://github.com/Wibugans/AusDMusic" target="_blank" rel="noreferrer" className="social-btn">GH</a>
                  <a href="https://saweria.co/yusrilwhen" target="_blank" rel="noreferrer" className="social-btn">☕</a>
                </div>
              </div>
              <div>
                <div className="footer-col-title">Produk</div>
                <div className="footer-links-list">
                  <a href="#features" className="footer-link">Fitur Lengkap</a>
                  <a href="#platform" className="footer-link">Platform</a>
                  <a href={APK_URL} className="footer-link" download>Download Android</a>
                  <a href={WIN_URL} className="footer-link" download>Download Windows</a>
                </div>
              </div>
              <div>
                <div className="footer-col-title">Pengembang</div>
                <div className="footer-links-list">
                  <a href="#developer" className="footer-link">Profil</a>
                  <a href="https://github.com/Wibugans/AusDMusic" target="_blank" rel="noreferrer" className="footer-link">Source Code</a>
                  <a href="https://github.com/Wibugans/AusDMusic/releases" target="_blank" rel="noreferrer" className="footer-link">Riwayat Rilis</a>
                  <a href="https://github.com/Wibugans/AusDMusic/issues" target="_blank" rel="noreferrer" className="footer-link">Laporkan Bug</a>
                </div>
              </div>
              <div>
                <div className="footer-col-title">Informasi</div>
                <div className="footer-links-list">
                  <a href="#" className="footer-link">Kebijakan Privasi</a>
                  <a href="#" className="footer-link">Lisensi (GPL-3.0)</a>
                  <a href="https://saweria.co/yusrilwhen" target="_blank" rel="noreferrer" className="footer-link">Donasi</a>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <div className="footer-copy">© 2026 AusDMusic oleh Yusril When. Dirilis di bawah lisensi GPL-3.0.</div>
              <div className="footer-legal">
                <a href="#">Privasi</a>
                <a href="#">Ketentuan</a>
                <a href="#">Lisensi</a>
              </div>
            </div>
          </div>
        </footer>

      </div>

      {/* MUSIC CONTROLLER */}
      <button className="music-controller" onClick={toggleAudio} title={isPlaying ? 'Pause musik' : 'Play musik'}>
        {isPlaying ? <Volume2 size={22} /> : <Play size={22} />}
      </button>
    </>
  );
}
