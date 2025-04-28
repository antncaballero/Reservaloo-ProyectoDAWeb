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
 
}