/**
 * @fileoverview added by tsickle
 * Generated from: services/entity-preview-socket.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, Optional } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SocketsConfig } from "../models/SocketsConfig";
import { WarActions } from '@kleiolab/lib-redux';
var EntityPreviewSocket = /** @class */ (function (_super) {
    tslib_1.__extends(EntityPreviewSocket, _super);
    function EntityPreviewSocket(warActions, config) {
        var _this = _super.call(this, { url: config.baseUrl + '/WarEntityPreview' }) || this;
        // dispatch a method to put the EntityPreview to the store
        _this.fromEvent('entityPreview').subscribe((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            warActions.entity_preview.loadSucceeded([data], '');
        }));
        return _this;
    }
    EntityPreviewSocket.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    EntityPreviewSocket.ctorParameters = function () { return [
        { type: WarActions },
        { type: SocketsConfig, decorators: [{ type: Optional }] }
    ]; };
    return EntityPreviewSocket;
}(Socket));
export { EntityPreviewSocket };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LXByZXZpZXctc29ja2V0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNvY2tldHMvc3JjL2xpYi9zb2NrZXRzLyIsInNvdXJjZXMiOlsic2VydmljZXMvZW50aXR5LXByZXZpZXctc29ja2V0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV2QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2pEO0lBQ3lDLCtDQUFNO0lBRTdDLDZCQUNFLFVBQXNCLEVBQ1YsTUFBc0I7UUFGcEMsWUFLRSxrQkFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsT0FBTyxHQUFHLG1CQUFtQixFQUFFLENBQUMsU0FPckQ7UUFMQywwREFBMEQ7UUFDMUQsS0FBSSxDQUFDLFNBQVMsQ0FBbUIsZUFBZSxDQUFDLENBQUMsU0FBUzs7OztRQUFDLFVBQUEsSUFBSTtZQUM5RCxVQUFVLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3RELENBQUMsRUFBQyxDQUFDOztJQUVMLENBQUM7O2dCQWZGLFVBQVU7Ozs7Z0JBREYsVUFBVTtnQkFEVixhQUFhLHVCQU9qQixRQUFROztJQVdiLDBCQUFDO0NBQUEsQUFoQkQsQ0FDeUMsTUFBTSxHQWU5QztTQWZZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTb2NrZXQgfSBmcm9tICduZ3gtc29ja2V0LWlvJztcbmltcG9ydCB7IFdhckVudGl0eVByZXZpZXcgfSBmcm9tIFwiQGtsZWlvbGFiL2xpYi1zZGstbGI0XCI7XG5pbXBvcnQgeyBTb2NrZXRzQ29uZmlnIH0gZnJvbSBcIi4uL21vZGVscy9Tb2NrZXRzQ29uZmlnXCI7XG5pbXBvcnQgeyBXYXJBY3Rpb25zIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1yZWR1eCc7XG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRW50aXR5UHJldmlld1NvY2tldCBleHRlbmRzIFNvY2tldCB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgd2FyQWN0aW9uczogV2FyQWN0aW9ucyxcbiAgICBAT3B0aW9uYWwoKSBjb25maWc/OiBTb2NrZXRzQ29uZmlnXG4gICkge1xuXG4gICAgc3VwZXIoeyB1cmw6IGNvbmZpZy5iYXNlVXJsICsgJy9XYXJFbnRpdHlQcmV2aWV3JyB9KTtcblxuICAgIC8vIGRpc3BhdGNoIGEgbWV0aG9kIHRvIHB1dCB0aGUgRW50aXR5UHJldmlldyB0byB0aGUgc3RvcmVcbiAgICB0aGlzLmZyb21FdmVudDxXYXJFbnRpdHlQcmV2aWV3PignZW50aXR5UHJldmlldycpLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgIHdhckFjdGlvbnMuZW50aXR5X3ByZXZpZXcubG9hZFN1Y2NlZWRlZChbZGF0YV0sICcnKTtcbiAgICB9KTtcblxuICB9XG59XG4iXX0=