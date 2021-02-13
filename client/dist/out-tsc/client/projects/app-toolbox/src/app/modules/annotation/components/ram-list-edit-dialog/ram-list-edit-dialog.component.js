import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { PropertiesTreeService } from 'projects/app-toolbox/src/app/modules/base/components/properties-tree/properties-tree.service';
import { DfhConfig } from "@kleiolab/lib-config";
import { BehaviorSubject } from 'rxjs';
const fieldBase = {
    label: 'at reference',
    ontoInfoUrl: '[ontoInfoUrl]',
    ontoInfoLabel: '[ontoInfoLabel]',
    property: {
        pkPropertyOfProperty: DfhConfig.P_O_P_GEOV_HAS_REFERENCE
    },
    isOutgoing: true,
    identityDefiningForSource: false,
    identityDefiningForTarget: false,
    sourceClass: undefined,
    sourceClassLabel: undefined,
    targetMaxQuantity: -1,
    targetMinQuantity: undefined,
    sourceMaxQuantity: undefined,
    sourceMinQuantity: undefined,
    isHasTypeField: false
};
const listDef = Object.assign({}, fieldBase, { listType: { langString: 'true' }, targetClass: 657, targetClassLabel: 'Reference', removedFromAllProfiles: false });
/**
 * Field at reference, property of property
 * that indicates where something was written
 */
export const fieldAtReferencePoP = Object.assign({}, fieldBase, { targetClasses: [657], placeOfDisplay: {}, allSubfieldsRemovedFromAllProfiles: false, listDefinitions: [
        listDef
    ], fieldConfig: undefined, isSpecialField: false });
let RamListEditDialogComponent = class RamListEditDialogComponent {
    constructor(t, dialogRef, data) {
        this.t = t;
        this.dialogRef = dialogRef;
        this.data = data;
        this.readonly$ = new BehaviorSubject(false);
        this.showOntoInfo$ = new BehaviorSubject(false);
        this.fieldDefinition = fieldAtReferencePoP;
    }
    ngOnInit() {
    }
};
RamListEditDialogComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-ram-list-edit-dialog',
        templateUrl: './ram-list-edit-dialog.component.html',
        styleUrls: ['./ram-list-edit-dialog.component.scss'],
        providers: [
            PropertiesTreeService
        ]
    }),
    tslib_1.__param(2, Inject(MAT_DIALOG_DATA))
], RamListEditDialogComponent);
export { RamListEditDialogComponent };
//# sourceMappingURL=ram-list-edit-dialog.component.js.map