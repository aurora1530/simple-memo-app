import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createToken, createShareLink } from '../src/lib/memo/token.js';
import { ORIGIN } from '../src/constant.js';

test('createToken returns base64 string of 32 bytes (length 44)', () => {
  const t = createToken();
  assert.equal(typeof t, 'string');
  assert.equal(t.length, 44);
  assert.match(t, /^[A-Za-z0-9+/=]+$/);
});

test('createToken returns unique tokens', () => {
  const set = new Set<string>();
  const tryCount = 1_000_000;
  for (let i = 0; i < tryCount; i++) {
    set.add(createToken());
  }
  assert.equal(set.size, tryCount);
});

test('createShareLink builds URL with origin and encoded token', () => {
  const token = 'a+b/c=';
  const link = createShareLink(token);
  assert.equal(link, `${ORIGIN}/share/view/${encodeURIComponent(token)}`);
});

