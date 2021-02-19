/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/_helpers/createPaginateByKey.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { keys, values } from 'ramda';
/**
 * @param {?} x
 * @return {?}
 */
export function createPaginateByKey(x) {
    return x.fkSourceEntity + "_" + x.fkProperty + "_" + (x.isOutgoing ? 'out' : 'in') + "_" + x.targetClass + "_" + keys(x.scope)[0] + "_" + values(x.scope)[0];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlUGFnaW5hdGVCeUtleS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLXNjaGVtYS9faGVscGVycy9jcmVhdGVQYWdpbmF0ZUJ5S2V5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxPQUFPLENBQUM7Ozs7O0FBQ3JDLE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxDQUFpQjtJQUNuRCxPQUFVLENBQUMsQ0FBQyxjQUFjLFNBQUksQ0FBQyxDQUFDLFVBQVUsVUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksVUFBSSxDQUFDLENBQUMsV0FBVyxTQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUcsQ0FBQTtBQUN4SSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR3ZTdWJmaWVsZFBhZ2UgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsga2V5cywgdmFsdWVzIH0gZnJvbSAncmFtZGEnO1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBhZ2luYXRlQnlLZXkoeDogR3ZTdWJmaWVsZFBhZ2UpOiBzdHJpbmcge1xuICByZXR1cm4gYCR7eC5ma1NvdXJjZUVudGl0eX1fJHt4LmZrUHJvcGVydHl9XyR7eC5pc091dGdvaW5nID8gJ291dCcgOiAnaW4nfV8ke3gudGFyZ2V0Q2xhc3N9XyR7a2V5cyh4LnNjb3BlKVswXX1fJHt2YWx1ZXMoeC5zY29wZSlbMF19YFxufVxuIl19