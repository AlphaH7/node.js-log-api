import express from 'express';
import { registerUser, loginUser } from '../controllers/UserActionsController';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// TODO: Add more routes as needed

export default router;
