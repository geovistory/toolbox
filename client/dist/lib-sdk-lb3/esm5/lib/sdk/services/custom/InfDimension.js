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
 * Api services for the `InfDimension` model.
 */
var InfDimensionApi = /** @class */ (function (_super) {
    tslib_1.__extends(InfDimensionApi, _super);
    function InfDimensionApi(http, connection, models, auth, errorHandler) {
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
     * i.e. `InfDimension`.
     */
    InfDimensionApi.prototype.getModelName = function () {
        return "InfDimension";
    };
    InfDimensionApi.ctorParameters = function () { return [
        { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
        { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
        { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
        { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
        { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
    ]; };
    InfDimensionApi = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(0, Inject(HttpClient)),
        tslib_1.__param(1, Inject(SocketConnection)),
        tslib_1.__param(2, Inject(SDKModels)),
        tslib_1.__param(3, Inject(LoopBackAuth)),
        tslib_1.__param(4, Optional()), tslib_1.__param(4, Inject(ErrorHandler))
    ], InfDimensionApi);
    return InfDimensionApi;
}(BaseLoopBackApi));
export { InfDimensionApi };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5mRGltZW5zaW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1zZGstbGIzLyIsInNvdXJjZXMiOlsibGliL3Nkay9zZXJ2aWNlcy9jdXN0b20vSW5mRGltZW5zaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvQkFBb0I7QUFDcEIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDaEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN4QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFdkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXBELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUlyRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQU1wRTs7R0FFRztBQUVIO0lBQXFDLDJDQUFlO0lBRWxELHlCQUNnQyxJQUFnQixFQUNWLFVBQTRCLEVBQ25DLE1BQWlCLEVBQ2QsSUFBa0IsRUFDTixZQUEwQjtRQUx4RSxZQU9FLGtCQUFNLElBQUksRUFBRyxVQUFVLEVBQUcsTUFBTSxFQUFFLElBQUksRUFBRSxZQUFZLENBQUMsU0FDdEQ7UUFQK0IsVUFBSSxHQUFKLElBQUksQ0FBWTtRQUNWLGdCQUFVLEdBQVYsVUFBVSxDQUFrQjtRQUNuQyxZQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ2QsVUFBSSxHQUFKLElBQUksQ0FBYztRQUNOLGtCQUFZLEdBQVosWUFBWSxDQUFjOztJQUd4RSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksc0NBQVksR0FBbkI7UUFDRSxPQUFPLGNBQWMsQ0FBQztJQUN4QixDQUFDOztnQkFmcUMsVUFBVSx1QkFBN0MsTUFBTSxTQUFDLFVBQVU7Z0JBQzhCLGdCQUFnQix1QkFBL0QsTUFBTSxTQUFDLGdCQUFnQjtnQkFDYSxTQUFTLHVCQUE3QyxNQUFNLFNBQUMsU0FBUztnQkFDcUIsWUFBWSx1QkFBakQsTUFBTSxTQUFDLFlBQVk7Z0JBQ3NDLFlBQVksdUJBQXJFLFFBQVEsWUFBSSxNQUFNLFNBQUMsWUFBWTs7SUFQdkIsZUFBZTtRQUQzQixVQUFVLEVBQUU7UUFJUixtQkFBQSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDbEIsbUJBQUEsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUE7UUFDeEIsbUJBQUEsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ2pCLG1CQUFBLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQTtRQUNwQixtQkFBQSxRQUFRLEVBQUUsQ0FBQSxFQUFFLG1CQUFBLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQTtPQVB4QixlQUFlLENBbUIzQjtJQUFELHNCQUFDO0NBQUEsQUFuQkQsQ0FBcUMsZUFBZSxHQW1CbkQ7U0FuQlksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBTREtNb2RlbHMgfSBmcm9tICcuL1NES01vZGVscyc7XG5pbXBvcnQgeyBCYXNlTG9vcEJhY2tBcGkgfSBmcm9tICcuLi9jb3JlL2Jhc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBMb29wQmFja0NvbmZpZyB9IGZyb20gJy4uLy4uL2xiLmNvbmZpZyc7XG5pbXBvcnQgeyBMb29wQmFja0F1dGggfSBmcm9tICcuLi9jb3JlL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBMb29wQmFja0ZpbHRlciwgIH0gZnJvbSAnLi4vLi4vbW9kZWxzL0Jhc2VNb2RlbHMnO1xuaW1wb3J0IHsgRXJyb3JIYW5kbGVyIH0gZnJvbSAnLi4vY29yZS9lcnJvci5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEluZkRpbWVuc2lvbiB9IGZyb20gJy4uLy4uL21vZGVscy9JbmZEaW1lbnNpb24nO1xuaW1wb3J0IHsgU29ja2V0Q29ubmVjdGlvbiB9IGZyb20gJy4uLy4uL3NvY2tldHMvc29ja2V0LmNvbm5lY3Rpb25zJztcbmltcG9ydCB7IFByb0luZm9Qcm9qUmVsIH0gZnJvbSAnLi4vLi4vbW9kZWxzL1Byb0luZm9Qcm9qUmVsJztcbmltcG9ydCB7IEluZlN0YXRlbWVudCB9IGZyb20gJy4uLy4uL21vZGVscy9JbmZTdGF0ZW1lbnQnO1xuaW1wb3J0IHsgSW5mUGVyc2lzdGVudEl0ZW0gfSBmcm9tICcuLi8uLi9tb2RlbHMvSW5mUGVyc2lzdGVudEl0ZW0nO1xuXG5cbi8qKlxuICogQXBpIHNlcnZpY2VzIGZvciB0aGUgYEluZkRpbWVuc2lvbmAgbW9kZWwuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJbmZEaW1lbnNpb25BcGkgZXh0ZW5kcyBCYXNlTG9vcEJhY2tBcGkge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoSHR0cENsaWVudCkgcHJvdGVjdGVkIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgQEluamVjdChTb2NrZXRDb25uZWN0aW9uKSBwcm90ZWN0ZWQgY29ubmVjdGlvbjogU29ja2V0Q29ubmVjdGlvbixcbiAgICBASW5qZWN0KFNES01vZGVscykgcHJvdGVjdGVkIG1vZGVsczogU0RLTW9kZWxzLFxuICAgIEBJbmplY3QoTG9vcEJhY2tBdXRoKSBwcm90ZWN0ZWQgYXV0aDogTG9vcEJhY2tBdXRoLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoRXJyb3JIYW5kbGVyKSBwcm90ZWN0ZWQgZXJyb3JIYW5kbGVyOiBFcnJvckhhbmRsZXJcbiAgKSB7XG4gICAgc3VwZXIoaHR0cCwgIGNvbm5lY3Rpb24sICBtb2RlbHMsIGF1dGgsIGVycm9ySGFuZGxlcik7XG4gIH1cblxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxuICAgKiBpLmUuIGBJbmZEaW1lbnNpb25gLlxuICAgKi9cbiAgcHVibGljIGdldE1vZGVsTmFtZSgpIHtcbiAgICByZXR1cm4gXCJJbmZEaW1lbnNpb25cIjtcbiAgfVxufVxuIl19