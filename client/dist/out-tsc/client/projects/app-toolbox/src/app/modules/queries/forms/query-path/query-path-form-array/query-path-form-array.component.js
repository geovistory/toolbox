import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { switchMap, map, mergeMap } from 'rxjs/operators';
import { classesSegmentConfig, propertiesSegmentConfig } from '../query-path-form/query-path-form.component';
import { BehaviorSubject } from 'rxjs';
let QueryPathFormArrayComponent = class QueryPathFormArrayComponent {
    constructor(i) {
        this.i = i;
    }
    get lastChild() {
        return this.formArrayFactory.children[this.formArrayFactory.children.length - 1];
    }
    ngOnInit() {
        // console.log(this.formArrayFactory.children)
    }
    /**
     * adds a new propertiesSegmentConfig
     */
    addPropertiesSegment() {
        const options$ = this.lastChild.valueChanges$.pipe(switchMap((v) => this.i.pipePropertyOptionsFromClassesAndTypes(v.data)));
        const disabled$ = this.getDisabled();
        const x = propertiesSegmentConfig(options$, disabled$);
        this.formArrayFactory.append(x.c);
    }
    /**
     * adds a new classesSegmentConfig
     */
    addClassesSegment() {
        const options$ = this.lastChild.valueChanges$.pipe(switchMap((v) => this.i.pipePkClassesFromPropertySelectModel(v.data)));
        const disabled$ = this.getDisabled();
        const x = classesSegmentConfig(options$, disabled$);
        this.formArrayFactory.append(x.c);
    }
    getDisabled() {
        const currentIndex = this.formArrayFactory.children.length + 1;
        const b = new BehaviorSubject(false);
        const disabled$ = this.formArrayFactory.childFactoryValues$.pipe(map(v => {
            // console.log(v.length, currentIndex)
            return v.length > currentIndex;
        }));
        b.pipe(mergeMap(() => disabled$));
        return b;
    }
    addSegment() {
        if (this.formArrayFactory.globalConfig.root.control.valid) {
            if (this.lastChild.config.data.propertiesSegment) {
                this.addClassesSegment();
            }
            else if (this.lastChild.config.data.classesSegment) {
                this.addPropertiesSegment();
            }
        }
        else {
            this.formArrayFactory.globalConfig.root.formFactory.markAllAsTouched();
        }
    }
    /**
     * removes segment with given index
     */
    removeSegment(index) {
        this.formArrayFactory.remove(index);
    }
};
tslib_1.__decorate([
    Input()
], QueryPathFormArrayComponent.prototype, "formArrayFactory", void 0);
QueryPathFormArrayComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-query-path-form-array',
        templateUrl: './query-path-form-array.component.html',
        styleUrls: ['./query-path-form-array.component.scss']
    })
], QueryPathFormArrayComponent);
export { QueryPathFormArrayComponent };
//# sourceMappingURL=query-path-form-array.component.js.map