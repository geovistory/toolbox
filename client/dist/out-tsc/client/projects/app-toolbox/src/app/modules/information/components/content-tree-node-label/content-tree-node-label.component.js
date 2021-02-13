import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { SysConfig } from 'projects/app-toolbox/src/app/core';
import { map } from 'rxjs/operators';
let ContentTreeNodeLabelComponent = class ContentTreeNodeLabelComponent {
    constructor(ap) {
        this.ap = ap;
    }
    ngOnInit() {
        if (this.node.datDigital) {
            if (this.node.datDigital.fk_system_type == SysConfig.PK_SYSTEM_TYPE__DIGITAL_TEXT) {
                const str = this.node.datDigital.string;
                this.digitalLabel = str.substring(0, 100) + (str.length > 100 ? '…' : '');
                this.icon = 'file-document';
            }
            else if (this.node.datDigital.fk_system_type == SysConfig.PK_SYSTEM_TYPE__DIGITAL_TABLE) {
                this.digitalLabel = 'Table ' + this.node.datDigital.pk_entity;
                this.icon = 'file-table';
            }
        }
        else {
            this.label$ = this.ap.streamEntityPreview(this.node.pkEntity).pipe(map(p => p.entity_label));
            this.icon = 'folder';
        }
    }
};
tslib_1.__decorate([
    Input()
], ContentTreeNodeLabelComponent.prototype, "node", void 0);
ContentTreeNodeLabelComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-content-tree-node-label',
        templateUrl: './content-tree-node-label.component.html',
        styleUrls: ['./content-tree-node-label.component.scss']
    })
], ContentTreeNodeLabelComponent);
export { ContentTreeNodeLabelComponent };
//# sourceMappingURL=content-tree-node-label.component.js.map