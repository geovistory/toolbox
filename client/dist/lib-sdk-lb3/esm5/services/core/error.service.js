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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc2RrLWxiMy8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL2NvcmUvZXJyb3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsb0JBQW9CO0FBQ3BCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFjLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM5Qzs7R0FFRztBQUVIO0lBQUE7SUFJQSxDQUFDO0lBSFEsa0NBQVcsR0FBbEIsVUFBbUIsYUFBZ0M7UUFDakQsT0FBTyxVQUFVLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksY0FBYyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUhVLFlBQVk7UUFEeEIsVUFBVSxFQUFFO09BQ0EsWUFBWSxDQUl4QjtJQUFELG1CQUFDO0NBQUEsQUFKRCxJQUlDO1NBSlksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbi8qKlxuICogRGVmYXVsdCBlcnJvciBoYW5kbGVyXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBFcnJvckhhbmRsZXIge1xuICBwdWJsaWMgaGFuZGxlRXJyb3IoZXJyb3JSZXNwb25zZTogSHR0cEVycm9yUmVzcG9uc2UpOiBPYnNlcnZhYmxlPG5ldmVyPiB7XG4gICAgcmV0dXJuIHRocm93RXJyb3IoZXJyb3JSZXNwb25zZS5lcnJvci5lcnJvciB8fCAnU2VydmVyIGVycm9yJyk7XG4gIH1cbn1cbiJdfQ==