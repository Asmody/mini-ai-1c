import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildPromptFromSlashCommandTemplate,
  resolveSlashCommandsForRuntime,
} from '../slashCommands';
import { DEFAULT_SLASH_COMMANDS, type SlashCommand } from '../../types/settings';

test('resolveSlashCommandsForRuntime preserves edited system command templates', () => {
  const saved: SlashCommand[] = DEFAULT_SLASH_COMMANDS.map((cmd) =>
    cmd.id === 'review'
      ? { ...cmd, template: 'CUSTOM REVIEW {code}' }
      : cmd,
  );

  const resolved = resolveSlashCommandsForRuntime(saved, DEFAULT_SLASH_COMMANDS);
  const review = resolved.find((cmd) => cmd.id === 'review');

  assert.equal(review?.template, 'CUSTOM REVIEW {code}');
});

test('resolveSlashCommandsForRuntime appends missing default system commands', () => {
  const saved = DEFAULT_SLASH_COMMANDS.filter((cmd) => cmd.id !== 'elaborate');

  const resolved = resolveSlashCommandsForRuntime(saved, DEFAULT_SLASH_COMMANDS);

  assert.ok(resolved.some((cmd) => cmd.id === 'elaborate'));
});

test('buildPromptFromSlashCommandTemplate replaces quick action placeholders everywhere', () => {
  const prompt = buildPromptFromSlashCommandTemplate(
    'Q={query}\nD={diagnostics}\nC1={code}\nC2={code}',
    {
      code: 'Procedure Test()',
      query: 'add guard',
      diagnostics: 'line 1: missing semicolon',
    },
  );

  assert.equal(
    prompt,
    'Q=add guard\nD=line 1: missing semicolon\nC1=Procedure Test()\nC2=Procedure Test()',
  );
});
