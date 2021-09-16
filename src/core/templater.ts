export interface Templater {
  transform(file: string, args: Record<string, string>): string;
}
