
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface FilterControlsProps {
  selectedClassName: string;
  onRefreshSchedule: () => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({ selectedClassName, onRefreshSchedule }) => {
  return (
    <div className="bg-white border border-gray-200 p-3 mb-4 rounded-md shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="font-bold text-lg text-gray-800">{selectedClassName}</h2>
          <Tabs defaultValue="events" className="w-auto">
            <TabsList className="bg-gray-100">
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="cards">Cards</TabsTrigger>
              <TabsTrigger value="rooms">Rooms</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="flex items-center space-x-2">
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
    </div>
  );
};

export default FilterControls;
