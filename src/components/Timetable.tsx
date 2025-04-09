
import React, { useState } from 'react';
import TimetableHeader from './TimetableHeader';
import TimetableGrid from './TimetableGrid';
import FilterControls from './FilterControls';
import AddScheduleItem from './AddScheduleItem';
import RoomsPanel from './RoomsPanel';
import { Class, ScheduleItem } from '../data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
}

const Timetable: React.FC<TimetableProps> = ({ 
  selectedClass, 
  schedule, 
  onRefreshSchedule,
  onDeleteItem,
  onAddItem,
  onMoveItem
}) => {
  const [activeTab, setActiveTab] = useState<string>('timetable');
  
  const handleRoomSelect = (roomNumber: string) => {
    // For future implementation: could filter schedule by room or pre-fill the add form
    console.log(`Selected room: ${roomNumber}`);
  };

  return (
    <div className="flex-1 p-4 overflow-auto">
      <FilterControls 
        selectedClassName={selectedClass.name} 
        onRefreshSchedule={onRefreshSchedule}
        rightControls={<AddScheduleItem onAddItem={onAddItem} />}
      />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="timetable">Timetable View</TabsTrigger>
          <TabsTrigger value="rooms">Rooms View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="timetable" className="mt-0">
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
        </TabsContent>
        
        <TabsContent value="rooms" className="mt-0">
          <RoomsPanel onSelectRoom={handleRoomSelect} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Timetable;
