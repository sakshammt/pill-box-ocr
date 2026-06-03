import { Medication } from '../types';
import { Trash2, Calendar, Clock, Pill, Bell } from 'lucide-react';

interface MedicationListProps {
  medications: Medication[];
  onDelete: (id: string) => void;
}

export const MedicationList: React.FC<MedicationListProps> = ({ medications, onDelete }) => {
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const isPast = (date: string, time: string) => {
    const scheduledDateTime = new Date(`${date}T${time}`);
    return scheduledDateTime < new Date();
  };

  const isToday = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  if (medications.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <Pill size={48} className="mx-auto text-gray-300 mb-4" />
        <p className="text-gray-500 font-semibold">No medications scheduled yet</p>
        <p className="text-gray-400 text-sm mt-2">Start by scanning a medicine package</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
        <Bell size={24} className="text-blue-600" />
        Your Medication Reminders
      </h3>
      
      <div className="space-y-3">
        {medications.map((med) => {
          const past = isPast(med.scheduledDate, med.scheduledTime);
          const today = isToday(med.scheduledDate);
          
          return (
            <div
              key={med.id}
              className={`bg-white rounded-lg shadow-md border-2 overflow-hidden transition-all ${
                past
                  ? 'border-gray-200 opacity-60'
                  : today
                  ? 'border-green-400 shadow-lg'
                  : 'border-blue-200'
              }`}
            >
              <div className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Pill size={20} className={past ? 'text-gray-400' : 'text-blue-600'} />
                      <h4 className="text-lg font-bold text-gray-800 truncate">
                        {med.name}
                      </h4>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar size={16} />
                        <span>{formatDate(med.scheduledDate)}</span>
                        {today && (
                          <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                            Today
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock size={16} />
                        <span className="font-semibold">{formatTime(med.scheduledTime)}</span>
                      </div>
                    </div>

                    {past && (
                      <div className="mt-2">
                        <span className="text-xs text-gray-500 font-semibold">
                          {med.notified ? '✓ Completed' : 'Past due'}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={() => onDelete(med.id)}
                    className="flex-shrink-0 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete reminder"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
