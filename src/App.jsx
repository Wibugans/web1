import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Play, Mic2, Zap, Smartphone, ListMusic, Wifi, 
  Calendar, Terminal, Target, Check, Shield, MoveDown, Monitor, Volume2, Music
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

const features = [
  { icon: <Mic2 />, title: "Lirik Real-time", desc: "Nikmati lirik tersinkronisasi yang bergulir otomatis mengikuti lagu. Termasuk terjemahan untuk jutaan lagu global.", color: "purple" },
  { icon: <Zap />, title: "Performa Tinggi", desc: "Ditulis dalam Kotlin untuk native Android. Tanpa telemetri, ringan di baterai, dan transisi layar mulus 60fps.", color: "cyan" },
  { icon: <Wifi />, title: "Offline Mode", desc: "Unduh musik favorit Anda beserta lirik dan metadatanya. Dengarkan di mana saja bahkan saat tidak ada sinyal.", color: "pink" },
  { icon: <ListMusic />, title: "Audio Resolusi Tinggi", desc: "Dukungan penuh untuk format audio FLAC dan streaming lossless langsung dari sumber resmi.", color: "green" },
  { icon: <Target />, title: "Rekomendasi Cerdas", desc: "Dapatkan campuran hasil kurasi otomatis berdasarkan artis dan lagu yang sering Anda dengarkan.", color: "orange" },
  { icon: <Terminal />, title: "100% Open Source", desc: "Keamanan terjamin karena kode sumber terbuka sepenuhnya. Tanpa pelacak tersembunyi, tanpa iklan.", color: "blue" },
];

const blogs = [
  { tag: "Rilis", title: "AusDMusic 8.9.1 Tiba di Windows PC", excerpt: "Kini Anda bisa menikmati pengalaman mendengarkan musik bebas iklan yang sama di laptop Windows Anda.", date: "2 Agu 2026", read: "Baca selengkapnya →", icon: <Monitor />, gradient: "linear-gradient(135deg, #0ea5e9, #3b82f6)" },
  { tag: "Update", title: "Migrasi ke Compose Multiplatform", excerpt: "Bagaimana kami menyatukan kode UI Android dan PC, mengurangi ukuran aplikasi hingga 30% dan meningkatkan performa.", date: "15 Jul 2026", read: "Baca selengkapnya →", icon: <Smartphone />, gradient: "linear-gradient(135deg, #8b5cf6, #d946ef)" },
  { tag: "Catatan", title: "Masa Depan Pemutaran Audio", excerpt: "Fokus kami berikutnya adalah peningkatan EQ Spasial dan generasi daftar putar cerdas yang lebih akurat.", date: "1 Jul 2026", read: "Baca selengkapnya →", icon: <Calendar />, gradient: "linear-gradient(135deg, #10b981, #059669)" },
];

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
      {/* STATIC BACKGROUND ORBS */}
      <div className="bg-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
      </div>

      <div className="page">
        {/* NAV */}
        <nav>
          <a href="#" className="nav-logo">
            <span className="logo-dot" /> AusDMusic
          </a>
          <div className="nav-links">
            <a href="#fitur" className="nav-link">Fitur</a>
            <a href="#blog" className="nav-link">Pembaruan</a>
            <a href="#pengembang" className="nav-link">Pengembang</a>
          </div>
          <a href="#download" className="nav-cta">Unduh Sekarang</a>
        </nav>

        {/* HERO */}
        <section className="hero">
          <Section>
            <motion.div variants={fadeUp}>
              <div className="hero-badge">
                <span className="logo-dot" />
                <span>AusDMusic {version} Tersedia</span>
              </div>
            </motion.div>
            <motion.h1 variants={fadeUp}>
              Musik yang indah,<br />
              <em>tanpa kompromi.</em>
            </motion.h1>
            <motion.p className="hero-sub" variants={fadeUp}>
              AusDMusic adalah pemutar musik pintar yang bebas iklan, bertenaga tinggi,
              dengan lirik tersinkronisasi dan antarmuka premium yang memukau.
            </motion.p>
            <motion.div className="hero-actions" variants={fadeUp}>
              <a href={APK_URL} className="btn-primary" download>
                <Smartphone size={20} /> Download APK
              </a>
              <a href={WINDOWS_URL} className="btn-outline" download>
                <Monitor size={20} /> Versi PC (.exe)
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
                <div className="stat-val" style={{ color: '#34d399' }}>Cross Platform</div>
                <div className="stat-label">Android & PC</div>
              </div>
            </motion.div>
          </Section>
        </section>

        {/* FEATURES GRID */}
        <section id="fitur" className="section-pad">
          <div className="container">
            <Section>
              <motion.div variants={fadeUp} className="section-header">
                <div className="section-tag">Fitur Unggulan</div>
                <h2 className="section-title">Semua Yang Kamu Butuhkan,<br />Dalam Satu Aplikasi</h2>
                <p className="section-sub">Dirancang secara profesional untuk pecinta musik sejati yang tidak mau berkompromi soal kualitas dan kenyamanan antarmuka.</p>
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

        {/* PREVIEW MOCKUP */}
        <section className="section-pad preview-bg">
          <div className="container">
            <Section>
              <div className="preview-grid">
                <motion.div className="preview-text" variants={fadeUp}>
                  <div className="section-tag">Tampilan Aplikasi</div>
                  <h2 className="section-title">Indah Di Setiap Sudut Layar</h2>
                  <p className="section-sub">
                    Setiap elemen dirancang dengan presisi. Dari animasi transisi yang super halus
                    hingga kartu pemutar lagu yang responsif - AusDMusic terasa premium dari detik pertama Anda membukanya.
                  </p>
                  <ul className="preview-list">
                    <li><Check size={18} color="#a78bfa" /> Animasi native 60fps yang super mulus</li>
                    <li><Check size={18} color="#a78bfa" /> Mode gelap yang elegan dan ramah baterai</li>
                    <li><Check size={18} color="#a78bfa" /> Lirik interaktif yang bergeser dinamis</li>
                    <li><Check size={18} color="#a78bfa" /> Widget *home screen* yang interaktif</li>
                  </ul>
                </motion.div>
                <motion.div className="preview-phone" variants={fadeUp}>
                  <div className="phone-glow" />
                  <div className="phone-wrap">
                    {/* The second image: App Preview */}
                    <img src={img2} alt="AusDMusic App Interface" className="phone-img" />
                  </div>
                </motion.div>
              </div>
            </Section>
          </div>
        </section>

        {/* BLOG / UPDATES */}
        <section id="blog" className="section-pad">
          <div className="container">
            <Section>
              <motion.div variants={fadeUp} className="section-header">
                <div className="section-tag">Jurnal Pengembang</div>
                <h2 className="section-title">Tulisan & Pembaruan Terkini</h2>
                <p className="section-sub">Ikuti perjalanan pengembangan teknis AusDMusic - dari arsitektur perangkat lunak hingga fitur terbaru.</p>
              </motion.div>
              <motion.div className="blog-grid" variants={stagger}>
                {blogs.map((b, i) => (
                  <motion.div key={i} className="blog-card" variants={fadeUp}>
                    <div className="blog-thumb" style={{ background: b.gradient }}>
                      {b.icon}
                    </div>
                    <div className="blog-body">
                      <span className="blog-tag">{b.tag}</span>
                      <div className="blog-title">{b.title}</div>
                      <div className="blog-excerpt">{b.excerpt}</div>
                      <div className="blog-footer">
                        <span className="blog-date">{b.date}</span>
                        <span className="blog-read">{b.read}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </Section>
          </div>
        </section>

        {/* DEVELOPER PROFILE */}
        <section id="pengembang" className="section-pad dev-bg">
          <div className="container">
            <Section>
              <div className="dev-grid">
                <motion.div variants={fadeUp}>
                  <div className="dev-card">
                    <div className="dev-avatar">
                      {/* First image: Profile Picture */}
                      <img src={img1} alt="Yusril When Profil" />
                    </div>
                    <div className="dev-name">Yusril When</div>
                    <div className="dev-role">Software Engineer & Designer</div>
                    <div className="dev-bio">
                      Pengembang independen yang berfokus pada rekayasa aplikasi Android lintas platform dengan performa tinggi dan desain berkelas.
                    </div>
                    <div className="dev-socials">
                      <a href="https://github.com/Wibugans" target="_blank" rel="noreferrer" className="dev-social">GitHub</a>
                      <a href="#" className="dev-social">Website</a>
                      <a href="#" className="dev-social">Email</a>
                    </div>
                  </div>
                </motion.div>
                <motion.div className="dev-info" variants={fadeUp}>
                  <div className="section-tag">Di Balik Layar</div>
                  <h2 className="section-title">Dibuat Dengan Standar Industri Tertinggi</h2>
                  <p>AusDMusic dimulai dari rasa frustrasi terhadap pemutar musik modern yang terlalu lambat, dipenuhi pelacak data, dan membombardir pengguna dengan iklan yang mengganggu pengalaman mendengarkan.</p>
                  <p>Dibangun dari nol menggunakan teknologi mutakhir: Kotlin Multiplatform, arsitektur Clean MVVM, dan Jetpack Compose. Semua kode ditulis secara *native* demi performa tertinggi, menjadikannya salah satu *open-source client* paling canggih saat ini.</p>
                  <div className="timeline">
                    <div className="timeline-item">
                      <div className="tl-dot">🚀</div>
                      <div>
                        <div className="tl-year">Agustus 2026</div>
                        <div className="tl-desc">Rilis Dukungan PC Windows <span>Mengekspansi kode Android ke desktop menggunakan JVM & Compose.</span></div>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="tl-dot">⚡</div>
                      <div>
                        <div className="tl-year">Juli 2026</div>
                        <div className="tl-desc">Rebrand AusDMusic <span>Desain ulang total seluruh antarmuka ke standar premium.</span></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </Section>
          </div>
        </section>

        {/* DOWNLOAD / CTA */}
        <section id="download" className="section-pad download-section">
          <div className="container">
            <Section>
              <motion.div className="dl-box" variants={fadeUp}>
                <h2 className="dl-title">Mulai Pengalaman Baru Anda</h2>
                <p className="dl-sub">
                  Tersedia untuk Android 8.0+ dan Windows PC. <br />
                  Tidak perlu akun. Tidak ada langganan. Bebas iklan selamanya.
                </p>
                <div className="dl-buttons">
                  <a href={APK_URL} className="dl-btn primary" download>
                    <Smartphone size={22} /> Download untuk Android
                  </a>
                  <a href={WINDOWS_URL} className="dl-btn" download>
                    <Monitor size={22} /> Download untuk Windows
                  </a>
                </div>
                <div className="dl-chips">
                  <span className="chip"><Check size={16} /> Update Otomatis</span>
                  <span className="chip"><Shield size={16} /> Bebas Telemetri</span>
                  <span className="chip"><Terminal size={16} /> 100% Open Source</span>
                </div>
              </motion.div>
            </Section>
          </div>
        </section>

        {/* FOOTER */}
        <footer>
          <div className="container">
            <div className="footer-inner">
              <div className="footer-logo">
                <Music size={22} color="#a78bfa" /> AusDMusic
              </div>
              <div className="footer-links">
                <a href="#fitur" className="footer-link">Fitur Utama</a>
                <a href="#blog" className="footer-link">Pembaruan</a>
                <a href="https://github.com/Wibugans/AusDMusic" target="_blank" rel="noreferrer" className="footer-link">Source Code</a>
              </div>
              <div className="footer-copy">
                Created by Yusril When &bull; &copy; 2026 AusDMusic. Hak Cipta Dilindungi.
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* DISCREET MUSIC CONTROLLER */}
      <div className="music-controller" onClick={toggleAudio} title={isPlaying ? "Pause background music" : "Play background music"}>
        {isPlaying ? <Volume2 size={22} /> : <Play size={22} />}
      </div>
    </>
  );
}
