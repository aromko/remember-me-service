
const getBotUpdates = () =>
fetch(
  `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getUpdates`
).then((response) => response.json());

const getUserTelegramId = async (uniqueString) => {
    const { result } = await getBotUpdates();
    
    const messageUpdates = result.filter(
        ({ message }) => message?.text !== undefined
    );

    const userUpdate = messageUpdates.find(
        ({ message }) => message.text === `/start ${uniqueString}`
    );

    return userUpdate?.message.from.id;
};

export default async function handler(req, res) {
    const telegramId = await getUserTelegramId(req.body.name);
    
    if (typeof telegramId === 'number'){
        res.status(200).json({telegramId: telegramId, errorMessage: ''});
    } else {
        res.status(500).json({telegramId: telegramId, errorMessage: 'No user was found. Please add the bot via Telegram App and try again'});
    }    
}