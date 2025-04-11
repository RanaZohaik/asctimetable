
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

// Mock rooms data since it's not available in mockData
const mockRooms = [
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

const RoomsList: React.FC = () => {
  return (
    <ScrollArea className="h-60">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
        {mockRooms.map((room) => (
          <Card key={room.id} className="hover:shadow-md transition-shadow">
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
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default RoomsList;
