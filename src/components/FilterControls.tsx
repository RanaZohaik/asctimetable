
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Printer, FileText } from 'lucide-react';
import CardsList from './CardsList';
import RoomsList from './RoomsList';
import { Subject } from '@/data/mockData';

interface FilterControlsProps {
  selectedClassName: string;
  onRefreshSchedule: () => void;
  rightControls?: React.ReactNode;
  onAddSubject?: (subjectData: Omit<Subject, 'id'>) => void;
  onEditSubject?: (id: number, subjectData: Omit<Subject, 'id'>) => void;
  onDeleteSubject?: (id: number) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({ 
  selectedClassName, 
  onRefreshSchedule,
  rightControls,
  onAddSubject,
  onEditSubject,
  onDeleteSubject
}) => {
  // Function to handle printing
  const handlePrint = () => {
    window.print();
  };

  // Function to handle export (CSV format)
  const handleExport = () => {
    // Get the current date and time for the filename
    const date = new Date();
    const formattedDate = date.toISOString().split('T')[0];
    
    // Create a CSV string with header row
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Schedule for " + selectedClassName + "\r\n";
    csvContent += "Exported on " + date.toLocaleString() + "\r\n\r\n";
    
    // Create a link element to trigger the download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `schedule_${selectedClassName}_${formattedDate}.csv`);
    document.body.appendChild(link);
    
    // Trigger the download
    link.click();
    
    // Clean up
    document.body.removeChild(link);
  };

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
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="mr-1 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <FileText className="mr-1 h-4 w-4" />
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
          <CardsList 
            onAddSubject={onAddSubject}
            onEditSubject={onEditSubject}
            onDeleteSubject={onDeleteSubject}
          />
        </TabsContent>
        
        <TabsContent value="rooms">
          <RoomsList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FilterControls;
