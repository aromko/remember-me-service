import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';

if (typeof window === 'undefined') {
  let mongoServer;
  let db;
  let client;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    client = new MongoClient(mongoUri);
    await client.connect();
    db = client.db();
    global.__DB__ = db;
  });

  afterAll(async () => {
    await mongoServer.stop();
    await client.close();
  });
}
