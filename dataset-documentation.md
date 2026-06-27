# 📊 MediCare Synthetic Dataset Documentation

## Overview

This synthetic dataset was created to test, validate, and demonstrate the MediCare medication reminder application. All data is artificially generated and does not represent real patients or medical records.

---

## 📁 Files Included

### 1. **synthetic-dataset.json**
Complete synthetic dataset in JSON format with all categories of test data.

**Size:** ~50KB  
**Format:** JSON  
**Use Case:** Application testing, data analysis, demonstration  

### 2. **medications_dataset.csv**
Individual medication records with scheduling information.

**Columns:** 11  
**Rows:** 40  
**Format:** CSV  
**Use Case:** Medication tracking analysis, adherence studies  

### 3. **user_profiles_dataset.csv**
Synthetic user profiles with demographics and health conditions.

**Columns:** 10  
**Rows:** 20  
**Format:** CSV  
**Use Case:** User behavior analysis, demographic studies  

### 4. **ocr_accuracy_dataset.csv**
OCR test cases with various image quality conditions.

**Columns:** 11  
**Rows:** 40  
**Format:** CSV  
**Use Case:** OCR performance testing, accuracy benchmarking  

---

## 📊 Dataset Statistics

### Overall Metrics
- **Total Medication Records:** 100+
- **Total User Profiles:** 20
- **OCR Test Cases:** 40
- **Time Period:** January 2026
- **Conditions Covered:** 15+
- **Medication Categories:** 8

### Data Quality
- **Realistic:** Based on actual medication patterns
- **Diverse:** Covers multiple age groups, conditions
- **Validated:** Follows medical naming conventions
- **Balanced:** Representative distribution across categories

---

## 🔍 Dataset Categories

### 1. Medicine Names (40 unique medications)

**Categories Included:**
- Pain Relief (Paracetamol, Ibuprofen, Tramadol)
- Diabetes (Metformin, Insulin Glargine)
- Cardiovascular (Aspirin, Atorvastatin, Lisinopril)
- Antibiotics (Amoxicillin, Ciprofloxacin, Azithromycin)
- Mental Health (Sertraline, Escitalopram, Alprazolam)
- Supplements (Vitamin D3, Calcium, Omega-3)
- Others (Antihistamines, Thyroid, Gastric)

**Format:**
```
Medicine Name + Dosage
Example: "Paracetamol 500mg"
```

---

### 2. Sample Medications

**Fields:**
- `id` - Unique identifier (timestamp)
- `name` - Medicine name with dosage
- `scheduledTime` - Time in HH:MM format
- `scheduledDate` - Date in YYYY-MM-DD format
- `createdAt` - Creation timestamp
- `notified` - Boolean (alarm triggered)
- `dosage` - Detailed dosage information
- `frequency` - How often to take
- `notes` - Additional instructions
- `category` - Medical category

**Example:**
```json
{
  "id": "1704892800000",
  "name": "Paracetamol 500mg",
  "scheduledTime": "08:00",
  "scheduledDate": "2026-01-20",
  "dosage": "500mg",
  "frequency": "Twice daily",
  "category": "Pain Relief"
}
```

---

### 3. User Scenarios

**Profiles Included:**
1. **Elderly diabetic patient (68 years)**
   - Conditions: Type 2 Diabetes, Hypertension
   - Medications: 3
   - Adherence: 92%

2. **Young adult with anxiety (28 years)**
   - Conditions: Generalized Anxiety Disorder
   - Medications: 2
   - Adherence: 78%

3. **Middle-aged cardiac patient (55 years)**
   - Conditions: Coronary Artery Disease, High Cholesterol
   - Medications: 4
   - Adherence: 95%

**Use Cases:**
- Testing app with different user types
- Adherence pattern analysis
- Age-based medication complexity

---

### 4. OCR Test Data

**Image Conditions Tested:**
- ✅ Clear box front (95% accuracy)
- ✅ Blister pack (88% accuracy)
- ✅ Prescription bottle (92% accuracy)
- ⚠️ Poor lighting (72% accuracy)
- ⚠️ Angled photo (68% accuracy)
- ⚠️ Blurry image (65% accuracy)
- ❌ Handwritten label (45% accuracy - fails)

**Common OCR Errors:**
- `0` (zero) → `O` (letter O)
- `|` (pipe) → `I` (letter I)
- `l` (lowercase L) → `1` (one)
- Spacing issues
- Perspective distortion

**Fields:**
- `image_type` - Type of photo
- `medicine_name` - Actual name
- `ocr_input` - Raw OCR output
- `expected_output` - Cleaned result
- `ocr_confidence` - Accuracy (0-1)
- `preprocessing_applied` - Yes/No
- `common_errors` - List of errors

---

### 5. Medication Schedules

**Time Slots Distribution:**
- 06:00-09:00: 35% (Morning medications)
- 09:00-12:00: 15% (Mid-morning)
- 12:00-15:00: 10% (Afternoon)
- 15:00-18:00: 8% (Late afternoon)
- 18:00-21:00: 22% (Evening)
- 21:00-00:00: 10% (Bedtime)

**Schedule Types:**
1. **Morning medications (08:00)**
   - Diabetes drugs (Metformin)
   - Blood pressure (Lisinopril)
   - Thyroid (Levothyroxine)
   - Supplements

2. **Evening medications (20:00)**
   - Cholesterol (Atorvastatin)
   - Cardiovascular (Aspirin)
   - Blood pressure (Ramipril)

3. **Before meals (07:30)**
   - Gastric protection (Omeprazole)
   - GERD medications

4. **Bedtime (22:00)**
   - Sleep aids (Zolpidem)
   - Statins (Simvastatin)

---

### 6. Alarm Test Cases

**Test Scenarios:**
```
ALM001: 14:30:00 trigger window (14:30-14:31)
ALM002: 09:00:00 trigger window (09:00-09:01)
ALM003: 20:00:00 trigger window (20:00-20:01)
```

**Expected Behavior:**
- Alarm triggers within 1-minute window
- Audio + Visual notification
- Dismissal marks as notified
- All tests pass

---

### 7. Usage Statistics

**Application Metrics:**
- Total Users: 1,250
- Total Medications Tracked: 4,800
- Avg Medications per User: 3.84
- OCR Success Rate: 87%
- Manual Edit Rate: 23%
- Alarm Trigger Accuracy: 98%
- User Adherence Improvement: 34%
- Avg Session Duration: 3.5 minutes
- Daily Active Users: 890
- Weekly Active Users: 1,100

**Interpretation:**
- High engagement (71% DAU/Total Users)
- Good OCR performance (87%)
- Reasonable manual correction (23%)
- Excellent alarm reliability (98%)
- Significant adherence boost (34% improvement)

---

### 8. Common Medications by Condition

**Diabetes:**
- Metformin 850mg
- Insulin Glargine 100U/ml
- Glimepiride 2mg
- Sitagliptin 100mg

**Hypertension:**
- Lisinopril 5mg
- Amlodipine 5mg
- Losartan 50mg
- Ramipril 2.5mg

**High Cholesterol:**
- Atorvastatin 10mg
- Simvastatin 20mg
- Rosuvastatin 10mg

**Pain Relief:**
- Paracetamol 500mg
- Ibuprofen 400mg
- Tramadol 50mg

**Anxiety/Depression:**
- Sertraline 50mg
- Escitalopram 10mg
- Alprazolam 0.25mg

---

### 9. Demographic Distribution

**Age Groups:**
- 18-30: 12% (avg 1.8 medications)
- 31-50: 28% (avg 2.5 medications)
- 51-70: 42% (avg 4.2 medications)
- 70+: 18% (avg 6.5 medications)

**Gender:**
- Male: 48%
- Female: 52%

**Common Conditions by Age:**
- 18-30: Anxiety, Depression, Allergies
- 31-50: Hypertension, Diabetes, Pain
- 51-70: Cardiovascular, Diabetes, Arthritis
- 70+: Multiple chronic conditions

---

### 10. Error Scenarios

**OCR Failure (13%)**
- Causes: Poor lighting, blurry image, small text
- User Action: Manual entry
- Resolution Time: 30 seconds

**Camera Permission Denied (5%)**
- Causes: Privacy concerns, browser settings
- User Action: Use file upload
- Resolution Time: 10 seconds

**Missed Alarm (2%)**
- Causes: Browser tab closed, device asleep
- User Action: Manual reminder check
- Impact: Low (2% only)

---

## 📈 How to Use This Dataset

### For Testing
```javascript
// Load medications data
import medicationsData from './medications_dataset.csv';

// Test medication creation
testMedicationScheduling(medicationsData[0]);

// Test OCR accuracy
import ocrData from './ocr_accuracy_dataset.csv';
testOCREngine(ocrData);
```

### For Demonstration
```javascript
// Populate demo account
const demoUser = userProfiles[0]; // Elderly diabetic
const demoMedications = demoUser.medications;

// Show realistic medication list
displayMedications(demoMedications);
```

### For Analysis
```python
import pandas as pd

# Load data
medications = pd.read_csv('medications_dataset.csv')

# Analyze adherence rates
avg_adherence = medications['adherence_rate'].mean()
print(f"Average adherence: {avg_adherence:.2%}")

# Analyze by category
category_stats = medications.groupby('category')['adherence_rate'].mean()
print(category_stats)
```

### For Validation
```javascript
// Validate OCR accuracy
const ocrTests = ocrAccuracyData.filter(test => test.success);
const accuracy = ocrTests.length / ocrAccuracyData.length;
console.log(`OCR Accuracy: ${accuracy * 100}%`);
```

---

## 🎯 Dataset Use Cases

### 1. Application Testing
- Test medication creation workflow
- Validate OCR functionality
- Test alarm triggering
- Verify data persistence

### 2. User Acceptance Testing
- Demonstrate app with realistic data
- Show various user scenarios
- Test edge cases

### 3. Performance Testing
- Load test with 100+ medications
- Test OCR with various image qualities
- Stress test alarm system

### 4. Data Analysis
- Adherence pattern analysis
- OCR accuracy benchmarking
- User behavior studies
- Demographic insights

### 5. Presentation/Demo
- Live demo with pre-populated data
- Show realistic medication schedules
- Demonstrate OCR capabilities
- Prove concept with data

---

## 📊 Data Quality Metrics

### Completeness
- ✅ All required fields populated
- ✅ No missing critical data
- ✅ Realistic data distributions

### Accuracy
- ✅ Medical terminology correct
- ✅ Dosages realistic
- ✅ Schedules medically appropriate

### Consistency
- ✅ Formats standardized
- ✅ Naming conventions followed
- ✅ Timestamps logical

### Relevance
- ✅ Represents real-world scenarios
- ✅ Covers edge cases
- ✅ Appropriate complexity

---

## 🔒 Privacy & Ethics

### Synthetic Data Assurance
- ✅ No real patient data
- ✅ No PHI (Protected Health Information)
- ✅ No PII (Personally Identifiable Information)
- ✅ Randomly generated IDs
- ✅ Fictional scenarios only

### Compliance
- ✅ HIPAA compliant (no real data)
- ✅ GDPR compliant (synthetic)
- ✅ Safe for public sharing
- ✅ Educational use approved

---

## 📝 Data Schema

### Medication Record
```typescript
interface Medication {
  id: string;                    // Unique ID (timestamp)
  name: string;                  // Medicine name + dosage
  scheduledTime: string;         // HH:MM format
  scheduledDate: string;         // YYYY-MM-DD
  createdAt: number;             // Unix timestamp
  notified: boolean;             // Alarm triggered?
  dosage?: string;               // Detailed dosage
  frequency?: string;            // How often
  notes?: string;                // Instructions
  category?: string;             // Medical category
}
```

### User Profile
```typescript
interface UserProfile {
  user_id: string;
  age: number;
  gender: 'Male' | 'Female';
  conditions: string[];
  total_medications: number;
  avg_adherence_rate: number;   // 0-1
  app_usage_days: number;
  last_login: string;
  registration_date: string;
  preferred_reminder_time: string;
}
```

### OCR Test
```typescript
interface OCRTest {
  test_id: string;
  image_type: string;
  actual_medicine_name: string;
  ocr_raw_output: string;
  ocr_cleaned_output: string;
  confidence_score: number;      // 0-1
  preprocessing_applied: boolean;
  success: boolean;
}
```

---

## 🔄 Dataset Updates

### Version History
- **v1.0.0** (2026-01-15): Initial release
  - 100+ medication records
  - 20 user profiles
  - 40 OCR test cases
  - Complete documentation

### Future Additions (Planned)
- v1.1.0: Add recurring schedules
- v1.2.0: Add medication interactions
- v1.3.0: Add dosage history
- v2.0.0: Expand to 1000+ records

---

## 📧 Support & Feedback

### Questions?
- Check this documentation first
- Review dataset files
- Test with sample queries

### Contribute?
- Suggest additional scenarios
- Report data issues
- Propose new test cases

---

## 📚 References

### Medical Data Sources
- Common medication names: WHO Essential Medicines List
- Dosages: Standard pharmaceutical references
- Schedules: Clinical practice guidelines

### Dataset Inspiration
- Healthcare informatics standards
- Electronic Health Records (EHR) formats
- Clinical trial data structures

---

## ✅ Validation Checklist

Before using dataset:
- [ ] Files downloaded and accessible
- [ ] CSV files open in spreadsheet software
- [ ] JSON parses correctly
- [ ] Data types understood
- [ ] Use cases identified
- [ ] Privacy compliance verified

---

## 🎓 Educational Use

This dataset is ideal for:
- **Students:** Learning healthcare app development
- **Developers:** Testing medical applications
- **Researchers:** Healthcare informatics studies
- **Presenters:** Demonstrating concepts
- **Interns:** Portfolio projects (like UBA Mission!)

---

**Dataset Created By:** MediCare Development Team  
**Date:** January 15, 2026  
**License:** Open for educational and testing purposes  
**Version:** 1.0.0  

---

**Note:** This is synthetic data for testing purposes only. Not for clinical use.
