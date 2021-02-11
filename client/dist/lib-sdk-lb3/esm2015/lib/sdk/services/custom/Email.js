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
let EmailApi = class EmailApi extends BaseLoopBackApi {
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
     * i.e. `Email`.
     */
    getModelName() {
        return "Email";
    }
};
EmailApi.ctorParameters = () => [
    { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
    { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
    { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
    { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
    { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
];
EmailApi = tslib_1.__decorate([
    Injectable(),
    tslib_1.__param(0, Inject(HttpClient)),
    tslib_1.__param(1, Inject(SocketConnection)),
    tslib_1.__param(2, Inject(SDKModels)),
    tslib_1.__param(3, Inject(LoopBackAuth)),
    tslib_1.__param(4, Optional()), tslib_1.__param(4, Inject(ErrorHandler))
], EmailApi);
export { EmailApi };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW1haWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNkay1sYjMvIiwic291cmNlcyI6WyJsaWIvc2RrL3NlcnZpY2VzL2N1c3RvbS9FbWFpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsb0JBQW9CO0FBQ3BCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDeEMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXZELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVwRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFJckQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFHcEU7O0dBRUc7QUFFSCxJQUFhLFFBQVEsR0FBckIsTUFBYSxRQUFTLFNBQVEsZUFBZTtJQUUzQyxZQUNnQyxJQUFnQixFQUNWLFVBQTRCLEVBQ25DLE1BQWlCLEVBQ2QsSUFBa0IsRUFDTixZQUEwQjtRQUV0RSxLQUFLLENBQUMsSUFBSSxFQUFHLFVBQVUsRUFBRyxNQUFNLEVBQUUsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBTnhCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDVixlQUFVLEdBQVYsVUFBVSxDQUFrQjtRQUNuQyxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ2QsU0FBSSxHQUFKLElBQUksQ0FBYztRQUNOLGlCQUFZLEdBQVosWUFBWSxDQUFjO0lBR3hFLENBQUM7SUFFRDs7O09BR0c7SUFDSSxZQUFZO1FBQ2pCLE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7Q0FDRixDQUFBOztZQWhCdUMsVUFBVSx1QkFBN0MsTUFBTSxTQUFDLFVBQVU7WUFDOEIsZ0JBQWdCLHVCQUEvRCxNQUFNLFNBQUMsZ0JBQWdCO1lBQ2EsU0FBUyx1QkFBN0MsTUFBTSxTQUFDLFNBQVM7WUFDcUIsWUFBWSx1QkFBakQsTUFBTSxTQUFDLFlBQVk7WUFDc0MsWUFBWSx1QkFBckUsUUFBUSxZQUFJLE1BQU0sU0FBQyxZQUFZOztBQVB2QixRQUFRO0lBRHBCLFVBQVUsRUFBRTtJQUlSLG1CQUFBLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUNsQixtQkFBQSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtJQUN4QixtQkFBQSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDakIsbUJBQUEsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQ3BCLG1CQUFBLFFBQVEsRUFBRSxDQUFBLEVBQUUsbUJBQUEsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFBO0dBUHhCLFFBQVEsQ0FtQnBCO1NBbkJZLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgU0RLTW9kZWxzIH0gZnJvbSAnLi9TREtNb2RlbHMnO1xuaW1wb3J0IHsgQmFzZUxvb3BCYWNrQXBpIH0gZnJvbSAnLi4vY29yZS9iYXNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9vcEJhY2tDb25maWcgfSBmcm9tICcuLi8uLi9sYi5jb25maWcnO1xuaW1wb3J0IHsgTG9vcEJhY2tBdXRoIH0gZnJvbSAnLi4vY29yZS9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9vcEJhY2tGaWx0ZXIsICB9IGZyb20gJy4uLy4uL21vZGVscy9CYXNlTW9kZWxzJztcbmltcG9ydCB7IEVycm9ySGFuZGxlciB9IGZyb20gJy4uL2NvcmUvZXJyb3Iuc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBFbWFpbCB9IGZyb20gJy4uLy4uL21vZGVscy9FbWFpbCc7XG5pbXBvcnQgeyBTb2NrZXRDb25uZWN0aW9uIH0gZnJvbSAnLi4vLi4vc29ja2V0cy9zb2NrZXQuY29ubmVjdGlvbnMnO1xuXG5cbi8qKlxuICogQXBpIHNlcnZpY2VzIGZvciB0aGUgYEVtYWlsYCBtb2RlbC5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEVtYWlsQXBpIGV4dGVuZHMgQmFzZUxvb3BCYWNrQXBpIHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEh0dHBDbGllbnQpIHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50LFxuICAgIEBJbmplY3QoU29ja2V0Q29ubmVjdGlvbikgcHJvdGVjdGVkIGNvbm5lY3Rpb246IFNvY2tldENvbm5lY3Rpb24sXG4gICAgQEluamVjdChTREtNb2RlbHMpIHByb3RlY3RlZCBtb2RlbHM6IFNES01vZGVscyxcbiAgICBASW5qZWN0KExvb3BCYWNrQXV0aCkgcHJvdGVjdGVkIGF1dGg6IExvb3BCYWNrQXV0aCxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEVycm9ySGFuZGxlcikgcHJvdGVjdGVkIGVycm9ySGFuZGxlcjogRXJyb3JIYW5kbGVyXG4gICkge1xuICAgIHN1cGVyKGh0dHAsICBjb25uZWN0aW9uLCAgbW9kZWxzLCBhdXRoLCBlcnJvckhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBtb2RlbCByZXByZXNlbnRlZCBieSB0aGlzICRyZXNvdXJjZSxcbiAgICogaS5lLiBgRW1haWxgLlxuICAgKi9cbiAgcHVibGljIGdldE1vZGVsTmFtZSgpIHtcbiAgICByZXR1cm4gXCJFbWFpbFwiO1xuICB9XG59XG4iXX0=