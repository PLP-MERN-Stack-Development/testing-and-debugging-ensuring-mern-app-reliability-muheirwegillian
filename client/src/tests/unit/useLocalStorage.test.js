import { renderHook, act } from '@testing-library/react';
import { useLocalStorage, useAuthToken } from '../../hooks/useLocalStorage';

describe('useLocalStorage Hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial-value'));
    expect(result.current[0]).toBe('initial-value');
  });

  it('should return stored value from localStorage', () => {
    localStorage.setItem('test-key', JSON.stringify('stored-value'));
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial-value'));
    expect(result.current[0]).toBe('stored-value');
  });

  it('should update localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial-value'));

    act(() => {
      result.current[1]('new-value');
    });

    expect(result.current[0]).toBe('new-value');
    expect(localStorage.getItem('test-key')).toBe(JSON.stringify('new-value'));
  });

  it('should handle function updates', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 0));

    act(() => {
      result.current[1]((prev) => prev + 1);
    });

    expect(result.current[0]).toBe(1);
  });
});

describe('useAuthToken Hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return null token initially', () => {
    const { result } = renderHook(() => useAuthToken());
    expect(result.current[0]).toBe(null);
  });

  it('should set token in localStorage', () => {
    const { result } = renderHook(() => useAuthToken());

    act(() => {
      result.current[1]('test-token');
    });

    expect(result.current[0]).toBe('test-token');
    expect(localStorage.getItem('token')).toBe(JSON.stringify('test-token'));
  });

  it('should remove token from localStorage', () => {
    const { result } = renderHook(() => useAuthToken());

    act(() => {
      result.current[1]('test-token');
    });

    expect(result.current[0]).toBe('test-token');

    act(() => {
      result.current[2]();
    });

    expect(result.current[0]).toBe(null);
    expect(localStorage.getItem('token')).toBe(null);
  });
});

