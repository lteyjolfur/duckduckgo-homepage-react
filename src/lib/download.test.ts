import { afterEach, describe, expect, it, vi } from 'vitest';
import { getDownloadText } from './download';

const withUserAgent = (ua: string) =>
  vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue(ua);

describe('getDownloadText', () => {
  afterEach(() => vi.restoreAllMocks());

  it.each([
    ['Mozilla/5.0 (Linux; Android 14; Pixel 8)', 'Android'],
    ['Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)', 'iOS'],
    ['Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'Windows'],
    ['Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', 'Mac'],
  ])('detects %s', (ua, expected) => {
    withUserAgent(ua);
    expect(getDownloadText()).toBe(expected);
  });

  it('returns null for unknown platforms', () => {
    withUserAgent('Mozilla/5.0 (X11; Linux x86_64)');
    expect(getDownloadText()).toBeNull();
  });
});
