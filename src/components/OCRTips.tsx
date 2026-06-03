import { Camera, Sun, Focus, ZoomIn } from 'lucide-react';

export const OCRTips: React.FC = () => {
  return (
    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 space-y-3">
      <h4 className="font-bold text-gray-800 flex items-center gap-2">
        <Camera size={20} className="text-blue-600" />
        Tips for Better OCR Accuracy
      </h4>
      
      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex items-start gap-2">
          <Sun size={16} className="text-yellow-600 mt-0.5 flex-shrink-0" />
          <div>
            <strong>Good Lighting:</strong> Use natural light or bright room lighting. Avoid shadows on the text.
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <Focus size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
          <div>
            <strong>Clear Focus:</strong> Hold your phone steady and ensure the text is in sharp focus.
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <ZoomIn size={16} className="text-purple-600 mt-0.5 flex-shrink-0" />
          <div>
            <strong>Get Close:</strong> Fill the frame with just the medicine name. Get closer to the text.
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <Camera size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <strong>Straight Angle:</strong> Hold the camera parallel to the label, not at an angle.
          </div>
        </div>
      </div>
      
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded mt-3">
        <p className="text-xs text-gray-700">
          <strong>💡 Pro Tip:</strong> After OCR, you can always edit the detected name manually if it's not 100% accurate. The edit button is on the confirmation screen.
        </p>
      </div>
    </div>
  );
};
