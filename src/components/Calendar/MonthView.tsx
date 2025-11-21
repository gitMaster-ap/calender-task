import { memo } from "react";
import { CalendarCell } from "./CalendarCell";
import type { CalendarEvent } from "./CalendarView.types";

interface MonthViewProps {
  calendarDays: Date[];
  currentMonth: Date;
  selectedDate: Date | null;
  events: CalendarEvent[];
  onDateClick: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
}

export const MonthView = memo<MonthViewProps>(
  ({ calendarDays, currentMonth, selectedDate, events, onDateClick, onEventClick }) => {
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    return (
      <div className="w-full">
        <div className="grid grid-cols-7 border-b border-neutral-200 bg-neutral-50">
          {weekDays.map((day) => (
            <div
              key={day}
              className="p-3 text-center text-sm font-semibold text-neutral-700"
              role="columnheader"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 auto-rows-fr">
          {calendarDays.map((date, index) => (
            <CalendarCell
              key={`${date.getTime()}-${index}`}
              date={date}
              currentMonth={currentMonth}
              selectedDate={selectedDate}
              events={events}
              onDateClick={onDateClick}
              onEventClick={onEventClick}
            />
          ))}
        </div>
      </div>
    );
  }
);

MonthView.displayName = "MonthView";
