import { MongoClient } from 'mongodb';

export async function connectToDatabase(
  mongoUri = 'mongodb+srv://admin:ZLceDj8C2IZWu7mQ@cluster0.6xnyv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
) {
  const client = new MongoClient(mongoUri);

  try {
    await client.connect();

    return client.db();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}
