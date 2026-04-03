/**
 * Shared DiT model metadata used by frontend fallbacks and display badges.
 */

export const FALLBACK_DIT_MODELS = Object.freeze([
  { id: "acestep-v15-base", name: "acestep-v15-base" },
  { id: "acestep-v15-sft", name: "acestep-v15-sft" },
  { id: "acestep-v15-turbo", name: "acestep-v15-turbo" },
  { id: "acestep-v15-turbo-shift1", name: "acestep-v15-turbo-shift1" },
  { id: "acestep-v15-turbo-shift3", name: "acestep-v15-turbo-shift3" },
  { id: "acestep-v15-turbo-continuous", name: "acestep-v15-turbo-continuous" },
  { id: "acestep-v15-xl-base", name: "acestep-v15-xl-base" },
  { id: "acestep-v15-xl-sft", name: "acestep-v15-xl-sft" },
  { id: "acestep-v15-xl-turbo", name: "acestep-v15-xl-turbo" },
]);

export const TRAINING_FALLBACK_DIT_MODELS = Object.freeze(
  FALLBACK_DIT_MODELS.map(({ name }) => ({
    name,
    is_loaded: false,
    is_default: false,
  })),
);

const MODEL_DISPLAY_NAMES = Object.freeze({
  "acestep-v15-base": "1.5B",
  "acestep-v15-sft": "1.5S",
  "acestep-v15-turbo": "1.5T",
  "acestep-v15-turbo-shift1": "1.5TS1",
  "acestep-v15-turbo-shift3": "1.5TS3",
  "acestep-v15-turbo-continuous": "1.5TC",
  "acestep-v15-xl-base": "1.5BXL",
  "acestep-v15-xl-sft": "1.5SXL",
  "acestep-v15-xl-turbo": "1.5TXL",
});

/**
 * Return the short label shown in the UI for a given DiT model.
 *
 * @param {string | undefined} modelId
 * @param {string} [unknownLabel]
 * @returns {string}
 */
export function getModelDisplayName(modelId, unknownLabel = modelId || "") {
  if (!modelId) {
    return unknownLabel;
  }
  return MODEL_DISPLAY_NAMES[modelId] || unknownLabel;
}
