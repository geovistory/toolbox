import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { map, filter } from 'rxjs/operators';
let OntoClassInfoComponent = class OntoClassInfoComponent {
    constructor(p) {
        this.p = p;
    }
    ngOnInit() {
        const class$ = this.p.dfh$.class$.by_pk_class$.key(this.pkClass).pipe(filter(c => !!c));
        this.label$ = class$.pipe(map((c) => c.identifier_in_namespace));
        this.url = 'https://ontome.dataforhistory.org/class/' + this.pkClass;
    }
};
tslib_1.__decorate([
    Input()
], OntoClassInfoComponent.prototype, "pkClass", void 0);
OntoClassInfoComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-onto-class-info',
        templateUrl: './onto-class-info.component.html',
        styleUrls: ['./onto-class-info.component.scss']
    })
], OntoClassInfoComponent);
export { OntoClassInfoComponent };
//# sourceMappingURL=onto-class-info.component.js.map