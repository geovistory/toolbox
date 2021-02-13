import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
let HighlightPipe = class HighlightPipe {
    transform(value, args) {
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
};
HighlightPipe = tslib_1.__decorate([
    Pipe({
        name: 'highlight'
    })
], HighlightPipe);
export { HighlightPipe };
//# sourceMappingURL=highlight.pipe.js.map