import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { SysConfig } from 'projects/app-toolbox/src/app/core';
let ContentTreeNodeTypeComponent = class ContentTreeNodeTypeComponent {
    constructor(p) {
        this.p = p;
    }
    ngOnInit() {
        if (this.node.datDigital) {
            if (this.node.datDigital.fk_system_type == SysConfig.PK_SYSTEM_TYPE__DIGITAL_TEXT) {
                this.type = 'Text';
            }
            else if (this.node.datDigital.fk_system_type == SysConfig.PK_SYSTEM_TYPE__DIGITAL_TABLE) {
                this.type = 'Table';
            }
        }
    }
};
tslib_1.__decorate([
    Input()
], ContentTreeNodeTypeComponent.prototype, "node", void 0);
ContentTreeNodeTypeComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-content-tree-node-type',
        templateUrl: './content-tree-node-type.component.html',
        styleUrls: ['./content-tree-node-type.component.scss']
    })
], ContentTreeNodeTypeComponent);
export { ContentTreeNodeTypeComponent };
//# sourceMappingURL=content-tree-node-type.component.js.map