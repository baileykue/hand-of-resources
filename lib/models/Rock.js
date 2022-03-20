const pool = require('../utils/pool');

module.exports = class Rock {
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
      'INSERT INTO rocks (name, type) VALUES ($1, $2) RETURNING *',
      [name, type]
    );
    return new Rock(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM rocks');
    return rows.map((row) => new Rock(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM rocks WHERE id=$1', [id]);
    return new Rock(rows[0]);
  }

  static async updateById(id, attributes) {
    const currentRock = Rock.getById(id);
    if (!currentRock) return null;

    const updatedRock = { ...currentRock, ...attributes };
    const { name, type } = updatedRock;

    const { rows } = await pool.query(
      'UPDATE rocks SET name=$2, type=$3 WHERE id=$1 RETURNING *',
      [id, name, type]
    );
    return new Rock(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM rocks WHERE id=$1 RETURNING *;',
      [id]
    );
    if (!rows[0]) return null;
    return new Rock(rows[0]);
  }
};
