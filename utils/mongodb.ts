import { Db, MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;
let client: MongoClient;

export async function connectToDatabase() {
  let db;

  if (process.env.NODE_ENV === 'test') {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    client = new MongoClient(mongoUri);
  } else {
    console.log('XXXX' + process.env.MONGODB_URI);
    client = new MongoClient(process.env.MONGODB_URI as string);
  }

  try {
    await client.connect();
    db = client.db();
    (global as any).__DB__ = db as Db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export async function disconnectFromDatabase() {
  await mongoServer.stop();
  await client.close();
}
