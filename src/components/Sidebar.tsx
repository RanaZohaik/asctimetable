
import React, { useState } from 'react';
import { classes as initialClasses, Class } from '../data/mockData';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import ClassForm from './ClassForm';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

interface SidebarProps {
  selectedClass: Class | null;
  onSelectClass: (classItem: Class) => void;
  onAddClass?: (classData: Omit<Class, 'id'>) => void;
  onEditClass?: (id: number, classData: Omit<Class, 'id'>) => void;
  onDeleteClass?: (id: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  selectedClass, 
  onSelectClass,
  onAddClass,
  onEditClass,
  onDeleteClass
}) => {
  const [isAddClassDialogOpen, setIsAddClassDialogOpen] = useState(false);
  const [editClassData, setEditClassData] = useState<Class | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [classToDelete, setClassToDelete] = useState<number | null>(null);
  const { toast } = useToast();

  const handleAddClass = () => {
    setIsAddClassDialogOpen(true);
  };

  const handleEditClass = (classItem: Class, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditClassData(classItem);
  };

  const handleDeleteClass = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setClassToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const confirmDeleteClass = () => {
    if (onDeleteClass && classToDelete !== null) {
      onDeleteClass(classToDelete);
      toast({
        title: "Class Deleted",
        description: "The class has been removed successfully",
      });
    }
    setDeleteConfirmOpen(false);
    setClassToDelete(null);
  };

  const handleSaveClass = (classData: Omit<Class, 'id'>) => {
    if (editClassData && onEditClass) {
      onEditClass(editClassData.id, classData);
      setEditClassData(null);
      toast({
        title: "Class Updated",
        description: `${classData.name} has been updated successfully`,
      });
    } else if (onAddClass) {
      onAddClass(classData);
      toast({
        title: "Class Added",
        description: `${classData.name} has been added successfully`,
      });
    }
    setIsAddClassDialogOpen(false);
  };

  return (
    <div className="bg-sidebar w-56 min-h-screen border-r border-sidebar-border flex flex-col">
      <div className="p-4 border-b border-sidebar-border">
        <h2 className="text-lg font-bold text-sidebar-primary">ASC Schedule Buddy</h2>
        <p className="text-xs text-sidebar-foreground mt-1">Timetable Management</p>
      </div>
      
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-sidebar-foreground">Classes</h3>
          {onAddClass && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 w-7 p-0" 
              onClick={handleAddClass}
              title="Add New Class"
            >
              <Plus className="h-4 w-4" />
              <span className="sr-only">Add Class</span>
            </Button>
          )}
        </div>
        
        <div className="space-y-1">
          {initialClasses.map((classItem) => (
            <div 
              key={classItem.id} 
              className="flex items-center justify-between"
            >
              <button
                onClick={() => onSelectClass(classItem)}
                className={`flex-grow text-left px-3 py-2 rounded-md text-sm ${
                  selectedClass?.id === classItem.id
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }`}
              >
                {classItem.name}
              </button>
              
              {onEditClass && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 w-7 p-0 ml-1" 
                  onClick={(e) => handleEditClass(classItem, e)}
                  title="Edit Class"
                >
                  <Edit className="h-3 w-3" />
                  <span className="sr-only">Edit</span>
                </Button>
              )}
              
              {onDeleteClass && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 w-7 p-0" 
                  onClick={(e) => handleDeleteClass(classItem.id, e)}
                  title="Delete Class"
                >
                  <Trash2 className="h-3 w-3 text-destructive" />
                  <span className="sr-only">Delete</span>
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-auto p-4 border-t border-sidebar-border text-xs text-sidebar-foreground">
        <div className="font-medium">Demo: Basic</div>
        <div className="mt-1 opacity-75">ⓒ 2025 ASC Schedule Buddy</div>
      </div>
      
      {/* Class Forms */}
      <ClassForm 
        isOpen={isAddClassDialogOpen} 
        onClose={() => setIsAddClassDialogOpen(false)} 
        onSave={handleSaveClass} 
      />
      
      <ClassForm 
        isOpen={!!editClassData} 
        onClose={() => setEditClassData(null)} 
        onSave={handleSaveClass} 
        initialData={editClassData || undefined} 
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the class
              and remove it from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteClass} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Sidebar;
