import { useState, useCallback } from "react";
import type { CalendarEvent } from "../components/Calendar/CalendarView.types";

export const useEventManager = (
  onEventAdd: (event: CalendarEvent) => void,
  onEventUpdate: (id: string, updates: Partial<CalendarEvent>) => void,
  onEventDelete: (id: string) => void
) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const openAddModal = useCallback((date?: Date) => {
    setSelectedDate(date || null);
    setEditingEvent(null);
    setIsModalOpen(true);
  }, []);

  const openEditModal = useCallback((event: CalendarEvent) => {
    setEditingEvent(event);
    setSelectedDate(null);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingEvent(null);
    setSelectedDate(null);
  }, []);

  const handleSave = useCallback(
    (eventData: Omit<CalendarEvent, "id">) => {
      if (editingEvent) {
        onEventUpdate(editingEvent.id, eventData);
      } else {
        const newEvent: CalendarEvent = {
          ...eventData,
          id: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        };
        onEventAdd(newEvent);
      }
      setSelectedDate(null);
      closeModal();
    },
    [editingEvent, onEventAdd, onEventUpdate, closeModal]
  );

  const handleDelete = useCallback(() => {
    if (editingEvent) {
      onEventDelete(editingEvent.id);
      closeModal();
    }
  }, [editingEvent, onEventDelete, closeModal]);

  return {
    isModalOpen,
    editingEvent,
    selectedDate,
    openAddModal,
    openEditModal,
    closeModal,
    handleSave,
    handleDelete,
  };
};
