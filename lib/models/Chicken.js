const pool = require('../utils/pool');

module.exports = class Chicken {
  id;
  name;
  color;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.color = row.color;
  }

  static async insert({ name, color }) {
    const { rows } = await pool.query(
      'INSERT INTO chickens (name, color) VALUES ($1, $2) RETURNING *',
      [name, color]
    );
    return new Chicken(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM chickens WHERE id=$1', [
      id,
    ]);
    return new Chicken(rows[0]);
  }
};
