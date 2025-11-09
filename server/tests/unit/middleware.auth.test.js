const jwt = require('jsonwebtoken');
const { authenticate } = require('../../src/middleware/auth');
const User = require('../../src/models/User');

describe('Auth Middleware', () => {
  let req, res, next;

  beforeEach(async () => {
    req = {
      headers: {},
      user: null
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();

    // Create a test user
    const user = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });
    req.testUser = user;
  });

  it('should authenticate user with valid token', async () => {
    const token = jwt.sign(
      { userId: req.testUser._id.toString() },
      process.env.JWT_SECRET || 'your-secret-key'
    );
    req.headers.authorization = `Bearer ${token}`;

    await authenticate(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.user).toBeTruthy();
    expect(req.user.email).toBe('test@example.com');
  });

  it('should return 401 if no token provided', async () => {
    await authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: 'Authentication required'
      })
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 if token is invalid', async () => {
    req.headers.authorization = 'Bearer invalid-token';

    await authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: 'Invalid token'
      })
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 if user not found', async () => {
    const token = jwt.sign(
      { userId: '507f1f77bcf86cd799439011' }, // Non-existent user ID
      process.env.JWT_SECRET || 'your-secret-key'
    );
    req.headers.authorization = `Bearer ${token}`;

    await authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: 'User not found'
      })
    );
    expect(next).not.toHaveBeenCalled();
  });
});

