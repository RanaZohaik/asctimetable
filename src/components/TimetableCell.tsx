
import React from 'react';
import { Subject, Period } from '../data/mockData';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface TimetableCellProps {
  subject?: Subject;
  period: Period;
  room?: string;
  isEmpty: boolean;
}

const TimetableCell: React.FC<TimetableCellProps> = ({ subject, period, room, isEmpty }) => {
  if (isEmpty) {
    return <div className="timetable-cell"></div>;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`timetable-cell occupied ${subject?.colorClass}`}>
            <div className="p-1 flex flex-col h-full">
              <div className="flex justify-between">
                <span className="period-marker">{period.name}</span>
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
