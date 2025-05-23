import express from 'express';
import { EspacioController } from '../controllers/espacioController.js';
var router = express.Router();
import verificarTokenGestor from '../middlewares/verificarTokenGestor.js';

router.get('/', EspacioController.getEspaciosFiltrados); 
router.get('/count', EspacioController.countEspaciosActivos);
router.get('/:id', EspacioController.getEspacioById);
router.post('/',verificarTokenGestor, EspacioController.createEspacio);
router.put('/:id', verificarTokenGestor, EspacioController.actualizarEspacio);

export default router;