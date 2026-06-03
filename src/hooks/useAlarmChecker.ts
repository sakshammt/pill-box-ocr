import { useEffect, useState } from 'react';
import { Medication } from '../types';

export const useAlarmChecker = (medications: Medication[]) => {
  const [triggeredAlarm, setTriggeredAlarm] = useState<Medication | null>(null);

  useEffect(() => {
    const checkAlarms = () => {
      const now = new Date();
      
      medications.forEach((med) => {
        if (med.notified) return;

        const scheduledDateTime = new Date(`${med.scheduledDate}T${med.scheduledTime}`);
        
        // Check if it's time (within 1 minute window)
        const timeDiff = scheduledDateTime.getTime() - now.getTime();
        
        if (timeDiff <= 0 && timeDiff > -60000) {
          setTriggeredAlarm(med);
        }
      });
    };

    // Check every 10 seconds
    const interval = setInterval(checkAlarms, 10000);
    
    // Also check immediately
    checkAlarms();

    return () => clearInterval(interval);
  }, [medications]);

  return { triggeredAlarm, clearAlarm: () => setTriggeredAlarm(null) };
};
