import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { DfhConfig } from "@kleiolab/lib-config";
import { map } from 'rxjs/operators';
import { U } from 'projects/app-toolbox/src/app/core/util/util';
let QueryService = class QueryService {
    constructor(p) {
        this.p = p;
    }
    propertyModelToPropertyOptions(model) {
        return [
            ...((model || {}).ingoingProperties || []).map((pk) => ({
                propertyFieldKey: U.propertyFieldKeyFromParams(pk, false),
                isOutgoing: false,
                label: '',
                pk: pk
            })),
            ...((model || {}).outgoingProperties || []).map((pk) => ({
                propertyFieldKey: U.propertyFieldKeyFromParams(pk, true),
                isOutgoing: true,
                label: '',
                pk: pk
            }))
        ];
    }
    pathSegmentIsE93Presence(s) {
        if (!s || !s.data)
            return false;
        const classes = s.data.classes || [];
        const types = s.data.types || [];
        const presences = classes.filter(pk => (pk === DfhConfig.CLASS_PK_PRESENCE));
        const noTypes = (!types || !types.length);
        // if all selected classes are E93 Presence and no types are selected
        if (presences.length > 0 && presences.length === classes.length && noTypes) {
            return true;
        }
        return false;
    }
    pathSegmentIsGeo$(segment$) {
        return segment$.pipe(map(s => this.pathSegmentIsGeo(s)));
    }
    pathSegmentIsGeo(s) {
        const geo1 = DfhConfig.CLASS_PK_GEOGRAPHICAL_PLACE;
        const geo2 = DfhConfig.CLASS_PK_BUILT_WORK;
        const geoClasses = { [geo1]: geo1, [geo2]: geo2 };
        if (!s || !s.data)
            return false;
        const classes = s.data.classes || [];
        const presences = classes.filter(pk => (!!geoClasses[pk]));
        // if all selected classes are E93 Presence and no types are selected
        if (presences.length > 0 && presences.length === classes.length) {
            return true;
        }
        return false;
    }
};
QueryService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], QueryService);
export { QueryService };
//# sourceMappingURL=query.service.js.map