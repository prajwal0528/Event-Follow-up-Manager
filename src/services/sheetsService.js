export const sheetsService = {
  async fetchRecords() {
    try {
      const PUBLISHED_ID = '2PACX-1vTeosya4cvCdtfx0lKlXRQkdGMSU4WoXYEfks7OWNxoF-cLozM_y0DqGxPpwGrg-QfpML6rv2P1V_LN';
      
      const url = `https://docs.google.com/spreadsheets/d/e/${PUBLISHED_ID}/pub?output=csv`;
      
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch data from Google Sheets: ${response.status} - ${response.statusText}`);
      }

      const csvText = await response.text();
      return this.parseCSVData(csvText);
    } catch (error) {
      console.error('Error fetching records:', error);
      throw error;
    }
  },

  parseCSVData(csvText) {
    const rows = csvText.split('\n').filter(row => row.trim() !== '');
    
    // Skip header row (first row)
    const dataRows = rows.slice(1);
    
    return dataRows.map((row, index) => {
      const columns = this.parseCSVRow(row);
      
      // Ensure we have at least 8 columns (pad with empty strings if needed)
      while (columns.length < 8) {
        columns.push('');
      }
      
      // Skip rows that don't have essential data (name and at least one phone number)
      if (!columns[0] || (!columns[3] && !columns[4])) {
        return null;
      }
      
      return {
        id: index + 2,
        name: columns[0] || '',
        designation: columns[1] || '',
        schoolName: columns[2] || '',
        phone: columns[3] || '',
        whatsapp: columns[4] || columns[3] || '', // Use whatsapp if available, otherwise use phone
        status: columns[5] || 'Pending',
        remarks: columns[6] || '',
        lastUpdated: columns[7] || ''
      };
    }).filter(record => record !== null); // Remove null entries
  },

  parseCSVRow(row) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < row.length; i++) {
      const char = row[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === '\t') {
        // Handle tab-separated values (TSV)
        if (!inQuotes) {
          result.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current.trim());
    return result;
  },

  async updateRecord(id, updates) {
    console.warn('Update functionality requires Google Sheets API or Apps Script');
    console.log('Attempted update:', id, updates);
    
    throw new Error('Update functionality requires API key or Google Apps Script setup');
  }
};