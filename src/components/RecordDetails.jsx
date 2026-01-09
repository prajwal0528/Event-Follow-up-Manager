import { useRecords } from '../context/RecordsContext';
import { X, MessageCircle, Phone } from 'lucide-react';
import { generateWhatsAppLink, generateCallLink, displayPhoneNumber } from '../utils/whatsappTemplate';

const RecordDetails = () => {
  const { selectedRecord, setSelectedRecord } = useRecords();

  if (!selectedRecord) return null;

  // Use whatsapp number if available, otherwise use phone number
  const contactNumber = selectedRecord.whatsapp || selectedRecord.phone;

  const whatsappLink = generateWhatsAppLink(
    contactNumber,
    selectedRecord.name,
    selectedRecord.schoolName
  );

  const callLink = generateCallLink(selectedRecord.phone || contactNumber);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Not Interested':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
          <h2 className="text-2xl font-bold text-gray-900">Contact Details</h2>
          <button
            onClick={() => setSelectedRecord(null)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <div className="text-lg font-semibold text-gray-900">
                {selectedRecord.name}
              </div>
            </div>

            {selectedRecord.designation && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Designation
                </label>
                <div className="text-lg font-semibold text-gray-900">
                  {selectedRecord.designation}
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                School Name
              </label>
              <div className="text-lg font-semibold text-gray-900">
                {selectedRecord.schoolName || 'N/A'}
              </div>
            </div>

            {selectedRecord.phone && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="text-lg font-semibold text-gray-900">
                  {displayPhoneNumber(selectedRecord.phone)}
                </div>
              </div>
            )}

            {selectedRecord.whatsapp && selectedRecord.whatsapp !== selectedRecord.phone && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  WhatsApp Number
                </label>
                <div className="text-lg font-semibold text-gray-900">
                  {displayPhoneNumber(selectedRecord.whatsapp)}
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <div className={`inline-flex px-4 py-2 rounded-lg font-semibold border-2 ${getStatusColor(selectedRecord.status)}`}>
                {selectedRecord.status}
              </div>
            </div>
          </div>

          {selectedRecord.remarks && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Remarks
              </label>
              <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-900">{selectedRecord.remarks}</p>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Send WhatsApp Message
            </a>

            <a
              href={callLink}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> To update status or remarks, please edit the Google Sheet directly. Changes will appear here after refreshing the page.
            </p>
          </div>

          <button
            onClick={() => setSelectedRecord(null)}
            className="w-full px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordDetails;