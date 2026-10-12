import { demoTasks } from "./src/data.js";
import { getPendingTasks } from "./src/task-service.js";

const pendingTasks = getPendingTasks(demoTasks);

console.log(
  "Невыполненные id:",
  pendingTasks.map((task) => task.id)
);

console.log("Пустой список:", getPendingTasks([]));