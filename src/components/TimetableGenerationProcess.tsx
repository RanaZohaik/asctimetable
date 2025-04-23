
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { CalendarCheck, FileImport, FileExport, Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TimetableGenerationProcess: React.FC = () => {
  const { toast } = useToast();
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const steps = [
    { 
      step: 1,
      title: "Input Basic School Information", 
      description: "Enter your school's basic details such as name, number of classes, subjects, and teachers.",
      icon: <Edit className="h-5 w-5" />,
      details: "Configure your school's basic information, periods, breaks, and daily schedule structure."
    },
    {
      step: 2,
      title: "Define Classes and Grade Levels",
      description: "Set up all classes and their corresponding grade levels in your school.",
      icon: <Plus className="h-5 w-5" />,
      details: "Create class sections for each grade level and assign appropriate room capacities."
    },
    {
      step: 3,
      title: "Add Subjects and Their Requirements",
      description: "Add all subjects taught and specify periods required per week for each class.",
      icon: <FileImport className="h-5 w-5" />,
      details: "Configure subjects with codes, names, color codes, and availability constraints."
    },
    {
      step: 4,
      title: "Enter Teacher Information",
      description: "Add teacher details, subjects they teach, and any availability constraints.",
      icon: <FileImport className="h-5 w-5" />,
      details: "Specify teacher qualifications, preferred subjects, and availability restrictions."
    },
    {
      step: 5,
      title: "Configure Rooms and Resources",
      description: "Set up all available classrooms, labs, and specialized teaching spaces.",
      icon: <Edit className="h-5 w-5" />,
      details: "Define room capacities, equipment, and suitability for specific subjects."
    },
    {
      step: 6,
      title: "Generate Timetable",
      description: "Let the system automatically create an optimized timetable based on your inputs.",
      icon: <CalendarCheck className="h-5 w-5" />,
      details: "Our advanced algorithm handles all constraints to create an optimal schedule."
    },
    {
      step: 7,
      title: "Review and Adjust",
      description: "Review the generated timetable and make any necessary manual adjustments.",
      icon: <FileExport className="h-5 w-5" />,
      details: "Fine-tune the generated timetable and export it in various formats."
    }
  ];

  const handleShowDetails = (step: number) => {
    setActiveStep(step);
    setIsDialogOpen(true);
  };

  const handleStartProcess = (step: number) => {
    setIsDialogOpen(false);
    
    toast({
      title: `Step ${step} Started`,
      description: `You've started the "${steps[step-1].title}" step`,
    });
  };

  const renderStepDetails = (step: number) => {
    const stepData = steps[step-1];
    
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <p className="text-muted-foreground mb-4">{stepData.details}</p>
            
            <Form>
              <div className="grid gap-4">
                <FormField name="schoolName">
                  <FormItem>
                    <FormLabel>School Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter school name" />
                    </FormControl>
                  </FormItem>
                </FormField>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField name="periodsPerDay">
                    <FormItem>
                      <FormLabel>Periods Per Day</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" placeholder="e.g., 8" />
                      </FormControl>
                    </FormItem>
                  </FormField>
                  
                  <FormField name="daysPerWeek">
                    <FormItem>
                      <FormLabel>Days Per Week</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" max="7" placeholder="e.g., 5" />
                      </FormControl>
                    </FormItem>
                  </FormField>
                </div>
                
                <FormField name="breakTime">
                  <FormItem>
                    <FormLabel>Break Times</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter break times (e.g., After 3rd period: 20 minutes)" />
                    </FormControl>
                    <FormDescription>
                      Specify when breaks occur and their duration.
                    </FormDescription>
                  </FormItem>
                </FormField>
              </div>
            </Form>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <p className="text-muted-foreground mb-4">{stepData.details}</p>
            
            <div className="rounded-md border">
              <div className="p-4 bg-muted/50">
                <h4 className="text-sm font-medium">Key Subject Parameters</h4>
              </div>
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div>
                    <h5 className="text-sm font-medium">Subject Code</h5>
                    <p className="text-sm text-muted-foreground">Automatically generated (e.g., "MATH")</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium">Subject Name</h5>
                    <p className="text-sm text-muted-foreground">Full name (e.g., "Mathematics")</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium">Color Code</h5>
                    <p className="text-sm text-muted-foreground">Visual identifier in timetable</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium">Availability</h5>
                    <p className="text-sm text-muted-foreground">Any time-off requirements</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Addition Methods</h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Individual Addition</CardTitle>
                    <CardDescription>Enter details for each subject manually</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button size="sm" variant="outline">Add Subject</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Bulk Import</CardTitle>
                    <CardDescription>Import from Excel or CSV</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button size="sm" variant="outline">
                      <FileImport className="mr-2 h-4 w-4" />
                      Import
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        );
        
      default:
        return (
          <div>
            <p className="text-muted-foreground mb-4">{stepData.details}</p>
            <p>Details for this step will be implemented in future updates.</p>
          </div>
        );
    }
  };

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
                  <TableHead className="text-right w-32">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {steps.map((step) => (
                  <TableRow key={step.step} className="group">
                    <TableCell className="font-bold">{step.step}</TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <span className="hidden sm:inline-flex p-1 bg-primary/10 rounded-full">{step.icon}</span>
                        {step.title}
                      </div>
                    </TableCell>
                    <TableCell>{step.description}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleShowDetails(step.step)}
                      >
                        Details
                      </Button>
                    </TableCell>
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {activeStep && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {steps[activeStep-1].icon}
                  <span>Step {activeStep}: {steps[activeStep-1].title}</span>
                </DialogTitle>
                <DialogDescription>
                  {steps[activeStep-1].description}
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-2">
                {renderStepDetails(activeStep)}
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={() => handleStartProcess(activeStep)}>
                  Start This Step
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TimetableGenerationProcess;
