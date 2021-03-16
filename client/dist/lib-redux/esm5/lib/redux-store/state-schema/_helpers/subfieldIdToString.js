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
    /** @type {?} */
    var source = Object.keys(x.source).map((/**
     * @param {?} key
     * @return {?}
     */
    function (key) { return key + "-" + x.source[key]; })).join('_');
    /** @type {?} */
    var property = Object.keys(x.property).map((/**
     * @param {?} key
     * @return {?}
     */
    function (key) { return key + "-" + x.property[key]; })).join('_');
    return source + "_" + property + "_" + (x.isOutgoing ? 'out' : 'in') + "_" + keys(x.scope)[0] + "_" + values(x.scope)[0];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ViZmllbGRJZFRvU3RyaW5nLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC8iLCJzb3VyY2VzIjpbImxpYi9yZWR1eC1zdG9yZS9zdGF0ZS1zY2hlbWEvX2hlbHBlcnMvc3ViZmllbGRJZFRvU3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxPQUFPLENBQUM7Ozs7O0FBQ3JDLE1BQU0sVUFBVSxrQkFBa0IsQ0FBQyxDQUFZOztRQUN2QyxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRzs7OztJQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUcsR0FBRyxTQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFHLEVBQXpCLENBQXlCLEVBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDOztRQUM5RSxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRzs7OztJQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUcsR0FBRyxTQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFHLEVBQTNCLENBQTJCLEVBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQzFGLE9BQVUsTUFBTSxTQUFJLFFBQVEsVUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksVUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFHLENBQUE7QUFDekcsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEd2RmllbGRJZCB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBrZXlzLCB2YWx1ZXMgfSBmcm9tICdyYW1kYSc7XG5leHBvcnQgZnVuY3Rpb24gc3ViZmllbGRJZFRvU3RyaW5nKHg6IEd2RmllbGRJZCk6IHN0cmluZyB7XG4gIGNvbnN0IHNvdXJjZSA9IE9iamVjdC5rZXlzKHguc291cmNlKS5tYXAoa2V5ID0+IGAke2tleX0tJHt4LnNvdXJjZVtrZXldfWApLmpvaW4oJ18nKVxuICBjb25zdCBwcm9wZXJ0eSA9IE9iamVjdC5rZXlzKHgucHJvcGVydHkpLm1hcChrZXkgPT4gYCR7a2V5fS0ke3gucHJvcGVydHlba2V5XX1gKS5qb2luKCdfJylcbiAgcmV0dXJuIGAke3NvdXJjZX1fJHtwcm9wZXJ0eX1fJHt4LmlzT3V0Z29pbmcgPyAnb3V0JyA6ICdpbid9XyR7a2V5cyh4LnNjb3BlKVswXX1fJHt2YWx1ZXMoeC5zY29wZSlbMF19YFxufVxuIl19