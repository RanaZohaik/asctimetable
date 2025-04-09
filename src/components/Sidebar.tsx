
import React from 'react';
import { classes, Class } from '../data/mockData';

interface SidebarProps {
  selectedClass: Class | null;
  onSelectClass: (classItem: Class) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedClass, onSelectClass }) => {
  return (
    <div className="bg-sidebar w-56 min-h-screen border-r border-sidebar-border flex flex-col">
      <div className="p-4 border-b border-sidebar-border">
        <h2 className="text-lg font-bold text-sidebar-primary">ASC Schedule Buddy</h2>
        <p className="text-xs text-sidebar-foreground mt-1">Timetable Management</p>
      </div>
      
      <div className="p-4 border-b border-sidebar-border">
        <h3 className="text-sm font-semibold mb-2 text-sidebar-foreground">Classes</h3>
        <div className="space-y-1">
          {classes.map((classItem) => (
            <button
              key={classItem.id}
              onClick={() => onSelectClass(classItem)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                selectedClass?.id === classItem.id
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              }`}
            >
              {classItem.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-auto p-4 border-t border-sidebar-border text-xs text-sidebar-foreground">
        <div className="font-medium">Demo: Basic</div>
        <div className="mt-1 opacity-75">ⓒ 2025 ASC Schedule Buddy</div>
      </div>
    </div>
  );
};

export default Sidebar;
