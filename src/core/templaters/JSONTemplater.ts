import { Templater } from '../templater';

export class JSONTemplater implements Templater {
  transform(file: string, args: Record<string, string>): string {
    const json = JSON.parse(file);
    const result = this.transformJSON(json, args);
    return JSON.stringify(result);
  }

  transformJSON(json: JSON, args: Record<string, string>): JSON {
    return mapValuesDeep(json, value => {
      const newValue = value;
      for (const [placeholder, replacement] of Object.entries(args)) {
        newValue.replaceAll(placeholder, replacement);
      }
      return newValue;
    });
  }
}

function mapValuesDeep<T>(obj: T, fn: (value: string) => string): T {
  // base case
  if (typeof obj === 'string') {
    return fn(obj) as any;
  }
  if (Array.isArray(obj)) {
    return (obj as any).map((innerObj: any) => mapValuesDeep(innerObj, fn)) as any;
  }
  if (typeof obj === 'object') {
    return mapValues(obj, innerObj => mapValuesDeep(innerObj, fn)) as any;
  }
  return obj;
}

function mapValues<T>(obj: T, fn: (value: string, currentIndex: number) => string): T {
  return Object.entries(obj).reduce((a, [key, value], currentIndex) => {
    a[key] = fn(value, currentIndex);
    return a;
  }, {} as any) as T;
}
