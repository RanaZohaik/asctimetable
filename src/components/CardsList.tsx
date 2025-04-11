
import React, { useState } from 'react';
import { subjects, Subject } from '../data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import SubjectForm from './SubjectForm';
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

interface CardsListProps {
  onAddSubject?: (subjectData: Omit<Subject, 'id'>) => void;
  onEditSubject?: (id: number, subjectData: Omit<Subject, 'id'>) => void;
  onDeleteSubject?: (id: number) => void;
}

const CardsList: React.FC<CardsListProps> = ({
  onAddSubject,
  onEditSubject,
  onDeleteSubject
}) => {
  const [isAddSubjectDialogOpen, setIsAddSubjectDialogOpen] = useState(false);
  const [editSubjectData, setEditSubjectData] = useState<Subject | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState<number | null>(null);

  const handleAddSubject = () => {
    setIsAddSubjectDialogOpen(true);
  };

  const handleEditSubject = (subject: Subject) => {
    setEditSubjectData(subject);
  };

  const handleDeleteSubject = (id: number) => {
    setSubjectToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const confirmDeleteSubject = () => {
    if (onDeleteSubject && subjectToDelete !== null) {
      onDeleteSubject(subjectToDelete);
    }
    setDeleteConfirmOpen(false);
    setSubjectToDelete(null);
  };

  const handleSaveSubject = (subjectData: Omit<Subject, 'id'>) => {
    if (editSubjectData && onEditSubject) {
      onEditSubject(editSubjectData.id, subjectData);
      setEditSubjectData(null);
    } else if (onAddSubject) {
      onAddSubject(subjectData);
    }
  };

  return (
    <div>
      {onAddSubject && (
        <div className="flex justify-end mb-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleAddSubject}
            className="flex items-center"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Subject
          </Button>
        </div>
      )}
      
      <ScrollArea className="h-60">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
          {subjects.map((subject) => (
            <Card key={subject.id} className={`${subject.colorClass} hover:shadow-md transition-shadow relative group`}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-base">{subject.name}</h3>
                    <p className="text-sm mt-1 opacity-80">Teacher: {subject.teacher}</p>
                  </div>
                  <Badge variant="outline" className="bg-white/30">
                    {subject.code}
                  </Badge>
                </div>
                <div className="mt-3 text-xs">
                  <p>Weekly Hours: {subject.hours || 0}</p>
                  <p className="mt-1">Required Rooms: {subject.roomType || 'Any'}</p>
                </div>
                
                {/* Card Actions */}
                {(onEditSubject || onDeleteSubject) && (
                  <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {onEditSubject && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEditSubject(subject)}
                        className="h-7 w-7 p-0 bg-white/30 hover:bg-white/50"
                      >
                        <Edit className="h-3 w-3" />
                        <span className="sr-only">Edit</span>
                      </Button>
                    )}
                    
                    {onDeleteSubject && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteSubject(subject.id)}
                        className="h-7 w-7 p-0 bg-white/30 hover:bg-white/50"
                      >
                        <Trash2 className="h-3 w-3 text-destructive" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
      
      {/* Subject Forms */}
      <SubjectForm 
        isOpen={isAddSubjectDialogOpen} 
        onClose={() => setIsAddSubjectDialogOpen(false)} 
        onSave={handleSaveSubject} 
      />
      
      <SubjectForm 
        isOpen={!!editSubjectData} 
        onClose={() => setEditSubjectData(null)} 
        onSave={handleSaveSubject} 
        initialData={editSubjectData || undefined} 
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the subject
              and remove it from all schedules.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteSubject} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CardsList;
