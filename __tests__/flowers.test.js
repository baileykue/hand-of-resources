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

  it('creates a new flower', async () => {
    const newFlower = {
      name: 'calla lily',
      type: 'araceae',
    };

    const res = await request(app).post('/api/v1/flowers').send(newFlower);

    expect(res.body).toEqual({ id: expect.any(String), ...newFlower });
  });

  it('gets a list of flowers', async () => {
    const expected = [
      { id: '1', name: 'calla lily', type: 'araceae' },
      { id: '2', name: 'sunflower', type: 'heliantheae' },
    ];

    const res = await request(app).get('/api/v1/flowers');

    expect(res.body).toEqual(expected);
  });

  it('should be able to delete a flower', async () => {
    const res = await request(app).delete('/api/v1/flowers/1');

    const flowers = await Flowers.getAll();
    expect(flowers).not.toContain(res.body);
  });
});
