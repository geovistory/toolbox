import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { FormGroupFactory } from '../core/form-group-factory';
let FormFactoryService = class FormFactoryService {
    constructor(fb, _injector) {
        this.fb = fb;
        this._injector = _injector;
    }
    create(config, destroy$) {
        const level = 0;
        const globalConfig = Object.assign({}, config, { fb: this.fb, destroy$, _injector: this._injector });
        return new FormGroupFactory(globalConfig, level).formFactory$;
    }
};
FormFactoryService = tslib_1.__decorate([
    Injectable()
], FormFactoryService);
export { FormFactoryService };
//# sourceMappingURL=form-factory.service.js.map