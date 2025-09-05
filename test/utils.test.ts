import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getGraphemeCount } from '../src/utils/string.js';
import { formatDate, TIMEZONE_OFFSET_JST } from '../src/utils/date.js';

test('getGraphemeCount counts by grapheme clusters', () => {
  assert.equal(getGraphemeCount('あいう'), 3);
  assert.equal(getGraphemeCount('👍🏽'), 1); // emoji + skin tone
  assert.equal(getGraphemeCount('👨‍👩‍👧‍👦'), 1); // family
  assert.equal(getGraphemeCount('🇯🇵'), 1); // flag
});

test('formatDate formats with timezone offset', () => {
  const date = new Date('2024-01-01T00:00:00Z');
  const s = formatDate(date, TIMEZONE_OFFSET_JST);
  assert.equal(s, '2024-01-01 09:00:00');
});

