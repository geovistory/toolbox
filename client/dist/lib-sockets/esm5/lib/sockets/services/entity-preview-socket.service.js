/**
 * @fileoverview added by tsickle
 * Generated from: lib/sockets/services/entity-preview-socket.service.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LXByZXZpZXctc29ja2V0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNvY2tldHMvIiwic291cmNlcyI6WyJsaWIvc29ja2V0cy9zZXJ2aWNlcy9lbnRpdHktcHJldmlldy1zb2NrZXQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXZDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakQ7SUFDeUMsK0NBQU07SUFFN0MsNkJBQ0UsVUFBc0IsRUFDVixNQUFzQjtRQUZwQyxZQUtFLGtCQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLEVBQUUsQ0FBQyxTQU9yRDtRQUxDLDBEQUEwRDtRQUMxRCxLQUFJLENBQUMsU0FBUyxDQUFtQixlQUFlLENBQUMsQ0FBQyxTQUFTOzs7O1FBQUMsVUFBQSxJQUFJO1lBQzlELFVBQVUsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdEQsQ0FBQyxFQUFDLENBQUM7O0lBRUwsQ0FBQzs7Z0JBZkYsVUFBVTs7OztnQkFERixVQUFVO2dCQURWLGFBQWEsdUJBT2pCLFFBQVE7O0lBV2IsMEJBQUM7Q0FBQSxBQWhCRCxDQUN5QyxNQUFNLEdBZTlDO1NBZlksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ25neC1zb2NrZXQtaW8nO1xuaW1wb3J0IHsgV2FyRW50aXR5UHJldmlldyB9IGZyb20gXCJAa2xlaW9sYWIvbGliLXNkay1sYjRcIjtcbmltcG9ydCB7IFNvY2tldHNDb25maWcgfSBmcm9tIFwiLi4vbW9kZWxzL1NvY2tldHNDb25maWdcIjtcbmltcG9ydCB7IFdhckFjdGlvbnMgfSBmcm9tICdAa2xlaW9sYWIvbGliLXJlZHV4JztcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBFbnRpdHlQcmV2aWV3U29ja2V0IGV4dGVuZHMgU29ja2V0IHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICB3YXJBY3Rpb25zOiBXYXJBY3Rpb25zLFxuICAgIEBPcHRpb25hbCgpIGNvbmZpZz86IFNvY2tldHNDb25maWdcbiAgKSB7XG5cbiAgICBzdXBlcih7IHVybDogY29uZmlnLmJhc2VVcmwgKyAnL1dhckVudGl0eVByZXZpZXcnIH0pO1xuXG4gICAgLy8gZGlzcGF0Y2ggYSBtZXRob2QgdG8gcHV0IHRoZSBFbnRpdHlQcmV2aWV3IHRvIHRoZSBzdG9yZVxuICAgIHRoaXMuZnJvbUV2ZW50PFdhckVudGl0eVByZXZpZXc+KCdlbnRpdHlQcmV2aWV3Jykuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgd2FyQWN0aW9ucy5lbnRpdHlfcHJldmlldy5sb2FkU3VjY2VlZGVkKFtkYXRhXSwgJycpO1xuICAgIH0pO1xuXG4gIH1cbn1cbiJdfQ==