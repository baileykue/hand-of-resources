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

    expect(res.body).toEqual({ id: expect.any(String), ...newButterfly });
  });

  it('will get all butterflies', async () => {
    const expected = [
      { id: '1', name: 'tiger swallowtail', type: 'papilio glaucus' },
      { id: '2', name: 'monarch', type: 'danaus plexippus' },
    ];

    const res = await request(app).get('/api/v1/butterflies');

    expect(res.body).toEqual(expected);
  });
});
