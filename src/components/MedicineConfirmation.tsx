import { useState } from 'react';
import { Edit2, Check } from 'lucide-react';

interface MedicineConfirmationProps {
  detectedText: string;
  onConfirm: (medicineName: string) => void;
  onCancel: () => void;
}

export const MedicineConfirmation: React.FC<MedicineConfirmationProps> = ({
  detectedText,
  onConfirm,
  onCancel,
}) => {
  const [medicineName, setMedicineName] = useState(detectedText);
  const [isEditing, setIsEditing] = useState(false);

  const handleConfirm = () => {
    if (medicineName.trim()) {
      onConfirm(medicineName.trim());
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Confirm Medicine Name</h3>
        <p className="text-gray-600">Please verify and edit if needed</p>
      </div>

      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Detected Medicine Name:
        </label>
        {isEditing ? (
          <textarea
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
            className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-lg"
            rows={3}
            autoFocus
          />
        ) : (
          <div className="bg-white px-4 py-3 rounded-lg border-2 border-gray-200">
            <p className="text-lg font-semibold text-gray-800 whitespace-pre-wrap break-words">
              {medicineName}
            </p>
          </div>
        )}
      </div>

      <button
        onClick={() => setIsEditing(!isEditing)}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
      >
        <Edit2 size={18} />
        {isEditing ? 'Preview' : 'Edit Name'}
      </button>

      <div className="flex gap-4 pt-4">
        <button
          onClick={handleConfirm}
          disabled={!medicineName.trim()}
          className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg font-semibold"
        >
          <Check size={20} />
          Confirm & Continue
        </button>
        <button
          onClick={onCancel}
          className="px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
