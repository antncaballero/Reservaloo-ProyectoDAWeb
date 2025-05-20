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

    static async getReservasByEvento(req, res) {
        const eventoId = req.params.eventoId;
        try {
            const reservas = await Reserva.getReservasByEvento(eventoId);
            res.status(200).json(reservas);
        } catch (error) {
            console.error('Error fetching reservas:', error);
            res.status(500).send('Error fetching reservas from the database');
        }
    }
    
    static async getReservasByUsuario(req, res) {
        const usuarioId = req.params.usuarioId;
        try {
            const reservas = await Reserva.getReservasByUsuario(usuarioId);
            res.status(200).json(reservas);
        } catch (error) {
            console.error('Error fetching reservas:', error);
            res.status(500).send('Error fetching reservas from the database');
        }
    }

    static async deleteReserva(req, res) {
        const reservaId = req.params.id;
        try {
            const reserva = await Reserva.getReservaById(reservaId);
            if (!reserva) {
                return res.status(404).send('Reserva no encontrada');
            }

            const success = await Reserva.deleteReserva(reservaId);
            if (success) {
                res.status(200).json({ message: 'Reserva eliminada correctamente' });
            } else {
                res.status(500).send('Error al eliminar la reserva');
            }
        } catch (error) {
            console.error('Error deleting reserva:', error);
            res.status(500).send('Error al eliminar la reserva de la base de datos');
        }
    }
}