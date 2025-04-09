
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

  const handleDeleteItem = useCallback((id: number) => {
    setSchedule((prevSchedule) => 
      prevSchedule.filter((item) => item.id !== id)
    );
    
    toast({
      title: "Card Deleted",
      description: "The schedule item has been removed",
    });
  }, [toast]);

  const handleAddItem = useCallback((newItem: {
    periodId: number;
    day: number;
    subjectId: number;
    room: string;
  }) => {
    setSchedule((prevSchedule) => {
      // Check if there's already an item in this slot
      const existingItem = prevSchedule.find(
        (item) => item.periodId === newItem.periodId && item.day === newItem.day
      );
      
      if (existingItem) {
        toast({
          title: "Cannot Add Card",
          description: "There's already a schedule item in this slot",
          variant: "destructive",
        });
        return prevSchedule;
      }
      
      // Generate a new unique ID
      const maxId = Math.max(...prevSchedule.map((item) => item.id), 0);
      
      const newScheduleItem: ScheduleItem = {
        id: maxId + 1,
        classId: selectedClass.id,
        ...newItem,
      };
      
      toast({
        title: "Card Added",
        description: "New schedule item has been added",
      });
      
      return [...prevSchedule, newScheduleItem];
    });
  }, [selectedClass, toast]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar selectedClass={selectedClass} onSelectClass={handleSelectClass} />
      <Timetable 
        selectedClass={selectedClass} 
        schedule={schedule}
        onRefreshSchedule={handleRefreshSchedule}
        onDeleteItem={handleDeleteItem}
        onAddItem={handleAddItem}
      />
    </div>
  );
};

export default Index;
