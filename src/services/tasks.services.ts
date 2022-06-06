import { getDb } from "../gateway/connectDb";

export interface TaskPlan {
  m: string[];
  t: string[];
  w: string[];
  th: string[];
  f: string[];
  sa: string[];
  su: string[];
  userId: string;
  habits: string[];
  createdAt: Date;
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

// take in a string array of tasks, a user id, and a string array of habits
// loop through the tasks and assign them a day m,t,w,etc.

// export const createPlan = async (tasks: string[]) => {
//   // const col = await getTasksCol();
//   // const { insertedId } = await col.insertOne(task);
//   // return insertedId;
// };



// so your function is going to determine which tasks are done on which day at random
//you have to figure out how to take an array of strings or tasks and turn it into an object where each day has some/none of the tasks

export const createPlan = async (tasks: string[], userId: string, habits: string[] ) => {
const userTasks = await getTasks(userId)
const { insertedId } = await userTasks.insertOne(tasks: "id") 
const results = 

return taskResults 

}


const col = getCol();
  const snapshot = await col.orderBy("CreatedAt").get();
  return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));