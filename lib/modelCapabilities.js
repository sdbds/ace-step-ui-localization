/**
 * Shared frontend helpers for deriving DiT model capabilities from model ids.
 */

function normalizeModelId(modelId) {
  if (typeof modelId !== "string") {
    return "";
  }
  return modelId.trim().toLowerCase();
}

function hasDelimitedToken(modelId, token) {
  const normalizedModelId = normalizeModelId(modelId);
  const normalizedToken = normalizeModelId(token);

  if (!normalizedModelId || !normalizedToken) {
    return false;
  }

  const escapedToken = normalizedToken.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`(^|[\\\\/._-])${escapedToken}($|[\\\\/._-])`);
  return pattern.test(normalizedModelId);
}

/**
 * Return whether the current DiT model is a turbo-family model.
 *
 * @param {string | undefined | null} modelId
 * @returns {boolean}
 */
export function isTurboDitModel(modelId) {
  return hasDelimitedToken(modelId, "turbo");
}

/**
 * Return whether the current DiT model belongs to the pure base family.
 *
 * This intentionally excludes turbo and sft descendants so base-only UI
 * affordances only unlock for actual base-capability models such as
 * `acestep-v15-base` and `acestep-v15-xl-base`.
 *
 * @param {string | undefined | null} modelId
 * @returns {boolean}
 */
export function isPureBaseDitModel(modelId) {
  return (
    hasDelimitedToken(modelId, "base") &&
    !hasDelimitedToken(modelId, "turbo") &&
    !hasDelimitedToken(modelId, "sft")
  );
}

/**
 * Return whether the task type requires pure base-model capabilities.
 *
 * @param {string | undefined | null} taskType
 * @returns {boolean}
 */
export function isBaseOnlyTaskType(taskType) {
  const normalizedTaskType = normalizeModelId(taskType);
  return ["extract", "lego", "complete"].includes(normalizedTaskType);
}
