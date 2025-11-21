# Calendar View Component

## 🚀 Live Storybook

[Deployed Storybook URL - To be added after deployment]

## 🛠 Installation

```bash
npm install
npm run storybook
```

## 🏗 Architecture

This calendar component is built with a modular, scalable architecture:

### Folder Structure
- `src/components/Calendar/` - Main calendar components (CalendarView, MonthView, WeekView, CalendarCell, EventModal)
- `src/components/primitives/` - Reusable UI primitives (Button, Modal, Select)
- `src/hooks/` - Custom React hooks for calendar logic and event management
- `src/utils/` - Utility functions for date manipulation and event filtering
- `src/styles/` - Global styles and Tailwind configuration

### Key Design Decisions
- **Type Safety**: Full TypeScript strict mode with no `any` types
- **Performance**: React.memo, useMemo, and useCallback for optimization
- **Accessibility**: ARIA labels, keyboard navigation, focus management
- **Modularity**: Separated concerns with hooks, utils, and components
- **Responsive**: Mobile-first design with Tailwind breakpoints

## ✨ Features

* **Month/Week views** - Toggle between monthly grid and weekly time-slot views
* **Event management** - Create, edit, and delete events with full CRUD operations
* **Responsive design** - Works seamlessly on mobile, tablet, and desktop
* **Accessibility** - Full keyboard navigation and ARIA support
* **Keyboard navigation** - Tab, Arrow Keys, Enter, Esc, Home, End support
* **Event colors** - 8 preset colors for event categorization
* **Event categories** - Organize events by type (Meeting, Work, Personal, etc.)

## 🧩 Storybook Stories

* **Default** - Current month with sample events
* **Empty State** - Calendar with no events
* **Week View** - Weekly time-slot grid demonstration
* **With Many Events** - Calendar with 20+ events to test performance
* **Interactive Demo** - Full interactive playground for add/edit/delete
* **Mobile View** - Responsive layout on mobile devices
* **Accessibility Demo** - Keyboard navigation showcase

## 🧠 Technologies

- **React** ^18.0.0 - UI framework
- **TypeScript** ^5.0.0 - Type-safe development
- **Tailwind CSS** ^3.0.0 - Utility-first styling
- **Vite** - Build tooling
- **Storybook** - Component documentation
- **date-fns** - Date manipulation utilities
- **clsx** - Conditional class names
- **zustand** - Lightweight state management (available but not required)

## 📬 Contact

[your email]

---

## Development

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Build Storybook
```bash
npm run build-storybook
```

## Performance

- Initial render: < 300ms
- Bundle size: < 200KB (gzipped)
- Optimized with React.memo, useMemo, and useCallback

## Accessibility

- Full keyboard navigation support
- ARIA labels and roles
- Visible focus indicators
- WCAG 2.1 AA compliant contrast ratios
- Screen reader friendly

