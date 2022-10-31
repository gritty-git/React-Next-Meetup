// /api/new-meetup
// POST /api/new-meetup

import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const { title, image, address, description } = data;
    try {
      const client = await MongoClient.connect(process.env.DB_ACCESS);
      const db = client.db();

      const meetupsCollection = db.collection("meetups");
      const result = await meetupsCollection.insertOne(data);
      console.log(result);

      client.close();
      res.status(201).json({ message: "Meetup inserted!" });
    } catch (error) {
      console.log(error);
    }
  }
}

export default handler;
