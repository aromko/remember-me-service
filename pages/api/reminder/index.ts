import { Db, ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { validateReminder } from './reminderValidator';
import { connectToDatabase } from '../../../utils/mongodb';
import { setResponse } from '../../../utils/responseUtils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let db: Db;

  if (process.env.NODE_ENV !== 'test') {
    await connectToDatabase();
  }

  db = (global as any).__DB__;

  const tableName = 'Reminder';
  switch (req.method) {
    case 'POST':
      let bodyObject = JSON.parse(req.body);
      try {
        validateReminder(bodyObject);
        await db.collection(tableName).insertOne(bodyObject);
        await setResponse(res, '', null);
      } catch (e: any) {
        await setResponse(res, `Something went wrong. ${e}`, null);
      }
      break;
    case 'GET':
      console.log(db);
      const reminders = await db.collection(tableName).find({}).toArray();
      await setResponse(res, null, reminders);
      break;
    case 'DELETE':
      let bodyArray = JSON.parse(req.body);
      try {
        for (const data of bodyArray) {
          await db
            .collection(tableName)
            .deleteOne({ _id: new ObjectId(data._id) });
        }
        await setResponse(res, '', null);
      } catch (e: any) {
        await setResponse(
          res,
          `Something went wrong. Data couldn't be deleted. ${e}`,
          null
        );
      }
      break;
  }
}
