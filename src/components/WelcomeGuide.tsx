import { Camera, CheckCircle, Calendar, Bell, X } from 'lucide-react';

interface WelcomeGuideProps {
  onClose: () => void;
}

export const WelcomeGuide: React.FC<WelcomeGuideProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white sticky top-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Welcome to MediCare! 👋</h2>
              <p className="text-blue-100 text-sm mt-1">Your intelligent medication reminder assistant</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
            <p className="text-gray-700">
              Never miss your medication again! MediCare uses advanced OCR technology to scan medicine packages and set up smart reminders.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800">How It Works:</h3>

            {/* Step 1 */}
            <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  1
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Camera size={20} className="text-blue-600" />
                  <h4 className="font-bold text-gray-800">Scan Medicine Package</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Take a clear photo of your medicine box or upload an image. Our OCR technology will automatically extract the medicine name.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  2
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle size={20} className="text-green-600" />
                  <h4 className="font-bold text-gray-800">Confirm & Edit</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Review the detected medicine name. You can edit it to ensure accuracy before proceeding.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  3
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={20} className="text-purple-600" />
                  <h4 className="font-bold text-gray-800">Set Schedule</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Choose the date and time when you need to take your medication. You can set multiple reminders for different medicines.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  4
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Bell size={20} className="text-orange-600" />
                  <h4 className="font-bold text-gray-800">Get Reminders</h4>
                </div>
                <p className="text-sm text-gray-600">
                  When it's time to take your medicine, you'll receive a visual and audio alarm. Simply dismiss it after taking your medication.
                </p>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-2">💡 Pro Tips:</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Ensure good lighting when scanning medicine packages</li>
              <li>• Keep the camera steady for clearer OCR results</li>
              <li>• Always verify the detected medicine name</li>
              <li>• Keep the app tab open for alarms to work</li>
              <li>• All data is stored locally on your device</li>
            </ul>
          </div>

          {/* Privacy Note */}
          <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded">
            <p className="text-sm text-gray-700">
              <strong>🔒 Privacy First:</strong> All your medication data stays on your device. We don't send any information to external servers.
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg font-bold text-lg"
          >
            Get Started!
          </button>
        </div>
      </div>
    </div>
  );
};
