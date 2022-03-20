const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a new rock', async () => {
    const newRock = {
      name: 'basalt',
      type: 'igneous',
    };

    const res = await request(app).post('/api/v1/rocks').send(newRock);

    expect(res.body).toEqual({ id: expect.any(String), ...newRock });
  });

  it('gets a list of rocks', async () => {
    const expected = [
      { id: '1', name: 'limestone', type: 'sedimentary' },
      { id: '2', name: 'gniess', type: 'granite' },
    ];

    const res = await request(app).get('/api/v1/rocks');

    expect(res.body).toEqual(expected);
  });

  it('updates a rocks info by id', async () => {
    const update = { name: 'sandstone', type: 'sedimentary' };

    const res = await request(app).patch('/api/v1/rocks/2').send(update);

    const expected = { id: '2', name: 'sandstone', type: 'sedimentary' };

    expect(res.body).toEqual(expected);
  });
});
