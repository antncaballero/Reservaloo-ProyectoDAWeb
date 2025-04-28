import { Espacio } from '../models/espacio.js';

export class EspacioController {
    static async getAllEspacios(req, res) {
        try {
            const espacios = await Espacio.getAllEspacios();
            res.status(200).json(espacios);
        } catch (error) {
            console.error('Error fetching espacios:', error);
            res.status(500).send('Error fetching espacios from the database');
        }
    }
    
    static async getEspacioById(req, res) {
        const espacioId = req.params.id;
        try {
            const espacio = await Espacio.getEspacioById(espacioId);
            if (!espacio) {
                return res.status(404).send('Espacio not found');
            }
            res.status(200).json(espacio);
        } catch (error) {
            console.error('Error fetching espacio:', error);
            res.status(500).send('Error fetching espacio from the database');
        }
    }
}