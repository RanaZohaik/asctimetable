
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import RoomCard from './RoomCard';

// Mock room data - in a real app this would come from your data source
const mockRooms = [
  { 
    id: 1, 
    roomNumber: 'R101', 
    capacity: 30, 
    facilities: ['Projector', 'Whiteboard'], 
    isAvailable: true 
  },
  { 
    id: 2, 
    roomNumber: 'R102', 
    capacity: 25, 
    facilities: ['Smartboard'], 
    isAvailable: false,
    inUse: {
      subject: 'Mathematics',
      teacher: 'Ms. Johnson',
      time: '10:30 - 11:20'
    }
  },
  { 
    id: 3, 
    roomNumber: 'R103', 
    capacity: 40, 
    facilities: ['Projector', 'Audio System'], 
    isAvailable: true 
  },
  { 
    id: 4, 
    roomNumber: 'SCI-1', 
    capacity: 24, 
    facilities: ['Lab Equipment', 'Safety Station'], 
    isAvailable: false,
    inUse: {
      subject: 'Chemistry',
      teacher: 'Mr. White',
      time: '09:00 - 10:20'
    }
  },
  { 
    id: 5, 
    roomNumber: 'L001', 
    capacity: 60, 
    facilities: ['Tiered Seating', 'Projector'], 
    isAvailable: true 
  },
];

interface RoomsPanelProps {
  onSelectRoom?: (roomNumber: string) => void;
}

const RoomsPanel: React.FC<RoomsPanelProps> = ({ onSelectRoom }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-md p-4">
      <h2 className="text-lg font-bold mb-3">Available Rooms</h2>
      
      <div className="mb-3 flex">
        <div className="flex items-center text-xs mr-3">
          <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center text-xs">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
          <span>In Use</span>
        </div>
      </div>
      
      <ScrollArea className="h-[400px] pr-3">
        <div className="space-y-3">
          {mockRooms.map(room => (
            <RoomCard
              key={room.id}
              roomNumber={room.roomNumber}
              capacity={room.capacity}
              facilities={room.facilities}
              isAvailable={room.isAvailable}
              inUse={room.inUse}
              onClick={() => onSelectRoom && onSelectRoom(room.roomNumber)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default RoomsPanel;
