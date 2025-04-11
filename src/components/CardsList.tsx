
import React from 'react';
import { subjects } from '../data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

const CardsList: React.FC = () => {
  return (
    <ScrollArea className="h-60">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
        {subjects.map((subject) => (
          <Card key={subject.id} className={`${subject.colorClass} hover:shadow-md transition-shadow`}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-base">{subject.name}</h3>
                  <p className="text-sm mt-1 opacity-80">Teacher: {subject.teacher}</p>
                </div>
                <Badge variant="outline" className="bg-white/30">
                  {subject.code}
                </Badge>
              </div>
              <div className="mt-3 text-xs">
                <p>Weekly Hours: {subject.hours || 0}</p>
                <p className="mt-1">Required Rooms: {subject.roomType || 'Any'}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default CardsList;
