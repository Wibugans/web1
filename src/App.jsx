import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import img1 from './assets/1.jpg';
import img2 from './assets/2.jpg';
import './index.css';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

function Section({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={stagger}>
      {children}
    </motion.div>
  );
}

const features = [
  { icon: '🎵', color: 'purple', title: 'Streaming Gratis', desc: 'Dengarkan jutaan lagu dari YouTube Music tanpa biaya sepeser pun. Bebas iklan, bebas batas.' },
  { icon: '🎤', color: 'cyan', title: 'Lirik Tersinkronisasi', desc: 'Lirik ditampilkan secara real-time mengikuti lagu. Karaoke kapan saja, di mana saja.' },
  { icon: '⚡', color: 'orange', title: 'Ringan & Cepat', desc: 'Dibangun dengan performa terdepan. Buka instan, putar instan. Tidak ada lag, tidak ada buffering.' },
  { icon: '🎨', color: 'pink', title: 'UI Premium', desc: 'Antarmuka yang indah dan modern dengan dukungan Material You serta tema gelap yang memanjakan mata.' },
  { icon: '📋', color: 'green', title: 'Playlist Tak Terbatas', desc: 'Buat, simpan, dan kelola playlist sesukamu. Ekspor dan impor dengan mudah.' },
  { icon: '📶', color: 'blue', title: 'Mode Offline', desc: 'Unduh lagu favoritmu dan dengarkan tanpa koneksi internet. Musik kapanpun kamu mau.' },
];

const blogs = [
  {
    icon: '🚀',
    tag: 'Update',
    title: 'AusDMusic v8.9.1 — Apa Yang Baru Di Versi Ini?',
    excerpt: 'Rilis terbaru membawa perbaikan performa besar-besaran, antarmuka yang lebih halus, dan beberapa fitur baru yang sudah lama ditunggu komunitas.',
    date: '2 Agustus 2026',
    read: '3 min baca',
    gradient: 'linear-gradient(135deg, #1a0533, #2d0a5e)',
  },
  {
    icon: '🔧',
    tag: 'Pengembangan',
    title: 'Di Balik Layar: Bagaimana AusDMusic Dibangun',
    excerpt: 'Perjalanan membangun aplikasi musik modern menggunakan Kotlin Multiplatform, Jetpack Compose, dan arsitektur Clean Architecture yang solid.',
    date: '28 Juli 2026',
    read: '5 min baca',
    gradient: 'linear-gradient(135deg, #03213d, #063b5e)',
  },
  {
    icon: '🔮',
    tag: 'Rencana',
    title: 'Roadmap AusDMusic 2026 — Fitur Yang Akan Datang',
    excerpt: 'Integrasi AI, rekomendasi cerdas, equalizer bawaan, dan banyak lagi. Inilah yang sedang kami kerjakan untuk masa depan AusDMusic.',
    date: '20 Juli 2026',
    read: '4 min baca',
    gradient: 'linear-gradient(135deg, #1a1535, #2d2060)',
  },
];

const APK_URL = 'https://github.com/Wibugans/AusDMusic/releases/download/Rilis/androidApp-universal-release-sign.apk';

export default function App() {
  const [version, setVersion] = useState('v8.9.1');
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    fetch('https://api.github.com/repos/Wibugans/AusDMusic/releases/latest')
      .then(r => r.json())
      .then(data => { if (data?.tag_name) setVersion(data.tag_name); })
      .catch(() => setVersion('v8.9.1'));
  }, []);

  useEffect(() => {
    const audio = new Audio('/lagu.mp3');
    audio.loop = true;
    audio.volume = 0.25;
    audioRef.current = audio;

    const tryPlay = () => {
      audio.play().then(() => setMusicPlaying(true)).catch(() => {});
    };

    document.addEventListener('click', tryPlay, { once: true });
    document.addEventListener('keydown', tryPlay, { once: true });

    return () => {
      audio.pause();
      document.removeEventListener('click', tryPlay);
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (musicPlaying) {
      audio.pause();
      setMusicPlaying(false);
    } else {
      audio.play().then(() => setMusicPlaying(true)).catch(() => {});
    }
  };

  return (
    <>
      {/* Background */}
      <div className="bg-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      {/* Music Toggle Button */}
      <button className="music-btn" onClick={toggleMusic} title={musicPlaying ? 'Pause musik' : 'Putar musik'}>
        {musicPlaying ? '🔊' : '🔇'}
      </button>

      <div className="page">
        {/* NAV */}
        <nav>
          <a href="#" className="nav-logo">
            <span className="logo-dot" />
            AusDMusic
          </a>
          <div className="nav-links">
            <a href="#fitur" className="nav-link">Fitur</a>
            <a href="#blog" className="nav-link">Blog</a>
            <a href="#pengembang" className="nav-link">Pengembang</a>
            <a href={APK_URL} className="nav-cta" download>Download APK</a>
          </div>
        </nav>

        {/* HERO */}
        <section className="hero">
          <Section>
            <motion.div variants={fadeUp}>
              <div className="hero-badge">
                <span className="badge-dot" />
                Versi Terbaru {version} Sudah Tersedia
              </div>
            </motion.div>
            <motion.h1 variants={fadeUp}>
              Musik Tanpa Batas,<br />
              Pengalaman <em>Tanpa Kompromi</em>
            </motion.h1>
            <motion.p className="hero-sub" variants={fadeUp}>
              AusDMusic adalah pemutar musik Android yang bebas iklan, bertenaga tinggi,
              dengan lirik tersinkronisasi dan antarmuka premium yang terasa seperti buatan Anda sendiri.
            </motion.p>
            <motion.div className="hero-actions" variants={fadeUp}>
              <a href={APK_URL} className="btn-primary" download>
                <span>⬇</span> Download APK
              </a>
              <a href="#fitur" className="btn-outline">
                Lihat Fitur →
              </a>
            </motion.div>
            <motion.div className="hero-stats" variants={fadeUp}>
              <div className="stat">
                <div className="stat-val" style={{ color: '#a78bfa' }}>100%</div>
                <div className="stat-label">Bebas Iklan</div>
              </div>
              <div className="stat-sep" />
              <div className="stat">
                <div className="stat-val" style={{ color: '#22d3ee' }}>Open</div>
                <div className="stat-label">Source</div>
              </div>
              <div className="stat-sep" />
              <div className="stat">
                <div className="stat-val" style={{ color: '#f472b6' }}>8.9.1</div>
                <div className="stat-label">Versi Stabil</div>
              </div>
              <div className="stat-sep" />
              <div className="stat">
                <div className="stat-val" style={{ color: '#34d399' }}>Android</div>
                <div className="stat-label">8.0+</div>
              </div>
            </motion.div>
          </Section>
        </section>

        {/* FEATURES */}
        <section id="fitur" className="section-pad">
          <div className="container">
            <Section>
              <motion.div variants={fadeUp} className="section-header">
                <div className="section-tag">Fitur Unggulan</div>
                <h2 className="section-title">Semua Yang Kamu Butuhkan,<br />Dalam Satu Aplikasi</h2>
                <p className="section-sub">Dirancang untuk pecinta musik sejati yang tidak mau berkompromi soal kualitas dan kenyamanan.</p>
              </motion.div>
              <motion.div className="feat-grid" variants={stagger}>
                {features.map((f, i) => (
                  <motion.div key={i} className="feat-card" variants={fadeUp}>
                    <div className={`feat-icon feat-${f.color}`}>{f.icon}</div>
                    <div className="feat-title">{f.title}</div>
                    <div className="feat-desc">{f.desc}</div>
                  </motion.div>
                ))}
              </motion.div>
            </Section>
          </div>
        </section>

        {/* PREVIEW */}
        <section className="section-pad preview-bg">
          <div className="container">
            <Section>
              <div className="preview-grid">
                <motion.div className="preview-text" variants={fadeUp}>
                  <div className="section-tag">Tampilan Aplikasi</div>
                  <h2 className="section-title">Indah Di Setiap Sudut Layar</h2>
                  <p className="preview-desc">
                    Setiap elemen dirancang dengan teliti. Dari animasi transisi yang halus
                    hingga kartu lagu yang responsif — AusDMusic terasa premium dari detik pertama.
                  </p>
                  <ul className="preview-list">
                    <li>Animasi halus di setiap interaksi</li>
                    <li>Tema gelap yang tidak lelah di mata</li>
                    <li>Lirik terhubung real-time</li>
                    <li>Player mini yang selalu ada</li>
                    <li>Widget home screen yang cantik</li>
                  </ul>
                </motion.div>
                <motion.div className="preview-phone" variants={fadeUp}>
                  <div className="phone-glow" />
                  <div className="phone-wrap">
                    <img src={img2} alt="AusDMusic App Screenshot" className="phone-img" />
                  </div>
                </motion.div>
              </div>
            </Section>
          </div>
        </section>

        {/* BLOG */}
        <section id="blog" className="section-pad">
          <div className="container">
            <Section>
              <motion.div variants={fadeUp} className="section-header">
                <div className="section-tag">Blog Pengembang</div>
                <h2 className="section-title">Tulisan & Pembaruan</h2>
                <p className="section-sub">Ikuti perjalanan pengembangan AusDMusic — dari ide hingga rilis, semuanya ada di sini.</p>
              </motion.div>
              <motion.div className="blog-grid" variants={stagger}>
                {blogs.map((b, i) => (
                  <motion.div key={i} className="blog-card" variants={fadeUp}>
                    <div className="blog-thumb" style={{ background: b.gradient }}>
                      <span className="blog-thumb-icon">{b.icon}</span>
                    </div>
                    <div className="blog-body">
                      <span className="blog-tag">{b.tag}</span>
                      <div className="blog-title">{b.title}</div>
                      <div className="blog-excerpt">{b.excerpt}</div>
                      <div className="blog-footer">
                        <span className="blog-date">{b.date}</span>
                        <span className="blog-read">{b.read} →</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </Section>
          </div>
        </section>

        {/* DEVELOPER */}
        <section id="pengembang" className="section-pad dev-bg">
          <div className="container">
            <Section>
              <div className="dev-grid">
                <motion.div variants={fadeUp}>
                  <div className="dev-card">
                    <div className="dev-avatar">
                      <img src={img1} alt="Yusril When" />
                    </div>
                    <div className="dev-name">Yusril When</div>
                    <div className="dev-role">Developer & Designer</div>
                    <div className="dev-bio">
                      Pengembang independen yang berfokus pada aplikasi Android yang indah dan performa tinggi.
                      AusDMusic adalah proyek utama yang dikerjakan dengan penuh semangat.
                    </div>
                    <div className="dev-socials">
                      <a href="https://github.com/Wibugans" target="_blank" rel="noreferrer" className="dev-social">GitHub</a>
                      <a href="#" className="dev-social">Blog</a>
                      <a href="#" className="dev-social">Email</a>
                    </div>
                  </div>
                </motion.div>
                <motion.div className="dev-info" variants={fadeUp}>
                  <div className="section-tag">Pengembang</div>
                  <h2 className="section-title">Dibuat Oleh Satu Orang,<br />Untuk Semua Orang</h2>
                  <p>AusDMusic dimulai sebagai proyek pribadi — frustrasi dengan aplikasi musik yang penuh iklan dan UI yang membosankan. Dari sana, lahirlah visi untuk membuat sesuatu yang benar-benar berbeda.</p>
                  <p>Dibangun menggunakan teknologi terkini: Kotlin, Jetpack Compose, dan arsitektur yang bersih. Setiap fitur dikerjakan dengan standar tinggi.</p>
                  <div className="timeline">
                    <div className="timeline-item">
                      <div className="tl-dot">🌱</div>
                      <div>
                        <div className="tl-year">2024 — Awal</div>
                        <div className="tl-desc"><strong>AusDMusic lahir</strong> sebagai fork dari proyek open-source, dengan visi yang lebih besar.</div>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="tl-dot">⚡</div>
                      <div>
                        <div className="tl-year">2025 — Berkembang</div>
                        <div className="tl-desc">Penambahan <strong>lirik tersinkronisasi</strong>, mode offline, dan UI yang sepenuhnya dirancang ulang.</div>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="tl-dot">🔮</div>
                      <div>
                        <div className="tl-year">2026 — Sekarang</div>
                        <div className="tl-desc">Versi <strong>8.9.1</strong> dengan performa terbaik dan fitur paling lengkap yang pernah ada.</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </Section>
          </div>
        </section>

        {/* DOWNLOAD */}
        <section id="download" className="section-pad download-bg">
          <div className="container">
            <Section>
              <motion.div variants={fadeUp} className="section-header" style={{ textAlign: 'center' }}>
                <div className="section-tag" style={{ justifyContent: 'center' }}>Download</div>
                <h2 className="section-title" style={{ textAlign: 'center' }}>Siap Mencoba AusDMusic?</h2>
              </motion.div>
              <motion.div className="dl-box" variants={fadeUp}>
                <div className="dl-ver-badge">Versi Terbaru: {version}</div>
                <div className="dl-title">Download Sekarang, Gratis</div>
                <div className="dl-sub">Tersedia untuk Android 8.0 ke atas. Tidak perlu daftar, tidak ada langganan.</div>
                <a href={APK_URL} className="dl-btn" download>
                  ⬇ &nbsp;Unduh APK
                </a>
                <div className="dl-chips">
                  <span className="chip">✓ Otomatis update dari GitHub</span>
                  <span className="chip">🔒 Aman & Open Source</span>
                  <span className="chip">📱 Android 8.0+</span>
                </div>
                <div className="dl-note">Tautan unduhan otomatis mengarah ke rilis terbaru dari repositori resmi GitHub.</div>
              </motion.div>
            </Section>
          </div>
        </section>

        {/* FOOTER */}
        <footer>
          <div className="footer-logo">AusDMusic</div>
          <div className="footer-links">
            <a href="#fitur" className="footer-link">Fitur</a>
            <a href="#blog" className="footer-link">Blog</a>
            <a href="#pengembang" className="footer-link">Pengembang</a>
            <a href="https://github.com/Wibugans/AusDMusic" target="_blank" rel="noreferrer" className="footer-link">GitHub</a>
          </div>
          <div className="footer-copy">© 2026 AusDMusic. All rights reserved.</div>
        </footer>
      </div>
    </>
  );
}
