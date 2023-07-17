import { connectToDatabase, disconnectFromDatabase } from './utils/mongodb';

if (typeof window === 'undefined') {
  beforeAll(async () => {
    await connectToDatabase();
  });

  afterAll(async () => {
    await disconnectFromDatabase();
  });
}
