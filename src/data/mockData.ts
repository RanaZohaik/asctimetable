
export interface Subject {
  id: number;
  code: string;
  name: string;
  teacher: string;
  colorClass: string;
}

export interface Class {
  id: number;
  name: string;
  grade: string;
}

export interface Period {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
}

export interface ScheduleItem {
  id: number;
  subjectId: number;
  classId: number;
  day: number; // 0-4 (Mon-Fri)
  periodId: number;
  room?: string;
}

// Mock data for subjects
export const subjects: Subject[] = [
  { id: 1, code: "Ma", name: "Mathematics", teacher: "Mr. Smith", colorClass: "subject-color-1" },
  { id: 2, code: "En", name: "English", teacher: "Ms. Johnson", colorClass: "subject-color-2" },
  { id: 3, code: "Ph", name: "Physics", teacher: "Dr. Brown", colorClass: "subject-color-3" },
  { id: 4, code: "Ch", name: "Chemistry", teacher: "Mrs. Davis", colorClass: "subject-color-4" },
  { id: 5, code: "Bi", name: "Biology", teacher: "Mr. Wilson", colorClass: "subject-color-5" },
  { id: 6, code: "Hi", name: "History", teacher: "Ms. Lee", colorClass: "subject-color-6" },
  { id: 7, code: "Ge", name: "Geography", teacher: "Mr. Anderson", colorClass: "subject-color-7" },
  { id: 8, code: "PE", name: "Physical Education", teacher: "Mr. Garcia", colorClass: "subject-color-8" },
  { id: 9, code: "Ar", name: "Art", teacher: "Ms. Martinez", colorClass: "subject-color-9" },
  { id: 10, code: "Mu", name: "Music", teacher: "Mrs. Taylor", colorClass: "subject-color-10" },
  { id: 11, code: "CS", name: "Computer Science", teacher: "Mr. Thomas", colorClass: "subject-color-11" },
  { id: 12, code: "Fr", name: "French", teacher: "Mme. Dubois", colorClass: "subject-color-12" },
  { id: 13, code: "Sp", name: "Spanish", teacher: "Sr. Rodriguez", colorClass: "subject-color-13" },
  { id: 14, code: "Dr", name: "Drama", teacher: "Ms. White", colorClass: "subject-color-14" },
  { id: 15, code: "Ec", name: "Economics", teacher: "Dr. Clark", colorClass: "subject-color-15" },
];

// Mock data for classes
export const classes: Class[] = [
  { id: 1, name: "Class 1A", grade: "Grade 1" },
  { id: 2, name: "Class 2B", grade: "Grade 2" },
  { id: 3, name: "Class 3C", grade: "Grade 3" },
  { id: 4, name: "Class 4D", grade: "Grade 4" },
  { id: 5, name: "Class 5E", grade: "Grade 5" },
  { id: 6, name: "Class 6F", grade: "Grade 6" },
  { id: 7, name: "Class 7G", grade: "Grade 7" },
  { id: 8, name: "Class 8H", grade: "Grade 8" },
];

// Mock data for periods
export const periods: Period[] = [
  { id: 1, name: "1", startTime: "08:00", endTime: "08:45" },
  { id: 2, name: "2", startTime: "08:50", endTime: "09:35" },
  { id: 3, name: "3", startTime: "09:45", endTime: "10:30" },
  { id: 4, name: "4", startTime: "10:35", endTime: "11:20" },
  { id: 5, name: "5", startTime: "11:30", endTime: "12:15" },
  { id: 6, name: "6", startTime: "12:20", endTime: "13:05" },
  { id: 7, name: "7", startTime: "13:45", endTime: "14:30" },
  { id: 8, name: "8", startTime: "14:35", endTime: "15:20" },
  { id: 9, name: "9", startTime: "15:30", endTime: "16:15" },
];

// Mock data for days
export const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// Mock data for schedule items
export const generateSchedule = (classId: number): ScheduleItem[] => {
  const items: ScheduleItem[] = [];
  let id = 1;

  // Generate some random schedule items for the selected class
  for (let day = 0; day < days.length; day++) {
    for (let periodId = 1; periodId <= periods.length; periodId++) {
      // Around 70% chance of having a class for this period
      if (Math.random() < 0.7) {
        const subjectId = Math.floor(Math.random() * subjects.length) + 1;
        const room = `R${Math.floor(Math.random() * 20) + 101}`;
        
        items.push({
          id: id++,
          subjectId,
          classId,
          day,
          periodId,
          room,
        });
      }
    }
  }

  return items;
};

// Default selected class schedule
export const defaultSchedule = generateSchedule(1);
