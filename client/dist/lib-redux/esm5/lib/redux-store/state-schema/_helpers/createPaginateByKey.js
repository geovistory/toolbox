/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/_helpers/createPaginateByKey.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlUGFnaW5hdGVCeUtleS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvc3RhdGUtc2NoZW1hL19oZWxwZXJzL2NyZWF0ZVBhZ2luYXRlQnlLZXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLE9BQU8sQ0FBQzs7Ozs7QUFDckMsTUFBTSxVQUFVLG1CQUFtQixDQUFDLENBQWlCO0lBQ25ELE9BQVUsQ0FBQyxDQUFDLGNBQWMsU0FBSSxDQUFDLENBQUMsVUFBVSxVQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxVQUFJLENBQUMsQ0FBQyxXQUFXLFNBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBRyxDQUFBO0FBQ3hJLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHdlN1YmZpZWxkUGFnZSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBrZXlzLCB2YWx1ZXMgfSBmcm9tICdyYW1kYSc7XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUGFnaW5hdGVCeUtleSh4OiBHdlN1YmZpZWxkUGFnZSk6IHN0cmluZyB7XG4gIHJldHVybiBgJHt4LmZrU291cmNlRW50aXR5fV8ke3guZmtQcm9wZXJ0eX1fJHt4LmlzT3V0Z29pbmcgPyAnb3V0JyA6ICdpbid9XyR7eC50YXJnZXRDbGFzc31fJHtrZXlzKHguc2NvcGUpWzBdfV8ke3ZhbHVlcyh4LnNjb3BlKVswXX1gXG59XG4iXX0=