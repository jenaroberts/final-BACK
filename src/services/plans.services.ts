import { getDb } from "../gateway/connectDb";
import { shuffle } from "../util";

export interface Task {
  name: string;
  checked: boolean;
}
export interface PlanHabit {
  name: string;
  m: boolean;
  t: boolean;
  w: boolean;
  th: boolean;
  f: boolean;
  sa: boolean;
  su: boolean;
}
export interface Plan {
  m: Task[];
  t: Task[];
  w: Task[];
  th: Task[];
  f: Task[];
  sa: Task[];
  su: Task[];
  userId: string;
  habits: PlanHabit[];
  createdAt: Date;
  takesMeds: boolean;
  isActive: boolean;
}

export const getPlansCol = async () => {
  const db = await getDb();
  return db.collection<Plan>("plans");
};

export const getPlan = async (userId: string) => {
  const col = await getPlansCol();
  const plans = await col
    .find({ userId, isActive: true })
    .sort({ createdAt: -1 })
    .toArray();

  console.log(plans);

  return plans[0];
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
  const col = await getPlansCol();

  const plan: Plan = {
    m: [],
    t: [],
    w: [],
    th: [],
    f: [],
    sa: [],
    su: [],
    userId,
    habits: habits.map((habit) => {
      return {
        name: habit,
        m: false,
        t: false,
        w: false,
        th: false,
        f: false,
        sa: false,
        su: false,
      };
    }),
    createdAt: new Date(),
    takesMeds,
    isActive: true,
  };
  const days = shuffle([
    "m",
    "t",
    "w",
    "th",
    "f",
    "sa",
    "su",
  ]) as (keyof Plan)[];
  const shuffled = shuffle(tasks);
  let i = 0;
  for (const task of shuffled) {
    const day = days[i];
    console.log(plan);
    console.log(day);
    (plan[day] as Task[]).push({ name: task, checked: false });
    if (i >= days.length - 1) {
      i = 0;
    } else {
      i++;
    }
  }
  await col.insertOne(plan);
};

export const checkPlanHabit = async (
  userId: string,
  day: string,
  habitName: string
) => {
  const plan = await getPlan(userId);
  const col = await getPlansCol();
  const habit = plan.habits.find((habit) => habit.name === habitName)!;
  (habit as any)[day] = true;
  await col.updateOne({ _id: plan._id }, plan);
};
