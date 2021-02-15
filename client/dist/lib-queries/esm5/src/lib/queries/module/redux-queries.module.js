/**
 * @fileoverview added by tsickle
 * Generated from: module/redux-queries.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ReduxModule } from '@kleiolab/lib-redux';
var ReduxQueriesModule = /** @class */ (function () {
    function ReduxQueriesModule(parentModule, reduxModule) {
        /** @type {?} */
        var errors = [];
        if (parentModule)
            errors.push('ReduxQueriesModule is already loaded. Import in your base AppModule only.');
        if (!reduxModule)
            errors.push('You need to import the ReduxModule in your AppModule!');
        if (errors.length)
            throw new Error(errors.join('\n'));
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
    ReduxQueriesModule.ctorParameters = function () { return [
        { type: ReduxQueriesModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: ReduxModule, decorators: [{ type: Optional }] }
    ]; };
    return ReduxQueriesModule;
}());
export { ReduxQueriesModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdXgtcXVlcmllcy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXF1ZXJpZXMvc3JjL2xpYi9xdWVyaWVzLyIsInNvdXJjZXMiOlsibW9kdWxlL3JlZHV4LXF1ZXJpZXMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFJbEQ7SUFVRSw0QkFDMEIsWUFBZ0MsRUFDNUMsV0FBd0I7O1lBRTlCLE1BQU0sR0FBYSxFQUFFO1FBQzNCLElBQUksWUFBWTtZQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsMkVBQTJFLENBQUMsQ0FBQztRQUMzRyxJQUFJLENBQUMsV0FBVztZQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsdURBQXVELENBQUMsQ0FBQztRQUN2RixJQUFJLE1BQU0sQ0FBQyxNQUFNO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQzs7Z0JBbEJGLFFBQVEsU0FBQztvQkFDUixZQUFZLEVBQUUsRUFBRTtvQkFDaEIsT0FBTyxFQUFFO3dCQUNQLFlBQVk7cUJBQ2I7b0JBQ0QsU0FBUyxFQUFFLEVBRVY7aUJBQ0Y7Ozs7Z0JBR3lDLGtCQUFrQix1QkFBdkQsUUFBUSxZQUFJLFFBQVE7Z0JBZmhCLFdBQVcsdUJBZ0JmLFFBQVE7O0lBT2IseUJBQUM7Q0FBQSxBQW5CRCxJQW1CQztTQVZZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSwgT3B0aW9uYWwsIFNraXBTZWxmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZWR1eE1vZHVsZSB9IGZyb20gJ0BrbGVpb2xhYi9saWItcmVkdXgnO1xuXG5cblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG5cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBSZWR1eFF1ZXJpZXNNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnRNb2R1bGU6IFJlZHV4UXVlcmllc01vZHVsZSxcbiAgICBAT3B0aW9uYWwoKSByZWR1eE1vZHVsZTogUmVkdXhNb2R1bGUsXG4gICkge1xuICAgIGNvbnN0IGVycm9yczogc3RyaW5nW10gPSBbXVxuICAgIGlmIChwYXJlbnRNb2R1bGUpIGVycm9ycy5wdXNoKCdSZWR1eFF1ZXJpZXNNb2R1bGUgaXMgYWxyZWFkeSBsb2FkZWQuIEltcG9ydCBpbiB5b3VyIGJhc2UgQXBwTW9kdWxlIG9ubHkuJyk7XG4gICAgaWYgKCFyZWR1eE1vZHVsZSkgZXJyb3JzLnB1c2goJ1lvdSBuZWVkIHRvIGltcG9ydCB0aGUgUmVkdXhNb2R1bGUgaW4geW91ciBBcHBNb2R1bGUhJyk7XG4gICAgaWYgKGVycm9ycy5sZW5ndGgpIHRocm93IG5ldyBFcnJvcihlcnJvcnMuam9pbignXFxuJykpO1xuICB9XG59XG4iXX0=