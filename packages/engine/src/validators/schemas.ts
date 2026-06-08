import { z } from 'zod';

export const CommonFrontmatterSchema = z.object({
  schema: z.string(),
  stage: z.string()
});

// Specific stage frontmatter schemas
export const StoryboardFrontmatterSchema = CommonFrontmatterSchema.extend({
  pack_id: z.string(),
  language: z.string().optional(),
  director_style_id: z.string().optional()
});

export const VideoPromptsFrontmatterSchema = CommonFrontmatterSchema.extend({
  pack_id: z.string(),
  language: z.string().optional(),
  storyboard_pack_id: z.string().optional()
});

export const ScriptFrontmatterSchema = CommonFrontmatterSchema.extend({
  version: z.string().optional(),
  language: z.string().optional()
});

export const AudioFrontmatterSchema = CommonFrontmatterSchema.extend({
  pack_id: z.string().optional(),
  language: z.string().optional()
});

export const PerformanceFrontmatterSchema = CommonFrontmatterSchema.extend({
  pack_id: z.string().optional(),
  language: z.string().optional()
});

export const TopicGateFrontmatterSchema = CommonFrontmatterSchema.extend({
  version: z.string().optional()
});

export const PublishReviewFrontmatterSchema = CommonFrontmatterSchema.extend({
  version: z.string().optional()
});

export const FrontmatterSchemas: Record<string, z.ZodObject<any>> = {
  topic_gate: TopicGateFrontmatterSchema,
  script: ScriptFrontmatterSchema,
  performance: PerformanceFrontmatterSchema,
  audio: AudioFrontmatterSchema,
  storyboard: StoryboardFrontmatterSchema,
  video_prompts: VideoPromptsFrontmatterSchema,
  publish_review: PublishReviewFrontmatterSchema
};
