# MediCare - Technical Documentation

## Architecture Overview

MediCare is a client-side React application built with TypeScript, using modern web APIs for OCR, audio, and storage functionality.

---

## Technology Stack

### Core Technologies
- **React 19.2.6**: UI library with hooks-based architecture
- **TypeScript 5.9.3**: Type safety and better DX
- **Vite 7.3.2**: Fast build tool and dev server
- **Tailwind CSS 4.1.17**: Utility-first CSS framework

### Key Dependencies
- **tesseract.js**: Client-side OCR engine
- **lucide-react**: Icon library
- **clsx & tailwind-merge**: Class name utilities

---

## Project Structure

```
src/
├── components/              # React components
│   ├── AlarmModal.tsx      # Alarm notification UI
│   ├── CameraCapture.tsx   # Camera/file upload
│   ├── InfoPanel.tsx       # Information banners
│   ├── MedicationList.tsx  # List of medications
│   ├── MedicineConfirmation.tsx  # OCR result confirmation
│   ├── OCRProcessor.tsx    # OCR processing logic
│   ├── ScheduleForm.tsx    # Date/time scheduling
│   └── WelcomeGuide.tsx    # First-time user guide
│
├── hooks/                   # Custom React hooks
│   └── useAlarmChecker.ts  # Alarm monitoring logic
│
├── types/                   # TypeScript definitions
│   └── index.ts            # Type definitions
│
├── utils/                   # Utility functions
│   └── cn.ts               # Classname utility
│
├── App.tsx                  # Main application component
├── main.tsx                # Application entry point
└── index.css               # Global styles & animations
```

---

## Core Components

### App.tsx
**Purpose**: Main application orchestrator

**State Management**:
```typescript
- currentStep: 'capture' | 'processing' | 'confirm' | 'schedule' | 'list'
- capturedImage: string | null
- detectedText: string
- confirmedMedicine: string
- medications: Medication[]
- isProcessing: boolean
- showWelcome: boolean
```

**Key Features**:
- Step-based workflow management
- LocalStorage integration
- Alarm triggering coordination
- Welcome guide on first visit

### CameraCapture.tsx
**Purpose**: Handle image input via camera or file upload

**Features**:
- MediaDevices API for camera access
- FileReader API for file uploads
- Canvas API for photo capture
- Stream management and cleanup

**Key Methods**:
```typescript
startCamera(): Promise<void>
stopCamera(): void
capturePhoto(): void
handleFileUpload(e: ChangeEvent<HTMLInputElement>): void
```

### OCRProcessor.tsx
**Purpose**: Process images using Tesseract.js

**OCR Configuration**:
```typescript
Tesseract.recognize(imageData, 'eng', {
  logger: (m) => {
    // Progress tracking
    if (m.status === 'recognizing text') {
      setProgress(Math.round(m.progress * 100));
    }
  }
})
```

**Error Handling**:
- Catches OCR failures
- Provides user-friendly error messages
- Allows retry functionality

### MedicineConfirmation.tsx
**Purpose**: Allow users to review and edit OCR results

**Features**:
- Editable text area
- Toggle between preview and edit modes
- Validation before confirmation

### ScheduleForm.tsx
**Purpose**: Date and time selection for medication

**Validation**:
- Minimum date: Today
- Required fields: date and time
- Preview of scheduled datetime

**Date Formatting**:
```typescript
new Date(`${date}T${time}`).toLocaleString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true
})
```

### MedicationList.tsx
**Purpose**: Display and manage scheduled medications

**Features**:
- Date/time formatting
- Past/present/future detection
- "Today" highlighting
- Delete functionality

**Helper Functions**:
```typescript
isPast(date: string, time: string): boolean
isToday(dateStr: string): boolean
formatTime(time: string): string
formatDate(dateStr: string): string
```

### AlarmModal.tsx
**Purpose**: Display alarm notification with audio

**Audio Implementation**:
Uses Web Audio API for cross-browser compatibility:
```typescript
const audioContext = new AudioContext();
const oscillator = audioContext.createOscillator();
const gainNode = audioContext.createGain();

oscillator.frequency.value = 800; // Hz
oscillator.type = 'sine';
gainNode.gain.value = 0.3; // Volume

// Beeping pattern
setInterval(() => {
  oscillator.frequency.value = isHigh ? 800 : 600;
  isHigh = !isHigh;
}, 500);
```

**Cleanup**:
```typescript
useEffect(() => {
  const cleanup = startAlarm();
  return () => {
    if (cleanup) cleanup();
  };
}, []);
```

---

## Custom Hooks

### useAlarmChecker.ts
**Purpose**: Monitor medications and trigger alarms

**Logic**:
```typescript
const checkAlarms = () => {
  const now = new Date();
  
  medications.forEach((med) => {
    if (med.notified) return;
    
    const scheduledDateTime = new Date(
      `${med.scheduledDate}T${med.scheduledTime}`
    );
    const timeDiff = scheduledDateTime.getTime() - now.getTime();
    
    // Within 1-minute window
    if (timeDiff <= 0 && timeDiff > -60000) {
      setTriggeredAlarm(med);
    }
  });
};
```

**Interval**:
- Checks every 10 seconds (10000ms)
- Immediate check on mount
- Cleanup on unmount

---

## Type Definitions

### Medication
```typescript
interface Medication {
  id: string;                // Unique identifier (timestamp)
  name: string;              // Medicine name
  scheduledTime: string;     // HH:mm format
  scheduledDate: string;     // YYYY-MM-DD format
  createdAt: number;         // Timestamp
  notified: boolean;         // Has alarm been dismissed
}
```

### OCRResult
```typescript
interface OCRResult {
  text: string;              // Extracted text
  confidence: number;        // OCR confidence (0-100)
}
```

---

## Data Persistence

### LocalStorage Schema

**Keys**:
- `medications`: JSON string of Medication[]
- `hasVisited`: "true" | null

**Storage Methods**:
```typescript
// Save
localStorage.setItem('medications', JSON.stringify(medications));

// Load
const saved = localStorage.getItem('medications');
const medications = saved ? JSON.parse(saved) : [];

// Clear
localStorage.removeItem('medications');
```

**Data Size**: Typical usage < 10KB

---

## Styling Architecture

### Tailwind CSS Configuration
Using Tailwind CSS v4 with Vite plugin

**Custom Animations** (src/index.css):
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes bounceIn {
  0% { transform: scale(0.3); opacity: 0; }
  50% { transform: scale(1.05); }
  70% { transform: scale(0.9); }
  100% { transform: scale(1); opacity: 1; }
}
```

### Color Scheme
- **Primary**: Blue (#2563eb)
- **Success**: Green (#16a34a)
- **Warning**: Yellow (#eab308)
- **Danger**: Red (#dc2626)
- **Neutral**: Gray (#6b7280)

---

## Build Configuration

### Vite Configuration (vite.config.ts)
```typescript
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteSingleFile()
  ]
})
```

### Build Output
- Single file build (index.html)
- Inline CSS and JS
- Optimized for distribution
- Gzip size: ~80KB

### Build Commands
```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
```

---

## Browser APIs Used

### MediaDevices API
```typescript
navigator.mediaDevices.getUserMedia({
  video: { facingMode: 'environment' }
})
```

### Canvas API
```typescript
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
ctx.drawImage(videoElement, 0, 0);
const imageData = canvas.toDataURL('image/png');
```

### FileReader API
```typescript
const reader = new FileReader();
reader.onload = (event) => {
  const imageData = event.target?.result as string;
};
reader.readAsDataURL(file);
```

### Web Audio API
```typescript
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();
const oscillator = audioContext.createOscillator();
```

### LocalStorage API
```typescript
localStorage.setItem(key, value);
localStorage.getItem(key);
localStorage.removeItem(key);
```

---

## Performance Considerations

### OCR Optimization
- Tesseract.js worker initialization cached by browser
- First OCR takes ~5-10 seconds
- Subsequent OCRs are faster (~3-5 seconds)

### Memory Management
- Camera streams properly cleaned up
- Audio contexts closed after use
- Event listeners removed on unmount

### Bundle Size
- Tree-shaking enabled
- Code splitting for routes (future)
- Minification in production

---

## Security Considerations

### Data Privacy
- ✅ No external API calls
- ✅ No data transmission
- ✅ Client-side only processing
- ✅ LocalStorage encryption not needed (non-sensitive data)

### Input Validation
- ✅ Date/time validation
- ✅ File type validation (images only)
- ✅ Text input sanitization

### XSS Prevention
- ✅ React's built-in XSS protection
- ✅ No dangerouslySetInnerHTML usage
- ✅ User input properly escaped

---

## Testing Strategy

### Recommended Tests

**Unit Tests**:
- Date/time formatting functions
- Helper functions in MedicationList
- useAlarmChecker logic

**Integration Tests**:
- Full medication flow (capture → confirm → schedule)
- LocalStorage integration
- Alarm triggering

**E2E Tests**:
- Complete user journey
- Camera/upload flow
- Alarm dismissal

### Test Tools (Not Implemented Yet)
- **Vitest**: Unit/integration tests
- **React Testing Library**: Component tests
- **Playwright**: E2E tests

---

## Future Enhancements

### Planned Features
1. **Recurring Reminders**: Daily, weekly schedules
2. **Push Notifications**: Using Service Workers
3. **Data Export**: CSV/JSON download
4. **Multi-language OCR**: Support more languages
5. **Medication History**: Track taken medications
6. **Dosage Tracking**: Amount and frequency
7. **Medication Database**: Auto-complete from known drugs
8. **Cloud Sync**: Optional account-based sync
9. **Voice Reminders**: Text-to-speech
10. **Photo Gallery**: Keep captured images

### Technical Debt
- Add comprehensive error boundaries
- Implement proper loading states
- Add retry logic for failed OCR
- Improve offline support
- Add analytics (privacy-focused)

---

## Development Guidelines

### Code Style
- **Formatting**: Prettier (if configured)
- **Linting**: ESLint with TypeScript rules
- **Naming**: camelCase for variables, PascalCase for components
- **File Organization**: One component per file

### Component Guidelines
- Use functional components with hooks
- Props interfaces defined inline or in types/
- Proper TypeScript typing (no `any`)
- Cleanup in useEffect returns

### Git Workflow (Recommended)
```
main (production)
  ↓
develop (staging)
  ↓
feature/* (features)
bugfix/* (fixes)
```

---

## Debugging

### Common Issues

**OCR Not Working**:
```javascript
// Check if Tesseract loaded
console.log('Tesseract:', typeof Tesseract);

// Check image data
console.log('Image Data:', imageData.substring(0, 50));
```

**Alarm Not Triggering**:
```javascript
// Check medication times
console.log('Medications:', medications);
console.log('Current Time:', new Date());

// Check interval
useEffect(() => {
  console.log('Alarm checker running');
}, [medications]);
```

**LocalStorage Issues**:
```javascript
// Check storage
console.log('Stored:', localStorage.getItem('medications'));

// Check quota
navigator.storage.estimate().then(estimate => {
  console.log('Storage:', estimate);
});
```

### Browser DevTools
- **React DevTools**: Component inspection
- **Network Tab**: Check Tesseract worker loading
- **Application Tab**: Inspect LocalStorage
- **Console**: Error messages

---

## API Reference

### Main App API

```typescript
// Reset workflow
resetFlow(): void

// Start new medication
startNewScan(): void

// Handle image capture
handleImageCapture(imageData: string): void

// Handle OCR completion
handleOCRComplete(text: string): void

// Confirm medicine name
handleMedicineConfirm(medicineName: string): void

// Schedule medication
handleSchedule(time: string, date: string): void

// Delete medication
handleDeleteMedication(id: string): void

// Dismiss alarm
handleAlarmDismiss(): void
```

---

## Performance Metrics

### Target Metrics
- **First Load**: < 3s
- **OCR Processing**: 3-10s
- **Navigation**: < 100ms
- **Build Size**: < 300KB
- **Lighthouse Score**: > 90

### Actual Performance
- **Bundle Size**: 261KB (gzipped: 80KB)
- **Lighthouse**: Not measured yet
- **OCR Time**: 5-10s (first), 3-5s (subsequent)

---

## Deployment

### Static Hosting Options
- **GitHub Pages**: Free, easy setup
- **Netlify**: CI/CD, HTTPS automatic
- **Vercel**: Optimized for React
- **Firebase Hosting**: Google ecosystem

### Deployment Steps
```bash
npm run build
# Upload dist/index.html to hosting
```

### Environment Variables
None required (client-side only)

---

## License & Credits

**Developed for**: UBA Mission Government Internship

**Technologies Used**:
- React (Meta)
- Tesseract.js (Tesseract OCR)
- Tailwind CSS (Tailwind Labs)
- Vite (Evan You)
- Lucide (Lucide Icons)

---

## Contact & Support

For technical questions or contributions:
- Review this documentation
- Check the README.md
- Review the USER_GUIDE.md

---

**Last Updated**: 2026
**Version**: 1.0.0
**Status**: Production Ready
