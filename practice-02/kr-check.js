import { demoTasks } from "./src/data.js";
import {
  findTaskById,
  setTaskCompleted,
} from "./src/task-service.js";

const result = setTaskCompleted(demoTasks, 4, true);

console.log("Успех:", result.ok);
console.log(
  "Исходный статус:",
  findTaskById(demoTasks, 4).completed
);

if (result.ok) {
  console.log(
    "Новый статус:",
    findTaskById(result.tasks, 4).completed
  );

  console.log("Новый массив:", result.tasks !== demoTasks);

  console.log(
    "Новый объект:",
    findTaskById(result.tasks, 4) !== findTaskById(demoTasks, 4)
  );
}

const refused = setTaskCompleted(demoTasks, 777, true);

console.log("Результат для 777:", refused);
console.log(
  "Исходный статус после отказа:",
  findTaskById(demoTasks, 4).completed
);