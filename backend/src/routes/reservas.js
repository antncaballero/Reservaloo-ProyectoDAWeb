import express from 'express';
import { ReservaController } from '../controllers/reservaController.js';
var router = express.Router();

/* GET reservas listing. */
router.get('/', ReservaController.getAllReservas); 
router.get('/:id', ReservaController.getReservaById);

export default router;