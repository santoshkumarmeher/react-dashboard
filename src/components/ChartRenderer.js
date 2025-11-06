import React from 'react';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const ChartRenderer = ({ data, chartType, colors, title }) => {
  if (!data || data.length === 0) {
    return (
      <div className="dashboard-card">
        <h3>{title}</h3>
        <div className="chart-container" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: 'var(--text-secondary)'
        }}>
          No data available. Please upload data to see charts.
        </div>
      </div>
    );
  }

  const numericFields = Object.keys(data[0]).filter(key => 
    typeof data[0][key] === 'number' && key !== 'id'
  );

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 20, right: 30, left: 20, bottom: 20 }
    };

    switch (chartType) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={Object.keys(data[0])[0]} />
            <YAxis />
            <Tooltip />
            <Legend />
            {numericFields.map((field, index) => (
              <Line
                key={field}
                type="monotone"
                dataKey={field}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                dot={{ fill: colors[index % colors.length], strokeWidth: 2 }}
              />
            ))}
          </LineChart>
        );

      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={Object.keys(data[0])[0]} />
            <YAxis />
            <Tooltip />
            <Legend />
            {numericFields.map((field, index) => (
              <Bar
                key={field}
                dataKey={field}
                fill={colors[index % colors.length]}
              />
            ))}
          </BarChart>
        );

      case 'area':
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={Object.keys(data[0])[0]} />
            <YAxis />
            <Tooltip />
            <Legend />
            {numericFields.map((field, index) => (
              <Area
                key={field}
                type="monotone"
                dataKey={field}
                stackId="1"
                stroke={colors[index % colors.length]}
                fill={colors[index % colors.length]}
                fillOpacity={0.6}
              />
            ))}
          </AreaChart>
        );

      case 'pie':
        const pieData = numericFields.map((field, index) => ({
          name: field,
          value: data.reduce((sum, item) => sum + (item[field] || 0), 0)
        }));
        
        return (
          <PieChart {...commonProps}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        );

      default:
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={Object.keys(data[0])[0]} />
            <YAxis />
            <Tooltip />
            <Legend />
            {numericFields.map((field, index) => (
              <Line
                key={field}
                type="monotone"
                dataKey={field}
                stroke={colors[index % colors.length]}
              />
            ))}
          </LineChart>
        );
    }
  };

  return (
    <div className="dashboard-card">
      <h3 style={{ marginBottom: '15px', color: 'var(--text-primary)' }}>
        {title} ({chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart)
      </h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartRenderer;