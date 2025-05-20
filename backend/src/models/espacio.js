import { db } from '../../config/db.js';

export class Espacio {
   static async getEspaciosFiltrados(filtros = {}) {
      let query = 'SELECT * FROM espacios WHERE 1=1';
      const params = [];

      if (filtros.nombre) {
         query += ' AND nombre LIKE ?';
         params.push(`%${filtros.nombre}%`);
      }

      if (filtros.capacidad_minima) {
         query += ' AND capacidad >= ?';
         params.push(parseInt(filtros.capacidad_minima));
      }

      if (filtros.estado) {
         query += ' AND estado = ?';
         params.push(filtros.estado);
      }

      const [rows] = await db.query(query, params);
      return rows;
   }

   static async getEspacioById(id) {
      const [rows] = await db.query('SELECT * FROM espacios WHERE id = ?', [id]);
      return rows[0];
   }

   static async createEspacio(espacioData) {
      const { nombre, propietario, capacidad, direccion, descripcion, estado, imagen } = espacioData;
      
      const query = `
         INSERT INTO espacios (nombre, propietario, capacidad, direccion, descripcion, estado, imagen)
         VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      
      const [result] = await db.query(query, [
         nombre,
         propietario,
         capacidad,
         direccion,
         descripcion,
         estado,
         imagen
      ]);

      return result.insertId;
   }

   static async tieneEventosActivos(espacioId) {
      const query = `
         SELECT COUNT(*) as count 
         FROM eventos 
         WHERE espacio_id = ? 
         AND fecha_inicio >= CURDATE() 
         AND cancelado = FALSE
      `;
      
      const [rows] = await db.query(query, [espacioId]);
      return rows[0].count > 0;
   }

   static async actualizarEspacio(espacioId, espacioData) {
      // Si se intenta cambiar el estado a CERRADO, verificar eventos activos
      
      console.log('espacioData:', espacioData);
      
      if (espacioData.estado === 'CERRADO') {
         const tieneEventos = await this.tieneEventosActivos(espacioId);
         if (tieneEventos) {
            throw new Error('No se puede cerrar el espacio porque tiene eventos activos');
         }
      }

      const camposPermitidos = ['nombre', 'propietario', 'capacidad', 'direccion', 'descripcion', 'estado', 'imagen'];
      const camposActualizar = {};
      
      // Filtrar solo los campos permitidos que vienen en espacioData
      for (const campo of camposPermitidos) {
         if (espacioData[campo] !== undefined) {
            camposActualizar[campo] = espacioData[campo];
         }
      }

      if (Object.keys(camposActualizar).length === 0) {
         return false;
      }

      const sets = Object.keys(camposActualizar).map(campo => `${campo} = ?`).join(', ');
      const valores = [...Object.values(camposActualizar), espacioId];

      const query = `
         UPDATE espacios 
         SET ${sets}
         WHERE id = ?
      `;
      
      const [result] = await db.query(query, valores);
      return result.affectedRows > 0;
   }
}