# MediCare User Guide

## Welcome to MediCare! 💊

MediCare is your intelligent medication reminder assistant that uses advanced OCR (Optical Character Recognition) technology to help you never miss a dose.

---

## Quick Start Guide

### Step 1: Add Your First Medication 📸

1. Click the **"Add New Medication Reminder"** button on the home screen
2. You have two options:
   - **Take Photo**: Use your device camera to capture the medicine package
   - **Upload Image**: Select an existing image from your device

**Tips for Best Results:**
- Ensure good lighting
- Keep the medicine name clearly visible
- Hold the camera steady
- Avoid shadows and glare

### Step 2: Confirm the Medicine Name ✅

1. Wait for the OCR engine to process the image (usually 5-10 seconds)
2. Review the detected medicine name
3. Click **"Edit Name"** if you need to make corrections
4. Click **"Confirm & Continue"** when ready

**Important:** Always verify the medicine name for accuracy!

### Step 3: Set Your Reminder ⏰

1. Select the **date** when you need to take the medication
2. Choose the **time** for your reminder
3. Review the scheduled date and time
4. Click **"Set Reminder"**

**Note:** You can only set future dates and times.

### Step 4: Manage Your Medications 📋

On the home screen, you can:
- View all scheduled medications
- See which medications are due today (highlighted in green)
- Delete reminders you no longer need (trash icon)
- Track past medications

---

## Understanding the Interface

### Home Screen

- **Header**: Shows the MediCare logo and app name
- **Info Panels**: Important information about how alarms work
- **Add Button**: Large blue button to add new medications
- **Medication List**: All your scheduled reminders

### Medication Cards

Each medication card shows:
- 💊 Medicine name
- 📅 Scheduled date
- 🕐 Scheduled time
- 🗑️ Delete button
- "Today" badge (for today's medications)
- Grayed out appearance for past medications

### Progress Indicator

When adding a medication, you'll see:
1. **Scan Medicine** - Camera/upload phase
2. **Confirm Name** - Verification phase
3. **Set Reminder** - Scheduling phase

---

## How Alarms Work 🔔

### When an Alarm Triggers

When it's time to take your medication:

1. **Visual Alert**: A modal popup appears with:
   - Medicine name
   - Scheduled time
   - "I've Taken It" button

2. **Audio Alert**: A beeping sound plays automatically
   - You can stop the sound using the "Stop Alarm Sound" button
   - The alarm continues until dismissed

3. **Dismissing the Alarm**:
   - Click **"I've Taken It"** to mark the medication as taken
   - The alarm will stop and the notification will close

### Important Notes

⚠️ **For alarms to work properly:**
- Keep the browser tab open
- Don't close the browser
- Don't put your device to sleep at the scheduled time
- Ensure your device volume is on

The app checks for due medications every 10 seconds and will trigger within a 1-minute window of your scheduled time.

---

## Features Explained

### OCR Technology
- **Tesseract.js** powered text recognition
- Works directly in your browser (no server needed)
- Supports English language text
- Real-time progress tracking

### Data Storage
- All data is stored **locally** on your device
- Uses browser LocalStorage
- No data is sent to external servers
- Data persists across browser sessions
- Clear your browser data to reset the app

### Privacy & Security
- 🔒 100% client-side processing
- 🔒 No data transmission to servers
- 🔒 Camera access only when you initiate it
- 🔒 Images are not stored permanently

---

## Troubleshooting

### OCR Not Working?

**Problem**: No text detected or wrong text
- ✅ Ensure good lighting conditions
- ✅ Take a clearer photo with the medicine name visible
- ✅ Manually edit the detected text

**Problem**: OCR taking too long
- ✅ This is normal for the first time (loading the OCR engine)
- ✅ Subsequent scans will be faster
- ✅ Ensure good internet connection for first load

### Camera Issues?

**Problem**: Can't access camera
- ✅ Grant camera permissions when prompted
- ✅ Use HTTPS or localhost
- ✅ Use the "Upload Image" option instead

**Problem**: Camera shows black screen
- ✅ Check if another app is using the camera
- ✅ Refresh the page
- ✅ Use file upload instead

### Alarm Issues?

**Problem**: Alarm didn't trigger
- ✅ Ensure the browser tab is open
- ✅ Check if the device was asleep
- ✅ Verify the scheduled time was correct
- ✅ Make sure the app was loaded at the scheduled time

**Problem**: No sound
- ✅ Check device volume
- ✅ Unmute your browser tab
- ✅ Some browsers may block audio initially

### Data Issues?

**Problem**: Lost all my medications
- ✅ Check if you cleared browser data
- ✅ Make sure you're using the same browser
- ✅ LocalStorage might have been cleared

**Problem**: Can't delete a medication
- ✅ Click the trash icon on the medication card
- ✅ Refresh the page if the button doesn't work

---

## Best Practices

### For Accurate OCR
1. Use good lighting (natural light is best)
2. Keep the camera parallel to the medicine package
3. Ensure the text is in focus
4. Avoid reflective packaging
5. Get close enough but keep the whole name in frame

### For Reliable Reminders
1. Set reminders a few minutes before you actually need to take the medicine
2. Keep your device charged
3. Don't rely solely on this app - use it as an additional reminder
4. Review your medications list regularly
5. Delete old/past medications to keep the list clean

### For Better Organization
1. Use full medicine names for clarity
2. Set reminders for the same time if you take multiple medications together
3. Check the "Today" tagged medications each morning
4. Remove completed medications to avoid clutter

---

## Keyboard Shortcuts & Tips

- **Tab**: Navigate between form fields
- **Enter**: Submit forms when button is focused
- **Esc**: Not currently mapped (future feature)

---

## Browser Compatibility

### Recommended Browsers
✅ Google Chrome (Latest)
✅ Microsoft Edge (Latest)
✅ Safari (Latest)
✅ Firefox (Latest)

### Features by Browser
- **Camera Access**: All modern browsers with HTTPS
- **OCR Processing**: All browsers with JavaScript enabled
- **Audio Alarms**: All browsers (may require user interaction first)

### Mobile Devices
- ✅ iOS Safari
- ✅ Android Chrome
- ✅ All modern mobile browsers

---

## Privacy Policy

### What We Collect
- **Nothing!** All data stays on your device

### What We Store
- Medicine names you confirm
- Scheduled dates and times
- Notification status
- First visit flag

### Where It's Stored
- Browser LocalStorage (on your device)
- Never sent to any server

### How to Delete Your Data
1. Delete individual medications using the trash icon
2. Clear browser data/cache to remove all data
3. Use browser developer tools to clear LocalStorage

---

## Frequently Asked Questions

**Q: Is internet required?**
A: Only for the first load to download the OCR engine. After that, it works offline.

**Q: Can I use this on multiple devices?**
A: Yes, but data won't sync between devices. Each device maintains its own list.

**Q: What happens if I close the browser?**
A: Your data is saved, but alarms won't trigger when the app is closed.

**Q: Can I set recurring reminders?**
A: Not yet. This is a planned feature for future updates.

**Q: Is my health data secure?**
A: Yes, all data stays on your device. We don't collect or transmit any information.

**Q: Can I export my medication list?**
A: Not currently, but this is planned for future versions.

**Q: Does it work offline?**
A: Yes, after the initial load, most features work offline.

**Q: Can I add medications without scanning?**
A: Yes! Just use the upload feature and then edit the detected text manually.

---

## Support & Feedback

This is a project developed for the UBA Mission Government Internship Program.

For issues or suggestions:
1. Check the troubleshooting section
2. Ensure you're using a supported browser
3. Try refreshing the page
4. Clear browser cache and try again

---

## Technical Details (For Developers)

- **Frontend**: React 19 with TypeScript
- **OCR Engine**: Tesseract.js v5
- **Audio**: Web Audio API
- **Storage**: LocalStorage API
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4

---

## Version History

**v1.0.0** - Initial Release
- OCR medicine scanning
- Manual text editing
- Date/time scheduling
- Audio + visual alarms
- LocalStorage persistence
- Responsive design
- Welcome guide

---

**Remember**: This app is a helpful tool but should not replace professional medical advice. Always consult your healthcare provider for medical decisions.

Stay healthy! 💊💙
