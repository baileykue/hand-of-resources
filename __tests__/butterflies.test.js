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

  it('will create a butterfly', async () => {
    const newButterfly = {
      name: 'Brush-footed',
      type: 'Nymphalidae',
    };

    const res = await request(app)
      .post('/api/v1/butterflies')
      .send(newButterfly);

    console.log('res.body', res.body);

    expect(res.body).toEqual({ id: expect.any(String), ...newButterfly });
  });
});
