import { readFileSync, writeFileSync } from 'fs';
import { TextTemplater } from './TextTemplater';

export class TemplateManager {
  private templater = new TextTemplater();

  run(filePath: string, args: Record<string, string>): void {
    const fileText = readFileSync(filePath, { encoding: 'utf-8' });
    const newText = this.templater.transform(fileText, args);
    writeFileSync(filePath, newText, { encoding: 'utf-8' });
  }
}
