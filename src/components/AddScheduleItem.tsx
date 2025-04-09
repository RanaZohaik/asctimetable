
import React, { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormItem, FormLabel, FormControl, FormField } from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { periods, days, subjects } from '../data/mockData';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface AddScheduleItemProps {
  onAddItem: (newItem: {
    periodId: number;
    day: number;
    subjectId: number;
    room: string;
  }) => void;
}

const AddScheduleItem: React.FC<AddScheduleItemProps> = ({ onAddItem }) => {
  const [open, setOpen] = useState(false);
  
  const form = useForm({
    defaultValues: {
      day: 0,
      periodId: 1,
      subjectId: 1,
      room: 'R101',
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    onAddItem({
      periodId: Number(data.periodId),
      day: Number(data.day),
      subjectId: Number(data.subjectId),
      room: data.room,
    });
    setOpen(false);
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1">
          <Plus size={16} />
          Add Card
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Card>
          <CardContent className="pt-4">
            <Form {...form}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <FormField
                  control={form.control}
                  name="day"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Day</FormLabel>
                      <FormControl>
                        <select 
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          {...field}
                        >
                          {days.map((day, index) => (
                            <option key={index} value={index}>
                              {day}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="periodId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Period</FormLabel>
                      <FormControl>
                        <select 
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          {...field}
                        >
                          {periods.map((period) => (
                            <option key={period.id} value={period.id}>
                              {period.name} ({period.startTime}-{period.endTime})
                            </option>
                          ))}
                        </select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subjectId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <select 
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          {...field}
                        >
                          {subjects.map((subject) => (
                            <option key={subject.id} value={subject.id}>
                              {subject.code} - {subject.name}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="room"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end pt-2">
                  <Button type="submit">Add Card</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
};

export default AddScheduleItem;
