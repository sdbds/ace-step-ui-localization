/**
 * Training UI defaults and model-selection guards.
 */

/**
 * Training is activation-memory-bound on the current decoder path, so keep
 * checkpointing on by default and let advanced users opt out manually.
 */
export const DEFAULT_TRAINING_GRADIENT_CHECKPOINTING = true;

/**
 * Training always runs against the primary DiT handler on the API side.
 * Treat a model as "already switched" only when it is both loaded and the
 * current default model (slot 1 / primary handler).
 *
 * @param {{is_loaded?: boolean, is_default?: boolean} | undefined} modelInfo
 * @returns {boolean}
 */
export function isTrainingModelReadyOnPrimary(modelInfo) {
  return Boolean(modelInfo?.is_loaded && modelInfo?.is_default);
}
