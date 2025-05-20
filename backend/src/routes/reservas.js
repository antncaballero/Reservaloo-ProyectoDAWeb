import express from 'express';
import { ReservaController } from '../controllers/reservaController.js';
var router = express.Router();

/* GET reservas listing. */
router.get('/', ReservaController.getAllReservas); 
router.get('/:id', ReservaController.getReservaById);
router.get('/evento/:eventoId', ReservaController.getReservasByEvento);
router.get('/usuario/:usuarioId', ReservaController.getReservasByUsuario);
router.delete('/:id', ReservaController.deleteReserva);

export default router;