import express from 'express';
import { EventoController } from '../controllers/eventoController.js';
var router = express.Router();

/* GET eventos listing. */
router.get('/', EventoController.getAllEventos); 
router.get('/filtrar', EventoController.filtrarEventos);
router.get('/categoria/:categoria', EventoController.getEventosSimilaresByCategoria);
router.get('/:id', EventoController.getEventoById);

export default router;