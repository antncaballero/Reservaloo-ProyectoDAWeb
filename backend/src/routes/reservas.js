import express from 'express';
import { ReservaController } from '../controllers/reservaController.js';
import verificarTokenUsuario from '../middlewares/verificarTokenUsuario.js';
var router = express.Router();

router.get('/:id', ReservaController.getReservaById);
router.get('/usuario/:usuarioId', ReservaController.getReservasByUsuario);
router.delete('/:id', verificarTokenUsuario, ReservaController.deleteReserva);
router.post('/',verificarTokenUsuario, ReservaController.createReserva);

// Solo los usuarios pueden borrar y crear reservas, esto se podría quitar eliminando el middleware, si queremos que los gestores puedan
// Dentro del controlador ya se comprueba que la crea/borra el mismo usuario que hace la request
// Los gestores las pueden eliminar todas cuando eliminan el evento, pero eso ya se gestiona en su controlador

export default router;