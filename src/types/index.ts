export interface Medication {
  id: string;
  name: string;
  scheduledTime: string;
  scheduledDate: string;
  createdAt: number;
  notified: boolean;
}

export interface OCRResult {
  text: string;
  confidence: number;
}
