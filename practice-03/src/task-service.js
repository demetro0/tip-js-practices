export function createTask(id, title, priority = "medium") {
    if (!Number.isSafeInteger(id) || id <= 0) {
        return {
            ok: false,
            error: "Номер задачи должен быть положительным безопасным целым числом."
        };
    }

    if (typeof title !== "string") {
        return {
            ok: false,
            error: "Название задачи должно быть строкой."
        };
    }

    const cleanTitle = title.trim();

    if (cleanTitle.length < 1 || cleanTitle.length > 100) {
        return {
            ok: false,
            error: "Название должно содержать от 1 до 100 символов."
        };
    }

    if (
        priority !== "low" &&
        priority !== "medium" &&
        priority !== "high"
    ) {
        return {
            ok: false,
            error: "Приоритет должен быть low, medium или high."
        };
    }

    return {
        ok: true,
        task: {
            id: id,
            title: cleanTitle,
            completed: false,
            priority: priority
        }
    };
}

export function findTaskById(tasks, id) {
    return tasks.find((task) => task.id === id);
}

export function getPendingTasks(tasks) {
    return tasks.filter((task) => task.completed === false);
}

export function getTaskTitles(tasks) {
    return tasks.map((task) => task.title);
}

export function getTaskStats(tasks) {
    const total = tasks.length;
    let completed = 0;

    for (const task of tasks) {
        if (task.completed === true) {
            completed++;
        }
    }

    const pending = total - completed;
    let progress = 0;

    if (total > 0) {
        progress = completed / total * 100;
    }

    return {
        total: total,
        completed: completed,
        pending: pending,
        progress: progress
    };
}

export function addTask(tasks, id, title, priority = "medium") {
    const result = createTask(id, title, priority);

    if (result.ok === false) {
        return result;
    }

    if (findTaskById(tasks, id) !== undefined) {
        return {
            ok: false,
            error: "Задача с таким номером уже существует."
        };
    }

    return {
        ok: true,
        tasks: [...tasks, result.task]
    };
}

export function setTaskCompleted(tasks, id, completed) {
    if (!Number.isSafeInteger(id) || id <= 0) {
        return {
            ok: false,
            error: "Номер задачи должен быть положительным безопасным целым числом."
        };
    }

    if (typeof completed !== "boolean") {
        return {
            ok: false,
            error: "Статус должен быть true или false."
        };
    }

    if (findTaskById(tasks, id) === undefined) {
        return {
            ok: false,
            error: "Задача не найдена."
        };
    }

    const newTasks = tasks.map((task) => {
        if (task.id === id) {
            return { ...task, completed: completed };
        }

        return task;
    });

    return {
        ok: true,
        tasks: newTasks
    };
}

export function renameTask(tasks, id, title) {
    const result = createTask(id, title);

    if (result.ok === false) {
        return result;
    }

    if (findTaskById(tasks, id) === undefined) {
        return {
            ok: false,
            error: "Задача не найдена."
        };
    }

    const newTasks = tasks.map((task) => {
        if (task.id === id) {
            return { ...task, title: result.task.title };
        }

        return task;
    });

    return {
        ok: true,
        tasks: newTasks
    };
}

export function removeTask(tasks, id) {
    if (!Number.isSafeInteger(id) || id <= 0) {
        return {
            ok: false,
            error: "Номер задачи должен быть положительным безопасным целым числом."
        };
    }

    if (findTaskById(tasks, id) === undefined) {
        return {
            ok: false,
            error: "Задача не найдена."
        };
    }

    return {
        ok: true,
        tasks: tasks.filter((task) => task.id !== id)
    };
}