const logger = require('../../src/utils/logger');

describe('Logger Utility', () => {
  let consoleLogSpy;
  let consoleErrorSpy;
  let consoleWarnSpy;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should log info messages', () => {
    logger.info('Test info message');
    expect(consoleLogSpy).toHaveBeenCalled();
    expect(consoleLogSpy.mock.calls[0][0]).toContain('[INFO]');
    expect(consoleLogSpy.mock.calls[0][0]).toContain('Test info message');
  });

  it('should log error messages', () => {
    logger.error('Test error message');
    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(consoleErrorSpy.mock.calls[0][0]).toContain('[ERROR]');
    expect(consoleErrorSpy.mock.calls[0][0]).toContain('Test error message');
  });

  it('should log warn messages', () => {
    logger.warn('Test warn message');
    expect(consoleWarnSpy).toHaveBeenCalled();
    expect(consoleWarnSpy.mock.calls[0][0]).toContain('[WARN]');
    expect(consoleWarnSpy.mock.calls[0][0]).toContain('Test warn message');
  });

  it('should log debug messages in development', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';
    
    logger.debug('Test debug message');
    expect(consoleLogSpy).toHaveBeenCalled();
    expect(consoleLogSpy.mock.calls[0][0]).toContain('[DEBUG]');
    
    process.env.NODE_ENV = originalEnv;
  });

  it('should not log debug messages in production', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
    
    logger.debug('Test debug message');
    expect(consoleLogSpy).not.toHaveBeenCalled();
    
    process.env.NODE_ENV = originalEnv;
  });
});

