import { MongoClient } from 'mongodb';
import * as process from 'process';

export async function connectToDatabase(
  mongoUri: string = process.env.MONGODB_URI as string
) {
  const client = new MongoClient(mongoUri);

  try {
    await client.connect();

    return client.db();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}
