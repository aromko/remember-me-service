import { NextApiResponse } from 'next';

export async function setResponse(
  res: NextApiResponse,
  errorMessage: string | null,
  data: any | null,
  statusCode: number = 200
): Promise<void> {
  res.status(statusCode).send({ errorMessage, data });
}
