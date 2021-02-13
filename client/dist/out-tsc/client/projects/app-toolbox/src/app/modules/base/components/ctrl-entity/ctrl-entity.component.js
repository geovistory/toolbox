var CtrlEntityComponent_1;
import * as tslib_1 from "tslib";
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, Input, Optional, Output, Self } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { SysConfig } from 'projects/app-toolbox/src/app/core';
import { BehaviorSubject, combineLatest, of, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { CtrlEntityDialogComponent } from './ctrl-entity-dialog/ctrl-entity-dialog.component';
let CtrlEntityComponent = CtrlEntityComponent_1 = class CtrlEntityComponent {
    constructor(ngControl, dialog, ap, s, c) {
        this.ngControl = ngControl;
        this.dialog = dialog;
        this.ap = ap;
        this.s = s;
        this.c = c;
        this.blur = new EventEmitter();
        this.focus = new EventEmitter();
        // emits true on destroy of this component
        this.destroy$ = new Subject();
        this.stateChanges = new Subject();
        this.focused = false;
        this.errorState = false;
        this.controlType = 'ctrl-entity';
        this.id = `ctrl-entity-$ {
    CtrlEntityComponent.nextId++
  }

  `;
        this.describedBy = '';
        this.onChange = (_) => { };
        this.onTouched = () => { };
        this._required = false;
        this._disabled = false;
        this.value$ = new BehaviorSubject(null);
        if (this.ngControl != null) {
            this.ngControl.valueAccessor = this;
        }
    }
    get empty() {
        return this.model ? false : true;
    }
    get shouldLabelFloat() {
        return this.focused || !this.empty;
    }
    get placeholder() {
        return this._placeholder;
    }
    set placeholder(value) {
        this._placeholder = value;
        this.stateChanges.next();
    }
    get required() {
        return this._required;
    }
    set required(value) {
        this._required = coerceBooleanProperty(value);
        this.stateChanges.next();
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
        // TODO implement some disable state
        // this._disabled ? this.parts.disable() : this.parts.enable();
        this.stateChanges.next();
    }
    get value() {
        return this.model;
    }
    set value(value) {
        if (!value || (!value.pkEntity && !value.temporal_entity && !value.persistent_item)) {
            this.model = undefined;
        }
        else {
            this.model = value;
        }
        this.onChange(this.model);
        this.value$.next(value);
    }
    ngOnInit() {
        if (!this.pkClass)
            throw "pkClass is required";
        this.c.pipeClassLabel(this.pkClass);
        this.entityPreview$ = this.value$.pipe(switchMap(val => {
            if (val && val.pkEntity)
                return this.ap.streamEntityPreview(val.pkEntity);
            else if (val && (val.persistent_item || val.temporal_entity)) {
                return combineLatest(this.s.dfh$.class$.by_pk_class$.key(this.pkClass), this.c.pipeClassLabel(this.pkClass)).pipe(map(([klass, label]) => {
                    let type;
                    if (klass.basic_type === 8 || klass.basic_type === 30) {
                        type = 'peIt';
                    }
                    else {
                        type = 'teEn';
                    }
                    const e = {
                        entity_label: 'New item (click for details)',
                        fk_class: this.pkClass,
                        class_label: label,
                        entity_type: type,
                        pk_entity: undefined,
                        fk_project: undefined,
                        project: undefined,
                    };
                    return e;
                }));
            }
            return of(null);
        }));
    }
    openModal() {
        if (!this.disabled) {
            this.dialog.open(CtrlEntityDialogComponent, {
                // minWidth: '800px',
                height: 'calc(100% - 30px)',
                width: this.showAddList ? '980px' : '500px',
                maxWidth: '100%',
                data: {
                    initVal$: this.value$,
                    showAddList: this.showAddList,
                    hiddenProperty: this.property,
                    alreadyInProjectBtnText: 'Select',
                    notInProjectClickBehavior: 'selectOnly',
                    notInProjectBtnText: 'Select',
                    disableIfHasStatement: this.disableExistingWithStatement,
                    classAndTypePk: {
                        pkClass: this.pkClass,
                        pkType: undefined
                    },
                    pkUiContext: SysConfig.PK_UI_CONTEXT_DATAUNITS_CREATE
                }
            }).afterClosed().pipe(takeUntil(this.destroy$)).subscribe((result) => {
                if (!!result)
                    this.value = result;
                this.onBlur();
            });
        }
    }
    ngDoCheck() {
        if (this.ngControl) {
            this.errorState = this.ngControl.invalid && this.ngControl.touched;
            this.stateChanges.next();
        }
    }
    ngOnDestroy() {
        this.stateChanges.complete();
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
    setDescribedByIds(ids) {
        this.describedBy = ids.join(' ');
    }
    onContainerClick() {
        this.openModal();
        this.onFocus();
    }
    writeValue(value) {
        this.value = value;
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    onBlur() {
        this.onTouched();
        this.blur.emit(this.value ? this.value.pkEntity ? this.value.pkEntity : undefined : undefined);
        this.focused = false;
    }
    onFocus() {
        this.focus.emit();
        this.focused = true;
    }
};
CtrlEntityComponent.nextId = 0;
tslib_1.__decorate([
    Input()
], CtrlEntityComponent.prototype, "pkClass", void 0);
tslib_1.__decorate([
    Input()
], CtrlEntityComponent.prototype, "property", void 0);
tslib_1.__decorate([
    Input()
], CtrlEntityComponent.prototype, "disableExistingWithStatement", void 0);
tslib_1.__decorate([
    Input()
], CtrlEntityComponent.prototype, "showAddList", void 0);
tslib_1.__decorate([
    Output()
], CtrlEntityComponent.prototype, "blur", void 0);
tslib_1.__decorate([
    Output()
], CtrlEntityComponent.prototype, "focus", void 0);
tslib_1.__decorate([
    Input()
], CtrlEntityComponent.prototype, "placeholder", null);
tslib_1.__decorate([
    Input()
], CtrlEntityComponent.prototype, "required", null);
tslib_1.__decorate([
    Input()
], CtrlEntityComponent.prototype, "disabled", null);
tslib_1.__decorate([
    Input()
], CtrlEntityComponent.prototype, "value", null);
CtrlEntityComponent = CtrlEntityComponent_1 = tslib_1.__decorate([
    Component({
        selector: 'gv-ctrl-entity',
        templateUrl: './ctrl-entity.component.html',
        styleUrls: ['./ctrl-entity.component.css'],
        providers: [{
                provide: MatFormFieldControl, useExisting: CtrlEntityComponent_1
            }],
    }),
    tslib_1.__param(0, Optional()), tslib_1.__param(0, Self())
], CtrlEntityComponent);
export { CtrlEntityComponent };
//# sourceMappingURL=ctrl-entity.component.js.map