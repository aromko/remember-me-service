import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const client = await clientPromise;
  const db = client.db('myFirstDatabase');

  try {
    const currentDate = new Date().toISOString().split('T')[0];
    const remindersByCurrentDate = await db
      .collection('Reminder')
      .aggregate([
        { $match: { executionAt: currentDate } },
        { $group: { _id: '$telegramId', reminderData: { $push: '$$ROOT' } } },
      ])
      .toArray();

    if (remindersByCurrentDate.length > 0) {
      let textMessage = `Erinnerungen für ${currentDate}: %0D%0A %0D%0A`;

      remindersByCurrentDate.forEach((reminderByUser: any) => {
        reminderByUser.reminderData.forEach((data: any) => {
          textMessage += `<b>${data.name}</b> %0D%0A${data.description} %0D%0A%0D%0A`;
        });

        fetch(
          `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN}/sendMessage?parse_mode=html&chat_id=${reminderByUser._id}&text=${textMessage}`
        );

        textMessage = '';
      });
    }

    res.status(200).json('OK');
  } catch (e: any) {
    res.json({ errorMessage: `Something went wrong. ${e.code}` });
  }
}
