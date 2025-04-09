
import React from 'react';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import TimetableCell from './TimetableCell';
import { Subject, Period } from '../data/mockData';

interface DraggableTimetableCellProps {
  id: string;
  subject?: Subject;
  period: Period;
  room?: string;
  isEmpty: boolean;
  onDelete?: () => void;
  index: number;
}

const DraggableTimetableCell: React.FC<DraggableTimetableCellProps> = ({
  id,
  subject,
  period,
  room,
  isEmpty,
  onDelete,
  index
}) => {
  // Set up draggable functionality if the cell is not empty
  const { attributes, listeners, setNodeRef: setDragNodeRef, isDragging } = useDraggable({
    id,
    data: {
      subject,
      room,
      period,
      type: 'timetable-cell',
      isEmpty
    },
    disabled: isEmpty
  });

  // Set up droppable functionality for all cells
  const { setNodeRef: setDropNodeRef } = useDroppable({
    id: `droppable-${id}`,
    data: {
      periodId: period.id,
      dayIndex: parseInt(id.split('-')[1], 10),
      type: 'timetable-cell'
    }
  });

  // Combine the references
  const setNodeRef = (node: HTMLElement | null) => {
    setDragNodeRef(node);
    setDropNodeRef(node);
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...(isEmpty ? {} : listeners)}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: isEmpty ? 'default' : 'grab',
      }}
    >
      <TimetableCell
        subject={subject}
        period={period}
        room={room}
        isEmpty={isEmpty}
        onDelete={onDelete}
      />
    </div>
  );
};

export default DraggableTimetableCell;
