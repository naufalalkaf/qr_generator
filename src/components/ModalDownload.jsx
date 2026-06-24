import React, { useState } from 'react';
import { X, Download } from 'lucide-react';

const ModalDownload = ({ isOpen, onClose, onDownload }) => {
  const [resolution, setResolution] = useState(512);
  const [format, setFormat] = useState('png');

  if (!isOpen) return null;

  const handleDownloadClick = () => {
    onDownload(format, resolution);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Download QR Code</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="setting-group">
          <label>Resolusi Gambar</label>
          <select 
            className="select-input" 
            value={resolution}
            onChange={(e) => setResolution(Number(e.target.value))}
          >
            <option value={256}>Kecil (256x256)</option>
            <option value={512}>Standar (512x512)</option>
            <option value={1024}>HD (1024x1024)</option>
            <option value={2048}>Ultra HD (2048x2048)</option>
          </select>
        </div>

        <div className="setting-group">
          <label>Format File</label>
          <select 
            className="select-input" 
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          >
            <option value="png">PNG (Transparan, Kualitas Tinggi)</option>
            <option value="jpeg">JPEG (Ukuran File Kecil)</option>
            <option value="webp">WebP (Optimal untuk Web)</option>
            <option value="svg">SVG (Vektor tak terbatas)</option>
          </select>
        </div>

        <button className="btn btn-primary" style={{width: '100%', marginTop: '1.5rem'}} onClick={handleDownloadClick}>
          <Download size={18} />
          Unduh Sekarang
        </button>
      </div>
    </div>
  );
};

export default ModalDownload;
