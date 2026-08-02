import { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import img1 from './assets/1.jpg';
import img2 from './assets/2.jpg';
import { useRef } from 'react';
import { Download, Music2, Headphones, Mic2, Wifi, Zap, Shield, Palette, ListMusic, ChevronRight } from 'lucide-react';
import './index.css';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function Section({ children, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger} className={className}>
      {children}
    </motion.div>
  );
}

const features = [
  { icon: <Shield size={22} />, color: 'purple', title: 'Bebas Iklan Selamanya', desc: 'Dengarkan musik tanpa gangguan iklan. Tidak ada pause, tidak ada banner. Murni menikmati musik.' },
  { icon: <Mic2 size={22} />, color: 'cyan', title: 'Lirik Tersinkronisasi', desc: 'Lirik ditampilkan secara real-time mengikuti lagu. Karaoke kapan saja, di mana saja.' },
  { icon: <Zap size={22} />, color: 'orange', title: 'Ringan & Cepat', desc: 'Dibangun dengan performa terdepan. Buka instan, putar instan. Tidak ada lag, tidak ada buffering.' },
  { icon: <Palette size={22} />, color: 'pink', title: 'UI Premium', desc: 'Antarmuka yang indah dan modern dengan dukungan Material You serta tema gelap yang memanjakan mata.' },
  { icon: <ListMusic size={22} />, color: 'green', title: 'Playlist Tak Terbatas', desc: 'Buat, simpan, dan kelola playlist sesukamu. Ekspor dan impor dengan mudah.' },
  { icon: <Wifi size={22} />, color: 'blue', title: 'Mode Offline', desc: 'Unduh lagu favoritmu dan dengarkan tanpa koneksi internet. Musik kapanpun kamu mau.' },
];

const blogs = [
  {
    thumb: 't1', icon: 'ðŸŽµ',
    tag: 'Update',
    title: 'AusDMusic v8.9.1 â€” Apa Yang Baru Di Versi Ini?',
    excerpt: 'Rilis terbaru membawa perbaikan performa besar-besaran, antarmuka yang lebih halus, dan beberapa fitur baru yang sudah lama ditunggu komunitas.',
    date: '2 Agustus 2026',
    read: '3 min baca',
  },
  {
    thumb: 't2', icon: 'âš¡',
    tag: 'Pengembangan',
    title: 'Di Balik Layar: Bagaimana AusDMusic Dibangun',
    excerpt: 'Perjalanan membangun aplikasi musik modern menggunakan Kotlin Multiplatform, Jetpack Compose, dan arsitektur Clean Architecture yang solid.',
    date: '28 Juli 2026',
    read: '5 min baca',
  },
  {
    thumb: 't3', icon: 'ðŸš€',
    tag: 'Rencana',
    title: 'Roadmap AusDMusic 2026 â€” Fitur Yang Akan Datang',
    excerpt: 'Integrasi AI, rekomendasi cerdas, equalizer bawaan, dan banyak lagi. Inilah yang sedang kami kerjakan untuk masa depan AusDMusic.',
    date: '20 Juli 2026',
    read: '4 min baca',
  },
];

export default function App() {
  const [version, setVersion] = useState('...');
  const [apkUrl, setApkUrl] = useState('https://github.com/Wibugans/AusDMusic/releases/download/Rilis/androidApp-universal-release-sign.apk');

  useEffect(() => {
    fetch('https://api.github.com/repos/Wibugans/AusDMusic/releases/latest')
      .then(r => r.json())
      .then(data => {
        if (data?.tag_name) {
          setVersion(data.tag_name);
          const apk = data.assets?.find(a => a.name.endsWith('.apk') && !a.name.includes('debug'));
          
        } else {
          setVersion('v8.9.1');
        }
      })
      .catch(() => setVersion('v8.9.1'));
  }, []);

  return (
    <>
      {/* Background Blobs */}
      <div className="blob-container">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <div className="page">
        {/* NAV */}
        <nav>
          <a href="#" className="nav-logo">
            <span className="nav-logo-dot" />
            AusDMusic
          </a>
          <div className="nav-links">
            <a href="#fitur" className="nav-link">Fitur</a>
            <a href="#blog" className="nav-link">Blog</a>
            <a href="#pengembang" className="nav-link">Pengembang</a>
            <a href="#download" className="nav-cta">Download APK</a>
          </div>
        </nav>

        {/* HERO */}
        <section className="hero">
          <Section>
            <motion.div variants={fadeUp}>
              <div className="hero-badge">
                <span className="hero-badge-dot" />
                Versi Terbaru {version} Sudah Tersedia
              </div>
            </motion.div>
            <motion.h1 variants={fadeUp}>
              Musik Tanpa Batas,<br />
              Pengalaman <em>Tanpa Kompromi</em>
            </motion.h1>
            <motion.p className="hero-sub" variants={fadeUp}>
              AusDMusic adalah pemutar musik Android yang bebas iklan, bertenaga tinggi, dengan lirik tersinkronisasi dan antarmuka premium yang terasa seperti buatan Anda sendiri.
            </motion.p>
            <motion.div className="hero-actions" variants={fadeUp}>
              <a href={apkUrl} className="btn-download">
                <Download size={20} />
                Download APK
              </a>
              <a href="#fitur" className="btn-ghost">
                Lihat Fitur <ChevronRight size={16} />
              </a>
            </motion.div>

            <motion.div className="hero-stats" variants={fadeUp}>
              <div className="stat">
                <div className="stat-num" style={{ color: 'var(--purple-light)' }}>100%</div>
                <div className="stat-label">Bebas Iklan</div>
              </div>
              <div className="stat-divider" />
              <div className="stat">
                <div className="stat-num" style={{ color: 'var(--cyan)' }}>Open</div>
                <div className="stat-label">Source</div>
              </div>
              <div className="stat-divider" />
              <div className="stat">
                <div className="stat-num" style={{ color: 'var(--pink)' }}>8.9.1</div>
                <div className="stat-label">Versi Stabil</div>
              </div>
              <div className="stat-divider" />
              <div className="stat">
                <div className="stat-num" style={{ color: '#34d399' }}>Android</div>
                <div className="stat-label">8.0+</div>
              </div>
            </motion.div>
          </Section>
        </section>

        {/* FEATURES */}
        <section id="fitur" style={{ padding: '100px 0' }}>
          <div className="container">
            <Section>
              <motion.div className="features-header" variants={fadeUp}>
                <div className="section-tag">Fitur Unggulan</div>
                <h2 className="section-title">Semua Yang Kamu Butuhkan,<br />Dalam Satu Aplikasi</h2>
                <p className="section-sub">Dirancang untuk pecinta musik sejati yang tidak mau berkompromi soal kualitas dan kenyamanan.</p>
              </motion.div>
              <motion.div className="features-grid" variants={stagger}>
                {features.map((f, i) => (
                  <motion.div key={i} className="feat-card" variants={fadeUp}>
                    <div className={`feat-icon ${f.color}`}>{f.icon}</div>
                    <div className="feat-title">{f.title}</div>
                    <div className="feat-desc">{f.desc}</div>
                  </motion.div>
                ))}
              </motion.div>
            </Section>
          </div>
        </section>

        {/* PREVIEW */}
        <section className="preview-section" style={{ padding: '100px 0' }}>
          <div className="container">
            <Section>
              <div className="preview-inner">
                <motion.div className="preview-text" variants={fadeUp}>
                  <div className="section-tag">Tampilan Aplikasi</div>
                  <h2 className="section-title">Indah Di Setiap Sudut Layar</h2>
                  <p style={{ color: 'var(--text-2)', fontSize: '0.95rem', lineHeight: 1.8 }}>
                    Setiap elemen dirancang dengan teliti. Dari animasi transisi yang halus hingga kartu lagu yang responsif â€” AusDMusic terasa premium dari detik pertama.
                  </p>
                  <ul className="preview-list">
                    <li>Animasi halus di setiap interaksi</li>
                    <li>Tema gelap yang tidak lelah di mata</li>
                    <li>Lirik terhubung real-time</li>
                    <li>Player mini yang selalu ada</li>
                    <li>Widget home screen yang cantik</li>
                  </ul>
                </motion.div>
                <motion.div className="phone-mockup" variants={fadeUp}>
                    <div className="glow-ring" />
                    <div className="phone-frame" style={{ padding: 0, overflow: 'hidden' }}>
                      <img src={img2} alt="AusDMusic Player" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  </motion.div>
              </div>
            </Section>
          </div>
        </section>

        {/* BLOG */}
        <section id="blog" style={{ padding: '100px 0' }}>
          <div className="container">
            <Section>
              <motion.div variants={fadeUp}>
                <div className="section-tag">Blog Pengembang</div>
                <h2 className="section-title">Tulisan & Pembaruan</h2>
                <p className="section-sub">Ikuti perjalanan pengembangan AusDMusic â€” dari ide hingga rilis, semuanya ada di sini.</p>
              </motion.div>
              <motion.div className="blog-grid" variants={stagger}>
                {blogs.map((b, i) => (
                  <motion.a key={i} href="#blog" className="blog-card" variants={fadeUp}>
                    <div className={`blog-thumb ${b.thumb}`}>{b.icon}</div>
                    <div className="blog-body">
                      <div className="blog-tag">{b.tag}</div>
                      <div className="blog-title">{b.title}</div>
                      <div className="blog-excerpt">{b.excerpt}</div>
                      <div className="blog-footer">
                        <span className="blog-date">{b.date}</span>
                        <span className="blog-read">{b.read} â†’</span>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            </Section>
          </div>
        </section>

        {/* DEVELOPER */}
        <section id="pengembang" className="dev-section" style={{ padding: '100px 0' }}>
          <div className="container">
            <Section>
              <div className="dev-inner">
                <motion.div variants={fadeUp}>
                  <div className="dev-card">
                    <div className="dev-avatar"><img src={img1} alt="Yusril When" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} /></div>
                    <div className="dev-name">Yusril When</div>
                    <div className="dev-role">Developer & Designer</div>
                    <div className="dev-bio">
                      Pengembang independen yang berfokus pada aplikasi Android yang indah dan performa tinggi. AusDMusic adalah proyek utama yang dikerjakan dengan penuh semangat.
                    </div>
                    <div className="dev-socials">
                      <a href="https://github.com/Wibugans" target="_blank" rel="noreferrer" className="dev-social" title="GitHub">GH</a>
                      <a href="#" className="dev-social" title="Blog">âœ</a>
                      <a href="#" className="dev-social" title="Email">âœ‰</a>
                    </div>
                  </div>
                </motion.div>
                <motion.div className="dev-info" variants={fadeUp}>
                  <div className="section-tag">Pengembang</div>
                  <h2 className="section-title">Dibuat Oleh Satu Orang, Untuk Semua Orang</h2>
                  <p>AusDMusic dimulai sebagai proyek pribadi â€” frustrasi dengan aplikasi musik yang penuh iklan dan UI yang membosankan. Dari sana, lahirlah visi untuk membuat sesuatu yang benar-benar berbeda.</p>
                  <p>Dibangun menggunakan teknologi terkini: Kotlin, Jetpack Compose, dan arsitektur yang bersih. Setiap fitur dikerjakan dengan standar tinggi.</p>
                  <div className="timeline">
                    <div className="timeline-item">
                      <div className="timeline-dot">ðŸŒ±</div>
                      <div className="timeline-content">
                        <div className="timeline-year">2024 â€” Awal</div>
                        <div className="timeline-desc"><strong>AusDMusic lahir</strong> sebagai fork dari proyek open-source, dengan visi yang lebih besar.</div>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-dot">âš¡</div>
                      <div className="timeline-content">
                        <div className="timeline-year">2025 â€” Berkembang</div>
                        <div className="timeline-desc">Penambahan <strong>lirik tersinkronisasi</strong>, mode offline, dan UI yang sepenuhnya dirancang ulang.</div>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-dot">ðŸš€</div>
                      <div className="timeline-content">
                        <div className="timeline-year">2026 â€” Sekarang</div>
                        <div className="timeline-desc">Versi <strong>8.9.1</strong> dengan performa terbaik dan fitur paling lengkap yang pernah ada.</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </Section>
          </div>
        </section>

        {/* DOWNLOAD */}
        <section id="download" className="download-section">
          <div className="container">
            <Section>
              <motion.div variants={fadeUp}>
                <div className="section-tag" style={{ justifyContent: 'center' }}>Download</div>
                <h2 className="section-title" style={{ textAlign: 'center' }}>Siap Mencoba AusDMusic?</h2>
              </motion.div>
              <motion.div className="download-box" variants={fadeUp}>
                <div className="ver-badge">â— Versi Terbaru: {version}</div>
                <div className="download-title">Download Sekarang, Gratis</div>
                <div className="download-sub">
                  Tersedia untuk Android 8.0 ke atas. Tidak perlu daftar, tidak ada langganan.
                </div>
                <a href={apkUrl} className="btn-apk">
                  <Download size={22} />
                  Unduh APK
                </a>
                <div className="download-chips">
                  <span className="chip">âš¡ Otomatis update dari GitHub</span>
                  <span className="chip">ðŸ”’ Aman & Open Source</span>
                  <span className="chip">ðŸ“± Android 8.0+</span>
                </div>
                <div className="download-note">
                  Tautan unduhan otomatis mengarah ke rilis terbaru dari repositori resmi GitHub.
                </div>
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
          <div className="footer-copy">Â© 2026 AusDMusic. All rights reserved.</div>
        </footer>
      </div>
    </>
  );
}




