import { Evento } from '../models/evento.js';

export class EventoController {
    static async getAllEventos(req, res) {
        try {
            const eventos = await Evento.getAllEventos();
            res.status(200).json(eventos);
        } catch (error) {
            console.error('Error fetching eventos:', error);
            res.status(500).send('Error fetching eventos from the database');
        }
    }
    
    static async getEventoById(req, res) {
        const eventoId = req.params.id;
        try {
            const evento = await Evento.getEventoById(eventoId);
            if (!evento) {
                return res.status(404).send('Evento not found');
            }
            res.status(200).json(evento);
        } catch (error) {
            console.error('Error fetching evento:', error);
            res.status(500).send('Error fetching evento from the database');
        }
    }
}