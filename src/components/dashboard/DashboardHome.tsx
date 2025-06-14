
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, UserPlus, BarChart } from "lucide-react";

export function DashboardHome() {
  const stats = [
    {
      title: "Total Members",
      value: "145",
      description: "Active fellowship members",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "This Month's Events",
      value: "8",
      description: "Scheduled activities",
      icon: Calendar,
      color: "text-green-600",
    },
    {
      title: "New Members",
      value: "12",
      description: "Joined this month",
      icon: UserPlus,
      color: "text-purple-600",
    },
    {
      title: "Attendance Rate",
      value: "78%",
      description: "Average event attendance",
      icon: BarChart,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome to MMU RHSF Fellowship Management System
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest fellowship activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Sunday Service</p>
                  <p className="text-xs text-gray-500">120 attendees</p>
                </div>
                <span className="text-xs text-gray-400">2 days ago</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Bible Study</p>
                  <p className="text-xs text-gray-500">85 attendees</p>
                </div>
                <span className="text-xs text-gray-400">5 days ago</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Prayer Meeting</p>
                  <p className="text-xs text-gray-500">67 attendees</p>
                </div>
                <span className="text-xs text-gray-400">1 week ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Scheduled fellowship events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Youth Conference</p>
                  <p className="text-xs text-gray-500">Dec 15, 2024</p>
                </div>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  Upcoming
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Christmas Service</p>
                  <p className="text-xs text-gray-500">Dec 25, 2024</p>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  Confirmed
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">New Year Service</p>
                  <p className="text-xs text-gray-500">Jan 1, 2025</p>
                </div>
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                  Planning
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
