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

  it('should get a chickens info by id', async () => {
    const expected = { id: '1', name: 'silkie', color: 'white' };

    const res = await request(app).get('/api/v1/chickens/1');
    expect(res.body).toEqual(expected);
  });
});
