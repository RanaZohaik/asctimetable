
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Room {
  id: number;
  name: string;
  type: string;
  capacity: number;
  features: string[];
}

const initialRooms = [
  { id: 1, name: "Room 101", type: "Classroom", capacity: 30, features: ["Projector", "Whiteboard"] },
  { id: 2, name: "Room 102", type: "Laboratory", capacity: 25, features: ["Computers", "Microscopes"] },
  { id: 3, name: "Room 103", type: "Classroom", capacity: 35, features: ["Smart Board", "Audio System"] },
  { id: 4, name: "Room 201", type: "Classroom", capacity: 28, features: ["Projector", "Speakers"] },
  { id: 5, name: "Room 202", type: "Library", capacity: 40, features: ["Books", "Computers", "Quiet Space"] },
  { id: 6, name: "Room 203", type: "Science Lab", capacity: 20, features: ["Lab Equipment", "Safety Gear"] },
  { id: 7, name: "Room 301", type: "Computer Lab", capacity: 30, features: ["Desktops", "Printing"] },
  { id: 8, name: "Room 302", type: "Art Studio", capacity: 25, features: ["Art Supplies", "Easels"] },
  { id: 9, name: "Room 303", type: "Music Room", capacity: 20, features: ["Instruments", "Sound Proofing"] },
];

const STORAGE_KEY = 'asc-schedule-rooms';

interface RoomFormData {
  name: string;
  type: string;
  capacity: string;
  features: string;
}

const RoomsList: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>(() => {
    const savedRooms = localStorage.getItem(STORAGE_KEY);
    return savedRooms ? JSON.parse(savedRooms) : initialRooms;
  });
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [roomToDelete, setRoomToDelete] = useState<number | null>(null);
  const [formData, setFormData] = useState<RoomFormData>({
    name: '',
    type: '',
    capacity: '',
    features: ''
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rooms));
  }, [rooms]);

  const handleDeleteRoom = (id: number) => {
    setRoomToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteRoom = () => {
    if (roomToDelete !== null) {
      setRooms(prevRooms => {
        const updatedRooms = prevRooms.filter(room => room.id !== roomToDelete);
        toast({
          title: "Room Deleted",
          description: "The room has been removed",
        });
        return updatedRooms;
      });
    }
    setIsDeleteDialogOpen(false);
    setRoomToDelete(null);
  };

  const handleEditRoom = (room: Room) => {
    setCurrentRoom(room);
    setFormData({
      name: room.name,
      type: room.type,
      capacity: room.capacity.toString(),
      features: room.features.join(', ')
    });
    setIsDialogOpen(true);
  };

  const handleAddRoom = () => {
    setCurrentRoom(null);
    setFormData({
      name: '',
      type: '',
      capacity: '',
      features: ''
    });
    setIsDialogOpen(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveRoom = () => {
    const featuresArray = formData.features
      .split(',')
      .map(feature => feature.trim())
      .filter(feature => feature);

    if (currentRoom) {
      // Edit existing room
      setRooms(prevRooms => 
        prevRooms.map(room => 
          room.id === currentRoom.id 
            ? { 
                ...room, 
                name: formData.name,
                type: formData.type,
                capacity: parseInt(formData.capacity) || 0,
                features: featuresArray
              } 
            : room
        )
      );
      toast({
        title: "Room Updated",
        description: `${formData.name} has been updated successfully`,
      });
    } else {
      // Add new room
      const maxId = Math.max(...rooms.map(room => room.id), 0);
      const newRoom: Room = {
        id: maxId + 1,
        name: formData.name,
        type: formData.type,
        capacity: parseInt(formData.capacity) || 0,
        features: featuresArray
      };
      setRooms(prev => [...prev, newRoom]);
      toast({
        title: "Room Added",
        description: `${formData.name} has been added successfully`,
      });
    }
    setIsDialogOpen(false);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Rooms Management</h2>
        <Button 
          onClick={handleAddRoom}
          size="sm" 
          className="flex items-center gap-1"
        >
          <Plus size={16} />
          Add Room
        </Button>
      </div>

      <ScrollArea className="h-60">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
          {rooms.map((room) => (
            <Card key={room.id} className="hover:shadow-md transition-shadow relative group">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-base">{room.name}</h3>
                    <p className="text-sm mt-1 opacity-80">Type: {room.type}</p>
                  </div>
                  <Badge variant="outline" className="bg-gray-100">
                    Cap: {room.capacity}
                  </Badge>
                </div>
                <div className="mt-3">
                  <p className="text-xs mb-1">Features:</p>
                  <div className="flex flex-wrap gap-1">
                    {room.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 w-7 p-0 bg-gray-100 hover:bg-gray-200"
                    title="Edit Room"
                    onClick={() => handleEditRoom(room)}
                  >
                    <Edit className="h-3 w-3" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDeleteRoom(room.id)}
                    className="h-7 w-7 p-0 bg-gray-100 hover:bg-gray-200"
                    title="Delete Room"
                  >
                    <Trash2 className="h-3 w-3 text-destructive" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      {/* Add/Edit Room Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentRoom ? 'Edit Room' : 'Add New Room'}</DialogTitle>
            <DialogDescription>
              {currentRoom ? 'Make changes to the room details below.' : 'Enter the details for the new room.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Room Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                placeholder="e.g., Room 101"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Room Type</Label>
              <Input
                id="type"
                name="type"
                value={formData.type}
                onChange={handleFormChange}
                placeholder="e.g., Classroom, Laboratory"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                name="capacity"
                type="number"
                value={formData.capacity}
                onChange={handleFormChange}
                placeholder="e.g., 30"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="features">Features (comma-separated)</Label>
              <Input
                id="features"
                name="features"
                value={formData.features}
                onChange={handleFormChange}
                placeholder="e.g., Projector, Whiteboard"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveRoom}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this room? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDeleteRoom}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RoomsList;
