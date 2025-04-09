
import React from 'react';
import { 
  DndContext, 
  DragEndEvent, 
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor
} from '@dnd-kit/core';
import DraggableTimetableCell from './DraggableTimetableCell';
import TimetableCell from './TimetableCell';
import { Period, Subject, ScheduleItem, periods, days, subjects } from '../data/mockData';

interface TimetableGridProps {
  schedule: ScheduleItem[];
  onDeleteItem: (id: number) => void;
  onMoveItem: (itemId: number, newPeriodId: number, newDay: number) => void;
}

const TimetableGrid: React.FC<TimetableGridProps> = ({ 
  schedule, 
  onDeleteItem,
  onMoveItem
}) => {
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [activeDragData, setActiveDragData] = React.useState<any>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const getSubjectForCell = (periodId: number, dayIndex: number): { 
    subject?: Subject; 
    room?: string; 
    itemId?: number 
  } => {
    const scheduleItem = schedule.find(
      (item) => item.periodId === periodId && item.day === dayIndex
    );

    if (!scheduleItem) {
      return { subject: undefined, room: undefined, itemId: undefined };
    }

    const subject = subjects.find((s) => s.id === scheduleItem.subjectId);
    return { subject, room: scheduleItem.room, itemId: scheduleItem.id };
  };

  const handleDragStart = (event: any) => {
    const { active } = event;
    setActiveId(active.id);
    setActiveDragData(active.data.current);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    // Reset active states
    setActiveId(null);
    setActiveDragData(null);
    
    if (!over) return;

    // Extract source cell information
    const sourceId = active.id as string;
    const [sourcePeriodStr, sourceDayStr] = sourceId.split('-');
    const sourcePeriod = parseInt(sourcePeriodStr, 10);
    const sourceDay = parseInt(sourceDayStr, 10);
    
    // Extract target cell information
    const targetId = over.id as string;
    const dropId = targetId.replace('droppable-', '');
    const [targetPeriodStr, targetDayStr] = dropId.split('-');
    const targetPeriod = parseInt(targetPeriodStr, 10);
    const targetDay = parseInt(targetDayStr, 10);
    
    // If source and target are the same, do nothing
    if (sourcePeriod === targetPeriod && sourceDay === targetDay) {
      return;
    }
    
    // Find the item being moved
    const { itemId } = getSubjectForCell(sourcePeriod, sourceDay);
    
    if (itemId) {
      // Move the item to the new position
      onMoveItem(itemId, targetPeriod, targetDay);
    }
  };

  return (
    <DndContext 
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="timetable-container overflow-auto">
        {periods.map((period) => (
          <div key={period.id} className="grid grid-cols-6">
            <div className="p-2 text-center font-medium border border-gray-300 bg-gray-50 flex items-center justify-center">
              <div>
                <div>{period.name}</div>
                <div className="text-xs text-gray-500">{period.startTime}-{period.endTime}</div>
              </div>
            </div>
            
            {days.map((day, dayIndex) => {
              const { subject, room, itemId } = getSubjectForCell(period.id, dayIndex);
              const cellId = `${period.id}-${dayIndex}`;
              
              return (
                <DraggableTimetableCell
                  key={cellId}
                  id={cellId}
                  subject={subject}
                  period={period}
                  room={room}
                  isEmpty={!subject}
                  onDelete={itemId ? () => onDeleteItem(itemId) : undefined}
                  index={dayIndex}
                />
              );
            })}
          </div>
        ))}
      </div>

      <DragOverlay>
        {activeId && activeDragData && !activeDragData.isEmpty ? (
          <div className="shadow-lg rounded-md overflow-hidden">
            <TimetableCell
              subject={activeDragData.subject}
              period={activeDragData.period}
              room={activeDragData.room}
              isEmpty={false}
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default TimetableGrid;
