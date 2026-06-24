import React, { useState, useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { Download, Edit2, Link, Moon, Sun, FileUp, Maximize, X } from 'lucide-react';
import ModalEdit from './components/ModalEdit';
import ModalDownload from './components/ModalDownload';

const App = () => {
  const [url, setUrl] = useState('https://example.com');
  const [theme, setTheme] = useState('light');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const qrRef = useRef(null);
  const qrCode = useRef(null);

  // Initial options for QR code
  const [qrOptions, setQrOptions] = useState({
    width: 300,
    height: 300,
    type: 'svg',
    data: 'https://example.com',
    image: null,
    dotsOptions: {
      color: '#0f172a',
      type: 'rounded'
    },
    backgroundOptions: {
      color: '#ffffff',
    },
    imageOptions: {
      crossOrigin: 'anonymous',
      margin: 10,
      imageSize: 0.4
    },
    cornersSquareOptions: {
      type: 'extra-rounded'
    }
  });

  // Initialize QR code on mount
  useEffect(() => {
    qrCode.current = new QRCodeStyling(qrOptions);
    if (qrRef.current) {
      qrCode.current.append(qrRef.current);
    }
  }, []);

  // Update QR code when options or URL change
  useEffect(() => {
    if (qrCode.current) {
      qrCode.current.update({
        ...qrOptions,
        data: url || 'https://example.com' // fallback to prevent errors
      });
    }
  }, [url, qrOptions]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleDownload = (ext, resolution) => {
    if (qrCode.current) {
      // Temporarily update options for download resolution
      const originalOptions = { ...qrOptions };
      qrCode.current.update({
        width: resolution,
        height: resolution
      });
      
      qrCode.current.download({
        extension: ext,
        name: `qr-code-${Date.now()}`
      }).then(() => {
        // Restore original preview size
        qrCode.current.update(originalOptions);
      });
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      setIsFullscreen(true);
      const size = Math.min(window.innerWidth, window.innerHeight) * 0.8;
      qrCode.current.update({ width: size, height: size });
    } else {
      setIsFullscreen(false);
      qrCode.current.update({ width: qrOptions.width, height: qrOptions.height });
    }
  };

  return (
    <div className="app-container">
      {/* LEFT PANEL: INPUT */}
      <div className="left-panel">
        <div className="header-bar" style={{ padding: '0 0 1.5rem 0' }}>
          <div>
            <h1>QR Generator Pro</h1>
            <p className="subtitle">Ubah Tautan atau File URL menjadi QR Code dalam detik.</p>
          </div>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
          </button>
        </div>

        <div className="input-section" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="input-group">
            <label htmlFor="url-input" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Link size={16} /> Link / Tautan URL
            </label>
            <input
              id="url-input"
              type="text"
              placeholder="Masukkan link contoh: https://google.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <p style={{fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '-1rem', marginBottom: '2rem'}}>
            *Jika Anda ingin membuat QR dari file, pastikan file tersebut sudah diunggah ke Google Drive/Dropbox, lalu tempelkan link berbagi di atas.
          </p>
        </div>
      </div>

      {/* RIGHT PANEL: PREVIEW */}
      <div className="right-panel">
        <div className="qr-preview-container">
          <div className={isFullscreen ? "fullscreen-mode" : "qr-code-wrapper"}>
            <div ref={qrRef} />
            {isFullscreen && (
              <button className="close-fullscreen-btn" onClick={toggleFullscreen} aria-label="Close Fullscreen">
                <X size={24} />
              </button>
            )}
          </div>
          
          <div className="action-buttons" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', width: '100%' }}>
            <button className="btn btn-secondary" onClick={() => setIsEditModalOpen(true)}>
              <Edit2 size={18} />
              Edit
            </button>
            <button className="btn btn-primary" onClick={() => setIsDownloadModalOpen(true)}>
              <Download size={18} />
              Download
            </button>
            <button className="btn btn-secondary" style={{ gridColumn: '1 / -1' }} onClick={toggleFullscreen}>
              <Maximize size={18} />
              Tampilkan Penuh
            </button>
          </div>
        </div>
      </div>

      {/* MODALS */}
      <ModalEdit 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        options={qrOptions}
        setOptions={setQrOptions}
      />
      
      <ModalDownload 
        isOpen={isDownloadModalOpen} 
        onClose={() => setIsDownloadModalOpen(false)} 
        onDownload={handleDownload}
      />
    </div>
  );
};

export default App;
