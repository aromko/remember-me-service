import { NextApiRequest, NextApiResponse } from 'next';
import { Db } from 'mongodb';
import { validateUser } from './userValidator';
import { connectAndGetDb } from '../../../utils/mongodb';
import { setResponse } from '../../../utils/responseUtils';

async function handlePost(db: Db, req: NextApiRequest, res: NextApiResponse) {
  try {
    const bodyObject: any = JSON.parse(req.body);
    validateUser(bodyObject);
    await db.collection('User').insertOne(bodyObject);
    await setResponse(res, '', null);
  } catch (e: any) {
    await setResponse(res, `Something went wrong. ${e}`, null);
  }
}

async function handleGet(db: Db, res: NextApiResponse) {
  try {
    const users = await db.collection('User').find({}).toArray();
    await setResponse(res, null, users);
  } catch (e: any) {
    await setResponse(res, `Something went wrong. ${e}`, null);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const db = await connectAndGetDb();

    switch (req.method) {
      case 'POST':
        await handlePost(db, req, res);
        break;

      case 'GET':
        await handleGet(db, res);
        break;

      default:
        await setResponse(res, 'Method not allowed', null, 405);
        break;
    }
  } catch (e: any) {
    await setResponse(res, `Something went wrong. ${e}`, null);
    return;
  }
}
