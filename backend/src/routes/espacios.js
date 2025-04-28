import express from 'express';
import { EspacioController } from '../controllers/espacioController.js';
var router = express.Router();

/* GET espacios listing. */
router.get('/', EspacioController.getAllEspacios); 
router.get('/:id', EspacioController.getEspacioById);

export default router;