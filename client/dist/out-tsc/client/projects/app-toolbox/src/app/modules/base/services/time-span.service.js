import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { equals } from 'ramda';
import { combineLatest, of } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { CtrlTimeSpanDialogComponent } from '../components/ctrl-time-span/ctrl-time-span-dialog/ctrl-time-span-dialog.component';
import { DfhConfig } from "@kleiolab/lib-config";
let TimeSpanService = class TimeSpanService {
    constructor(p, t, dialog, inf) {
        this.p = p;
        this.t = t;
        this.dialog = dialog;
        this.inf = inf;
        // : Observable<boolean>
        this.onSave = (item, fkTeEn) => (n) => {
            return this.p.pkProject$.pipe(mergeMap((pkProject) => {
                const o = this.createOldData(item);
                const toUpsert = [];
                let toDelete = [];
                item.properties.forEach(prop => {
                    if (prop.items.length > 1) {
                        toDelete = [...toDelete, ...prop.items.slice(1, prop.items.length).map(i => i.statement)];
                    }
                });
                [72, 152, 153, 71, 150, 151].forEach(key => {
                    // if in both not, skip
                    if (!o[key] && !n[key]) { }
                    // if only in new, upsert
                    else if (!o[key] && n[key]) {
                        toUpsert.push(this.convertToStatement(key, n[key], fkTeEn));
                    }
                    // if only in old, delete
                    else if (o[key] && !n[key]) {
                        toDelete.push(o[key].r);
                    }
                    // if in both and different, delete old, upsert new
                    else if (o[key] && n[key] && !equals(o[key].tp, n[key])) {
                        toDelete.push(o[key].r);
                        toUpsert.push(this.convertToStatement(key, n[key], fkTeEn));
                    }
                });
                return combineLatest(toUpsert.length > 0 ? this.inf.statement.upsert(toUpsert, pkProject).resolved$ : of(true), toDelete.length > 0 ? this.inf.statement.remove(toDelete, pkProject).resolved$ : of(true));
            }), map((ok) => true));
        };
    }
    openModal(item, fkTeEn) {
        const timePrimitives = this.createDialogData(item);
        const data = {
            timePrimitives,
            beforeCloseCallback: this.onSave(item, fkTeEn)
        };
        this.dialog.open(CtrlTimeSpanDialogComponent, {
            width: '500px',
            data
        });
    }
    convertToStatement(key, t, fkTeEn) {
        const statement = Object.assign({ fk_subject_info: fkTeEn, fk_property: parseInt(key), entity_version_project_rels: [{
                    calendar: t.calendar
                }], object_time_primitive: Object.assign({}, t, { fk_class: DfhConfig.CLASS_PK_TIME_PRIMITIVE }) }, {});
        return statement;
    }
    createDialogData(item) {
        if (!item)
            return {};
        const timePrimitives = {};
        item.properties.forEach((prop) => {
            const p = prop.listDefinition.property.pkProperty;
            if (prop.items.length > 0) {
                const i = prop.items[0].timePrimitive;
                timePrimitives[p] = {
                    calendar: i.calendar,
                    duration: i.duration,
                    julian_day: i.julianDay
                };
            }
        });
        return timePrimitives;
    }
    createOldData(item) {
        const old = {};
        item.properties.forEach((prop) => {
            const p = prop.listDefinition.property.pkProperty;
            if (prop.items.length > 0) {
                const i = prop.items[0].timePrimitive;
                old[p] = {
                    tp: {
                        calendar: i.calendar,
                        duration: i.duration,
                        julian_day: i.julianDay
                    },
                    r: prop.items[0].statement
                };
            }
        });
        return old;
    }
};
TimeSpanService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], TimeSpanService);
export { TimeSpanService };
//# sourceMappingURL=time-span.service.js.map