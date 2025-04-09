
import React, { useState, useCallback } from 'react';
import Sidebar from '@/components/Sidebar';
import Timetable from '@/components/Timetable';
import { classes, Class, generateSchedule, defaultSchedule, ScheduleItem } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const Index: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<Class>(classes[0]);
  const [schedule, setSchedule] = useState<ScheduleItem[]>(defaultSchedule);
  const { toast } = useToast();

  const handleSelectClass = useCallback((classItem: Class) => {
    setSelectedClass(classItem);
    const newSchedule = generateSchedule(classItem.id);
    setSchedule(newSchedule);
    
    toast({
      title: "Class Schedule Loaded",
      description: `Viewing timetable for ${classItem.name}`,
    });
  }, [toast]);

  const handleRefreshSchedule = useCallback(() => {
    const newSchedule = generateSchedule(selectedClass.id);
    setSchedule(newSchedule);
    
    toast({
      title: "Schedule Refreshed",
      description: "The timetable has been regenerated",
    });
  }, [selectedClass, toast]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar selectedClass={selectedClass} onSelectClass={handleSelectClass} />
      <Timetable 
        selectedClass={selectedClass} 
        schedule={schedule}
        onRefreshSchedule={handleRefreshSchedule}
      />
    </div>
  );
};

export default Index;
