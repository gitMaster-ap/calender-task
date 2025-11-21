import type { Meta, StoryObj } from "@storybook/react";
import { CalendarView } from "./CalendarView";
import type { CalendarEvent } from "./CalendarView.types";

const meta: Meta<typeof CalendarView> = {
  title: "Calendar/CalendarView",
  component: CalendarView,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CalendarView>;

const sampleEvents: CalendarEvent[] = [
  {
    id: "evt-1",
    title: "Team Standup",
    description: "Daily sync with the team",
    startDate: new Date(2025, 10, 20, 9, 0),
    endDate: new Date(2025, 10, 20, 9, 30),
    color: "#3b82f6",
    category: "Meeting",
  },
  {
    id: "evt-2",
    title: "Design Review",
    startDate: new Date(2025, 10, 20, 14, 0),
    endDate: new Date(2025, 10, 20, 15, 30),
    color: "#10b981",
    category: "Design",
  },
  {
    id: "evt-3",
    title: "Client Meeting",
    description: "Quarterly review with client",
    startDate: new Date(2025, 10, 22, 10, 0),
    endDate: new Date(2025, 10, 22, 11, 30),
    color: "#f59e0b",
    category: "Meeting",
  },
  {
    id: "evt-4",
    title: "Code Review",
    startDate: new Date(2025, 10, 18, 15, 0),
    endDate: new Date(2025, 10, 18, 16, 0),
    color: "#8b5cf6",
    category: "Development",
  },
];

const manyEvents: CalendarEvent[] = Array.from({ length: 25 }, (_, i) => ({
  id: `evt-many-${i}`,
  title: `Event ${i + 1}`,
  description: `This is event number ${i + 1}`,
  startDate: new Date(2025, 10, 15 + (i % 10), 9 + (i % 8), 0),
  endDate: new Date(2025, 10, 15 + (i % 10), 10 + (i % 8), 0),
  color: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"][i % 5],
  category: ["Meeting", "Work", "Personal", "Design", "Development"][i % 5],
}));

export const Default: Story = {
  args: {
    events: sampleEvents,
    onEventAdd: (event) => {
      console.log("Add event:", event);
    },
    onEventUpdate: (id, updates) => {
      console.log("Update event:", id, updates);
    },
    onEventDelete: (id) => {
      console.log("Delete event:", id);
    },
    initialView: "month",
    initialDate: new Date(2025, 10, 20),
  },
};

export const EmptyState: Story = {
  args: {
    events: [],
    onEventAdd: (event) => {
      console.log("Add event:", event);
    },
    onEventUpdate: (id, updates) => {
      console.log("Update event:", id, updates);
    },
    onEventDelete: (id) => {
      console.log("Delete event:", id);
    },
    initialView: "month",
  },
};

export const WeekView: Story = {
  args: {
    events: sampleEvents,
    onEventAdd: (event) => {
      console.log("Add event:", event);
    },
    onEventUpdate: (id, updates) => {
      console.log("Update event:", id, updates);
    },
    onEventDelete: (id) => {
      console.log("Delete event:", id);
    },
    initialView: "week",
    initialDate: new Date(2025, 10, 20),
  },
};

export const WithManyEvents: Story = {
  args: {
    events: manyEvents,
    onEventAdd: (event) => {
      console.log("Add event:", event);
    },
    onEventUpdate: (id, updates) => {
      console.log("Update event:", id, updates);
    },
    onEventDelete: (id) => {
      console.log("Delete event:", id);
    },
    initialView: "month",
    initialDate: new Date(2025, 10, 20),
  },
};

export const InteractiveDemo: Story = {
  args: {
    events: sampleEvents,
    onEventAdd: (event) => {
      alert(`Event added: ${event.title}`);
    },
    onEventUpdate: (id, _) => {
      alert(`Event updated: ${id}`);
    },
    onEventDelete: (id) => {
      if (confirm("Are you sure you want to delete this event?")) {
        alert(`Event deleted: ${id}`);
      }
    },
    initialView: "month",
    initialDate: new Date(2025, 10, 20),
  },
};

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: "iphone12",
    },
  },
  args: {
    events: sampleEvents,
    onEventAdd: (event) => {
      console.log("Add event:", event);
    },
    onEventUpdate: (id, updates) => {
      console.log("Update event:", id, updates);
    },
    onEventDelete: (id) => {
      console.log("Delete event:", id);
    },
    initialView: "month",
    initialDate: new Date(2025, 10, 20),
  },
};

export const AccessibilityDemo: Story = {
  args: {
    events: sampleEvents,
    onEventAdd: (event) => {
      console.log("Add event:", event);
    },
    onEventUpdate: (id, updates) => {
      console.log("Update event:", id, updates);
    },
    onEventDelete: (id) => {
      console.log("Delete event:", id);
    },
    initialView: "month",
    initialDate: new Date(2025, 10, 20),
  },
  parameters: {
    docs: {
      description: {
        story: "Use Tab to navigate, Enter/Space to select dates, and Escape to close modals.",
      },
    },
  },
};
