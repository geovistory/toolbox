import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatInput, MatMenuTrigger } from '@angular/material';
import { merge, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'core-table-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoreTableFilterComponent implements AfterViewInit {
  @Output() change: Observable<(text: string) => boolean>;

  @ViewChild(MatInput) input: MatInput;
  @ViewChild(MatMenuTrigger) menu: MatMenuTrigger;

  filter = new FormControl();
  operation = new FormControl();
  operations: any[];

  @HostBinding('class.has-value')
  get hasValue(): boolean {
    return !this.needsFilter || this.filter.value;
  }

  @HostBinding('class.show-trigger')
  get showTrigger(): boolean {
    return this.menu.menuOpen || this.hasValue;
  }

  get needsFilter(): boolean {
    return this.operation.value.needsFilter;
  }

  constructor() {
    this.operations = operations;
    this.operation.setValue(operations[0]);

    this.change = merge(
      this.filter.valueChanges,
      this.operation.valueChanges
    ).pipe(
      filter(value => value != null),
      map(() => ({
        fn: this.operation.value.predicate,
        b: simplify(this.filter.value),
      })),
      map(({ fn, b }) => (text: string) => fn(simplify(text), b))
    );
  }

  ngAfterViewInit() {
    this.menu.menuOpened.subscribe(() => this.input && this.input.focus());
  }
}

const contains = (a: string, b: string): boolean => a.includes(b);
const equals = (a: string, b: string): boolean => a === b;
const startsWith = (a: string, b: string): boolean => a.startsWith(b);
const endsWith = (a: string, b: string): boolean => a.endsWith(b);
const empty = (a: string): boolean => !a;
const notEmpty = (a: string): boolean => !!a;

const fnArgumentCount = (fn: Function): number =>
  fn
    .toString()
    .replace(/\((.*?)\) *?=>.*/, '$1') // for lambdas
    .replace(/function.*?\((.*?)\).*/, '$1') // for functions
    .split(',').length;

const operations = [
  contains,
  equals,
  startsWith,
  endsWith,
  empty,
  notEmpty,
].map(predicate => ({
  predicate,
  name: predicate.name,
  text: textify(predicate.name),
  needsFilter: fnArgumentCount(predicate) === 2,
}));


/**
 * Simplifies a string (trims and lowerCases)
 */
function simplify(s: string): string {
  return `${s}`.trim().toLowerCase();
}

/**
 * Transforms a camelCase string into a readable text format
 * @example textify('helloWorld!')
 * // Hello world!
 */
function textify(text: string) {
  return text
    .replace(/([A-Z])/g, char => ` ${char.toLowerCase()}`)
    .replace(/^([a-z])/, char => char.toUpperCase());
}
