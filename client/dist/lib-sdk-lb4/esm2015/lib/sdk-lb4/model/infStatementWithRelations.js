/**
 * @fileoverview added by tsickle
 * Generated from: lib/sdk-lb4/model/infStatementWithRelations.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * (tsType: InfStatementWithRelations, schemaOptions: { includeRelations: true })
 * @record
 */
export function InfStatementWithRelations() { }
if (false) {
    /** @type {?|undefined} */
    InfStatementWithRelations.prototype.pk_entity;
    /** @type {?|undefined} */
    InfStatementWithRelations.prototype.fk_subject_info;
    /** @type {?|undefined} */
    InfStatementWithRelations.prototype.fk_subject_data;
    /** @type {?|undefined} */
    InfStatementWithRelations.prototype.fk_subject_tables_cell;
    /** @type {?|undefined} */
    InfStatementWithRelations.prototype.fk_subject_tables_row;
    /** @type {?|undefined} */
    InfStatementWithRelations.prototype.fk_property;
    /** @type {?|undefined} */
    InfStatementWithRelations.prototype.fk_property_of_property;
    /** @type {?|undefined} */
    InfStatementWithRelations.prototype.fk_object_info;
    /** @type {?|undefined} */
    InfStatementWithRelations.prototype.fk_object_data;
    /** @type {?|undefined} */
    InfStatementWithRelations.prototype.fk_object_tables_cell;
    /** @type {?|undefined} */
    InfStatementWithRelations.prototype.fk_object_tables_row;
    /** @type {?|undefined} */
    InfStatementWithRelations.prototype.is_in_project_count;
    /** @type {?|undefined} */
    InfStatementWithRelations.prototype.is_standard_in_project_count;
    /** @type {?|undefined} */
    InfStatementWithRelations.prototype.community_favorite_calendar;
    /** @type {?|undefined} */
    InfStatementWithRelations.prototype.entity_version_project_rels;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mU3RhdGVtZW50V2l0aFJlbGF0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc2RrLWxiNC8iLCJzb3VyY2VzIjpbImxpYi9zZGstbGI0L21vZGVsL2luZlN0YXRlbWVudFdpdGhSZWxhdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBaUJBLCtDQWdCQzs7O0lBZkcsOENBQW1COztJQUNuQixvREFBeUI7O0lBQ3pCLG9EQUF5Qjs7SUFDekIsMkRBQWdDOztJQUNoQywwREFBK0I7O0lBQy9CLGdEQUFxQjs7SUFDckIsNERBQWlDOztJQUNqQyxtREFBd0I7O0lBQ3hCLG1EQUF3Qjs7SUFDeEIsMERBQStCOztJQUMvQix5REFBOEI7O0lBQzlCLHdEQUE2Qjs7SUFDN0IsaUVBQXNDOztJQUN0QyxnRUFBcUM7O0lBQ3JDLGdFQUFpRSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogZ2VvdmlzdG9yeVxuICogR2VvdmlzdG9yeSDigJMgUGxhdGZvcm0gZm9yIERpZ2l0YWwgSGlzdG9yeVxuICpcbiAqIFRoZSB2ZXJzaW9uIG9mIHRoZSBPcGVuQVBJIGRvY3VtZW50OiAxLjAuMFxuICogXG4gKlxuICogTk9URTogVGhpcyBjbGFzcyBpcyBhdXRvIGdlbmVyYXRlZCBieSBPcGVuQVBJIEdlbmVyYXRvciAoaHR0cHM6Ly9vcGVuYXBpLWdlbmVyYXRvci50ZWNoKS5cbiAqIGh0dHBzOi8vb3BlbmFwaS1nZW5lcmF0b3IudGVjaFxuICogRG8gbm90IGVkaXQgdGhlIGNsYXNzIG1hbnVhbGx5LlxuICovXG5pbXBvcnQgeyBQcm9JbmZvUHJvalJlbFdpdGhSZWxhdGlvbnMgfSBmcm9tICcuL3Byb0luZm9Qcm9qUmVsV2l0aFJlbGF0aW9ucyc7XG5cblxuLyoqXG4gKiAodHNUeXBlOiBJbmZTdGF0ZW1lbnRXaXRoUmVsYXRpb25zLCBzY2hlbWFPcHRpb25zOiB7IGluY2x1ZGVSZWxhdGlvbnM6IHRydWUgfSlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJbmZTdGF0ZW1lbnRXaXRoUmVsYXRpb25zIHsgXG4gICAgcGtfZW50aXR5PzogbnVtYmVyO1xuICAgIGZrX3N1YmplY3RfaW5mbz86IG51bWJlcjtcbiAgICBma19zdWJqZWN0X2RhdGE/OiBudW1iZXI7XG4gICAgZmtfc3ViamVjdF90YWJsZXNfY2VsbD86IG51bWJlcjtcbiAgICBma19zdWJqZWN0X3RhYmxlc19yb3c/OiBzdHJpbmc7XG4gICAgZmtfcHJvcGVydHk/OiBudW1iZXI7XG4gICAgZmtfcHJvcGVydHlfb2ZfcHJvcGVydHk/OiBudW1iZXI7XG4gICAgZmtfb2JqZWN0X2luZm8/OiBudW1iZXI7XG4gICAgZmtfb2JqZWN0X2RhdGE/OiBudW1iZXI7XG4gICAgZmtfb2JqZWN0X3RhYmxlc19jZWxsPzogbnVtYmVyO1xuICAgIGZrX29iamVjdF90YWJsZXNfcm93PzogbnVtYmVyO1xuICAgIGlzX2luX3Byb2plY3RfY291bnQ/OiBudW1iZXI7XG4gICAgaXNfc3RhbmRhcmRfaW5fcHJvamVjdF9jb3VudD86IG51bWJlcjtcbiAgICBjb21tdW5pdHlfZmF2b3JpdGVfY2FsZW5kYXI/OiBzdHJpbmc7XG4gICAgZW50aXR5X3ZlcnNpb25fcHJvamVjdF9yZWxzPzogQXJyYXk8UHJvSW5mb1Byb2pSZWxXaXRoUmVsYXRpb25zPjtcbn1cblxuIl19