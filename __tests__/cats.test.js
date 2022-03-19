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

  it('should create a cat', async () => {
    const newCat = {
      name: 'Joey',
      age: 4,
      favoriteToy: 'laser pointer',
    };

    const res = await request(app).post('/api/v1/cats').send(newCat);

    expect(res.body).toEqual({ id: expect.any(String), ...newCat });
  });

  it('should be able to gather all the cats', async () => {
    const expected = [
      {
        id: expect.any(String),
        name: 'steven',
        age: 2,
        favoriteToy: 'ball of yarn',
      },
      {
        id: expect.any(String),
        name: 'calico',
        age: 7,
        favoriteToy: 'human feet',
      },
    ];

    const res = await request(app).get('/api/v1/cats');

    expect(res.body).toEqual(expected);
  });

  it('should get a cat by its id', async () => {
    const expected = {
      id: '1',
      name: 'steven',
      age: 2,
      favoriteToy: 'ball of yarn',
    };

    const res = await request(app).get('/api/v1/cats/1');
    expect(res.body).toEqual(expected);
  });
});
