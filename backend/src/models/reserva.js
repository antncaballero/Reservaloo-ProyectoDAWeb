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
   }

   static async deleteReserva(id) {
      const [result] = await db.query('DELETE FROM reservas WHERE id = ?', [id]);
      return result.affectedRows > 0;
   }
}