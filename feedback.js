import { MongoClient } from "mongodb";

let client;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    if (!client) {
      client = new MongoClient(process.env.MONGODB_URI);
      await client.connect();
    }

    const db = client.db("portfolioDB");
    const collection = db.collection("feedback");

    const { name, email, message } = req.body;

    await collection.insertOne({
      name,
      email,
      message,
      createdAt: new Date()
    });

    res.status(200).json({ message: "Saved successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error saving data" });
  }
}