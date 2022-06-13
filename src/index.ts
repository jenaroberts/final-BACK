import dotenv from "dotenv";
import cors from "cors";
import express, { Router } from "express";
import { Db } from "mongodb";
import { Plan } from "./services/plans.services";
import { getPlansCol, createPlan, getPlan } from "./services/plans.services";
import { credentials } from "./credentials";
import admin from "firebase-admin";

const app = express();

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const withAuthorization = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const jwt = req.headers.authorization!;
  try {
    const id = await admin.auth().verifyIdToken(jwt);
    res.locals.userId = id.uid;
  } catch {
    res.status(403).send("Unauthorized");
    return;
  }
  next();
};

app.use(express.json());
app.use(cors());

app.get("/plan", withAuthorization, async (req, res) => {
  const plan = await getPlan(res.locals.userId);
  res.send(plan);
});

app.post("/plan", withAuthorization, async (req, res) => {
  const plan = req.body;
  const id = await createPlan(
    plan.tasks,
    res.locals.userId,
    plan.habits,
    plan.takesMeds
  );
  res.status(200).send();
});

app.listen(5050, () => {
  console.log("listening on port 5050");
});

//reset at midnight function
export const reset = async () => {
  //wait until specific date and time to reset
  //returns new task form
};
