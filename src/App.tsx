import { useState } from "react";
import { CalendarView } from "./components/Calendar/CalendarView";
import type { CalendarEvent } from "./components/Calendar/CalendarView.types";

const sampleEvents: CalendarEvent[] = [
  {
    id: "evt-1",
    title: "Team Standup",
    description: "Daily sync with the team",
    startDate: new Date(2025, 10, 20, 9, 0),
    endDate: new Date(2025, 10, 20, 9, 30),
    color: "#3b82f6",
    category: "Meeting",
  },
  {
    id: "evt-2",
    title: "Design Review",
    startDate: new Date(2025, 10, 20, 14, 0),
    endDate: new Date(2025, 10, 20, 15, 30),
    color: "#10b981",
    category: "Design",
  },
];

function App() {
  const [events, setEvents] = useState<CalendarEvent[]>(sampleEvents);

  const handleEventAdd = (event: CalendarEvent) => {
    setEvents((prev) => [...prev, event]);
  };

  const handleEventUpdate = (id: string, updates: Partial<CalendarEvent>) => {
    setEvents((prev) => prev.map((event) => (event.id === id ? { ...event, ...updates } : event)));
  };

  const handleEventDelete = (id: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  return (
    <div className="min-h-screen">
      <CalendarView
        events={events}
        onEventAdd={handleEventAdd}
        onEventUpdate={handleEventUpdate}
        onEventDelete={handleEventDelete}
        initialView="month"
        initialDate={new Date(2025, 10, 20)}
      />
    </div>
  );
}

export default App;
