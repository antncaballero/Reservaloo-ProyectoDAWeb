import { Evento } from '../models/evento.js';

export const EventoController = {
    async filtrarEventos(req, res) {
        try {
            const filtros = {
                categoria: req.query.categoria || null,
                fecha_inicio: req.query.fecha_inicio || null,
                nombre: req.query.nombre || null,
                nombre_espacio: req.query.nombre_espacio || null,
                plazas_minimas: req.query.plazas_minimas ? parseInt(req.query.plazas_minimas) : null
            };

            // Eliminar propiedades con valores nulos o vacíos
            Object.keys(filtros).forEach(key => {
                if (filtros[key] === null || filtros[key] === '') {
                    delete filtros[key];
                }
            });

            console.log('Filtros aplicados:', filtros);

            const eventos = await Evento.filtrarEventos(filtros);
            res.json(eventos);
        } catch (error) {
            console.error('Error al filtrar eventos:', error);
            res.status(500).json({ 
                mensaje: 'Error al filtrar eventos',
                error: error.message 
            });
        }
    },

    async getEventoById(req, res) {
        try {
            const evento = await Evento.getEventoById(req.params.id);
            if (!evento) {
                return res.status(404).json({ mensaje: 'Evento no encontrado' });
            }
            res.json(evento);
        } catch (error) {
            console.error('Error al obtener evento:', error);
            res.status(500).json({ mensaje: 'Error al obtener evento' });
        }
    },

    async getAllEventos(req, res) {
        try {
            const eventos = await Evento.getAllEventos();
            res.status(200).json(eventos);
        } catch (error) {
            console.error('Error fetching eventos:', error);
            res.status(500).send('Error fetching eventos from the database');
        }
    },

    async getEventosSimilaresByCategoria(req, res) {
        const categoria = req.params.categoria;
        try {
            const eventos = await Evento.getEventosSimilaresByCategoria(categoria);
            res.status(200).json(eventos);
        } catch (error) {
            console.error('Error fetching eventos:', error);
            res.status(500).send('Error fetching eventos from the database');
        }
    }
};