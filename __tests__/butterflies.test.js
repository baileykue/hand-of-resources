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

  it('will get a single butterfly from the table', async () => {
    const expected = { id: '2', name: 'monarch', type: 'danaus plexippus' };

    const res = await request(app).get('/api/v1/butterflies/2');

    expect(res.body).toEqual(expected);
  });

  it('will update a butterflies info', async () => {
    const update = { name: 'Moss Elfin' };

    const res = await request(app).patch('/api/v1/butterflies/1').send(update);

    const expected = {
      id: '1',
      name: 'Moss Elfin',
      type: 'papilio glaucus',
    };

    expect(res.body).toEqual(expected);
  });
});
