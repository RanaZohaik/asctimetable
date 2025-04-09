
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Subject } from '@/data/mockData';
import { BookOpen, Clock } from 'lucide-react';

interface SubjectCardProps {
  subject: Subject;
  room?: string;
  time?: string;
  onDelete?: () => void;
  className?: string;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ 
  subject, 
  room, 
  time,
  onDelete, 
  className 
}) => {
  return (
    <Card className={`overflow-hidden h-full ${subject.colorClass} ${className}`}>
      <CardContent className="p-2 h-full flex flex-col relative">
        {onDelete && (
          <button 
            className="absolute top-0 right-0 p-1 bg-white/20 rounded-bl-md text-gray-800 hover:bg-white/40 hover:text-red-500 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            aria-label="Delete"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        )}
        
        <div className="font-bold text-sm mb-1 truncate">{subject.code}</div>
        
        <div className="text-xs opacity-90 truncate mb-1">{subject.name}</div>
        
        {subject.teacher && (
          <div className="text-xs opacity-80 truncate">
            Teacher: {subject.teacher}
          </div>
        )}
        
        {room && (
          <div className="text-xs flex items-center mt-auto pt-1">
            <span className="bg-white/30 px-1.5 py-0.5 rounded text-[10px] truncate">{room}</span>
          </div>
        )}
        
        {time && (
          <div className="text-xs flex items-center mt-1">
            <Clock size={10} className="mr-1" />
            <span className="truncate">{time}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SubjectCard;
