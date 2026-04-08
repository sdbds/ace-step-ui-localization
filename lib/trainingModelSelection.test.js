import test from "node:test";
import assert from "node:assert/strict";

import {
  DEFAULT_TRAINING_GRADIENT_CHECKPOINTING,
  isTrainingModelReadyOnPrimary,
} from "./trainingModelSelection.js";

test("training UI defaults gradient checkpointing on", () => {
  assert.equal(DEFAULT_TRAINING_GRADIENT_CHECKPOINTING, true);
});

test("primary-slot readiness requires loaded default model", () => {
  assert.equal(
    isTrainingModelReadyOnPrimary({ is_loaded: true, is_default: true }),
    true,
  );
  assert.equal(
    isTrainingModelReadyOnPrimary({ is_loaded: true, is_default: false }),
    false,
  );
  assert.equal(
    isTrainingModelReadyOnPrimary({ is_loaded: false, is_default: true }),
    false,
  );
  assert.equal(isTrainingModelReadyOnPrimary(undefined), false);
});
