// --- STATE ---
let state = {
    title: "Todo Item Card",
    description: "Ensure the project is finalized before the deadline. Secure the GitHub repository URL and the production Vercel deployment link. attach both to the official submission form, and await the final review.",
    priority: "High",
    status: "Pending",
    dueDate: new Date(Date.now() - 1 * 60 * 60 * 1000), // Defaulting to 1 hour overdue for visibility
    isEditing: false,
    isExpanded: false,
    isOverdue: false
};

// --- ELEMENTS ---
const todoCardRoot = document.querySelector('.todo-card');
const todoView = document.getElementById('todo-view');
const todoEditForm = document.getElementById('todo-edit-form');

// View elements
const titleEl = document.getElementById('todo-title');
const descriptionEl = document.getElementById('todo-description');
const priorityBadge = document.getElementById('priority-badge');
const statusDisplay = document.getElementById('status-display');
const statusControl = document.getElementById('status-control');
const todoCompleteToggle = document.getElementById('todo-complete');
const dueDateDisplay = document.getElementById('due-date-display');
const timeRemainingEl = document.getElementById('time-remaining');
const overdueBadge = document.getElementById('overdue-badge');
const expandToggle = document.getElementById('expand-toggle');
const collapsibleSection = document.getElementById('collapsible-section');

// Edit elements
const editTitleInput = document.getElementById('edit-title');
const editDescriptionInput = document.getElementById('edit-description');
const editPrioritySelect = document.getElementById('edit-priority');
const editDueDateInput = document.getElementById('edit-due-date');

// Buttons
const editBtn = document.getElementById('edit-btn');
const cancelSaveBtn = document.getElementById('cancel-save');
const deleteBtn = document.getElementById('delete-btn');
const deleteModal = document.getElementById('delete-modal');
const confirmDeleteBtn = document.getElementById('confirm-delete');
const cancelDeleteBtn = document.getElementById('cancel-delete');

// --- RENDERING ---

function render() {
    // Mode toggle
    if (state.isEditing) {
        todoView.classList.add('hidden');
        todoEditForm.classList.remove('hidden');
        
        editTitleInput.value = state.title;
        editDescriptionInput.value = state.description;
        editPrioritySelect.value = state.priority;
        
        const localDate = new Date(state.dueDate.getTime() - state.dueDate.getTimezoneOffset() * 60000);
        editDueDateInput.value = localDate.toISOString().slice(0, 16);
        editTitleInput.focus();
    } else {
        todoView.classList.remove('hidden');
        todoEditForm.classList.add('hidden');
    }

    // Basic content
    titleEl.textContent = state.title;
    descriptionEl.textContent = state.description;
    statusDisplay.textContent = state.status;
    statusControl.value = state.status;
    todoCompleteToggle.checked = state.status === 'Done';

    // Priority badge & indicator
    priorityBadge.className = `badge priority-${state.priority.toLowerCase()}`;
    priorityBadge.innerHTML = `<i class="ph ${state.priority === 'High' ? 'ph-warning-circle' : state.priority === 'Medium' ? 'ph-info' : 'ph-check-circle'}"></i> ${state.priority}`;
    
    // Status & Priority Classes for Card
    const statusClass = `card-status-${state.status.toLowerCase().replace(' ', '-')}`;
    const priorityClass = `card-priority-${state.priority.toLowerCase()}`;
    
    // Time & Overdue calculation
    const now = new Date();
    const diff = state.dueDate - now;
    state.isOverdue = diff < 0 && state.status !== 'Done';

    let timeText = '';
    if (state.status === 'Done') {
        timeText = "Completed";
    } else {
        const absDiff = Math.abs(diff);
        const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60));

        if (state.isOverdue) {
            timeText = `Overdue by ${days > 0 ? days + 'd ' : ''}${hours}h ${minutes}m`;
        } else {
            timeText = `Due in ${days > 0 ? days + 'd ' : ''}${hours}h ${minutes}m`;
        }
    }

    timeRemainingEl.textContent = timeText;
    overdueBadge.classList.toggle('hidden', !state.isOverdue);
    
    // Final Card Classes
    todoCardRoot.className = `todo-card ${priorityClass} ${statusClass} ${state.isOverdue ? 'card-overdue' : ''}`;

    // Due Date
    const dateOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    dueDateDisplay.textContent = `Due ${state.dueDate.toLocaleDateString('en-US', dateOptions)}`;
    dueDateDisplay.setAttribute('datetime', state.dueDate.toISOString());

    // Expand/Collapse
    const shouldShowExpand = state.description.length > 150;
    expandToggle.classList.toggle('hidden', !shouldShowExpand);
    collapsibleSection.classList.toggle('collapsed', !state.isExpanded);
    expandToggle.textContent = state.isExpanded ? "Show less" : "Show more";
    expandToggle.setAttribute('aria-expanded', state.isExpanded);
}

// --- EVENTS ---

editBtn.addEventListener('click', () => {
    state.isEditing = true;
    render();
});

todoEditForm.addEventListener('submit', (e) => {
    e.preventDefault();
    state.title = editTitleInput.value;
    state.description = editDescriptionInput.value;
    state.priority = editPrioritySelect.value;
    state.dueDate = new Date(editDueDateInput.value);
    state.isEditing = false;
    render();
    editBtn.focus();
});

cancelSaveBtn.addEventListener('click', () => {
    state.isEditing = false;
    render();
    editBtn.focus();
});

statusControl.addEventListener('change', (e) => {
    state.status = e.target.value;
    render();
});

todoCompleteToggle.addEventListener('change', (e) => {
    state.status = e.target.checked ? 'Done' : 'Pending';
    render();
});

expandToggle.addEventListener('click', () => {
    state.isExpanded = !state.isExpanded;
    render();
});

deleteBtn.addEventListener('click', () => deleteModal.showModal());
cancelDeleteBtn.addEventListener('click', () => deleteModal.close());
confirmDeleteBtn.addEventListener('click', () => {
    alert('Item deleted');
    deleteModal.close();
});

// Periodic update (30 seconds)
setInterval(render, 30000);

// Initial render
render();