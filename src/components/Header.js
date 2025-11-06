import React from 'react';

const Header = ({ 
  onUploadClick, 
  onCustomizeClick, 
  onExportPNG, 
  onExportPDF, 
  onThemeToggle,
  isDarkTheme 
}) => {
  return (
    <header className="header">
      <div>
        <h1>📊 Analytics Dashboard</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '5px' }}>
          Interactive data visualization tool
        </p>
      </div>
      
      <div className="header-controls">
        <button 
          className="theme-toggle"
          onClick={onThemeToggle}
          title="Toggle theme"
        >
          {isDarkTheme ? '☀️' : '🌙'}
        </button>
        
        <button 
          className="btn btn-outline"
          onClick={onUploadClick}
        >
          📁 Upload Data
        </button>
        
        <button 
          className="btn btn-outline"
          onClick={onCustomizeClick}
        >
          🎨 Customize
        </button>
        
        <button 
          className="btn btn-primary"
          onClick={onExportPNG}
        >
          📸 Export PNG
        </button>
        
        <button 
          className="btn btn-secondary"
          onClick={onExportPDF}
        >
          📄 Export PDF
        </button>
      </div>
    </header>
  );
};

export default Header;