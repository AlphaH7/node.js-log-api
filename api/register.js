import { registerUser } from '../controllers/userController';
import connectDB from '../utils/db';

export default async (req, res) => {
    await connectDB();

    if (req.method === 'POST') {
        registerUser(req, res);
    } else {
        res.status(405).end();  // Method Not Allowed
    }
};
