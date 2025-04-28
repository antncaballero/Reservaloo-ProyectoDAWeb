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
      const [rows] = await db.query('SELECT * FROM reservas WHERE usuario_id = ?', [usuarioId]);
      return rows;
   }
 
}