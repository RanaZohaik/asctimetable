
import React from 'react';
import TimetableCell from './TimetableCell';
import { Period, Subject, ScheduleItem, periods, days, subjects } from '../data/mockData';

interface TimetableGridProps {
  schedule: ScheduleItem[];
}

const TimetableGrid: React.FC<TimetableGridProps> = ({ schedule }) => {
  const getSubjectForCell = (periodId: number, dayIndex: number): { subject?: Subject; room?: string } => {
    const scheduleItem = schedule.find(
      (item) => item.periodId === periodId && item.day === dayIndex
    );

    if (!scheduleItem) {
      return { subject: undefined, room: undefined };
    }

    const subject = subjects.find((s) => s.id === scheduleItem.subjectId);
    return { subject, room: scheduleItem.room };
  };

  return (
    <div className="timetable-container overflow-auto">
      {periods.map((period) => (
        <div key={period.id} className="grid grid-cols-6">
          <div className="p-2 text-center font-medium border border-gray-300 bg-gray-50 flex items-center justify-center">
            <div>
              <div>{period.name}</div>
              <div className="text-xs text-gray-500">{period.startTime}-{period.endTime}</div>
            </div>
          </div>
          
          {days.map((day, dayIndex) => {
            const { subject, room } = getSubjectForCell(period.id, dayIndex);
            return (
              <TimetableCell
                key={`${period.id}-${dayIndex}`}
                subject={subject}
                period={period}
                room={room}
                isEmpty={!subject}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default TimetableGrid;
