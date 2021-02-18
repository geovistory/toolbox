/**
 * @fileoverview added by tsickle
 * Generated from: date-time.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimePrimitivePipe } from './pipes/time-primitive.pipe';
import { TimeSpanPipe } from './pipes/time-span.pipe';
var DateTimeModule = /** @class */ (function () {
    function DateTimeModule() {
    }
    DateTimeModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                    ],
                    providers: [
                        TimePrimitivePipe,
                        TimeSpanPipe,
                        DatePipe
                    ],
                    declarations: [
                        TimeSpanPipe,
                        TimePrimitivePipe,
                    ],
                    exports: [
                        TimeSpanPipe,
                        TimePrimitivePipe,
                    ]
                },] }
    ];
    return DateTimeModule;
}());
export { DateTimeModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItdXRpbHMvc3JjL2xpYi9kYXRlLXRpbWUvIiwic291cmNlcyI6WyJkYXRlLXRpbWUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUV0RDtJQUFBO0lBa0I4QixDQUFDOztnQkFsQjlCLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTtxQkFDYjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1QsaUJBQWlCO3dCQUNqQixZQUFZO3dCQUNaLFFBQVE7cUJBQ1Q7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLFlBQVk7d0JBQ1osaUJBQWlCO3FCQUNsQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixpQkFBaUI7cUJBQ2xCO2lCQUNGOztJQUM2QixxQkFBQztDQUFBLEFBbEIvQixJQWtCK0I7U0FBbEIsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSwgRGF0ZVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRpbWVQcmltaXRpdmVQaXBlIH0gZnJvbSAnLi9waXBlcy90aW1lLXByaW1pdGl2ZS5waXBlJztcbmltcG9ydCB7IFRpbWVTcGFuUGlwZSB9IGZyb20gJy4vcGlwZXMvdGltZS1zcGFuLnBpcGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBUaW1lUHJpbWl0aXZlUGlwZSxcbiAgICBUaW1lU3BhblBpcGUsXG4gICAgRGF0ZVBpcGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgVGltZVNwYW5QaXBlLFxuICAgIFRpbWVQcmltaXRpdmVQaXBlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgVGltZVNwYW5QaXBlLFxuICAgIFRpbWVQcmltaXRpdmVQaXBlLFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERhdGVUaW1lTW9kdWxlIHsgfVxuIl19