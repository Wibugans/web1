import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Play, Pause, Download, ExternalLink,
  Music2, Zap, Wifi, Mic2, ShieldCheck,
  Smartphone, Monitor, ArrowUpRight, Check,
  BanIcon, FileText, Cpu, Palette, WifiOff, Lock,
  ShoppingBag, Star, Layers, Package, Globe,
  Search, ChevronRight, Grid, Home
} from 'lucide-react';
import imgAnime from './assets/1.jpg';
import imgApp from './assets/2.jpg';
const appIcon = '/icon.png';
const appIconLarge = '/app_icon.png';
import './index.css';

// ─── constants ─────────────────────────────────────────────────────────────
const APK_URL_ARM64 = 'https://github.com/Wibugans/AusDMusic/releases/download/Rilis/androidApp-arm64-v8a-release-sign.apk';
const APK_URL_UNIVERSAL = 'https://github.com/Wibugans/AusDMusic/releases/download/Rilis/androidApp-universal-release-sign.apk';
const WIN_URL = 'https://github.com/Wibugans/AusDMusic/releases/download/windows/AusDMusic-8.9.1.exe';

// ─── motion helpers ──────────────────────────────────────────
const ease = [0.25, 0.46, 0.45, 0.94];
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function Anim({ children, v = fadeUp, once = true, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={v}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

function Stagger({ children, once = true }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '-60px' });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger}>
      {children}
    </motion.div>
  );
}

// ─── data ───────────────────────────────────────────
const FEATURES = [
  { Icon: BanIcon,   name: 'Bebas Iklan Selamanya', desc: 'Tidak ada iklan popup, tidak ada interupsi. Nikmati musik dari awal sampai akhir tanpa gangguan.' },
  { Icon: FileText,  name: 'Lirik Real-Time', desc: 'Kata per kata tampil pas waktunya. Karaoke di rumah sendiri, dengan akurasi yang jarang ada di aplikasi lain.' },
  { Icon: Zap,       name: 'Ringan di RAM Rendah', desc: 'Dioptimasi khusus untuk HP 3–4GB RAM. Tidak freeze, tidak panas berlebihan walau diputar seharian.' },
  { Icon: Palette,   name: 'Tema Dinamis', desc: 'Warna antarmuka berubah otomatis mengikuti sampul album. Setiap lagu punya suasana visualnya sendiri.' },
  { Icon: WifiOff,   name: 'Mode Offline', desc: 'Unduh lagu favorit dan putar kapan saja, di mana saja tanpa perlu koneksi internet.' },
  { Icon: Lock,      name: 'Tanpa Pelacak', desc: 'Tidak ada data yang dikirim ke pihak ketiga. Apa yang kamu dengar tetap jadi urusan kamu sendiri.' },
];

const MARQUEE_ITEMS = [
  'Bebas Iklan', 'Lirik Tersinkron', 'Open Source', 'Tanpa Login',
  'Mode Offline', 'Android & Windows', 'Tema Dinamis', 'SponsorBlock',
  'Bebas Iklan', 'Lirik Tersinkron', 'Open Source', 'Tanpa Login',
  'Mode Offline', 'Android & Windows', 'Tema Dinamis', 'SponsorBlock',
];

const REVIEWS = [
  { stars: 5, quote: 'Aplikasi musik terbaik yang pernah saya pakai. Liriknya akurat banget, temanya keren, dan yang paling penting: tidak ada iklan sama sekali.', author: 'Rizky F.', role: 'Pengguna Android' },
  { stars: 5, quote: 'Sudah 3 bulan pakai AusDMusic. Tidak pernah crash, tidak pernah lag. Di HP saya yang RAM 4GB pun tetap lancar seharian.', author: 'Dinda P.', role: 'Mahasiswi, Bandung' },
  { stars: 5, quote: 'Akhirnya ada aplikasi musik yang open source, gratis, dan tampilannya tidak murahan. Ini yang saya cari selama ini.', author: 'Ahmad S.', role: 'Developer Indie' },
];

const STORE_APPS = [
  {
    id: 'ausdmusic',
    name: 'AusDMusic',
    developer: 'Wibugans',
    rating: '4.9',
    reviews: '2rb ulasan',
    size: '40 MB',
    type: 'Music & Audio',
    desc: 'Pemutar musik modern open-source dengan lirik tersinkronisasi, tanpa iklan, dan dukungan tema dinamis. Nikmati musik offline maupun streaming dari berbagai sumber.',
    icon: '/foto.jpg',
    banner: imgApp,
    tags: ['Bebas Iklan', 'Lirik Sinkron', 'Open Source'],
    link: '#/',
    arm64: APK_URL_ARM64,
    universal: APK_URL_UNIVERSAL
  },
  {
    id: 'ausdvid',
    name: 'AusDVid (Coming Soon)',
    developer: 'Wibugans',
    rating: '4.8',
    reviews: 'Beta',
    size: '32 MB',
    type: 'Video Players',
    desc: 'Pemutar video ringan dengan dukungan format luas (MKV, MP4, WebM) dan subtitle otomatis. Dirancang khusus untuk HP dengan spesifikasi rendah.',
    icon: '🎬',
    banner: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=800',
    tags: ['Subtitle', 'Ringan', '4K Support'],
    link: '#/store',
    arm64: '#',
    universal: '#'
  },
  {
    id: 'ausdclean',
    name: 'AusDClean (Coming Soon)',
    developer: 'Wibugans',
    rating: '4.7',
    reviews: 'Alpha',
    size: '15 MB',
    type: 'Tools & Utilities',
    desc: 'Alat serbaguna untuk membersihkan cache membandel, memanajemen file besar, dan menstabilkan sistem Android Anda tanpa root.',
    icon: '🛠️',
    banner: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    tags: ['Storage', 'Booster', 'No Root'],
    link: '#/store',
    arm64: '#',
    universal: '#'
  }
];

// ─── Navbar Component ──────────────────────────────────────────────
function Navbar({ currentPath }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <nav className="nav blur-nav">
        <a href="#/" className="nav-logo" onClick={closeDrawer}>
          <img src={appIcon} alt="AusDMusic logo" />
          AusDMusic
        </a>

        {/* Desktop links */}
        <div className="nav-links">
          {currentPath === '/store' ? (
            <>
              <a href="#/" className="nav-link"><Home size={14} style={{display: 'inline', marginBottom: '-2px', marginRight: '4px'}}/>Beranda</a>
              <a href="#/store" className="nav-link active"><Grid size={14} style={{display: 'inline', marginBottom: '-2px', marginRight: '4px'}}/>Wibugans Store</a>
            </>
          ) : (
            <>
              <a href="#/#fitur" className="nav-link">Fitur</a>
              <a href="#/#tampilan" className="nav-link">Tampilan</a>
              <a href="#/#download" className="nav-link">Download</a>
              <a href="#/store" className="nav-link" style={{color: '#c084fc', fontWeight: '700'}}>
                <ShoppingBag size={14} style={{display: 'inline', marginBottom: '-2px', marginRight: '4px'}}/>Store
              </a>
            </>
          )}
        </div>

        {/* Desktop CTA */}
        <div className="nav-cta">
          <a href="https://github.com/Wibugans/AusDMusic" target="_blank" rel="noreferrer" className="nav-btn nav-btn-ghost">GH</a>
          <a href={currentPath === '/store' ? "#/" : "#/#download"} className="nav-btn nav-btn-filled">
            {currentPath === '/store' ? 'Kembali' : 'Download APK'}
          </a>
        </div>

        {/* Hamburger (mobile only) */}
        <button
          className={`nav-hamburger ${drawerOpen ? 'open' : ''}`}
          onClick={() => setDrawerOpen(o => !o)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div className={`nav-drawer ${drawerOpen ? 'open' : ''}`}>
        {currentPath === '/store' ? (
          <>
            <a href="#/" className="nav-drawer-link" onClick={closeDrawer}>
              <Home size={18} /> Beranda
            </a>
            <a href="#/store" className="nav-drawer-link active" onClick={closeDrawer}>
              <Grid size={18} /> Wibugans Store
            </a>
          </>
        ) : (
          <>
            <a href="#/#fitur" className="nav-drawer-link" onClick={closeDrawer}>🎵 Fitur</a>
            <a href="#/#tampilan" className="nav-drawer-link" onClick={closeDrawer}>🎨 Tampilan</a>
            <a href="#/#download" className="nav-drawer-link" onClick={closeDrawer}>📥 Download</a>
            <a href="#/#developer" className="nav-drawer-link" onClick={closeDrawer}>👤 Developer</a>
          </>
        )}
        <div className="nav-drawer-divider" />
        <a href="#/store" className="nav-drawer-link store-link" onClick={closeDrawer}>
          <ShoppingBag size={18} /> Wibugans Store
        </a>
        <a
          href={currentPath === '/store' ? "#/" : "#/#download"}
          className="nav-drawer-dl"
          onClick={closeDrawer}
        >
          <Download size={18} />
          {currentPath === '/store' ? 'Kembali ke Beranda' : 'Download APK'}
        </a>
      </div>
    </>
  );
}

// ─── Footer Component ──────────────────────────────────────────────
function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">
              <img src={appIcon} alt="AusDMusic" />
              AusDMusic
            </div>
            <p className="footer-tagline">
              Pemutar musik premium lintas platform. Dibangun untuk orang yang peduli pada kualitas dan privasi.
            </p>
            <div className="footer-socials">
              <a href="https://github.com/Wibugans/AusDMusic" target="_blank" rel="noreferrer" className="social-icon">GH</a>
              <a href="https://saweria.co/yusrilwhen" target="_blank" rel="noreferrer" className="social-icon">☕</a>
            </div>
          </div>

          <div>
            <div className="footer-col-title">Produk</div>
            <div className="footer-col-links">
              <a href="#/#fitur" className="footer-col-link">Fitur</a>
              <a href="#/#tampilan" className="footer-col-link">Tampilan</a>
              <a href={APK_URL_ARM64} className="footer-col-link" download>Download 64-bit</a>
              <a href={APK_URL_UNIVERSAL} className="footer-col-link" download>Download Universal</a>
              <a href={WIN_URL} className="footer-col-link" download>Download Windows</a>
            </div>
          </div>

          <div>
            <div className="footer-col-title">Developer</div>
            <div className="footer-col-links">
              <a href="#/#developer" className="footer-col-link">Tentang</a>
              <a href="https://github.com/Wibugans/AusDMusic" target="_blank" rel="noreferrer" className="footer-col-link">Source Code</a>
              <a href="https://github.com/Wibugans/AusDMusic/releases" target="_blank" rel="noreferrer" className="footer-col-link">Riwayat Rilis</a>
              <a href="https://github.com/Wibugans/AusDMusic/issues" target="_blank" rel="noreferrer" className="footer-col-link">Laporkan Bug</a>
            </div>
          </div>

          <div>
            <div className="footer-col-title">Lainnya</div>
            <div className="footer-col-links">
              <a href="#/store" className="footer-col-link">Wibugans Store</a>
              <a href="#" className="footer-col-link">Kebijakan Privasi</a>
              <a href="#" className="footer-col-link">Lisensi GPL-3.0</a>
              <a href="https://saweria.co/yusrilwhen" target="_blank" rel="noreferrer" className="footer-col-link">Donasi</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">© 2026 AusDMusic oleh Yusril When — GPL-3.0 License</span>
          <div className="footer-legal">
            <a href="#">Privasi</a>
            <a href="#">Ketentuan</a>
            <a href="#">Lisensi</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Store Page ──────────────────────────────────────────────────
function StorePage() {
  const featuredApp = STORE_APPS[0];
  
  return (
    <div className="page store-page" style={{ paddingTop: '100px', paddingBottom: '60px' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        
        {/* Store Header / Search bar */}
        <div className="store-topbar">
          <h1 className="store-page-title">Wibugans <span style={{ color: '#c084fc' }}>Store</span></h1>
          <div className="store-search">
            <Search size={18} className="store-search-icon" />
            <input type="text" placeholder="Cari aplikasi atau alat..." className="store-search-input" />
          </div>
        </div>

        {/* Featured App (Hero Banner) */}
        <Anim>
          <div className="store-hero">
            <div className="store-hero-bg" style={{ backgroundImage: `url(` + featuredApp.banner + `)` }}></div>
            <div className="store-hero-overlay"></div>
            <div className="store-hero-content">
              <div className="store-hero-info">
                <div className="store-hero-badge"><Star size={12} fill="currentColor" /> Pilihan Editor</div>
                <h2 className="store-hero-name">{featuredApp.name}</h2>
                <p className="store-hero-desc">{featuredApp.desc}</p>
                <div className="store-hero-actions">
                  <a href={featuredApp.arm64} className="btn-primary" style={{ padding: '12px 28px', fontSize: '1rem' }} download>
                    <Download size={18} /> Install (ARM64)
                  </a>
                  <a href={featuredApp.universal} className="btn-secondary store-btn-secondary" download>
                    Universal
                  </a>
                </div>
              </div>
              <div className="store-hero-icon-container">
                <img src={featuredApp.icon} alt={featuredApp.name} className="store-hero-icon-img" />
              </div>
            </div>
          </div>
        </Anim>

        {/* Categories */}
        <div className="store-categories">
          {['Semua', 'Pemutar Musik', 'Video', 'Alat Sistem', 'Produktivitas'].map((cat, i) => (
            <button key={i} className={`store-cat-btn ${i === 0 ? 'active' : ''}`}>{cat}</button>
          ))}
        </div>

        {/* App List */}
        <div className="store-section">
          <div className="store-section-header">
            <h3>Daftar Aplikasi Terbaru</h3>
            <button className="store-see-all">Lihat Semua <ChevronRight size={16}/></button>
          </div>
          
          <div className="store-app-grid">
            <Stagger>
              {STORE_APPS.map((app, i) => (
                <motion.div key={i} className="store-app-card" variants={fadeUp}>
                  <div className="store-app-icon-wrap">
                    {app.icon.includes('.') ? (
                      <img src={app.icon} alt={app.name} className="store-app-icon-img" />
                    ) : (
                      <div className="store-app-emoji">{app.icon}</div>
                    )}
                  </div>
                  <div className="store-app-details">
                    <h4 className="store-app-name">{app.name}</h4>
                    <p className="store-app-dev">{app.developer}</p>
                    <div className="store-app-meta">
                      <span className="store-app-rating">{app.rating} <Star size={10} fill="currentColor"/></span>
                      <span className="store-app-dot">•</span>
                      <span className="store-app-size">{app.size}</span>
                    </div>
                    {/* Tags */}
                    <div className="store-app-tags">
                      {app.tags.slice(0, 2).map((tag, j) => (
                        <span key={j} className="store-app-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="store-app-download">
                    <a href={app.arm64} className={`store-btn-install ${app.name.includes('Coming') ? 'disabled' : ''}`}>
                      {app.name.includes('Coming') ? 'Segera' : 'Install'}
                    </a>
                  </div>
                </motion.div>
              ))}
            </Stagger>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── Home Page (Landing Page) ────────────────────────────────────
function HomePage({ version }) {
  return (
    <div className="page">
      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section className="hero">
        <div className="container">
          <div className="hero-inner">
            {/* left: copy */}
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp}>
                <div className="hero-badge">
                  <span className="hero-badge-dot" />
                  {version} · Gratis · Open Source
                </div>
              </motion.div>
              <motion.h1 className="hero-title" variants={fadeUp}>
                <span className="hero-title-line">Dengarkan Musik Favoritmu.</span>
                <span className="hero-title-accent">Tanpa Iklan. Gratis.</span>
              </motion.h1>
              <motion.p className="hero-desc" variants={fadeUp}>
                AusDMusic adalah pemutar musik modern open-source. Nikmati jutaan lagu dengan kualitas tinggi, lirik tersinkronisasi, dan tanpa gangguan.
              </motion.p>
              <motion.div className="hero-actions" variants={fadeUp}>
                <a href={APK_URL_ARM64} className="btn-primary" download>
                  <Smartphone size={18} /> Download (64-bit)
                </a>
                <a href={APK_URL_UNIVERSAL} className="btn-secondary" download>
                  <Smartphone size={18} /> Download (Universal)
                </a>
                <a href={WIN_URL} className="btn-secondary" download>
                  <Monitor size={18} /> Windows
                </a>
              </motion.div>
              <motion.div className="hero-stats" variants={fadeUp}>
                <div><div className="stat-num">100%</div><div className="stat-label">Bebas Iklan</div></div>
                <div><div className="stat-num">40 MB</div><div className="stat-label">Ukuran APK</div></div>
                <div><div className="stat-num">GPL-3.0</div><div className="stat-label">Open Source</div></div>
              </motion.div>
            </motion.div>

            {/* right: phone mockup */}
            <div className="hero-visual">
              <motion.div
                className="hero-mockup"
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.9, ease, delay: 0.2 }}
              >
                <img src={imgApp} alt="AusDMusic player screen" />
              </motion.div>
              {/* floating cards */}
              <motion.div
                className="hero-floating-card hero-card-left"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <div className="hfc-label">Sekarang Diputar</div>
                <div className="hfc-value"><span className="hfc-dot" /> Aktif</div>
                <div className="hfc-bar">
                  {[18, 12, 20, 14, 20].map((h, i) => <div key={i} className="hfc-bar-item" style={{ height: h }} />)}
                </div>
              </motion.div>
              <motion.div
                className="hero-floating-card hero-card-right"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                <div className="hfc-label">Kualitas Audio</div>
                <div className="hfc-value">🎧 320 kbps</div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-section">
        <div className="marquee-track">
          {MARQUEE_ITEMS.map((item, i) => (
            <span key={i} className="marquee-item">
              {item}
              {i < MARQUEE_ITEMS.length - 1 && <span className="marquee-sep">·</span>}
            </span>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <section className="section" id="fitur">
        <div className="container">
          <Anim>
            <div className="section-header">
              <p className="section-label">Fitur Utama</p>
              <h2 className="section-title">Pengalaman mendengarkan musik<br />yang lebih baik.</h2>
              <p className="section-desc">Setiap fitur dibangun dengan fokus pada kenyamanan, kecepatan, dan kualitas audio.</p>
            </div>
          </Anim>
          <Stagger>
            <div className="features-grid">
                {FEATURES.map((f, i) => (
                <motion.div key={i} className="feat-card" variants={fadeUp}>
                  <div className="feat-icon"><f.Icon size={22} strokeWidth={1.8} /></div>
                  <div className="feat-name">{f.name}</div>
                  <div className="feat-desc">{f.desc}</div>
                </motion.div>
              ))}
            </div>
          </Stagger>
        </div>
      </section>

      {/* SCREENSHOT SHOWCASE */}
      <section className="section showcase" id="tampilan">
        <div className="container">
          <div className="showcase-grid">
            <Anim>
              <div className="showcase-brand-card">
                <div className="showcase-icon-wrap">
                  <img src="/foto.jpg" alt="AusDMusic icon" className="showcase-icon-img" />
                </div>
                <div className="showcase-brand-info">
                  <div className="showcase-brand-name">AusDMusic</div>
                  <div className="showcase-brand-ver">{version} · Stabil</div>
                  <div className="showcase-brand-tags">
                    <span className="showcase-tag">🎨 Tema Dinamis</span>
                    <span className="showcase-tag">📝 Lirik Sync</span>
                    <span className="showcase-tag">⚡ Ringan</span>
                  </div>
                </div>
              </div>
            </Anim>

            <Anim delay={0.15}>
              <div className="showcase-content">
                <p className="section-label text-left">Tampilan</p>
                <h2 className="section-title text-left">Desain yang mengikuti musiknya.</h2>
                <p className="section-desc text-left" style={{ marginBottom: 0 }}>
                  Warna background berubah otomatis sesuai warna dominan sampul album. Tiap lagu punya suasana visualnya sendiri.
                </p>
                <div className="showcase-features">
                  {[
                    { Icon: Palette,   title: 'Warna Dinamis dari Sampul', desc: 'Palette warna dihasilkan real-time dari gambar album menggunakan Palette API.' },
                    { Icon: FileText,  title: 'Lirik Bergerak Sinkron', desc: 'Scroll otomatis mengikuti waktu lagu dengan presisi milidetik.' },
                    { Icon: Zap,       title: 'Animasi Liquid Glass', desc: 'Efek kaca cair yang mulus dan elegan tanpa membebani CPU/GPU.' },
                  ].map((sf, i) => (
                    <div key={i} className="showcase-feat">
                      <div className="showcase-feat-icon"><sf.Icon size={18} strokeWidth={1.8} /></div>
                      <div>
                        <div className="showcase-feat-title">{sf.title}</div>
                        <div className="showcase-feat-desc">{sf.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Anim>
          </div>
        </div>
      </section>

      {/* DOWNLOAD / PLATFORM */}
      <section className="section" id="download">
        <div className="container">
          <Anim>
            <div className="section-header">
              <p className="section-label">Download</p>
              <h2 className="section-title">Pilih platform kamu.</h2>
              <p className="section-desc">Tersedia untuk Android dan Windows. Gratis. Tidak perlu akun. Tidak ada langganan.</p>
            </div>
          </Anim>
          <Stagger>
            <div className="platform-grid">
              {/* Android */}
              <motion.div className="platform-card platform-card-primary" variants={fadeUp}>
                <div className="platform-badge">UTAMA</div>
                <div className="platform-header-row">
                  <div>
                    <p className="platform-label">Mobile</p>
                    <h3 className="platform-name">Android</h3>
                  </div>
                  <Smartphone size={32} opacity={0.5} />
                </div>
                <p className="platform-desc">
                  Versi paling lengkap dengan seluruh fitur aktif. Diuji di ratusan perangkat dari Android 8 sampai 14.
                </p>
                
                <div className="apk-types">
                  <div className="apk-type">
                    <div className="apk-type-header"><Cpu size={16} /> <strong>ARM64 (64-bit)</strong></div>
                    <p className="apk-type-desc">Untuk HP Android keluaran 5 tahun terakhir (mayoritas). Lebih cepat dan hemat ukuran.</p>
                    <a href={APK_URL_ARM64} className="platform-btn platform-btn-primary" download><Download size={18} /> Download ARM64</a>
                  </div>
                  <div className="apk-type">
                    <div className="apk-type-header"><Layers size={16} /> <strong>Universal</strong></div>
                    <p className="apk-type-desc">Mendukung semua arsitektur (termasuk 32-bit & lawas). Ukuran APK lebih besar.</p>
                    <a href={APK_URL_UNIVERSAL} className="platform-btn platform-btn-secondary" download><Download size={18} /> Download Universal</a>
                  </div>
                </div>
              </motion.div>

              {/* Windows */}
              <motion.div className="platform-card" variants={fadeUp}>
                <div className="platform-header-row">
                  <div><p className="platform-label">Desktop</p><h3 className="platform-name">Windows</h3></div>
                  <Monitor size={32} opacity={0.5} />
                </div>
                <p className="platform-desc">
                  Versi desktop dengan antarmuka yang dioptimalkan untuk layar besar. Cocok untuk sesi mendengarkan panjang di PC.
                </p>
                <div className="platform-specs">
                  {['Windows 10 / 11 (64-bit)', 'RAM 4GB disarankan', 'Installer .exe siap pakai', 'Fitur serupa dengan versi Android'].map((s, i) => (
                    <div key={i} className="platform-spec"><Check size={16} className="spec-check-icon" /> {s}</div>
                  ))}
                </div>
                <a href={WIN_URL} className="platform-btn platform-btn-secondary" download><Monitor size={18} /> Download untuk Windows</a>
              </motion.div>
            </div>
          </Stagger>
        </div>
      </section>

      {/* DEVELOPER */}
      <section className="section developer" id="developer">
        <div className="container">
          <Anim>
            <div className="section-header">
              <p className="section-label">Developer</p>
              <h2 className="section-title">Tentang Pengembang.</h2>
            </div>
          </Anim>
          <div className="dev-split">
            {/* left: profile */}
            <Anim>
              <div className="dev-left">
                <div className="dev-avatar-wrap"><img src={imgAnime} alt="Yusril When" className="dev-avatar-img" /></div>
                <div className="dev-name">Yusril When</div>
                <div className="dev-handle">@Wibugans · yusrilwhen</div>
                <p className="dev-bio">Pengembang open-source dari Indonesia yang berfokus membangun pengalaman pengguna yang ringan, cepat, dan modern untuk aplikasi mobile dan desktop.</p>
                <div className="dev-links">
                  <a href="https://github.com/Wibugans/AusDMusic" target="_blank" rel="noreferrer" className="dev-link">GH · AusdMusic</a>
                  <a href="https://github.com/Wibugans/AusDMusic/issues" target="_blank" rel="noreferrer" className="dev-link"><ShieldCheck size={16} /> Laporkan Bug</a>
                  <a href="https://saweria.co/yusrilwhen" target="_blank" rel="noreferrer" className="dev-link"><Globe size={16} /> Dukung via Saweria</a>
                </div>
              </div>
            </Anim>
            {/* right: story & timeline */}
            <Anim delay={0.15}>
              <div className="dev-right">
                <div className="dev-story">
                  <h3 className="dev-story-title">Perjalanan AusDMusic</h3>
                  <p className="dev-story-desc">AusDMusic dibangun sebagai proyek open-source untuk memberikan alternatif pemutar musik yang ringan, cepat, dan sepenuhnya bebas dari iklan maupun tracker.</p>
                  <div className="timeline">
                    {[
                      { icon: '🚀', date: 'Agustus 2026', title: 'Versi Windows Dirilis', desc: 'Pertama kalinya AusDMusic tersedia untuk PC menggunakan Compose Multiplatform.' },
                      { icon: '🎨', date: 'Juli 2026', title: 'Rebrand Total ke AusDMusic', desc: 'Identitas baru, sistem animasi baru, dan UI yang dirancang ulang dari awal.' },
                      { icon: '📝', date: 'April 2026', title: 'Sistem Lirik Real-Time', desc: 'Integrasi lirik tersinkronisasi dengan akurasi tinggi dan dukungan terjemahan.' },
                      { icon: '🌱', date: '2025', title: 'Fondasi Diletakkan', desc: 'Pengembangan dimulai sebagai proyek pribadi dengan tujuan membuat pemutar musik yang benar-benar bebas.' },
                    ].map((t, i) => (
                      <div key={i} className="tl-item"><div className="tl-dot">{t.icon}</div><div><div className="tl-date">{t.date}</div><div className="tl-title">{t.title}</div><div className="tl-sub">{t.desc}</div></div></div>
                    ))}
                  </div>
                </div>
              </div>
            </Anim>
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <div className="cta-band">
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <Anim>
            <div className="cta-inner">
              <h2 className="cta-title">Mulai dengarkan sekarang.<br /><span>Sepenuhnya gratis.</span></h2>
              <p className="cta-sub">Tidak perlu registrasi, tidak perlu berlangganan. Unduh sekarang dan nikmati musik favoritmu.</p>
              <div className="cta-btns">
                <a href={APK_URL_ARM64} className="btn-primary" download><Smartphone size={18} /> Download (64-bit)</a>
                <a href={APK_URL_UNIVERSAL} className="btn-secondary" download><Smartphone size={18} /> Download (Universal)</a>
                <a href={WIN_URL} className="btn-secondary" download><Monitor size={18} /> Untuk Windows</a>
              </div>
              <div className="cta-pills">
                {[{ dot: '#10b981', label: 'Bebas Iklan' },{ dot: '#a855f7', label: 'Open Source' },{ dot: '#06b6d4', label: 'Tanpa Akun' },{ dot: '#f43f5e', label: 'GPL-3.0 License' }].map((p, i) => (
                  <div key={i} className="cta-pill"><span className="pill-dot" style={{ background: p.dot }} />{p.label}</div>
                ))}
              </div>
            </div>
          </Anim>
        </div>
      </div>
    </div>
  );
}

// ─── Main App Shell ──────────────────────────────────────────────
export default function App() {
  const [version, setVersion] = useState('v8.9.1');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  
  // Custom router based on hash
  const [currentPath, setCurrentPath] = useState('/');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || '/';
      // simple routing logic
      if (hash.startsWith('/store')) {
        setCurrentPath('/store');
        window.scrollTo(0,0);
      } else {
        setCurrentPath('/');
      }
    };
    
    // Check initial hash
    handleHashChange();
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // fetch latest version
  useEffect(() => {
    fetch('https://api.github.com/repos/Wibugans/AusDMusic/releases/latest')
      .then(r => r.json())
      .then(d => { if (d?.tag_name) setVersion(d.tag_name); })
      .catch(() => {});
  }, []);

  // audio autoplay
  useEffect(() => {
    const audio = new Audio('/lagu.mp3');
    audio.loop = true;
    audio.volume = 0.6;
    audioRef.current = audio;

    const tryPlay = () => {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    };
    const onFirst = () => {
      tryPlay();
      ['click', 'scroll', 'touchstart', 'keydown'].forEach(e => document.removeEventListener(e, onFirst));
    };
    ['click', 'scroll', 'touchstart', 'keydown'].forEach(e => document.addEventListener(e, onFirst, { once: false }));
    tryPlay();
    return () => { audio.pause(); };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); }
    else { audioRef.current.play(); setIsPlaying(true); }
  };

  return (
    <>
      <div className="bg-wrap" aria-hidden="true">
        <div className="bg-grid" />
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />
      </div>

      <Navbar currentPath={currentPath} />

      {/* Route Switcher */}
      {currentPath === '/store' ? <StorePage /> : <HomePage version={version} />}

      <Footer />

      {/* ── music fab ── */}
      <button className="music-fab" onClick={toggleAudio} title={isPlaying ? 'Pause musik' : 'Play musik'} aria-label="Toggle musik">
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>
      {isPlaying && <div className="music-fab-ring" aria-hidden="true" />}
    </>
  );
}
