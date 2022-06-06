import { MongoClient } from "mongoDb";

export const getDb = async () => {
  const client = new MongoClient(process.env.MONGO_URL!);
  await client.connect();

  return client.db();
};
