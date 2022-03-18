const pool = require('../utils/pool');

module.exports = class Flower {
  id;
  name;
  type;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.type = row.type;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM flowers');
    return rows.map((row) => new Flower(row));
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM flowers WHERE id=$1 RETURNING *;',
      [id]
    );
    if (!rows[0]) return null;
    return new Flower(rows[0]);
  }
};
