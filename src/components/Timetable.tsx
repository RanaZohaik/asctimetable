
import React from 'react';
import TimetableHeader from './TimetableHeader';
import TimetableGrid from './TimetableGrid';
import FilterControls from './FilterControls';
import { Class, ScheduleItem } from '../data/mockData';

interface TimetableProps {
  selectedClass: Class;
  schedule: ScheduleItem[];
  onRefreshSchedule: () => void;
}

const Timetable: React.FC<TimetableProps> = ({ selectedClass, schedule, onRefreshSchedule }) => {
  return (
    <div className="flex-1 p-4 overflow-auto">
      <FilterControls 
        selectedClassName={selectedClass.name} 
        onRefreshSchedule={onRefreshSchedule} 
      />
      
      <div className="bg-white border border-gray-200 rounded-md shadow-md overflow-hidden">
        <TimetableHeader />
        <TimetableGrid schedule={schedule} />
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2 p-3 bg-gray-100 rounded-md border border-gray-200">
        {Array.from({ length: 15 }, (_, i) => (
          <div key={i} className={`subject-color-${i + 1} text-xs px-3 py-1 rounded`}>
            Subject {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timetable;
