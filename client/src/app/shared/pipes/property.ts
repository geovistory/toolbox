import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'property',
    pure: false
})
export class PropertyPipe implements PipeTransform {
    transform(items: any[], pkProperty: string): any {
        if (!items || !pkProperty) {
            return items;
        }
        // filter items array, items which match and return true will be kept, false will be filtered out
        return items.filter(item => item.fk_property === pkProperty);
    }
}