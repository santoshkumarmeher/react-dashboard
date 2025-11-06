import React from 'react';
import ChartRenderer from './ChartRenderer.js';
import { calculateStatistics } from '../utils/dataProcessor.js';

const Dashboard = ({ data, customization }) => {
  if (!data || data.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '60px 20px',
        color: 'var(--text-secondary)'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📊</div>
        <h2>Welcome to Your Dashboard</h2>
        <p>Upload data or use sample data to get started with visualization.</p>
      </div>
    );
  }

  const stats = calculateStatistics(data);
  const numericFields = Object.keys(data[0]).filter(key => 
    typeof data[0][key] === 'number' && key !== 'id'
  );

  const chartColors = [customization.primaryColor, customization.secondaryColor, '#4caf50', '#ff9800', '#9c27b0'];

  return (
    <div>
      {/* Statistics Cards */}
      <div className="stats-grid">
        {numericFields.slice(0, 4).map(field => (
          <div key={field} className="stat-card">
            <div className="stat-label">{field.toUpperCase()}</div>
            <div className="stat-value">
              {stats[field]?.total ? stats[field].total.toLocaleString() : '0'}
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Avg: {stats[field]?.average ? stats[field].average.toFixed(1) : '0'}
            </div>
          </div>
        ))}
      </div>

      {/* Main Chart */}
      <div className="dashboard-grid">
        <ChartRenderer
          data={data}
          chartType={customization.chartType}
          colors={chartColors}
          title="Main Visualization"
        />

        {/* Additional visualizations can be added here */}
        {numericFields.length > 1 && (
          <ChartRenderer
            data={data}
            chartType={customization.chartType === 'pie' ? 'bar' : 'pie'}
            colors={chartColors}
            title="Alternative View"
          />
        )}
      </div>

      {/* Data Table */}
      <div className="dashboard-card">
        <h3>Raw Data Preview</h3>
        <div style={{ overflowX: 'auto', marginTop: '15px' }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            background: 'var(--card-background)'
          }}>
            <thead>
              <tr style={{ background: 'var(--primary-color)', color: 'white' }}>
                {Object.keys(data[0]).map(key => (
                  <th key={key} style={{ padding: '12px', textAlign: 'left' }}>
                    {key.toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.slice(0, 10).map((row, index) => (
                <tr key={index} style={{ 
                  borderBottom: '1px solid #ddd',
                  background: index % 2 === 0 ? 'rgba(0,0,0,0.02)' : 'transparent'
                }}>
                  {Object.values(row).map((value, cellIndex) => (
                    <td key={cellIndex} style={{ padding: '10px' }}>
                      {typeof value === 'number' ? value.toLocaleString() : value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {data.length > 10 && (
            <div style={{ 
              textAlign: 'center', 
              padding: '10px',
              color: 'var(--text-secondary)',
              fontStyle: 'italic'
            }}>
              Showing first 10 of {data.length} rows
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;