import { MongoClient } from "mongoDb";
import dotenv from "dotenv";

dotenv.config();

let _client: MongoClient;

export const getDb = async () => {
  const client = new MongoClient(process.env.MONGO_URL!);
  if (!_client) {
    _client = await client.connect();
  }
  return _client.db("neuro-adult");
};
