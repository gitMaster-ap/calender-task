import React, { memo } from "react";
import clsx from "clsx";
import { isCurrentMonth, isCurrentDay, isSelectedDay, formatDay } from "../../utils/date.utils";
import { getEventsForDay } from "../../utils/event.utils";
import type { CalendarEvent } from "./CalendarView.types";

interface CalendarCellProps {
  date: Date;
  currentMonth: Date;
  selectedDate: Date | null;
  events: CalendarEvent[];
  onDateClick: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
}

const CalendarCellComponent = ({
  date,
  currentMonth,
  selectedDate,
  events,
  onDateClick,
  onEventClick,
}: CalendarCellProps) => {
  const dayEvents = React.useMemo(() => getEventsForDay(events, date), [events, date]);
  const isOtherMonth = !isCurrentMonth(date, currentMonth);
  const isToday = isCurrentDay(date);
  const isSelected = isSelectedDay(date, selectedDate);
  const displayDate = formatDay(date);

  const handleClick = () => {
    onDateClick(date);
  };

  const handleEventClick = (e: React.MouseEvent, event: CalendarEvent) => {
    e.stopPropagation();
    onEventClick?.(event);
  };

  return (
    <div
      className={clsx(
        "min-h-[100px] p-2 border border-neutral-200 bg-white cursor-pointer transition-colors",
        "hover:bg-neutral-50 focus-visible-ring",
        isOtherMonth && "bg-neutral-50 text-neutral-400"
      )}
      onClick={handleClick}
      role="gridcell"
      aria-label={`${date.toLocaleDateString()}, ${dayEvents.length} events`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="flex items-center justify-center mb-1">
        <span
          className={clsx(
            "text-sm font-medium w-8 h-8 flex items-center justify-center rounded-full",
            isSelected
              ? "bg-primary-500 text-white"
              : isToday
                ? "bg-primary-100 text-primary-600"
                : "text-neutral-900",
            isOtherMonth && "text-neutral-400"
          )}
        >
          {displayDate}
        </span>
      </div>
      <div className="space-y-1">
        {dayEvents.length === 0 ? (
          <div className="text-xs text-neutral-400 italic">No events</div>
        ) : (
          <>
            {dayEvents.slice(0, 3).map((event) => (
              <div
                key={event.id}
                className={clsx(
                  "text-xs px-2 py-1 rounded-full truncate cursor-pointer font-medium",
                  isSelected ? "bg-white/30 text-white" : "text-white"
                )}
                style={
                  event.color && !isSelected
                    ? { backgroundColor: event.color }
                    : isSelected
                      ? undefined
                      : { backgroundColor: event.color || "#3b82f6" }
                }
                onClick={(e) => handleEventClick(e, event)}
                title={event.title}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 3 && (
              <div
                className={clsx(
                  "text-xs px-1.5 py-0.5 rounded",
                  isSelected ? "text-white/80" : "text-neutral-600"
                )}
              >
                +{dayEvents.length - 3} more
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

CalendarCellComponent.displayName = "CalendarCell";

const areEqual = (prevProps: CalendarCellProps, nextProps: CalendarCellProps) => {
  if (prevProps.events !== nextProps.events) {
    const prevDayEvents = getEventsForDay(prevProps.events, prevProps.date);
    const nextDayEvents = getEventsForDay(nextProps.events, nextProps.date);

    if (prevDayEvents.length !== nextDayEvents.length) {
      return false;
    }

    const prevIds = prevDayEvents
      .map((e) => e.id)
      .sort()
      .join(",");
    const nextIds = nextDayEvents
      .map((e) => e.id)
      .sort()
      .join(",");
    if (prevIds !== nextIds) {
      return false;
    }

    return false;
  }

  const dateEqual = prevProps.date.getTime() === nextProps.date.getTime();
  const monthEqual = prevProps.currentMonth.getTime() === nextProps.currentMonth.getTime();
  const selectedEqual =
    (prevProps.selectedDate?.getTime() ?? null) === (nextProps.selectedDate?.getTime() ?? null);

  return dateEqual && monthEqual && selectedEqual && prevProps.events === nextProps.events;
};

export const CalendarCell = memo(CalendarCellComponent, areEqual);
