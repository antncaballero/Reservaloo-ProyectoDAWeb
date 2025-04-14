import { db } from '../../config/db.js';

export class User {
   static async getAllUsers() {
      const [rows] = await db.query('SELECT * FROM usuarios');
      return rows;
   }

   static async getUserById(id) {
      const [rows] = await db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
      return rows[0];
   }
}