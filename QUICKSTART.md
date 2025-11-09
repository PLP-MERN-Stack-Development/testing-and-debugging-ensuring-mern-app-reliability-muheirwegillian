# Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### 1. Install Dependencies

```bash
npm run install-all
```

### 2. Set Up Environment Variables

**Server** (`server/.env`):

```env
MONGODB_URI=mongodb://localhost:27017/mern-testing
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
```

**Client** (`client/.env`):

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# macOS (if installed via Homebrew)
brew services start mongodb-community

# Or use MongoDB Atlas connection string in .env
```

### 4. Run Tests

```bash
# All tests
npm test

# Unit tests only
npm run test:unit

# Integration tests only
npm run test:integration

# E2E tests (requires app to be running)
npm run test:e2e
```

### 5. Run the Application

```bash
# Run both client and server
npm run dev

# Or separately:
# Terminal 1 - Server
cd server && npm run dev

# Terminal 2 - Client
cd client && npm start
```

## 📋 Test Commands Cheat Sheet

| Command                    | Description                |
| -------------------------- | -------------------------- |
| `npm test`                 | Run all tests              |
| `npm run test:unit`        | Unit tests only            |
| `npm run test:integration` | Integration tests only     |
| `npm run test:e2e`         | End-to-end tests           |
| `npm run test:watch`       | Watch mode for development |

## 🧪 Test Coverage

View coverage reports:

```bash
cd client && npm test -- --coverage
cd server && npm test -- --coverage
```

## 🐛 Common Issues

### MongoDB Connection Error

- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- For tests, MongoDB Memory Server is used automatically

### Port Already in Use

- Change `PORT` in `server/.env`
- Update `REACT_APP_API_URL` in `client/.env` accordingly

### Test Failures

- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Ensure all environment variables are set
- Check that MongoDB is accessible (for integration tests)

## 📚 Next Steps

1. Review the test files to understand testing patterns
2. Add your own features and corresponding tests
3. Explore Cypress E2E tests in `client/cypress/e2e/`
4. Check coverage reports to identify untested code

## 💡 Tips

- Use `npm run test:watch` during development
- E2E tests require the app to be running (`npm run dev`)
- Check `README.md` for detailed documentation
- Review `Week6-Assignment.md` for assignment requirements
