import { memo } from "react";
import { MonthView } from "./MonthView";
import { WeekView } from "./WeekView";
import { EventModal } from "./EventModal";
import { UpcomingEvents } from "./UpcomingEvents";
import { useCalendar } from "../../hooks/useCalendar";
import { useEventManager } from "../../hooks/useEventManager";
import { getWeekDays } from "../../utils/date.utils";
import type { CalendarViewProps } from "./CalendarView.types";

export const CalendarView = memo<CalendarViewProps>(
  ({ events, onEventAdd, onEventUpdate, onEventDelete, initialView = "month", initialDate }) => {
    const {
      currentDate,
      selectedDate,
      setSelectedDate,
      view,
      monthYear,
      calendarDays,
      navigate,
      goToToday,
    } = useCalendar(initialDate, initialView);

    const {
      isModalOpen,
      editingEvent,
      selectedDate: modalSelectedDate,
      openAddModal,
      openEditModal,
      closeModal,
      handleSave,
      handleDelete,
    } = useEventManager(onEventAdd, onEventUpdate, onEventDelete);

    const handleDateClick = (date: Date) => {
      setSelectedDate(date);
      openAddModal(date);
    };

    const handleModalClose = () => {
      setSelectedDate(null);
      closeModal();
    };

    const handleSaveWithClear = (
      eventData: Omit<import("./CalendarView.types").CalendarEvent, "id">
    ) => {
      setSelectedDate(null);
      handleSave(eventData);
    };

    const handleEventClick = (event: import("./CalendarView.types").CalendarEvent) => {
      openEditModal(event);
    };

    const weekDays = view === "week" ? getWeekDays(currentDate) : [];

    return (
      <div className="w-full bg-neutral-50 min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-card overflow-hidden flex flex-col lg:flex-row">
            <div className="flex-1 flex flex-col min-w-0">
              <div className="p-6 border-b border-neutral-200">
                <h1 className="text-3xl font-bold text-neutral-900 mb-1">Calendar</h1>
                <p className="text-neutral-600">Plan and manage your events</p>
              </div>

              <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-white flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => navigate("prev")}
                    className="p-1.5 rounded-lg hover:bg-neutral-100 focus-visible-ring transition-colors"
                    aria-label="Previous month"
                  >
                    <svg
                      className="w-5 h-5 text-neutral-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <div className="text-lg font-semibold text-neutral-900">{monthYear}</div>
                  <button
                    onClick={() => navigate("next")}
                    className="p-1.5 rounded-lg hover:bg-neutral-100 focus-visible-ring transition-colors"
                    aria-label="Next month"
                  >
                    <svg
                      className="w-5 h-5 text-neutral-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate("prev")}
                    className="px-4 py-2 bg-neutral-100 text-neutral-700 hover:bg-neutral-200 rounded-lg text-sm font-medium transition-colors focus-visible-ring flex items-center gap-1.5"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Previous
                  </button>
                  <button
                    onClick={goToToday}
                    className="px-4 py-2 bg-primary-100 text-primary-600 hover:bg-primary-200 rounded-lg text-sm font-medium transition-colors focus-visible-ring"
                  >
                    Today
                  </button>
                  <button
                    onClick={() => navigate("next")}
                    className="px-4 py-2 bg-primary-600 text-white hover:bg-primary-700 rounded-lg text-sm font-medium transition-colors focus-visible-ring flex items-center gap-1.5"
                  >
                    Next
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6 flex-1 overflow-auto">
                {view === "month" ? (
                  <MonthView
                    calendarDays={calendarDays}
                    currentMonth={currentDate}
                    selectedDate={selectedDate}
                    events={events}
                    onDateClick={handleDateClick}
                    onEventClick={handleEventClick}
                  />
                ) : (
                  <WeekView
                    weekDays={weekDays}
                    events={events}
                    onDateClick={handleDateClick}
                    onEventClick={handleEventClick}
                  />
                )}
              </div>
            </div>

            <div className="w-full lg:w-80 xl:w-96 flex-shrink-0 border-t lg:border-t-0 lg:border-l border-neutral-200">
              <UpcomingEvents
                events={events}
                onEventClick={handleEventClick}
                onAddEvent={() => openAddModal()}
              />
            </div>
          </div>
        </div>

        <EventModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSave={handleSaveWithClear}
          onDelete={editingEvent ? handleDelete : undefined}
          event={editingEvent}
          initialDate={modalSelectedDate}
        />
      </div>
    );
  }
);

CalendarView.displayName = "CalendarView";
