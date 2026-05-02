import test from 'node:test';
import assert from 'node:assert/strict';

import {
    applyFetchedModelMetadata,
    applySelectedModelMetadata,
} from '../llmProfileModelMetadata';

test('selecting a model preserves user configured max tokens', () => {
    const profile = {
        id: 'profile_1',
        name: 'LM Studio',
        provider: 'LMStudio',
        model: 'old-model',
        api_key_encrypted: 'set',
        base_url: 'http://localhost:1234/v1',
        max_tokens: 4096,
        context_window_override: 32768,
        temperature: 0.7,
    };

    const updated = applySelectedModelMetadata(profile, {
        id: 'new-model',
        context_window: 131072,
    });

    assert.equal(updated.model, 'new-model');
    assert.equal(updated.max_tokens, 4096);
    assert.equal(updated.context_window_override, 131072);
});

test('refreshing metadata preserves user configured max tokens', () => {
    const profile = {
        id: 'profile_1',
        name: 'Ollama',
        provider: 'Ollama',
        model: 'qwen3',
        api_key_encrypted: '',
        base_url: 'http://localhost:11434',
        max_tokens: 2048,
        context_window_override: 8192,
        temperature: 0.7,
    };

    const updated = applyFetchedModelMetadata(profile, {
        id: 'qwen3',
        context_window: 65536,
    });

    assert.equal(updated.max_tokens, 2048);
    assert.equal(updated.context_window_override, 65536);
});

