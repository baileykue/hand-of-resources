const pool = require('../utils/pool');

module.exports = class Cat {
  id;
  name;
  age;
  favoriteToy;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.age = row.age;
    this.favoriteToy = row.favorite_toy;
  }

  static async insert({ name, age, favoriteToy }) {
    const { rows } = await pool.query(
      'INSERT INTO cats (name, age, favorite_toy) VALUES ($1, $2, $3) RETURNING *',
      [name, age, favoriteToy]
    );
    return new Cat(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM cats');
    return rows.map((row) => new Cat(row));
  }
};
