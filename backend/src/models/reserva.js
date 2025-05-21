import { db } from '../../config/db.js';

export class Reserva {
   static async getAllReservas() {
      const [rows] = await db.query('SELECT * FROM reservas');
      return rows;
   }

   static async getReservaById(id) {
      const [rows] = await db.query('SELECT * FROM reservas WHERE id = ?', [id]);
      return rows[0];
   }

   static async getReservasByEvento(eventoId) {   
      const [rows] = await db.query('SELECT * FROM reservas WHERE evento_id = ?', [eventoId]);
      return rows;
   }

   static async getReservasByUsuario(usuarioId) {   
      const [rows] = await db.query(`
         SELECT r.*, e.nombre as evento_nombre, e.fecha_inicio, e.fecha_fin, e.imagen as evento_imagen
         FROM reservas r
         JOIN eventos e ON r.evento_id = e.id
         WHERE r.usuario_id = ?
         ORDER BY e.fecha_inicio DESC
      `, [usuarioId]);
      return rows;
   }   static async deleteReserva(id) {
      const [result] = await db.query('DELETE FROM reservas WHERE id = ?', [id]);
      return result.affectedRows > 0;
   }   static async createReserva(reservaData) {
      const { usuario_id, evento_id, cantidad } = reservaData;
      const [result] = await db.query(
         'INSERT INTO reservas (usuario_id, evento_id, cantidad) VALUES (?, ?, ?)',
         [usuario_id, evento_id, cantidad]
      );
      
      return {
         id: result.insertId,
         usuario_id,
         evento_id,
         cantidad,
         fecha_reserva: new Date()
      };
   }

   static async verificarDisponibilidadReserva(evento_id, cantidad) {
      // Obtener el evento con sus plazas disponibles
      const [rows] = await db.query(
         `SELECT e.*, 
          (e.plazas - COALESCE(SUM(r.cantidad), 0)) as plazas_disponibles,
          e.cancelado, e.fecha_fin
          FROM eventos e
          LEFT JOIN reservas r ON e.id = r.evento_id
          WHERE e.id = ?
          GROUP BY e.id`,
         [evento_id]
      );
      
      if (rows.length === 0) {
         return { disponible: false, mensaje: "Evento no encontrado" };
      }
      
      const evento = rows[0];
      
      // Verificar si el evento está cancelado
      if (evento.cancelado) {
         return { disponible: false, mensaje: "El evento ha sido cancelado" };
      }
      
      // Verificar si la fecha actual es anterior a la fecha de fin
      const fechaActual = new Date();
      const fechaFin = new Date(evento.fecha_fin);
      
      if (fechaActual > fechaFin) {
         return { disponible: false, mensaje: "El evento ya ha finalizado" };
      }
      
      // Verificar si hay suficientes plazas disponibles
      if (evento.plazas_disponibles < cantidad) {
         return { 
            disponible: false, 
            mensaje: `No hay suficientes plazas disponibles. Plazas disponibles: ${evento.plazas_disponibles}` 
         };
      }
      
      return { disponible: true, evento };
   }
}