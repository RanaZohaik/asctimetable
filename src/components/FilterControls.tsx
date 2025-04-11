
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CardsList from './CardsList';
import RoomsList from './RoomsList';

interface FilterControlsProps {
  selectedClassName: string;
  onRefreshSchedule: () => void;
  rightControls?: React.ReactNode;
}

const FilterControls: React.FC<FilterControlsProps> = ({ 
  selectedClassName, 
  onRefreshSchedule,
  rightControls
}) => {
  return (
    <div className="bg-white border border-gray-200 p-3 mb-4 rounded-md shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-4">
          <h2 className="font-bold text-lg text-gray-800">{selectedClassName}</h2>
        </div>
        
        <div className="flex items-center space-x-2">
          {rightControls}
          <Button variant="outline" size="sm" onClick={onRefreshSchedule}>
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            Print
          </Button>
          <Button variant="outline" size="sm">
            Export
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="events" className="w-full">
        <TabsList className="bg-gray-100 mb-2">
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="cards">Cards</TabsTrigger>
          <TabsTrigger value="rooms">Rooms</TabsTrigger>
        </TabsList>
        
        <TabsContent value="events">
          {/* Events tab is empty as it shows the timetable directly */}
        </TabsContent>
        
        <TabsContent value="cards">
          <CardsList />
        </TabsContent>
        
        <TabsContent value="rooms">
          <RoomsList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FilterControls;
