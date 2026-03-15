export interface ReleaseTaskBodyParams {
  customMode: boolean;
  songDescription?: string;
  style?: string;
  lyrics?: string;
  instrumental: boolean;
  thinking?: boolean;
  loraLoaded?: boolean;
  ditModel?: string;
  bpm?: number;
  keyScale?: string;
  timeSignature?: string;
  duration?: number;
  vocalLanguage?: string;
  inferenceSteps?: number;
  guidanceScale?: number;
  randomSeed?: boolean;
  seed?: number;
  batchSize?: number;
  audioCodes?: string;
  repaintingStart?: number;
  repaintingEnd?: number;
  instruction?: string;
  referenceAudioUrl?: string;
  sourceAudioUrl?: string;
  audioCoverStrength?: number;
  coverNoiseStrength?: number;
  enableNormalization?: boolean;
  normalizationDb?: number;
  latentShift?: number;
  latentRescale?: number;
  taskType?: string;
  trackName?: string;
  completeTrackClasses?: string[];
  isFormatCaption?: boolean;
  useAdg?: boolean;
  cfgIntervalStart?: number;
  cfgIntervalEnd?: number;
  inferMethod?: "ode" | "sde";
  shift?: number;
  audioFormat?: "mp3" | "flac" | "opus" | "aac" | "wav" | "wav32";
  useCotCaption?: boolean;
  useCotLanguage?: boolean;
  lmModel?: string;
  lmBackend?: "pt" | "vllm";
  lmTemperature?: number;
  lmCfgScale?: number;
  lmTopK?: number;
  lmTopP?: number;
  lmNegativePrompt?: string;
  lmRepetitionPenalty?: number;
  constrainedDecoding?: boolean;
  constrainedDecodingDebug?: boolean;
  repaintMode?: "conservative" | "balanced" | "aggressive";
  repaintStrength?: number;
}

export function buildReleaseTaskBody(
  params: ReleaseTaskBodyParams,
  resolveAudioPath: (audioUrl: string) => string,
): Record<string, unknown> {
  const thinking = params.loraLoaded ? false : (params.thinking || false);

  return {
    prompt: params.customMode ? params.style : (params.songDescription || params.style),
    lyrics: params.instrumental ? "" : (params.lyrics || ""),
    thinking,
    dit_model: params.ditModel,
    bpm: params.bpm,
    key_scale: params.keyScale,
    time_signature: params.timeSignature,
    audio_duration: params.duration,
    vocal_language: params.vocalLanguage || "en",
    inference_steps: params.inferenceSteps || 8,
    guidance_scale: params.guidanceScale || 10.0,
    use_random_seed: params.randomSeed !== false,
    seed: params.seed || -1,
    batch_size: params.batchSize || 1,
    audio_code_string: params.audioCodes,
    repainting_start: params.repaintingStart ?? 0.0,
    repainting_end: params.repaintingEnd,
    instruction: params.instruction,
    ...(params.referenceAudioUrl
      ? { reference_audio_path: resolveAudioPath(params.referenceAudioUrl) }
      : {}),
    ...(params.sourceAudioUrl
      ? { src_audio_path: resolveAudioPath(params.sourceAudioUrl) }
      : {}),
    audio_cover_strength: params.audioCoverStrength ?? 1.0,
    cover_noise_strength:
      params.taskType === "cover" ? (params.coverNoiseStrength ?? 0.0) : 0.0,
    enable_normalization:
      params.enableNormalization !== undefined ? params.enableNormalization : true,
    normalization_db:
      params.normalizationDb !== undefined ? params.normalizationDb : -1.0,
    latent_shift: params.latentShift || 0.0,
    latent_rescale: params.latentRescale || 1.0,
    task_type: params.taskType || "text2music",
    ...(params.trackName ? { track_name: params.trackName } : {}),
    ...(params.completeTrackClasses?.length
      ? { track_classes: params.completeTrackClasses }
      : {}),
    use_adg: params.loraLoaded ? false : (params.useAdg || false),
    cfg_interval_start: params.cfgIntervalStart || 0.0,
    cfg_interval_end: params.cfgIntervalEnd || 1.0,
    infer_method: params.inferMethod || "ode",
    shift: params.shift,
    audio_format: params.audioFormat || "mp3",
    repaint_mode: params.repaintMode || "balanced",
    repaint_strength: params.repaintStrength ?? 0.5,
    use_cot_caption: thinking ? params.useCotCaption !== false : false,
    use_cot_language: thinking ? params.useCotLanguage !== false : false,
    use_cot_metas: false,
    is_format_caption: params.isFormatCaption || false,
    ...(thinking
      ? {
          lm_model_path: params.lmModel || undefined,
          lm_backend: params.lmBackend || "pt",
          lm_temperature: params.lmTemperature,
          lm_cfg_scale: params.lmCfgScale,
          lm_top_k: params.lmTopK,
          lm_top_p: params.lmTopP,
          lm_negative_prompt: params.lmNegativePrompt,
          lm_repetition_penalty: params.lmRepetitionPenalty ?? 1.0,
        }
      : {}),
    constrained_decoding: params.constrainedDecoding !== false,
    constrained_decoding_debug: params.constrainedDecodingDebug || false,
  };
}
