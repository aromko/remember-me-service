import { NextApiRequest, NextApiResponse } from 'next';
import { Db } from 'mongodb';

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
        await db.collection('User').insertOne(bodyObject);
        res.json({ errorMessage: '' });
      } catch (e: any) {
        res.json({
          errorMessage: `Something went wrong. ErrorCode from MongoDB ${e.code}`,
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
