import * as XLSX from 'xlsx';

export const processExcelFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        resolve(jsonData);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

export const generateSampleData = () => {
  const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
  return categories.map((month, index) => ({
    month,
    sales: Math.floor(Math.random() * 1000) + 500,
    revenue: Math.floor(Math.random() * 50000) + 25000,
    customers: Math.floor(Math.random() * 200) + 100,
    expenses: Math.floor(Math.random() * 30000) + 15000,
    id: index + 1
  }));
};

export const calculateStatistics = (data) => {
  if (!data || data.length === 0) return {};
  
  const numericFields = Object.keys(data[0]).filter(key => 
    typeof data[0][key] === 'number'
  );
  
  const stats = {};
  
  numericFields.forEach(field => {
    const values = data.map(item => item[field]);
    stats[field] = {
      total: values.reduce((a, b) => a + b, 0),
      average: values.reduce((a, b) => a + b, 0) / values.length,
      min: Math.min(...values),
      max: Math.max(...values)
    };
  });
  
  return stats;
};