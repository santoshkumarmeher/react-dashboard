import React from 'react';

const CustomizationPanel = ({ 
  customization, 
  onCustomizationChange, 
  onClose 
}) => {
  const chartTypes = [
    { value: 'line', label: 'Line Chart', icon: '📈' },
    { value: 'bar', label: 'Bar Chart', icon: '📊' },
    { value: 'area', label: 'Area Chart', icon: '🔽' },
    { value: 'pie', label: 'Pie Chart', icon: '🥧' }
  ];

  const presetThemes = [
    { name: 'Default', primary: '#3f51b5', secondary: '#f50057' },
    { name: 'Ocean', primary: '#2196f3', secondary: '#00bcd4' },
    { name: 'Forest', primary: '#4caf50', secondary: '#8bc34a' },
    { name: 'Sunset', primary: '#ff9800', secondary: '#ff5722' },
    { name: 'Royal', primary: '#9c27b0', secondary: '#673ab7' }
  ];

  return (
    <div className="customization-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>🎨 Customize Dashboard</h2>
        <button className="btn btn-outline" onClick={onClose}>✕ Close</button>
      </div>

      <div className="panel-grid">
        <div>
          <h3 style={{ marginBottom: '15px' }}>Chart Types</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {chartTypes.map(type => (
              <label key={type.value} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                padding: '10px',
                background: customization.chartType === type.value ? 'var(--primary-color)' : 'transparent',
                color: customization.chartType === type.value ? 'white' : 'var(--text-primary)',
                borderRadius: 'var(--border-radius)',
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}>
                <input
                  type="radio"
                  name="chartType"
                  value={type.value}
                  checked={customization.chartType === type.value}
                  onChange={(e) => onCustomizationChange({ ...customization, chartType: e.target.value })}
                  style={{ marginRight: '10px' }}
                />
                <span style={{ fontSize: '1.2rem', marginRight: '8px' }}>{type.icon}</span>
                {type.label}
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: '15px' }}>Color Scheme</h3>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
              Primary Color
            </label>
            <div className="color-picker">
              <input
                type="color"
                value={customization.primaryColor}
                onChange={(e) => onCustomizationChange({ ...customization, primaryColor: e.target.value })}
              />
              <span>{customization.primaryColor}</span>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
              Secondary Color
            </label>
            <div className="color-picker">
              <input
                type="color"
                value={customization.secondaryColor}
                onChange={(e) => onCustomizationChange({ ...customization, secondaryColor: e.target.value })}
              />
              <span>{customization.secondaryColor}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: '15px' }}>Preset Themes</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            {presetThemes.map(theme => (
              <button
                key={theme.name}
                className="btn btn-outline"
                onClick={() => onCustomizationChange({
                  ...customization,
                  primaryColor: theme.primary,
                  secondaryColor: theme.secondary
                })}
                style={{
                  fontSize: '0.8rem',
                  padding: '8px',
                  background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
                  color: 'white',
                  border: 'none'
                }}
              >
                {theme.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(0,0,0,0.05)', borderRadius: 'var(--border-radius)' }}>
        <h4 style={{ marginBottom: '10px' }}>Preview</h4>
        <div style={{ 
          display: 'flex', 
          gap: '10px',
          alignItems: 'center'
        }}>
          <div style={{
            width: '50px',
            height: '30px',
            background: customization.primaryColor,
            borderRadius: '4px'
          }}></div>
          <span>Primary Color</span>
          
          <div style={{
            width: '50px',
            height: '30px',
            background: customization.secondaryColor,
            borderRadius: '4px',
            marginLeft: '15px'
          }}></div>
          <span>Secondary Color</span>
        </div>
      </div>
    </div>
  );
};

export default CustomizationPanel;