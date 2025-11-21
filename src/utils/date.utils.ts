import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  format,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  startOfDay,
  setHours,
  setMinutes,
} from 'date-fns';

export const getCalendarDays = (date: Date): Date[] => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
};

export const isCurrentMonth = (date: Date, currentDate: Date): boolean => {
  return isSameMonth(date, currentDate);
};

export const isCurrentDay = (date: Date): boolean => {
  return isToday(date);
};

export const isSelectedDay = (date: Date, selectedDate: Date | null): boolean => {
  if (!selectedDate) return false;
  return isSameDay(date, selectedDate);
};

export const formatMonthYear = (date: Date): string => {
  return format(date, 'MMMM yyyy');
};

export const formatDay = (date: Date): string => {
  return format(date, 'd');
};

export const navigateMonth = (date: Date, direction: 'prev' | 'next'): Date => {
  return direction === 'prev' ? subMonths(date, 1) : addMonths(date, 1);
};

export const navigateWeek = (date: Date, direction: 'prev' | 'next'): Date => {
  return direction === 'prev' ? subWeeks(date, 1) : addWeeks(date, 1);
};

export const getWeekDays = (date: Date): Date[] => {
  const weekStart = startOfWeek(date, { weekStartsOn: 1 });
  return eachDayOfInterval({
    start: weekStart,
    end: endOfWeek(weekStart, { weekStartsOn: 1 }),
  });
};

export const getTimeSlots = (interval: 30 | 60 = 60): Date[] => {
  const slots: Date[] = [];
  const baseDate = startOfDay(new Date());

  for (let hour = 0; hour < 24; hour++) {
    if (interval === 60) {
      slots.push(setHours(baseDate, hour));
    } else {
      slots.push(setHours(setMinutes(baseDate, 0), hour));
      slots.push(setHours(setMinutes(baseDate, 30), hour));
    }
  }

  return slots;
};

export const formatTime = (date: Date): string => {
  return format(date, 'HH:mm');
};

export const formatDateTime = (date: Date): string => {
  return format(date, 'yyyy-MM-dd\'T\'HH:mm');
};
