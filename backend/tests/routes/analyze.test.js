const request = require('supertest');
const app = require('../../src/app');

describe('POST /api/analyze', () => {
  jest.setTimeout(30000);

  it('should return 400 when URL is missing', async () => {
    const res = await request(app).post('/api/analyze').send({});
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('should return 400 when URL is empty string', async () => {
    const res = await request(app).post('/api/analyze').send({ url: '' });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('should return 400 for invalid URL format', async () => {
    const res = await request(app).post('/api/analyze').send({ url: 'not-a-valid-url' });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('should return 400 for non-HTTP protocol', async () => {
    const res = await request(app).post('/api/analyze').send({ url: 'ftp://example.com' });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('should successfully analyze a valid URL', async () => {
    const res = await request(app).post('/api/analyze').send({ url: 'https://example.com' });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe(200);
  });

  it('should return 502 for non-existent domain', async () => {
    const res = await request(app).post('/api/analyze').send({ url: 'https://thisdomaindoesnotexist12345xyz.com' });
    expect(res.status).toBe(502);
    expect(res.body.success).toBe(false);
  });
});

describe('GET /api/health', () => {
  it('should return health status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
