import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { ValidationService } from "projects/app-toolbox/src/app/core/validation/validation.service";
import { indexBy, mapObjIndexed, omit, values } from 'ramda';
import { MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { debounceTime, first, mergeMap, takeUntil, map } from 'rxjs/operators';
import { FormPart } from './FormPart';
let CtrlTimeSpanDialogComponent = class CtrlTimeSpanDialogComponent {
    constructor(dialogRef, data, validationService, fb, c, p) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.validationService = validationService;
        this.fb = fb;
        this.c = c;
        this.p = p;
        this.destroy$ = new Subject();
        this.helpMode$ = new BehaviorSubject('hidden');
        this.mode$ = new BehaviorSubject('one-date');
        this.formDef$ = new BehaviorSubject(null);
        this.createFormGroup();
    }
    /**
   * Inits the formGroup used in template
   */
    createFormGroup() {
        const _this = this;
        this.formGroup = this.fb.group({}, {
            validator: (fg) => {
                if (_this.cName) {
                    const has = (ctrlName) => {
                        if (fg.get(_this.cName[ctrlName]).value)
                            return true;
                        else
                            return false;
                    };
                    // The begin of 'Earliest possible begin' must be earlier than the end of 'Latest possible end'
                    if (has('_152_outgoing') && has('_153_outgoing')) {
                        this.validationService.mustBeginBeforeEnd(_this.cName._152_outgoing, _this.f._152_outgoing.title, _this.cName._153_outgoing, _this.f._153_outgoing.title)(fg);
                    }
                    // The begin of 'Begin' must be earlier than the end of 'End'
                    if (has('_150_outgoing') && has('_151_outgoing')) {
                        this.validationService.mustBeginBeforeEnd(_this.cName._150_outgoing, _this.f._150_outgoing.title, _this.cName._151_outgoing, _this.f._151_outgoing.title)(fg);
                    }
                    // 'Begin' can't begin before 'Earliest possible begin'
                    if (has('_150_outgoing') && has('_152_outgoing')) {
                        this.validationService.cantBeginBeforeBegin(_this.cName._150_outgoing, _this.f._150_outgoing.title, _this.cName._152_outgoing, _this.f._152_outgoing.title)(fg);
                    }
                    // 'Begin' can't begin before 'At some time within'
                    if (has('_150_outgoing') && has('_72_outgoing')) {
                        this.validationService.cantBeginBeforeBegin(_this.cName._150_outgoing, _this.f._150_outgoing.title, _this.cName._72_outgoing, _this.f._72_outgoing.title)(fg);
                    }
                    // 'Latest possible end' can't end before 'End'
                    if (has('_153_outgoing') && has('_151_outgoing')) {
                        this.validationService.cantEndBeforeEnd(_this.cName._153_outgoing, _this.f._153_outgoing.title, _this.cName._151_outgoing, _this.f._151_outgoing.title)(fg);
                    }
                    // 'Latest possible end' can't end before 'End'
                    if (has('_153_outgoing') && has('_151_outgoing')) {
                        this.validationService.cantEndBeforeEnd(_this.cName._153_outgoing, _this.f._153_outgoing.title, _this.cName._151_outgoing, _this.f._151_outgoing.title)(fg);
                    }
                    // 'Latest possible end' can't end before  'Ongoing throughout'
                    if (has('_153_outgoing') && has('_71_outgoing')) {
                        this.validationService.cantEndBeforeEnd(_this.cName._153_outgoing, _this.f._153_outgoing.title, _this.cName._71_outgoing, _this.f._71_outgoing.title)(fg);
                    }
                    // 'At some time within' can't end before 'End'
                    if (has('_72_outgoing') && has('_151_outgoing')) {
                        this.validationService.cantEndBeforeEnd(_this.cName._72_outgoing, _this.f._72_outgoing.title, _this.cName._151_outgoing, _this.f._151_outgoing.title)(fg);
                    }
                    // 'At some time within' can't end before 'Ongoing throughout'
                    if (has('_72_outgoing') && has('_71_outgoing')) {
                        this.validationService.cantEndBeforeEnd(_this.cName._72_outgoing, _this.f._72_outgoing.title, _this.cName._71_outgoing, _this.f._71_outgoing.title)(fg);
                    }
                    // 'Ongoing throughout' can't begin before 'At some time within'
                    if (has('_71_outgoing') && has('_72_outgoing')) {
                        this.validationService.cantBeginBeforeBegin(_this.cName._71_outgoing, _this.f._71_outgoing.title, _this.cName._72_outgoing, _this.f._72_outgoing.title)(fg);
                    }
                    // 'Ongoing throughout' can't begin before 'Earliest possible begin'
                    if (has('_71_outgoing') && has('_152_outgoing')) {
                        this.validationService.cantBeginBeforeBegin(_this.cName._71_outgoing, _this.f._71_outgoing.title, _this.cName._152_outgoing, _this.f._152_outgoing.title)(fg);
                    }
                }
                // this.validationService.mustNotIntersect('endBeg', 'End of Begin', 'begEnd', 'Begin of End')(fg);
            }
        });
    }
    ngOnInit() {
        this.createTimeSpanForm();
        const hasOnly = (key, d) => {
            const others = omit(key.map(k => k.toString()), d);
            for (const i of values(others)) {
                if (i.julian_day)
                    return false;
            }
            return true;
        };
        if (!this.data.timePrimitives)
            this.mode$.next('one-date');
        else if (hasOnly([72], this.data.timePrimitives))
            this.mode$.next('one-date');
        else if (hasOnly([150, 151], this.data.timePrimitives))
            this.mode$.next('begin-end');
        else
            this.mode$.next('advanced');
    }
    /**
    * Takes the given statement sets and adds a form control for each of them.
    * Called by this class during ngOninit.
    */
    createTimeSpanForm() {
        const formParts$ = this.c.pipeSpecificFieldOfClass(50).pipe(debounceTime(20), map(fields => fields.filter(f => f.listDefinitions[0] && f.listDefinitions[0].listType.timePrimitive)), mergeMap(fields => {
            // empty formGroup
            Object.keys(this.formGroup.controls).forEach(key => this.formGroup.removeControl(key));
            // map the field to a form part
            return combineLatest(fields.map((field, i) => {
                let resultTemplate;
                let mergeDef;
                resultTemplate = {};
                // mergeDef = { target: ['te_statements'],  }
                return new FormPart(this.formGroup, field.label, field.listDefinitions, {
                    initSubfield: Object.assign({ listType: 'time-span' }, {}),
                    initTimeSpan: this.data.timePrimitives
                }, resultTemplate, mergeDef, false, this.p.state.default_language).this$;
            }));
        }));
        formParts$.pipe(takeUntil(this.destroy$)).subscribe(formParts => {
            const ar = formParts.map(f => ({
                key: '_' + f.items[0].formControlDef.listDefinition.property.pkProperty + '_outgoing',
                val: f
            }));
            this.f = mapObjIndexed((val, key, obj) => val.val, indexBy((f) => f.key, ar));
            this.cName = mapObjIndexed((val, key, obj) => val.items[0].formControlDef.formControlName, this.f);
            this.active = mapObjIndexed((val, key, obj) => false, this.f);
            this.properties = mapObjIndexed((val, key, obj) => val.key, indexBy((f) => f.val.listDefinitions[0].property.pkProperty.toString(), ar));
            const f = { formParts };
            this.formDef$.next(f);
        });
    }
    /**
   *
   * @param key key of the formPart to activate
   * @param inheritFrom array of keys of the formPart of which the value should be inherited
   * @param replace array of keys of formPart that should be removed, when this is added
   */
    activate(key) {
        const ctrl = this.getCtrl(key);
        // if this form control has no value yet
        if (!ctrl.value) {
            let inheritFrom;
            let replace;
            switch (key) {
                case '_72_outgoing':
                    inheritFrom = ['_152_outgoing', '_153_outgoing'];
                    replace = ['_152_outgoing', '_153_outgoing'];
                    break;
                case '_152_outgoing':
                    inheritFrom = ['_72_outgoing', '_153_outgoing'];
                    replace = ['_72_outgoing'];
                    break;
                case '_153_outgoing':
                    inheritFrom = ['_72_outgoing', '_152_outgoing'];
                    replace = ['_72_outgoing'];
                    break;
                case '_71_outgoing':
                    inheritFrom = ['_150_outgoing', '_151_outgoing'];
                    replace = ['_150_outgoing', '_151_outgoing'];
                    break;
                case '_150_outgoing':
                    inheritFrom = ['_71_outgoing', '_151_outgoing'];
                    replace = ['_71_outgoing'];
                    break;
                case '_151_outgoing':
                    inheritFrom = ['_71_outgoing', '_150_outgoing'];
                    replace = ['_71_outgoing'];
                    break;
                default:
                    break;
            }
            // inherit from
            for (const k of inheritFrom) {
                const val = this.getCtrl(k).value;
                if (val) {
                    ctrl.setValue(val);
                    break;
                }
            }
            // replace
            for (const k2 of replace) {
                if (this.getCtrl(k2).value) {
                    this.getCtrl(k2).setValue(null);
                }
            }
        }
    }
    getCtrl(key) {
        return this.formGroup.get(this.cName[key]);
    }
    onSubmit(pkEntity) {
        if (this.formGroup.valid) {
            const result = {};
            Object.keys(this.properties).forEach(pkProp => {
                const ctrlKey = this.properties[pkProp];
                const pkProperty = parseInt(pkProp);
                if (this.getCtrl(ctrlKey).value) {
                    result[pkProperty] = this.getCtrl(ctrlKey).value;
                }
            });
            if (this.data.beforeCloseCallback) {
                const x$ = this.data.beforeCloseCallback(result);
                x$.pipe(first(), takeUntil(this.destroy$)).subscribe(success => {
                    this.dialogRef.close();
                }, error => {
                });
            }
            else {
                this.dialogRef.close(result);
            }
        }
        else {
            Object.keys(this.formGroup.controls).forEach(key => {
                if (this.formGroup.get(key)) {
                    this.formGroup.get(key).markAsTouched();
                }
            });
        }
    }
    cancel() {
        this.dialogRef.close();
    }
    switchMode(m) {
        if (m === 'one-date') {
            ['_152_outgoing', '_153_outgoing', '_71_outgoing', '_150_outgoing', '_151_outgoing'].forEach(key => {
                this.getCtrl(key).setValue(null);
            });
            this.mode$.next('one-date');
        }
        else if (m === 'begin-end') {
            ['_72_outgoing', '_152_outgoing', '_153_outgoing', '_71_outgoing'].forEach(key => {
                this.getCtrl(key).setValue(null);
            });
            this.mode$.next('begin-end');
        }
        else {
            this.mode$.next('advanced');
        }
    }
    selectedTabChange(i) {
        const tabs = ['one-date', 'begin-end', 'advanced'];
        this.switchMode(tabs[i]);
    }
    setHelpMode(m) {
        this.helpMode$.next(m);
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
    getErrorMessage(formControl) {
        for (let propertyName in formControl.errors) {
            if (formControl.errors.hasOwnProperty(propertyName) && formControl.touched) {
                return ValidationService.getValidatorErrorMessage(propertyName, formControl.errors[propertyName]);
            }
        }
        return null;
    }
};
CtrlTimeSpanDialogComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-ctrl-time-span-dialog',
        templateUrl: './ctrl-time-span-dialog.component.html',
        styleUrls: ['./ctrl-time-span-dialog.component.scss']
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA))
], CtrlTimeSpanDialogComponent);
export { CtrlTimeSpanDialogComponent };
//# sourceMappingURL=ctrl-time-span-dialog.component.js.map