import { Reserva } from '../models/reserva.js';

export class ReservaController {    static async getReservaById(req, res) {
        const reservaId = req.params.id;
        try {
            const reserva = await Reserva.getReservaById(reservaId);
            if (!reserva) {
                return res.status(404).send('Reserva not found');
            }
            
            // Verificar que el usuario autenticado solo puede ver sus propias reservas
            if (reserva.usuario_id !== req.user.id) {
                return res.status(403).json({ 
                    message: 'No tienes permiso para ver esta reserva' 
                });
            }
            
            res.status(200).json(reserva);
        } catch (error) {
            console.error('Error fetching reserva:', error);
            res.status(500).send('Error fetching reserva from the database');
        }
    }
      static async getReservasByUsuario(req, res) {
        const usuarioId = req.params.usuarioId;
        
        // Verificar que el usuario autenticado solo puede ver sus propias reservas
        if (parseInt(usuarioId) !== req.user.id) {
            return res.status(403).json({ 
                message: 'No tienes permiso para ver las reservas de otro usuario' 
            });
        }
        
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

            // Verificar que el usuario que hace la petición es el dueño de la reserva
            if (reserva.usuario_id !== req.user.id) {
                return res.status(403).json({ 
                    message: 'No tienes permiso para eliminar esta reserva' 
                });
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
      static async createReserva(req, res) {
        try {
            const { evento_id, user_id, cantidad } = req.body;
            
            if (user_id !== req.user.id) {
                return res.status(403).json({ 
                    message: 'No tienes permiso para crear una reserva para otro usuario' 
                });
            }
            
            // Validar datos de entrada
            if (!evento_id || !cantidad || cantidad <= 0) {
                return res.status(400).json({ 
                    mensaje: 'Datos incompletos o inválidos para la reserva' 
                });
            }

            // Verificar disponibilidad
            const disponibilidad = await Reserva.verificarDisponibilidadReserva(evento_id, cantidad);
            
            if (!disponibilidad.disponible) {
                return res.status(400).json({ mensaje: disponibilidad.mensaje });
            }
            
            // Crear la reserva
            const reservaData = {
                user_id,
                evento_id,
                cantidad
            };
            
            const nuevaReserva = await Reserva.createReserva(reservaData);
            
            res.status(201).json({
                mensaje: 'Reserva creada correctamente',
                reserva: nuevaReserva
            });
            
        } catch (error) {
            console.error('Error al crear reserva:', error);
            res.status(500).json({ mensaje: 'Error al crear la reserva' });
        }
    }
}