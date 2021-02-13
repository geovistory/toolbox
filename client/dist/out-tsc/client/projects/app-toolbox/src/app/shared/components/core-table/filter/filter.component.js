import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component, HostBinding, Output, ViewChild, } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatMenuTrigger } from '@angular/material/menu';
import { merge } from 'rxjs';
import { filter, map } from 'rxjs/operators';
let CoreTableFilterComponent = class CoreTableFilterComponent {
    constructor() {
        this.filter = new FormControl();
        this.operation = new FormControl();
        this.operations = operations;
        this.operation.setValue(operations[0]);
        this.change = merge(this.filter.valueChanges, this.operation.valueChanges).pipe(filter(value => value != null), map(() => ({
            fn: this.operation.value.predicate,
            b: simplify(this.filter.value),
        })), map(({ fn, b }) => (text) => fn(simplify(text), b)));
    }
    get hasValue() {
        return !this.needsFilter || this.filter.value;
    }
    get showTrigger() {
        return this.menu.menuOpen || this.hasValue;
    }
    get needsFilter() {
        return this.operation.value.needsFilter;
    }
    ngAfterViewInit() {
        this.menu.menuOpened.subscribe(() => this.input && this.input.focus());
    }
};
tslib_1.__decorate([
    Output()
], CoreTableFilterComponent.prototype, "change", void 0);
tslib_1.__decorate([
    ViewChild(MatInput, { static: false })
], CoreTableFilterComponent.prototype, "input", void 0);
tslib_1.__decorate([
    ViewChild(MatMenuTrigger, { static: true })
], CoreTableFilterComponent.prototype, "menu", void 0);
tslib_1.__decorate([
    HostBinding('class.has-value')
], CoreTableFilterComponent.prototype, "hasValue", null);
tslib_1.__decorate([
    HostBinding('class.show-trigger')
], CoreTableFilterComponent.prototype, "showTrigger", null);
CoreTableFilterComponent = tslib_1.__decorate([
    Component({
        selector: 'core-table-filter',
        templateUrl: './filter.component.html',
        styleUrls: ['./filter.component.scss'],
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
], CoreTableFilterComponent);
export { CoreTableFilterComponent };
const contains = (a, b) => a.includes(b);
const equals = (a, b) => a === b;
const startsWith = (a, b) => a.startsWith(b);
const endsWith = (a, b) => a.endsWith(b);
const empty = (a) => !a;
const notEmpty = (a) => !!a;
const fnArgumentCount = (fn) => fn
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
function simplify(s) {
    return `${s}`.trim().toLowerCase();
}
/**
 * Transforms a camelCase string into a readable text format
 * @example textify('helloWorld!')
 * // Hello world!
 */
function textify(text) {
    return text
        .replace(/([A-Z])/g, char => ` ${char.toLowerCase()}`)
        .replace(/^([a-z])/, char => char.toUpperCase());
}
//# sourceMappingURL=filter.component.js.map