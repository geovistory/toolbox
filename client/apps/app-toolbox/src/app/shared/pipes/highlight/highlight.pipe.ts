import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'highlight',
    standalone: true
})
export class HighlightPipe implements PipeTransform {

  transform(value: any, args: any): any {
    if (args && value) {
      // value = String(value); // make sure its a string
      const startIndex = value.toLowerCase().indexOf(args.toLowerCase());
      if (startIndex != -1) {
        const endLength = args.length;
        const matchingString = value.substr(startIndex, endLength);
        return value.replace(matchingString, '<span class=\'gv-highlight\'>' + matchingString + '</span>');
      }

    }
    return value;
  }

}
