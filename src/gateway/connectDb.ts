import { MongoClient } from "mongoDb";
import dotenv from "dotenv";

dotenv.config();

export const getDb = async () => {
  const client = new MongoClient(process.env.MONGO_URL!);
  await client.connect();

  return client.db();
};

//connect to the db
//connect to FB
