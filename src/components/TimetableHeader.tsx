
import React from 'react';
import { days } from '../data/mockData';

const TimetableHeader: React.FC = () => {
  return (
    <div className="timetable-header grid grid-cols-6">
      <div className="p-2 font-semibold border border-gray-300">Period/Day</div>
      {days.map((day, index) => (
        <div key={index} className="p-2 font-semibold text-center border border-gray-300">
          {day}
        </div>
      ))}
    </div>
  );
};

export default TimetableHeader;
