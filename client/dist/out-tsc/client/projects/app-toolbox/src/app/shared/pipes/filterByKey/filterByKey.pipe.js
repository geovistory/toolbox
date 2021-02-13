import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
/**
 * Filters item array produced by the KeysPipe by key.
 * If no filterKey provided, all items are returned, else only the item with the filterKey is returned
 * (within an array)
 */
let FilterByKeyPipe = class FilterByKeyPipe {
    transform(items, filterKey) {
        if (!filterKey)
            return items;
        else
            return items.filter(item => item.key === filterKey);
    }
};
FilterByKeyPipe = tslib_1.__decorate([
    Pipe({
        name: 'filterByKey'
    })
], FilterByKeyPipe);
export { FilterByKeyPipe };
//# sourceMappingURL=filterByKey.pipe.js.map