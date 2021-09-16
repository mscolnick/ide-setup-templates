import { PathResolver } from '../path/resolver';
import { copySync } from 'fs-extra';
import { getAllFiles } from '../path/getAllFiles';
import { TemplateManager } from './templaters/TemplateManager';

export interface CopyTemplateOpts {
  /**
   * Path to monorepo root. Can be absolute or relative to cwd().
   */
  monorepoDir: string;
  /**
   * Path to template root. Can be absolute or relative to cwd().
   */
  templateDir: string;
  /**
   * Path to destination root. Can be absolute or relative to cwd().
   */
  destinationDir: string;
}

export function copyTemplate(opts: CopyTemplateOpts): void {
  const monorepoPath = new PathResolver(opts.monorepoDir);
  const templatePath = new PathResolver(opts.templateDir);
  const destinationPath = new PathResolver(opts.destinationDir);

  const args = {
    '<monorepoRootDir>': destinationPath.relativePathTo(monorepoPath),
  };

  // Copy to destination
  copySync(templatePath.absolutePath, destinationPath.absolutePath, { overwrite: true, recursive: true });

  // Collect files
  const files = getAllFiles(templatePath.absolutePath);

  // Write/transform
  const runner = new TemplateManager();
  for (const file of files) {
    runner.run(file, args);
  }
}
