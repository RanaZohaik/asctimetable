
import React from 'react';
import { Subject, Period } from '../data/mockData';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import SubjectCard from './SubjectCard';

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
          <div className="timetable-cell border border-gray-200 p-2 min-h-[80px]">
            <div className="p-1 h-full">
              <span className="period-marker text-xs block mb-1">{period.name}</span>
              
              {subject && (
                <SubjectCard 
                  subject={subject} 
                  room={room} 
                  time={`${period.startTime}-${period.endTime}`} 
                  onDelete={onDelete}
                />
              )}
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
