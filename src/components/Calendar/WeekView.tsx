import React, { memo, useMemo } from "react";
import { getTimeSlots, formatTime } from "../../utils/date.utils";
import {
  getEventsForWeek,
  getEventsForDay,
  getOverlappingGroups,
  getEventPosition,
} from "../../utils/event.utils";
import type { CalendarEvent } from "./CalendarView.types";

interface WeekViewProps {
  weekDays: Date[];
  events: CalendarEvent[];
  onDateClick: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
}

const SLOT_HEIGHT = 60;

export const WeekView = memo<WeekViewProps>(({ weekDays, events, onDateClick, onEventClick }) => {
  const timeSlots = useMemo(() => getTimeSlots(60), []);
  const weekEvents = useMemo(() => getEventsForWeek(events, weekDays[0]), [events, weekDays]);

  const formatDayHeader = (date: Date): React.ReactNode => {
    const today = new Date();
    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
    const dayNumber = date.getDate();

    return (
      <div className="text-center">
        <div className={`text-xs text-neutral-600 ${isToday ? "font-semibold" : ""}`}>
          {dayName}
        </div>
        <div
          className={`text-lg font-semibold ${
            isToday
              ? "text-primary-600 bg-primary-100 rounded-full w-8 h-8 flex items-center justify-center mx-auto"
              : "text-neutral-900"
          }`}
        >
          {dayNumber}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[800px]">
        <div className="grid grid-cols-8 border-b border-neutral-200 bg-neutral-50 sticky top-0 z-10">
          <div className="p-3 border-r border-neutral-200"></div>
          {weekDays.map((day) => (
            <div key={day.getTime()} className="p-3 border-r border-neutral-200 last:border-r-0">
              {formatDayHeader(day)}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-8">
          <div className="border-r border-neutral-200">
            {timeSlots.map((slot) => (
              <div
                key={slot.getTime()}
                className="h-[60px] border-b border-neutral-100 px-2 text-xs text-neutral-500 flex items-start pt-1"
              >
                {formatTime(slot)}
              </div>
            ))}
          </div>
          {weekDays.map((day) => {
            const dayEvents = getEventsForDay(weekEvents, day);
            const overlappingGroups = getOverlappingGroups(dayEvents);
            const dayStart = new Date(day);
            dayStart.setHours(0, 0, 0, 0);

            return (
              <div
                key={day.getTime()}
                className="border-r border-neutral-200 last:border-r-0 relative"
                onClick={() => onDateClick(day as Date)}
              >
                {timeSlots.map((slot: Date) => (
                  <div
                    key={slot.getTime()}
                    className="h-[60px] border-b border-neutral-100 hover:bg-neutral-50 cursor-pointer"
                  />
                ))}
                {overlappingGroups.map((group) =>
                  group.map((event, eventIndex) => {
                    const { top, height } = getEventPosition(event, dayStart, SLOT_HEIGHT);
                    const width = 100 / group.length;
                    const left = (eventIndex * 100) / group.length;

                    return (
                      <div
                        key={event.id}
                        className="absolute left-0 right-0 px-1"
                        style={{
                          top: `${top}px`,
                          left: `${left}%`,
                          width: `${width}%`,
                          height: `${height}px`,
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onEventClick?.(event);
                        }}
                      >
                        <div
                          className="h-full rounded px-2 py-1 text-xs text-white cursor-pointer overflow-hidden truncate"
                          style={{
                            backgroundColor: event.color || "#3b82f6",
                          }}
                          title={event.title}
                        >
                          <div className="font-semibold">{event.title}</div>
                          <div className="text-white/80">
                            {formatTime(new Date(event.startDate))} -{" "}
                            {formatTime(new Date(event.endDate))}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

WeekView.displayName = "WeekView";
