import { getTaskStats } from "./task-service.js";

// Здесь создаётся DOM, но не изменяется состояние приложения.
// Контракт карточки, селекторы и тексты описаны в методичке.
export function createTaskElement(task) {
    const card = document.createElement("li");
    card.className = "task-card";
    card.dataset.taskId = task.id;

    if (task.completed === true) {
        card.classList.add("is-completed");
    }

    const title = document.createElement("h3");
    title.className = "task-title";
    title.textContent = task.title;

    const status = document.createElement("p");
    status.className = "task-status";

    if (task.completed === true) {
        status.textContent = "Выполнена";
    } else {
        status.textContent = "В работе";
    }

    const priority = document.createElement("p");
    priority.className = "task-priority";

    if (task.priority === "low") {
        priority.textContent = "Низкий";
    } else if (task.priority === "medium") {
        priority.textContent = "Средний";
    } else {
        priority.textContent = "Высокий";
    }

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const toggleButton = document.createElement("button");
    toggleButton.type = "button";
    toggleButton.dataset.action = "toggle";
    toggleButton.setAttribute("aria-pressed", String(task.completed));

    const toggleLabel = document.createElement("span");
    toggleLabel.className = "action-label";
    toggleLabel.textContent = "Выполнена";
    toggleButton.append(toggleLabel);

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.dataset.action = "delete";

    const deleteLabel = document.createElement("span");
    deleteLabel.className = "action-label";
    deleteLabel.textContent = "Удалить";
    deleteButton.append(deleteLabel);

    actions.append(toggleButton, deleteButton);
    card.append(title, status, priority, actions);

    return card;
}

export function renderTaskList(listElement, tasks) {
    listElement.replaceChildren();

    for (const task of tasks) {
        const card = createTaskElement(task);
        listElement.append(card);
    }
}

export function renderSummary(summaryElement, tasks, visibleCount) {
    const { total, completed, pending, progress } = getTaskStats(tasks);

    summaryElement.querySelector('[data-stat="total"]').textContent = total;
    summaryElement.querySelector('[data-stat="completed"]').textContent = completed;
    summaryElement.querySelector('[data-stat="pending"]').textContent = pending;
    summaryElement.querySelector('[data-stat="progress"]').textContent =
        progress.toFixed(1) + "%";
    summaryElement.querySelector('[data-stat="visible"]').textContent = visibleCount;
}

export function renderEmptyState(messageElement, total, visibleCount) {
    if (total === 0) {
        messageElement.textContent = "Список задач пуст.";
        messageElement.hidden = false;
    } else if (visibleCount === 0) {
        messageElement.textContent = "Нет задач по выбранному фильтру.";
        messageElement.hidden = false;
    } else {
        messageElement.textContent = "";
        messageElement.hidden = true;
    }
}