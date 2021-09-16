import { readdirSync, statSync } from 'fs';
import path from 'path';

export function getAllFiles(dir: string, allFiles: string[] = []): string[] {
  const files = readdirSync(dir);

  files.forEach(file => {
    const fileOrDir = path.join(dir, '/', file);
    if (statSync(fileOrDir).isDirectory()) {
      allFiles = getAllFiles(fileOrDir, allFiles);
    } else {
      allFiles.push(fileOrDir);
    }
  });

  return allFiles;
}
