import express from 'express';
import { EventoController } from '../controllers/eventoController.js';
var router = express.Router();

/* GET eventos listing. */
router.get('/', EventoController.getAllEventos); 
router.get('/:id', EventoController.getEventoById);
router.get('/categoria/:categoria', EventoController.getEventosByCategoria);

export default router;