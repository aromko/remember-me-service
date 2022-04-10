import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("myFirstDatabase");
    try {
        var yourDate = new Date().toISOString().split('T')[0];
    
        const reminders = await db.collection("Reminder").find({ executionAt: yourDate }).toArray();  
        let textMessage = `Erinnerungen für ${yourDate}: %0D%0A `
        reminders.forEach((item) => {
            textMessage += `<b>${item.name}</b> %0D%0A${item.description} %0D%0A%0D%0A`;            
        });
        fetch(
            `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN}/sendMessage?parse_mode=html&chat_id=584840017&text=${textMessage}`
        )
        res.status(200).json('OK');
    } catch (e) {
        res.json({errorMessage: `Something went wrong. ${e.code}`});
    }
}