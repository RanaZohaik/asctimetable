
import React, { useState, useCallback } from 'react';
import Sidebar from '@/components/Sidebar';
import Timetable from '@/components/Timetable';
import { classes, Class, subjects, Subject, generateSchedule, defaultSchedule, ScheduleItem } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const Index: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<Class>(classes[0]);
  const [schedule, setSchedule] = useState<ScheduleItem[]>(defaultSchedule);
  const [localClasses, setLocalClasses] = useState<Class[]>(classes);
  const [localSubjects, setLocalSubjects] = useState<Subject[]>(subjects);
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

  // Class CRUD operations
  const handleAddClass = useCallback((classData: Omit<Class, 'id'>) => {
    setLocalClasses(prevClasses => {
      const maxId = Math.max(...prevClasses.map(c => c.id), 0);
      const newClass = { ...classData, id: maxId + 1 };
      return [...prevClasses, newClass];
    });
    
    toast({
      title: "Class Added",
      description: `${classData.name} has been added successfully`,
    });
  }, [toast]);

  const handleEditClass = useCallback((id: number, classData: Omit<Class, 'id'>) => {
    setLocalClasses(prevClasses => 
      prevClasses.map(c => c.id === id ? { ...classData, id } : c)
    );
    
    // If the edited class is the currently selected one, update selectedClass
    if (selectedClass.id === id) {
      setSelectedClass(prev => ({ ...classData, id }));
    }
    
    toast({
      title: "Class Updated",
      description: `${classData.name} has been updated successfully`,
    });
  }, [selectedClass, toast]);

  const handleDeleteClass = useCallback((id: number) => {
    setLocalClasses(prevClasses => prevClasses.filter(c => c.id !== id));
    
    // If deleted class is currently selected, select the first available class
    if (selectedClass.id === id) {
      const remainingClasses = localClasses.filter(c => c.id !== id);
      if (remainingClasses.length > 0) {
        handleSelectClass(remainingClasses[0]);
      }
    }
    
    toast({
      title: "Class Deleted",
      description: "The class has been removed",
    });
  }, [selectedClass, localClasses, handleSelectClass, toast]);

  // Subject CRUD operations
  const handleAddSubject = useCallback((subjectData: Omit<Subject, 'id'>) => {
    setLocalSubjects(prevSubjects => {
      const maxId = Math.max(...prevSubjects.map(s => s.id), 0);
      const newSubject = { ...subjectData, id: maxId + 1 };
      return [...prevSubjects, newSubject];
    });
    
    toast({
      title: "Subject Added",
      description: `${subjectData.name} has been added successfully`,
    });
  }, [toast]);

  const handleEditSubject = useCallback((id: number, subjectData: Omit<Subject, 'id'>) => {
    setLocalSubjects(prevSubjects => 
      prevSubjects.map(s => s.id === id ? { ...subjectData, id } : s)
    );
    
    toast({
      title: "Subject Updated",
      description: `${subjectData.name} has been updated successfully`,
    });
  }, [toast]);

  const handleDeleteSubject = useCallback((id: number) => {
    setLocalSubjects(prevSubjects => prevSubjects.filter(s => s.id !== id));
    
    // Remove schedule items that use this subject
    setSchedule(prevSchedule => 
      prevSchedule.filter(item => item.subjectId !== id)
    );
    
    toast({
      title: "Subject Deleted",
      description: "The subject has been removed",
    });
  }, [toast]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        selectedClass={selectedClass} 
        onSelectClass={handleSelectClass}
        onAddClass={handleAddClass}
        onEditClass={handleEditClass}
        onDeleteClass={handleDeleteClass}
      />
      <Timetable 
        selectedClass={selectedClass} 
        schedule={schedule}
        onRefreshSchedule={handleRefreshSchedule}
        onDeleteItem={handleDeleteItem}
        onAddItem={handleAddItem}
        onMoveItem={handleMoveItem}
        onAddSubject={handleAddSubject}
        onEditSubject={handleEditSubject}
        onDeleteSubject={handleDeleteSubject}
      />
    </div>
  );
};

export default Index;
