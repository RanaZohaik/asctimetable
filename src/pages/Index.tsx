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

  const handleMoveItem = useCallback((itemId: number, newPeriodId: number, newDay: number) => {
    setSchedule((prevSchedule) => {
      const itemToMove = prevSchedule.find(item => item.id === itemId);
      if (!itemToMove) return prevSchedule;
      
      const existingItemAtTarget = prevSchedule.find(
        item => item.periodId === newPeriodId && item.day === newDay
      );
      
      if (existingItemAtTarget) {
        toast({
          title: "Cannot Move Card",
          description: "There's already a schedule item in the target position",
          variant: "destructive",
        });
        return prevSchedule;
      }
      
      const updatedItem = {
        ...itemToMove,
        periodId: newPeriodId,
        day: newDay
      };
      
      const updatedSchedule = prevSchedule.map(item => 
        item.id === itemId ? updatedItem : item
      );
      
      toast({
        title: "Card Moved",
        description: "The schedule item has been moved to a new position",
      });
      
      return updatedSchedule;
    });
  }, [toast]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar selectedClass={selectedClass} onSelectClass={handleSelectClass} />
      <Timetable 
        selectedClass={selectedClass} 
        schedule={schedule}
        onRefreshSchedule={handleRefreshSchedule}
        onDeleteItem={handleDeleteItem}
        onAddItem={handleAddItem}
        onMoveItem={handleMoveItem}
      />
    </div>
  );
};

export default Index;
