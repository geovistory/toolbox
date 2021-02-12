/**
 * @fileoverview added by tsickle
 * Generated from: lib/sockets/services/entity-preview-socket.service.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LXByZXZpZXctc29ja2V0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNvY2tldHMvIiwic291cmNlcyI6WyJsaWIvc29ja2V0cy9zZXJ2aWNlcy9lbnRpdHktcHJldmlldy1zb2NrZXQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdkMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUVqRCxNQUFNLE9BQU8sbUJBQW9CLFNBQVEsTUFBTTs7Ozs7SUFFN0MsWUFDRSxVQUFzQixFQUNWLE1BQXNCO1FBR2xDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsT0FBTyxHQUFHLG1CQUFtQixFQUFFLENBQUMsQ0FBQztRQUVyRCwwREFBMEQ7UUFDMUQsSUFBSSxDQUFDLFNBQVMsQ0FBbUIsZUFBZSxDQUFDLENBQUMsU0FBUzs7OztRQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2pFLFVBQVUsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdEQsQ0FBQyxFQUFDLENBQUM7SUFFTCxDQUFDOzs7WUFmRixVQUFVOzs7O1lBREYsVUFBVTtZQURWLGFBQWEsdUJBT2pCLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnbmd4LXNvY2tldC1pbyc7XG5pbXBvcnQgeyBXYXJFbnRpdHlQcmV2aWV3IH0gZnJvbSBcIkBrbGVpb2xhYi9saWItc2RrLWxiNFwiO1xuaW1wb3J0IHsgU29ja2V0c0NvbmZpZyB9IGZyb20gXCIuLi9tb2RlbHMvU29ja2V0c0NvbmZpZ1wiO1xuaW1wb3J0IHsgV2FyQWN0aW9ucyB9IGZyb20gJ0BrbGVpb2xhYi9saWItcmVkdXgnO1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEVudGl0eVByZXZpZXdTb2NrZXQgZXh0ZW5kcyBTb2NrZXQge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHdhckFjdGlvbnM6IFdhckFjdGlvbnMsXG4gICAgQE9wdGlvbmFsKCkgY29uZmlnPzogU29ja2V0c0NvbmZpZ1xuICApIHtcblxuICAgIHN1cGVyKHsgdXJsOiBjb25maWcuYmFzZVVybCArICcvV2FyRW50aXR5UHJldmlldycgfSk7XG5cbiAgICAvLyBkaXNwYXRjaCBhIG1ldGhvZCB0byBwdXQgdGhlIEVudGl0eVByZXZpZXcgdG8gdGhlIHN0b3JlXG4gICAgdGhpcy5mcm9tRXZlbnQ8V2FyRW50aXR5UHJldmlldz4oJ2VudGl0eVByZXZpZXcnKS5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICB3YXJBY3Rpb25zLmVudGl0eV9wcmV2aWV3LmxvYWRTdWNjZWVkZWQoW2RhdGFdLCAnJyk7XG4gICAgfSk7XG5cbiAgfVxufVxuIl19