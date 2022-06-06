import dotenv from "dotenv";

import { Router } from "express";
import { Db } from "mongodb";
import { getTasksCol } from "./gateway/connectDb";
import { Task } from "./services/tasks.services";
export const taskRouter = Router();

export const getTasks = async () => {
  const col = await getTasksCol();
  const allTasks = await col.find({}).toArray();

  return allTasks;
};

export const createTask = async (Task: string[]) => {
  const col = await getTasksCol();
  const { insertedId } = await col.insertOne(Task);
  return insertedId;
};
