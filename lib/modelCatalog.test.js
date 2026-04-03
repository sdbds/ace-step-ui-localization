import test from "node:test";
import assert from "node:assert/strict";

import {
  FALLBACK_DIT_MODELS,
  TRAINING_FALLBACK_DIT_MODELS,
  getModelDisplayName,
} from "./modelCatalog.js";

test("fallback dit models expose XL variants", () => {
  const modelIds = FALLBACK_DIT_MODELS.map((model) => model.id);

  assert.ok(modelIds.includes("acestep-v15-xl-base"));
  assert.ok(modelIds.includes("acestep-v15-xl-sft"));
  assert.ok(modelIds.includes("acestep-v15-xl-turbo"));
});

test("training fallback dit models expose XL variants", () => {
  const modelNames = TRAINING_FALLBACK_DIT_MODELS.map((model) => model.name);

  assert.ok(modelNames.includes("acestep-v15-xl-base"));
  assert.ok(modelNames.includes("acestep-v15-xl-sft"));
  assert.ok(modelNames.includes("acestep-v15-xl-turbo"));
});

test("display names use XL-specific labels", () => {
  assert.equal(getModelDisplayName("acestep-v15-xl-base"), "1.5BXL");
  assert.equal(getModelDisplayName("acestep-v15-xl-sft"), "1.5SXL");
  assert.equal(getModelDisplayName("acestep-v15-xl-turbo"), "1.5TXL");
});

test("display names cover training panel legacy variants", () => {
  assert.equal(getModelDisplayName("acestep-v15-base"), "1.5B");
  assert.equal(getModelDisplayName("acestep-v15-sft"), "1.5S");
  assert.equal(getModelDisplayName("acestep-v15-turbo"), "1.5T");
  assert.equal(getModelDisplayName("acestep-v15-turbo-shift1"), "1.5TS1");
  assert.equal(getModelDisplayName("acestep-v15-turbo-shift3"), "1.5TS3");
});
