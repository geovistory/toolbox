import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abbreviate'
})
export class AbbreviatePipe implements PipeTransform {

  transform(input: string, ...args: unknown[]): string {
    if (!input) return ''
    let res = input.replace(/([^A-Za-z])/g, ' ');
    res = res.replace(/ +(?= )/g, '').trim();
    const parts = res.split(' ');

    if (parts.length === 1) {
      return parts[0].substring(0, 2)
    }

    res = parts
      .slice(0, 4)
      .map((p) => p[0])
      .join('');

    return res;
  }

}
