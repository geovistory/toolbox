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
    const source = Object.keys(x.source).map((/**
     * @param {?} key
     * @return {?}
     */
    key => `${key}-${x.source[key]}`)).join('_');
    /** @type {?} */
    const property = Object.keys(x.property).map((/**
     * @param {?} key
     * @return {?}
     */
    key => `${key}-${x.property[key]}`)).join('_');
    return `${source}_${property}_${x.isOutgoing ? 'out' : 'in'}_${keys(x.scope)[0]}_${values(x.scope)[0]}`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ViZmllbGRJZFRvU3RyaW5nLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtc2NoZW1hL19oZWxwZXJzL3N1YmZpZWxkSWRUb1N0cmluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sT0FBTyxDQUFDOzs7OztBQUNyQyxNQUFNLFVBQVUsa0JBQWtCLENBQUMsQ0FBWTs7VUFDdkMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUc7Ozs7SUFBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7O1VBQzlFLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHOzs7O0lBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQzFGLE9BQU8sR0FBRyxNQUFNLElBQUksUUFBUSxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBO0FBQ3pHLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHdkZpZWxkSWQgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsga2V5cywgdmFsdWVzIH0gZnJvbSAncmFtZGEnO1xuZXhwb3J0IGZ1bmN0aW9uIHN1YmZpZWxkSWRUb1N0cmluZyh4OiBHdkZpZWxkSWQpOiBzdHJpbmcge1xuICBjb25zdCBzb3VyY2UgPSBPYmplY3Qua2V5cyh4LnNvdXJjZSkubWFwKGtleSA9PiBgJHtrZXl9LSR7eC5zb3VyY2Vba2V5XX1gKS5qb2luKCdfJylcbiAgY29uc3QgcHJvcGVydHkgPSBPYmplY3Qua2V5cyh4LnByb3BlcnR5KS5tYXAoa2V5ID0+IGAke2tleX0tJHt4LnByb3BlcnR5W2tleV19YCkuam9pbignXycpXG4gIHJldHVybiBgJHtzb3VyY2V9XyR7cHJvcGVydHl9XyR7eC5pc091dGdvaW5nID8gJ291dCcgOiAnaW4nfV8ke2tleXMoeC5zY29wZSlbMF19XyR7dmFsdWVzKHguc2NvcGUpWzBdfWBcbn1cbiJdfQ==