import path from 'path';

export class PathResolver {
  public relativePath: string;
  public absolutePath: string;

  constructor(relativeOrAbsolute: string) {
    if (path.isAbsolute(relativeOrAbsolute)) {
      this.absolutePath = relativeOrAbsolute;
      this.relativePath = path.relative(process.cwd(), this.absolutePath);
    } else {
      this.relativePath = relativeOrAbsolute;
      this.absolutePath = path.resolve(process.cwd(), this.relativePath);
    }
  }

  public relativePathTo(other: PathResolver): string {
    return path.relative(this.absolutePath, other.absolutePath);
  }
}
