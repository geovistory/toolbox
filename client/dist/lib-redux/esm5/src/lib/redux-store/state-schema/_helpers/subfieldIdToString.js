/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/_helpers/subfieldIdToString.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { keys, values } from 'ramda';
/**
 * @param {?} x
 * @return {?}
 */
export function subfieldIdToString(x) {
    return x.fkSourceEntity + "_" + x.fkProperty + "_" + (x.isOutgoing ? 'out' : 'in') + "_" + x.targetClass + "_" + keys(x.scope)[0] + "_" + values(x.scope)[0];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ViZmllbGRJZFRvU3RyaW5nLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtc2NoZW1hL19oZWxwZXJzL3N1YmZpZWxkSWRUb1N0cmluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sT0FBTyxDQUFDOzs7OztBQUNyQyxNQUFNLFVBQVUsa0JBQWtCLENBQUMsQ0FBZTtJQUNoRCxPQUFVLENBQUMsQ0FBQyxjQUFjLFNBQUksQ0FBQyxDQUFDLFVBQVUsVUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksVUFBSSxDQUFDLENBQUMsV0FBVyxTQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUcsQ0FBQTtBQUN4SSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR3ZTdWJmaWVsZElkIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IGtleXMsIHZhbHVlcyB9IGZyb20gJ3JhbWRhJztcbmV4cG9ydCBmdW5jdGlvbiBzdWJmaWVsZElkVG9TdHJpbmcoeDogR3ZTdWJmaWVsZElkKTogc3RyaW5nIHtcbiAgcmV0dXJuIGAke3guZmtTb3VyY2VFbnRpdHl9XyR7eC5ma1Byb3BlcnR5fV8ke3guaXNPdXRnb2luZyA/ICdvdXQnIDogJ2luJ31fJHt4LnRhcmdldENsYXNzfV8ke2tleXMoeC5zY29wZSlbMF19XyR7dmFsdWVzKHguc2NvcGUpWzBdfWBcbn1cbiJdfQ==