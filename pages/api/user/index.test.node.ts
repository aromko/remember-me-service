import { createMocks } from 'node-mocks-http';
import handler from './index';

beforeEach(async () => {
  await insertUserDummyData();
});

afterEach(async () => {
  await clearUserDummyData();
});

describe('/api/user', () => {
  test('returns a list of users', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getData()).toEqual({
      data: [
        { _id: 10, name: 'john_doe', telegramId: 1234567 },
        { _id: 100, name: 'jane_foster', telegramId: 987654 },
      ],
    });
  });

  test('adds a user to db', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: Buffer.from(
        JSON.stringify({
          name: 'theRock',
          userTelegramId: 3455678,
        })
      ),
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({ errorMessage: '' });

    const usersCollection = (global as any).__DB__.collection('User');
    const users = await usersCollection.find({}).toArray();

    expect(users).toHaveLength(3);
  });
});

async function insertUserDummyData() {
  const usersCollection = (global as any).__DB__.collection('User');
  await usersCollection.insertMany([
    { _id: 10, name: 'john_doe', telegramId: 1234567 },
    { _id: 100, name: 'jane_foster', telegramId: 987654 },
  ]);
}
async function clearUserDummyData() {
  const usersCollection = (global as any).__DB__.collection('User');
  await usersCollection.deleteMany({});
}
