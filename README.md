# Modern Todo Item Card

A highly interactive, accessible, and stateful Todo/Task Card component built with vanilla HTML, CSS, and JavaScript. This project demonstrates modern UI/UX patterns, state-driven rendering, and strict accessibility standards.

## 🚀 Features

### Core Functionality
-   **State-Driven UI**: The entire card is managed by a centralized JavaScript state object, ensuring a single source of truth for all data and UI views.
-   **Inline Editing**: Seamlessly toggle between "View" and "Edit" modes. Modify the title, description, priority, and due date directly within the card.
-   **Smart Status Management**:
    -   Three statuses: `Pending`, `In Progress`, and `Done`.
    -   Two-way sync between the status dropdown and the completion checkbox.
    -   Visual indicators (strikethrough, color shifts) for each state.
-   **Priority Indicators**: Dynamic left-border accent and badges that change color (Green, Amber, Red) based on the task's priority level.

### Advanced UX & Design
-   **Granular Time Tracking**: Real-time updates (every 30s) showing "Due in X days/hours/minutes".
-   **Overdue Handling**: Automatic detection of past-due tasks with a prominent red visual accent and "Overdue" indicator.
-   **Collapsible Content**: Long descriptions are automatically truncated with a "Show more" toggle to maintain a clean layout.
-   **Responsive Design**: Fluid layout that adapts perfectly from 320px mobile devices to 1200px desktops.

### Accessibility (A11y)
-   **Semantic HTML**: Uses `<article>`, `<header>`, `<main>`, `<footer>`, `<time>`, and `<button>` for proper document structure.
-   **Focus Management**: Focus is trapped within the edit form and intelligently returned to the edit button upon closing.
-   **ARIA Support**: Implements `aria-expanded`, `aria-live="polite"`, `aria-controls`, and `aria-label` for screen reader compatibility.
-   **Keyboard Navigable**: Fully functional using only the `Tab` and `Enter/Space` keys.

## 🛠️ Technical Stack
-   **HTML5**: Semantic structure.
-   **CSS3**: Custom properties (variables), Flexbox, Grid, and CSS transitions.
-   **Vanilla JavaScript**: State management and DOM manipulation (no frameworks).
-   **Phosphor Icons**: High-quality, consistent iconography.

## 🧪 Automated Testing
The component is built with specific `data-testid` attributes to support automated testing suites:
-   `test-todo-card`: Root container
-   `test-todo-title`: Task title
-   `test-todo-description`: Task description
-   `test-todo-priority-indicator`: Visual priority accent
-   `test-todo-edit-form`: The inline editing container
-   `test-todo-time-remaining`: Dynamic timer
-   `test-todo-overdue-indicator`: Overdue badge

## 📂 Project Structure
```text
├── index.html   # Main structure & Modals
├── style.css    # Responsive design & State styles
├── script.js    # State management & Logic
└── README.md    # Documentation
```

## 📝 Usage
Simply open `index.html` in any modern web browser to interact with the component.
-   Click **Edit** to modify the task details.
-   Toggle the **Checkbox** or **Status Dropdown** to mark as complete.
-   Click **Delete** to see the custom confirmation modal.
