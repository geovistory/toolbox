import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
let VersionPickerComponent = class VersionPickerComponent {
    constructor() {
        this.versionChange = new EventEmitter();
    }
    ngOnChanges() {
        // set selectedItem
        if (this.versionList && this.selectedVersion) {
            this.selectedItem = this.versionList.find(v => v.entityVersion === this.selectedVersion);
        }
    }
    change() {
        this.versionChange.emit(this.selectedItem);
        this.selectVisible = false;
    }
};
tslib_1.__decorate([
    Input()
], VersionPickerComponent.prototype, "versionList", void 0);
tslib_1.__decorate([
    Input()
], VersionPickerComponent.prototype, "selectedVersion", void 0);
tslib_1.__decorate([
    Output()
], VersionPickerComponent.prototype, "versionChange", void 0);
VersionPickerComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-version-picker',
        templateUrl: './version-picker.component.html',
        styleUrls: ['./version-picker.component.scss']
    })
], VersionPickerComponent);
export { VersionPickerComponent };
//# sourceMappingURL=version-picker.component.js.map