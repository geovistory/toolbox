import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Output,
  ViewChild,
} from '@angular/core';
import { UntypedFormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatMenuTrigger, MatMenuModule } from '@angular/material/menu';
import { merge, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { NgFor, NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'core-table-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatMenuModule,
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        NgFor,
        MatOptionModule,
        NgIf,
        MatInputModule,
        MatIconModule,
    ],
})
export class CoreTableFilterComponent implements AfterViewInit {
  @Output() change: Observable<(text: string) => boolean>;

  @ViewChild(MatInput) input: MatInput;
  @ViewChild(MatMenuTrigger, { static: true }) menu: MatMenuTrigger;

  filter = new UntypedFormControl();
  operation = new UntypedFormControl();
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
