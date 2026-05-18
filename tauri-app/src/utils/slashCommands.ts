import type { SlashCommand } from '../types/settings';

export interface SlashCommandTemplateValues {
  code?: string | null;
  query?: string | null;
  diagnostics?: string | null;
}

export function resolveSlashCommandsForRuntime(
  savedCommands: SlashCommand[] | null | undefined,
  defaultCommands: SlashCommand[],
): SlashCommand[] {
  const saved = savedCommands?.length ? savedCommands : defaultCommands;
  const defaultsById = new Map(defaultCommands.map((command) => [command.id, command]));
  const seen = new Set<string>();

  const resolved = saved.map((command) => {
    seen.add(command.id);
    const defaults = defaultsById.get(command.id);
    return defaults && command.is_system
      ? { ...defaults, ...command, is_system: true }
      : command;
  });

  for (const command of defaultCommands) {
    if (command.is_system && !seen.has(command.id)) {
      resolved.push(command);
    }
  }

  return resolved;
}

export function buildPromptFromSlashCommandTemplate(
  template: string,
  values: SlashCommandTemplateValues,
): string {
  return template
    .split('{code}').join(values.code ?? '')
    .split('{query}').join(values.query ?? '')
    .split('{diagnostics}').join(values.diagnostics ?? '');
}

export function findSlashCommandById(
  commands: SlashCommand[],
  id: string,
): SlashCommand | undefined {
  return commands.find((command) => command.id === id);
}
