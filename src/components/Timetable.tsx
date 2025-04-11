
import React from 'react';
import TimetableHeader from './TimetableHeader';
import TimetableGrid from './TimetableGrid';
import FilterControls from './FilterControls';
import AddScheduleItem from './AddScheduleItem';
import { Class, ScheduleItem, Subject } from '../data/mockData';

interface TimetableProps {
  selectedClass: Class;
  schedule: ScheduleItem[];
  onRefreshSchedule: () => void;
  onDeleteItem: (id: number) => void;
  onAddItem: (newItem: {
    periodId: number;
    day: number;
    subjectId: number;
    room: string;
  }) => void;
  onMoveItem: (itemId: number, newPeriodId: number, newDay: number) => void;
  onAddSubject?: (subjectData: Omit<Subject, 'id'>) => void;
  onEditSubject?: (id: number, subjectData: Omit<Subject, 'id'>) => void;
  onDeleteSubject?: (id: number) => void;
}

const Timetable: React.FC<TimetableProps> = ({ 
  selectedClass, 
  schedule, 
  onRefreshSchedule,
  onDeleteItem,
  onAddItem,
  onMoveItem,
  onAddSubject,
  onEditSubject,
  onDeleteSubject
}) => {
  return (
    <div className="flex-1 p-4 overflow-auto">
      <FilterControls 
        selectedClassName={selectedClass.name} 
        onRefreshSchedule={onRefreshSchedule}
        rightControls={<AddScheduleItem onAddItem={onAddItem} />}
        onAddSubject={onAddSubject}
        onEditSubject={onEditSubject}
        onDeleteSubject={onDeleteSubject}
      />
      
      <div className="bg-white border border-gray-200 rounded-md shadow-md overflow-hidden">
        <TimetableHeader />
        <TimetableGrid 
          schedule={schedule} 
          onDeleteItem={onDeleteItem} 
          onMoveItem={onMoveItem}
        />
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
