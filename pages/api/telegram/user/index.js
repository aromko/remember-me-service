
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
    const chatId = await getUserTelegramId(req.body.name);
    
    if (typeof chatId === 'number'){
        res.status(200).json({status: 200, chatId: chatId, errorMessage: ''});
    } else {
        res.status(500).json({status: 200, chatId: chatId, errorMessage: 'no user found'});
    }    
}