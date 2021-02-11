import * as tslib_1 from "tslib";
/* tslint:disable */
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SDKModels } from './SDKModels';
import { BaseLoopBackApi } from '../core/base.service';
import { LoopBackConfig } from '../../lb.config';
import { LoopBackAuth } from '../core/auth.service';
import { ErrorHandler } from '../core/error.service';
import { map } from 'rxjs/operators';
import { InfPlace } from '../../models/InfPlace';
import { SocketConnection } from '../../sockets/socket.connections';
/**
 * Api services for the `InfPlace` model.
 */
let InfPlaceApi = class InfPlaceApi extends BaseLoopBackApi {
    constructor(http, connection, models, auth, errorHandler) {
        super(http, connection, models, auth, errorHandler);
        this.http = http;
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.errorHandler = errorHandler;
    }
    /**
     * Find or create a InfPlace and update the project relation if needed.
     *
     * @param {number} projectId Id of the project
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{InfPlace}` - data
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfPlace` object.)
     * </em>
     */
    findOrCreatePlace(projectId, data, customHeaders) {
        let _method = "POST";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/InfPlaces/findOrCreate";
        let _routeParams = {};
        let _postBody = {
            data: data
        };
        let _urlParams = {};
        if (typeof projectId !== 'undefined' && projectId !== null)
            _urlParams.projectId = projectId;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result.pipe(map((instances) => instances.map((instance) => new InfPlace(instance))));
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfPlace`.
     */
    getModelName() {
        return "InfPlace";
    }
};
InfPlaceApi.ctorParameters = () => [
    { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
    { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
    { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
    { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
    { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
];
InfPlaceApi = tslib_1.__decorate([
    Injectable(),
    tslib_1.__param(0, Inject(HttpClient)),
    tslib_1.__param(1, Inject(SocketConnection)),
    tslib_1.__param(2, Inject(SDKModels)),
    tslib_1.__param(3, Inject(LoopBackAuth)),
    tslib_1.__param(4, Optional()), tslib_1.__param(4, Inject(ErrorHandler))
], InfPlaceApi);
export { InfPlaceApi };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5mUGxhY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNkay1sYjMvIiwic291cmNlcyI6WyJsaWIvc2RrL3NlcnZpY2VzL2N1c3RvbS9JbmZQbGFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsb0JBQW9CO0FBQ3BCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDeEMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRXJELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDakQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFJcEU7O0dBRUc7QUFFSCxJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFZLFNBQVEsZUFBZTtJQUU5QyxZQUNnQyxJQUFnQixFQUNWLFVBQTRCLEVBQ25DLE1BQWlCLEVBQ2QsSUFBa0IsRUFDTixZQUEwQjtRQUV0RSxLQUFLLENBQUMsSUFBSSxFQUFHLFVBQVUsRUFBRyxNQUFNLEVBQUUsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBTnhCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDVixlQUFVLEdBQVYsVUFBVSxDQUFrQjtRQUNuQyxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ2QsU0FBSSxHQUFKLElBQUksQ0FBYztRQUNOLGlCQUFZLEdBQVosWUFBWSxDQUFjO0lBR3hFLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FpQkc7SUFDSSxpQkFBaUIsQ0FBQyxTQUFjLEVBQUUsSUFBUyxFQUFFLGFBQXdCO1FBQzFFLElBQUksT0FBTyxHQUFXLE1BQU0sQ0FBQztRQUM3QixJQUFJLElBQUksR0FBVyxjQUFjLENBQUMsT0FBTyxFQUFFLEdBQUcsR0FBRyxHQUFHLGNBQWMsQ0FBQyxhQUFhLEVBQUU7WUFDbEYseUJBQXlCLENBQUM7UUFDMUIsSUFBSSxZQUFZLEdBQVEsRUFBRSxDQUFDO1FBQzNCLElBQUksU0FBUyxHQUFRO1lBQ25CLElBQUksRUFBRSxJQUFJO1NBQ1gsQ0FBQztRQUNGLElBQUksVUFBVSxHQUFRLEVBQUUsQ0FBQztRQUN6QixJQUFJLE9BQU8sU0FBUyxLQUFLLFdBQVcsSUFBSSxTQUFTLEtBQUssSUFBSTtZQUFFLFVBQVUsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzdGLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDbkcsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQTBCLEVBQUUsRUFBRSxDQUNsRCxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBa0IsRUFBRSxFQUFFLENBQUMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FDaEUsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNJLFlBQVk7UUFDakIsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztDQUNGLENBQUE7O1lBbER1QyxVQUFVLHVCQUE3QyxNQUFNLFNBQUMsVUFBVTtZQUM4QixnQkFBZ0IsdUJBQS9ELE1BQU0sU0FBQyxnQkFBZ0I7WUFDYSxTQUFTLHVCQUE3QyxNQUFNLFNBQUMsU0FBUztZQUNxQixZQUFZLHVCQUFqRCxNQUFNLFNBQUMsWUFBWTtZQUNzQyxZQUFZLHVCQUFyRSxRQUFRLFlBQUksTUFBTSxTQUFDLFlBQVk7O0FBUHZCLFdBQVc7SUFEdkIsVUFBVSxFQUFFO0lBSVIsbUJBQUEsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ2xCLG1CQUFBLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0lBQ3hCLG1CQUFBLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUNqQixtQkFBQSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDcEIsbUJBQUEsUUFBUSxFQUFFLENBQUEsRUFBRSxtQkFBQSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUE7R0FQeEIsV0FBVyxDQXFEdkI7U0FyRFksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBTREtNb2RlbHMgfSBmcm9tICcuL1NES01vZGVscyc7XG5pbXBvcnQgeyBCYXNlTG9vcEJhY2tBcGkgfSBmcm9tICcuLi9jb3JlL2Jhc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBMb29wQmFja0NvbmZpZyB9IGZyb20gJy4uLy4uL2xiLmNvbmZpZyc7XG5pbXBvcnQgeyBMb29wQmFja0F1dGggfSBmcm9tICcuLi9jb3JlL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBMb29wQmFja0ZpbHRlciwgIH0gZnJvbSAnLi4vLi4vbW9kZWxzL0Jhc2VNb2RlbHMnO1xuaW1wb3J0IHsgRXJyb3JIYW5kbGVyIH0gZnJvbSAnLi4vY29yZS9lcnJvci5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEluZlBsYWNlIH0gZnJvbSAnLi4vLi4vbW9kZWxzL0luZlBsYWNlJztcbmltcG9ydCB7IFNvY2tldENvbm5lY3Rpb24gfSBmcm9tICcuLi8uLi9zb2NrZXRzL3NvY2tldC5jb25uZWN0aW9ucyc7XG5pbXBvcnQgeyBQcm9JbmZvUHJvalJlbCB9IGZyb20gJy4uLy4uL21vZGVscy9Qcm9JbmZvUHJvalJlbCc7XG5cblxuLyoqXG4gKiBBcGkgc2VydmljZXMgZm9yIHRoZSBgSW5mUGxhY2VgIG1vZGVsLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSW5mUGxhY2VBcGkgZXh0ZW5kcyBCYXNlTG9vcEJhY2tBcGkge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoSHR0cENsaWVudCkgcHJvdGVjdGVkIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgQEluamVjdChTb2NrZXRDb25uZWN0aW9uKSBwcm90ZWN0ZWQgY29ubmVjdGlvbjogU29ja2V0Q29ubmVjdGlvbixcbiAgICBASW5qZWN0KFNES01vZGVscykgcHJvdGVjdGVkIG1vZGVsczogU0RLTW9kZWxzLFxuICAgIEBJbmplY3QoTG9vcEJhY2tBdXRoKSBwcm90ZWN0ZWQgYXV0aDogTG9vcEJhY2tBdXRoLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoRXJyb3JIYW5kbGVyKSBwcm90ZWN0ZWQgZXJyb3JIYW5kbGVyOiBFcnJvckhhbmRsZXJcbiAgKSB7XG4gICAgc3VwZXIoaHR0cCwgIGNvbm5lY3Rpb24sICBtb2RlbHMsIGF1dGgsIGVycm9ySGFuZGxlcik7XG4gIH1cblxuICAvKipcbiAgICogRmluZCBvciBjcmVhdGUgYSBJbmZQbGFjZSBhbmQgdXBkYXRlIHRoZSBwcm9qZWN0IHJlbGF0aW9uIGlmIG5lZWRlZC5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHByb2plY3RJZCBJZCBvZiB0aGUgcHJvamVjdFxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gZGF0YSBSZXF1ZXN0IGRhdGEuXG4gICAqXG4gICAqICAtIGBkYXRhYCDigJMgYHtJbmZQbGFjZX1gIC0gZGF0YVxuICAgKlxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYEluZlBsYWNlYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIGZpbmRPckNyZWF0ZVBsYWNlKHByb2plY3RJZDogYW55LCBkYXRhOiBhbnksIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8SW5mUGxhY2VbXT4ge1xuICAgIGxldCBfbWV0aG9kOiBzdHJpbmcgPSBcIlBPU1RcIjtcbiAgICBsZXQgX3VybDogc3RyaW5nID0gTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpICsgXCIvXCIgKyBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCkgK1xuICAgIFwiL0luZlBsYWNlcy9maW5kT3JDcmVhdGVcIjtcbiAgICBsZXQgX3JvdXRlUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBsZXQgX3Bvc3RCb2R5OiBhbnkgPSB7XG4gICAgICBkYXRhOiBkYXRhXG4gICAgfTtcbiAgICBsZXQgX3VybFBhcmFtczogYW55ID0ge307XG4gICAgaWYgKHR5cGVvZiBwcm9qZWN0SWQgIT09ICd1bmRlZmluZWQnICYmIHByb2plY3RJZCAhPT0gbnVsbCkgX3VybFBhcmFtcy5wcm9qZWN0SWQgPSBwcm9qZWN0SWQ7XG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChfbWV0aG9kLCBfdXJsLCBfcm91dGVQYXJhbXMsIF91cmxQYXJhbXMsIF9wb3N0Qm9keSwgbnVsbCwgY3VzdG9tSGVhZGVycyk7XG4gICAgcmV0dXJuIHJlc3VsdC5waXBlKG1hcCgoaW5zdGFuY2VzOiBBcnJheTxJbmZQbGFjZT4pID0+XG4gICAgICAgIGluc3RhbmNlcy5tYXAoKGluc3RhbmNlOiBJbmZQbGFjZSkgPT4gbmV3IEluZlBsYWNlKGluc3RhbmNlKSlcbiAgICApKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyAkcmVzb3VyY2UsXG4gICAqIGkuZS4gYEluZlBsYWNlYC5cbiAgICovXG4gIHB1YmxpYyBnZXRNb2RlbE5hbWUoKSB7XG4gICAgcmV0dXJuIFwiSW5mUGxhY2VcIjtcbiAgfVxufVxuIl19