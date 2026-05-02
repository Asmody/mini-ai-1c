import type { LLMProfile } from '../api/profiles';

export interface ModelMetadata {
    id: string;
    context_window?: number | null;
}

export const applySelectedModelMetadata = (
    profile: LLMProfile,
    model: ModelMetadata,
): LLMProfile => ({
    ...profile,
    model: model.id,
    context_window_override: model.context_window ?? profile.context_window_override,
});

export const applyFetchedModelMetadata = (
    profile: LLMProfile,
    model: ModelMetadata,
): LLMProfile => ({
    ...profile,
    context_window_override: model.context_window ?? profile.context_window_override,
});

