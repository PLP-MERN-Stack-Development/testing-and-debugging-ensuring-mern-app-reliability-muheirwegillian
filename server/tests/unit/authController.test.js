const { register, login } = require('../../src/controllers/authController');
const User = require('../../src/models/User');

describe('Auth Controller - Unit Tests', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      req.body = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      };

      await register(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: 'User registered successfully',
          token: expect.any(String),
          user: expect.objectContaining({
            name: 'Test User',
            email: 'test@example.com'
          })
        })
      );

      // Verify user was created in database
      const user = await User.findOne({ email: 'test@example.com' });
      expect(user).toBeTruthy();
      expect(user.name).toBe('Test User');
    });

    it('should return error if user already exists', async () => {
      // Create existing user
      await User.create({
        name: 'Existing User',
        email: 'existing@example.com',
        password: 'password123'
      });

      req.body = {
        name: 'New User',
        email: 'existing@example.com',
        password: 'password123'
      };

      await register(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'User already exists with this email'
        })
      );
    });
  });

  describe('login', () => {
    beforeEach(async () => {
      // Create a test user
      await User.create({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });
    });

    it('should login user with valid credentials', async () => {
      req.body = {
        email: 'test@example.com',
        password: 'password123'
      };

      await login(req, res, next);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: 'Login successful',
          token: expect.any(String),
          user: expect.objectContaining({
            email: 'test@example.com'
          })
        })
      );
    });

    it('should return error for invalid email', async () => {
      req.body = {
        email: 'wrong@example.com',
        password: 'password123'
      };

      await login(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Invalid email or password'
        })
      );
    });

    it('should return error for invalid password', async () => {
      req.body = {
        email: 'test@example.com',
        password: 'wrongpassword'
      };

      await login(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Invalid email or password'
        })
      );
    });
  });
});

