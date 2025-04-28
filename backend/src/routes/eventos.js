import express from 'express';
import { EventoController } from '../controllers/eventoController.js';
var router = express.Router();

/* GET eventos listing. */
router.get('/', EventoController.getAllEventos); 
router.get('/:id', EventoController.getEventoById);

export default router;