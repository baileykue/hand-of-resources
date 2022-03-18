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

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM cats');
    return rows.map((row) => new Cat(row));
  }
};
