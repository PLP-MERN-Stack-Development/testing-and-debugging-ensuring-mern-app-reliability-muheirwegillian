# Week 6: Testing and Debugging – Ensuring MERN App Reliability

## 🚀 Objective

Implement comprehensive testing strategies for a MERN stack application, including unit testing, integration testing, and end-to-end testing, while also learning debugging techniques to identify and fix common issues.

## 📂 Tasks

### Task 1: Setting Up Testing Environment ✅

- [x] Configure Jest as the testing framework for both client and server
- [x] Set up testing utilities for React components (React Testing Library)
- [x] Configure Supertest for API endpoint testing
- [x] Create a separate test database for integration tests (MongoDB Memory Server)
- [x] Implement test scripts in package.json for running different types of tests

### Task 2: Unit Testing ✅

- [x] Write unit tests for utility functions in both client and server
- [x] Test React components in isolation using mocks for dependencies
- [x] Create tests for custom hooks in React
- [x] Test Express middleware functions
- [x] Achieve at least 70% code coverage for unit tests

### Task 3: Integration Testing ✅

- [x] Write tests for API endpoints using Supertest
- [x] Test database operations with a test database
- [x] Implement integration tests for React components that interact with APIs
- [x] Test authentication flows
- [x] Create tests for form submissions and data validation

### Task 4: End-to-End Testing ✅

- [x] Set up Cypress for end-to-end testing
- [x] Create tests for critical user flows (e.g., registration, login, CRUD operations)
- [x] Test navigation and routing
- [x] Implement tests for error handling and edge cases

### Task 5: Debugging Techniques ✅

- [x] Use logging strategies for server-side debugging
- [x] Implement error boundaries in React
- [x] Create a global error handler for the Express server
- [x] Implement performance monitoring and optimization

## 🧪 Expected Outcome

- ✅ A comprehensive test suite for a MERN stack application
- ✅ Well-documented testing strategies and methodologies
- ✅ High code coverage for critical application features
- ✅ Improved application reliability and stability
- ✅ Implementation of debugging tools and techniques

## 🛠️ Setup Instructions

1. **Clone the repository** (if using GitHub Classroom)

2. **Install dependencies**:

```bash
npm run install-all
```

3. **Set up environment variables**:

   - Create `.env` files in both `client` and `server` directories
   - See README.md for required variables

4. **Set up the test database**:

```bash
cd server
npm run setup-test-db
```

5. **Run the tests**:

```bash
# Run all tests
npm test

# Run only unit tests
npm run test:unit

# Run only integration tests
npm run test:integration

# Run only end-to-end tests
npm run test:e2e
```

## 📋 Test Coverage Requirements

- **Minimum Coverage**: 70% for all metrics
  - Branches: 70%
  - Functions: 70%
  - Lines: 70%
  - Statements: 70%

## 🎯 Key Features Implemented

### Testing Infrastructure

- Jest configuration for both client and server
- React Testing Library setup
- Supertest for API testing
- MongoDB Memory Server for isolated database tests
- Cypress for E2E testing

### Test Suites

- **Unit Tests**: Utilities, components, hooks, middleware
- **Integration Tests**: API endpoints, database operations, component-API interactions
- **E2E Tests**: User flows, navigation, error handling

### Debugging Tools

- Custom logger utility
- Error boundaries in React
- Global error handler middleware
- Request/response interceptors

## 📝 Notes

- All tests are located in their respective `tests` directories
- Test database uses MongoDB Memory Server for isolation
- E2E tests require the application to be running
- Coverage reports are generated automatically when running tests

## 🔍 Testing Best Practices

1. **Isolation**: Each test should be independent
2. **Mocking**: Use mocks for external dependencies
3. **Coverage**: Aim for high coverage but focus on critical paths
4. **Readability**: Write clear, descriptive test names
5. **Maintenance**: Keep tests updated with code changes
