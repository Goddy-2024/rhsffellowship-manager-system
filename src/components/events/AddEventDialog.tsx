
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface AddEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddEvent: (event: {
    name: string;
    date: string;
    time: string;
    location: string;
    type: string;
    expectedAttendees: number;
    status: "Upcoming" | "Completed" | "Cancelled";
  }) => void;
}

export function AddEventDialog({ open, onOpenChange, onAddEvent }: AddEventDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    location: "",
    type: "",
    expectedAttendees: 0,
    status: "Upcoming" as "Upcoming" | "Completed" | "Cancelled",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.date || !formData.time || !formData.location || !formData.type) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    onAddEvent(formData);
    setFormData({
      name: "",
      date: "",
      time: "",
      location: "",
      type: "",
      expectedAttendees: 0,
      status: "Upcoming",
    });
    
    toast({
      title: "Success",
      description: "Event added successfully",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Event</DialogTitle>
          <DialogDescription>
            Schedule a new fellowship event.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Event Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter event name"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="time">Time *</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Event location"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Event Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Service">Service</SelectItem>
                  <SelectItem value="Study">Bible Study</SelectItem>
                  <SelectItem value="Prayer">Prayer Meeting</SelectItem>
                  <SelectItem value="Conference">Conference</SelectItem>
                  <SelectItem value="Outreach">Outreach</SelectItem>
                  <SelectItem value="Social">Social Event</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="expectedAttendees">Expected Attendees</Label>
              <Input
                id="expectedAttendees"
                type="number"
                value={formData.expectedAttendees}
                onChange={(e) => setFormData({ ...formData, expectedAttendees: parseInt(e.target.value) || 0 })}
                placeholder="0"
                min="0"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Event</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
