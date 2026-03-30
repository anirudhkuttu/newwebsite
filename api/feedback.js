import { MongoClient } from "mongodb";

const uri = "mongodb+srv://AnirudhMD:AnirudhMD2007@cluster0.3yilqfm.mongodb.net/?retryWrites=true&w=majority";

let client;
let clientPromise;

if (!client) {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { name, message } = req.body;

      const client = await clientPromise;
      const db = client.db("portfolio");

      await db.collection("feedback").insertOne({
        name,
        message,
        createdAt: new Date()
      });

      res.status(200).json({ message: "Thanks for your feedback!" });
    } catch (error) {
      res.status(500).json({ message: "Error saving feedback" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}