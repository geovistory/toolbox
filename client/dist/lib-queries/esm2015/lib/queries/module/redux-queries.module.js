/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/module/redux-queries.module.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdXgtcXVlcmllcy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXF1ZXJpZXMvIiwic291cmNlcyI6WyJsaWIvcXVlcmllcy9tb2R1bGUvcmVkdXgtcXVlcmllcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQWFsRCxNQUFNLE9BQU8sa0JBQWtCOzs7OztJQUM3QixZQUMwQixZQUFnQyxFQUM1QyxXQUF3Qjs7Y0FFOUIsTUFBTSxHQUFhLEVBQUU7UUFDM0IsSUFBSSxZQUFZO1lBQUUsTUFBTSxDQUFDLElBQUksQ0FBQywyRUFBMkUsQ0FBQyxDQUFDO1FBQzNHLElBQUksQ0FBQyxXQUFXO1lBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyx1REFBdUQsQ0FBQyxDQUFDO1FBQ3ZGLElBQUksTUFBTSxDQUFDLE1BQU07WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN4RCxDQUFDOzs7WUFsQkYsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRSxFQUFFO2dCQUNoQixPQUFPLEVBQUU7b0JBQ1AsWUFBWTtpQkFDYjtnQkFDRCxTQUFTLEVBQUUsRUFFVjthQUNGOzs7O1lBR3lDLGtCQUFrQix1QkFBdkQsUUFBUSxZQUFJLFFBQVE7WUFmaEIsV0FBVyx1QkFnQmYsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSwgT3B0aW9uYWwsIFNraXBTZWxmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZWR1eE1vZHVsZSB9IGZyb20gJ0BrbGVpb2xhYi9saWItcmVkdXgnO1xuXG5cblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG5cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBSZWR1eFF1ZXJpZXNNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnRNb2R1bGU6IFJlZHV4UXVlcmllc01vZHVsZSxcbiAgICBAT3B0aW9uYWwoKSByZWR1eE1vZHVsZTogUmVkdXhNb2R1bGUsXG4gICkge1xuICAgIGNvbnN0IGVycm9yczogc3RyaW5nW10gPSBbXVxuICAgIGlmIChwYXJlbnRNb2R1bGUpIGVycm9ycy5wdXNoKCdSZWR1eFF1ZXJpZXNNb2R1bGUgaXMgYWxyZWFkeSBsb2FkZWQuIEltcG9ydCBpbiB5b3VyIGJhc2UgQXBwTW9kdWxlIG9ubHkuJyk7XG4gICAgaWYgKCFyZWR1eE1vZHVsZSkgZXJyb3JzLnB1c2goJ1lvdSBuZWVkIHRvIGltcG9ydCB0aGUgUmVkdXhNb2R1bGUgaW4geW91ciBBcHBNb2R1bGUhJyk7XG4gICAgaWYgKGVycm9ycy5sZW5ndGgpIHRocm93IG5ldyBFcnJvcihlcnJvcnMuam9pbignXFxuJykpO1xuICB9XG59XG4iXX0=