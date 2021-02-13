var AppellationValidatorDirective_1, NoInvalidChildrenDirective_1, EqualValidator_1;
import * as tslib_1 from "tslib";
import { ValidationService } from './validation.service';
import { Directive, Input, NgModule, forwardRef } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { CommonModule } from '@angular/common';
let AppellationValidatorDirective = AppellationValidatorDirective_1 = class AppellationValidatorDirective {
    validate(control) {
        return ValidationService.appellationValidator()(control);
    }
};
tslib_1.__decorate([
    Input()
], AppellationValidatorDirective.prototype, "validAppellation", void 0);
AppellationValidatorDirective = AppellationValidatorDirective_1 = tslib_1.__decorate([
    Directive({
        selector: '[validAppellation]',
        providers: [{ provide: NG_VALIDATORS, useExisting: AppellationValidatorDirective_1, multi: true }]
    })
], AppellationValidatorDirective);
export { AppellationValidatorDirective };
let NoInvalidChildrenDirective = NoInvalidChildrenDirective_1 = class NoInvalidChildrenDirective {
    validate(control) {
        return ValidationService.noInvalidChildrenValidator(this.gvNoInvalidChildren)(control);
    }
};
tslib_1.__decorate([
    Input()
], NoInvalidChildrenDirective.prototype, "gvNoInvalidChildren", void 0);
NoInvalidChildrenDirective = NoInvalidChildrenDirective_1 = tslib_1.__decorate([
    Directive({
        selector: '[gvNoInvalidChildren]',
        providers: [{ provide: NG_VALIDATORS, useExisting: NoInvalidChildrenDirective_1, multi: true }]
    })
], NoInvalidChildrenDirective);
export { NoInvalidChildrenDirective };
let EqualValidator = EqualValidator_1 = class EqualValidator {
    constructor() { }
    get isReverse() {
        if (!this.reverse)
            return false;
        return this.reverse === 'true' ? true : false;
    }
    validate(c) {
        // self value
        let v = c.value;
        // control value
        let e = c.root.get(this.validateEqual);
        // value not equal
        if (e && v !== e.value && !this.isReverse)
            return {
                validateEqual: false
            };
        // value equal and reverse
        if (e && v === e.value && this.isReverse) {
            delete e.errors['validateEqual'];
            if (!Object.keys(e.errors).length)
                e.setErrors(null);
        }
        // value not equal and reverse
        if (e && v !== e.value && this.isReverse) {
            e.setErrors({ validateEqual: false });
        }
        return null;
    }
};
tslib_1.__decorate([
    Input('validateEqual')
], EqualValidator.prototype, "validateEqual", void 0);
tslib_1.__decorate([
    Input('reverse')
], EqualValidator.prototype, "reverse", void 0);
EqualValidator = EqualValidator_1 = tslib_1.__decorate([
    Directive({
        selector: '[validateEqual]',
        providers: [
            {
                provide: NG_VALIDATORS,
                useExisting: forwardRef(() => EqualValidator_1), multi: true
            }
        ]
    })
], EqualValidator);
export { EqualValidator };
const directives = [
    NoInvalidChildrenDirective,
    EqualValidator,
    AppellationValidatorDirective
];
let ValidationDirectivesModule = class ValidationDirectivesModule {
};
ValidationDirectivesModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule
        ],
        declarations: directives,
        exports: directives
    })
], ValidationDirectivesModule);
export { ValidationDirectivesModule };
//# sourceMappingURL=validation.directives.js.map