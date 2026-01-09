import { createContext, useContext, useState, useEffect } from 'react';
import { sheetsService } from '../services/sheetsService';

const RecordsContext = createContext();

export const useRecords = () => {
  const context = useContext(RecordsContext);
  if (!context) {
    throw new Error('useRecords must be used within RecordsProvider');
  }
  return context;
};

export const RecordsProvider = ({ children }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');

  const loadRecords = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await sheetsService.fetchRecords();
      setRecords(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecords();
  }, []);

  const updateRecord = async (id, updates) => {
    try {
      const success = await sheetsService.updateRecord(id, updates);
      if (success) {
        setRecords(prev =>
          prev.map(record =>
            record.id === id ? { ...record, ...updates } : record
          )
        );
        return true;
      }
      return false;
    } catch (err) {
      console.error('Failed to update record:', err);
      return false;
    }
  };

  const filteredRecords = statusFilter === 'All'
    ? records
    : records.filter(record => record.status === statusFilter);

  const stats = {
    total: records.length,
    pending: records.filter(r => r.status === 'Pending').length,
    completed: records.filter(r => r.status === 'Completed').length,
    notInterested: records.filter(r => r.status === 'Not Interested').length
  };

  const value = {
    records,
    filteredRecords,
    loading,
    error,
    selectedRecord,
    setSelectedRecord,
    statusFilter,
    setStatusFilter,
    stats,
    updateRecord,
    refreshRecords: loadRecords
  };

  return (
    <RecordsContext.Provider value={value}>
      {children}
    </RecordsContext.Provider>
  );
};
