import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { map, filter } from 'rxjs/operators';
import { values } from 'ramda';
let OntoPropertyInfoComponent = class OntoPropertyInfoComponent {
    constructor(p) {
        this.p = p;
    }
    ngOnInit() {
        const property$ = this.p.dfh$.property$.by_pk_property$.key(this.pkProperty).pipe(filter(i => !!i));
        this.label$ = property$.pipe(map((c) => {
            return values(c)[0].identifier_in_namespace;
        }));
        this.url = 'https://ontome.dataforhistory.org/property/' + this.pkProperty;
    }
};
tslib_1.__decorate([
    Input()
], OntoPropertyInfoComponent.prototype, "pkProperty", void 0);
OntoPropertyInfoComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-onto-property-info',
        templateUrl: './onto-property-info.component.html',
        styleUrls: ['./onto-property-info.component.scss']
    })
], OntoPropertyInfoComponent);
export { OntoPropertyInfoComponent };
//# sourceMappingURL=onto-property-info.component.js.map