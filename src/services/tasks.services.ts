import { getDb } from "../gateway/connectDb";
import { getTasksCol } from "../gateway/connectDb";

export interface Task {
  M: string[];
  T: string[];
  W: string[];
  Th: string[];
  F: string[];
  Sa: string[];
  Su: string[];
  UserId: string;
  Habits: string[];
  CreatedAt: Date;
}

//  export const getTasksCol =async () => {
//      const db = connectDb()
//      return db.collection("Tasks") as CollectionReference<Tasks>;

//  } need to connect to FB and import the collection reference
