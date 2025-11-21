🗓️ PRD: Calendar View Component
🔍 Overview
Goal: Build a fully interactive Calendar View component from scratch using React, TypeScript, and Tailwind CSS. It must support Month and Week views, event management, and be documented in Storybook.
Purpose: This challenge tests your ability to build production-grade, scalable, and accessible UI components without relying on pre-built libraries.
Estimated Time: 8–12 hours Submission: GitHub repository + Deployed Storybook (Chromatic, Vercel, or Netlify)

⚙️ Tech Stack
Technology Purpose Version
React UI framework ^18.0.0
TypeScript Type-safe development ^5.0.0
Tailwind CSS Utility-first styling ^3.0.0
Vite or Next.js Build tooling Latest stable
Storybook Component documentation Required
✅ Allowed Utilities

- date-fns or dayjs – date manipulation
- clsx or classnames – conditional class names
- zustand or jotai – lightweight state management
- framer-motion – animations (bonus only)
  ❌ Forbidden
- Component libraries (Radix, Shadcn, MUI, Chakra, Mantine, etc.)
- Pre-built calendar/date components (FullCalendar, react-calendar, etc.)
- CSS-in-JS (styled-components, emotion)
- AI-generated UI builders (Lovable, Locofy, TeleportHQ, etc.)

🧱 Project Structure
calendar-component/
│
├── README.md
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── .storybook/
│ ├── main.ts
│ └── preview.ts
│
└── src/
├── components/
│ ├── Calendar/
│ │ ├── CalendarView.tsx
│ │ ├── CalendarView.stories.tsx
│ │ ├── CalendarView.types.ts
│ │ ├── MonthView.tsx
│ │ ├── WeekView.tsx
│ │ ├── CalendarCell.tsx
│ │ └── EventModal.tsx
│ └── primitives/
│ ├── Button.tsx
│ ├── Modal.tsx
│ └── Select.tsx
│
├── hooks/
│ ├── useCalendar.ts
│ └── useEventManager.ts
│
├── utils/
│ ├── date.utils.ts
│ └── event.utils.ts
│
└── styles/
└── globals.css

🎯 Core Objectives

1. Build interactive, scalable, and accessible calendar components.
2. Implement Month and Week views with event management.
3. Achieve production-ready code quality (type safety, performance).
4. Demonstrate through Storybook stories.
5. Ensure responsiveness, accessibility, and optimization.

🧩 Functional Requirements

1. CalendarView Component
   Props
   interface CalendarEvent {
   id: string;
   title: string;
   description?: string;
   startDate: Date;
   endDate: Date;
   color?: string;
   category?: string;
   }

interface CalendarViewProps {
events: CalendarEvent[];
onEventAdd: (event: CalendarEvent) => void;
onEventUpdate: (id: string, updates: Partial<CalendarEvent>) => void;
onEventDelete: (id: string) => void;
initialView?: 'month' | 'week';
initialDate?: Date;
}

2. Month View

- Renders 42 cells (6 weeks × 7 days)
- Dates from other months are grayed out
- Highlight current day
- Event badge when >3 events per day (+x more)
- Click on day → opens “Add Event” modal
- Responsive grid layout
- Tooltip on hover shows event info

3. Week View

- 7-day horizontal layout with time slots (00:00–23:00)
- 30/60 min intervals with grid lines
- Events displayed based on duration
- Overlapping events handled via side-by-side layout
- Drag-to-create and drag-to-move event interactions

4. Event Modal
   Includes:

- Title (required, max 100 chars)
- Description (optional, max 500)
- Start/End datetime pickers
- Color picker (5–8 presets)
- Category dropdown
- Delete/Cancel/Save actions
- Keyboard + ARIA accessibility

5. Navigation Controls

- Prev / Next buttons
- “Today” quick-jump
- Month/Year picker dropdown
- View toggle (Month ↔ Week)

📱 Responsive Design
Breakpoint Target Behavior
sm (640px+) Mobile Stacked layout, swipe interaction
md (768px+) Tablet Two-column layout, sticky header
lg (1024px+) Desktop Full 7-column grid
xl (1280px+) Large screen Sidebar for events
♿ Accessibility Requirements

- Full keyboard navigation (Tab, Arrow Keys, Enter, Esc, Home, End)
- Proper ARIA roles and labels
- Visible :focus-visible styles
- Text contrast ≥ 4.5:1
- Resize up to 200% without breaking layout

⚡ Performance Benchmarks
Metric Target Description
Initial render < 300ms Time to interactive
Search/filter latency < 100ms Debounced updates
Bundle size < 200KB (gzipped) Production build
Optimization Techniques

- React.memo, useMemo, useCallback
- Lazy-load modals
- Virtualize long lists (>50 items)
- Debounce inputs

🧠 Code Quality Standards

1. TypeScript strict mode (noImplicitAny, strictNullChecks, etc.)
2. No any types, well-defined interfaces
3. Reusable component architecture
4. Hooks pattern for state and logic separation
5. Utility pattern for date/event helpers
6. Consistent formatting (ESLint + Prettier)

📚 Storybook Requirements
Each of the following must be implemented as separate stories:
Story Description
Default Current month with sample events
Empty State No events
Week View Week grid demonstration
With Many Events 20+ events
Interactive Demo Add/edit/delete events
Mobile View Responsive layout
Accessibility Demo Keyboard navigation
🧾 Documentation & Submission
README.md Template

# Calendar View Component

## 🚀 Live Storybook

[Deployed Storybook URL]

## 🛠 Installation

````bash
npm install
npm run storybook
🏗 Architecture
Briefly explain your folder structure and key design decisions.
✨ Features
* Month/Week views
* Event management
* Responsive design
* Accessibility
* Keyboard navigation
🧩 Storybook Stories
* Default
* Empty State
* Week View
* Large Dataset
* Interactive Playground
🧠 Technologies
React + TypeScript + Tailwind CSS + Storybook
📬 Contact
[your email]
---

## 🧮 Evaluation Rubric

| Category | Points | Focus |
|-----------|--------|-------|
| Functionality | 30 | Core features & correctness |
| Code Quality | 25 | Type safety, structure, readability |
| UI/UX | 20 | Design consistency, responsiveness |
| Accessibility | 10 | WCAG compliance, keyboard support |
| Performance | 10 | Optimization & scalability |
| Documentation | 5 | README & setup clarity |
| **Bonus (+15)** | - | Tests, Framer Motion, dark mode, etc. |

---

## 🚫 Disqualification Criteria
- Use of forbidden libraries or AI-generated UI
- Non-functional build
- Missing README or deployment
- Private/unshared repository
- Plagiarized or template-based code

---

## 🧭 Development Plan (Recommended Timeline)

| Day | Focus |
|------|--------|
| 1–2 | Static layout & responsiveness |
| 3–4 | Month/Week logic & navigation |
| 5–6 | Event modals & interactivity |
| 7–8 | Accessibility, polish, Storybook & deploy |

---

## ✅ Final Submission Checklist

### Functionality
- [ ] Month and Week views
- [ ] Create/Edit/Delete events
- [ ] Navigation controls
- [ ] Responsive behavior
- [ ] No console errors

### Code Quality
- [ ] Strict TypeScript
- [ ] ESLint passes
- [ ] Reusable components

### Accessibility
- [ ] Keyboard-friendly
- [ ] ARIA labels present
- [ ] Visible focus indicators

### Documentation
- [ ] README complete
- [ ] Architecture explained
- [ ] Deployed Storybook link

---

## 📦 Deployment
- Deploy Storybook on **Chromatic**, **Vercel**, or **Netlify**
- Include working link in README and submission form

---

## 💡 Sample Data

```ts
const sampleEvents: CalendarEvent[] = [
  {
    id: 'evt-1',
    title: 'Team Standup',
    description: 'Daily sync with the team',
    startDate: new Date(2024, 0, 15, 9, 0),
    endDate: new Date(2024, 0, 15, 9, 30),
    color: '#3b82f6',
    category: 'Meeting',
  },
  {
    id: 'evt-2',
    title: 'Design Review',
    startDate: new Date(2024, 0, 15, 14, 0),
    endDate: new Date(2024, 0, 15, 15, 30),
    color: '#10b981',
    category: 'Design',
  },
];


```ts
const sampleEvents: CalendarEvent[] = [
  {
    id: 'evt-1',
    title: 'Team Standup',
    description: 'Daily sync with the team',
    startDate: new Date(2024, 0, 15, 9, 0),
    endDate: new Date(2024, 0, 15, 9, 30),
    color: '#3b82f6',
    category: 'Meeting',
  },
  {
    id: 'evt-2',
    title: 'Design Review',
    startDate: new Date(2024, 0, 15, 14, 0),
    endDate: new Date(2024, 0, 15, 15, 30),
    color: '#10b981',
    category: 'Design',
  },
];

Appendix B: Tailwind Configuration Template
/** @type {import('tailwindcss').Config} */ export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
], theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
}, neutral: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
}, success: {
          50: '#f0fdf4',
          500: '#10b981',
          700: '#047857',
}, warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          700: '#b45309',
}, error: {
          50: '#fef2f2',
          500: '#ef4444',
          700: '#b91c1c',
}, },
fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
}, spacing: {
        18: '4.5rem',
        88: '22rem',
        112: '28rem',
        128: '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'card-hover': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 /
0.1)',
        'modal': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 /
0.1)', },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
}, slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
}, },
}, },
  plugins: [],
}
````
