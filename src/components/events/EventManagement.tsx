import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AddEventDialog } from "./AddEventDialog";
import { Search, Plus, Calendar } from "lucide-react";

interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
  location: string;
  type: string;
  expectedAttendees: number;
  status: "Upcoming" | "Completed" | "Cancelled";
}

export function EventManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      name: "Sunday Service",
      date: "2024-12-15",
      time: "09:00",
      location: "Main Hall",
      type: "Service",
      expectedAttendees: 150,
      status: "Upcoming",
    },
    {
      id: 2,
      name: "Bible Study",
      date: "2024-12-18",
      time: "19:00",
      location: "Conference Room",
      type: "Study",
      expectedAttendees: 80,
      status: "Upcoming",
    },
    {
      id: 3,
      name: "Youth Conference",
      date: "2024-12-10",
      time: "14:00",
      location: "Main Hall",
      type: "Conference",
      expectedAttendees: 200,
      status: "Completed",
    },
  ]);

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEvent = (newEvent: Omit<Event, "id">) => {
    const event: Event = {
      ...newEvent,
      id: Math.max(...events.map(e => e.id)) + 1,
    };
    setEvents([...events, event]);
    setShowAddDialog(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "default";
      case "Completed":
        return "secondary";
      case "Cancelled":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Event Management</h1>
          <p className="text-gray-600 mt-2">
            Schedule and manage fellowship events
          </p>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Events Calendar</CardTitle>
          <CardDescription>
            View and manage all fellowship events
          </CardDescription>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Expected</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.name}</TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>{event.time}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>{event.type}</TableCell>
                  <TableCell>{event.expectedAttendees}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(event.status)}>
                      {event.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddEventDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAddEvent={handleAddEvent}
      />
    </div>
  );
}
