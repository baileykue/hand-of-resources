const pool = require('../utils/pool');

module.exports = class Butterfly {
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
      'INSERT INTO butterflies (name, type) VALUES ($1, $2) RETURNING *',
      [name, type]
    );
    return new Butterfly(rows[0]);
  }
};
