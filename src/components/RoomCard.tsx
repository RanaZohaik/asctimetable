
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface RoomCardProps {
  roomNumber: string;
  capacity?: number;
  facilities?: string[];
  isAvailable?: boolean;
  inUse?: {
    subject?: string;
    teacher?: string;
    time?: string;
  };
  onClick?: () => void;
}

const RoomCard: React.FC<RoomCardProps> = ({
  roomNumber,
  capacity,
  facilities = [],
  isAvailable = true,
  inUse,
  onClick
}) => {
  return (
    <Card 
      className={`cursor-pointer hover:shadow-md transition-shadow ${
        isAvailable ? 'border-green-200' : 'border-red-200'
      }`}
      onClick={onClick}
    >
      <CardHeader className="py-3 px-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base">{roomNumber}</CardTitle>
          {isAvailable ? (
            <Badge className="bg-green-500">Available</Badge>
          ) : (
            <Badge className="bg-red-500">In Use</Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 pb-3 px-4">
        {capacity && (
          <div className="text-xs mb-2">
            <span className="text-muted-foreground">Capacity:</span> {capacity} students
          </div>
        )}
        
        {facilities.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {facilities.map((facility, index) => (
              <span key={index} className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded">
                {facility}
              </span>
            ))}
          </div>
        )}
        
        {!isAvailable && inUse && (
          <div className="mt-2 border-t pt-2 border-gray-100">
            <div className="text-xs font-medium">{inUse.subject || 'Class in session'}</div>
            {inUse.teacher && <div className="text-xs">{inUse.teacher}</div>}
            {inUse.time && <div className="text-xs text-muted-foreground">{inUse.time}</div>}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RoomCard;
