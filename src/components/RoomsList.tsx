
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Define Room interface
interface Room {
  id: number;
  name: string;
  type: string;
  capacity: number;
  features: string[];
}

// Mock rooms data since it's not available in mockData
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

const RoomsList: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>(() => {
    const savedRooms = localStorage.getItem(STORAGE_KEY);
    return savedRooms ? JSON.parse(savedRooms) : initialRooms;
  });
  const { toast } = useToast();

  // Save rooms to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rooms));
  }, [rooms]);

  const handleDeleteRoom = (id: number) => {
    setRooms(prevRooms => {
      const updatedRooms = prevRooms.filter(room => room.id !== id);
      toast({
        title: "Room Deleted",
        description: "The room has been removed",
      });
      return updatedRooms;
    });
  };

  return (
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
              
              {/* Room Actions */}
              <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 w-7 p-0 bg-gray-100 hover:bg-gray-200"
                  title="Edit Room"
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
  );
};

export default RoomsList;
