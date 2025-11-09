# MERN Testing Application

A comprehensive MERN (MongoDB, Express, React, Node.js) stack application with extensive testing strategies including unit tests, integration tests, and end-to-end tests.

## 🚀 Features

- **Full-stack MERN application** with authentication
- **Comprehensive testing suite**:
  - Unit tests for utilities, components, and server functions
  - Integration tests for API endpoints and React components
  - End-to-end tests using Cypress
- **Error handling** with error boundaries and global error handlers
- **Code coverage** reporting with 70%+ threshold
- **Debugging tools** and logging strategies

## 📂 Project Structure

```
mern-testing/
├── client/                 # React front-end
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── tests/          # Client-side tests
│   │   │   ├── unit/       # Unit tests
│   │   │   └── integration/ # Integration tests
│   │   ├── utils/          # Utility functions
│   │   └── hooks/          # Custom React hooks
│   └── cypress/            # End-to-end tests
├── server/                 # Express.js back-end
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   └── middleware/     # Custom middleware
│   └── tests/              # Server-side tests
│       ├── unit/           # Unit tests
│       └── integration/    # Integration tests
├── jest.config.js          # Jest configuration
└── package.json            # Project dependencies
```

## 🛠️ Setup

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or Atlas account)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd mern-testing
```

2. Install all dependencies:

```bash
npm run install-all
```

3. Set up environment variables:

Create a `.env` file in the `server` directory:

```env
MONGODB_URI=mongodb://localhost:27017/mern-testing
JWT_SECRET=your-secret-key-here
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
```

Create a `.env` file in the `client` directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Set up the test database:

```bash
cd server
npm run setup-test-db
```

## 🧪 Running Tests

### Run All Tests

```bash
npm test
```

### Run Only Unit Tests

```bash
npm run test:unit
```

### Run Only Integration Tests

```bash
npm run test:integration
```

### Run Only End-to-End Tests

```bash
npm run test:e2e
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Run Tests with Coverage

```bash
cd client && npm test -- --coverage
cd server && npm test -- --coverage
```

## 🚀 Running the Application

### Development Mode

Run both client and server concurrently:

```bash
npm run dev
```

Or run them separately:

**Server:**

```bash
cd server
npm run dev
```

**Client:**

```bash
cd client
npm start
```

## 📝 Testing Strategies

### Unit Testing

- **Client**: Tests for utility functions, React components, and custom hooks
- **Server**: Tests for controllers, middleware, and utility functions
- **Coverage**: Minimum 70% code coverage required

### Integration Testing

- **API Endpoints**: Full request/response cycle testing with Supertest
- **Database Operations**: Tests with MongoDB Memory Server
- **React Components**: Component integration with API calls

### End-to-End Testing

- **User Flows**: Complete user journeys (registration, login, CRUD operations)
- **Navigation**: Route testing and navigation flows
- **Error Handling**: Edge cases and error scenarios

## 🐛 Debugging

### Server-Side Debugging

- **Logging**: Custom logger utility in `server/src/utils/logger.js`
- **Error Handling**: Global error handler middleware
- **MongoDB**: Connection logging and error handling

### Client-Side Debugging

- **Error Boundaries**: React error boundaries for component error handling
- **Browser DevTools**: Console logging and React DevTools
- **Network Monitoring**: Axios interceptors for request/response logging

## 📊 Code Coverage

The project maintains a minimum of 70% code coverage across:

- Branches
- Functions
- Lines
- Statements

View coverage reports:

```bash
# Client coverage
cd client && npm test -- --coverage

# Server coverage
cd server && npm test -- --coverage
```

## 🧩 Technologies Used

- **Frontend**: React 18, React Router, Axios
- **Backend**: Express.js, MongoDB, Mongoose
- **Testing**: Jest, React Testing Library, Supertest, Cypress
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Express Validator

## 📚 Additional Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [Cypress Documentation](https://docs.cypress.io/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Write tests for new features
4. Ensure all tests pass
5. Submit a pull request

## 📄 License

ISC
