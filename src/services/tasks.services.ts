import { getDb } from "../gateway/connectDb";
import { shuffle } from "../util";

export interface Task {
  name: string;
  checked: boolean;
}

export interface TaskPlan {
  m: Task[];
  t: Task[];
  w: Task[];
  th: Task[];
  f: Task[];
  sa: Task[];
  su: Task[];
  userId: string;
  habits: string[];
  createdAt: Date;
  takesMeds: boolean;
}

export const getTasksCol = async () => {
  const db = await getDb();
  return db.collection<TaskPlan>("tasks");
};

export const getTasks = async (userId: string) => {
  const col = await getTasksCol();
  const allTasks = await col.find({ userId }).toArray();

  return allTasks;
};

//your function is going to determine which tasks are done on which day at random
//you have to figure out how to take an array of strings or tasks and turn it into an object where each day has some/none of the tasks
// take in a string array of tasks, a user id, and a string array of habits
// loop through the tasks and assign them a day m,t,w,etc.

export const createPlan = async (
  tasks: string[],
  userId: string,
  habits: string[],
  takesMeds: boolean
) => {
  const plan: TaskPlan = {
    m: [],
    t: [],
    w: [],
    th: [],
    f: [],
    sa: [],
    su: [],
    userId,
    habits,
    createdAt: new Date(),
    takesMeds,
  };
  const days = shuffle([
    "m",
    "t",
    "w",
    "th",
    "f",
    "sa",
    "su",
  ]) as (keyof TaskPlan)[];
  const shuffled = shuffle(tasks);
  let i = 0;
  for (const task of tasks) {
    const day = days[i];
    (plan[day] as Task[]).push({ name: task, checked: false });
    if (i >= days.length) {
      i = 0;
    } else {
      i++;
    }
  }
  return plan;
};
