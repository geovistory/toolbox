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
let InfLangStringApi = class InfLangStringApi extends BaseLoopBackApi {
    constructor(http, connection, models, auth, errorHandler) {
        super(http, connection, models, auth, errorHandler);
        this.http = http;
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.errorHandler = errorHandler;
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfLangString`.
     */
    getModelName() {
        return "InfLangString";
    }
};
InfLangStringApi.ctorParameters = () => [
    { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
    { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
    { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
    { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
    { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
];
InfLangStringApi = tslib_1.__decorate([
    Injectable(),
    tslib_1.__param(0, Inject(HttpClient)),
    tslib_1.__param(1, Inject(SocketConnection)),
    tslib_1.__param(2, Inject(SDKModels)),
    tslib_1.__param(3, Inject(LoopBackAuth)),
    tslib_1.__param(4, Optional()), tslib_1.__param(4, Inject(ErrorHandler))
], InfLangStringApi);
export { InfLangStringApi };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5mTGFuZ1N0cmluZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc2RrLWxiMy8iLCJzb3VyY2VzIjpbImxpYi9zZGsvc2VydmljZXMvY3VzdG9tL0luZkxhbmdTdHJpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9CQUFvQjtBQUNwQixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNoRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUV2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBSXJELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBTXBFOztHQUVHO0FBRUgsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBaUIsU0FBUSxlQUFlO0lBRW5ELFlBQ2dDLElBQWdCLEVBQ1YsVUFBNEIsRUFDbkMsTUFBaUIsRUFDZCxJQUFrQixFQUNOLFlBQTBCO1FBRXRFLEtBQUssQ0FBQyxJQUFJLEVBQUcsVUFBVSxFQUFHLE1BQU0sRUFBRSxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFOeEIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNWLGVBQVUsR0FBVixVQUFVLENBQWtCO1FBQ25DLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDZCxTQUFJLEdBQUosSUFBSSxDQUFjO1FBQ04saUJBQVksR0FBWixZQUFZLENBQWM7SUFHeEUsQ0FBQztJQUVEOzs7T0FHRztJQUNJLFlBQVk7UUFDakIsT0FBTyxlQUFlLENBQUM7SUFDekIsQ0FBQztDQUNGLENBQUE7O1lBaEJ1QyxVQUFVLHVCQUE3QyxNQUFNLFNBQUMsVUFBVTtZQUM4QixnQkFBZ0IsdUJBQS9ELE1BQU0sU0FBQyxnQkFBZ0I7WUFDYSxTQUFTLHVCQUE3QyxNQUFNLFNBQUMsU0FBUztZQUNxQixZQUFZLHVCQUFqRCxNQUFNLFNBQUMsWUFBWTtZQUNzQyxZQUFZLHVCQUFyRSxRQUFRLFlBQUksTUFBTSxTQUFDLFlBQVk7O0FBUHZCLGdCQUFnQjtJQUQ1QixVQUFVLEVBQUU7SUFJUixtQkFBQSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDbEIsbUJBQUEsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUE7SUFDeEIsbUJBQUEsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ2pCLG1CQUFBLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUNwQixtQkFBQSxRQUFRLEVBQUUsQ0FBQSxFQUFFLG1CQUFBLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQTtHQVB4QixnQkFBZ0IsQ0FtQjVCO1NBbkJZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBTREtNb2RlbHMgfSBmcm9tICcuL1NES01vZGVscyc7XG5pbXBvcnQgeyBCYXNlTG9vcEJhY2tBcGkgfSBmcm9tICcuLi9jb3JlL2Jhc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBMb29wQmFja0NvbmZpZyB9IGZyb20gJy4uLy4uL2xiLmNvbmZpZyc7XG5pbXBvcnQgeyBMb29wQmFja0F1dGggfSBmcm9tICcuLi9jb3JlL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBMb29wQmFja0ZpbHRlciwgIH0gZnJvbSAnLi4vLi4vbW9kZWxzL0Jhc2VNb2RlbHMnO1xuaW1wb3J0IHsgRXJyb3JIYW5kbGVyIH0gZnJvbSAnLi4vY29yZS9lcnJvci5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEluZkxhbmdTdHJpbmcgfSBmcm9tICcuLi8uLi9tb2RlbHMvSW5mTGFuZ1N0cmluZyc7XG5pbXBvcnQgeyBTb2NrZXRDb25uZWN0aW9uIH0gZnJvbSAnLi4vLi4vc29ja2V0cy9zb2NrZXQuY29ubmVjdGlvbnMnO1xuaW1wb3J0IHsgUHJvSW5mb1Byb2pSZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvUHJvSW5mb1Byb2pSZWwnO1xuaW1wb3J0IHsgSW5mU3RhdGVtZW50IH0gZnJvbSAnLi4vLi4vbW9kZWxzL0luZlN0YXRlbWVudCc7XG5pbXBvcnQgeyBJbmZMYW5ndWFnZSB9IGZyb20gJy4uLy4uL21vZGVscy9JbmZMYW5ndWFnZSc7XG5cblxuLyoqXG4gKiBBcGkgc2VydmljZXMgZm9yIHRoZSBgSW5mTGFuZ1N0cmluZ2AgbW9kZWwuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJbmZMYW5nU3RyaW5nQXBpIGV4dGVuZHMgQmFzZUxvb3BCYWNrQXBpIHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEh0dHBDbGllbnQpIHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50LFxuICAgIEBJbmplY3QoU29ja2V0Q29ubmVjdGlvbikgcHJvdGVjdGVkIGNvbm5lY3Rpb246IFNvY2tldENvbm5lY3Rpb24sXG4gICAgQEluamVjdChTREtNb2RlbHMpIHByb3RlY3RlZCBtb2RlbHM6IFNES01vZGVscyxcbiAgICBASW5qZWN0KExvb3BCYWNrQXV0aCkgcHJvdGVjdGVkIGF1dGg6IExvb3BCYWNrQXV0aCxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEVycm9ySGFuZGxlcikgcHJvdGVjdGVkIGVycm9ySGFuZGxlcjogRXJyb3JIYW5kbGVyXG4gICkge1xuICAgIHN1cGVyKGh0dHAsICBjb25uZWN0aW9uLCAgbW9kZWxzLCBhdXRoLCBlcnJvckhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBtb2RlbCByZXByZXNlbnRlZCBieSB0aGlzICRyZXNvdXJjZSxcbiAgICogaS5lLiBgSW5mTGFuZ1N0cmluZ2AuXG4gICAqL1xuICBwdWJsaWMgZ2V0TW9kZWxOYW1lKCkge1xuICAgIHJldHVybiBcIkluZkxhbmdTdHJpbmdcIjtcbiAgfVxufVxuIl19