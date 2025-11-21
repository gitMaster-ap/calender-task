import { startOfDay, endOfDay } from 'date-fns';
import type { CalendarEvent } from '../components/Calendar/CalendarView.types';

export const getEventsForDay = (events: CalendarEvent[], date: Date): CalendarEvent[] => {
  const dayStart = startOfDay(date);
  const dayEnd = endOfDay(date);

  return events.filter((event) => {
    const eventStart = new Date(event.startDate);
    const eventEnd = new Date(event.endDate);
    const eventStartDay = startOfDay(eventStart);
    const eventEndDay = endOfDay(eventEnd);
    return eventStartDay <= dayEnd && eventEndDay >= dayStart;
  });
};

export const getEventsForWeek = (events: CalendarEvent[], weekStart: Date): CalendarEvent[] => {
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);
  weekEnd.setHours(23, 59, 59, 999);

  return events.filter((event) => {
    const eventStart = new Date(event.startDate);
    const eventEnd = new Date(event.endDate);

    return (
      (eventStart >= weekStart && eventStart <= weekEnd) ||
      (eventEnd >= weekStart && eventEnd <= weekEnd) ||
      (eventStart <= weekStart && eventEnd >= weekEnd)
    );
  });
};

export const checkEventOverlap = (event1: CalendarEvent, event2: CalendarEvent): boolean => {
  const start1 = new Date(event1.startDate).getTime();
  const end1 = new Date(event1.endDate).getTime();
  const start2 = new Date(event2.startDate).getTime();
  const end2 = new Date(event2.endDate).getTime();

  return start1 < end2 && start2 < end1;
};

export const getOverlappingGroups = (events: CalendarEvent[]): CalendarEvent[][] => {
  const groups: CalendarEvent[][] = [];
  const processed = new Set<string>();

  events.forEach((event) => {
    if (processed.has(event.id)) return;

    const group: CalendarEvent[] = [event];
    processed.add(event.id);

    events.forEach((otherEvent) => {
      if (processed.has(otherEvent.id)) return;

      const overlapsWithAny = group.some((groupEvent) =>
        checkEventOverlap(groupEvent, otherEvent)
      );

      if (overlapsWithAny) {
        group.push(otherEvent);
        processed.add(otherEvent.id);
      }
    });

    groups.push(group);
  });

  return groups;
};

export const getEventPosition = (
  event: CalendarEvent,
  dayStart: Date,
  slotHeight: number
): { top: number; height: number } => {
  const eventStart = new Date(event.startDate);
  const eventEnd = new Date(event.endDate);

  const startMinutes = eventStart.getHours() * 60 + eventStart.getMinutes();
  const endMinutes = eventEnd.getHours() * 60 + eventEnd.getMinutes();
  const dayStartMinutes = dayStart.getHours() * 60 + dayStart.getMinutes();

  const top = ((startMinutes - dayStartMinutes) / 60) * slotHeight;
  const height = ((endMinutes - startMinutes) / 60) * slotHeight;

  return { top, height: Math.max(height, 20) };
};

