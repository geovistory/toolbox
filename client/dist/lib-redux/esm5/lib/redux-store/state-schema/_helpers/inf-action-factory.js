/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/_helpers/inf-action-factory.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { U } from '@kleiolab/lib-utils';
import { SchemaActionsFactory } from './schema-actions-factory';
/**
 * @template Payload, Model
 */
var InfActionFactory = /** @class */ (function (_super) {
    tslib_1.__extends(InfActionFactory, _super);
    function InfActionFactory(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.ngRedux = ngRedux;
        return _this;
    }
    /**
     * @param {?} actionPrefix
     * @param {?} modelName
     * @return {?}
     */
    InfActionFactory.prototype.createInfActions = /**
     * @param {?} actionPrefix
     * @param {?} modelName
     * @return {?}
     */
    function (actionPrefix, modelName) {
        var _this = this;
        this.createCrudActions(actionPrefix, modelName);
        /**
         * Call the Redux Action to remove model instances from project.
         */
        this.remove = (/**
         * @param {?} items
         * @param {?=} pk
         * @return {?}
         */
        function (items, pk) {
            /** @type {?} */
            var addPending = U.uuid();
            /** @type {?} */
            var action = ({
                type: _this.actionPrefix + '.' + _this.modelName + '::REMOVE',
                meta: { items: items, addPending: addPending, pk: pk },
                payload: null
            });
            _this.ngRedux.dispatch(action);
            return {
                pending$: _this.ngRedux.select(['pending', addPending]),
                resolved$: _this.ngRedux.select(['resolved', addPending]),
                key: addPending
            };
        });
        this.removeSucceeded = (/**
         * @param {?} items
         * @param {?} removePending
         * @param {?=} pk
         * @return {?}
         */
        function (items, removePending, pk) {
            /** @type {?} */
            var action = ({
                type: _this.actionPrefix + '.' + _this.modelName + '::REMOVE_SUCCEEDED',
                meta: { items: items, removePending: removePending, pk: pk },
                payload: null
            });
            _this.ngRedux.dispatch(action);
        });
        return this;
    };
    InfActionFactory.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    InfActionFactory.ctorParameters = function () { return [
        { type: NgRedux }
    ]; };
    return InfActionFactory;
}(SchemaActionsFactory));
export { InfActionFactory };
if (false) {
    /**
     * \@param pk is used for facetting
     * @type {?}
     */
    InfActionFactory.prototype.remove;
    /**
     * \@param pk is used for facetting
     * @type {?}
     */
    InfActionFactory.prototype.removeSucceeded;
    /** @type {?} */
    InfActionFactory.prototype.ngRedux;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mLWFjdGlvbi1mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC8iLCJzb3VyY2VzIjpbImxpYi9yZWR1eC1zdG9yZS9zdGF0ZS1zY2hlbWEvX2hlbHBlcnMvaW5mLWFjdGlvbi1mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUd4QyxPQUFPLEVBQTRDLG9CQUFvQixFQUFxQixNQUFNLDBCQUEwQixDQUFDOzs7O0FBRTdIO0lBQ3NELDRDQUFvQztJQWF4RiwwQkFBbUIsT0FBMkI7UUFBOUMsWUFDRSxrQkFBTSxPQUFPLENBQUMsU0FDZjtRQUZrQixhQUFPLEdBQVAsT0FBTyxDQUFvQjs7SUFFOUMsQ0FBQzs7Ozs7O0lBRUQsMkNBQWdCOzs7OztJQUFoQixVQUFpQixZQUFvQixFQUFFLFNBQWlCO1FBQXhELGlCQStCQztRQTlCQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQyxDQUFBO1FBRS9DOztXQUVHO1FBQ0gsSUFBSSxDQUFDLE1BQU07Ozs7O1FBQUcsVUFBQyxLQUFjLEVBQUUsRUFBVzs7Z0JBQ2xDLFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFOztnQkFDckIsTUFBTSxHQUF5RCxDQUFDO2dCQUNwRSxJQUFJLEVBQUUsS0FBSSxDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsS0FBSSxDQUFDLFNBQVMsR0FBRyxVQUFVO2dCQUMzRCxJQUFJLEVBQUUsRUFBRSxLQUFLLE9BQUEsRUFBRSxVQUFVLFlBQUEsRUFBRSxFQUFFLElBQUEsRUFBRTtnQkFDL0IsT0FBTyxFQUFFLElBQUk7YUFDZCxDQUFDO1lBQ0YsS0FBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDN0IsT0FBTztnQkFDTCxRQUFRLEVBQUUsS0FBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQVUsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQy9ELFNBQVMsRUFBRSxLQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBMkIsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQ2xGLEdBQUcsRUFBRSxVQUFVO2FBQ2hCLENBQUM7UUFDSixDQUFDLENBQUEsQ0FBQTtRQUVELElBQUksQ0FBQyxlQUFlOzs7Ozs7UUFBRyxVQUFDLEtBQWMsRUFBRSxhQUFxQixFQUFFLEVBQVc7O2dCQUNsRSxNQUFNLEdBQTBELENBQUM7Z0JBQ3JFLElBQUksRUFBRSxLQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsR0FBRyxLQUFJLENBQUMsU0FBUyxHQUFHLG9CQUFvQjtnQkFDckUsSUFBSSxFQUFFLEVBQUUsS0FBSyxPQUFBLEVBQUUsYUFBYSxlQUFBLEVBQUUsRUFBRSxJQUFBLEVBQUU7Z0JBQ2xDLE9BQU8sRUFBRSxJQUFJO2FBQ2QsQ0FBQztZQUNGLEtBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQy9CLENBQUMsQ0FBQSxDQUFBO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOztnQkFqREYsVUFBVTs7OztnQkFQRixPQUFPOztJQTBEaEIsdUJBQUM7Q0FBQSxBQW5ERCxDQUNzRCxvQkFBb0IsR0FrRHpFO1NBbERZLGdCQUFnQjs7Ozs7O0lBTTNCLGtDQUF1RTs7Ozs7SUFLdkUsMkNBQThFOztJQUVsRSxtQ0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ1JlZHV4IH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvc3RvcmUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVSB9IGZyb20gJ0BrbGVpb2xhYi9saWItdXRpbHMnO1xuaW1wb3J0IHsgRmx1eFN0YW5kYXJkQWN0aW9uIH0gZnJvbSAnZmx1eC1zdGFuZGFyZC1hY3Rpb24nO1xuaW1wb3J0IHsgSUFwcFN0YXRlIH0gZnJvbSAnLi4vLi4vcm9vdC9tb2RlbHMnO1xuaW1wb3J0IHsgQWN0aW9uUmVzdWx0T2JzZXJ2YWJsZSwgTW9kaWZ5QWN0aW9uTWV0YSwgU2NoZW1hQWN0aW9uc0ZhY3RvcnksIFN1Y2NlZWRBY3Rpb25NZXRhIH0gZnJvbSAnLi9zY2hlbWEtYWN0aW9ucy1mYWN0b3J5JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEluZkFjdGlvbkZhY3Rvcnk8UGF5bG9hZCwgTW9kZWw+IGV4dGVuZHMgU2NoZW1hQWN0aW9uc0ZhY3Rvcnk8UGF5bG9hZCwgTW9kZWw+IHtcblxuXG4gIC8qKlxuICAgKiBAcGFyYW0gcGsgaXMgdXNlZCBmb3IgZmFjZXR0aW5nXG4gICAqL1xuICByZW1vdmU6IChpdGVtczogTW9kZWxbXSwgcGs/OiBudW1iZXIpID0+IEFjdGlvblJlc3VsdE9ic2VydmFibGU8TW9kZWw+O1xuXG4gIC8qKlxuICAgKiBAcGFyYW0gcGsgaXMgdXNlZCBmb3IgZmFjZXR0aW5nXG4gICAqL1xuICByZW1vdmVTdWNjZWVkZWQ6IChpdGVtczogTW9kZWxbXSwgcmVtb3ZlUGVuZGluZzogc3RyaW5nLCBwaz86IG51bWJlcikgPT4gdm9pZDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+KSB7XG4gICAgc3VwZXIobmdSZWR1eCk7XG4gIH1cblxuICBjcmVhdGVJbmZBY3Rpb25zKGFjdGlvblByZWZpeDogc3RyaW5nLCBtb2RlbE5hbWU6IHN0cmluZyk6IEluZkFjdGlvbkZhY3Rvcnk8UGF5bG9hZCwgTW9kZWw+IHtcbiAgICB0aGlzLmNyZWF0ZUNydWRBY3Rpb25zKGFjdGlvblByZWZpeCwgbW9kZWxOYW1lKVxuXG4gICAgLyoqXG4gICAgICogQ2FsbCB0aGUgUmVkdXggQWN0aW9uIHRvIHJlbW92ZSBtb2RlbCBpbnN0YW5jZXMgZnJvbSBwcm9qZWN0LlxuICAgICAqL1xuICAgIHRoaXMucmVtb3ZlID0gKGl0ZW1zOiBNb2RlbFtdLCBwaz86IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgYWRkUGVuZGluZyA9IFUudXVpZCgpO1xuICAgICAgY29uc3QgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgTW9kaWZ5QWN0aW9uTWV0YTxNb2RlbD4+ID0gKHtcbiAgICAgICAgdHlwZTogdGhpcy5hY3Rpb25QcmVmaXggKyAnLicgKyB0aGlzLm1vZGVsTmFtZSArICc6OlJFTU9WRScsXG4gICAgICAgIG1ldGE6IHsgaXRlbXMsIGFkZFBlbmRpbmcsIHBrIH0sXG4gICAgICAgIHBheWxvYWQ6IG51bGxcbiAgICAgIH0pXG4gICAgICB0aGlzLm5nUmVkdXguZGlzcGF0Y2goYWN0aW9uKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGVuZGluZyQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8Ym9vbGVhbj4oWydwZW5kaW5nJywgYWRkUGVuZGluZ10pLFxuICAgICAgICByZXNvbHZlZCQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8U3VjY2VlZEFjdGlvbk1ldGE8TW9kZWw+PihbJ3Jlc29sdmVkJywgYWRkUGVuZGluZ10pLFxuICAgICAgICBrZXk6IGFkZFBlbmRpbmdcbiAgICAgIH07XG4gICAgfVxuXG4gICAgdGhpcy5yZW1vdmVTdWNjZWVkZWQgPSAoaXRlbXM6IE1vZGVsW10sIHJlbW92ZVBlbmRpbmc6IHN0cmluZywgcGs/OiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIFN1Y2NlZWRBY3Rpb25NZXRhPE1vZGVsPj4gPSAoe1xuICAgICAgICB0eXBlOiB0aGlzLmFjdGlvblByZWZpeCArICcuJyArIHRoaXMubW9kZWxOYW1lICsgJzo6UkVNT1ZFX1NVQ0NFRURFRCcsXG4gICAgICAgIG1ldGE6IHsgaXRlbXMsIHJlbW92ZVBlbmRpbmcsIHBrIH0sXG4gICAgICAgIHBheWxvYWQ6IG51bGxcbiAgICAgIH0pXG4gICAgICB0aGlzLm5nUmVkdXguZGlzcGF0Y2goYWN0aW9uKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbn1cbiJdfQ==