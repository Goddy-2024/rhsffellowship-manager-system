
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { file-text } from "lucide-react";
import { useState } from "react";

const attendanceData = [
  { month: "Jan", attendance: 120 },
  { month: "Feb", attendance: 135 },
  { month: "Mar", attendance: 128 },
  { month: "Apr", attendance: 145 },
  { month: "May", attendance: 152 },
  { month: "Jun", attendance: 148 },
];

const departmentData = [
  { department: "Worship", members: 25 },
  { department: "Youth", members: 40 },
  { department: "Media", members: 15 },
  { department: "Ushering", members: 20 },
  { department: "Prayer", members: 18 },
  { department: "Outreach", members: 22 },
];

export function Reports() {
  const [selectedMonth, setSelectedMonth] = useState("current");

  const generateReport = () => {
    // Simulate report generation
    const reportData = {
      totalMembers: 145,
      activeMembers: 138,
      newMembers: 12,
      events: 8,
      avgAttendance: 78,
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
  };

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
            <file-text className="mr-2 h-4 w-4" />
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
                <span className="font-semibold">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Attendance:</span>
                <span className="font-semibold">624</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Average per Event:</span>
                <span className="font-semibold">78</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">New Members:</span>
                <span className="font-semibold">12</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Sunday Service</span>
                <span className="text-sm font-medium">120 avg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Bible Study</span>
                <span className="text-sm font-medium">85 avg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Prayer Meeting</span>
                <span className="text-sm font-medium">67 avg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Youth Conference</span>
                <span className="text-sm font-medium">200 avg</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Growth Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Member Growth:</span>
                <span className="font-semibold text-green-600">+8.7%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Attendance Growth:</span>
                <span className="font-semibold text-green-600">+12.3%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Event Frequency:</span>
                <span className="font-semibold text-blue-600">2.1/week</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Retention Rate:</span>
                <span className="font-semibold text-green-600">94.2%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
