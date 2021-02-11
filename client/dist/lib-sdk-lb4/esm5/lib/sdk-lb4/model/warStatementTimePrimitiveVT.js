/**
 * @fileoverview added by tsickle
 * Generated from: lib/sdk-lb4/model/warStatementTimePrimitiveVT.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// WARNING: interface has both a type and a value, skipping emit
export var WarStatementTimePrimitiveVT;
(function (WarStatementTimePrimitiveVT) {
    WarStatementTimePrimitiveVT.DurationEnum = {
        Century: (/** @type {?} */ ('1 century')),
        Decade: (/** @type {?} */ ('1 decade')),
        Year: (/** @type {?} */ ('1 year')),
        Month: (/** @type {?} */ ('1 month')),
        Day: (/** @type {?} */ ('1 day')),
        Hour: (/** @type {?} */ ('1 hour')),
        Minute: (/** @type {?} */ ('1 minute')),
        Second: (/** @type {?} */ ('1 second'))
    };
    WarStatementTimePrimitiveVT.CalendarEnum = {
        Gregorian: (/** @type {?} */ ('gregorian')),
        Julian: (/** @type {?} */ ('julian'))
    };
})(WarStatementTimePrimitiveVT || (WarStatementTimePrimitiveVT = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FyU3RhdGVtZW50VGltZVByaW1pdGl2ZVZULmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1zZGstbGI0LyIsInNvdXJjZXMiOlsibGliL3Nkay1sYjQvbW9kZWwvd2FyU3RhdGVtZW50VGltZVByaW1pdGl2ZVZULnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQXdCQSxNQUFNLEtBQVcsMkJBQTJCLENBaUIzQztBQWpCRCxXQUFpQiwyQkFBMkI7SUFFM0Isd0NBQVksR0FBRztRQUN4QixPQUFPLEVBQUUsbUJBQUEsV0FBVyxFQUFnQjtRQUNwQyxNQUFNLEVBQUUsbUJBQUEsVUFBVSxFQUFnQjtRQUNsQyxJQUFJLEVBQUUsbUJBQUEsUUFBUSxFQUFnQjtRQUM5QixLQUFLLEVBQUUsbUJBQUEsU0FBUyxFQUFnQjtRQUNoQyxHQUFHLEVBQUUsbUJBQUEsT0FBTyxFQUFnQjtRQUM1QixJQUFJLEVBQUUsbUJBQUEsUUFBUSxFQUFnQjtRQUM5QixNQUFNLEVBQUUsbUJBQUEsVUFBVSxFQUFnQjtRQUNsQyxNQUFNLEVBQUUsbUJBQUEsVUFBVSxFQUFnQjtLQUNyQztJQUVZLHdDQUFZLEdBQUc7UUFDeEIsU0FBUyxFQUFFLG1CQUFBLFdBQVcsRUFBZ0I7UUFDdEMsTUFBTSxFQUFFLG1CQUFBLFFBQVEsRUFBZ0I7S0FDbkM7QUFDTCxDQUFDLEVBakJnQiwyQkFBMkIsS0FBM0IsMkJBQTJCLFFBaUIzQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogZ2VvdmlzdG9yeVxuICogR2VvdmlzdG9yeSDigJMgUGxhdGZvcm0gZm9yIERpZ2l0YWwgSGlzdG9yeVxuICpcbiAqIFRoZSB2ZXJzaW9uIG9mIHRoZSBPcGVuQVBJIGRvY3VtZW50OiAxLjAuMFxuICogXG4gKlxuICogTk9URTogVGhpcyBjbGFzcyBpcyBhdXRvIGdlbmVyYXRlZCBieSBPcGVuQVBJIEdlbmVyYXRvciAoaHR0cHM6Ly9vcGVuYXBpLWdlbmVyYXRvci50ZWNoKS5cbiAqIGh0dHBzOi8vb3BlbmFwaS1nZW5lcmF0b3IudGVjaFxuICogRG8gbm90IGVkaXQgdGhlIGNsYXNzIG1hbnVhbGx5LlxuICovXG5pbXBvcnQgeyBXYXJTdGF0ZW1lbnRUaW1lUHJpbWl0aXZlVlRQYXJ0IH0gZnJvbSAnLi93YXJTdGF0ZW1lbnRUaW1lUHJpbWl0aXZlVlRQYXJ0JztcblxuXG5leHBvcnQgaW50ZXJmYWNlIFdhclN0YXRlbWVudFRpbWVQcmltaXRpdmVWVCB7IFxuICAgIHBrRW50aXR5OiBudW1iZXI7XG4gICAgZmtDbGFzczogbnVtYmVyO1xuICAgIGp1bGlhbkRheTogbnVtYmVyO1xuICAgIGxhYmVsOiBzdHJpbmc7XG4gICAgZHVyYXRpb246IFdhclN0YXRlbWVudFRpbWVQcmltaXRpdmVWVC5EdXJhdGlvbkVudW07XG4gICAgY2FsZW5kYXI6IFdhclN0YXRlbWVudFRpbWVQcmltaXRpdmVWVC5DYWxlbmRhckVudW07XG4gICAgZnJvbTogV2FyU3RhdGVtZW50VGltZVByaW1pdGl2ZVZUUGFydDtcbiAgICB0bzogV2FyU3RhdGVtZW50VGltZVByaW1pdGl2ZVZUUGFydDtcbn1cbmV4cG9ydCBuYW1lc3BhY2UgV2FyU3RhdGVtZW50VGltZVByaW1pdGl2ZVZUIHtcbiAgICBleHBvcnQgdHlwZSBEdXJhdGlvbkVudW0gPSAnMSBjZW50dXJ5JyB8ICcxIGRlY2FkZScgfCAnMSB5ZWFyJyB8ICcxIG1vbnRoJyB8ICcxIGRheScgfCAnMSBob3VyJyB8ICcxIG1pbnV0ZScgfCAnMSBzZWNvbmQnO1xuICAgIGV4cG9ydCBjb25zdCBEdXJhdGlvbkVudW0gPSB7XG4gICAgICAgIENlbnR1cnk6ICcxIGNlbnR1cnknIGFzIER1cmF0aW9uRW51bSxcbiAgICAgICAgRGVjYWRlOiAnMSBkZWNhZGUnIGFzIER1cmF0aW9uRW51bSxcbiAgICAgICAgWWVhcjogJzEgeWVhcicgYXMgRHVyYXRpb25FbnVtLFxuICAgICAgICBNb250aDogJzEgbW9udGgnIGFzIER1cmF0aW9uRW51bSxcbiAgICAgICAgRGF5OiAnMSBkYXknIGFzIER1cmF0aW9uRW51bSxcbiAgICAgICAgSG91cjogJzEgaG91cicgYXMgRHVyYXRpb25FbnVtLFxuICAgICAgICBNaW51dGU6ICcxIG1pbnV0ZScgYXMgRHVyYXRpb25FbnVtLFxuICAgICAgICBTZWNvbmQ6ICcxIHNlY29uZCcgYXMgRHVyYXRpb25FbnVtXG4gICAgfTtcbiAgICBleHBvcnQgdHlwZSBDYWxlbmRhckVudW0gPSAnZ3JlZ29yaWFuJyB8ICdqdWxpYW4nO1xuICAgIGV4cG9ydCBjb25zdCBDYWxlbmRhckVudW0gPSB7XG4gICAgICAgIEdyZWdvcmlhbjogJ2dyZWdvcmlhbicgYXMgQ2FsZW5kYXJFbnVtLFxuICAgICAgICBKdWxpYW46ICdqdWxpYW4nIGFzIENhbGVuZGFyRW51bVxuICAgIH07XG59XG5cblxuIl19