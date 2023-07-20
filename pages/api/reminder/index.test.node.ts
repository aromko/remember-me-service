import { createMocks } from 'node-mocks-http';
import handler from './index';
import { clearDummyData, insertDummyData } from '../../../utils/testHelper';

const reminderDummyData = [
  {
    _id: '64ad7401073e5e5c3853f7c6',
    name: 'Writing more tests',
    description: 'for better coverage',
    executionAt: '2023-07-12',
    messageType: 'TELEGRAM',
    telegramId: '12345678',
    userName: 'aromko',
  },
];

beforeEach(async () => {
  await insertDummyData('Reminder', reminderDummyData);
});

afterEach(async () => {
  await clearDummyData('Reminder');
});

describe('/api/reminder', () => {
  test('returns a list of reminders', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getData()).toEqual({
      data: reminderDummyData,
      errorMessage: null,
    });
  });

  test('adds a reminder to db', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: Buffer.from(
        JSON.stringify({
          _id: '64ad7401073e5e5c3777f7c7',
          name: 'Hacker session',
          description: 'with friends',
          executionAt: '2023-10-08',
          messageType: 'TELEGRAM',
          telegramId: '12345678',
          userName: 'aromko',
        })
      ),
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getData()).toEqual({ data: null, errorMessage: '' });

    const reminderCollection = (global as any).__DB__.collection('Reminder');
    const reminders = await reminderCollection.find({}).toArray();

    expect(reminders).toHaveLength(2);
  });

  test('adding a reminder should fail', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: Buffer.from(
        JSON.stringify({
          _id: '64ad7401087e5e5c3853f7c6',
          name: 'Missing field',
          description: 'telegram Id',
          executionAt: '2023-07-12',
          messageType: 'TELEGRAM',
          userName: 'aromko',
        })
      ),
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getData()).toEqual({
      data: null,
      errorMessage:
        'Something went wrong. Error: Name, description, executionAt, messageType and telegramId are required fields.',
    });

    const reminderCollection = (global as any).__DB__.collection('Reminder');
    const reminders = await reminderCollection.find({}).toArray();

    expect(reminders).toHaveLength(1);
  });

  test('deleted a reminder from db', async () => {
    const { req, res } = createMocks({
      method: 'DELETE',
      body: Buffer.from(
        JSON.stringify([
          {
            _id: '64ad7401073e5e5c3777f7c7',
          },
        ])
      ),
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getData()).toEqual({ data: null, errorMessage: '' });

    const reminderCollection = (global as any).__DB__.collection('Reminder');
    const reminders = await reminderCollection.find({}).toArray();

    expect(reminders).toHaveLength(1);
  });

  test('deleting a reminder should fail', async () => {
    const { req, res } = createMocks({
      method: 'DELETE',
      body: Buffer.from(
        JSON.stringify({
          _id: '64ad7401073e5e5c3777f7c7',
        })
      ),
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getData()).toEqual({
      data: null,
      errorMessage:
        "Something went wrong. Data couldn't be deleted. TypeError: bodyArray is not iterable",
    });

    const reminderCollection = (global as any).__DB__.collection('Reminder');
    const reminders = await reminderCollection.find({}).toArray();

    expect(reminders).toHaveLength(1);
  });
});
