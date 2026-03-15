import test from "node:test";
import assert from "node:assert/strict";

import {
  REPAINT_MODE_OPTIONS,
  SUPPORTED_AUDIO_FORMATS,
  deriveRepaintModeFromStrength,
  syncRepaintStateOnModeChange,
} from "../generationControls.ts";

test("SUPPORTED_AUDIO_FORMATS exposes the same output formats as Gradio", () => {
  assert.deepEqual(
    SUPPORTED_AUDIO_FORMATS.map((format) => format.value),
    ["mp3", "flac", "opus", "aac", "wav", "wav32"],
  );
});

test("REPAINT_MODE_OPTIONS exposes all repaint modes", () => {
  assert.deepEqual(
    REPAINT_MODE_OPTIONS.map((mode) => mode.value),
    ["conservative", "balanced", "aggressive"],
  );
});

test("syncRepaintStateOnModeChange stores balanced strength when locking conservative/aggressive", () => {
  assert.deepEqual(syncRepaintStateOnModeChange("conservative", 0.65, 0.5), {
    strength: 0,
    strengthMemory: 0.65,
  });
  assert.deepEqual(syncRepaintStateOnModeChange("aggressive", 0.35, 0.5), {
    strength: 1,
    strengthMemory: 0.35,
  });
  assert.deepEqual(syncRepaintStateOnModeChange("balanced", 1, 0.42), {
    strength: 0.42,
    strengthMemory: 0.42,
  });
});

test("deriveRepaintModeFromStrength mirrors Gradio boundary behavior", () => {
  assert.equal(deriveRepaintModeFromStrength(0, "balanced"), "conservative");
  assert.equal(deriveRepaintModeFromStrength(1, "balanced"), "aggressive");
  assert.equal(deriveRepaintModeFromStrength(0.55, "aggressive"), "balanced");
  assert.equal(deriveRepaintModeFromStrength(0.55, "balanced"), "balanced");
});
