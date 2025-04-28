import { db } from '../../config/db.js';

export class Espacio {
   static async getAllEspacios() {
      const [rows] = await db.query('SELECT * FROM espacios');
      return rows;
   }

   static async getEspacioById(id) {
      const [rows] = await db.query('SELECT * FROM espacios WHERE id = ?', [id]);
      return rows[0];
   }
 
}