import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmDialogComponent } from 'projects/app-toolbox/src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { Subject } from 'rxjs';
import { first, map, takeUntil } from 'rxjs/operators';
let EntityLabelConfigDialogComponent = class EntityLabelConfigDialogComponent {
    constructor(dialogRef, data, projectConfigApi, c, dialog) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.projectConfigApi = projectConfigApi;
        this.dialog = dialog;
        this.destroy$ = new Subject();
        this.labelParts = new FormArray([], [Validators.required]);
        this.loading = false;
        this.editing = false;
        this.shouldDeleteCustomConfig = false;
        this.submitted = false;
        if (!data.fkClass)
            console.error('You must provide a fkClass.');
        if (!data.fkProject)
            console.error('You must provide a fkProject.');
        this.form = new FormGroup({
            'labelParts': this.labelParts
        });
        this.fields$ = c.pipeBasicAndSpecificFields(data.fkClass).pipe(map(items => {
            return items
                .map(item => {
                const option = {
                    label: item.label,
                    id: fieldIdToString({
                        fkProperty: item.property.pkProperty,
                        isOutgoing: item.isOutgoing
                    }),
                    removedFromAllProfiles: item.allSubfieldsRemovedFromAllProfiles
                };
                return option;
            });
        }));
        this.classLabel$ = c.pipeClassLabel(data.fkClass);
    }
    ngOnInit() {
        this.loadConfig();
    }
    loadConfig() {
        this.loading = true;
        this.projectConfigApi.projectConfigControllerGetEntityLabelConfig(this.data.fkProject, this.data.fkClass)
            .pipe(first())
            .subscribe(res => {
            this.defaultConfig = res.defaultConfig;
            let customLabelParts;
            if (res.customConfig)
                customLabelParts = res.customConfig.config.labelParts;
            // if we have a custom config ...
            if (customLabelParts && customLabelParts.length) {
                // ...show custom config
                for (const labelPart of customLabelParts) {
                    this.addLabelPartFg(labelPart.field);
                }
                this.editing = true;
            }
            // else if we have a default config ...
            else if (this.defaultConfig) {
                // ... show default config
                this.setFormToDefault();
            }
            // else...
            else {
                // ... show empty form with one empty labelPart
                this.editing = true;
                this.addLabelPartFg();
            }
            this.loading = false;
        }, rej => {
            this.loading = false;
            // TODO handle error
        });
    }
    addLabelPartFg(field) {
        this.labelParts.push(this.createLabelPartFromGroup(field));
    }
    removeLabelPartFg(index) {
        this.labelParts.removeAt(index);
    }
    createLabelPartFromGroup(field) {
        let fieldId = null;
        let nrOfStmts = 1;
        if (field) {
            fieldId = fieldIdToString({ fkProperty: field.fkProperty, isOutgoing: field.isOutgoing });
            nrOfStmts = field.nrOfStatementsInLabel;
        }
        return new FormGroup({
            'fieldId': new FormControl(fieldId, [
                Validators.required
            ]),
            'nrOfStmts': new FormControl(nrOfStmts, [
                Validators.required,
                Validators.min(1),
                Validators.max(5)
            ])
        });
    }
    saveConfig() {
        this.submitted = true;
        if (this.shouldDeleteCustomConfig) {
            // delete config of this project
            this.deleteCustomConfig();
        }
        else if (this.form.valid) {
            this.loading = true;
            // generate ProEntityLabelConfig
            const result = this.generateCustomConfig();
            // upsert it
            this.upsertCustomConfig(result);
        }
        else {
            this.form.markAllAsTouched();
        }
    }
    deleteCustomConfig() {
        this.projectConfigApi.projectConfigControllerDeleteEntityLabelConfig(this.data.fkProject, this.data.fkClass)
            .pipe(takeUntil(this.destroy$))
            .subscribe(res => {
            this.classLabel$.pipe(first()).subscribe(classLabel => {
                const data = {
                    hideNoButton: true,
                    noBtnText: '',
                    yesBtnText: 'Acknowledge',
                    title: 'Success',
                    paragraphs: [
                        'The default Geovistory configuration has been restored.',
                        `In a few seconds, all your ${classLabel}-entities will be updated with new labels.`,
                    ]
                };
                this.dialog.open(ConfirmDialogComponent, { data });
                this.dialogRef.close();
            }, rej => { });
        });
    }
    upsertCustomConfig(result) {
        this.projectConfigApi.projectConfigControllerPostEntityLabelConfig(result)
            .pipe(takeUntil(this.destroy$))
            .subscribe(res => {
            this.classLabel$.pipe(first()).subscribe(classLabel => {
                const data = {
                    hideNoButton: true,
                    noBtnText: '',
                    yesBtnText: 'Acknowledge',
                    title: 'Success',
                    paragraphs: [
                        'Your configuration has been saved.',
                        `In a few seconds, all your ${classLabel}-entities will be updated with new labels.`,
                    ]
                };
                this.dialog.open(ConfirmDialogComponent, { data });
                this.dialogRef.close();
            });
        }, rej => { });
    }
    generateCustomConfig() {
        return {
            fk_class: this.data.fkClass,
            fk_project: this.data.fkProject,
            config: {
                labelParts: this.labelParts.value.map((item, i) => {
                    const fieldId = stringToFieldId(item.fieldId);
                    const labelPart = {
                        field: {
                            fkProperty: fieldId.fkProperty,
                            isOutgoing: fieldId.isOutgoing,
                            nrOfStatementsInLabel: item.nrOfStmts
                        },
                        ordNum: i
                    };
                    return labelPart;
                })
            }
        };
    }
    restoreDefault() {
        this.shouldDeleteCustomConfig = true;
        this.setFormToDefault();
    }
    setFormToDefault() {
        this.editing = false;
        this.removeLabelParts();
        // set default config to form vals and make all controls disabled
        for (const p of this.defaultConfig.config.labelParts) {
            this.addLabelPartFg(p.field);
        }
        this.form.disable();
    }
    createOwn() {
        this.shouldDeleteCustomConfig = false;
        this.editing = true;
        this.removeLabelParts();
        this.addLabelPartFg();
        this.form.enable();
    }
    removeLabelParts() {
        while (this.labelParts.controls.length > 0) {
            this.labelParts.removeAt(0);
        }
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
};
EntityLabelConfigDialogComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-entity-label-config-dialog',
        templateUrl: './entity-label-config-dialog.component.html',
        styleUrls: ['./entity-label-config-dialog.component.scss']
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA))
], EntityLabelConfigDialogComponent);
export { EntityLabelConfigDialogComponent };
function fieldIdToString(key) {
    return key.fkProperty + '_' + key.isOutgoing;
}
function stringToFieldId(str) {
    const [fkProperty, isOutgoing] = str.split('_');
    return { fkProperty: parseInt(fkProperty, 10), isOutgoing: isOutgoing === 'true' };
}
//# sourceMappingURL=entity-label-config-dialog.component.js.map