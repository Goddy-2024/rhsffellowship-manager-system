
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, UserPlus, BarChart } from "lucide-react";
import { getMembers, getEvents } from "@/utils/localStorage";

export function DashboardHome() {
  const [members, setMembers] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    setMembers(getMembers());
    setEvents(getEvents());
  }, []);

  const activeMembers = members.filter(member => member.status === "Active");
  const thisMonthEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    const now = new Date();
    return eventDate.getMonth() === now.getMonth() && eventDate.getFullYear() === now.getFullYear();
  });

  const newMembersThisMonth = members.filter(member => {
    const joinDate = new Date(member.joinDate);
    const now = new Date();
    return joinDate.getMonth() === now.getMonth() && joinDate.getFullYear() === now.getFullYear();
  });

  const stats = [
    {
      title: "Total Members",
      value: members.length.toString(),
      description: "Active fellowship members",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "This Month's Events",
      value: thisMonthEvents.length.toString(),
      description: "Scheduled activities",
      icon: Calendar,
      color: "text-green-600",
    },
    {
      title: "New Members",
      value: newMembersThisMonth.length.toString(),
      description: "Joined this month",
      icon: UserPlus,
      color: "text-purple-600",
    },
    {
      title: "Active Members",
      value: activeMembers.length.toString(),
      description: "Currently active",
      icon: BarChart,
      color: "text-orange-600",
    },
  ];

  const recentEvents = events
    .filter(event => event.status === "Completed")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const upcomingEvents = events
    .filter(event => event.status === "Upcoming")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

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
              {recentEvents.length > 0 ? (
                recentEvents.map((event, index) => (
                  <div key={event.id} className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{event.name}</p>
                      <p className="text-xs text-gray-500">{event.expectedAttendees} expected attendees</p>
                    </div>
                    <span className="text-xs text-gray-400">{event.date}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No recent activities</p>
              )}
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
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{event.name}</p>
                      <p className="text-xs text-gray-500">{event.date} at {event.time}</p>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {event.status}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No upcoming events</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
