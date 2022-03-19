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

  it('creates a new chicken', async () => {
    const newChicken = {
      name: 'plymoth rock',
      color: 'silver tipped',
    };

    const res = await request(app).post('/api/v1/chickens').send(newChicken);

    expect(res.body).toEqual({ id: expect.any(String), ...newChicken });
  });

  it('gets a list of chickens', async () => {
    const expected = [
      { id: '1', name: 'silkie', color: 'white' },
      { id: '2', name: 'ameraucana', color: 'black-speckled' },
    ];

    const res = await request(app).get('/api/v1/chickens');

    expect(res.body).toEqual(expected);
  });

  it('should get a chickens info by id', async () => {
    const expected = { id: '1', name: 'silkie', color: 'white' };

    const res = await request(app).get('/api/v1/chickens/1');
    expect(res.body).toEqual(expected);
  });
});
