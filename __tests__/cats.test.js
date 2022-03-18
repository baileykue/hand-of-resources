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

    const res = await request.agent(app).get('/api/v1/cats');

    expect(res.body).toEqual(expected);
  });
});
