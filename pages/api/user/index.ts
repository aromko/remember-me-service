import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const client = await clientPromise;
  const db = client.db('myFirstDatabase');

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
      res.json({ status: 200, data: users });
      break;
  }
}
