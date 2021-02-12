/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/actions/tab.actions.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmFjdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4LyIsInNvdXJjZXMiOlsibGliL3JlZHV4LXN0b3JlL3N0YXRlLXNjaGVtYS9hY3Rpb25zL3RhYi5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJM0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDMUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRzdDO0lBS0Usb0JBQW1CLE9BQTJCO1FBQTNCLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBRjlDLFNBQUksR0FBRyxJQUFJLG9CQUFvQixDQUF3QixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBRXJELENBQUM7O2dCQUxwRCxVQUFVOzs7O2dCQVRGLE9BQU87O0lBZ0JoQixpQkFBQztDQUFBLEFBUEQsSUFPQztTQU5ZLFVBQVU7OztJQUVyQiwwQkFBdUc7O0lBRTNGLDZCQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nUmVkdXggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUYWJDZWxsIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IElBcHBTdGF0ZSB9IGZyb20gJy4uLy4uL3Jvb3QvbW9kZWxzJztcbmltcG9ydCB7IFRhYkNlbGxTbGljZSB9IGZyb20gJy4uL21vZGVscyc7XG5pbXBvcnQgeyBTY2hlbWFBY3Rpb25zRmFjdG9yeSB9IGZyb20gJy4uL19oZWxwZXJzL3NjaGVtYS1hY3Rpb25zLWZhY3RvcnknO1xuaW1wb3J0IHsgdGFiUm9vdCB9IGZyb20gJy4uL3JlZHVjZXItY29uZmlncyc7XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRhYkFjdGlvbnMge1xuXG4gIGNlbGwgPSBuZXcgU2NoZW1hQWN0aW9uc0ZhY3Rvcnk8VGFiQ2VsbFNsaWNlLCBUYWJDZWxsPih0aGlzLm5nUmVkdXgpLmNyZWF0ZUNydWRBY3Rpb25zKHRhYlJvb3QsICdjZWxsJylcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+KSB7IH1cblxufVxuIl19