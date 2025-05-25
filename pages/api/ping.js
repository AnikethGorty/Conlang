import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    await client.db().admin().ping();
    res.status(200).json({ connected: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ connected: false, error: error.message });
  }
}
