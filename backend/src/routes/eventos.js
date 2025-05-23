import express from 'express';
import { EventoController } from '../controllers/eventoController.js';
import verificarTokenGestor from '../middlewares/verificarTokenGestor.js';
var router = express.Router();

router.get('/', EventoController.getAllEventos); 
router.get('/count', EventoController.countEventosFuturos);
router.get('/filtrar', EventoController.filtrarEventos);
router.get('/categoria/:categoria', EventoController.getEventosSimilaresByCategoria);
router.get('/espacio/:espacioId', EventoController.getEventosByEspacioId);
router.get('/:id', EventoController.getEventoById);
router.post('/', verificarTokenGestor, EventoController.createEvento);
router.put('/:id', verificarTokenGestor, EventoController.updateEvento);
router.patch('/cancelar/:id', verificarTokenGestor, EventoController.cancelarEvento);

export default router;