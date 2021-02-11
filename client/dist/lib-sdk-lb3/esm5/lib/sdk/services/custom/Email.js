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
 * Api services for the `Email` model.
 */
var EmailApi = /** @class */ (function (_super) {
    tslib_1.__extends(EmailApi, _super);
    function EmailApi(http, connection, models, auth, errorHandler) {
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
     * i.e. `Email`.
     */
    EmailApi.prototype.getModelName = function () {
        return "Email";
    };
    EmailApi.ctorParameters = function () { return [
        { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
        { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
        { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
        { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
        { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
    ]; };
    EmailApi = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(0, Inject(HttpClient)),
        tslib_1.__param(1, Inject(SocketConnection)),
        tslib_1.__param(2, Inject(SDKModels)),
        tslib_1.__param(3, Inject(LoopBackAuth)),
        tslib_1.__param(4, Optional()), tslib_1.__param(4, Inject(ErrorHandler))
    ], EmailApi);
    return EmailApi;
}(BaseLoopBackApi));
export { EmailApi };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW1haWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNkay1sYjMvIiwic291cmNlcyI6WyJsaWIvc2RrL3NlcnZpY2VzL2N1c3RvbS9FbWFpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsb0JBQW9CO0FBQ3BCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDeEMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXZELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVwRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFJckQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFHcEU7O0dBRUc7QUFFSDtJQUE4QixvQ0FBZTtJQUUzQyxrQkFDZ0MsSUFBZ0IsRUFDVixVQUE0QixFQUNuQyxNQUFpQixFQUNkLElBQWtCLEVBQ04sWUFBMEI7UUFMeEUsWUFPRSxrQkFBTSxJQUFJLEVBQUcsVUFBVSxFQUFHLE1BQU0sRUFBRSxJQUFJLEVBQUUsWUFBWSxDQUFDLFNBQ3REO1FBUCtCLFVBQUksR0FBSixJQUFJLENBQVk7UUFDVixnQkFBVSxHQUFWLFVBQVUsQ0FBa0I7UUFDbkMsWUFBTSxHQUFOLE1BQU0sQ0FBVztRQUNkLFVBQUksR0FBSixJQUFJLENBQWM7UUFDTixrQkFBWSxHQUFaLFlBQVksQ0FBYzs7SUFHeEUsQ0FBQztJQUVEOzs7T0FHRztJQUNJLCtCQUFZLEdBQW5CO1FBQ0UsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQzs7Z0JBZnFDLFVBQVUsdUJBQTdDLE1BQU0sU0FBQyxVQUFVO2dCQUM4QixnQkFBZ0IsdUJBQS9ELE1BQU0sU0FBQyxnQkFBZ0I7Z0JBQ2EsU0FBUyx1QkFBN0MsTUFBTSxTQUFDLFNBQVM7Z0JBQ3FCLFlBQVksdUJBQWpELE1BQU0sU0FBQyxZQUFZO2dCQUNzQyxZQUFZLHVCQUFyRSxRQUFRLFlBQUksTUFBTSxTQUFDLFlBQVk7O0lBUHZCLFFBQVE7UUFEcEIsVUFBVSxFQUFFO1FBSVIsbUJBQUEsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQ2xCLG1CQUFBLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1FBQ3hCLG1CQUFBLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUNqQixtQkFBQSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDcEIsbUJBQUEsUUFBUSxFQUFFLENBQUEsRUFBRSxtQkFBQSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUE7T0FQeEIsUUFBUSxDQW1CcEI7SUFBRCxlQUFDO0NBQUEsQUFuQkQsQ0FBOEIsZUFBZSxHQW1CNUM7U0FuQlksUUFBUSIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBTREtNb2RlbHMgfSBmcm9tICcuL1NES01vZGVscyc7XG5pbXBvcnQgeyBCYXNlTG9vcEJhY2tBcGkgfSBmcm9tICcuLi9jb3JlL2Jhc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBMb29wQmFja0NvbmZpZyB9IGZyb20gJy4uLy4uL2xiLmNvbmZpZyc7XG5pbXBvcnQgeyBMb29wQmFja0F1dGggfSBmcm9tICcuLi9jb3JlL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBMb29wQmFja0ZpbHRlciwgIH0gZnJvbSAnLi4vLi4vbW9kZWxzL0Jhc2VNb2RlbHMnO1xuaW1wb3J0IHsgRXJyb3JIYW5kbGVyIH0gZnJvbSAnLi4vY29yZS9lcnJvci5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEVtYWlsIH0gZnJvbSAnLi4vLi4vbW9kZWxzL0VtYWlsJztcbmltcG9ydCB7IFNvY2tldENvbm5lY3Rpb24gfSBmcm9tICcuLi8uLi9zb2NrZXRzL3NvY2tldC5jb25uZWN0aW9ucyc7XG5cblxuLyoqXG4gKiBBcGkgc2VydmljZXMgZm9yIHRoZSBgRW1haWxgIG1vZGVsLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRW1haWxBcGkgZXh0ZW5kcyBCYXNlTG9vcEJhY2tBcGkge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoSHR0cENsaWVudCkgcHJvdGVjdGVkIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgQEluamVjdChTb2NrZXRDb25uZWN0aW9uKSBwcm90ZWN0ZWQgY29ubmVjdGlvbjogU29ja2V0Q29ubmVjdGlvbixcbiAgICBASW5qZWN0KFNES01vZGVscykgcHJvdGVjdGVkIG1vZGVsczogU0RLTW9kZWxzLFxuICAgIEBJbmplY3QoTG9vcEJhY2tBdXRoKSBwcm90ZWN0ZWQgYXV0aDogTG9vcEJhY2tBdXRoLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoRXJyb3JIYW5kbGVyKSBwcm90ZWN0ZWQgZXJyb3JIYW5kbGVyOiBFcnJvckhhbmRsZXJcbiAgKSB7XG4gICAgc3VwZXIoaHR0cCwgIGNvbm5lY3Rpb24sICBtb2RlbHMsIGF1dGgsIGVycm9ySGFuZGxlcik7XG4gIH1cblxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxuICAgKiBpLmUuIGBFbWFpbGAuXG4gICAqL1xuICBwdWJsaWMgZ2V0TW9kZWxOYW1lKCkge1xuICAgIHJldHVybiBcIkVtYWlsXCI7XG4gIH1cbn1cbiJdfQ==