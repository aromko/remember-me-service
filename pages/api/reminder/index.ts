import { Db, ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { validateReminder } from './reminderValidator';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let db: Db;

  db = (global as any).__DB__;

  const tableName = 'Reminder';
  switch (req.method) {
    case 'POST':
      let bodyObject = JSON.parse(req.body);
      try {
        validateReminder(bodyObject);
        await db.collection(tableName).insertOne(bodyObject);
        res.statusCode = 200;
        res.send({ errorMessage: '' });
      } catch (e: any) {
        res.json({
          errorMessage: `Something went wrong. ${e}`,
        });
      }
      break;
    case 'GET':
      const reminders = await db.collection(tableName).find({}).toArray();
      res.statusCode = 200;
      res.send({ data: reminders });
      break;
    case 'DELETE':
      let bodyArray = JSON.parse(req.body);
      try {
        for (const data of bodyArray) {
          await db
            .collection(tableName)
            .deleteOne({ _id: new ObjectId(data._id) });
        }
        res.statusCode = 200;
        res.send({ errorMessage: '' });
      } catch (e: any) {
        res.send({
          errorMessage: `Something went wrong. Data couldn't be deleted. ${e}`,
        });
      }
      break;
  }
}
