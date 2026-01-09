import { useRecords } from '../context/RecordsContext';
import { Users, Clock, CheckCircle, XCircle } from 'lucide-react';

const Dashboard = () => {
  const { stats, statusFilter, setStatusFilter } = useRecords();

  const cards = [
    {
      title: 'Total Records',
      value: stats.total,
      icon: Users,
      color: 'bg-blue-500',
      filter: 'All'
    },
    {
      title: 'Pending',
      value: stats.pending,
      icon: Clock,
      color: 'bg-yellow-500',
      filter: 'Pending'
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: CheckCircle,
      color: 'bg-green-500',
      filter: 'Completed'
    },
    {
      title: 'Not Interested',
      value: stats.notInterested,
      icon: XCircle,
      color: 'bg-red-500',
      filter: 'Not Interested'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card) => {
        const Icon = card.icon;
        const isActive = statusFilter === card.filter;

        return (
          <button
            key={card.title}
            onClick={() => setStatusFilter(card.filter)}
            className={`p-6 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 text-left ${
              isActive ? 'ring-4 ring-blue-300' : ''
            }`}
            style={{ backgroundColor: 'white' }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-2">
                  {card.title}
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {card.value}
                </p>
              </div>
              <div className={`${card.color} p-4 rounded-full`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default Dashboard;
