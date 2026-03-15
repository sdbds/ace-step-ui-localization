import test from "node:test";
import assert from "node:assert/strict";

import { buildReleaseTaskBody } from "../src/routes/releaseTaskBody.ts";

test("buildReleaseTaskBody forwards repaint settings and expanded audio formats", () => {
  const body = buildReleaseTaskBody(
    {
      customMode: true,
      style: "dream pop",
      songDescription: "",
      lyrics: "hello world",
      instrumental: false,
      referenceAudioUrl: "/audio/ref.wav",
      sourceAudioUrl: "/audio/src.wav",
      thinking: true,
      loraLoaded: false,
      taskType: "repaint",
      repaintMode: "aggressive",
      repaintStrength: 1,
      audioFormat: "wav32",
      isFormatCaption: true,
      useAdg: true,
    },
    (audioUrl) => `resolved:${audioUrl}`,
  );

  assert.equal(body.prompt, "dream pop");
  assert.equal(body.audio_format, "wav32");
  assert.equal(body.task_type, "repaint");
  assert.equal(body.repaint_mode, "aggressive");
  assert.equal(body.repaint_strength, 1);
  assert.equal(body.is_format_caption, true);
  assert.equal(body.reference_audio_path, "resolved:/audio/ref.wav");
  assert.equal(body.src_audio_path, "resolved:/audio/src.wav");
});

test("buildReleaseTaskBody defaults repaint settings when ace-step-ui does not set them", () => {
  const body = buildReleaseTaskBody(
    {
      customMode: false,
      songDescription: "warm synthwave",
      style: "",
      lyrics: "",
      instrumental: true,
      loraLoaded: false,
    },
    (audioUrl) => audioUrl,
  );

  assert.equal(body.prompt, "warm synthwave");
  assert.equal(body.audio_format, "mp3");
  assert.equal(body.repaint_mode, "balanced");
  assert.equal(body.repaint_strength, 0.5);
  assert.equal(body.thinking, false);
  assert.equal(body.use_adg, false);
});
