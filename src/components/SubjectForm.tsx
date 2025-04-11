
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Subject } from '@/data/mockData';

interface SubjectFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (subjectData: Omit<Subject, 'id'>) => void;
  initialData?: Subject;
}

const SubjectForm: React.FC<SubjectFormProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData 
}) => {
  const [code, setCode] = useState(initialData?.code || '');
  const [name, setName] = useState(initialData?.name || '');
  const [teacher, setTeacher] = useState(initialData?.teacher || '');
  const [hours, setHours] = useState(initialData?.hours?.toString() || '0');
  const [roomType, setRoomType] = useState(initialData?.roomType || 'Any');
  
  // Using the same color class as the initial data or a default one
  const [colorClass, setColorClass] = useState(initialData?.colorClass || 'subject-color-1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSave({
      code,
      name,
      teacher,
      colorClass,
      hours: parseInt(hours) || 0,
      roomType
    });
    
    // Reset form
    setCode('');
    setName('');
    setTeacher('');
    setHours('0');
    setRoomType('Any');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Subject' : 'Add New Subject'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="code">Subject Code</Label>
                <Input
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="e.g., Ma"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="name">Subject Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Mathematics"
                  required
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="teacher">Teacher</Label>
              <Input
                id="teacher"
                value={teacher}
                onChange={(e) => setTeacher(e.target.value)}
                placeholder="e.g., Mr. Smith"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="hours">Weekly Hours</Label>
                <Input
                  id="hours"
                  type="number"
                  min="0"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="roomType">Required Room Type</Label>
                <Input
                  id="roomType"
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  placeholder="e.g., Lab, Classroom"
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">{initialData ? 'Update' : 'Add'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SubjectForm;
