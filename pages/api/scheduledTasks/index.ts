import { NextApiRequest, NextApiResponse } from 'next';
import { Db, Document } from 'mongodb';
import { setResponse } from '../../../utils/responseUtils';
import { connectAndGetDb } from '../../../utils/mongodb';

const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;

async function getRemindersByDate(db: Db, currentDate: string) {
  return db
    .collection('Reminder')
    .aggregate([
      { $match: { executionAt: currentDate } },
      { $group: { _id: '$telegramId', reminderData: { $push: '$$ROOT' } } },
    ])
    .toArray();
}

async function sendTelegramMessage(chatId: string, text: string) {
  const url: string = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?parse_mode=html&chat_id=${chatId}&text=${text}`;
  await fetch(url);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const db = await connectAndGetDb();

  const currentDate: string = new Date().toISOString().split('T')[0];

  try {
    switch (req.method) {
      case 'GET':
        const remindersByCurrentDate: Document[] = await getRemindersByDate(
          db,
          currentDate
        );

        if (remindersByCurrentDate.length > 0) {
          for (const reminderByUser of remindersByCurrentDate) {
            let textMessage = `Reminders for ${currentDate}: %0D%0A %0D%0A`;

            for (const data of reminderByUser.reminderData) {
              textMessage += `<b>${data.name}</b> %0D%0A${data.description} %0D%0A%0D%0A`;
            }

            await sendTelegramMessage(reminderByUser._id, textMessage);
          }
        }

        await setResponse(res, null, 'OK');
        break;

      default:
        await setResponse(res, 'Method not allowed', null, 405);
    }
  } catch (e: any) {
    await setResponse(res, `Something went wrong. ${e}`, null);
  }
}
