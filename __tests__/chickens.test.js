const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Chicken = require('../lib/models/Chicken');

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

  it('should update the chickens info', async () => {
    const update = { color: 'peach puff' };

    const res = await request(app).patch('/api/v1/chickens/2').send(update);

    const expected = { id: '2', name: 'ameraucana', color: 'peach puff' };

    expect(res.body).toEqual(expected);
  });

  it('deletes a chicken', async () => {
    const res = await request(app).delete('/api/v1/chickens/1');

    const chickens = await Chicken.getAll();
    expect(chickens).not.toContain(res.body);
  });
});
