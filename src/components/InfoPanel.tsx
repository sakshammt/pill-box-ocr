import { AlertCircle, Info } from 'lucide-react';

export const InfoPanel: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-4 shadow-sm">
      <div className="flex gap-3">
        <Info size={24} className="text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="space-y-2 text-sm">
          <p className="font-semibold text-gray-800">
            ℹ️ How Alarms Work
          </p>
          <p className="text-gray-700">
            This app checks for due medications every 10 seconds. For alarms to work:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-1 ml-2">
            <li>Keep this browser tab open</li>
            <li>Don't put your device to sleep</li>
            <li>Ensure sound is enabled on your device</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export const BrowserWarning: React.FC = () => {
  const isHttps = window.location.protocol === 'https:' || window.location.hostname === 'localhost';
  
  if (!isHttps) {
    return (
      <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 shadow-sm">
        <div className="flex gap-3">
          <AlertCircle size={24} className="text-yellow-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold text-gray-800 mb-1">
              ⚠️ Camera Access Limited
            </p>
            <p className="text-gray-700">
              For camera access, this app should be accessed via HTTPS or localhost. 
              You can still upload images from your device.
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  return null;
};
