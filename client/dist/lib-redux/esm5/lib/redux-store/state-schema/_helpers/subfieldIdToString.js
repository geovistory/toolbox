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
    return x.fkSourceEntity + "_" + x.fkProperty + "_" + (x.isOutgoing ? 'out' : 'in') + "_" + x.targetClass + "_" + keys(x.scope)[0] + "_" + values(x.scope)[0];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ViZmllbGRJZFRvU3RyaW5nLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC8iLCJzb3VyY2VzIjpbImxpYi9yZWR1eC1zdG9yZS9zdGF0ZS1zY2hlbWEvX2hlbHBlcnMvc3ViZmllbGRJZFRvU3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxPQUFPLENBQUM7Ozs7O0FBQ3JDLE1BQU0sVUFBVSxrQkFBa0IsQ0FBQyxDQUFlO0lBQ2hELE9BQVUsQ0FBQyxDQUFDLGNBQWMsU0FBSSxDQUFDLENBQUMsVUFBVSxVQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxVQUFJLENBQUMsQ0FBQyxXQUFXLFNBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBRyxDQUFBO0FBQ3hJLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHdlN1YmZpZWxkSWQgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsga2V5cywgdmFsdWVzIH0gZnJvbSAncmFtZGEnO1xuZXhwb3J0IGZ1bmN0aW9uIHN1YmZpZWxkSWRUb1N0cmluZyh4OiBHdlN1YmZpZWxkSWQpOiBzdHJpbmcge1xuICByZXR1cm4gYCR7eC5ma1NvdXJjZUVudGl0eX1fJHt4LmZrUHJvcGVydHl9XyR7eC5pc091dGdvaW5nID8gJ291dCcgOiAnaW4nfV8ke3gudGFyZ2V0Q2xhc3N9XyR7a2V5cyh4LnNjb3BlKVswXX1fJHt2YWx1ZXMoeC5zY29wZSlbMF19YFxufVxuIl19