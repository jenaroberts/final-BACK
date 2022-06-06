import dotenv from "dotenv";
import cors from "cors";
import express, { Router, Express } from "express";
import { Db } from "mongodb";
import { TaskPlan } from "./services/tasks.services";

export const taskRouter = Router();

const app = express();
app.use(express.json());
app.use(cors());
app.use(taskRouter);
app.listen(3000, () => {
  console.log("listening on port 3000");
});

//reset at midnight function
export const reset = async () => {
  //wait until specific date and time to reset
  //returns new task form
};
