import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { act, cleanup, render } from '@testing-library/react';
import { ThemeProvider, useThemeContext } from './theme-provider';

let ctx: ReturnType<typeof useThemeContext>;
const Probe = () => {
  ctx = useThemeContext();
  return null;
};
const mount = () =>
  render(
    <ThemeProvider>
      <Probe />
    </ThemeProvider>
  );

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset.theme;
    document.body.removeAttribute('data-theme');
  });
  afterEach(cleanup);

  it('defaults to light with no saved or resolved theme', () => {
    mount();
    expect(ctx.theme).toBe('light');
  });

  it('uses the theme the inline script resolved onto <html>', () => {
    document.documentElement.dataset.theme = 'dark';
    mount();
    expect(ctx.theme).toBe('dark');
    expect(document.body.getAttribute('data-theme')).toBe('dark');
  });

  it('prefers a saved theme', () => {
    localStorage.setItem('theme', 'dark');
    document.documentElement.dataset.theme = 'light';
    mount();
    expect(ctx.theme).toBe('dark');
  });

  it('ignores invalid saved values', () => {
    localStorage.setItem('theme', '"><script>');
    mount();
    expect(ctx.theme).toBe('light');
  });

  it('persists and applies changes', () => {
    mount();
    act(() => ctx.setTheme('dark'));
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(document.body.getAttribute('data-theme')).toBe('dark');
    expect(document.documentElement.dataset.theme).toBe('dark');
  });
});
