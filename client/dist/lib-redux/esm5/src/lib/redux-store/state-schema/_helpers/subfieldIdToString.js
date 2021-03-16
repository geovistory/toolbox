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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ViZmllbGRJZFRvU3RyaW5nLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtc2NoZW1hL19oZWxwZXJzL3N1YmZpZWxkSWRUb1N0cmluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sT0FBTyxDQUFDOzs7OztBQUNyQyxNQUFNLFVBQVUsa0JBQWtCLENBQUMsQ0FBWTs7UUFDdkMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUc7Ozs7SUFBQyxVQUFBLEdBQUcsSUFBSSxPQUFHLEdBQUcsU0FBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBRyxFQUF6QixDQUF5QixFQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzs7UUFDOUUsUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUc7Ozs7SUFBQyxVQUFBLEdBQUcsSUFBSSxPQUFHLEdBQUcsU0FBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBRyxFQUEzQixDQUEyQixFQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUMxRixPQUFVLE1BQU0sU0FBSSxRQUFRLFVBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLFVBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBRyxDQUFBO0FBQ3pHLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHdkZpZWxkSWQgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsga2V5cywgdmFsdWVzIH0gZnJvbSAncmFtZGEnO1xuZXhwb3J0IGZ1bmN0aW9uIHN1YmZpZWxkSWRUb1N0cmluZyh4OiBHdkZpZWxkSWQpOiBzdHJpbmcge1xuICBjb25zdCBzb3VyY2UgPSBPYmplY3Qua2V5cyh4LnNvdXJjZSkubWFwKGtleSA9PiBgJHtrZXl9LSR7eC5zb3VyY2Vba2V5XX1gKS5qb2luKCdfJylcbiAgY29uc3QgcHJvcGVydHkgPSBPYmplY3Qua2V5cyh4LnByb3BlcnR5KS5tYXAoa2V5ID0+IGAke2tleX0tJHt4LnByb3BlcnR5W2tleV19YCkuam9pbignXycpXG4gIHJldHVybiBgJHtzb3VyY2V9XyR7cHJvcGVydHl9XyR7eC5pc091dGdvaW5nID8gJ291dCcgOiAnaW4nfV8ke2tleXMoeC5zY29wZSlbMF19XyR7dmFsdWVzKHguc2NvcGUpWzBdfWBcbn1cbiJdfQ==