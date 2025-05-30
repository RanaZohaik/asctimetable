
import React from 'react';
import { Subject, Period } from '../data/mockData';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { X } from 'lucide-react';

interface TimetableCellProps {
  subject?: Subject;
  period: Period;
  room?: string;
  isEmpty: boolean;
  onDelete?: () => void;
}

const TimetableCell: React.FC<TimetableCellProps> = ({ subject, period, room, isEmpty, onDelete }) => {
  if (isEmpty) {
    return <div className="timetable-cell border border-gray-200 p-2 min-h-[80px] bg-gray-50"></div>;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`timetable-cell border border-gray-200 p-2 min-h-[80px] ${subject?.colorClass}`}>
            <div className="p-1 flex flex-col h-full relative">
              {onDelete && (
                <button 
                  className="absolute top-0 right-0 p-1 text-gray-700 hover:text-red-500 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                  }}
                >
                  <X size={14} />
                </button>
              )}
              <div className="flex justify-between">
                <span className="period-marker text-xs">{period.name}</span>
                {room && <span className="text-[10px]">{room}</span>}
              </div>
              <div className="text-center flex-grow flex items-center justify-center font-bold">
                {subject?.code}
              </div>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-sm">
            <div className="font-bold">{subject?.name}</div>
            <div>Teacher: {subject?.teacher}</div>
            <div>Room: {room}</div>
            <div>Time: {period.startTime} - {period.endTime}</div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TimetableCell;
