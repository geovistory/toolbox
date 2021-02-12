/**
 * @fileoverview added by tsickle
 * Generated from: services/entity-preview-socket.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Optional } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SocketsConfig } from "../models/SocketsConfig";
import { WarActions } from '@kleiolab/lib-redux';
export class EntityPreviewSocket extends Socket {
    /**
     * @param {?} warActions
     * @param {?=} config
     */
    constructor(warActions, config) {
        super({ url: config.baseUrl + '/WarEntityPreview' });
        // dispatch a method to put the EntityPreview to the store
        this.fromEvent('entityPreview').subscribe((/**
         * @param {?} data
         * @return {?}
         */
        data => {
            warActions.entity_preview.loadSucceeded([data], '');
        }));
    }
}
EntityPreviewSocket.decorators = [
    { type: Injectable }
];
/** @nocollapse */
EntityPreviewSocket.ctorParameters = () => [
    { type: WarActions },
    { type: SocketsConfig, decorators: [{ type: Optional }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LXByZXZpZXctc29ja2V0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNvY2tldHMvc3JjL2xpYi9zb2NrZXRzLyIsInNvdXJjZXMiOlsic2VydmljZXMvZW50aXR5LXByZXZpZXctc29ja2V0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXZDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFakQsTUFBTSxPQUFPLG1CQUFvQixTQUFRLE1BQU07Ozs7O0lBRTdDLFlBQ0UsVUFBc0IsRUFDVixNQUFzQjtRQUdsQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLE9BQU8sR0FBRyxtQkFBbUIsRUFBRSxDQUFDLENBQUM7UUFFckQsMERBQTBEO1FBQzFELElBQUksQ0FBQyxTQUFTLENBQW1CLGVBQWUsQ0FBQyxDQUFDLFNBQVM7Ozs7UUFBQyxJQUFJLENBQUMsRUFBRTtZQUNqRSxVQUFVLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3RELENBQUMsRUFBQyxDQUFDO0lBRUwsQ0FBQzs7O1lBZkYsVUFBVTs7OztZQURGLFVBQVU7WUFEVixhQUFhLHVCQU9qQixRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ25neC1zb2NrZXQtaW8nO1xuaW1wb3J0IHsgV2FyRW50aXR5UHJldmlldyB9IGZyb20gXCJAa2xlaW9sYWIvbGliLXNkay1sYjRcIjtcbmltcG9ydCB7IFNvY2tldHNDb25maWcgfSBmcm9tIFwiLi4vbW9kZWxzL1NvY2tldHNDb25maWdcIjtcbmltcG9ydCB7IFdhckFjdGlvbnMgfSBmcm9tICdAa2xlaW9sYWIvbGliLXJlZHV4JztcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBFbnRpdHlQcmV2aWV3U29ja2V0IGV4dGVuZHMgU29ja2V0IHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICB3YXJBY3Rpb25zOiBXYXJBY3Rpb25zLFxuICAgIEBPcHRpb25hbCgpIGNvbmZpZz86IFNvY2tldHNDb25maWdcbiAgKSB7XG5cbiAgICBzdXBlcih7IHVybDogY29uZmlnLmJhc2VVcmwgKyAnL1dhckVudGl0eVByZXZpZXcnIH0pO1xuXG4gICAgLy8gZGlzcGF0Y2ggYSBtZXRob2QgdG8gcHV0IHRoZSBFbnRpdHlQcmV2aWV3IHRvIHRoZSBzdG9yZVxuICAgIHRoaXMuZnJvbUV2ZW50PFdhckVudGl0eVByZXZpZXc+KCdlbnRpdHlQcmV2aWV3Jykuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgd2FyQWN0aW9ucy5lbnRpdHlfcHJldmlldy5sb2FkU3VjY2VlZGVkKFtkYXRhXSwgJycpO1xuICAgIH0pO1xuXG4gIH1cbn1cbiJdfQ==