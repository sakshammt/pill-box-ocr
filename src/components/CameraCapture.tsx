import { useRef, useState, useCallback } from 'react';
import { Camera, Upload, X } from 'lucide-react';
import { OCRTips } from './OCRTips';

interface CameraCaptureProps {
  onImageCapture: (imageData: string) => void;
  isProcessing: boolean;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({ onImageCapture, isProcessing }) => {
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isLoadingCamera, setIsLoadingCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startCamera = async () => {
    setIsLoadingCamera(true);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      setStream(mediaStream);
      setShowCamera(true);
      
      // Small delay to ensure state updates
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          
          // Set up event handler with timeout fallback
          const timeout = setTimeout(() => {
            console.log('Video load timeout, continuing anyway');
            setIsLoadingCamera(false);
          }, 3000); // 3 second max wait
          
          videoRef.current.onloadedmetadata = () => {
            clearTimeout(timeout);
            videoRef.current?.play()
              .then(() => {
                console.log('Video playing');
                setIsLoadingCamera(false);
              })
              .catch(err => {
                console.error('Play error:', err);
                setIsLoadingCamera(false);
              });
          };
        } else {
          setIsLoadingCamera(false);
        }
      }, 100);
      
    } catch (error) {
      console.error('Error accessing camera:', error);
      setIsLoadingCamera(false);
      setShowCamera(false);
      alert('Unable to access camera. Please use file upload instead.');
    }
  };

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setShowCamera(false);
    setIsLoadingCamera(false);
  }, [stream]);

  const capturePhoto = () => {
    const video = videoRef.current;
    
    if (!video) {
      alert('Video not initialized. Please restart camera.');
      return;
    }

    // Give a small delay to ensure video is fully loaded
    setTimeout(() => {
      if (video.videoWidth > 0 && video.videoHeight > 0) {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = canvas.toDataURL('image/jpeg', 0.95);
            
            if (imageData && imageData.length > 1000) {
              onImageCapture(imageData);
              stopCamera();
            } else {
              alert('Failed to capture image. Please try again.');
            }
          } else {
            alert('Failed to get canvas context.');
          }
        } catch (err) {
          console.error('Capture error:', err);
          alert('Failed to capture. Please try again or use upload.');
        }
      } else {
        alert('Camera not ready. Video dimensions: ' + video.videoWidth + 'x' + video.videoHeight + '. Please wait and try again.');
      }
    }, 100);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result as string;
        onImageCapture(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full space-y-4">
      <OCRTips />
      
      {!showCamera ? (
        <div className="flex flex-col gap-4">
          <button
            onClick={startCamera}
            disabled={isProcessing}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <Camera size={24} />
            <span className="font-semibold">Take Photo of Medicine</span>
          </button>
          
          <div className="relative">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              disabled={isProcessing}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessing}
              className="w-full flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              <Upload size={24} />
              <span className="font-semibold">Upload Image</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="relative">
          {isLoadingCamera && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg z-10">
              <div className="text-white text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p className="font-semibold">Initializing camera...</p>
              </div>
            </div>
          )}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full rounded-lg shadow-xl bg-black"
            style={{ minHeight: '300px' }}
          />
          <div className="flex gap-4 mt-4">
            <button
              onClick={capturePhoto}
              disabled={isProcessing || isLoadingCamera}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 shadow-lg font-semibold"
            >
              {isLoadingCamera ? 'Please wait...' : 'Capture'}
            </button>
            <button
              onClick={stopCamera}
              disabled={isProcessing || isLoadingCamera}
              className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors shadow-lg font-semibold disabled:opacity-50"
            >
              <X size={20} />
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
