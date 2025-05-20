import express from 'express';
import { EspacioController } from '../controllers/espacioController.js';
var router = express.Router();
import verificarTokenGestor from '../middlewares/verificarTokenGestor.js';

/* GET espacios listing. */
router.get('/', EspacioController.getEspaciosFiltrados); 
router.get('/:id', EspacioController.getEspacioById);
router.post('/',verificarTokenGestor, EspacioController.createEspacio);
router.patch('/:id', verificarTokenGestor, EspacioController.actualizarEspacio);

export default router;