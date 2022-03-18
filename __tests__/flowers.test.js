const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Flowers = require('../lib/models/Flower');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should be able to delete a flower', async () => {
    const res = await request(app).delete('/api/v1/flowers/1');

    const flowers = await Flowers.getAll();
    expect(flowers).not.toContain(res.body);
  });
});
