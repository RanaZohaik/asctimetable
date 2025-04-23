
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const TimetableGenerationProcess: React.FC = () => {
  const steps = [
    { 
      step: 1,
      title: "Input Basic School Information", 
      description: "Enter your school's basic details such as name, number of classes, subjects, and teachers."
    },
    {
      step: 2,
      title: "Define Classes and Grade Levels",
      description: "Set up all classes and their corresponding grade levels in your school."
    },
    {
      step: 3,
      title: "Add Subjects and Their Requirements",
      description: "Add all subjects taught and specify periods required per week for each class."
    },
    {
      step: 4,
      title: "Enter Teacher Information",
      description: "Add teacher details, subjects they teach, and any availability constraints."
    },
    {
      step: 5,
      title: "Configure Rooms and Resources",
      description: "Set up all available classrooms, labs, and specialized teaching spaces."
    },
    {
      step: 6,
      title: "Generate Timetable",
      description: "Let the system automatically create an optimized timetable based on your inputs."
    },
    {
      step: 7,
      title: "Review and Adjust",
      description: "Review the generated timetable and make any necessary manual adjustments."
    }
  ];

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Complete Timetable Generation Process</CardTitle>
          <CardDescription>Follow our proven 7-step process to create perfect timetables every time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Step</TableHead>
                  <TableHead>Process</TableHead>
                  <TableHead className="w-1/2">Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {steps.map((step) => (
                  <TableRow key={step.step}>
                    <TableCell className="font-bold">{step.step}</TableCell>
                    <TableCell className="font-medium">{step.title}</TableCell>
                    <TableCell>{step.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Time-Saving Calculator</CardTitle>
          <CardDescription>See how much time our system can save you</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="bg-muted p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-2">Manual Process</h3>
              <p>A school with 20 classes typically spends <span className="font-bold">40+ hours</span> creating timetables manually.</p>
            </div>
            
            <div className="bg-primary/10 p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-2">With TimetableMaster</h3>
              <p>Reduce timetable creation to <span className="font-bold">less than 1 hour</span> - a <span className="font-bold text-primary">97.5% time saving!</span></p>
            </div>

            <p className="text-sm text-muted-foreground mt-2">
              Scheduling even a mid-sized school with 11 classes, 12 subjects, and 16 teachers across 11 periods per day results in coordinating over 600 periods weekly. Our system handles this complexity automatically.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimetableGenerationProcess;
