import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeNodePath, isBuiltinNodeLauncher } from '../mcpNodePath';

test('normalizeNodePath falls back to node for blank values', () => {
    assert.equal(normalizeNodePath(''), 'node');
    assert.equal(normalizeNodePath('   '), 'node');
    assert.equal(normalizeNodePath(null), 'node');
});

test('isBuiltinNodeLauncher accepts a configured portable node executable', () => {
    const portableNode = String.raw`C:\portable\node\node.exe`;

    assert.equal(isBuiltinNodeLauncher(portableNode, portableNode), true);
    assert.equal(isBuiltinNodeLauncher('node', portableNode), true);
    assert.equal(isBuiltinNodeLauncher('npx', portableNode), true);
    assert.equal(isBuiltinNodeLauncher(String.raw`C:\tools\other.exe`, portableNode), false);
});
