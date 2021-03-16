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
    return x.fkSourceEntity + "_" + x.fkProperty + "_" + (x.isOutgoing ? 'out' : 'in') + "_" + keys(x.scope)[0] + "_" + values(x.scope)[0];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ViZmllbGRJZFRvU3RyaW5nLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtc2NoZW1hL19oZWxwZXJzL3N1YmZpZWxkSWRUb1N0cmluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sT0FBTyxDQUFDOzs7OztBQUNyQyxNQUFNLFVBQVUsa0JBQWtCLENBQUMsQ0FBWTtJQUM3QyxPQUFVLENBQUMsQ0FBQyxjQUFjLFNBQUksQ0FBQyxDQUFDLFVBQVUsVUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksVUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFHLENBQUE7QUFDdkgsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEd2RmllbGRJZCB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBrZXlzLCB2YWx1ZXMgfSBmcm9tICdyYW1kYSc7XG5leHBvcnQgZnVuY3Rpb24gc3ViZmllbGRJZFRvU3RyaW5nKHg6IEd2RmllbGRJZCk6IHN0cmluZyB7XG4gIHJldHVybiBgJHt4LmZrU291cmNlRW50aXR5fV8ke3guZmtQcm9wZXJ0eX1fJHt4LmlzT3V0Z29pbmcgPyAnb3V0JyA6ICdpbid9XyR7a2V5cyh4LnNjb3BlKVswXX1fJHt2YWx1ZXMoeC5zY29wZSlbMF19YFxufVxuIl19