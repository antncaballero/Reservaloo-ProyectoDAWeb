import { db } from '../../config/db.js';

export class Evento {
   static async getAllEventos() {
      const [rows] = await db.query('SELECT * FROM eventos');
      return rows;
   }

   static async getEventoById(id) {
      const [rows] = await db.query('SELECT * FROM eventos WHERE id = ?', [id]);
      return rows[0];
   }
 
}