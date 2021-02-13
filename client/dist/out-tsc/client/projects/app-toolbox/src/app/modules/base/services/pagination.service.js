import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { paginatedBy, paginateKey, paginateName } from 'projects/app-toolbox/src/app/core/redux-store/reducer-factory';
import { equals, keys } from 'ramda';
import { combineLatest, Subject, of } from 'rxjs';
import { distinctUntilChanged, filter, map, shareReplay, takeUntil, first } from 'rxjs/operators';
import { InfSelector } from 'projects/app-toolbox/src/app/core/inf/inf.service';
import { createPaginateBy } from '../base.helpers';
class StatementPageLoader {
    constructor(p, loadNeededFn, loadFn) {
        this.p = p;
        this.loadNeededFn = loadNeededFn;
        this.loadFn = loadFn;
        this.paginationTriggers = new Map();
        this.pageLoaders = new Map();
    }
    addPageLoader(pkProject, l, pkEntity, limit, offset, takeUntil$, alternatives = false) {
        const paginateBy = createPaginateBy(l, pkEntity, alternatives);
        const triggerKey = paginatedBy(paginateName(paginateBy)) + '_' + paginateKey(paginateBy);
        const trigger$ = this.getTrigger(triggerKey, l, pkEntity, alternatives);
        const loaderKey = triggerKey + '_' + limit + '_' + offset;
        if (!this.pageLoaders.has(loaderKey)) {
            // emits when load function has been called
            const loadEvent$ = new Subject();
            const until$ = new Subject();
            this.pageLoaders.set(loaderKey, {
                refCount: 1,
                until$,
                loadEvent$
            });
            this.loadNeededFn(paginateBy, limit, offset, trigger$).pipe(filter(loadNeeded => loadNeeded === true), takeUntil(until$)).subscribe(() => {
                this.loadFn(pkProject, pkEntity, l.property.pkProperty, l.targetClass, l.isOutgoing, limit, offset).resolved$.pipe(first(res => !!res)).subscribe((res) => {
                    loadEvent$.next(res);
                });
            });
        }
        else {
            const loader = this.pageLoaders.get(loaderKey);
            this.pageLoaders.set(loaderKey, {
                until$: loader.until$,
                loadEvent$: loader.loadEvent$,
                refCount: loader.refCount + 1
            });
        }
        const sub = takeUntil$.subscribe(() => {
            const loader = this.pageLoaders.get(loaderKey);
            if (loader.refCount === 1) {
                loader.until$.next();
                this.pageLoaders.delete(loaderKey);
            }
            else {
                this.pageLoaders.set(loaderKey, {
                    until$: loader.until$,
                    loadEvent$: loader.loadEvent$,
                    refCount: loader.refCount - 1
                });
            }
            sub.unsubscribe();
        });
        return this.pageLoaders.get(loaderKey);
    }
    getTrigger(triggerKey, l, pkEntity, alternatives) {
        if (!this.paginationTriggers.has(triggerKey)) {
            const ofProject = !alternatives;
            const t = combineLatest([
                this.p.inf$.statement$.by_object_and_property_indexed$({
                    fk_property: l.property.pkProperty,
                    fk_object_info: pkEntity
                }, ofProject).pipe(map(x => keys(x)), distinctUntilChanged(equals)),
                this.p.inf$.statement$.by_subject_and_property_indexed$({
                    fk_property: l.property.pkProperty,
                    fk_subject_info: pkEntity
                }, ofProject).pipe(map(x => keys(x)), distinctUntilChanged(equals)),
            ]).pipe(shareReplay({ bufferSize: 1, refCount: true }));
            this.paginationTriggers.set(triggerKey, t);
        }
        return this.paginationTriggers.get(triggerKey);
    }
}
let PaginationService = class PaginationService {
    constructor(p, ngRedux) {
        this.p = p;
        this.ngRedux = ngRedux;
        this.infRepo = new InfSelector(this.ngRedux, of('repo'));
        this.temporalEntity = new StatementPageLoader(this.p, this.p.inf$.statement$.pagination$.pipePageLoadNeeded, this.p.inf.temporal_entity.loadPaginatedList);
        this.temporalEntityAlternative = new StatementPageLoader(this.p, this.p.inf$.statement$.pagination$.pipePageLoadNeeded, this.p.inf.temporal_entity.loadPaginatedAlternativeList);
        this.statements = new StatementPageLoader(this.p, this.p.inf$.statement$.pagination$.pipePageLoadNeeded, this.p.inf.statement.loadPaginatedList);
    }
};
PaginationService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], PaginationService);
export { PaginationService };
//# sourceMappingURL=pagination.service.js.map