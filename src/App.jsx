import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, PlayCircle, ShieldCheck, Zap, Music, Smartphone, Github } from 'lucide-react';
import './App.css';

function App() {
  const [downloadUrl, setDownloadUrl] = useState('https://github.com/Wibugans/AusDMusic/releases/latest');
  const [version, setVersion] = useState('Fetching latest...');
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    // Fetch latest release from GitHub API
    fetch('https://api.github.com/repos/Wibugans/AusDMusic/releases/latest')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.tag_name) {
          setVersion(data.tag_name);
          // Find APK asset
          const apkAsset = data.assets?.find(asset => asset.name.endsWith('.apk'));
          if (apkAsset) {
            setDownloadUrl(apkAsset.browser_download_url);
          } else {
            setDownloadUrl(data.html_url); // Fallback to release page if no APK found
          }
        } else {
          setVersion('v8.9.1'); // Fallback version if API fails or rate limited
        }
        setIsFetching(false);
      })
      .catch((err) => {
        console.error('Error fetching release:', err);
        setVersion('v8.9.1');
        setIsFetching(false);
      });
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <Music className="logo-icon" size={28} />
          AusDMusic
        </div>
        <nav className="nav-links">
          <a href="#features" className="nav-link">Fitur</a>
          <a href="#download" className="nav-link">Download</a>
          <a href="https://github.com/Wibugans/AusDMusic" target="_blank" rel="noreferrer" className="nav-link">
            <Github size={20} />
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h1 className="hero-title">
            Dengarkan Musik Tanpa Batas<br />
            <span className="gradient-text">AusDMusic</span>
          </h1>
          <p className="hero-subtitle">
            Aplikasi pemutar musik premium dengan antarmuka elegan, fitur lirik lengkap, dan sepenuhnya bebas iklan. Jelajahi jutaan lagu favoritmu.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <a href="#download" className="btn btn-primary">
              <Download size={20} />
              Download Sekarang
            </a>
            <a href="#features" className="btn btn-outline">
              Pelajari Lebih Lanjut
            </a>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <motion.h2 
          className="section-title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          Fitur <span className="gradient-text">Unggulan</span>
        </motion.h2>

        <motion.div 
          className="features-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div className="feature-card glass-panel" variants={fadeInUp}>
            <div className="feature-icon-wrapper">
              <ShieldCheck size={32} />
            </div>
            <h3 className="feature-title">Bebas Iklan Selamanya</h3>
            <p className="feature-desc">Nikmati pengalaman mendengarkan musik tanpa gangguan iklan sama sekali. 100% gratis dan open-source.</p>
          </motion.div>

          <motion.div className="feature-card glass-panel" variants={fadeInUp}>
            <div className="feature-icon-wrapper">
              <PlayCircle size={32} />
            </div>
            <h3 className="feature-title">Lirik Tersinkronisasi</h3>
            <p className="feature-desc">Ikuti lagu favoritmu dengan lirik yang tersinkronisasi secara otomatis dengan presisi tinggi.</p>
          </motion.div>

          <motion.div className="feature-card glass-panel" variants={fadeInUp}>
            <div className="feature-icon-wrapper">
              <Zap size={32} />
            </div>
            <h3 className="feature-title">Performa Ringan</h3>
            <p className="feature-desc">Dioptimalkan untuk berjalan dengan sangat lancar dan ringan di berbagai perangkat Android.</p>
          </motion.div>

          <motion.div className="feature-card glass-panel" variants={fadeInUp}>
            <div className="feature-icon-wrapper">
              <Smartphone size={32} />
            </div>
            <h3 className="feature-title">UI/UX Premium</h3>
            <p className="feature-desc">Tampilan modern, elegan, dan material-you yang memanjakan mata dengan animasi yang halus.</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Download Section */}
      <section id="download" className="download-section">
        <motion.div 
          className="download-box glass-panel"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>Siap Untuk Memulai?</h2>
          <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>
            Unduh versi terbaru sekarang dan rasakan pengalaman mendengarkan musik terbaik di perangkat Anda.
          </p>

          <div className="version-badge">
            Versi Terbaru: {version}
          </div>

          <a href={downloadUrl} className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.25rem' }}>
            <Download size={24} />
            {isFetching ? 'Memuat Tautan...' : 'Download APK Rilis'}
          </a>
          
          <p className="download-info">
            Tautan ini otomatis mengambil versi rilis terbaru dari GitHub Wibugans/AusDMusic.
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} AusDMusic. All rights reserved.</p>
        <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>Built with ❤️ for music lovers.</p>
      </footer>
    </div>
  );
}

export default App;
