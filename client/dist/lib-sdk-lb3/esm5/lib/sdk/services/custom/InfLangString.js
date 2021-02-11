import * as tslib_1 from "tslib";
/* tslint:disable */
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SDKModels } from './SDKModels';
import { BaseLoopBackApi } from '../core/base.service';
import { LoopBackAuth } from '../core/auth.service';
import { ErrorHandler } from '../core/error.service';
import { SocketConnection } from '../../sockets/socket.connections';
/**
 * Api services for the `InfLangString` model.
 */
var InfLangStringApi = /** @class */ (function (_super) {
    tslib_1.__extends(InfLangStringApi, _super);
    function InfLangStringApi(http, connection, models, auth, errorHandler) {
        var _this = _super.call(this, http, connection, models, auth, errorHandler) || this;
        _this.http = http;
        _this.connection = connection;
        _this.models = models;
        _this.auth = auth;
        _this.errorHandler = errorHandler;
        return _this;
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfLangString`.
     */
    InfLangStringApi.prototype.getModelName = function () {
        return "InfLangString";
    };
    InfLangStringApi.ctorParameters = function () { return [
        { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
        { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
        { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
        { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
        { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
    ]; };
    InfLangStringApi = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(0, Inject(HttpClient)),
        tslib_1.__param(1, Inject(SocketConnection)),
        tslib_1.__param(2, Inject(SDKModels)),
        tslib_1.__param(3, Inject(LoopBackAuth)),
        tslib_1.__param(4, Optional()), tslib_1.__param(4, Inject(ErrorHandler))
    ], InfLangStringApi);
    return InfLangStringApi;
}(BaseLoopBackApi));
export { InfLangStringApi };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5mTGFuZ1N0cmluZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc2RrLWxiMy8iLCJzb3VyY2VzIjpbImxpYi9zZGsvc2VydmljZXMvY3VzdG9tL0luZkxhbmdTdHJpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9CQUFvQjtBQUNwQixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNoRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUV2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBSXJELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBTXBFOztHQUVHO0FBRUg7SUFBc0MsNENBQWU7SUFFbkQsMEJBQ2dDLElBQWdCLEVBQ1YsVUFBNEIsRUFDbkMsTUFBaUIsRUFDZCxJQUFrQixFQUNOLFlBQTBCO1FBTHhFLFlBT0Usa0JBQU0sSUFBSSxFQUFHLFVBQVUsRUFBRyxNQUFNLEVBQUUsSUFBSSxFQUFFLFlBQVksQ0FBQyxTQUN0RDtRQVArQixVQUFJLEdBQUosSUFBSSxDQUFZO1FBQ1YsZ0JBQVUsR0FBVixVQUFVLENBQWtCO1FBQ25DLFlBQU0sR0FBTixNQUFNLENBQVc7UUFDZCxVQUFJLEdBQUosSUFBSSxDQUFjO1FBQ04sa0JBQVksR0FBWixZQUFZLENBQWM7O0lBR3hFLENBQUM7SUFFRDs7O09BR0c7SUFDSSx1Q0FBWSxHQUFuQjtRQUNFLE9BQU8sZUFBZSxDQUFDO0lBQ3pCLENBQUM7O2dCQWZxQyxVQUFVLHVCQUE3QyxNQUFNLFNBQUMsVUFBVTtnQkFDOEIsZ0JBQWdCLHVCQUEvRCxNQUFNLFNBQUMsZ0JBQWdCO2dCQUNhLFNBQVMsdUJBQTdDLE1BQU0sU0FBQyxTQUFTO2dCQUNxQixZQUFZLHVCQUFqRCxNQUFNLFNBQUMsWUFBWTtnQkFDc0MsWUFBWSx1QkFBckUsUUFBUSxZQUFJLE1BQU0sU0FBQyxZQUFZOztJQVB2QixnQkFBZ0I7UUFENUIsVUFBVSxFQUFFO1FBSVIsbUJBQUEsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQ2xCLG1CQUFBLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1FBQ3hCLG1CQUFBLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUNqQixtQkFBQSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDcEIsbUJBQUEsUUFBUSxFQUFFLENBQUEsRUFBRSxtQkFBQSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUE7T0FQeEIsZ0JBQWdCLENBbUI1QjtJQUFELHVCQUFDO0NBQUEsQUFuQkQsQ0FBc0MsZUFBZSxHQW1CcEQ7U0FuQlksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IFNES01vZGVscyB9IGZyb20gJy4vU0RLTW9kZWxzJztcbmltcG9ydCB7IEJhc2VMb29wQmFja0FwaSB9IGZyb20gJy4uL2NvcmUvYmFzZS5zZXJ2aWNlJztcbmltcG9ydCB7IExvb3BCYWNrQ29uZmlnIH0gZnJvbSAnLi4vLi4vbGIuY29uZmlnJztcbmltcG9ydCB7IExvb3BCYWNrQXV0aCB9IGZyb20gJy4uL2NvcmUvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IExvb3BCYWNrRmlsdGVyLCAgfSBmcm9tICcuLi8uLi9tb2RlbHMvQmFzZU1vZGVscyc7XG5pbXBvcnQgeyBFcnJvckhhbmRsZXIgfSBmcm9tICcuLi9jb3JlL2Vycm9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSW5mTGFuZ1N0cmluZyB9IGZyb20gJy4uLy4uL21vZGVscy9JbmZMYW5nU3RyaW5nJztcbmltcG9ydCB7IFNvY2tldENvbm5lY3Rpb24gfSBmcm9tICcuLi8uLi9zb2NrZXRzL3NvY2tldC5jb25uZWN0aW9ucyc7XG5pbXBvcnQgeyBQcm9JbmZvUHJvalJlbCB9IGZyb20gJy4uLy4uL21vZGVscy9Qcm9JbmZvUHJvalJlbCc7XG5pbXBvcnQgeyBJbmZTdGF0ZW1lbnQgfSBmcm9tICcuLi8uLi9tb2RlbHMvSW5mU3RhdGVtZW50JztcbmltcG9ydCB7IEluZkxhbmd1YWdlIH0gZnJvbSAnLi4vLi4vbW9kZWxzL0luZkxhbmd1YWdlJztcblxuXG4vKipcbiAqIEFwaSBzZXJ2aWNlcyBmb3IgdGhlIGBJbmZMYW5nU3RyaW5nYCBtb2RlbC5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEluZkxhbmdTdHJpbmdBcGkgZXh0ZW5kcyBCYXNlTG9vcEJhY2tBcGkge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoSHR0cENsaWVudCkgcHJvdGVjdGVkIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgQEluamVjdChTb2NrZXRDb25uZWN0aW9uKSBwcm90ZWN0ZWQgY29ubmVjdGlvbjogU29ja2V0Q29ubmVjdGlvbixcbiAgICBASW5qZWN0KFNES01vZGVscykgcHJvdGVjdGVkIG1vZGVsczogU0RLTW9kZWxzLFxuICAgIEBJbmplY3QoTG9vcEJhY2tBdXRoKSBwcm90ZWN0ZWQgYXV0aDogTG9vcEJhY2tBdXRoLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoRXJyb3JIYW5kbGVyKSBwcm90ZWN0ZWQgZXJyb3JIYW5kbGVyOiBFcnJvckhhbmRsZXJcbiAgKSB7XG4gICAgc3VwZXIoaHR0cCwgIGNvbm5lY3Rpb24sICBtb2RlbHMsIGF1dGgsIGVycm9ySGFuZGxlcik7XG4gIH1cblxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxuICAgKiBpLmUuIGBJbmZMYW5nU3RyaW5nYC5cbiAgICovXG4gIHB1YmxpYyBnZXRNb2RlbE5hbWUoKSB7XG4gICAgcmV0dXJuIFwiSW5mTGFuZ1N0cmluZ1wiO1xuICB9XG59XG4iXX0=