"use strict";

const totalTasks = 20;
const completedTasks = 11;
const dailyLimit = 6;

if (
    !Number.isInteger(totalTasks) ||
    totalTasks < 0 ||
    totalTasks > 1000
) {
    console.log("Ошибка: общее количество задач должно быть целым числом от 0 до 1000.");
} else if (
    !Number.isInteger(completedTasks) ||
    completedTasks < 0 ||
    completedTasks > totalTasks
) {
    console.log("Ошибка: количество выполненных задач должно быть целым числом от 0 до общего количества задач.");
} else if (
    !Number.isInteger(dailyLimit) ||
    dailyLimit < 1 ||
    dailyLimit > 1000
) {
    console.log("Ошибка: дневная норма должна быть целым числом от 1 до 1000.");
} else {
    let remainingTasks = totalTasks - completedTasks;
    let calendarDays = 0;
    let workingDays = 0;
    let weekDay = 1;

    console.log("Осталось задач: " + remainingTasks);

    if (remainingTasks === 0) {
        console.log("Все задачи уже выполнены.");
    }

    while (remainingTasks > 0) {
        calendarDays++;

        if (weekDay === 6 || weekDay === 7) {
            console.log("День " + calendarDays + ": выходной.");
        } else {
            workingDays++;

            let tasksToday = dailyLimit;

            if (tasksToday > remainingTasks) {
                tasksToday = remainingTasks;
            }

            remainingTasks = remainingTasks - tasksToday;

            console.log(
                "День " + calendarDays +
                ": выполнено " + tasksToday +
                ", осталось " + remainingTasks
            );
        }

        weekDay++;

        if (weekDay > 7) {
            weekDay = 1;
        }
    }

    console.log("Рабочих дней с выполнением задач: " + workingDays);
    console.log("Календарных дней до завершения: " + calendarDays);
}