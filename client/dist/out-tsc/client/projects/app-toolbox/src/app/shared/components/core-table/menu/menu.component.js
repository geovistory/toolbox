import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component, Output } from '@angular/core';
import { Subject } from 'rxjs';
let CoreTableMenuComponent = class CoreTableMenuComponent {
    constructor() {
        this.clear = new Subject();
    }
};
tslib_1.__decorate([
    Output()
], CoreTableMenuComponent.prototype, "clear", void 0);
CoreTableMenuComponent = tslib_1.__decorate([
    Component({
        selector: 'core-table-menu',
        templateUrl: './menu.component.html',
        styleUrls: ['./menu.component.scss'],
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
], CoreTableMenuComponent);
export { CoreTableMenuComponent };
//# sourceMappingURL=menu.component.js.map