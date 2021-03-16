/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/_helpers/subfieldIdToString.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { keys, values } from 'ramda';
/**
 * @param {?} x
 * @return {?}
 */
export function subfieldIdToString(x) {
    return x.fkSourceEntity + "_" + x.fkProperty + "_" + (x.isOutgoing ? 'out' : 'in') + "_" + keys(x.scope)[0] + "_" + values(x.scope)[0];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ViZmllbGRJZFRvU3RyaW5nLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC8iLCJzb3VyY2VzIjpbImxpYi9yZWR1eC1zdG9yZS9zdGF0ZS1zY2hlbWEvX2hlbHBlcnMvc3ViZmllbGRJZFRvU3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxPQUFPLENBQUM7Ozs7O0FBQ3JDLE1BQU0sVUFBVSxrQkFBa0IsQ0FBQyxDQUFZO0lBQzdDLE9BQVUsQ0FBQyxDQUFDLGNBQWMsU0FBSSxDQUFDLENBQUMsVUFBVSxVQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxVQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUcsQ0FBQTtBQUN2SCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR3ZGaWVsZElkIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IGtleXMsIHZhbHVlcyB9IGZyb20gJ3JhbWRhJztcbmV4cG9ydCBmdW5jdGlvbiBzdWJmaWVsZElkVG9TdHJpbmcoeDogR3ZGaWVsZElkKTogc3RyaW5nIHtcbiAgcmV0dXJuIGAke3guZmtTb3VyY2VFbnRpdHl9XyR7eC5ma1Byb3BlcnR5fV8ke3guaXNPdXRnb2luZyA/ICdvdXQnIDogJ2luJ31fJHtrZXlzKHguc2NvcGUpWzBdfV8ke3ZhbHVlcyh4LnNjb3BlKVswXX1gXG59XG4iXX0=