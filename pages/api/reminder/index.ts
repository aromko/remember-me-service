import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db('myFirstDatabase');
  const tableName = 'Reminder';
  switch (req.method) {
    case 'POST':
      let bodyObject = JSON.parse(req.body);
      try {
        await db.collection(tableName).insertOne(bodyObject);
        res.json({ errorMessage: '' });
      } catch (e: any) {
        res.json({
          errorMessage: `Something went wrong. ErrorCode from MongoDB ${e.code}`,
        });
      }
      break;
    case 'GET':
      const reminders = await db.collection(tableName).find({}).toArray();
      res.json({ status: 200, data: reminders });
      break;
    case 'DELETE':
      let bodyArray = JSON.parse(req.body);
      try {
        for (const data of bodyArray) {
          await db
            .collection(tableName)
            .deleteOne({ _id: new ObjectId(data._id) });
        }
        res.json({ errorMessage: '' });
      } catch (e: any) {
        res.json({
          errorMessage: `Something went wrong. ErrorCode from MongoDB ${e.message}`,
        });
      }
      break;
  }
}
