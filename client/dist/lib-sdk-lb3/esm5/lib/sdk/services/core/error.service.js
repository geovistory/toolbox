import * as tslib_1 from "tslib";
/* tslint:disable */
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
/**
 * Default error handler
 */
var ErrorHandler = /** @class */ (function () {
    function ErrorHandler() {
    }
    ErrorHandler.prototype.handleError = function (errorResponse) {
        return throwError(errorResponse.error.error || 'Server error');
    };
    ErrorHandler = tslib_1.__decorate([
        Injectable()
    ], ErrorHandler);
    return ErrorHandler;
}());
export { ErrorHandler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc2RrLWxiMy8iLCJzb3VyY2VzIjpbImxpYi9zZGsvc2VydmljZXMvY29yZS9lcnJvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvQkFBb0I7QUFDcEIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQWMsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzlDOztHQUVHO0FBRUg7SUFBQTtJQUlBLENBQUM7SUFIUSxrQ0FBVyxHQUFsQixVQUFtQixhQUFnQztRQUNqRCxPQUFPLFVBQVUsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxjQUFjLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBSFUsWUFBWTtRQUR4QixVQUFVLEVBQUU7T0FDQSxZQUFZLENBSXhCO0lBQUQsbUJBQUM7Q0FBQSxBQUpELElBSUM7U0FKWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xuLyoqXG4gKiBEZWZhdWx0IGVycm9yIGhhbmRsZXJcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEVycm9ySGFuZGxlciB7XG4gIHB1YmxpYyBoYW5kbGVFcnJvcihlcnJvclJlc3BvbnNlOiBIdHRwRXJyb3JSZXNwb25zZSk6IE9ic2VydmFibGU8bmV2ZXI+IHtcbiAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJvclJlc3BvbnNlLmVycm9yLmVycm9yIHx8ICdTZXJ2ZXIgZXJyb3InKTtcbiAgfVxufVxuIl19