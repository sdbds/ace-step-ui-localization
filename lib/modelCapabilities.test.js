import test from "node:test";
import assert from "node:assert/strict";

import {
  isBaseOnlyTaskType,
  isPureBaseDitModel,
  isTurboDitModel,
} from "./modelCapabilities.js";

test("XL base counts as a pure base model for frontend gating", () => {
  assert.equal(isPureBaseDitModel("acestep-v15-xl-base"), true);
});

test("base-only task detection remains explicit and case-insensitive", () => {
  assert.equal(isBaseOnlyTaskType("extract"), true);
  assert.equal(isBaseOnlyTaskType("Complete"), true);
  assert.equal(isBaseOnlyTaskType("text2music"), false);
});

test("pure base gating excludes turbo and sft descendants", () => {
  assert.equal(isPureBaseDitModel("acestep-v15-base"), true);
  assert.equal(isPureBaseDitModel("acestep-v15-xl-base"), true);
  assert.equal(isPureBaseDitModel("acestep-v15-base-sft"), false);
  assert.equal(isPureBaseDitModel("acestep-v15-base-turbo"), false);
});

test("turbo detection remains token-aware", () => {
  assert.equal(isTurboDitModel("acestep-v15-xl-turbo"), true);
  assert.equal(isTurboDitModel("turbocharged-model"), false);
});
