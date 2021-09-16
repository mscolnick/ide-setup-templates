import { Templater } from '../templater';

export class TextTemplater implements Templater {
  transform(file: string, args: Record<string, string>): string {
    const newFile = file;
    for (const [placeholder, replacement] of Object.entries(args)) {
      newFile.replaceAll(placeholder, replacement);
    }
    return newFile;
  }
}
