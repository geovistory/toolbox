/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/actions/dfh.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { U } from '@kleiolab/lib-utils';
import { SchemaActionsFactory } from '../_helpers/schema-actions-factory';
import { filter } from 'rxjs/operators';
import { dfhRoot } from '../reducer-configs';
export class DfhProfileActionFactory extends SchemaActionsFactory {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
    /**
     * @return {?}
     */
    createActions() {
        Object.assign(this, this.createCrudActions(dfhRoot, 'profile'));
        this.loadOfProject = (/**
         * @param {?} pkProject
         * @return {?}
         */
        (pkProject) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + DfhProfileActionFactory.OF_PROJECT,
                meta: {
                    addPending,
                    pk: pkProject
                },
                payload: null,
            };
            this.ngRedux.dispatch(action);
            return {
                pending$: this.ngRedux.select(['pending', addPending]),
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !!x))),
                key: addPending
            };
        });
        return this;
    }
}
// Suffixes of load action types
DfhProfileActionFactory.OF_PROJECT = 'OF_PROJECT';
if (false) {
    /** @type {?} */
    DfhProfileActionFactory.OF_PROJECT;
    /** @type {?} */
    DfhProfileActionFactory.prototype.loadOfProject;
    /** @type {?} */
    DfhProfileActionFactory.prototype.ngRedux;
}
export class DfhClassActionFactory extends SchemaActionsFactory {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
    /**
     * @return {?}
     */
    createActions() {
        Object.assign(this, this.createCrudActions(dfhRoot, 'klass'));
        this.loadOfProject = (/**
         * @param {?} pkProject
         * @return {?}
         */
        (pkProject) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + DfhClassActionFactory.OF_PROJECT,
                meta: {
                    addPending,
                    pk: pkProject
                },
                payload: null,
            };
            this.ngRedux.dispatch(action);
            return {
                pending$: this.ngRedux.select(['pending', addPending]),
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !!x))),
                key: addPending
            };
        });
        return this;
    }
}
// Suffixes of load action types
DfhClassActionFactory.OF_PROJECT = 'OF_PROJECT';
if (false) {
    /** @type {?} */
    DfhClassActionFactory.OF_PROJECT;
    /** @type {?} */
    DfhClassActionFactory.prototype.loadOfProject;
    /** @type {?} */
    DfhClassActionFactory.prototype.ngRedux;
}
export class DfhPropertyActionFactory extends SchemaActionsFactory {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
    /**
     * @return {?}
     */
    createActions() {
        Object.assign(this, this.createCrudActions(dfhRoot, 'property'));
        this.loadOfProject = (/**
         * @param {?} pkProject
         * @return {?}
         */
        (pkProject) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + DfhPropertyActionFactory.OF_PROJECT,
                meta: {
                    addPending,
                    pk: pkProject
                },
                payload: null,
            };
            this.ngRedux.dispatch(action);
            return {
                pending$: this.ngRedux.select(['pending', addPending]),
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !!x))),
                key: addPending
            };
        });
        return this;
    }
}
// Suffixes of load action types
DfhPropertyActionFactory.OF_PROJECT = 'OF_PROJECT';
if (false) {
    /** @type {?} */
    DfhPropertyActionFactory.OF_PROJECT;
    /** @type {?} */
    DfhPropertyActionFactory.prototype.loadOfProject;
    /** @type {?} */
    DfhPropertyActionFactory.prototype.ngRedux;
}
export class DfhLabelActionFactory extends SchemaActionsFactory {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
    /**
     * @return {?}
     */
    createActions() {
        Object.assign(this, this.createCrudActions(dfhRoot, 'label'));
        this.loadOfProject = (/**
         * @param {?} pkProject
         * @return {?}
         */
        (pkProject) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + DfhLabelActionFactory.OF_PROJECT,
                meta: {
                    addPending,
                    pk: pkProject
                },
                payload: null,
            };
            this.ngRedux.dispatch(action);
            return {
                pending$: this.ngRedux.select(['pending', addPending]),
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !!x))),
                key: addPending
            };
        });
        return this;
    }
}
// Suffixes of load action types
DfhLabelActionFactory.OF_PROJECT = 'OF_PROJECT';
if (false) {
    /** @type {?} */
    DfhLabelActionFactory.OF_PROJECT;
    /** @type {?} */
    DfhLabelActionFactory.prototype.loadOfProject;
    /** @type {?} */
    DfhLabelActionFactory.prototype.ngRedux;
}
export class DfhActions {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        this.ngRedux = ngRedux;
        this.profile = new DfhProfileActionFactory(this.ngRedux).createActions();
        this.klass = new DfhClassActionFactory(this.ngRedux).createActions();
        this.property = new DfhPropertyActionFactory(this.ngRedux).createActions();
        this.label = new DfhLabelActionFactory(this.ngRedux).createActions();
    }
}
DfhActions.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DfhActions.ctorParameters = () => [
    { type: NgRedux }
];
if (false) {
    /** @type {?} */
    DfhActions.prototype.profile;
    /** @type {?} */
    DfhActions.prototype.klass;
    /** @type {?} */
    DfhActions.prototype.property;
    /** @type {?} */
    DfhActions.prototype.label;
    /** @type {?} */
    DfhActions.prototype.ngRedux;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZoLmFjdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4L3NyYy9saWIvcmVkdXgtc3RvcmUvIiwic291cmNlcyI6WyJzdGF0ZS1zY2hlbWEvYWN0aW9ucy9kZmguYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUV4QyxPQUFPLEVBQTBDLG9CQUFvQixFQUFxQixNQUFNLG9DQUFvQyxDQUFDO0FBQ3JJLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUd4QyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFHN0MsTUFBTSxPQUFPLHVCQUF3QixTQUFRLG9CQUF5Qzs7OztJQU9wRixZQUFtQixPQUEyQjtRQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUE3QyxZQUFPLEdBQVAsT0FBTyxDQUFvQjtJQUFtQixDQUFDOzs7O0lBRWxFLGFBQWE7UUFDWCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUE7UUFFL0QsSUFBSSxDQUFDLGFBQWE7Ozs7UUFBRyxDQUFDLFNBQWlCLEVBQUUsRUFBRTs7a0JBQ25DLFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFOztrQkFDckIsTUFBTSxHQUFnRDtnQkFDMUQsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxHQUFHLElBQUksR0FBRyx1QkFBdUIsQ0FBQyxVQUFVO2dCQUNyRyxJQUFJLEVBQUU7b0JBQ0osVUFBVTtv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QztRQUNoRSxhQUFRLEdBQUcsSUFBSSx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdEUsVUFBSyxHQUFHLElBQUkscUJBQXFCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBRWQsQ0FBQzs7O1lBVHBELFVBQVU7Ozs7WUEzSkYsT0FBTzs7OztJQStKZCw2QkFBb0U7O0lBQ3BFLDJCQUFnRTs7SUFDaEUsOEJBQXNFOztJQUN0RSwyQkFBZ0U7O0lBRXBELDZCQUFrQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgTmdSZWR1eCB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERmaExhYmVsLCBEZmhQcm9maWxlIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IERmaENsYXNzLCBEZmhQcm9wZXJ0eSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBVIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi11dGlscyc7XG5pbXBvcnQgeyBGbHV4U3RhbmRhcmRBY3Rpb24gfSBmcm9tICdmbHV4LXN0YW5kYXJkLWFjdGlvbic7XG5pbXBvcnQgeyBBY3Rpb25SZXN1bHRPYnNlcnZhYmxlLCBMb2FkQWN0aW9uTWV0YSwgU2NoZW1hQWN0aW9uc0ZhY3RvcnksIFN1Y2NlZWRBY3Rpb25NZXRhIH0gZnJvbSAnLi4vX2hlbHBlcnMvc2NoZW1hLWFjdGlvbnMtZmFjdG9yeSc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBJQXBwU3RhdGUgfSBmcm9tICcuLi8uLi9yb290L21vZGVscyc7XG5pbXBvcnQgeyBEZmhDbGFzc1NsaWNlIH0gZnJvbSAnLi4vbW9kZWxzJztcbmltcG9ydCB7IGRmaFJvb3QgfSBmcm9tICcuLi9yZWR1Y2VyLWNvbmZpZ3MnO1xuXG5cbmV4cG9ydCBjbGFzcyBEZmhQcm9maWxlQWN0aW9uRmFjdG9yeSBleHRlbmRzIFNjaGVtYUFjdGlvbnNGYWN0b3J5PFBheWxvYWQsIERmaFByb2ZpbGU+IHtcblxuICAvLyBTdWZmaXhlcyBvZiBsb2FkIGFjdGlvbiB0eXBlc1xuICBzdGF0aWMgcmVhZG9ubHkgT0ZfUFJPSkVDVCA9ICdPRl9QUk9KRUNUJztcblxuICBsb2FkT2ZQcm9qZWN0OiAocGtQcm9qZWN0KSA9PiBBY3Rpb25SZXN1bHRPYnNlcnZhYmxlPERmaFByb2ZpbGU+O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4pIHsgc3VwZXIobmdSZWR1eCkgfVxuXG4gIGNyZWF0ZUFjdGlvbnMoKTogRGZoUHJvZmlsZUFjdGlvbkZhY3Rvcnkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgdGhpcy5jcmVhdGVDcnVkQWN0aW9ucyhkZmhSb290LCAncHJvZmlsZScpKVxuXG4gICAgdGhpcy5sb2FkT2ZQcm9qZWN0ID0gKHBrUHJvamVjdDogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBhZGRQZW5kaW5nID0gVS51dWlkKClcbiAgICAgIGNvbnN0IGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIExvYWRBY3Rpb25NZXRhPiA9IHtcbiAgICAgICAgdHlwZTogdGhpcy5hY3Rpb25QcmVmaXggKyAnLicgKyB0aGlzLm1vZGVsTmFtZSArICc6OkxPQUQnICsgJzo6JyArIERmaFByb2ZpbGVBY3Rpb25GYWN0b3J5Lk9GX1BST0pFQ1QsXG4gICAgICAgIG1ldGE6IHtcbiAgICAgICAgICBhZGRQZW5kaW5nLFxuICAgICAgICAgIHBrOiBwa1Byb2plY3RcbiAgICAgICAgfSxcbiAgICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIH07XG4gICAgICB0aGlzLm5nUmVkdXguZGlzcGF0Y2goYWN0aW9uKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGVuZGluZyQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8Ym9vbGVhbj4oWydwZW5kaW5nJywgYWRkUGVuZGluZ10pLFxuICAgICAgICByZXNvbHZlZCQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8U3VjY2VlZEFjdGlvbk1ldGE8RGZoUHJvZmlsZT4+KFsncmVzb2x2ZWQnLCBhZGRQZW5kaW5nXSkucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgICAga2V5OiBhZGRQZW5kaW5nXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIERmaENsYXNzQWN0aW9uRmFjdG9yeSBleHRlbmRzIFNjaGVtYUFjdGlvbnNGYWN0b3J5PFBheWxvYWQsIERmaENsYXNzPiB7XG5cbiAgLy8gU3VmZml4ZXMgb2YgbG9hZCBhY3Rpb24gdHlwZXNcbiAgc3RhdGljIHJlYWRvbmx5IE9GX1BST0pFQ1QgPSAnT0ZfUFJPSkVDVCc7XG5cbiAgbG9hZE9mUHJvamVjdDogKHBrUHJvamVjdCkgPT4gQWN0aW9uUmVzdWx0T2JzZXJ2YWJsZTxEZmhDbGFzcz47XG5cbiAgY29uc3RydWN0b3IocHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPikgeyBzdXBlcihuZ1JlZHV4KSB9XG5cbiAgY3JlYXRlQWN0aW9ucygpOiBEZmhDbGFzc0FjdGlvbkZhY3Rvcnkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgdGhpcy5jcmVhdGVDcnVkQWN0aW9ucyhkZmhSb290LCAna2xhc3MnKSlcblxuICAgIHRoaXMubG9hZE9mUHJvamVjdCA9IChwa1Byb2plY3Q6IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgYWRkUGVuZGluZyA9IFUudXVpZCgpXG4gICAgICBjb25zdCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBMb2FkQWN0aW9uTWV0YT4gPSB7XG4gICAgICAgIHR5cGU6IHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpMT0FEJyArICc6OicgKyBEZmhDbGFzc0FjdGlvbkZhY3RvcnkuT0ZfUFJPSkVDVCxcbiAgICAgICAgbWV0YToge1xuICAgICAgICAgIGFkZFBlbmRpbmcsXG4gICAgICAgICAgcGs6IHBrUHJvamVjdFxuICAgICAgICB9LFxuICAgICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgfTtcbiAgICAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaChhY3Rpb24pXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwZW5kaW5nJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxib29sZWFuPihbJ3BlbmRpbmcnLCBhZGRQZW5kaW5nXSksXG4gICAgICAgIHJlc29sdmVkJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxTdWNjZWVkQWN0aW9uTWV0YTxEZmhDbGFzcz4+KFsncmVzb2x2ZWQnLCBhZGRQZW5kaW5nXSkucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgICAga2V5OiBhZGRQZW5kaW5nXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIERmaFByb3BlcnR5QWN0aW9uRmFjdG9yeSBleHRlbmRzIFNjaGVtYUFjdGlvbnNGYWN0b3J5PFBheWxvYWQsIERmaFByb3BlcnR5PiB7XG5cbiAgLy8gU3VmZml4ZXMgb2YgbG9hZCBhY3Rpb24gdHlwZXNcbiAgc3RhdGljIHJlYWRvbmx5IE9GX1BST0pFQ1QgPSAnT0ZfUFJPSkVDVCc7XG5cbiAgbG9hZE9mUHJvamVjdDogKHBrUHJvamVjdCkgPT4gQWN0aW9uUmVzdWx0T2JzZXJ2YWJsZTxEZmhQcm9wZXJ0eT47XG5cbiAgY29uc3RydWN0b3IocHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPikgeyBzdXBlcihuZ1JlZHV4KSB9XG5cbiAgY3JlYXRlQWN0aW9ucygpOiBEZmhQcm9wZXJ0eUFjdGlvbkZhY3Rvcnkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgdGhpcy5jcmVhdGVDcnVkQWN0aW9ucyhkZmhSb290LCAncHJvcGVydHknKSlcblxuICAgIHRoaXMubG9hZE9mUHJvamVjdCA9IChwa1Byb2plY3Q6IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgYWRkUGVuZGluZyA9IFUudXVpZCgpXG4gICAgICBjb25zdCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBMb2FkQWN0aW9uTWV0YT4gPSB7XG4gICAgICAgIHR5cGU6IHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpMT0FEJyArICc6OicgKyBEZmhQcm9wZXJ0eUFjdGlvbkZhY3RvcnkuT0ZfUFJPSkVDVCxcbiAgICAgICAgbWV0YToge1xuICAgICAgICAgIGFkZFBlbmRpbmcsXG4gICAgICAgICAgcGs6IHBrUHJvamVjdFxuICAgICAgICB9LFxuICAgICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgfTtcbiAgICAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaChhY3Rpb24pXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwZW5kaW5nJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxib29sZWFuPihbJ3BlbmRpbmcnLCBhZGRQZW5kaW5nXSksXG4gICAgICAgIHJlc29sdmVkJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxTdWNjZWVkQWN0aW9uTWV0YTxEZmhQcm9wZXJ0eT4+KFsncmVzb2x2ZWQnLCBhZGRQZW5kaW5nXSkucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgICAga2V5OiBhZGRQZW5kaW5nXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEZmhMYWJlbEFjdGlvbkZhY3RvcnkgZXh0ZW5kcyBTY2hlbWFBY3Rpb25zRmFjdG9yeTxQYXlsb2FkLCBEZmhMYWJlbD4ge1xuXG4gIC8vIFN1ZmZpeGVzIG9mIGxvYWQgYWN0aW9uIHR5cGVzXG4gIHN0YXRpYyByZWFkb25seSBPRl9QUk9KRUNUID0gJ09GX1BST0pFQ1QnO1xuXG4gIGxvYWRPZlByb2plY3Q6IChwa1Byb2plY3QpID0+IEFjdGlvblJlc3VsdE9ic2VydmFibGU8RGZoTGFiZWw+O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4pIHsgc3VwZXIobmdSZWR1eCkgfVxuXG4gIGNyZWF0ZUFjdGlvbnMoKTogRGZoTGFiZWxBY3Rpb25GYWN0b3J5IHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHRoaXMuY3JlYXRlQ3J1ZEFjdGlvbnMoZGZoUm9vdCwgJ2xhYmVsJykpXG5cbiAgICB0aGlzLmxvYWRPZlByb2plY3QgPSAocGtQcm9qZWN0OiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IGFkZFBlbmRpbmcgPSBVLnV1aWQoKVxuICAgICAgY29uc3QgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgTG9hZEFjdGlvbk1ldGE+ID0ge1xuICAgICAgICB0eXBlOiB0aGlzLmFjdGlvblByZWZpeCArICcuJyArIHRoaXMubW9kZWxOYW1lICsgJzo6TE9BRCcgKyAnOjonICsgRGZoTGFiZWxBY3Rpb25GYWN0b3J5Lk9GX1BST0pFQ1QsXG4gICAgICAgIG1ldGE6IHtcbiAgICAgICAgICBhZGRQZW5kaW5nLFxuICAgICAgICAgIHBrOiBwa1Byb2plY3RcbiAgICAgICAgfSxcbiAgICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIH07XG4gICAgICB0aGlzLm5nUmVkdXguZGlzcGF0Y2goYWN0aW9uKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGVuZGluZyQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8Ym9vbGVhbj4oWydwZW5kaW5nJywgYWRkUGVuZGluZ10pLFxuICAgICAgICByZXNvbHZlZCQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8U3VjY2VlZEFjdGlvbk1ldGE8RGZoTGFiZWw+PihbJ3Jlc29sdmVkJywgYWRkUGVuZGluZ10pLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAgIGtleTogYWRkUGVuZGluZ1xuICAgICAgfTtcbiAgICB9XG5cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cblxudHlwZSBQYXlsb2FkID0gRGZoQ2xhc3NTbGljZTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERmaEFjdGlvbnMge1xuXG5cbiAgcHJvZmlsZSA9IG5ldyBEZmhQcm9maWxlQWN0aW9uRmFjdG9yeSh0aGlzLm5nUmVkdXgpLmNyZWF0ZUFjdGlvbnMoKTtcbiAga2xhc3MgPSBuZXcgRGZoQ2xhc3NBY3Rpb25GYWN0b3J5KHRoaXMubmdSZWR1eCkuY3JlYXRlQWN0aW9ucygpO1xuICBwcm9wZXJ0eSA9IG5ldyBEZmhQcm9wZXJ0eUFjdGlvbkZhY3RvcnkodGhpcy5uZ1JlZHV4KS5jcmVhdGVBY3Rpb25zKCk7XG4gIGxhYmVsID0gbmV3IERmaExhYmVsQWN0aW9uRmFjdG9yeSh0aGlzLm5nUmVkdXgpLmNyZWF0ZUFjdGlvbnMoKTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+KSB7IH1cblxufVxuIl19