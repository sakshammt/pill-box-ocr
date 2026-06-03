/**
 * Preprocess image for better OCR accuracy
 * Applies grayscale conversion, contrast enhancement, and noise reduction
 */
export const preprocessImageForOCR = (imageData: string): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        resolve(imageData);
        return;
      }

      // Increase resolution for better OCR (2x scale)
      const scale = 2;
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      // High quality image smoothing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Draw scaled image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Get image data
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      // Apply image processing
      for (let i = 0; i < data.length; i += 4) {
        // Convert to grayscale using luminosity method
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const gray = 0.299 * r + 0.587 * g + 0.114 * b;
        
        // Apply contrast enhancement using adaptive thresholding
        // This helps separate text from background
        let value: number;
        
        // Simple threshold for high contrast
        if (gray > 140) {
          value = 255; // White (background)
        } else if (gray < 100) {
          value = 0;   // Black (text)
        } else {
          // Middle range - enhance contrast
          value = gray > 120 ? 255 : 0;
        }
        
        data[i] = value;     // R
        data[i + 1] = value; // G
        data[i + 2] = value; // B
        // Alpha channel (data[i + 3]) remains unchanged
      }

      // Put processed image back
      ctx.putImageData(imgData, 0, 0);
      
      // Return as base64 data URL
      resolve(canvas.toDataURL('image/png'));
    };
    
    img.onerror = () => {
      // If image loading fails, return original
      resolve(imageData);
    };
    
    img.src = imageData;
  });
};

/**
 * Extract likely medicine name from OCR text
 * Applies cleaning and extraction heuristics
 */
export const extractMedicineName = (rawText: string): string => {
  if (!rawText || rawText.trim().length === 0) {
    return '';
  }

  let text = rawText;

  // Remove common OCR artifacts and normalize
  text = text
    .replace(/[|\\]/g, 'I')           // Common OCR mistake: | or \ → I
    .replace(/[`'']/g, "'")           // Normalize apostrophes
    .replace(/["'"]/g, '"')           // Normalize quotes
    .replace(/\n+/g, ' ')             // Replace newlines with spaces
    .replace(/\s+/g, ' ')             // Collapse multiple spaces
    .replace(/[^\w\s.-]/g, ' ')       // Remove special chars except .- 
    .trim();

  // Split into lines/words
  const words = text.split(/\s+/).filter(word => word.length > 0);
  
  if (words.length === 0) {
    return '';
  }

  // Medicine names are typically 1-4 words
  // Take the first substantial words (length > 2)
  const significantWords = words.filter(word => word.length > 2);
  
  if (significantWords.length > 0) {
    // Take first 1-3 significant words as medicine name
    const nameWords = significantWords.slice(0, Math.min(3, significantWords.length));
    return nameWords.join(' ');
  }

  // Fallback: take first few words regardless
  return words.slice(0, Math.min(3, words.length)).join(' ');
};

/**
 * Clean and format extracted text
 */
export const cleanOCRText = (text: string): string => {
  return text
    .replace(/\s+/g, ' ')             // Normalize spaces
    .replace(/[^\w\s.-]/g, '')        // Remove special characters
    .trim();
};
