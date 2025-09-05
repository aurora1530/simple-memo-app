import { test } from 'node:test';
import assert from 'node:assert/strict';
import { seal, unseal } from '../src/seal.js';

// Ensure password present for tests
process.env.DB_ENCRYPT_PASSWORD = process.env.DB_ENCRYPT_PASSWORD || 'test_password_0123456789_ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const fakeContext: any = {}; // env(c) uses process.env on Node runtime

test('seal then unseal returns original', async () => {
  const original = 'Hello, 世界! 👋';
  const sealed = await seal(fakeContext, original);
  assert.notEqual(sealed, original);
  const unsealed = await unseal(fakeContext, sealed);
  assert.equal(unsealed, original);
});

test('unseal should reject if data is tampered', async () => {
  const sealed = await seal(fakeContext, 'data');
  const tampered = sealed.slice(0, -1) + (sealed.slice(-1) === 'A' ? 'B' : 'A');
  await assert.rejects(() => unseal(fakeContext, tampered));
});

