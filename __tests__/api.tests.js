const request = require('supertest');
const app = require('../src/server'); // Make sure to export the app from server.js
const pool = require('../src/config/database');

beforeAll(async () => {
  // Set up test database or mock as needed
});

afterAll(async () => {
  await pool.end();
});

describe('API Endpoints', () => {
  it('GET /api/round/current should return current round', async () => {
    const res = await request(app)
      .get('/api/round/current')
      .query({ grp: 1, pbnr: 1 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('round');
  });

  it('POST /api/status should update status', async () => {
    const res = await request(app)
      .post('/api/status')
      .send({ group: 1, stage: 'contribution', change: 'change', pbnr: 1 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
  });

  it('POST /api/behavior/add should add behavior', async () => {
    const res = await request(app)
      .post('/api/behavior/add')
      .send({ type: 'contribution', grp: 1, pbnr: 1, contr: 10, RT: 1000, errors: 0 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
  });

  it('GET /api/behavior should get behavior', async () => {
    const res = await request(app)
      .get('/api/behavior')
      .query({ type: 'contribution', grp: 1, pbnr: 1, round: 1 });
    expect(res.statusCode).toBe(200);
    // Add more specific checks based on expected response structure
  });

  it('POST /api/earnings/calculate should calculate earnings', async () => {
    const res = await request(app)
      .post('/api/earnings/calculate')
      .send({ grp: 1, pbnr: 1, multiplier: 1.5 });
    expect(res.statusCode).toBe(200);
    // Add more specific checks based on expected response structure
  });

  it('GET /api/fin/stats should get final stats', async () => {
    const res = await request(app)
      .get('/api/fin/stats')
      .query({ grp: 1, pbnr: 1 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('received');
    expect(res.body).toHaveProperty('transferred');
    expect(res.body).toHaveProperty('earnings');
    expect(res.body).toHaveProperty('today');
  });
});