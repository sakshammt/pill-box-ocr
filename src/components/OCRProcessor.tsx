import { useEffect, useState } from 'react';
import Tesseract from 'tesseract.js';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { preprocessImageForOCR, extractMedicineName } from '../utils/imagePreprocessing';

interface OCRProcessorProps {
  imageData: string;
  onOCRComplete: (text: string) => void;
  onCancel: () => void;
}

export const OCRProcessor: React.FC<OCRProcessorProps> = ({ imageData, onOCRComplete, onCancel }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing OCR...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const performOCR = async () => {
      try {
        setStatus('Preprocessing image for better accuracy...');
        
        // Preprocess image using our utility function
        const processedImage = await preprocessImageForOCR(imageData);
        
        setStatus('Loading OCR engine...');
        
        const result = await Tesseract.recognize(processedImage, 'eng', {
          logger: (m) => {
            if (m.status === 'recognizing text') {
              setProgress(Math.round(m.progress * 100));
              setStatus(`Recognizing text... ${Math.round(m.progress * 100)}%`);
            }
          },
        });

        const rawText = result.data.text.trim();
        
        // Extract medicine name using our utility function
        const extractedText = extractMedicineName(rawText);
        
        if (extractedText && extractedText.length > 0) {
          setStatus('Text extracted successfully!');
          setTimeout(() => {
            onOCRComplete(extractedText);
          }, 500);
        } else {
          setError('No text detected. Please try again with a clearer image.');
        }
      } catch (err) {
        console.error('OCR Error:', err);
        setError('Failed to process image. Please try again.');
      }
    };

    performOCR();
  }, [imageData, onOCRComplete]);

  return (
    <div className="bg-white rounded-lg shadow-xl p-6">
      <div className="mb-4">
        <img 
          src={imageData} 
          alt="Captured medicine package" 
          className="w-full max-h-96 object-contain rounded-lg shadow-md bg-gray-100"
          onError={() => {
            console.error('Image failed to load');
            setError('Failed to load captured image. Please try again.');
          }}
        />
      </div>

      {error ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-red-600">
            <XCircle size={24} />
            <p className="font-semibold">{error}</p>
          </div>
          <button
            onClick={onCancel}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            {progress === 100 ? (
              <CheckCircle2 size={24} className="text-green-600" />
            ) : (
              <Loader2 size={24} className="animate-spin text-blue-600" />
            )}
            <p className="font-semibold text-gray-700">{status}</p>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-blue-600 h-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
