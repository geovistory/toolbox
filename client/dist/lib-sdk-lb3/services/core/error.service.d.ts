import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
/**
 * Default error handler
 */
export declare class ErrorHandler {
    handleError(errorResponse: HttpErrorResponse): Observable<never>;
}
