
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
import { Calendar, FileText, Plus, Edit, Trash2, User, Users, Layers, Book, CheckCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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
      icon: <Book className="h-5 w-5" />,
      details: "Configure subjects with codes, names, color codes, and availability constraints."
    },
    {
      step: 4,
      title: "Enter Teacher Information",
      description: "Add teacher details, subjects they teach, and any availability constraints.",
      icon: <Users className="h-5 w-5" />,
      details: "Specify teacher qualifications, preferred subjects, and availability restrictions."
    },
    {
      step: 5,
      title: "Configure Rooms and Resources",
      description: "Set up all available classrooms, labs, and specialized teaching spaces.",
      icon: <Layers className="h-5 w-5" />,
      details: "Define room capacities, equipment, and suitability for specific subjects."
    },
    {
      step: 6,
      title: "Generate Timetable",
      description: "Let the system automatically create an optimized timetable based on your inputs.",
      icon: <Calendar className="h-5 w-5" />,
      details: "Our advanced algorithm handles all constraints to create an optimal schedule."
    },
    {
      step: 7,
      title: "Review and Adjust",
      description: "Review the generated timetable and make any necessary manual adjustments.",
      icon: <CheckCheck className="h-5 w-5" />,
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

  // Form schema for step 1
  const stepOneFormSchema = z.object({
    schoolName: z.string().min(2, {
      message: "School name must be at least 2 characters.",
    }),
    periodsPerDay: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Please enter a valid number of periods.",
    }),
    daysPerWeek: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) <= 7, {
      message: "Days per week must be between 1 and 7.",
    }),
    breakTime: z.string(),
  });
  
  type StepOneFormValues = z.infer<typeof stepOneFormSchema>;
  
  const stepOneForm = useForm<StepOneFormValues>({
    resolver: zodResolver(stepOneFormSchema),
    defaultValues: {
      schoolName: "",
      periodsPerDay: "8",
      daysPerWeek: "5",
      breakTime: "After 3rd period: 20 minutes",
    },
  });

  const renderStepDetails = (step: number) => {
    const stepData = steps[step-1];
    
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <p className="text-muted-foreground mb-4">{stepData.details}</p>
            
            <Form {...stepOneForm}>
              <form className="grid gap-4">
                <FormField
                  control={stepOneForm.control}
                  name="schoolName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>School Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter school name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={stepOneForm.control}
                    name="periodsPerDay"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Periods Per Day</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" placeholder="e.g., 8" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={stepOneForm.control}
                    name="daysPerWeek"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Days Per Week</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" max="7" placeholder="e.g., 5" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={stepOneForm.control}
                  name="breakTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Break Times</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter break times (e.g., After 3rd period: 20 minutes)" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Specify when breaks occur and their duration.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-4">
            <p className="text-muted-foreground mb-4">{stepData.details}</p>
            
            <div className="rounded-md border">
              <div className="p-4 bg-muted/50">
                <h4 className="text-sm font-medium">Class Configuration</h4>
              </div>
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div>
                    <h5 className="text-sm font-medium">Class Name</h5>
                    <p className="text-sm text-muted-foreground">Full name (e.g., "Grade 3A")</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium">Short Name</h5>
                    <p className="text-sm text-muted-foreground">Abbreviated (e.g., "3A")</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium">Grade Level</h5>
                    <p className="text-sm text-muted-foreground">Class grade (e.g., "3")</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium">Classroom</h5>
                    <p className="text-sm text-muted-foreground">Home room assignment</p>
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
                    <CardDescription>Enter details for each class manually</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button size="sm" variant="outline">Add Class</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Bulk Import</CardTitle>
                    <CardDescription>Import from Excel or CSV</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button size="sm" variant="outline">
                      <FileText className="mr-2 h-4 w-4" />
                      Import
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
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
                      <FileText className="mr-2 h-4 w-4" />
                      Import
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <p className="text-muted-foreground mb-4">{stepData.details}</p>
            
            <div className="rounded-md border">
              <div className="p-4 bg-muted/50">
                <h4 className="text-sm font-medium">Key Teacher Parameters</h4>
              </div>
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div>
                    <h5 className="text-sm font-medium">Full Name</h5>
                    <p className="text-sm text-muted-foreground">Teacher's complete name</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium">Short Name</h5>
                    <p className="text-sm text-muted-foreground">Automatically generated for timetable</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium">Subjects</h5>
                    <p className="text-sm text-muted-foreground">Subjects they can teach</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium">Availability</h5>
                    <p className="text-sm text-muted-foreground">Time-off requirements</p>
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
                    <CardDescription>Enter details for each teacher manually</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button size="sm" variant="outline">
                      <User className="mr-2 h-4 w-4" />
                      Add Teacher
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Bulk Import</CardTitle>
                    <CardDescription>Import multiple teachers from Excel or CSV</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button size="sm" variant="outline">
                      <FileText className="mr-2 h-4 w-4" />
                      Import
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <p className="text-muted-foreground mb-4">{stepData.details}</p>
            
            <div className="rounded-md border">
              <div className="p-4 bg-muted/50">
                <h4 className="text-sm font-medium">Room Configuration</h4>
              </div>
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div>
                    <h5 className="text-sm font-medium">Room Name</h5>
                    <p className="text-sm text-muted-foreground">Descriptive name (e.g., "Science Lab 1")</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium">Capacity</h5>
                    <p className="text-sm text-muted-foreground">Maximum number of students</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium">Room Type</h5>
                    <p className="text-sm text-muted-foreground">Regular classroom, lab, gym, etc.</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium">Subject Suitability</h5>
                    <p className="text-sm text-muted-foreground">Subjects that can be taught here</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Individual Addition</CardTitle>
                  <CardDescription>Enter details for each room manually</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button size="sm" variant="outline">Add Room</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Bulk Import</CardTitle>
                  <CardDescription>Import from Excel or CSV</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button size="sm" variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Import
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <p className="text-muted-foreground mb-4">{stepData.details}</p>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Data Verification</CardTitle>
                <CardDescription>Check all inputs before generation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>General information</span>
                    <span className="text-green-500">✓ Complete</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Classes</span>
                    <span className="text-green-500">✓ Complete</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Subjects</span>
                    <span className="text-green-500">✓ Complete</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Teachers</span>
                    <span className="text-green-500">✓ Complete</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Lessons</span>
                    <span className="text-green-500">✓ Complete</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Generate Timetable</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Generation Options</CardTitle>
                <CardDescription>Advanced settings for timetable generation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="optimize-teachers" />
                    <label htmlFor="optimize-teachers" className="text-sm">Optimize teacher schedules (minimize gaps)</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="optimize-classes" />
                    <label htmlFor="optimize-classes" className="text-sm">Optimize class schedules (balance subject distribution)</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="keep-consecutive" />
                    <label htmlFor="keep-consecutive" className="text-sm">Keep consecutive periods for selected subjects</label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <p className="text-muted-foreground mb-4">{stepData.details}</p>
            
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Manual Adjustments</h4>
              <p className="text-sm text-muted-foreground">
                Fine-tune your generated timetable using our intuitive drag-and-drop interface. 
                Move lessons between time slots, swap teachers, or adjust room allocations.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Class View</CardTitle>
                    <CardDescription>See schedule by class</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button size="sm" variant="outline">Open View</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Teacher View</CardTitle>
                    <CardDescription>See schedule by teacher</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button size="sm" variant="outline">Open View</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Room View</CardTitle>
                    <CardDescription>See schedule by room</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button size="sm" variant="outline">Open View</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Export Options</CardTitle>
                    <CardDescription>PDF, Excel, or print</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button size="sm" variant="outline">
                      <FileText className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
            
            <div className="rounded-md border p-4 bg-muted/20">
              <h4 className="text-sm font-medium mb-2">Conflict Resolution</h4>
              <p className="text-sm text-muted-foreground">
                When making manual adjustments, our system automatically detects and helps you resolve any conflicts 
                that may arise, ensuring your timetable remains valid and workable.
              </p>
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
