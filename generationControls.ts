export const SUPPORTED_AUDIO_FORMATS = [
  { value: "mp3", labelKey: "mp3Smaller" },
  { value: "flac", labelKey: "flacLossless" },
  { value: "opus", labelKey: "opusEfficient" },
  { value: "aac", labelKey: "aacUniversal" },
  { value: "wav", labelKey: "wav16Bit" },
  { value: "wav32", labelKey: "wav32Float" },
] as const;

export type SupportedAudioFormat = (typeof SUPPORTED_AUDIO_FORMATS)[number]["value"];

export const REPAINT_MODE_OPTIONS = [
  { value: "conservative", labelKey: "repaintModeConservative" },
  { value: "balanced", labelKey: "repaintModeBalanced" },
  { value: "aggressive", labelKey: "repaintModeAggressive" },
] as const;

export type RepaintMode = (typeof REPAINT_MODE_OPTIONS)[number]["value"];

interface RepaintState {
  strength: number;
  strengthMemory: number;
}

export function syncRepaintStateOnModeChange(
  mode: RepaintMode,
  currentStrength: number,
  strengthMemory: number,
): RepaintState {
  const nextMemory =
    currentStrength > 0 && currentStrength < 1 ? currentStrength : strengthMemory;

  if (mode === "conservative") {
    return { strength: 0, strengthMemory: nextMemory };
  }

  if (mode === "aggressive") {
    return { strength: 1, strengthMemory: nextMemory };
  }

  return { strength: strengthMemory, strengthMemory };
}

export function deriveRepaintModeFromStrength(
  strength: number,
  currentMode: RepaintMode,
): RepaintMode {
  if (strength === 0) {
    return "conservative";
  }

  if (strength === 1) {
    return "aggressive";
  }

  if (currentMode !== "balanced") {
    return "balanced";
  }

  return currentMode;
}
