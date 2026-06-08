import path from 'path';
import { Project, Artifact } from './project.js';

export class ArtifactRegistry {
  private project: Project;

  constructor(project: Project) {
    this.project = project;
  }

  /**
   * 获取下游可读的上游产物列表 (Taxonomy 读取隔离)
   * @param fromStage 上游阶段 (e.g. 'storyboard')
   * @param toStage 下游阶段 (e.g. 'video_prompts')
   */
  public getReadableArtifacts(fromStage: string, toStage: string): Artifact[] {
    const manifest = this.project.readManifest();
    return manifest.artifacts.filter(art => {
      return (
        art.stage === fromStage &&
        art.kind === 'final' &&
        art.readable_by_downstream === true
      );
    });
  }

  /**
   * 验证写入路径是否在当前阶段的 Write Scope 范围内 (Write Scope 锁定)
   * @param stage 当前阶段 (e.g. 'storyboard')
   * @param filePath 尝试写入的文件路径
   */
  public validateWritePath(stage: string, filePath: string): boolean {
    const absoluteFilePath = path.isAbsolute(filePath)
      ? path.normalize(filePath)
      : path.normalize(path.resolve(this.project.projectPath, filePath));

    // 确保写入路径在当前项目目录下，防止跨项目泄漏
    if (!absoluteFilePath.startsWith(this.project.projectPath)) {
      throw new Error(`Permission Denied: Write path '${filePath}' lies outside the project directory.`);
    }

    const relativePath = path.relative(this.project.projectPath, absoluteFilePath);

    // Final 产物目录锁定：允许写入 outputs/
    if (relativePath.startsWith(`outputs${path.sep}`) || relativePath.startsWith('outputs/')) {
      return true;
    }

    // Preview / Draft / Review 产物目录锁定：只允许写入 details/<stage>/
    const expectedDetailPrefix = `details${path.sep}${stage}${path.sep}`;
    const expectedDetailPrefixSlash = `details/${stage}/`;
    if (relativePath.startsWith(expectedDetailPrefix) || relativePath.startsWith(expectedDetailPrefixSlash)) {
      return true;
    }

    // 允许特殊的配置文件更新（由 Engine 本身维护）
    if (
      relativePath === 'PROJECT_BOARD.md' ||
      relativePath === 'PROJECT_STATE.json' ||
      relativePath === 'artifacts.manifest.yaml'
    ) {
      return true;
    }

    throw new Error(
      `Write Scope Lock Violated: Stage '${stage}' is not allowed to write to '${filePath}'. ` +
      `Only 'outputs/' and 'details/${stage}/' are writable for this stage.`
    );
  }
}
