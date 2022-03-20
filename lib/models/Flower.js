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

  static async insert({ name, type }) {
    const { rows } = await pool.query(
      'INSERT INTO flowers (name, type) VALUES ($1, $2) RETURNING *',
      [name, type]
    );
    return new Flower(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM flowers');
    return rows.map((row) => new Flower(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM flowers WHERE id=$1', [
      id,
    ]);
    return new Flower(rows[0]);
  }

  static async updateById(id, attributes) {
    const currentFlower = await Flower.getById(id);
    if (!currentFlower) return null;

    const updatedFlower = { ...currentFlower, ...attributes };
    const { name, type } = updatedFlower;

    const { rows } = await pool.query(
      'UPDATE flowers SET name=$2, type=$3 WHERE id=$1 RETURNING *;',
      [id, name, type]
    );
    return new Flower(rows[0]);
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
