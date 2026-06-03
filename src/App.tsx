import { useState, useEffect } from 'react';
import { Pill, Plus, X } from 'lucide-react';
import { CameraCapture } from './components/CameraCapture';
import { OCRProcessor } from './components/OCRProcessor';
import { MedicineConfirmation } from './components/MedicineConfirmation';
import { ScheduleForm } from './components/ScheduleForm';
import { MedicationList } from './components/MedicationList';
import { AlarmModal } from './components/AlarmModal';
import { WelcomeGuide } from './components/WelcomeGuide';
import { InfoPanel, BrowserWarning } from './components/InfoPanel';
import { useAlarmChecker } from './hooks/useAlarmChecker';
import { Medication } from './types';

type Step = 'capture' | 'processing' | 'confirm' | 'schedule' | 'list';

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('list');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [detectedText, setDetectedText] = useState<string>('');
  const [confirmedMedicine, setConfirmedMedicine] = useState<string>('');
  const [medications, setMedications] = useState<Medication[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  const { triggeredAlarm, clearAlarm } = useAlarmChecker(medications);

  // Load medications from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('medications');
    if (saved) {
      try {
        setMedications(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading medications:', error);
      }
    }

    // Check if first visit
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setShowWelcome(true);
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);

  // Save medications to localStorage
  useEffect(() => {
    localStorage.setItem('medications', JSON.stringify(medications));
  }, [medications]);

  const handleImageCapture = (imageData: string) => {
    setCapturedImage(imageData);
    setCurrentStep('processing');
    setIsProcessing(true);
  };

  const handleOCRComplete = (text: string) => {
    setDetectedText(text);
    setIsProcessing(false);
    setCurrentStep('confirm');
  };

  const handleMedicineConfirm = (medicineName: string) => {
    setConfirmedMedicine(medicineName);
    setCurrentStep('schedule');
  };

  const handleSchedule = (time: string, date: string) => {
    const newMedication: Medication = {
      id: Date.now().toString(),
      name: confirmedMedicine,
      scheduledTime: time,
      scheduledDate: date,
      createdAt: Date.now(),
      notified: false,
    };

    setMedications((prev) => [...prev, newMedication]);
    resetFlow();
  };

  const handleDeleteMedication = (id: string) => {
    setMedications((prev) => prev.filter((med) => med.id !== id));
  };

  const handleAlarmDismiss = () => {
    if (triggeredAlarm) {
      // Mark as notified
      setMedications((prev) =>
        prev.map((med) =>
          med.id === triggeredAlarm.id ? { ...med, notified: true } : med
        )
      );
      clearAlarm();
    }
  };

  const resetFlow = () => {
    setCapturedImage(null);
    setDetectedText('');
    setConfirmedMedicine('');
    setIsProcessing(false);
    setCurrentStep('list');
  };

  const startNewScan = () => {
    setCurrentStep('capture');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b-4 border-blue-600">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-600 rounded-lg">
                <Pill size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">MediCare</h1>
                <p className="text-sm text-gray-600">Pill Box Dosage Reminder</p>
              </div>
            </div>
            {currentStep !== 'list' && currentStep !== 'capture' && (
              <button
                onClick={resetFlow}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Cancel"
              >
                <X size={24} />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Step Indicator */}
          {currentStep !== 'list' && (
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between text-sm">
                <div className={`flex-1 ${currentStep === 'capture' || currentStep === 'processing' ? 'text-blue-600 font-semibold' : 'text-gray-400'}`}>
                  1. Scan Medicine
                </div>
                <div className="w-12 h-0.5 bg-gray-300" />
                <div className={`flex-1 text-center ${currentStep === 'confirm' ? 'text-blue-600 font-semibold' : 'text-gray-400'}`}>
                  2. Confirm Name
                </div>
                <div className="w-12 h-0.5 bg-gray-300" />
                <div className={`flex-1 text-right ${currentStep === 'schedule' ? 'text-blue-600 font-semibold' : 'text-gray-400'}`}>
                  3. Set Reminder
                </div>
              </div>
            </div>
          )}

          {/* Content based on current step */}
          {currentStep === 'list' && (
            <div className="space-y-6">
              <BrowserWarning />
              <InfoPanel />
              
              <button
                onClick={startNewScan}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl font-bold text-lg"
              >
                <Plus size={28} />
                Add New Medication Reminder
              </button>

              <MedicationList
                medications={medications}
                onDelete={handleDeleteMedication}
              />
            </div>
          )}

          {currentStep === 'capture' && (
            <div className="bg-white rounded-lg shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Scan Medicine Package
              </h2>
              <p className="text-gray-600 mb-6">
                Take a clear photo of your medicine package or upload an image. Make sure the medicine name is visible and well-lit.
              </p>
              <CameraCapture
                onImageCapture={handleImageCapture}
                isProcessing={isProcessing}
              />
            </div>
          )}

          {currentStep === 'processing' && capturedImage && (
            <OCRProcessor
              imageData={capturedImage}
              onOCRComplete={handleOCRComplete}
              onCancel={resetFlow}
            />
          )}

          {currentStep === 'confirm' && (
            <MedicineConfirmation
              detectedText={detectedText}
              onConfirm={handleMedicineConfirm}
              onCancel={resetFlow}
            />
          )}

          {currentStep === 'schedule' && (
            <ScheduleForm
              medicineName={confirmedMedicine}
              onSchedule={handleSchedule}
              onCancel={resetFlow}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <p className="text-center text-gray-600 text-sm">
            <strong>UBA Mission Government Internship Project</strong>
          </p>
          <p className="text-center text-gray-500 text-xs mt-2">
            © 2026 MediCare - Never miss your medication again
          </p>
        </div>
      </footer>

      {/* Alarm Modal */}
      {triggeredAlarm && (
        <AlarmModal medication={triggeredAlarm} onDismiss={handleAlarmDismiss} />
      )}

      {/* Welcome Guide */}
      {showWelcome && <WelcomeGuide onClose={() => setShowWelcome(false)} />}
    </div>
  );
}

export default App;
