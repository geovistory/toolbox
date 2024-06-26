import { Pipe, PipeTransform } from '@angular/core';

/**
 * Filters item array produced by the KeysPipe by key.
 * If no filterKey provided, all items are returned, else only the item with the filterKey is returned 
 * (within an array) 
 */
@Pipe({
    name: 'filterByKey',
    standalone: true
})
export class FilterByKeyPipe implements PipeTransform {

  transform<T>(items: { key: string, value: T }[], filterKey: string): { key: string, value: T }[] {

    if (!filterKey) return items;

    else return items.filter(item => item.key === filterKey);
  }

}
