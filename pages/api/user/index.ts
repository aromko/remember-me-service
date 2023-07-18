import { NextApiRequest, NextApiResponse } from 'next';
import { Db } from 'mongodb';
import { validateUser } from './userValidator';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  let db: Db;

  db = (global as any).__DB__;

  switch (req.method) {
    case 'POST':
      let bodyObject: any = JSON.parse(req.body);
      try {
        validateUser(bodyObject);
        await db.collection('User').insertOne(bodyObject);
        res.json({ errorMessage: '' });
      } catch (e: any) {
        res.json({
          errorMessage: `Something went wrong. ${e}`,
        });
      }
      break;
    case 'GET':
      const users = await db.collection('User').find({}).toArray();
      res.statusCode = 200;
      res.send({ data: users });
      break;
  }
}
