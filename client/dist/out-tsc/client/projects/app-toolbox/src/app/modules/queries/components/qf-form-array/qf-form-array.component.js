import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { equals } from 'ramda';
import { Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
let QfFormArrayComponent = class QfFormArrayComponent {
    constructor(c, b, i, qfs) {
        this.c = c;
        this.b = b;
        this.i = i;
        this.qfs = qfs;
        this.destroy$ = new Subject();
    }
    get isArrayProperties() {
        return !!this.formArrayFactory.config.data.arrayProperties;
    }
    get isArrayClasses() {
        return !!this.formArrayFactory.config.data.arrayClasses;
    }
    get isArraySubgroup() {
        return !!this.formArrayFactory.config.data.arraySubgroup;
    }
    get isArrayCondition() {
        return !!this.formArrayFactory.config.data.arrayCondition;
    }
    get parentIsArraySubgroup() {
        const parent = this.formArrayFactory.parent;
        return parent.factoryType === 'array' && parent.config.data.arraySubgroup;
    }
    get conditionCanHaveChildren() {
        if (this.isArrayCondition) {
            const second = this.formArrayFactory.childConfigs[1];
            return !!second && second.id === 'properties' &&
                this.formArrayFactory.children.length < 3 &&
                this.formArrayFactory.control.valid;
        }
        return false;
    }
    isFormArray(child) {
        return child.factoryType === 'array';
    }
    childIsArraySubgroup(child) {
        return child.factoryType === 'array' && !!child.config.data.arraySubgroup;
    }
    isCtrlClasses(child) {
        return child.control && child.config.data.ctrlClasses;
    }
    isCtrlProperties(child) {
        return child.control && child.config.data.ctrlProperties;
    }
    isFormControl(child) {
        return child.factoryType === 'control';
    }
    ngOnInit() {
        this.config = this.formArrayFactory.config;
    }
    addClassesSubfilter() {
        this.formArrayFactory.add(this.nextIndex(), this.prepareSubgroupOfArrClasses());
    }
    removeSubfilter(i) {
        this.formArrayFactory.remove(i);
        if (this.childrenLength() == 1 && this.formArrayFactory.parent.factoryType === 'array') {
            const parent = this.formArrayFactory.parent;
            parent.removeLastChild();
        }
        // else if (
        //   this.formArrayFactory.childConfigs.filter(c => !!c.array).length === 1 &&
        //   this.parentIsArraySubgroup
        // ) {
        //   const parent = this.formArrayFactory.parent as QfFormArrayFactory
        //   parent.removeAllChildren()
        //   const c = this.formArrayFactory.children[1].config as QfFormNodeConfig;
        //   parent.append(c)
        // }
    }
    splitSubfilter(i, child) {
        // const initVal = this.formArrayFactory.valueChanges$.value
        const initVal = {
            data: {},
            children: [
                child.valueChanges$.value,
                {
                    data: child.valueChanges$.value.data,
                    children: []
                }
            ]
        };
        const arraySubgroup = this.formArrayFactory.config.data.arraySubgroup;
        const subgroup = arraySubgroup.propertyOptions$ ?
            this.qfs.createArrSubgroupOfClasses(arraySubgroup.propertyOptions$, initVal) :
            this.qfs.createArrSubgroupOfProperties(arraySubgroup.pkClasses$, initVal);
        this.formArrayFactory.remove(i);
        this.formArrayFactory.add(i, subgroup);
    }
    addPropertiesSubfilter() {
        this.formArrayFactory.add(this.nextIndex(), this.prepareSubgroupOfArrProperties());
    }
    addSubgroupItem() {
        this.formArrayFactory.add(this.nextIndex(), this.createSubgroupItem());
    }
    addCtrlSearchTerm(initValue) {
        const ctrlSearchTerm = this.qfs.createCtrlSearchTerm(initValue);
        this.formArrayFactory.add(this.nextIndex(), ctrlSearchTerm);
    }
    addArrProperties(options$, initValue) {
        const arrProperties = this.qfs.createArrSubgroupOfClasses(options$, initValue);
        this.formArrayFactory.add(this.nextIndex(), arrProperties);
    }
    prepareSubgroupOfArrClasses(initVal) {
        const classTypes$ = this.formArrayFactory.valueChanges$
            .pipe(filter(x => !!x && !!x.data), map(x => x.data));
        const propertyOptions$ = this.i.getPropertyOptions$(classTypes$);
        return this.qfs.createArrSubgroupOfClasses(propertyOptions$, initVal);
    }
    prepareSubgroupOfArrProperties(initVal) {
        const pkClasses$ = this.formArrayFactory.valueChanges$
            .pipe(
        // make sure only it passes only if data of the arrayClasses are changed (not children)
        distinctUntilChanged((a, b) => {
            return equals(a.data, b.data);
        }), switchMap((x) => this.i.pipePkClassesFromPropertySelectModel(x.data)));
        return this.qfs.createArrSubgroupOfProperties(pkClasses$, initVal);
    }
    createSubgroupItem(initVal) {
        return this.qfs.createSubgroupOfArrSoubgroup(this.formArrayFactory.config.data.arraySubgroup, initVal);
    }
    nextIndex() {
        return this.childrenLength() + 1;
    }
    childrenLength() {
        return this.formArrayFactory.children.length;
    }
    childConfigHasId(index, id) {
        const n = this.formArrayFactory.childConfigs[index];
        return !n ? false : n.id === id;
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
};
tslib_1.__decorate([
    Input()
], QfFormArrayComponent.prototype, "formArrayFactory", void 0);
QfFormArrayComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-qf-form-array',
        templateUrl: './qf-form-array.component.html',
        styleUrls: ['./qf-form-array.component.scss']
    })
], QfFormArrayComponent);
export { QfFormArrayComponent };
//# sourceMappingURL=qf-form-array.component.js.map