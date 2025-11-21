# How Storybook is Used in This Project

## Overview
Storybook is configured to provide an isolated development environment for the Calendar component, allowing developers to test and showcase different states and variations of the calendar without running the full application.

## Configuration

### 1. Main Configuration (`.storybook/main.ts`)
```typescript
- Framework: React with Vite
- Story Location: All `.stories.tsx` files in `src/**` directory
- Addons:
  - @storybook/addon-essentials (controls, actions, docs, etc.)
  - @storybook/addon-links (link between stories)
  - @storybook/addon-interactions (interaction testing)
- Auto-docs: Enabled with 'tag' mode
```

### 2. Preview Configuration (`.storybook/preview.ts`)
```typescript
- Global Styles: Imports `globals.css` for consistent styling
- Actions: Auto-captures all `on[A-Z]` callbacks (like `onEventAdd`, `onEventUpdate`)
- Controls: Smart matchers for colors and dates
- Layout: Centered by default
```

## Story Implementation

### Component: CalendarView
**Location:** `src/components/Calendar/CalendarView.stories.tsx`

### Stories Created:

#### 1. **Default Story**
- Shows the calendar with sample events
- Month view by default
- Demonstrates normal usage with 4 sample events

#### 2. **EmptyState Story**
- Tests the calendar with no events
- Validates empty state UI and messaging
- Ensures the calendar works without data

#### 3. **WeekView Story**
- Shows the calendar in week view mode
- Tests week-specific functionality
- Validates time slot rendering

#### 4. **WithManyEvents Story**
- Tests performance with 25 events
- Validates rendering with high event density
- Tests event overflow handling

#### 5. **InteractiveDemo Story**
- Uses `alert()` for user feedback
- Demonstrates interactive features
- Shows event add/update/delete flows

#### 6. **MobileView Story**
- Tests responsive design on iPhone 12 viewport
- Validates mobile-specific layouts
- Ensures touch interactions work

#### 7. **AccessibilityDemo Story**
- Documents keyboard navigation
- Shows accessibility features
- Includes usage instructions in docs

## How to Use Storybook

### Running Storybook
```bash
npm run storybook
```
Starts Storybook on `http://localhost:6006`

### Building Storybook
```bash
npm run build-storybook
```
Creates a static build for deployment/sharing

## Features Enabled

### 1. **Controls Addon**
- Allows live editing of component props
- Test different prop combinations
- No code changes needed

### 2. **Actions Addon**
- Logs all event callbacks to Actions panel
- See what callbacks are triggered
- Debug event handling

### 3. **Docs Addon**
- Auto-generates documentation from stories
- Shows component API
- Includes code examples

### 4. **Interactions Addon**
- Test user interactions
- Verify event flows
- Debug interaction issues

## Benefits in This Project

1. **Isolated Development**: Develop calendar features without full app context
2. **Visual Testing**: Quickly see all calendar states
3. **Documentation**: Auto-generated docs for the calendar component
4. **Team Collaboration**: Share calendar variations with designers/PMs
5. **Edge Case Testing**: Test empty states, many events, mobile views
6. **Responsive Testing**: Test different viewport sizes easily

## Story Data

### Sample Events
- Team Standup (9:00-9:30)
- Design Review (14:00-15:30)
- Client Meeting (10:00-11:30)
- Code Review (15:00-16:00)

### Many Events (25 events)
- Generated programmatically
- Spread across 10 days
- Various colors and categories
- Tests performance and rendering

## Best Practices Used

1. **Story Organization**: Grouped under "Calendar/CalendarView"
2. **Reusable Data**: Sample events defined once, reused
3. **Meaningful Names**: Story names describe their purpose
4. **Documentation**: Accessibility story includes usage notes
5. **Edge Cases**: Empty state and many events covered
6. **Responsive**: Mobile viewport testing included

## Future Enhancements

Potential additions:
- Stories for individual sub-components (CalendarCell, EventModal, etc.)
- More edge cases (overlapping events, long event titles)
- Dark mode story
- Different date ranges
- Internationalization testing

