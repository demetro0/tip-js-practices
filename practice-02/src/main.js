import { demoTasks, variantNumber, variantTasks } from "./data.js";

import {
    findTaskById,
    getPendingTasks,
    getTaskTitles,
    getTaskStats,
    addTask,
    setTaskCompleted,
    renameTask,
    removeTask
} from "./task-service.js";

function showStats(tasks) {
    const { total, completed, pending, progress } = getTaskStats(tasks);

    console.log("Всего:", total);
    console.log("Выполнено:", completed);
    console.log("Осталось:", pending);

    if (total === 0) {
        console.log("Задач пока нет");
    } else {
        console.log("Прогресс:", progress.toFixed(1) + "%");
    }
}

function updateTasks(tasks, result) {
    if (result.ok === true) {
        return result.tasks;
    }

    console.log("Ошибка:", result.error);
    return tasks;
}

console.log("Общий сценарий");

let currentTasks = demoTasks;

console.table(currentTasks);
console.log("Задача 4:", findTaskById(currentTasks, 4));
console.log("Названия:", getTaskTitles(currentTasks));
showStats(currentTasks);

console.log("\nДобавление задачи 20");
currentTasks = updateTasks(
    currentTasks,
    addTask(currentTasks, 20, "Добавить проверку", "high")
);
showStats(currentTasks);

console.log("\nВыполнение задачи 4");
currentTasks = updateTasks(
    currentTasks,
    setTaskCompleted(currentTasks, 4, true)
);
showStats(currentTasks);

console.log("\nПереименование задачи 10");
currentTasks = updateTasks(
    currentTasks,
    renameTask(currentTasks, 10, "Подготовить инструкцию запуска")
);
showStats(currentTasks);

console.log("\nУдаление задачи 7");
currentTasks = updateTasks(
    currentTasks,
    removeTask(currentTasks, 7)
);
showStats(currentTasks);

console.log("\nПовторное добавление задачи 20");
const beforeError = currentTasks;

currentTasks = updateTasks(
    currentTasks,
    addTask(currentTasks, 20, "Повторная задача")
);

console.log("Состояние сохранено:", currentTasks === beforeError);
console.table(currentTasks);
showStats(currentTasks);
console.log("Невыполненные задачи:", getPendingTasks(currentTasks));

console.log("\nИсходный demoTasks");
console.table(demoTasks);
showStats(demoTasks);

console.log("\nИндивидуальный вариант:", variantNumber);

let currentVariant = variantTasks;

console.table(currentVariant);
showStats(currentVariant);

console.log("\nДобавление задачи 80");
currentVariant = updateTasks(
    currentVariant,
    addTask(currentVariant, 80, "Провести семинар", "high")
);
showStats(currentVariant);

console.log("\nВыполнение задачи 11");
currentVariant = updateTasks(
    currentVariant,
    setTaskCompleted(currentVariant, 11, true)
);
showStats(currentVariant);

console.log("\nПереименование задачи 23");
currentVariant = updateTasks(
    currentVariant,
    renameTask(currentVariant, 23, "Подобрать материалы для семинара")
);
showStats(currentVariant);

console.log("\nУдаление задачи 37");
currentVariant = updateTasks(
    currentVariant,
    removeTask(currentVariant, 37)
);
showStats(currentVariant);

console.log("\nПовторное добавление задачи 80");
const variantBeforeError = currentVariant;

currentVariant = updateTasks(
    currentVariant,
    addTask(currentVariant, 80, "Повторная задача", "high")
);

console.log("Состояние сохранено:", currentVariant === variantBeforeError);
console.table(currentVariant);
showStats(currentVariant);

console.log("\nИсходный variantTasks");
console.table(variantTasks);
showStats(variantTasks);

console.log("\nСобственная проверка 1: добавление после удаления");
console.log("Ожидается: номера [1, 4, 10, 7], новое название задачи 7.");

let firstCheck = updateTasks(demoTasks, removeTask(demoTasks, 7));
firstCheck = updateTasks(
    firstCheck,
    addTask(firstCheck, 7, "Повторно добавленная задача", "high")
);

console.log("Номера:", firstCheck.map((task) => task.id));
console.log("Новая задача:", findTaskById(firstCheck, 7));
console.log("Исходная задача:", findTaskById(demoTasks, 7));

console.log("\nСобственная проверка 2: первая и последняя задачи");
console.log("Ожидается: выполнено 0, прогресс 0%.");

let secondCheck = updateTasks(
    demoTasks,
    setTaskCompleted(demoTasks, 1, false)
);
secondCheck = updateTasks(
    secondCheck,
    setTaskCompleted(secondCheck, 10, false)
);

showStats(secondCheck);
console.log("Исходная сводка:", getTaskStats(demoTasks));

console.log("\nСобственная проверка 3: название и статус");
console.log("Ожидается: новое название, completed true, priority high.");

let thirdCheck = updateTasks(
    demoTasks,
    renameTask(demoTasks, 4, "Подготовить итоговую модель")
);
thirdCheck = updateTasks(
    thirdCheck,
    setTaskCompleted(thirdCheck, 4, true)
);

console.log("Новая задача:", findTaskById(thirdCheck, 4));
console.log("Исходная задача:", findTaskById(demoTasks, 4));