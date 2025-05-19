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

   static async getEventosByCategoria(categoria) {
      const [rows] = await db.query('SELECT * FROM eventos WHERE categoria = ?', [categoria]);
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
         query += ' HAVING plazas_disponibles >= ?';
         params.push(filtros.plazas_minimas);
      }

      query += ' GROUP BY e.id';

      const [rows] = await db.query(query, params);
      return rows;
   }
}