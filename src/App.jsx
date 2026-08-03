import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Play, Mic2, Zap, Smartphone, Wifi,
  Terminal, Check, Monitor, Volume2,
  Download, ArrowRight, Headphones
} from 'lucide-react';
import img1 from './assets/1.jpg';
import img2 from './assets/2.jpg';
import appIcon from '/icon.png';
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
          <img src={appIcon} alt="AusDMusic" className="nav-logo-img" />
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
                  Versi terbaru {version} sudah tersedia
                </div>
              </motion.div>

              <motion.h1 variants={fadeUp}>
                Bukan sekadar<br />
                <span className="hero-text-gradient">pemutar musik biasa.</span>
              </motion.h1>

              <motion.p className="hero-sub" variants={fadeUp}>
                AusDMusic dibuat karena frustrasi dengan aplikasi musik yang penuh iklan dan terasa lambat.
                Hasilnya? Aplikasi yang ringan, cantik, dan benar-benar gratis — tanpa syarat tersembunyi.
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
                  <img src={appIcon} alt="" style={{width:36,height:36,borderRadius:10}} />
                  <div>
                    <div className="float-label">Bebas Iklan</div>
                    <div className="float-value">100% Gratis</div>
                  </div>
                </div>
                <div className="hero-float-card hero-float-right">
                  <div className="float-icon float-icon-green">
                    <Headphones size={18} color="#000" />
                  </div>
                  <div>
                    <div className="float-label">Kualitas Audio</div>
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
                  { num: '0', unit: ' iklan', label: 'Tanpa iklan sama sekali', color: '#a78bfa' },
                  { num: '60', unit: 'fps', label: 'Animasi layar mulus', color: '#0bf0c4' },
                  { num: '8.9', unit: '.1', label: 'Versi stabil terkini', color: '#f72585' },
                  { num: '2', unit: ' OS', label: 'Android & Windows', color: '#22c55e' },
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
                  Tiap kata menyala<br />tepat saat dinyanyikan.
                </h2>
                <p className="feature-desc">
                  Pernah kehilangan momen terbaik lagu hanya karena harus buka tab baru cari lirik? Di AusDMusic, lirik langsung muncul dan bergulir sendiri — akurat, sinkron, bahkan bisa diterjemahkan otomatis.
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
                  Di hutan, di pesawat,<br />tanpa sinyal pun bisa.
                </h2>
                <p className="feature-desc">
                  Simpan lagu favorit kamu sebelum bepergian. AusDMusic menyimpan audio dalam kualitas asli beserta lirik dan artwork — bukan sekadar cache sementara yang hilang setelah beberapa hari.
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
                  Tidak rakus baterai.<br />Tidak lambat. Titik.
                </h2>
                <p className="feature-desc">
                  Kode ditulis native di Kotlin, bukan dibungkus framework web. Hasilnya terasa seperti langsung menyentuh perangkat keras — respons instan, transisi mulus, dan konsumsi baterai yang sangat hemat.
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
                <div className="section-eyebrow">Beda dari yang lain</div>
                <h2 className="section-title-large">Kenapa pilih AusDMusic?</h2>
                <p className="section-subtitle">Bukan soal fitur yang paling banyak. Tapi soal yang benar-benar penting buat kamu setiap hari.</p>
              </div>
            </AnimWrap>
            <StaggerWrap>
              <div className="why-grid">
                {[
                  {
                    icon: <ShieldCheck size={32} />, cls: 'wi-purple', top: 'why-top-purple',
                    title: 'Data kamu tetap milikmu',
                    desc: 'Tidak ada akun yang perlu dibuat. Tidak ada data yang dikirim ke mana pun. Bahkan pengembangnya sendiri tidak bisa melihat apa yang kamu dengarkan.'
                  },
                  {
                    icon: <Sparkles size={32} />, cls: 'wi-cyan', top: 'why-top-cyan',
                    title: 'Terasa mahal, tapi gratis',
                    desc: 'Antarmuka yang biasanya hanya ada di aplikasi berbayar — animasi smooth, font bersih, layout yang rapi. Semua ini gratis dan open source.'
                  },
                  {
                    icon: <Code2 size={32} />, cls: 'wi-pink', top: 'why-top-pink',
                    title: 'Dirawat dengan serius',
                    desc: 'Bukan proyek yang dibiarkan mati. Bug dilaporkan hari ini, bisa jadi sudah diperbaiki minggu depan. Pengembang aktif dan komunikatif di GitHub.'
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
                <div className="section-eyebrow">Download</div>
                <h2 className="section-title-large">Pilih sesuai perangkatmu.</h2>
                <p className="section-subtitle">Satu kodebase, dua platform. Tampilan dan fitur yang identik antara HP dan laptop kamu.</p>
              </div>
            </AnimWrap>
            <StaggerWrap>
              <div className="platform-grid">
                <motion.div className="platform-card platform-card-android" variants={slideLeft}>
                  <img src={appIcon} alt="Android" className="platform-icon" style={{width: 64, height: 64, margin: '0 auto 20px'}} />
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
                  <img src={appIcon} alt="Windows" className="platform-icon" style={{width: 64, height: 64, margin: '0 auto 20px'}} />
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
                    <div className="dev-title">Developer & Desainer · Indonesia 🇮🇩</div>
                    <p className="dev-bio">
                      Mulai koding karena iseng, terus karena cinta. Membuat AusDMusic sebagai solusi pribadi yang akhirnya tumbuh jadi proyek open source yang dipakai banyak orang.
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
                  <div className="section-eyebrow">Cerita di Baliknya</div>
                  <h2 className="dev-info-title">Satu orang.<br />Satu aplikasi.<br />Banyak malam begadang.</h2>
                  <p className="dev-info-desc">
                    AusDMusic dimulai bukan karena ingin terkenal. Tapi karena tidak ada aplikasi musik yang benar-benar memuaskan — semuanya entah penuh iklan, entah lambat, atau entah tampilannya membosankan.
                  </p>
                  <p className="dev-info-desc">
                    Jadi dibuat sendiri. Ditulis dari nol, diuji di banyak HP, diperbaiki berulang kali sampai terasa pas. Sekarang kodenya terbuka untuk siapapun yang mau berkontribusi atau sekadar belajar.
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
              <div className="cta-tag">Yuk mulai</div>
              <h2 className="cta-title">
                Instal sekarang.<br />
                <span style={{ color: 'var(--purple-light)' }}>Gratis. Beneran.</span>
              </h2>
              <p className="cta-sub">
                Tidak perlu daftar akun, tidak ada kartu kredit, tidak ada versi "free trial". Langsung instal, langsung main musik.
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
                  <img src={appIcon} alt="AusDMusic" style={{width:32,height:32,borderRadius:8}} />
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
