import { NextApiRequest, NextApiResponse } from 'next';
import { Db } from 'mongodb';
import { validateUser } from './userValidator';
import { connectToDatabase } from '../../../utils/mongodb';
import { setResponse } from '../../../utils/responseUtils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  let db: Db;

  if (process.env.NODE_ENV !== 'test') {
    await connectToDatabase();
  }

  db = (global as any).__DB__;

  switch (req.method) {
    case 'POST':
      let bodyObject: any = JSON.parse(req.body);
      try {
        validateUser(bodyObject);
        await db.collection('User').insertOne(bodyObject);
        await setResponse(res, '', null);
      } catch (e: any) {
        await setResponse(res, `Something went wrong. ${e}`, null);
      }
      break;
    case 'GET':
      const users = await db.collection('User').find({}).toArray();
      await setResponse(res, null, users);
      break;
  }
}
