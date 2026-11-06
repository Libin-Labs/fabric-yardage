import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('two across', () => {
  assert.deepEqual(api.planFabric(140, 60, 100, 5), {
    across: 2,
    rows: 3,
    cutWidth: 60,
    cutLength: 100,
    totalLength: 300,
  });
});
test('seam allowances', () => {
  const p = api.planFabric(140, 60, 100, 4, 5);
  assert.equal(p.across, 2);
  assert.equal(p.totalLength, 220);
});
test('end allowance', () => {
  assert.equal(api.planFabric(100, 50, 20, 2, 0, 3).totalLength, 26);
});
test('exact edge fit', () => {
  assert.equal(api.planFabric(100, 100, 20, 2).across, 1);
});
test('fit rejection', () => {
  assert.throws(() => api.planFabric(50, 60, 100, 1));
});
test('domain validation', () => {
  assert.throws(() => api.planFabric(100, 50, 20, 0));
  assert.throws(() => api.planFabric(100, 50, 20, 1, -1));
  assert.throws(() => api.planFabric(0, 50, 20, 1));
});
