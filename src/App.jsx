import { RecordsProvider } from './context/RecordsContext';
import Dashboard from './components/Dashboard';
import RecordsTable from './components/RecordsTable';
import RecordDetails from './components/RecordDetails';
import { RefreshCw } from 'lucide-react';
import { useRecords } from './context/RecordsContext';

const AppContent = () => {
  const { refreshRecords, loading, statusFilter } = useRecords();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Event Follow-up Manager
              </h1>
              <p className="text-gray-600">
                School Leaders' Evening - January 26, 2026
              </p>
            </div>
            <button
              onClick={refreshRecords}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-6 rounded-lg flex items-center gap-2 transition-colors"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              Refresh Data
            </button>
          </div>
        </div>

        <Dashboard />

        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {statusFilter === 'All' ? 'All Records' : `${statusFilter} Records`}
          </h2>
        </div>

        <RecordsTable />
        <RecordDetails />
      </div>
    </div>
  );
};

function App() {
  return (
    <RecordsProvider>
      <AppContent />
    </RecordsProvider>
  );
}

export default App;
