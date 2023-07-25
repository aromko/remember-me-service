import fetchMock from 'jest-fetch-mock';
import { clearDummyData, insertDummyData } from '../../../utils/testHelper';
import { createMocks } from 'node-mocks-http';
import handler from './index';
import { Db } from 'mongodb';

const userDummyData = [
  { _id: 10, name: 'john_doe', telegramId: 1234567 },
  { _id: 100, name: 'jane_foster', telegramId: 987654 },
];

const currentDate = new Date().toISOString().split('T')[0];

const reminderDummyData = [
  {
    _id: '64ad7401073e5e5c3853f7c6',
    name: 'Writing more tests',
    description: 'for better coverage',
    executionAt: currentDate,
    messageType: 'TELEGRAM',
    telegramId: '1234567',
    userName: 'john_doe',
  },
];

beforeEach(async () => {
  fetchMock.enableMocks();
  await insertDummyData('User', userDummyData);
  await insertDummyData('Reminder', reminderDummyData);
});

afterEach(async () => {
  await clearDummyData('User');
  await clearDummyData('Reminder');
  fetchMock.mockClear();
});

describe('/api/schedulesTasks', () => {
  test('send reminders to users', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    fetchMock.mockResponseOnce(
      JSON.stringify({
        ok: true,
      })
    );

    await handler(req, res);

    expect(fetchMock.mock.calls.length).toEqual(1);
    expect(fetchMock.mock.calls[0][0]).toBe(
      'https://api.telegram.org/botundefined/sendMessage?parse_mode=html&chat_id=1234567&text=Reminders ' +
        `for ${currentDate}: %0D%0A %0D%0A<b>Writing more tests</b> %0D%0Afor better coverage %0D%0A%0D%0A`
    );
    expect(res._getStatusCode()).toBe(200);
    expect(res._getData()).toEqual({
      data: 'OK',
      errorMessage: null,
    });
  });

  test('send reminders to users should fail', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    const mockDb: Partial<Db> = {
      collection: jest.fn(() => {
        throw new Error('MongoDB error');
      }),
    };

    const originalGlobalDB = (global as any).__DB__;
    (global as any).__DB__ = mockDb as Db;

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getData()).toEqual({
      data: null,
      errorMessage: 'Something went wrong. Error: MongoDB error',
    });
    (global as any).__DB__ = originalGlobalDB;
  });
});
