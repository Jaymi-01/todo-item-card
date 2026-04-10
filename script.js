// Configuration: Due date offset (e.g., 3 days from now)
const offset = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds
const dueDate = new Date(Date.now() + offset);

// Elements
const dueDateEl = document.querySelector('[data-testid="test-todo-due-date"]');
const timeRemainingEl = document.getElementById('time-remaining');
const todoCheckbox = document.getElementById('todo-complete');
const todoCard = document.querySelector('.todo-card');
const statusDisplay = document.getElementById('status-display');
const editBtn = document.querySelector('[data-testid="test-todo-edit-button"]');
const deleteBtn = document.querySelector('[data-testid="test-todo-delete-button"]');

/**
 * Formats the due date nicely (e.g., "Due Mar 1, 2026")
 * and updates the datetime attribute.
 */
function updateDueDateDisplay() {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = dueDate.toLocaleDateString('en-US', options);
    dueDateEl.textContent = `Due ${formattedDate}`;
    dueDateEl.setAttribute('datetime', dueDate.toISOString());
}

/**
 * Calculates and returns a friendly time remaining string
 */
function updateTimeRemaining() {
    const now = new Date();
    const diff = dueDate - now;
    
    let text = '';
    
    if (diff <= 0) {
        const hoursOverdue = Math.abs(Math.floor(diff / (1000 * 60 * 60)));
        if (hoursOverdue >= 1) {
            text = `Overdue by ${hoursOverdue} hours`;
        } else {
            text = 'Overdue!';
        }
    } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        if (days > 1) {
            text = `Due in ${days} days`;
        } else if (days === 1) {
            text = 'Due tomorrow';
        } else if (hours >= 1) {
            text = `Due in ${hours} hours`;
        } else if (minutes >= 1) {
            text = `Due in ${minutes} minutes`;
        } else {
            text = 'Due now!';
        }
    }
    
    timeRemainingEl.textContent = text;
}

// Initial updates
updateDueDateDisplay();
updateTimeRemaining();

// Update every minute
setInterval(updateTimeRemaining, 60000);

// Toggle Complete
todoCheckbox.addEventListener('change', (e) => {
    if (e.target.checked) {
        todoCard.classList.add('completed');
        statusDisplay.textContent = 'Done';
        statusDisplay.classList.remove('status-pending');
        statusDisplay.classList.add('status-done');
    } else {
        todoCard.classList.remove('completed');
        statusDisplay.textContent = 'Pending';
        statusDisplay.classList.remove('status-done');
        statusDisplay.classList.add('status-pending');
    }
});

// Edit/Delete Actions
editBtn.addEventListener('click', () => {
    console.log('edit clicked');
});

deleteBtn.addEventListener('click', () => {
    alert('Delete clicked');
});