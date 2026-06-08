import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { z } from 'zod';

// Zod Schemas
export const ArtifactKindSchema = z.enum(['preview', 'draft', 'review', 'final']);

export const ArtifactSchema = z.object({
  id: z.string(),
  stage: z.string(),
  kind: ArtifactKindSchema,
  role: z.string(),
  path: z.string(), // Relative to project root, e.g., 'outputs/storyboard_pack_001_cn.md'
  pack_id: z.string().optional(),
  language: z.string().optional(),
  schema: z.string().optional(),
  readable_by_downstream: z.boolean(),
  created_by_run: z.string().optional()
});

export type Artifact = z.infer<typeof ArtifactSchema>;

export const ManifestSchema = z.object({
  version: z.number(),
  project: z.string(),
  artifacts: z.array(ArtifactSchema)
});

export type Manifest = z.infer<typeof ManifestSchema>;

export interface MarkdownWithFrontmatter {
  frontmatter: Record<string, any>;
  body: string;
}

export function parseMarkdownFrontmatter(content: string): MarkdownWithFrontmatter {
  const match = content.match(/^---\r?\n([\s\S]+?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { frontmatter: {}, body: content };
  }
  try {
    const yamlContent = match[1];
    const body = match[2];
    const parsed = yaml.load(yamlContent) as Record<string, any>;
    return { frontmatter: parsed || {}, body };
  } catch (err) {
    throw new Error(`Failed to parse frontmatter YAML: ${(err as Error).message}`);
  }
}

export class Project {
  public projectPath: string;
  public projectSlug: string;

  constructor(projectPath: string) {
    this.projectPath = path.resolve(projectPath);
    this.projectSlug = path.basename(this.projectPath);
  }

  // Read manifest file
  public readManifest(): Manifest {
    const manifestPath = path.join(this.projectPath, 'artifacts.manifest.yaml');
    if (!fs.existsSync(manifestPath)) {
      return {
        version: 1,
        project: this.projectSlug,
        artifacts: []
      };
    }
    const content = fs.readFileSync(manifestPath, 'utf8');
    const parsed = yaml.load(content);
    return ManifestSchema.parse(parsed);
  }

  // Write manifest file
  public writeManifest(manifest: Manifest): void {
    const manifestPath = path.join(this.projectPath, 'artifacts.manifest.yaml');
    const parsed = ManifestSchema.parse(manifest);
    const content = yaml.dump(parsed);
    fs.writeFileSync(manifestPath, content, 'utf8');
  }

  // Register artifact
  public registerArtifact(artifact: Artifact): void {
    const manifest = this.readManifest();
    
    // Normalize path to be relative to projectPath for portability
    let relativePath = artifact.path;
    if (path.isAbsolute(relativePath)) {
      relativePath = path.relative(this.projectPath, relativePath);
    }
    const normalizedArtifact = { ...artifact, path: relativePath };

    // Remove if exists
    manifest.artifacts = manifest.artifacts.filter(a => a.id !== normalizedArtifact.id);
    manifest.artifacts.push(normalizedArtifact);
    
    this.writeManifest(manifest);
  }
}
