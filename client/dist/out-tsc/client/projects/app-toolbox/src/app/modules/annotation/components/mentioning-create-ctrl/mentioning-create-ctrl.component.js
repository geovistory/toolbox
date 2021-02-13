var MentioningCreateCtrlComponent_1;
import * as tslib_1 from "tslib";
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { InfStatement } from '@kleiolab/lib-sdk-lb3';
import { DfhConfig } from "@kleiolab/lib-config";
import { Subject } from 'rxjs';
let MentioningCreateCtrlComponent = MentioningCreateCtrlComponent_1 = class MentioningCreateCtrlComponent {
    constructor() {
        // emits true on destroy of this component
        this.destroy$ = new Subject();
        // Emits when form is touched
        this.touched = new EventEmitter();
        this.domainInfoEntityClassPks = [
            DfhConfig.CLASS_PK_EXPRESSION,
            DfhConfig.CLASS_PK_EXPRESSION_PORTION
        ];
        /**
         * gets replaced by angular on registerOnChange
         * This function helps to type the onChange function for the use in this class.
         */
        this.onChange = (value) => {
            console.error('called before registerOnChange');
        };
        /**
         * gets replaced by angular on registerOnTouched
         * Call this function when the form has been touched.
         */
        this.onTouched = () => {
        };
    }
    get property() {
        if (this.domainChunk) {
            return {
                label: 'Refers to',
                pk_property: DfhConfig.PROPERTY_PK_GEOVP11_REFERS_TO
            };
        }
        else if (this.domainInfoEntity) {
            return {
                label: 'Mentions',
                pk_property: DfhConfig.PROPERTY_PK_GEOVP2_MENTIONS
            };
        }
        else {
            return null;
        }
    }
    ngOnInit() {
        if (this.rangeInfoEntity)
            this.rangeInfoEntityFixed = true;
        if (this.domainInfoEntity)
            this.domainInfoEntityFixed = true;
        if (this.domainChunk)
            this.domainChunkFixed = true;
    }
    ngOnChanges(changes) {
        if (changes.domainChunk) {
            this.validateAndEmit();
        }
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
    // validates and emits onChange
    validateAndEmit() {
        // If valid
        if (this.rangeInfoEntity
            && (this.domainInfoEntity ||
                this.domainChunk)) {
            const statement = new InfStatement({
                fk_object_info: this.rangeInfoEntity.pk_entity,
                fk_property: this.property.pk_property
            });
            if (this.domainInfoEntity) {
                statement.fk_subject_info = this.domainInfoEntity.pk_entity;
            }
            else if (this.domainChunk) {
                statement.subject_chunk = this.domainChunk;
            }
            this.onChange(statement);
        }
        else {
            this.onChange(null);
        }
    }
    onDropRangeInfoEntity(entity) {
        this.rangeInfoEntity = entity;
        this.validateAndEmit();
    }
    onDropDomainInfoEntity(entity) {
        this.domainInfoEntity = entity;
        this.validateAndEmit();
    }
    resetDomainInfoEntity() {
        this.domainInfoEntity = undefined;
        this.validateAndEmit();
    }
    resetRangeInfoEntity() {
        this.rangeInfoEntity = undefined;
        this.validateAndEmit();
    }
    allowDropDomainInfoEntity() {
        return (entity) => [
            DfhConfig.CLASS_PK_EXPRESSION, DfhConfig.CLASS_PK_EXPRESSION_PORTION
        ].includes(entity.fk_class);
    }
    allowDropRangeInfoEntity() {
        return (entity) => ['peIt', 'teEn'].includes(entity.entity_type);
    }
    // /**
    //  * Verifies if given pkClass is of a class regarded as source:
    //  * Manifestaiton product type
    //  * Manifestation singleton
    //  * @param pkClass
    //  */
    // private isSource(pkClass: number) {
    //   return (this.sourcePks.indexOf(pkClass) > -1) ? true : false;
    // }
    // /**
    //  * Verifies if given pkCLass is of a class that is regarded as a source or section:
    //  * Manifestaiton product type
    //  * Manifestation singleton
    //  * Expression
    //  * @param pkClass
    //  */
    // private isSourceOrSection(pkClass: number) {
    //   return (this.domainInfoEntityClassPks.indexOf(pkClass) > -1) ? true : false;
    // }
    /****************************************
     *  ControlValueAccessor implementation *
     ****************************************/
    /**
     * Allows Angular to update the model.
     * Update the model and changes needed for the view here.
     *
     */
    writeValue(value) {
        // if (value && value.foo) this.fooCtrl.setValue(value.foo);
    }
    /**
     * Allows Angular to register a function to call when the model changes.
     * Save the function as a property to call later here.
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * Allows Angular to register a function to call when the input has been touched.
     * Save the function as a property to call later here.
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    markAsTouched() {
        this.onTouched();
        this.touched.emit();
    }
};
tslib_1.__decorate([
    Output()
], MentioningCreateCtrlComponent.prototype, "touched", void 0);
tslib_1.__decorate([
    Input()
], MentioningCreateCtrlComponent.prototype, "domainInfoEntity", void 0);
tslib_1.__decorate([
    Input()
], MentioningCreateCtrlComponent.prototype, "domainChunk", void 0);
tslib_1.__decorate([
    Input()
], MentioningCreateCtrlComponent.prototype, "domainChunkFixed", void 0);
tslib_1.__decorate([
    Input()
], MentioningCreateCtrlComponent.prototype, "rangeInfoEntity", void 0);
MentioningCreateCtrlComponent = MentioningCreateCtrlComponent_1 = tslib_1.__decorate([
    Component({
        selector: 'gv-mentioning-create-ctrl',
        templateUrl: './mentioning-create-ctrl.component.html',
        styleUrls: ['./mentioning-create-ctrl.component.css'],
        providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => MentioningCreateCtrlComponent_1),
                multi: true
            }
        ],
    })
], MentioningCreateCtrlComponent);
export { MentioningCreateCtrlComponent };
//# sourceMappingURL=mentioning-create-ctrl.component.js.map