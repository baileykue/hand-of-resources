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

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM chickens');
    return rows.map((row) => new Chicken(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM chickens WHERE id=$1', [
      id,
    ]);
    return new Chicken(rows[0]);
  }

  static async updateById(id, attributes) {
    const currentChicken = await Chicken.getById(id);
    if (!currentChicken) return null;

    const updatedChicken = { ...currentChicken, ...attributes };
    const { name, color } = updatedChicken;

    const { rows } = await pool.query(
      'UPDATE chickens SET name=$2, color=$3 WHERE id=$1 RETURNING *;',
      [id, name, color]
    );
    return new Chicken(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM chickens WHERE id=$1 RETURNING *;',
      [id]
    );
    if (!rows[0]) return null;
    return new Chicken(rows[0]);
  }
};
