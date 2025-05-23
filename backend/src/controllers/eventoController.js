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
    },
    
    async getEventosByEspacioId(req, res) {
        const espacioId = req.params.espacioId;
        try {
            const eventos = await Evento.getEventosByEspacioId(espacioId);
            res.status(200).json(eventos);
        } catch (error) {
            console.error('Error fetching eventos por espacio:', error);
            res.status(500).json({ 
                mensaje: 'Error al obtener eventos del espacio',
                error: error.message 
            });
        }
    },
    
    // Nuevo método para crear un evento
    async createEvento(req, res) {
        try {
            const eventoData = req.body;
            
            // Validación básica de campos requeridos
            const camposRequeridos = [
                'nombre', 'descripcion', 'organizador', 'plazas', 
                'categoria', 'fecha_inicio', 'fecha_fin', 'espacio_id', 'imagen'
            ];
            const camposFaltantes = camposRequeridos.filter(campo => !eventoData[campo]);
            
            if (camposFaltantes.length > 0) {
                return res.status(400).json({
                    mensaje: 'Faltan campos requeridos',
                    campos: camposFaltantes
                });
            }
            
            // Validación de plazas
            if (isNaN(eventoData.plazas) || eventoData.plazas <= 0) {
                return res.status(400).json({
                    mensaje: 'El número de plazas debe ser un número positivo'
                });
            }
            
            // Validación de categoría
            const categoriasValidas = ['ACADEMICOS', 'CULTURALES', 'ENTRETENIMIENTO', 'DEPORTES', 'OTROS'];
            if (!categoriasValidas.includes(eventoData.categoria)) {
                return res.status(400).json({
                    mensaje: 'Categoría no válida'
                });
            }
            
            // Validación de fechas
            const fechaInicio = new Date(eventoData.fecha_inicio);
            const fechaFin = new Date(eventoData.fecha_fin);
            
            if (isNaN(fechaInicio.getTime()) || isNaN(fechaFin.getTime())) {
                return res.status(400).json({
                    mensaje: 'Fechas no válidas'
                });
            }
            
            if (fechaFin < fechaInicio) {
                return res.status(400).json({
                    mensaje: 'La fecha de fin no puede ser anterior a la fecha de inicio'
                });
            }
            
            // Verificar que el espacio existe y está activo
            const espacio = await Evento.checkEspacioActivo(eventoData.espacio_id);
            if (!espacio) {
                return res.status(400).json({
                    mensaje: 'El espacio seleccionado no existe o no está activo'
                });
            }
            
            // Verificar que las plazas no excedan la capacidad del espacio
            if (eventoData.plazas > espacio.capacidad) {
                return res.status(400).json({
                    mensaje: `El número de plazas (${eventoData.plazas}) no puede superar la capacidad del espacio (${espacio.capacidad})`
                });
            }
            
            // Verificar que no haya eventos solapados en el mismo espacio
            const eventosSolapados = await Evento.checkEventosSolapados(
                eventoData.espacio_id, 
                eventoData.fecha_inicio, 
                eventoData.fecha_fin
            );
            
            if (eventosSolapados.length > 0) {
                return res.status(400).json({
                    mensaje: 'Ya existen eventos programados en este espacio para las fechas seleccionadas',
                    eventos: eventosSolapados.map(e => ({
                        id: e.id,
                        nombre: e.nombre,
                        fecha_inicio: e.fecha_inicio,
                        fecha_fin: e.fecha_fin
                    }))
                });
            }
              // Todo OK, crear el evento
            const eventoId = await Evento.createEvento(eventoData);
            res.status(201).json({
                mensaje: 'Evento creado exitosamente',
                id: eventoId
            });
            
        } catch (error) {
            console.error('Error al crear evento:', error);
            res.status(500).json({
                mensaje: 'Error al crear el evento en la base de datos',
                error: error.message
            });
        }
    },

    // Método para cancelar un evento
    async cancelarEvento(req, res) {
        const eventoId = req.params.id;
        
        try {
            // Verificar que el evento existe y está activo
            const evento = await Evento.getEventoById(eventoId);
            
            if (!evento) {
                return res.status(404).json({ mensaje: 'Evento no encontrado' });
            }
            
            if (evento.cancelado) {
                return res.status(400).json({ mensaje: 'El evento ya está cancelado' });
            }
            
            const fechaInicio = new Date(evento.fecha_inicio);
            const fechaActual = new Date();
            
            if (fechaInicio <= fechaActual) {
                return res.status(400).json({ 
                    mensaje: 'No se puede cancelar un evento que ya ha comenzado' 
                });
            }
            
            // Proceder con la cancelación
            const resultado = await Evento.cancelarEvento(eventoId);
            
            if (resultado.success) {
                res.status(200).json({
                    mensaje: 'Evento cancelado con éxito',
                });
            } else {
                res.status(400).json({ mensaje: resultado.message });
            }
            
        } catch (error) { console.error('Error al cancelar evento:', error);
            res.status(500).json({ 
                mensaje: 'Error al cancelar el evento',
                error: error.message 
            });
        }
    },    // Método para contar eventos futuros
    async countEventosFuturos(req, res) {
        try {
            const count = await Evento.countEventosFuturos();
            res.status(200).json({ count });
        } catch (error) {
            console.error('Error contando eventos futuros:', error);
            res.status(500).json({ 
                mensaje: 'Error al contar eventos futuros',
                error: error.message 
            });
        }
    },

    // Método para actualizar un evento
    async updateEvento(req, res) {
        const id = req.params.id;
        const eventoData = req.body;
        console.log('Datos del evento a actualizar:', eventoData);
          // Validación básica de campos requeridos
        try {            
            const camposRequeridos = [
                'nombre', 'descripcion', 'organizador', 'plazas', 
                'categoria', 'fecha_inicio', 'fecha_fin', 'espacio_id', 'imagen'
            ];
            
            // Comprobar campos requeridos faltantes
            const camposFaltantes = camposRequeridos.filter(campo => !eventoData[campo]);
            
            if (camposFaltantes.length > 0) {
                return res.status(400).json({
                    mensaje: 'Faltan campos requeridos',
                    campos: camposFaltantes
                });
            }
            
            // Verificar que el evento existe
            const eventoActual = await Evento.getEventoById(id);
            if (!eventoActual) {
                return res.status(404).json({ mensaje: 'Evento no encontrado' });
            }
              // Si estamos intentando activar un evento cancelado, verificar que la fecha no haya pasado
            if (eventoActual.cancelado && eventoData.cancelado === false) {
                const fechaInicio = new Date(eventoData.fecha_inicio);
                const fechaActual = new Date();
                
                if (fechaInicio <= fechaActual) {
                    return res.status(400).json({
                        mensaje: 'No se puede activar un evento cuya fecha de inicio ya ha pasado'
                    });
                }
            }
            
            // Validación de plazas
            if (isNaN(eventoData.plazas) || eventoData.plazas <= 0) {
                return res.status(400).json({
                    mensaje: 'El número de plazas debe ser un número positivo'
                });
            }
            
            // Validación de categoría
            const categoriasValidas = ['ACADEMICOS', 'CULTURALES', 'ENTRETENIMIENTO', 'DEPORTES', 'OTROS'];
            if (!categoriasValidas.includes(eventoData.categoria)) {
                return res.status(400).json({
                    mensaje: 'Categoría no válida'
                });
            }
            
            // Validación de fechas
            const fechaInicio = new Date(eventoData.fecha_inicio);
            const fechaFin = new Date(eventoData.fecha_fin);
            
            if (isNaN(fechaInicio.getTime()) || isNaN(fechaFin.getTime())) {
                return res.status(400).json({
                    mensaje: 'Fechas no válidas'
                });
            }
            
            if (fechaFin < fechaInicio) {
                return res.status(400).json({
                    mensaje: 'La fecha de fin no puede ser anterior a la fecha de inicio'
                });
            }
            
            // Verificar que el espacio existe y está activo
            const espacio = await Evento.checkEspacioActivo(eventoData.espacio_id);
            if (!espacio) {
                return res.status(400).json({
                    mensaje: 'El espacio seleccionado no existe o no está activo'
                });
            }
            
            // Verificar que las plazas no excedan la capacidad del espacio
            if (eventoData.plazas > espacio.capacidad) {
                return res.status(400).json({
                    mensaje: `El número de plazas (${eventoData.plazas}) no puede superar la capacidad del espacio (${espacio.capacidad})`
                });
            }
            
            // Verificar que no haya eventos solapados en el mismo espacio (excluyendo el evento actual)
            const eventosSolapados = await Evento.checkEventosSolapados(
                eventoData.espacio_id, 
                eventoData.fecha_inicio, 
                eventoData.fecha_fin
            );
            
            const eventosSolapadosFiltrados = eventosSolapados.filter(e => e.id !== parseInt(id));
            
            if (eventosSolapadosFiltrados.length > 0) {
                return res.status(400).json({
                    mensaje: 'Hay otros eventos en estas fechas'
                });
            }
            
            // Todo OK, actualizar el evento
            const actualizado = await Evento.updateEvento(id, eventoData);
            
            if (actualizado) {
                res.status(200).json({
                    mensaje: 'Evento actualizado con éxito'
                });
            } else {
                res.status(400).json({
                    mensaje: 'No se pudo actualizar el evento'
                });
            }
            
        } catch (error) {
            console.error('Error al actualizar evento:', error);
            res.status(500).json({
                mensaje: 'Error al actualizar el evento en la base de datos',
                error: error.message
            });
        }
    }
};