/**
 * @fileoverview added by tsickle
 * Generated from: module/redux-queries.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ReduxModule } from '@kleiolab/lib-redux';
export class ReduxQueriesModule {
    /**
     * @param {?} parentModule
     * @param {?} reduxModule
     */
    constructor(parentModule, reduxModule) {
        /** @type {?} */
        const errors = [];
        if (parentModule)
            errors.push('ReduxQueriesModule is already loaded. Import in your base AppModule only.');
        if (!reduxModule)
            errors.push('You need to import the ReduxModule in your AppModule!');
        if (errors.length)
            throw new Error(errors.join('\n'));
    }
}
ReduxQueriesModule.decorators = [
    { type: NgModule, args: [{
                declarations: [],
                imports: [
                    CommonModule,
                ],
                providers: []
            },] }
];
/** @nocollapse */
ReduxQueriesModule.ctorParameters = () => [
    { type: ReduxQueriesModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: ReduxModule, decorators: [{ type: Optional }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdXgtcXVlcmllcy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXF1ZXJpZXMvc3JjL2xpYi9xdWVyaWVzLyIsInNvdXJjZXMiOlsibW9kdWxlL3JlZHV4LXF1ZXJpZXMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFhbEQsTUFBTSxPQUFPLGtCQUFrQjs7Ozs7SUFDN0IsWUFDMEIsWUFBZ0MsRUFDNUMsV0FBd0I7O2NBRTlCLE1BQU0sR0FBYSxFQUFFO1FBQzNCLElBQUksWUFBWTtZQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsMkVBQTJFLENBQUMsQ0FBQztRQUMzRyxJQUFJLENBQUMsV0FBVztZQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsdURBQXVELENBQUMsQ0FBQztRQUN2RixJQUFJLE1BQU0sQ0FBQyxNQUFNO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQzs7O1lBbEJGLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUUsRUFBRTtnQkFDaEIsT0FBTyxFQUFFO29CQUNQLFlBQVk7aUJBQ2I7Z0JBQ0QsU0FBUyxFQUFFLEVBRVY7YUFDRjs7OztZQUd5QyxrQkFBa0IsdUJBQXZELFFBQVEsWUFBSSxRQUFRO1lBZmhCLFdBQVcsdUJBZ0JmLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUsIE9wdGlvbmFsLCBTa2lwU2VsZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVkdXhNb2R1bGUgfSBmcm9tICdAa2xlaW9sYWIvbGliLXJlZHV4JztcblxuXG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW10sXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgUmVkdXhRdWVyaWVzTW9kdWxlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50TW9kdWxlOiBSZWR1eFF1ZXJpZXNNb2R1bGUsXG4gICAgQE9wdGlvbmFsKCkgcmVkdXhNb2R1bGU6IFJlZHV4TW9kdWxlLFxuICApIHtcbiAgICBjb25zdCBlcnJvcnM6IHN0cmluZ1tdID0gW11cbiAgICBpZiAocGFyZW50TW9kdWxlKSBlcnJvcnMucHVzaCgnUmVkdXhRdWVyaWVzTW9kdWxlIGlzIGFscmVhZHkgbG9hZGVkLiBJbXBvcnQgaW4geW91ciBiYXNlIEFwcE1vZHVsZSBvbmx5LicpO1xuICAgIGlmICghcmVkdXhNb2R1bGUpIGVycm9ycy5wdXNoKCdZb3UgbmVlZCB0byBpbXBvcnQgdGhlIFJlZHV4TW9kdWxlIGluIHlvdXIgQXBwTW9kdWxlIScpO1xuICAgIGlmIChlcnJvcnMubGVuZ3RoKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3JzLmpvaW4oJ1xcbicpKTtcbiAgfVxufVxuIl19