
import React, { useState, useCallback, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Timetable from '@/components/Timetable';
import TimetableGenerationProcess from '@/components/TimetableGenerationProcess';
import { classes as initialClasses, Class, subjects as initialSubjects, Subject, generateSchedule, defaultSchedule, ScheduleItem } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const STORAGE_KEYS = {
  CLASSES: 'asc-schedule-classes',
  SUBJECTS: 'asc-schedule-subjects',
  SCHEDULE: 'asc-schedule-items',
  SELECTED_CLASS: 'asc-selected-class',
  ACTIVE_TAB: 'asc-active-tab'
};

const Index: React.FC = () => {
  const [localClasses, setLocalClasses] = useState<Class[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CLASSES);
    return saved ? JSON.parse(saved) : initialClasses;
  });
  
  const [localSubjects, setLocalSubjects] = useState<Subject[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SUBJECTS);
    return saved ? JSON.parse(saved) : initialSubjects;
  });
  
  const [selectedClass, setSelectedClass] = useState<Class>(() => {
    const savedId = localStorage.getItem(STORAGE_KEYS.SELECTED_CLASS);
    const selectedId = savedId ? parseInt(savedId) : null;
    return selectedId 
      ? localClasses.find(c => c.id === selectedId) || localClasses[0] 
      : localClasses[0];
  });
  
  const [schedule, setSchedule] = useState<ScheduleItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SCHEDULE);
    return saved ? JSON.parse(saved) : defaultSchedule;
  });

  const [activeTab, setActiveTab] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_TAB);
    return saved || "timetable";
  });
  
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CLASSES, JSON.stringify(localClasses));
  }, [localClasses]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(localSubjects));
  }, [localSubjects]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SCHEDULE, JSON.stringify(schedule));
  }, [schedule]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SELECTED_CLASS, String(selectedClass.id));
  }, [selectedClass]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_TAB, activeTab);
  }, [activeTab]);

  const handleSelectClass = useCallback((classItem: Class) => {
    setSelectedClass(classItem);
    const savedSchedule = localStorage.getItem(STORAGE_KEYS.SCHEDULE);
    const classSchedule = savedSchedule 
      ? JSON.parse(savedSchedule).filter((item: ScheduleItem) => item.classId === classItem.id)
      : [];
    
    if (classSchedule.length > 0) {
      setSchedule(classSchedule);
    } else {
      const newSchedule = generateSchedule(classItem.id);
      setSchedule(newSchedule);
    }
    
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

  const handleAddClass = useCallback((classData: Omit<Class, 'id'>) => {
    setLocalClasses(prevClasses => {
      const maxId = Math.max(...prevClasses.map(c => c.id), 0);
      const newClass = { ...classData, id: maxId + 1 };
      const updatedClasses = [...prevClasses, newClass];
      localStorage.setItem(STORAGE_KEYS.CLASSES, JSON.stringify(updatedClasses));
      return updatedClasses;
    });
  }, []);

  const handleEditClass = useCallback((id: number, classData: Omit<Class, 'id'>) => {
    setLocalClasses(prevClasses => {
      const updatedClasses = prevClasses.map(c => c.id === id ? { ...classData, id } : c);
      localStorage.setItem(STORAGE_KEYS.CLASSES, JSON.stringify(updatedClasses));
      return updatedClasses;
    });
    
    if (selectedClass?.id === id) {
      setSelectedClass(prev => ({ ...classData, id }));
    }
  }, [selectedClass]);

  const handleDeleteClass = useCallback((id: number) => {
    setLocalClasses(prevClasses => {
      const updatedClasses = prevClasses.filter(c => c.id !== id);
      localStorage.setItem(STORAGE_KEYS.CLASSES, JSON.stringify(updatedClasses));
      return updatedClasses;
    });
    
    if (selectedClass?.id === id) {
      const remainingClasses = localClasses.filter(c => c.id !== id);
      if (remainingClasses.length > 0) {
        handleSelectClass(remainingClasses[0]);
      }
    }
    
    setSchedule(prevSchedule => {
      const updatedSchedule = prevSchedule.filter(item => item.classId !== id);
      localStorage.setItem(STORAGE_KEYS.SCHEDULE, JSON.stringify(updatedSchedule));
      return updatedSchedule;
    });
  }, [selectedClass, localClasses, handleSelectClass]);

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
    setLocalSubjects(prevSubjects => {
      const updatedSubjects = prevSubjects.map(s => s.id === id ? { ...subjectData, id } : s);
      return updatedSubjects;
    });
    
    toast({
      title: "Subject Updated",
      description: `${subjectData.name} has been updated successfully`,
    });
  }, [toast]);

  const handleDeleteSubject = useCallback((id: number) => {
    setLocalSubjects(prevSubjects => prevSubjects.filter(s => s.id !== id));
    
    setSchedule(prevSchedule => {
      const updatedSchedule = prevSchedule.filter(item => item.subjectId !== id);
      return updatedSchedule;
    });
    
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
      <div className="flex-1 overflow-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="p-4">
            <TabsList className="grid w-full md:w-1/3 grid-cols-2">
              <TabsTrigger value="timetable">Timetable View</TabsTrigger>
              <TabsTrigger value="process">Generation Process</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="timetable" className="m-0">
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
          </TabsContent>
          
          <TabsContent value="process" className="p-4 m-0">
            <TimetableGenerationProcess />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
