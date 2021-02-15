/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/module/redux-queries.module.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdXgtcXVlcmllcy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXF1ZXJpZXMvIiwic291cmNlcyI6WyJsaWIvcXVlcmllcy9tb2R1bGUvcmVkdXgtcXVlcmllcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUlsRDtJQVVFLDRCQUMwQixZQUFnQyxFQUM1QyxXQUF3Qjs7WUFFOUIsTUFBTSxHQUFhLEVBQUU7UUFDM0IsSUFBSSxZQUFZO1lBQUUsTUFBTSxDQUFDLElBQUksQ0FBQywyRUFBMkUsQ0FBQyxDQUFDO1FBQzNHLElBQUksQ0FBQyxXQUFXO1lBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyx1REFBdUQsQ0FBQyxDQUFDO1FBQ3ZGLElBQUksTUFBTSxDQUFDLE1BQU07WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN4RCxDQUFDOztnQkFsQkYsUUFBUSxTQUFDO29CQUNSLFlBQVksRUFBRSxFQUFFO29CQUNoQixPQUFPLEVBQUU7d0JBQ1AsWUFBWTtxQkFDYjtvQkFDRCxTQUFTLEVBQUUsRUFFVjtpQkFDRjs7OztnQkFHeUMsa0JBQWtCLHVCQUF2RCxRQUFRLFlBQUksUUFBUTtnQkFmaEIsV0FBVyx1QkFnQmYsUUFBUTs7SUFPYix5QkFBQztDQUFBLEFBbkJELElBbUJDO1NBVlksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlLCBPcHRpb25hbCwgU2tpcFNlbGYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlZHV4TW9kdWxlIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1yZWR1eCc7XG5cblxuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtdLFxuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICBdLFxuICBwcm92aWRlcnM6IFtcblxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFJlZHV4UXVlcmllc01vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHBhcmVudE1vZHVsZTogUmVkdXhRdWVyaWVzTW9kdWxlLFxuICAgIEBPcHRpb25hbCgpIHJlZHV4TW9kdWxlOiBSZWR1eE1vZHVsZSxcbiAgKSB7XG4gICAgY29uc3QgZXJyb3JzOiBzdHJpbmdbXSA9IFtdXG4gICAgaWYgKHBhcmVudE1vZHVsZSkgZXJyb3JzLnB1c2goJ1JlZHV4UXVlcmllc01vZHVsZSBpcyBhbHJlYWR5IGxvYWRlZC4gSW1wb3J0IGluIHlvdXIgYmFzZSBBcHBNb2R1bGUgb25seS4nKTtcbiAgICBpZiAoIXJlZHV4TW9kdWxlKSBlcnJvcnMucHVzaCgnWW91IG5lZWQgdG8gaW1wb3J0IHRoZSBSZWR1eE1vZHVsZSBpbiB5b3VyIEFwcE1vZHVsZSEnKTtcbiAgICBpZiAoZXJyb3JzLmxlbmd0aCkgdGhyb3cgbmV3IEVycm9yKGVycm9ycy5qb2luKCdcXG4nKSk7XG4gIH1cbn1cbiJdfQ==