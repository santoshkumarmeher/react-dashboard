import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Header from './components/Header.jsx';
import DataUpload from './components/DataUpload.jsx';
import Dashboard from './components/Dashboard.jsx';
import CustomizationPanel from './components/CustomizationPanel.jsx';
import { useLocalStorage } from './hooks/useLocalStorage.js';
import { generateSampleData } from './utils/dataProcessor.js';

function App() {
  const [data, setData] = useLocalStorage('dashboardData', []);
  const [showUpload, setShowUpload] = useState(!data || data.length === 0);
  const [showCustomization, setShowCustomization] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useLocalStorage('darkTheme', false);
  const [customization, setCustomization] = useLocalStorage('dashboardCustomization', {
    chartType: 'line',
    primaryColor: '#3f51b5',
    secondaryColor: '#f50057'
  });

  const dashboardRef = useRef();

  // Apply theme
  React.useEffect(() => {
    document.body.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
  }, [isDarkTheme]);

  // Apply custom colors
  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', customization.primaryColor);
    root.style.setProperty('--secondary-color', customization.secondaryColor);
  }, [customization]);

  const handleDataProcessed = (processedData) => {
    setData(processedData);
    setShowUpload(false);
  };

  const handleExportPNG = async () => {
    if (dashboardRef.current) {
      try {
        const canvas = await html2canvas(dashboardRef.current, {
          scale: 2,
          useCORS: true,
          allowTaint: true
        });
        
        const link = document.createElement('a');
        link.download = 'dashboard.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      } catch (error) {
        console.error('Error exporting PNG:', error);
        alert('Error exporting PNG. Please try again.');
      }
    }
  };

  const handleExportPDF = async () => {
    if (dashboardRef.current) {
      try {
        const canvas = await html2canvas(dashboardRef.current, {
          scale: 2,
          useCORS: true,
          allowTaint: true
        });
        
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('landscape', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('dashboard.pdf');
      } catch (error) {
        console.error('Error exporting PDF:', error);
        alert('Error exporting PDF. Please try again.');
      }
    }
  };

  return (
    <div className="app">
      <Header
        onUploadClick={() => setShowUpload(true)}
        onCustomizeClick={() => setShowCustomization(true)}
        onExportPNG={handleExportPNG}
        onExportPDF={handleExportPDF}
        onThemeToggle={() => setIsDarkTheme(!isDarkTheme)}
        isDarkTheme={isDarkTheme}
      />

      {showUpload && (
        <DataUpload
          onDataProcessed={handleDataProcessed}
          onClose={() => setShowUpload(false)}
        />
      )}

      {showCustomization && (
        <CustomizationPanel
          customization={customization}
          onCustomizationChange={setCustomization}
          onClose={() => setShowCustomization(false)}
        />
      )}

      <div ref={dashboardRef}>
        <Dashboard
          data={data}
          customization={customization}
        />
      </div>

      {/* Floating Action Button for small screens */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        zIndex: 1000
      }}>
        <button
          className="btn btn-primary"
          onClick={() => setShowUpload(true)}
          style={{
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            fontSize: '1.5rem',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
          }}
          title="Upload Data"
        >
          📁
        </button>
        
        <button
          className="btn btn-secondary"
          onClick={() => setShowCustomization(true)}
          style={{
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            fontSize: '1.5rem',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
          }}
          title="Customize"
        >
          🎨
        </button>
      </div>
    </div>
  );
}

export default App;