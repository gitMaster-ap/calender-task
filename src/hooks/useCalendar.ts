import { useState, useMemo, useCallback } from "react";
import {
  getCalendarDays,
  getWeekDays,
  formatMonthYear,
  navigateMonth,
  navigateWeek,
} from "../utils/date.utils";
import type { CalendarView } from "../components/Calendar/CalendarView.types";

export const useCalendar = (initialDate?: Date, initialView: CalendarView = "month") => {
  const [currentDate, setCurrentDate] = useState<Date>(initialDate || new Date());
  const [view] = useState<CalendarView>(initialView);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthYear = useMemo(() => formatMonthYear(currentDate), [currentDate]);

  const calendarDays = useMemo(() => {
    return view === "month" ? getCalendarDays(currentDate) : getWeekDays(currentDate);
  }, [currentDate, view]);

  const navigate = useCallback(
    (direction: "prev" | "next") => {
      setCurrentDate((prev) =>
        view === "month" ? navigateMonth(prev, direction) : navigateWeek(prev, direction)
      );
    },
    [view]
  );

  const goToToday = useCallback(() => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  }, []);

  return {
    currentDate,
    selectedDate,
    setSelectedDate,
    view,
    monthYear,
    calendarDays,
    navigate,
    goToToday,
  };
};
