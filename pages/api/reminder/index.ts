import { Db, ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { validateReminder } from './reminderValidator';
import { connectAndGetDb } from '../../../utils/mongodb';
import { setResponse } from '../../../utils/responseUtils';

async function handlePost(req: NextApiRequest, res: NextApiResponse, db: Db) {
  try {
    const bodyObject = JSON.parse(req.body);
    validateReminder(bodyObject);
    await db.collection('Reminder').insertOne(bodyObject);
    await setResponse(res, '', null);
  } catch (e: any) {
    await setResponse(res, `Something went wrong. ${e}`, null);
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse, db: Db) {
  try {
    const reminders = await db.collection('Reminder').find({}).toArray();
    await setResponse(res, null, reminders);
  } catch (e: any) {
    await setResponse(res, `Something went wrong. ${e}`, null);
  }
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse, db: Db) {
  try {
    const bodyArray = JSON.parse(req.body);
    for (const data of bodyArray) {
      await db
        .collection('Reminder')
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
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const db = await connectAndGetDb();
    switch (req.method) {
      case 'POST':
        await handlePost(req, res, db);
        break;
      case 'GET':
        await handleGet(req, res, db);
        break;
      case 'DELETE':
        await handleDelete(req, res, db);
        break;
      default:
        await setResponse(res, 'Method not allowed', null, 405);
        break;
    }
  } catch (e: any) {
    await setResponse(res, `Something went wrong. ${e}`, null);
  }
}
