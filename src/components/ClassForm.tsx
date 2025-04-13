
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Class } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

interface ClassFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (classData: Omit<Class, 'id'>) => void;
  initialData?: Class;
}

const ClassForm: React.FC<ClassFormProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData 
}) => {
  const [name, setName] = useState(initialData?.name || '');
  const [grade, setGrade] = useState(initialData?.grade || '');
  const { toast } = useToast();

  // Reset form when initialData changes
  useEffect(() => {
    if (isOpen) {
      setName(initialData?.name || '');
      setGrade(initialData?.grade || '');
    }
  }, [isOpen, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save changes immediately to localStorage
    onSave({
      name,
      grade
    });
    
    toast({
      title: initialData ? "Class Updated" : "Class Added",
      description: `${name} has been ${initialData ? "updated" : "added"} successfully`,
    });
    
    // Reset form
    setName('');
    setGrade('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Class' : 'Add New Class'}</DialogTitle>
          <DialogDescription>
            Changes will be saved automatically.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Class Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Class 1A"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="grade">Grade</Label>
              <Input
                id="grade"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                placeholder="e.g., Grade 1"
                required
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">{initialData ? 'Save Changes' : 'Save'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ClassForm;
