import React, { useState, useEffect } from 'react';
import { Modal } from '../primitives/Modal';
import { Button } from '../primitives/Button';
import { Select } from '../primitives/Select';
import { formatDateTime } from '../../utils/date.utils';
import type { CalendarEvent } from './CalendarView.types';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Omit<CalendarEvent, 'id'>) => void;
  onDelete?: () => void;
  event?: CalendarEvent | null;
  initialDate?: Date | null;
}

const COLOR_PRESETS = [
  { value: '#3b82f6', label: 'Blue' },
  { value: '#10b981', label: 'Green' },
  { value: '#f59e0b', label: 'Orange' },
  { value: '#ef4444', label: 'Red' },
  { value: '#8b5cf6', label: 'Purple' },
  { value: '#ec4899', label: 'Pink' },
  { value: '#06b6d4', label: 'Cyan' },
  { value: '#84cc16', label: 'Lime' },
];

const CATEGORIES = [
  { value: 'None', label: 'None' },
  { value: 'Meeting', label: 'Meeting' },
  { value: 'Personal', label: 'Personal' },
  { value: 'Work', label: 'Work' },
  { value: 'Design', label: 'Design' },
  { value: 'Development', label: 'Development' },
  { value: 'Other', label: 'Other' },
];

export const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  event,
  initialDate,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [color, setColor] = useState(COLOR_PRESETS[0].value);
  const [category, setCategory] = useState(CATEGORIES[0].value);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description || '');
      setStartDate(formatDateTime(new Date(event.startDate)));
      setEndDate(formatDateTime(new Date(event.endDate)));
      setColor(event.color || COLOR_PRESETS[0].value);
      setCategory(event.category || 'None');
    } else if (initialDate) {
      const start = new Date(initialDate);
      start.setHours(9, 0, 0, 0);
      const end = new Date(initialDate);
      end.setHours(10, 0, 0, 0);
      setStartDate(formatDateTime(start));
      setEndDate(formatDateTime(end));
      setTitle('');
      setDescription('');
      setColor(COLOR_PRESETS[0].value);
      setCategory(CATEGORIES[0].value);
    } else {
      const now = new Date();
      const start = new Date(now);
      start.setMinutes(0, 0, 0);
      const end = new Date(start);
      end.setHours(start.getHours() + 1);
      setStartDate(formatDateTime(start));
      setEndDate(formatDateTime(end));
      setTitle('');
      setDescription('');
      setColor(COLOR_PRESETS[0].value);
      setCategory(CATEGORIES[0].value);
    }
    setErrors({});
  }, [event, initialDate, isOpen]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.length > 100) {
      newErrors.title = 'Title must be 100 characters or less';
    }

    if (description.length > 500) {
      newErrors.description = 'Description must be 500 characters or less';
    }

    if (!startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (!endDate) {
      newErrors.endDate = 'End date is required';
    }

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (end <= start) {
        newErrors.endDate = 'End date must be after start date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      title: title.trim(),
      description: description.trim() || undefined,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      color,
      category: category === 'None' ? undefined : category,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={event ? 'Edit Event' : 'Add Event'}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-1.5">
            Title <span className="text-error-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              errors.title ? 'border-error-500' : 'border-neutral-300'
            }`}
            aria-invalid={!!errors.title}
            aria-describedby={errors.title ? 'title-error' : undefined}
          />
          {errors.title && (
            <p id="title-error" className="mt-1 text-sm text-error-500">
              {errors.title}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-1.5">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
            rows={3}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              errors.description ? 'border-error-500' : 'border-neutral-300'
            }`}
            aria-invalid={!!errors.description}
            aria-describedby={errors.description ? 'description-error' : undefined}
          />
          <div className="mt-1 flex justify-between">
            {errors.description && (
              <p id="description-error" className="text-sm text-error-500">
                {errors.description}
              </p>
            )}
            <p className="text-xs text-neutral-500 ml-auto">
              {description.length}/500
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-neutral-700 mb-1.5">
              Start Date & Time <span className="text-error-500">*</span>
            </label>
            <input
              id="startDate"
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors.startDate ? 'border-error-500' : 'border-neutral-300'
              }`}
              aria-invalid={!!errors.startDate}
              aria-describedby={errors.startDate ? 'startDate-error' : undefined}
            />
            {errors.startDate && (
              <p id="startDate-error" className="mt-1 text-sm text-error-500">
                {errors.startDate}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-neutral-700 mb-1.5">
              End Date & Time <span className="text-error-500">*</span>
            </label>
            <input
              id="endDate"
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors.endDate ? 'border-error-500' : 'border-neutral-300'
              }`}
              aria-invalid={!!errors.endDate}
              aria-describedby={errors.endDate ? 'endDate-error' : undefined}
            />
            {errors.endDate && (
              <p id="endDate-error" className="mt-1 text-sm text-error-500">
                {errors.endDate}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">Color</label>
          <div className="flex gap-2 flex-wrap">
            {COLOR_PRESETS.map((preset) => (
              <button
                key={preset.value}
                type="button"
                onClick={() => setColor(preset.value)}
                className={`w-10 h-10 rounded-lg border-2 transition-all focus-visible-ring ${
                  color === preset.value
                    ? 'border-neutral-900 scale-110'
                    : 'border-neutral-300 hover:border-neutral-400'
                }`}
                style={{ backgroundColor: preset.value }}
                aria-label={`Select ${preset.label} color`}
                title={preset.label}
              />
            ))}
          </div>
        </div>

        <div>
          <Select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={CATEGORIES}
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-neutral-200">
          {event && onDelete && (
            <Button type="button" variant="ghost" onClick={onDelete} className="text-error-500 hover:text-error-600">
              Delete
            </Button>
          )}
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
};
