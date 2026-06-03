import { useEffect, useRef, useState } from 'react';
import { Bell, CheckCircle } from 'lucide-react';
import { Medication } from '../types';

interface AlarmModalProps {
  medication: Medication;
  onDismiss: () => void;
}

export const AlarmModal: React.FC<AlarmModalProps> = ({ medication, onDismiss }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    // Create alarm sound using Web Audio API
    const startAlarm = () => {
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        const audioContext = new AudioContext();
        audioContextRef.current = audioContext;

        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        gainNode.gain.value = 0.3;

        oscillatorRef.current = oscillator;
        gainNodeRef.current = gainNode;

        oscillator.start();

        // Create beeping pattern
        let isHigh = true;
        const beepInterval = setInterval(() => {
          if (oscillatorRef.current) {
            oscillatorRef.current.frequency.value = isHigh ? 800 : 600;
            isHigh = !isHigh;
          }
        }, 500);

        return () => {
          clearInterval(beepInterval);
          if (oscillatorRef.current) {
            oscillatorRef.current.stop();
          }
          if (audioContextRef.current) {
            audioContextRef.current.close();
          }
        };
      } catch (error) {
        console.error('Error creating alarm sound:', error);
      }
    };

    const cleanup = startAlarm();

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  const stopAlarm = () => {
    try {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current = null;
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    } catch (error) {
      console.error('Error stopping alarm:', error);
    }
    setIsPlaying(false);
  };

  const handleDismiss = () => {
    stopAlarm();
    onDismiss();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-bounceIn">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-3 bg-white bg-opacity-20 rounded-full ${isPlaying ? 'animate-pulse' : ''}`}>
                <Bell size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Medication Reminder!</h2>
                <p className="text-blue-100 text-sm">It's time to take your medicine</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Medicine Name:</p>
            <p className="text-2xl font-bold text-gray-800 break-words">{medication.name}</p>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-yellow-800 mb-2">⏰ Scheduled Time:</p>
            <p className="text-lg text-gray-700">
              {new Date(`${medication.scheduledDate}T${medication.scheduledTime}`).toLocaleString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              })}
            </p>
          </div>

          <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded">
            <p className="text-sm text-gray-700">
              <strong>Important:</strong> Please take your medication as prescribed by your doctor.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleDismiss}
              className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-4 rounded-lg hover:bg-green-700 transition-colors shadow-lg font-bold text-lg"
            >
              <CheckCircle size={24} />
              I've Taken It
            </button>
          </div>

          {isPlaying && (
            <div className="text-center">
              <button
                onClick={stopAlarm}
                className="text-sm text-gray-600 hover:text-gray-800 underline"
              >
                Stop Alarm Sound
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
