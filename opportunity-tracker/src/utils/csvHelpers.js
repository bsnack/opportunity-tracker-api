/**
 * Convert an array of objects to CSV format
 * @param {Array} data - The data to convert
 * @returns {string} CSV formatted string
 */
export const convertToCSV = (data) => {
  if (!data || data.length === 0) return "";
  
  // Get headers (all keys except 'id')
  const headers = Object.keys(data[0]).filter(key => key !== 'id');
  const csvRows = [];
  
  // Add headers
  csvRows.push(headers.join(','));
  
  // Add rows
  data.forEach(item => {
    const values = headers.map(header => {
      const value = item[header];
      
      // Handle arrays (like eligible_grades)
      if (Array.isArray(value)) {
        return `"${JSON.stringify(value)}"`;
      }
      
      // Handle null or undefined values
      if (value === null || value === undefined) {
        return '""';
      }
      
      // Handle strings with commas
      if (typeof value === 'string' && value.includes(',')) {
        return `"${value}"`;
      }
      
      return value;
    });
    
    csvRows.push(values.join(','));
  });
  
  return csvRows.join('\n');
};

/**
 * Parse CSV data into an array of objects
 * @param {string} csvData - The CSV data to parse
 * @returns {Array} Array of objects
 */
export const parseCSV = (csvData) => {
  if (!csvData) return [];
  
  const lines = csvData.split('\n');
  const headers = lines[0].split(',');
  const result = [];
  
  for (let i = 1; i < lines.length; i++) {
    // Skip empty lines
    if (!lines[i].trim()) continue;
    
    const obj = {};
    const currentLine = lines[i].split(',');
    
    headers.forEach((header, index) => {
      let value = currentLine[index];
      
      // Remove quotes if present
      if (value && (value.startsWith('"') && value.endsWith('"'))) {
        value = value.substring(1, value.length - 1);
      }
      
      // Parse arrays
      if (header === 'eligible_grades' && value) {
        try {
          obj[header] = JSON.parse(value);
        } catch (e) {
          obj[header] = [];
        }
      } else {
        obj[header] = value;
      }
    });
    
    // Add id
    obj.id = i;
    
    result.push(obj);
  }
  
  return result;
};

/**
 * Download CSV data as a file
 * @param {string} csvContent - The CSV content
 * @param {string} fileName - The file name
 */
export const downloadCSV = (csvContent, fileName = 'opportunities.csv') => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  // Create download link
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  link.style.visibility = 'hidden';
  
  // Add to document, click, and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};