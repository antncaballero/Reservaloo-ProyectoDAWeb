import { Espacio } from '../models/espacio.js';

export class EspacioController {
    static async getEspaciosFiltrados(req, res) {
        try {
            const { nombre, capacidad_minima, estado } = req.query;
            const espacios = await Espacio.getEspaciosFiltrados({ nombre, capacidad_minima, estado });
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

    static async createEspacio(req, res) {
        try {
            const espacioData = req.body;
            
            // Validación básica de campos requeridos
            const camposRequeridos = ['nombre', 'propietario', 'capacidad', 'direccion', 'descripcion', 'estado', 'imagen'];
            const camposFaltantes = camposRequeridos.filter(campo => !espacioData[campo]);
            
            if (camposFaltantes.length > 0) {
                return res.status(400).json({
                    error: 'Faltan campos requeridos',
                    campos: camposFaltantes
                });
            }

            // Validación de capacidad
            if (isNaN(espacioData.capacidad) || espacioData.capacidad <= 0) {
                return res.status(400).json({
                    error: 'La capacidad debe ser un número positivo'
                });
            }

            // Validación de estado
            if (!['ACTIVO', 'CERRADO'].includes(espacioData.estado)) {
                return res.status(400).json({
                    error: 'El estado debe ser ACTIVO o CERRADO'
                });
            }

            const espacioId = await Espacio.createEspacio(espacioData);
            res.status(201).json({
                message: 'Espacio creado exitosamente',
                id: espacioId
            });
        } catch (error) {
            console.error('Error creating espacio:', error);
            res.status(500).json({
                error: 'Error al crear el espacio en la base de datos'
            });
        }
    }

    static async actualizarEspacio(req, res) {
        try {
            const espacioId = req.params.id;
            const espacioData = req.body;

            // Validar que el espacio existe
            const espacio = await Espacio.getEspacioById(espacioId);
            if (!espacio) {
                return res.status(404).json({
                    error: 'Espacio no encontrado'
                });
            }

            // Validación de capacidad si se proporciona
            if (espacioData.capacidad !== undefined) {
                if (isNaN(espacioData.capacidad) || espacioData.capacidad <= 0) {
                    return res.status(400).json({
                        error: 'La capacidad debe ser un número positivo'
                    });
                }
            }

            // Validación de estado si se proporciona
            if (espacioData.estado !== undefined) {
                if (!['ACTIVO', 'CERRADO'].includes(espacioData.estado)) {
                    return res.status(400).json({
                        error: 'El estado debe ser ACTIVO o CERRADO'
                    });
                }
            }

            try {
                // Actualizar el espacio
                const actualizado = await Espacio.actualizarEspacio(espacioId, espacioData);
                if (!actualizado) {
                    return res.status(500).json({
                        error: 'Error al actualizar el espacio'
                    });
                }

                res.status(200).json({
                    message: 'Espacio actualizado exitosamente',
                    espacioActualizado: { ...espacio, ...espacioData }
                });
            } catch (error) {
                if (error.message === 'No se puede cerrar el espacio porque tiene eventos activos') {
                    return res.status(400).json({
                        error: error.message
                    });
                }
                throw error;
            }
        } catch (error) {
            console.error('Error actualizando espacio:', error);
            res.status(500).json({
                error: 'Error al actualizar el espacio'
            });
        }
    }
}