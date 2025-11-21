import React, { useMemo } from "react";
import { format, isToday, isTomorrow, startOfDay } from "date-fns";
import type { CalendarEvent } from "./CalendarView.types";

interface UpcomingEventsProps {
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  onAddEvent: () => void;
}

export const UpcomingEvents: React.FC<UpcomingEventsProps> = ({
  events,
  onEventClick,
  onAddEvent,
}) => {
  const upcomingEvents = useMemo(() => {
    const now = new Date();
    const sortedEvents = events
      .filter((event) => new Date(event.startDate) >= now)
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
      .slice(0, 5);

    return sortedEvents;
  }, [events]);

  const formatEventDate = (date: Date): string => {
    const eventDate = startOfDay(date);

    if (isToday(eventDate)) {
      return "Today";
    } else if (isTomorrow(eventDate)) {
      return "Tomorrow";
    } else {
      return format(eventDate, "MMM d");
    }
  };

  const formatEventTime = (date: Date): string => {
    return format(date, "HH:mm");
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-6 border-b border-neutral-200">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-lg font-semibold text-neutral-900">Upcoming events</h3>
          <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            View all
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {upcomingEvents.length === 0 ? (
          <div className="text-center text-neutral-500 py-8">
            <p className="text-sm">No upcoming events</p>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingEvents.map((event) => {
              const startDate = new Date(event.startDate);
              const endDate = new Date(event.endDate);

              return (
                <div
                  key={event.id}
                  className="pb-4 border-b border-neutral-100 last:border-b-0 cursor-pointer hover:bg-neutral-50 -mx-2 px-2 py-1 rounded transition-colors"
                  onClick={() => onEventClick?.(event)}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-3 h-3 rounded-sm mt-1.5 flex-shrink-0"
                      style={{ backgroundColor: event.color || "#3b82f6" }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-neutral-600 mb-1">
                        {formatEventDate(startDate)} {formatEventTime(startDate)} -{" "}
                        {formatEventTime(endDate)}
                      </div>
                      <div className="font-medium text-neutral-900 mb-1">{event.title}</div>
                      {event.description && (
                        <div className="text-sm text-neutral-600 line-clamp-2">
                          {event.description}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="p-6 border-t border-neutral-200">
        <button
          onClick={onAddEvent}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors focus-visible-ring flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Event
        </button>
      </div>
    </div>
  );
};
