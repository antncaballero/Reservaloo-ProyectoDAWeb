import { db } from '../../config/db.js';

export class Evento {   
   static async getAllEventos() {
      const [rows] = await db.query(`
         SELECT e.*, es.nombre as nombre_espacio, 
         (e.plazas - COALESCE(SUM(r.cantidad), 0)) as plazas_disponibles
         FROM eventos e
         LEFT JOIN espacios es ON e.espacio_id = es.id
         LEFT JOIN reservas r ON e.id = r.evento_id
         GROUP BY e.id
      `);
      return rows;
   }
   
   static async getEventoById(id) {
      const [rows] = await db.query(
         `SELECT e.*, es.nombre as nombre_espacio, es.direccion as direccion_espacio,
          (e.plazas - COALESCE(SUM(r.cantidad), 0)) as plazas_disponibles
          FROM eventos e
          LEFT JOIN espacios es ON e.espacio_id = es.id
          LEFT JOIN reservas r ON e.id = r.evento_id
          WHERE e.id = ?
          GROUP BY e.id`,
         [id]
      );
      return rows[0];
   }   
   
   static async getEventosSimilaresByCategoria(categoria) {
      const [rows] = await db.query(
         `SELECT e.*, es.nombre as nombre_espacio, 
          (e.plazas - COALESCE(SUM(r.cantidad), 0)) as plazas_disponibles
          FROM eventos e
          LEFT JOIN espacios es ON e.espacio_id = es.id
          LEFT JOIN reservas r ON e.id = r.evento_id
          WHERE e.categoria = ? AND e.fecha_inicio > NOW()
          GROUP BY e.id
          ORDER BY e.fecha_inicio ASC
          LIMIT 3`,
         [categoria]
      );
      return rows;
   }

   static async getEventosByEspacioId(espacioId) {
      const [rows] = await db.query(
         `SELECT e.*, es.nombre as nombre_espacio, 
          (e.plazas - COALESCE(SUM(r.cantidad), 0)) as plazas_disponibles
          FROM eventos e
          LEFT JOIN espacios es ON e.espacio_id = es.id
          LEFT JOIN reservas r ON e.id = r.evento_id
          WHERE e.espacio_id = ? AND e.fecha_inicio >= CURDATE() AND e.cancelado = false
          GROUP BY e.id
          ORDER BY e.fecha_inicio ASC`,
         [espacioId]
      );
      return rows;
   }

   static async filtrarEventos(filtros) {
      let query = `
         SELECT e.*, es.nombre as nombre_espacio, es.direccion as direccion_espacio,
         (e.plazas - COALESCE(SUM(r.cantidad), 0)) as plazas_disponibles
         FROM eventos e
         LEFT JOIN espacios es ON e.espacio_id = es.id
         LEFT JOIN reservas r ON e.id = r.evento_id
         WHERE 1=1
      `;
      
      const params = [];

      if (filtros.categoria) {
         query += ' AND e.categoria = ?';
         params.push(filtros.categoria);
      }

      if (filtros.fecha_inicio) {
         query += ' AND e.fecha_inicio >= ?';
         params.push(filtros.fecha_inicio);
      }

      if (filtros.nombre) {
         query += ' AND e.nombre LIKE ?';
         params.push(`%${filtros.nombre}%`);
      }

      if (filtros.nombre_espacio) {
         query += ' AND es.nombre LIKE ?';
         params.push(`%${filtros.nombre_espacio}%`);
      }      
      
      if (filtros.plazas_minimas) {
         query += ' GROUP BY e.id HAVING plazas_disponibles >= ?';
         params.push(filtros.plazas_minimas);
      } else {
         query += ' GROUP BY e.id';
      }

      const [rows] = await db.query(query, params);
      return rows;
   }

   // Nuevo método para crear un evento
   static async createEvento(eventoData) {
      try {
         const [result] = await db.query(
            `INSERT INTO eventos (
               nombre, descripcion, organizador, plazas, 
               categoria, cancelado, fecha_inicio, fecha_fin, 
               espacio_id, imagen
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
               eventoData.nombre,
               eventoData.descripcion,
               eventoData.organizador,
               eventoData.plazas,
               eventoData.categoria,
               eventoData.cancelado || false,
               eventoData.fecha_inicio,
               eventoData.fecha_fin,
               eventoData.espacio_id,
               eventoData.imagen
            ]
         );
         return result.insertId;
      } catch (error) {
         console.error('Error al crear evento:', error);
         throw error;
      }
   }

   // Comprobar si un espacio está activo
   static async checkEspacioActivo(espacioId) {
      const [rows] = await db.query(
         `SELECT * FROM espacios WHERE id = ? AND estado = 'ACTIVO'`,
         [espacioId]
      );
      return rows.length > 0 ? rows[0] : null;
   }   // Comprobar si hay eventos que se superponen en el mismo espacio
   
   static async checkEventosSolapados(espacioId, fechaInicio, fechaFin) {
      const [rows] = await db.query(
         `SELECT * FROM eventos 
          WHERE espacio_id = ? 
          AND cancelado = false 
          AND (
             (fecha_inicio BETWEEN ? AND ?) OR
             (fecha_fin BETWEEN ? AND ?) OR
             (fecha_inicio <= ? AND fecha_fin >= ?)
          )`,
         [espacioId, fechaInicio, fechaFin, fechaInicio, fechaFin, fechaInicio, fechaFin]
      );
      return rows;
   }

   // Cancelar un evento y sus reservas asociadas
   static async cancelarEvento(eventoId) {
      try {
         // Comenzar una transacción para garantizar que se cancelan todas las reservas
         await db.query('START TRANSACTION');

         // Actualizar el evento a cancelado
         const [resultEvento] = await db.query(
            'UPDATE eventos SET cancelado = true WHERE id = ? AND fecha_inicio > NOW()',
            [eventoId]
         );

         if (resultEvento.affectedRows === 0) {
            // No se encontró el evento o ya pasó la fecha de inicio
            await db.query('ROLLBACK');
            return { success: false, message: 'No se puede cancelar el evento' };
         }

         // Eliminar todas las reservas asociadas al evento
         const [resultReservas] = await db.query(
            'DELETE FROM reservas WHERE evento_id = ?',
            [eventoId]
         );

         // Confirmar los cambios
         await db.query('COMMIT');

         return { 
            success: true, 
            message: 'Evento cancelado con éxito',
         };

      } catch (error) {
         // En caso de error, deshacer los cambios
         await db.query('ROLLBACK');
         console.error('Error al cancelar evento:', error);         throw error;
      }
   }

   // Método para contar eventos a partir de hoy
   static async countEventosFuturos() {
      const [rows] = await db.query(
         'SELECT COUNT(*) as count FROM eventos WHERE fecha_inicio >= CURDATE() AND cancelado = false'
      );
      return rows[0].count;
   }   
   
   // Método para actualizar un evento
   static async updateEvento(id, eventoData) {
         const [result] = await db.query(
            `UPDATE eventos SET 
               nombre = ?, 
               descripcion = ?, 
               organizador = ?, 
               plazas = ?, 
               categoria = ?, 
               fecha_inicio = ?, 
               fecha_fin = ?, 
               espacio_id = ?, 
               imagen = ?,
               cancelado = ?
            WHERE id = ?`,
            [
               eventoData.nombre,
               eventoData.descripcion,
               eventoData.organizador,
               eventoData.plazas,
               eventoData.categoria,
               eventoData.fecha_inicio,
               eventoData.fecha_fin,
               eventoData.espacio_id,
               eventoData.imagen,
               eventoData.cancelado,
               id
            ]
         );
         return result.affectedRows > 0;
      } catch (error) {
         console.error('Error al actualizar evento:', error);
         throw error;
      }
   
}