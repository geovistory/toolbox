/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/actions/dfh.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { U } from '@kleiolab/lib-utils';
import { filter } from 'rxjs/operators';
import { dfhRoot } from '../reducer-configs/dfh.config';
import { SchemaActionsFactory } from '../_helpers/schema-actions-factory';
import * as i0 from "@angular/core";
import * as i1 from "@angular-redux/store";
var DfhProfileActionFactory = /** @class */ (function (_super) {
    tslib_1.__extends(DfhProfileActionFactory, _super);
    function DfhProfileActionFactory(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.ngRedux = ngRedux;
        return _this;
    }
    /**
     * @return {?}
     */
    DfhProfileActionFactory.prototype.createActions = /**
     * @return {?}
     */
    function () {
        var _this = this;
        Object.assign(this, this.createCrudActions(dfhRoot, 'profile'));
        this.loadOfProject = (/**
         * @param {?} pkProject
         * @return {?}
         */
        function (pkProject) {
            /** @type {?} */
            var addPending = U.uuid();
            /** @type {?} */
            var action = {
                type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + DfhProfileActionFactory.OF_PROJECT,
                meta: {
                    addPending: addPending,
                    pk: pkProject
                },
                payload: null,
            };
            _this.ngRedux.dispatch(action);
            return {
                pending$: _this.ngRedux.select(['pending', addPending]),
                resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return !!x; }))),
                key: addPending
            };
        });
        return this;
    };
    // Suffixes of load action types
    DfhProfileActionFactory.OF_PROJECT = 'OF_PROJECT';
    return DfhProfileActionFactory;
}(SchemaActionsFactory));
export { DfhProfileActionFactory };
if (false) {
    /** @type {?} */
    DfhProfileActionFactory.OF_PROJECT;
    /** @type {?} */
    DfhProfileActionFactory.prototype.loadOfProject;
    /** @type {?} */
    DfhProfileActionFactory.prototype.ngRedux;
}
var DfhClassActionFactory = /** @class */ (function (_super) {
    tslib_1.__extends(DfhClassActionFactory, _super);
    function DfhClassActionFactory(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.ngRedux = ngRedux;
        return _this;
    }
    /**
     * @return {?}
     */
    DfhClassActionFactory.prototype.createActions = /**
     * @return {?}
     */
    function () {
        var _this = this;
        Object.assign(this, this.createCrudActions(dfhRoot, 'klass'));
        this.loadOfProject = (/**
         * @param {?} pkProject
         * @return {?}
         */
        function (pkProject) {
            /** @type {?} */
            var addPending = U.uuid();
            /** @type {?} */
            var action = {
                type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + DfhClassActionFactory.OF_PROJECT,
                meta: {
                    addPending: addPending,
                    pk: pkProject
                },
                payload: null,
            };
            _this.ngRedux.dispatch(action);
            return {
                pending$: _this.ngRedux.select(['pending', addPending]),
                resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return !!x; }))),
                key: addPending
            };
        });
        return this;
    };
    // Suffixes of load action types
    DfhClassActionFactory.OF_PROJECT = 'OF_PROJECT';
    return DfhClassActionFactory;
}(SchemaActionsFactory));
export { DfhClassActionFactory };
if (false) {
    /** @type {?} */
    DfhClassActionFactory.OF_PROJECT;
    /** @type {?} */
    DfhClassActionFactory.prototype.loadOfProject;
    /** @type {?} */
    DfhClassActionFactory.prototype.ngRedux;
}
var DfhPropertyActionFactory = /** @class */ (function (_super) {
    tslib_1.__extends(DfhPropertyActionFactory, _super);
    function DfhPropertyActionFactory(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.ngRedux = ngRedux;
        return _this;
    }
    /**
     * @return {?}
     */
    DfhPropertyActionFactory.prototype.createActions = /**
     * @return {?}
     */
    function () {
        var _this = this;
        Object.assign(this, this.createCrudActions(dfhRoot, 'property'));
        this.loadOfProject = (/**
         * @param {?} pkProject
         * @return {?}
         */
        function (pkProject) {
            /** @type {?} */
            var addPending = U.uuid();
            /** @type {?} */
            var action = {
                type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + DfhPropertyActionFactory.OF_PROJECT,
                meta: {
                    addPending: addPending,
                    pk: pkProject
                },
                payload: null,
            };
            _this.ngRedux.dispatch(action);
            return {
                pending$: _this.ngRedux.select(['pending', addPending]),
                resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return !!x; }))),
                key: addPending
            };
        });
        return this;
    };
    // Suffixes of load action types
    DfhPropertyActionFactory.OF_PROJECT = 'OF_PROJECT';
    return DfhPropertyActionFactory;
}(SchemaActionsFactory));
export { DfhPropertyActionFactory };
if (false) {
    /** @type {?} */
    DfhPropertyActionFactory.OF_PROJECT;
    /** @type {?} */
    DfhPropertyActionFactory.prototype.loadOfProject;
    /** @type {?} */
    DfhPropertyActionFactory.prototype.ngRedux;
}
var DfhLabelActionFactory = /** @class */ (function (_super) {
    tslib_1.__extends(DfhLabelActionFactory, _super);
    function DfhLabelActionFactory(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.ngRedux = ngRedux;
        return _this;
    }
    /**
     * @return {?}
     */
    DfhLabelActionFactory.prototype.createActions = /**
     * @return {?}
     */
    function () {
        var _this = this;
        Object.assign(this, this.createCrudActions(dfhRoot, 'label'));
        this.loadOfProject = (/**
         * @param {?} pkProject
         * @return {?}
         */
        function (pkProject) {
            /** @type {?} */
            var addPending = U.uuid();
            /** @type {?} */
            var action = {
                type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + DfhLabelActionFactory.OF_PROJECT,
                meta: {
                    addPending: addPending,
                    pk: pkProject
                },
                payload: null,
            };
            _this.ngRedux.dispatch(action);
            return {
                pending$: _this.ngRedux.select(['pending', addPending]),
                resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return !!x; }))),
                key: addPending
            };
        });
        return this;
    };
    // Suffixes of load action types
    DfhLabelActionFactory.OF_PROJECT = 'OF_PROJECT';
    return DfhLabelActionFactory;
}(SchemaActionsFactory));
export { DfhLabelActionFactory };
if (false) {
    /** @type {?} */
    DfhLabelActionFactory.OF_PROJECT;
    /** @type {?} */
    DfhLabelActionFactory.prototype.loadOfProject;
    /** @type {?} */
    DfhLabelActionFactory.prototype.ngRedux;
}
var DfhActions = /** @class */ (function () {
    function DfhActions(ngRedux) {
        this.ngRedux = ngRedux;
        this.profile = new DfhProfileActionFactory(this.ngRedux).createActions();
        this.klass = new DfhClassActionFactory(this.ngRedux).createActions();
        this.property = new DfhPropertyActionFactory(this.ngRedux).createActions();
        this.label = new DfhLabelActionFactory(this.ngRedux).createActions();
    }
    DfhActions.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    DfhActions.ctorParameters = function () { return [
        { type: NgRedux }
    ]; };
    /** @nocollapse */ DfhActions.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function DfhActions_Factory() { return new DfhActions(i0.ɵɵinject(i1.NgRedux)); }, token: DfhActions, providedIn: "root" });
    return DfhActions;
}());
export { DfhActions };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZoLmFjdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4LyIsInNvdXJjZXMiOlsibGliL3JlZHV4LXN0b3JlL3N0YXRlLXNjaGVtYS9hY3Rpb25zL2RmaC5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUV4QyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHeEMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3hELE9BQU8sRUFBMEMsb0JBQW9CLEVBQXFCLE1BQU0sb0NBQW9DLENBQUM7OztBQUdySTtJQUE2QyxtREFBeUM7SUFPcEYsaUNBQW1CLE9BQTJCO1FBQTlDLFlBQWtELGtCQUFNLE9BQU8sQ0FBQyxTQUFFO1FBQS9DLGFBQU8sR0FBUCxPQUFPLENBQW9COztJQUFtQixDQUFDOzs7O0lBRWxFLCtDQUFhOzs7SUFBYjtRQUFBLGlCQXNCQztRQXJCQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUE7UUFFL0QsSUFBSSxDQUFDLGFBQWE7Ozs7UUFBRyxVQUFDLFNBQWlCOztnQkFDL0IsVUFBVSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUU7O2dCQUNyQixNQUFNLEdBQWdEO2dCQUMxRCxJQUFJLEVBQUUsS0FBSSxDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsS0FBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLEdBQUcsSUFBSSxHQUFHLHVCQUF1QixDQUFDLFVBQVU7Z0JBQ3JHLElBQUksRUFBRTtvQkFDSixVQUFVLFlBQUE7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U0FqQ1kscUJBQXFCOzs7SUFHaEMsaUNBQTBDOztJQUUxQyw4Q0FBK0Q7O0lBRW5ELHdDQUFrQzs7QUErQmhEO0lBV0Usb0JBQW1CLE9BQTJCO1FBQTNCLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBTDlDLFlBQU8sR0FBRyxJQUFJLHVCQUF1QixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNwRSxVQUFLLEdBQUcsSUFBSSxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDaEUsYUFBUSxHQUFHLElBQUksd0JBQXdCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3RFLFVBQUssR0FBRyxJQUFJLHFCQUFxQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUVkLENBQUM7O2dCQVhwRCxVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQTdKUSxPQUFPOzs7cUJBRGhCO0NBeUtDLEFBYkQsSUFhQztTQVZZLFVBQVU7OztJQUdyQiw2QkFBb0U7O0lBQ3BFLDJCQUFnRTs7SUFDaEUsOEJBQXNFOztJQUN0RSwyQkFBZ0U7O0lBRXBELDZCQUFrQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgTmdSZWR1eCB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERmaExhYmVsLCBEZmhQcm9maWxlIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IERmaENsYXNzLCBEZmhQcm9wZXJ0eSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBVIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi11dGlscyc7XG5pbXBvcnQgeyBGbHV4U3RhbmRhcmRBY3Rpb24gfSBmcm9tICdmbHV4LXN0YW5kYXJkLWFjdGlvbic7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBJQXBwU3RhdGUgfSBmcm9tICcuLi8uLi9yb290L21vZGVscy9tb2RlbCc7XG5pbXBvcnQgeyBEZmhDbGFzc1NsaWNlIH0gZnJvbSAnLi4vbW9kZWxzL2RmaC5tb2RlbHMnO1xuaW1wb3J0IHsgZGZoUm9vdCB9IGZyb20gJy4uL3JlZHVjZXItY29uZmlncy9kZmguY29uZmlnJztcbmltcG9ydCB7IEFjdGlvblJlc3VsdE9ic2VydmFibGUsIExvYWRBY3Rpb25NZXRhLCBTY2hlbWFBY3Rpb25zRmFjdG9yeSwgU3VjY2VlZEFjdGlvbk1ldGEgfSBmcm9tICcuLi9faGVscGVycy9zY2hlbWEtYWN0aW9ucy1mYWN0b3J5JztcblxuXG5leHBvcnQgY2xhc3MgRGZoUHJvZmlsZUFjdGlvbkZhY3RvcnkgZXh0ZW5kcyBTY2hlbWFBY3Rpb25zRmFjdG9yeTxQYXlsb2FkLCBEZmhQcm9maWxlPiB7XG5cbiAgLy8gU3VmZml4ZXMgb2YgbG9hZCBhY3Rpb24gdHlwZXNcbiAgc3RhdGljIHJlYWRvbmx5IE9GX1BST0pFQ1QgPSAnT0ZfUFJPSkVDVCc7XG5cbiAgbG9hZE9mUHJvamVjdDogKHBrUHJvamVjdCkgPT4gQWN0aW9uUmVzdWx0T2JzZXJ2YWJsZTxEZmhQcm9maWxlPjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+KSB7IHN1cGVyKG5nUmVkdXgpIH1cblxuICBjcmVhdGVBY3Rpb25zKCk6IERmaFByb2ZpbGVBY3Rpb25GYWN0b3J5IHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHRoaXMuY3JlYXRlQ3J1ZEFjdGlvbnMoZGZoUm9vdCwgJ3Byb2ZpbGUnKSlcblxuICAgIHRoaXMubG9hZE9mUHJvamVjdCA9IChwa1Byb2plY3Q6IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgYWRkUGVuZGluZyA9IFUudXVpZCgpXG4gICAgICBjb25zdCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBMb2FkQWN0aW9uTWV0YT4gPSB7XG4gICAgICAgIHR5cGU6IHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpMT0FEJyArICc6OicgKyBEZmhQcm9maWxlQWN0aW9uRmFjdG9yeS5PRl9QUk9KRUNULFxuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgYWRkUGVuZGluZyxcbiAgICAgICAgICBwazogcGtQcm9qZWN0XG4gICAgICAgIH0sXG4gICAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICB9O1xuICAgICAgdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKGFjdGlvbilcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBlbmRpbmckOiB0aGlzLm5nUmVkdXguc2VsZWN0PGJvb2xlYW4+KFsncGVuZGluZycsIGFkZFBlbmRpbmddKSxcbiAgICAgICAgcmVzb2x2ZWQkOiB0aGlzLm5nUmVkdXguc2VsZWN0PFN1Y2NlZWRBY3Rpb25NZXRhPERmaFByb2ZpbGU+PihbJ3Jlc29sdmVkJywgYWRkUGVuZGluZ10pLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAgIGtleTogYWRkUGVuZGluZ1xuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBEZmhDbGFzc0FjdGlvbkZhY3RvcnkgZXh0ZW5kcyBTY2hlbWFBY3Rpb25zRmFjdG9yeTxQYXlsb2FkLCBEZmhDbGFzcz4ge1xuXG4gIC8vIFN1ZmZpeGVzIG9mIGxvYWQgYWN0aW9uIHR5cGVzXG4gIHN0YXRpYyByZWFkb25seSBPRl9QUk9KRUNUID0gJ09GX1BST0pFQ1QnO1xuXG4gIGxvYWRPZlByb2plY3Q6IChwa1Byb2plY3QpID0+IEFjdGlvblJlc3VsdE9ic2VydmFibGU8RGZoQ2xhc3M+O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4pIHsgc3VwZXIobmdSZWR1eCkgfVxuXG4gIGNyZWF0ZUFjdGlvbnMoKTogRGZoQ2xhc3NBY3Rpb25GYWN0b3J5IHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHRoaXMuY3JlYXRlQ3J1ZEFjdGlvbnMoZGZoUm9vdCwgJ2tsYXNzJykpXG5cbiAgICB0aGlzLmxvYWRPZlByb2plY3QgPSAocGtQcm9qZWN0OiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IGFkZFBlbmRpbmcgPSBVLnV1aWQoKVxuICAgICAgY29uc3QgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgTG9hZEFjdGlvbk1ldGE+ID0ge1xuICAgICAgICB0eXBlOiB0aGlzLmFjdGlvblByZWZpeCArICcuJyArIHRoaXMubW9kZWxOYW1lICsgJzo6TE9BRCcgKyAnOjonICsgRGZoQ2xhc3NBY3Rpb25GYWN0b3J5Lk9GX1BST0pFQ1QsXG4gICAgICAgIG1ldGE6IHtcbiAgICAgICAgICBhZGRQZW5kaW5nLFxuICAgICAgICAgIHBrOiBwa1Byb2plY3RcbiAgICAgICAgfSxcbiAgICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIH07XG4gICAgICB0aGlzLm5nUmVkdXguZGlzcGF0Y2goYWN0aW9uKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGVuZGluZyQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8Ym9vbGVhbj4oWydwZW5kaW5nJywgYWRkUGVuZGluZ10pLFxuICAgICAgICByZXNvbHZlZCQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8U3VjY2VlZEFjdGlvbk1ldGE8RGZoQ2xhc3M+PihbJ3Jlc29sdmVkJywgYWRkUGVuZGluZ10pLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAgIGtleTogYWRkUGVuZGluZ1xuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBEZmhQcm9wZXJ0eUFjdGlvbkZhY3RvcnkgZXh0ZW5kcyBTY2hlbWFBY3Rpb25zRmFjdG9yeTxQYXlsb2FkLCBEZmhQcm9wZXJ0eT4ge1xuXG4gIC8vIFN1ZmZpeGVzIG9mIGxvYWQgYWN0aW9uIHR5cGVzXG4gIHN0YXRpYyByZWFkb25seSBPRl9QUk9KRUNUID0gJ09GX1BST0pFQ1QnO1xuXG4gIGxvYWRPZlByb2plY3Q6IChwa1Byb2plY3QpID0+IEFjdGlvblJlc3VsdE9ic2VydmFibGU8RGZoUHJvcGVydHk+O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4pIHsgc3VwZXIobmdSZWR1eCkgfVxuXG4gIGNyZWF0ZUFjdGlvbnMoKTogRGZoUHJvcGVydHlBY3Rpb25GYWN0b3J5IHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHRoaXMuY3JlYXRlQ3J1ZEFjdGlvbnMoZGZoUm9vdCwgJ3Byb3BlcnR5JykpXG5cbiAgICB0aGlzLmxvYWRPZlByb2plY3QgPSAocGtQcm9qZWN0OiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IGFkZFBlbmRpbmcgPSBVLnV1aWQoKVxuICAgICAgY29uc3QgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgTG9hZEFjdGlvbk1ldGE+ID0ge1xuICAgICAgICB0eXBlOiB0aGlzLmFjdGlvblByZWZpeCArICcuJyArIHRoaXMubW9kZWxOYW1lICsgJzo6TE9BRCcgKyAnOjonICsgRGZoUHJvcGVydHlBY3Rpb25GYWN0b3J5Lk9GX1BST0pFQ1QsXG4gICAgICAgIG1ldGE6IHtcbiAgICAgICAgICBhZGRQZW5kaW5nLFxuICAgICAgICAgIHBrOiBwa1Byb2plY3RcbiAgICAgICAgfSxcbiAgICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIH07XG4gICAgICB0aGlzLm5nUmVkdXguZGlzcGF0Y2goYWN0aW9uKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGVuZGluZyQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8Ym9vbGVhbj4oWydwZW5kaW5nJywgYWRkUGVuZGluZ10pLFxuICAgICAgICByZXNvbHZlZCQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8U3VjY2VlZEFjdGlvbk1ldGE8RGZoUHJvcGVydHk+PihbJ3Jlc29sdmVkJywgYWRkUGVuZGluZ10pLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAgIGtleTogYWRkUGVuZGluZ1xuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRGZoTGFiZWxBY3Rpb25GYWN0b3J5IGV4dGVuZHMgU2NoZW1hQWN0aW9uc0ZhY3Rvcnk8UGF5bG9hZCwgRGZoTGFiZWw+IHtcblxuICAvLyBTdWZmaXhlcyBvZiBsb2FkIGFjdGlvbiB0eXBlc1xuICBzdGF0aWMgcmVhZG9ubHkgT0ZfUFJPSkVDVCA9ICdPRl9QUk9KRUNUJztcblxuICBsb2FkT2ZQcm9qZWN0OiAocGtQcm9qZWN0KSA9PiBBY3Rpb25SZXN1bHRPYnNlcnZhYmxlPERmaExhYmVsPjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+KSB7IHN1cGVyKG5nUmVkdXgpIH1cblxuICBjcmVhdGVBY3Rpb25zKCk6IERmaExhYmVsQWN0aW9uRmFjdG9yeSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCB0aGlzLmNyZWF0ZUNydWRBY3Rpb25zKGRmaFJvb3QsICdsYWJlbCcpKVxuXG4gICAgdGhpcy5sb2FkT2ZQcm9qZWN0ID0gKHBrUHJvamVjdDogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBhZGRQZW5kaW5nID0gVS51dWlkKClcbiAgICAgIGNvbnN0IGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIExvYWRBY3Rpb25NZXRhPiA9IHtcbiAgICAgICAgdHlwZTogdGhpcy5hY3Rpb25QcmVmaXggKyAnLicgKyB0aGlzLm1vZGVsTmFtZSArICc6OkxPQUQnICsgJzo6JyArIERmaExhYmVsQWN0aW9uRmFjdG9yeS5PRl9QUk9KRUNULFxuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgYWRkUGVuZGluZyxcbiAgICAgICAgICBwazogcGtQcm9qZWN0XG4gICAgICAgIH0sXG4gICAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICB9O1xuICAgICAgdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKGFjdGlvbilcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBlbmRpbmckOiB0aGlzLm5nUmVkdXguc2VsZWN0PGJvb2xlYW4+KFsncGVuZGluZycsIGFkZFBlbmRpbmddKSxcbiAgICAgICAgcmVzb2x2ZWQkOiB0aGlzLm5nUmVkdXguc2VsZWN0PFN1Y2NlZWRBY3Rpb25NZXRhPERmaExhYmVsPj4oWydyZXNvbHZlZCcsIGFkZFBlbmRpbmddKS5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgICAgICBrZXk6IGFkZFBlbmRpbmdcbiAgICAgIH07XG4gICAgfVxuXG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5cbnR5cGUgUGF5bG9hZCA9IERmaENsYXNzU2xpY2U7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIERmaEFjdGlvbnMge1xuXG5cbiAgcHJvZmlsZSA9IG5ldyBEZmhQcm9maWxlQWN0aW9uRmFjdG9yeSh0aGlzLm5nUmVkdXgpLmNyZWF0ZUFjdGlvbnMoKTtcbiAga2xhc3MgPSBuZXcgRGZoQ2xhc3NBY3Rpb25GYWN0b3J5KHRoaXMubmdSZWR1eCkuY3JlYXRlQWN0aW9ucygpO1xuICBwcm9wZXJ0eSA9IG5ldyBEZmhQcm9wZXJ0eUFjdGlvbkZhY3RvcnkodGhpcy5uZ1JlZHV4KS5jcmVhdGVBY3Rpb25zKCk7XG4gIGxhYmVsID0gbmV3IERmaExhYmVsQWN0aW9uRmFjdG9yeSh0aGlzLm5nUmVkdXgpLmNyZWF0ZUFjdGlvbnMoKTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+KSB7IH1cblxufVxuIl19