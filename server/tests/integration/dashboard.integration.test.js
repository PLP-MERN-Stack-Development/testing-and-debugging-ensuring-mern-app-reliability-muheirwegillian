const request = require('supertest');
const app = require('../../src/server');
const User = require('../../src/models/User');
const jwt = require('jsonwebtoken');

describe('Dashboard API Integration Tests', () => {
  let authToken;
  let testUser;

  beforeEach(async () => {
    // Create a test user and generate token
    testUser = await User.create({
      name: 'Dashboard Test User',
      email: 'dashboard@test.com',
      password: 'password123'
    });

    authToken = jwt.sign(
      { userId: testUser._id.toString() },
      process.env.JWT_SECRET || 'your-secret-key'
    );
  });

  describe('GET /api/dashboard', () => {
    it('should return dashboard data for authenticated user', async () => {
      const response = await request(app)
        .get('/api/dashboard')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.user).toBeDefined();
      expect(response.body.data.user.email).toBe('dashboard@test.com');
      expect(response.body.data.stats).toBeDefined();
    });

    it('should return 401 without token', async () => {
      const response = await request(app)
        .get('/api/dashboard')
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Authentication');
    });

    it('should return 401 with invalid token', async () => {
      const response = await request(app)
        .get('/api/dashboard')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    it('should return 401 with expired token', async () => {
      const expiredToken = jwt.sign(
        { userId: testUser._id.toString() },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '-1h' }
      );

      const response = await request(app)
        .get('/api/dashboard')
        .set('Authorization', `Bearer ${expiredToken}`)
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });
});

