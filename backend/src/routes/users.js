import express from 'express';
import { UserController } from '../controllers/userController.js';
var router = express.Router();

/* GET users listing. */
router.get('/', UserController.getAllUsers); 
router.get('/:id', UserController.getUserById);

export default router;
