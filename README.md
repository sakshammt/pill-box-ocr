# MediCare - Pill Box Dosage OCR Application

## UBA Mission Government Internship Project

A modern web application that helps users manage their medication schedule by scanning medicine packages using OCR (Optical Character Recognition) technology.
Live demo @ pillboxocr.netlify.app

## Features

### 🔍 OCR Medicine Scanning
- Take photos using device camera or upload images
- Automatic text extraction from medicine packages using Tesseract.js
- Real-time OCR processing with progress indicator

### ✅ Smart Confirmation System
- Review and edit detected medicine names
- User-friendly confirmation interface
- Manual editing capability for accuracy

### ⏰ Flexible Scheduling
- Set custom date and time for medication reminders
- Visual date/time preview before confirmation
- Support for multiple medications

### 🔔 Alarm & Notifications
- Automatic alarm triggers at scheduled time
- Audio alarm with beeping pattern
- Visual modal with medication details
- Mark medications as taken

### 📱 Modern UI/UX
- Responsive design for all devices
- Clean and intuitive interface
- Step-by-step workflow
- Real-time medication list management

## Technology Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **OCR Engine**: Tesseract.js
- **Icons**: Lucide React
- **Audio**: Web Audio API
- **Storage**: LocalStorage for data persistence

## How to Use

1. **Add New Medication**
   - Click "Add New Medication Reminder"
   - Choose to take a photo or upload an image of the medicine package
   - Ensure the medicine name is clearly visible

2. **Confirm Medicine Name**
   - Review the OCR-detected text
   - Edit if necessary to ensure accuracy
   - Click "Confirm & Continue"

3. **Set Reminder**
   - Select the date for the medication
   - Choose the time when you need to take it
   - Review the scheduled time
   - Click "Set Reminder"

4. **Manage Medications**
   - View all scheduled medications on the home screen
   - Delete reminders you no longer need
   - Track which medications are for today

5. **Receive Alarms**
   - When it's time, an alarm will automatically trigger
   - Audio beep will play to alert you
   - Dismiss the alarm after taking your medication


## Project Structure

```
src/
├── components/
│   ├── AlarmModal.tsx          # Alarm notification modal
│   ├── CameraCapture.tsx       # Camera/file upload component
│   ├── MedicationList.tsx      # List of scheduled medications
│   ├── MedicineConfirmation.tsx # OCR text confirmation
│   ├── OCRProcessor.tsx        # OCR processing component
│   └── ScheduleForm.tsx        # Date/time scheduling form
├── hooks/
│   └── useAlarmChecker.ts      # Custom hook for alarm monitoring
├── types/
│   └── index.ts                # TypeScript type definitions
├── App.tsx                     # Main application component
└── index.css                   # Global styles and animations
```

## Key Features Explained

### OCR Processing
The application uses Tesseract.js to perform client-side OCR with advanced preprocessing:
- **Image Enhancement**: 2x resolution scaling, grayscale conversion, contrast adjustment
- **Smart Extraction**: Automatically identifies medicine names from full text
- **Error Correction**: Cleans common OCR mistakes
- **No Server Required**: All processing happens in your browser
- **Privacy-Friendly**: Images never leave your device
- **Works Offline**: After initial load

**For best OCR results**: Good lighting, close-up photos, clear focus. See [OCR_GUIDE.md](./OCR_GUIDE.md) for tips.

### Alarm System
The alarm checker runs every 10 seconds to detect if any medication is due:
- Triggers within a 1-minute window of scheduled time
- Uses Web Audio API for cross-browser audio support
- Visual and audio alerts for maximum effectiveness

### Data Persistence
All medication data is stored in browser LocalStorage:
- Survives page refreshes
- No backend required
- Accessible only to the user

## Future Enhancements

- Push notifications support
- Recurring medication schedules
- Medication history and tracking
- Export/import medication data
- Multi-language OCR support
- Voice reminders

## Author

Developed as part of UBA Mission Government Internship Program

## License

This project is created for educational and internship purposes.

---

**Note**: This application requires camera permissions to scan medicine packages. All data is stored locally on your device and is not transmitted to any server.
