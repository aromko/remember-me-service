import { NextApiRequest, NextApiResponse } from 'next';

const getBotUpdates = () =>
  fetch(
    `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN}/getUpdates`
  ).then(response => response.json());

const getUserTelegramId = async (
  username: string
): Promise<number | undefined> => {
  const { result } = await getBotUpdates();

  const userUpdate = result
    .filter(
      ({ message }: { message: { text?: string } }) =>
        message?.text !== undefined
    )
    .find(
      ({ message }: { message: { text?: string } }) =>
        message.text === `/start ${username}`
    );

  return userUpdate?.message.from.id;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userTelegramId = await getUserTelegramId(req.body.name);

  if (typeof userTelegramId === 'number') {
    res.status(200).json({ userTelegramId: userTelegramId, errorMessage: '' });
  } else {
    res.status(500).json({
      userTelegramId: userTelegramId,
      errorMessage:
        'No user was found. Please add the Telegram Bot (react_remember_me_service_bot) via Telegram App and try again.',
    });
  }
}
