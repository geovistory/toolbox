import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
  transform<T>(value: { [key: string]: T }, args?: string[]): { key: string, value: T }[] {
    const keys = [];
    for (const key in value) {
      if (value[key]) {
        keys.push({ key: key, value: value[key] });
      }
    }
    return keys;
  }
}
