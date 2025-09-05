import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generatePasswordHash, verifyPassword } from '../src/lib/auth/password.js';

test('argon2 hash and verify works', async () => {
  const pw = 'Abc12345';
  const hash = await generatePasswordHash(pw);
  assert.ok(hash.length > 0);
  assert.notEqual(hash, pw);
  assert.equal(await verifyPassword(hash, pw), true);
  assert.equal(await verifyPassword(hash, 'wrongpass'), false);
});

