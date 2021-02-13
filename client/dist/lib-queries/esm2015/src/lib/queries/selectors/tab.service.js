/**
 * @fileoverview added by tsickle
 * Generated from: selectors/tab.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { TabActions, tabDefinitions, tabRoot } from '@kleiolab/lib-redux';
import * as i0 from "@angular/core";
import * as i1 from "@angular-redux/store";
class Selector {
    /**
     * @param {?} ngRedux
     * @param {?} configs
     * @param {?} model
     */
    constructor(ngRedux, configs, model) {
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
    }
    /**
     * @template M
     * @param {?} indexKey
     * @return {?}
     */
    selector(indexKey) {
        /** @type {?} */
        const all$ = this.ngRedux.select([tabRoot, this.model, indexKey]);
        /** @type {?} */
        const key = (/**
         * @param {?} x
         * @return {?}
         */
        (x) => this.ngRedux.select([tabRoot, this.model, indexKey, x]));
        return { all$, key };
    }
}
if (false) {
    /** @type {?} */
    Selector.prototype.ngRedux;
    /** @type {?} */
    Selector.prototype.configs;
    /** @type {?} */
    Selector.prototype.model;
}
class TabCellSelections extends Selector {
    /**
     * @param {?} ngRedux
     * @param {?} configs
     * @param {?} model
     */
    constructor(ngRedux, configs, model) {
        super(ngRedux, configs, model);
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
        this.by_pk_cell$ = this.selector('by_pk_cell');
        this.by_fk_column_fk_row$ = this.selector('by_fk_column_fk_row');
    }
}
if (false) {
    /** @type {?} */
    TabCellSelections.prototype.by_pk_cell$;
    /** @type {?} */
    TabCellSelections.prototype.by_fk_column_fk_row$;
    /** @type {?} */
    TabCellSelections.prototype.ngRedux;
    /** @type {?} */
    TabCellSelections.prototype.configs;
    /** @type {?} */
    TabCellSelections.prototype.model;
}
export class TabSelector extends TabActions {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
        this.cell$ = new TabCellSelections(this.ngRedux, tabDefinitions, 'cell');
    }
}
TabSelector.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
TabSelector.ctorParameters = () => [
    { type: NgRedux }
];
/** @nocollapse */ TabSelector.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function TabSelector_Factory() { return new TabSelector(i0.ɵɵinject(i1.NgRedux)); }, token: TabSelector, providedIn: "root" });
if (false) {
    /** @type {?} */
    TabSelector.prototype.cell$;
    /** @type {?} */
    TabSelector.prototype.ngRedux;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXF1ZXJpZXMvc3JjL2xpYi9xdWVyaWVzLyIsInNvdXJjZXMiOlsic2VsZWN0b3JzL3RhYi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUE0QyxVQUFVLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7QUFJcEgsTUFBTSxRQUFROzs7Ozs7SUFDWixZQUNTLE9BQTJCLEVBQzNCLE9BQWdDLEVBQ2hDLEtBQWE7UUFGYixZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUMzQixZQUFPLEdBQVAsT0FBTyxDQUF5QjtRQUNoQyxVQUFLLEdBQUwsS0FBSyxDQUFRO0lBQ2xCLENBQUM7Ozs7OztJQUVMLFFBQVEsQ0FBSSxRQUFnQjs7Y0FFcEIsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFVLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7O2NBRXBFLEdBQUc7Ozs7UUFBRyxDQUFDLENBQUMsRUFBaUIsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFFNUYsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQTtJQUN0QixDQUFDO0NBQ0Y7OztJQWJHLDJCQUFrQzs7SUFDbEMsMkJBQXVDOztJQUN2Qyx5QkFBb0I7O0FBYXhCLE1BQU0saUJBQWtCLFNBQVEsUUFBUTs7Ozs7O0lBSXRDLFlBQ1MsT0FBMkIsRUFDM0IsT0FBZ0MsRUFDaEMsS0FBYTtRQUNsQixLQUFLLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUh6QixZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUMzQixZQUFPLEdBQVAsT0FBTyxDQUF5QjtRQUNoQyxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBTmYsZ0JBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFVLFlBQVksQ0FBQyxDQUFBO1FBQ2xELHlCQUFvQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQWdCLHFCQUFxQixDQUFDLENBQUE7SUFNOUMsQ0FBQztDQUVyQzs7O0lBVEMsd0NBQXlEOztJQUN6RCxpREFBaUY7O0lBRy9FLG9DQUFrQzs7SUFDbEMsb0NBQXVDOztJQUN2QyxrQ0FBb0I7O0FBUXhCLE1BQU0sT0FBTyxXQUFZLFNBQVEsVUFBVTs7OztJQUl6QyxZQUFtQixPQUEyQjtRQUM1QyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7UUFERyxZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUY5QyxVQUFLLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUlwRSxDQUFDOzs7WUFURixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFyQ1EsT0FBTzs7Ozs7SUF3Q2QsNEJBQW9FOztJQUV4RCw4QkFBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ1JlZHV4IH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvc3RvcmUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQnlQaywgSUFwcFN0YXRlLCBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbiwgVGFiQWN0aW9ucywgdGFiRGVmaW5pdGlvbnMsIHRhYlJvb3QgfSBmcm9tICdAa2xlaW9sYWIvbGliLXJlZHV4JztcbmltcG9ydCB7IFRhYkNlbGwgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5jbGFzcyBTZWxlY3RvciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyB9XG5cbiAgc2VsZWN0b3I8TT4oaW5kZXhLZXk6IHN0cmluZyk6IHsgYWxsJDogT2JzZXJ2YWJsZTxCeVBrPE0+Piwga2V5OiAoeCkgPT4gT2JzZXJ2YWJsZTxNPiB9IHtcblxuICAgIGNvbnN0IGFsbCQgPSB0aGlzLm5nUmVkdXguc2VsZWN0PEJ5UGs8TT4+KFt0YWJSb290LCB0aGlzLm1vZGVsLCBpbmRleEtleV0pXG5cbiAgICBjb25zdCBrZXkgPSAoeCk6IE9ic2VydmFibGU8TT4gPT4gdGhpcy5uZ1JlZHV4LnNlbGVjdDxNPihbdGFiUm9vdCwgdGhpcy5tb2RlbCwgaW5kZXhLZXksIHhdKVxuXG4gICAgcmV0dXJuIHsgYWxsJCwga2V5IH1cbiAgfVxufVxuXG5jbGFzcyBUYWJDZWxsU2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yIHtcbiAgcHVibGljIGJ5X3BrX2NlbGwkID0gdGhpcy5zZWxlY3RvcjxUYWJDZWxsPignYnlfcGtfY2VsbCcpXG4gIHB1YmxpYyBieV9ma19jb2x1bW5fZmtfcm93JCA9IHRoaXMuc2VsZWN0b3I8QnlQazxUYWJDZWxsPj4oJ2J5X2ZrX2NvbHVtbl9ma19yb3cnKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBjb25maWdzLCBtb2RlbCkgfVxuXG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFRhYlNlbGVjdG9yIGV4dGVuZHMgVGFiQWN0aW9ucyB7XG5cbiAgY2VsbCQgPSBuZXcgVGFiQ2VsbFNlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCB0YWJEZWZpbml0aW9ucywgJ2NlbGwnKTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+KSB7XG4gICAgc3VwZXIobmdSZWR1eClcbiAgfVxuXG59XG4iXX0=