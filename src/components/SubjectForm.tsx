
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Subject } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

interface SubjectFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (subjectData: Omit<Subject, 'id'>) => void;
  initialData?: Subject;
}

// Available color classes for subjects
const colorOptions = [
  'bg-blue-200 text-blue-800',
  'bg-green-200 text-green-800',
  'bg-purple-200 text-purple-800',
  'bg-yellow-200 text-yellow-800',
  'bg-red-200 text-red-800',
  'bg-indigo-200 text-indigo-800',
  'bg-pink-200 text-pink-800',
  'bg-orange-200 text-orange-800',
  'bg-teal-200 text-teal-800',
];

const SubjectForm: React.FC<SubjectFormProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData 
}) => {
  const [name, setName] = useState(initialData?.name || '');
  const [code, setCode] = useState(initialData?.code || '');
  const [teacher, setTeacher] = useState(initialData?.teacher || '');
  const [hours, setHours] = useState(initialData?.hours?.toString() || '');
  const [roomType, setRoomType] = useState(initialData?.roomType || '');
  const [colorClass, setColorClass] = useState(initialData?.colorClass || colorOptions[0]);
  const { toast } = useToast();

  // Reset form when initialData changes
  useEffect(() => {
    if (isOpen) {
      setName(initialData?.name || '');
      setCode(initialData?.code || '');
      setTeacher(initialData?.teacher || '');
      setHours(initialData?.hours?.toString() || '');
      setRoomType(initialData?.roomType || '');
      setColorClass(initialData?.colorClass || colorOptions[0]);
    }
  }, [isOpen, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save changes immediately to localStorage
    onSave({
      name,
      code,
      teacher,
      hours: parseInt(hours) || 0,
      roomType,
      colorClass
    });
    
    toast({
      title: initialData ? "Subject Updated" : "Subject Added",
      description: `${name} has been ${initialData ? "updated" : "added"} successfully`,
    });
    
    // Reset form
    setName('');
    setCode('');
    setTeacher('');
    setHours('');
    setRoomType('');
    setColorClass(colorOptions[0]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Subject' : 'Add New Subject'}</DialogTitle>
          <DialogDescription>
            Changes will be saved automatically.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
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
              
              <div className="grid gap-2">
                <Label htmlFor="code">Subject Code</Label>
                <Input
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="e.g., MATH101"
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
                  placeholder="e.g., 5"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="roomType">Required Room Type</Label>
                <Input
                  id="roomType"
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  placeholder="e.g., Computer Lab"
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="colorClass">Color Theme</Label>
              <Select value={colorClass} onValueChange={setColorClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a color" />
                </SelectTrigger>
                <SelectContent>
                  {colorOptions.map((color, index) => (
                    <SelectItem key={index} value={color}>
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded mr-2 ${color.split(' ')[0]}`}></div>
                        <span>Color {index + 1}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

export default SubjectForm;
