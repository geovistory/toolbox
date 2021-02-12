/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/actions/tab.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { SchemaActionsFactory } from '../_helpers/schema-actions-factory';
import { tabRoot } from '../reducer-configs';
var TabActions = /** @class */ (function () {
    function TabActions(ngRedux) {
        this.ngRedux = ngRedux;
        this.cell = new SchemaActionsFactory(this.ngRedux).createCrudActions(tabRoot, 'cell');
    }
    TabActions.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    TabActions.ctorParameters = function () { return [
        { type: NgRedux }
    ]; };
    return TabActions;
}());
export { TabActions };
if (false) {
    /** @type {?} */
    TabActions.prototype.cell;
    /** @type {?} */
    TabActions.prototype.ngRedux;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmFjdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4L3NyYy9saWIvcmVkdXgtc3RvcmUvIiwic291cmNlcyI6WyJzdGF0ZS1zY2hlbWEvYWN0aW9ucy90YWIuYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTNDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUc3QztJQUtFLG9CQUFtQixPQUEyQjtRQUEzQixZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUY5QyxTQUFJLEdBQUcsSUFBSSxvQkFBb0IsQ0FBd0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUVyRCxDQUFDOztnQkFMcEQsVUFBVTs7OztnQkFURixPQUFPOztJQWdCaEIsaUJBQUM7Q0FBQSxBQVBELElBT0M7U0FOWSxVQUFVOzs7SUFFckIsMEJBQXVHOztJQUUzRiw2QkFBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ1JlZHV4IH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvc3RvcmUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGFiQ2VsbCB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBJQXBwU3RhdGUgfSBmcm9tICcuLi8uLi9yb290L21vZGVscyc7XG5pbXBvcnQgeyBUYWJDZWxsU2xpY2UgfSBmcm9tICcuLi9tb2RlbHMnO1xuaW1wb3J0IHsgU2NoZW1hQWN0aW9uc0ZhY3RvcnkgfSBmcm9tICcuLi9faGVscGVycy9zY2hlbWEtYWN0aW9ucy1mYWN0b3J5JztcbmltcG9ydCB7IHRhYlJvb3QgfSBmcm9tICcuLi9yZWR1Y2VyLWNvbmZpZ3MnO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUYWJBY3Rpb25zIHtcblxuICBjZWxsID0gbmV3IFNjaGVtYUFjdGlvbnNGYWN0b3J5PFRhYkNlbGxTbGljZSwgVGFiQ2VsbD4odGhpcy5uZ1JlZHV4KS5jcmVhdGVDcnVkQWN0aW9ucyh0YWJSb290LCAnY2VsbCcpXG5cbiAgY29uc3RydWN0b3IocHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPikgeyB9XG5cbn1cbiJdfQ==