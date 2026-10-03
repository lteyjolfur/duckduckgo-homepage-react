import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { act, cleanup, renderHook } from '@testing-library/react';
import { ThemeProvider, useThemeContext } from './theme-provider';

const mount = () =>
  renderHook(() => useThemeContext(), { wrapper: ThemeProvider }).result;

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset.theme;
    document.body.removeAttribute('data-theme');
  });
  afterEach(cleanup);

  it('defaults to light with no saved or resolved theme', () => {
    const ctx = mount();
    expect(ctx.current.theme).toBe('light');
  });

  it('uses the theme the inline script resolved onto <html>', () => {
    document.documentElement.dataset.theme = 'dark';
    const ctx = mount();
    expect(ctx.current.theme).toBe('dark');
    expect(document.body.getAttribute('data-theme')).toBe('dark');
  });

  it('prefers a saved theme', () => {
    localStorage.setItem('theme', 'dark');
    document.documentElement.dataset.theme = 'light';
    const ctx = mount();
    expect(ctx.current.theme).toBe('dark');
  });

  it('ignores invalid saved values', () => {
    localStorage.setItem('theme', '"><script>');
    const ctx = mount();
    expect(ctx.current.theme).toBe('light');
  });

  it('persists and applies changes', () => {
    const ctx = mount();
    act(() => ctx.current.setTheme('dark'));
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(document.body.getAttribute('data-theme')).toBe('dark');
    expect(document.documentElement.dataset.theme).toBe('dark');
  });
});
