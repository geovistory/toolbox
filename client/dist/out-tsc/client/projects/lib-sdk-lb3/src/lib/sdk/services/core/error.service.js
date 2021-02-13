import * as tslib_1 from "tslib";
/* tslint:disable */
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
/**
 * Default error handler
 */
let ErrorHandler = class ErrorHandler {
    handleError(errorResponse) {
        return throwError(errorResponse.error.error || 'Server error');
    }
};
ErrorHandler = tslib_1.__decorate([
    Injectable()
], ErrorHandler);
export { ErrorHandler };
//# sourceMappingURL=error.service.js.map