import React, { useState, useRef } from 'react';
import { processExcelFile, generateSampleData } from '../utils/dataProcessor.js';

const DataUpload = ({ onDataProcessed, onClose }) => {
  const [activeTab, setActiveTab] = useState('upload');
  const [isDragging, setIsDragging] = useState(false);
  const [manualData, setManualData] = useState({
    category: '',
    value: '',
    series: 'series1'
  });
  const [manualEntries, setManualEntries] = useState([]);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      await handleFile(files[0]);
    }
  };

  const handleFileInput = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await handleFile(file);
    }
  };

  const handleFile = async (file) => {
    try {
      if (file.type.includes('excel') || file.type.includes('spreadsheet') || 
          file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        const data = await processExcelFile(file);
        onDataProcessed(data);
        showToast('Excel file processed successfully!', 'success');
      } else {
        showToast('Please upload a valid Excel file', 'error');
      }
    } catch (error) {
      console.error('Error processing file:', error);
      showToast('Error processing file', 'error');
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualData.category && manualData.value) {
      const newEntry = {
        ...manualData,
        value: parseFloat(manualData.value),
        id: Date.now()
      };
      setManualEntries([...manualEntries, newEntry]);
      setManualData({ category: '', value: '', series: 'series1' });
    }
  };

  const useSampleData = () => {
    const sampleData = generateSampleData();
    onDataProcessed(sampleData);
    showToast('Sample data loaded successfully!', 'success');
  };

  const confirmManualData = () => {
    if (manualEntries.length > 0) {
      onDataProcessed(manualEntries);
      showToast('Manual data loaded successfully!', 'success');
    } else {
      showToast('Please add some data entries first', 'error');
    }
  };

  const showToast = (message, type = 'success') => {
    // Toast implementation would go here
    console.log(`${type}: ${message}`);
  };

  return (
    <div className="upload-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Data Input</h2>
        <button className="btn btn-outline" onClick={onClose}>✕ Close</button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button 
          className={`btn ${activeTab === 'upload' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('upload')}
        >
          📁 Upload Excel
        </button>
        <button 
          className={`btn ${activeTab === 'manual' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('manual')}
          style={{ marginLeft: '10px' }}
        >
          ✏️ Manual Entry
        </button>
        <button 
          className="btn btn-secondary"
          onClick={useSampleData}
          style={{ marginLeft: '10px' }}
        >
          🎲 Use Sample Data
        </button>
      </div>

      {activeTab === 'upload' && (
        <div>
          <div 
            className={`upload-area ${isDragging ? 'drag-over' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📊</div>
            <h3>Drop your Excel file here or click to browse</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '10px' }}>
              Supports .xlsx and .xls files
            </p>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInput}
            accept=".xlsx,.xls"
            style={{ display: 'none' }}
          />
        </div>
      )}

      {activeTab === 'manual' && (
        <div className="manual-entry">
          <form onSubmit={handleManualSubmit}>
            <div className="panel-grid">
              <div className="form-group">
                <label>Category</label>
                <input
                  type="text"
                  value={manualData.category}
                  onChange={(e) => setManualData({...manualData, category: e.target.value})}
                  placeholder="e.g., January, Product A"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Value</label>
                <input
                  type="number"
                  value={manualData.value}
                  onChange={(e) => setManualData({...manualData, value: e.target.value})}
                  placeholder="Enter numeric value"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Series</label>
                <select
                  value={manualData.series}
                  onChange={(e) => setManualData({...manualData, series: e.target.value})}
                >
                  <option value="series1">Series 1</option>
                  <option value="series2">Series 2</option>
                  <option value="series3">Series 3</option>
                </select>
              </div>
            </div>
            
            <button type="submit" className="btn btn-primary">
              ➕ Add Entry
            </button>
          </form>

          {manualEntries.length > 0 && (
            <div style={{ marginTop: '30px' }}>
              <h4>Added Entries ({manualEntries.length})</h4>
              <div style={{ maxHeight: '200px', overflowY: 'auto', marginTop: '10px' }}>
                {manualEntries.map(entry => (
                  <div key={entry.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '10px',
                    borderBottom: '1px solid #ddd',
                    background: 'var(--card-background)'
                  }}>
                    <span>{entry.category}</span>
                    <span style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>
                      {entry.value} ({entry.series})
                    </span>
                  </div>
                ))}
              </div>
              
              <button 
                className="btn btn-secondary"
                onClick={confirmManualData}
                style={{ marginTop: '15px' }}
              >
                ✅ Confirm Data
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DataUpload;