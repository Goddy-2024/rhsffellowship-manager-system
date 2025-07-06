
export interface Member {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  joinDate: string;
  status: "Active" | "Inactive";
}

export interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
  location: string;
  type: string;
  expectedAttendees: number;
  status: "Upcoming" | "Completed" | "Cancelled";
}

const STORAGE_KEYS = {
  MEMBERS: 'fellowship_members',
  EVENTS: 'fellowship_events',
};

// Default data for initial setup
const defaultMembers: Member[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+60123456789",
    department: "Worship",
    joinDate: "2024-01-15",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+60123456790",
    department: "Youth",
    joinDate: "2024-02-10",
    status: "Active",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "+60123456791",
    department: "Media",
    joinDate: "2024-03-05",
    status: "Inactive",
  },
];

const defaultEvents: Event[] = [
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
];

// Member operations
export const getMembers = (): Member[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.MEMBERS);
  if (!stored) {
    localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(defaultMembers));
    return defaultMembers;
  }
  return JSON.parse(stored);
};

export const saveMembers = (members: Member[]): void => {
  localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(members));
};

export const addMember = (member: Omit<Member, "id">): Member => {
  const members = getMembers();
  const newMember: Member = {
    ...member,
    id: Math.max(0, ...members.map(m => m.id)) + 1,
  };
  members.push(newMember);
  saveMembers(members);
  return newMember;
};

export const updateMember = (id: number, updates: Partial<Member>): Member | null => {
  const members = getMembers();
  const index = members.findIndex(m => m.id === id);
  if (index === -1) return null;
  
  members[index] = { ...members[index], ...updates };
  saveMembers(members);
  return members[index];
};

export const deleteMember = (id: number): boolean => {
  const members = getMembers();
  const filteredMembers = members.filter(m => m.id !== id);
  if (filteredMembers.length === members.length) return false;
  
  saveMembers(filteredMembers);
  return true;
};

// Event operations
export const getEvents = (): Event[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.EVENTS);
  if (!stored) {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(defaultEvents));
    return defaultEvents;
  }
  return JSON.parse(stored);
};

export const saveEvents = (events: Event[]): void => {
  localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
};

export const addEvent = (event: Omit<Event, "id">): Event => {
  const events = getEvents();
  const newEvent: Event = {
    ...event,
    id: Math.max(0, ...events.map(e => e.id)) + 1,
  };
  events.push(newEvent);
  saveEvents(events);
  return newEvent;
};

export const updateEvent = (id: number, updates: Partial<Event>): Event | null => {
  const events = getEvents();
  const index = events.findIndex(e => e.id === id);
  if (index === -1) return null;
  
  events[index] = { ...events[index], ...updates };
  saveEvents(events);
  return events[index];
};

export const deleteEvent = (id: number): boolean => {
  const events = getEvents();
  const filteredEvents = events.filter(e => e.id !== id);
  if (filteredEvents.length === events.length) return false;
  
  saveEvents(filteredEvents);
  return true;
};
