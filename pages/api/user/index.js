import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("myFirstDatabase");
    switch (req.method) {
        case "POST":
            let bodyObject = JSON.parse(req.body);
            try {
                await db.collection("User").insertOne(bodyObject);
                res.json({errorMessage: ''});
            } catch (e) {
                res.json({errorMessage: `Something went wrong. ErrorCode from MongoDB ${e.code}`});
            }
            break;
        case "GET":
            const users = await db.collection("User").find({}).toArray();
            res.json({ status: 200, data: users });
            break;
    }
}
       