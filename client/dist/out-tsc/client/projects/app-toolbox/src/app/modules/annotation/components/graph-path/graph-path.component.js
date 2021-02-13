import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
;
let GraphPathComponent = class GraphPathComponent {
    constructor(p) {
        this.p = p;
        this.modes = ['mini', 'small', 'full'];
        this.onClick = new EventEmitter();
    }
    ngOnInit() {
        this.mode = this.mode ? this.mode : 'mini';
    }
    openEntityInNewTab(preview) {
        this.p.addEntityTab(preview.pk_entity, preview.fk_class);
    }
    openTextInNewTab(pkEntity) {
        this.p.addTextTab(pkEntity);
    }
    openTableInNewTab(pkEntity) {
        this.p.addTableTab(pkEntity);
    }
    openCellInNewTab(fkDigital, fkRow) {
        this.p.addTableTab(fkDigital, fkRow);
    }
};
tslib_1.__decorate([
    Input()
], GraphPathComponent.prototype, "data", void 0);
tslib_1.__decorate([
    Input()
], GraphPathComponent.prototype, "mode", void 0);
tslib_1.__decorate([
    Output()
], GraphPathComponent.prototype, "onClick", void 0);
GraphPathComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-graph-path',
        templateUrl: './graph-path.component.html',
        styleUrls: ['./graph-path.component.scss']
    })
], GraphPathComponent);
export { GraphPathComponent };
export function switchViewMode(mode) {
    const modes = ['mini', 'small', 'full'];
    const i = modes.indexOf(mode);
    const j = i < modes.length - 1 ? i + 1 : 0;
    return modes[j];
}
//# sourceMappingURL=graph-path.component.js.map