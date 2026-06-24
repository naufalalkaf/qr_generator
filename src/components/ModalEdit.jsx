import React, { useRef } from 'react';
import { X, Upload, Trash2 } from 'lucide-react';

const ModalEdit = ({ isOpen, onClose, options, setOptions }) => {
  if (!isOpen) return null;

  const handleColorChange = (e) => {
    setOptions({
      ...options,
      dotsOptions: { ...options.dotsOptions, color: e.target.value }
    });
  };

  const handleBgColorChange = (e) => {
    setOptions({
      ...options,
      backgroundOptions: { ...options.backgroundOptions, color: e.target.value }
    });
  };

  const handleCornerTypeChange = (e) => {
    setOptions({
      ...options,
      dotsOptions: { ...options.dotsOptions, type: e.target.value }
    });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setOptions({
          ...options,
          image: event.target.result,
          imageOptions: { ...options.imageOptions, hideBackgroundDots: true, imageSize: 0.4, margin: 10 }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setOptions({
      ...options,
      image: null
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit QR Code</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="setting-group">
          <label>Warna Pola (Dots)</label>
          <div className="color-picker">
            <input 
              type="color" 
              value={options.dotsOptions?.color || '#000000'} 
              onChange={handleColorChange} 
            />
            <span>{options.dotsOptions?.color || '#000000'}</span>
          </div>
        </div>

        <div className="setting-group">
          <label>Warna Latar Belakang (Background)</label>
          <div className="color-picker">
            <input 
              type="color" 
              value={options.backgroundOptions?.color || '#ffffff'} 
              onChange={handleBgColorChange} 
            />
            <span>{options.backgroundOptions?.color || '#ffffff'}</span>
          </div>
        </div>

        <div className="setting-group">
          <label>Bentuk Titik (Pattern Shape)</label>
          <select 
            className="select-input" 
            value={options.dotsOptions?.type || 'square'}
            onChange={handleCornerTypeChange}
          >
            <option value="square">Kotak (Square)</option>
            <option value="dots">Titik (Dots)</option>
            <option value="rounded">Membulat (Rounded)</option>
            <option value="extra-rounded">Sangat Membulat (Extra Rounded)</option>
            <option value="classy">Elegan (Classy)</option>
          </select>
        </div>

        <div className="setting-group">
          <label>Sisipkan Logo/Gambar</label>
          {!options.image ? (
            <div className="file-input-wrapper">
              <button className="file-input-btn">
                <Upload size={18} />
                Upload Logo
              </button>
              <input type="file" accept="image/*" onChange={handleLogoUpload} />
            </div>
          ) : (
            <div className="file-input-wrapper">
              <button className="file-input-btn" style={{color: '#ef4444', borderColor: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.05)'}} onClick={removeLogo}>
                <Trash2 size={18} />
                Hapus Logo
              </button>
            </div>
          )}
        </div>
        
        <button className="btn btn-primary" style={{width: '100%', marginTop: '1rem'}} onClick={onClose}>
          Selesai
        </button>
      </div>
    </div>
  );
};

export default ModalEdit;
