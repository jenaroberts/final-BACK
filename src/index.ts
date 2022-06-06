import dotenv from "dotenv";
import cors from "cors";
import express, { Router } from "express";
import { Db } from "mongodb";
import { TaskPlan } from "./services/tasks.services";
import { getTasksCol, createPlan, getTasks } from "./services/tasks.services";
export const taskRouter = Router();

const app = express();
app.use(express.json());
app.use(cors());
app.use(taskRouter);
app.listen(3000, () => {
  console.log("listening on port 3000");
});

taskRouter.post("/task", async (req, res) => {
  const task = req.body;
  const id = await createPlan();
});

//reset at midnight function
export const reset = async () => {
  //wait until specific date and time to reset
  //returns new task form
};
