import { Reserva } from '../models/reserva.js';

export class ReservaController {
    static async getAllReservas(req, res) {
        try {
            const reservas = await Reserva.getAllReservas();
            res.status(200).json(reservas);
        } catch (error) {
            console.error('Error fetching reservas:', error);
            res.status(500).send('Error fetching reservas from the database');
        }
    }
    
    static async getReservaById(req, res) {
        const reservaId = req.params.id;
        try {
            const reserva = await Reserva.getReservaById(reservaId);
            if (!reserva) {
                return res.status(404).send('Reserva not found');
            }
            res.status(200).json(reserva);
        } catch (error) {
            console.error('Error fetching reserva:', error);
            res.status(500).send('Error fetching reserva from the database');
        }
    }
}