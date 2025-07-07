
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { FileText } from "lucide-react";
import { getMembers, getEvents, type Member, type Event } from "@/utils/localStorage";
import { toast } from "@/components/ui/sonner";

export function Reports() {
  const [selectedMonth, setSelectedMonth] = useState("current");
  const [members, setMembers] = useState<Member[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    setMembers(getMembers());
    setEvents(getEvents());
  }, []);

  // Generate attendance data based on events
  const attendanceData = [
    { month: "Jul", attendance: events.filter(e => e.date.includes('2024-07')).length * 35 },
    { month: "Aug", attendance: events.filter(e => e.date.includes('2024-08')).length * 42 },
    { month: "Sep", attendance: events.filter(e => e.date.includes('2024-09')).length * 38 },
    { month: "Oct", attendance: events.filter(e => e.date.includes('2024-10')).length * 45 },
    { month: "Nov", attendance: events.filter(e => e.date.includes('2024-11')).length * 52 },
    { month: "Dec", attendance: events.filter(e => e.date.includes('2024-12')).length * 48 },
  ];

  // Generate department data
  const departmentCounts: Record<string, number> = members.reduce((acc, member) => {
    acc[member.department] = (acc[member.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const departmentData = Object.entries(departmentCounts).map(([department, count]) => ({
    department,
    members: count,
  }));

  const generateReport = () => {
    const activeMembers = members.filter(m => m.status === "Active");
    const completedEvents = events.filter(e => e.status === "Completed");
    const upcomingEvents = events.filter(e => e.status === "Upcoming");
    
    const reportData = {
      totalMembers: members.length,
      activeMembers: activeMembers.length,
      inactiveMembers: members.length - activeMembers.length,
      totalEvents: events.length,
      completedEvents: completedEvents.length,
      upcomingEvents: upcomingEvents.length,
      departments: departmentCounts,
      generatedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fellowship-report-${new Date().toISOString().slice(0, 7)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast("Report generated successfully!");
  };

  const activeMembers = members.filter(m => m.status === "Active");
  const thisMonthEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    const now = new Date();
    return eventDate.getMonth() === now.getMonth() && eventDate.getFullYear() === now.getFullYear();
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600 mt-2">
            Generate and view fellowship reports
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Month</SelectItem>
              <SelectItem value="last">Last Month</SelectItem>
              <SelectItem value="last3">Last 3 Months</SelectItem>
              <SelectItem value="last6">Last 6 Months</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={generateReport}>
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Attendance Trend</CardTitle>
            <CardDescription>Average event attendance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="attendance" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  dot={{ fill: '#2563eb', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Distribution</CardTitle>
            <CardDescription>Members by department</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="members" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Events:</span>
                <span className="font-semibold">{thisMonthEvents.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Members:</span>
                <span className="font-semibold">{members.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Active Members:</span>
                <span className="font-semibold">{activeMembers.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Departments:</span>
                <span className="font-semibold">{Object.keys(departmentCounts).length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Departments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {departmentData
                .sort((a, b) => b.members - a.members)
                .slice(0, 4)
                .map((dept) => (
                  <div key={dept.department} className="flex justify-between">
                    <span className="text-sm">{dept.department}</span>
                    <span className="text-sm font-medium">{dept.members} members</span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Active Members:</span>
                <span className="font-semibold text-green-600">{activeMembers.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Inactive Members:</span>
                <span className="font-semibold text-orange-600">{members.length - activeMembers.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Upcoming Events:</span>
                <span className="font-semibold text-blue-600">{events.filter(e => e.status === "Upcoming").length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Completed Events:</span>
                <span className="font-semibold text-gray-600">{events.filter(e => e.status === "Completed").length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
