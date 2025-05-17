import express from 'express';
import dotenv from 'dotenv';
import { AuthController } from '../controllers/authController.js';

dotenv.config();

const router = express.Router();

router.get('/login', (req, res) => {
  res.status(200).render('login');
});

router.post('/login', AuthController.login);

router.post('/logout', AuthController.logout);

router.get('/check', AuthController.checkAuth);

export default router;
