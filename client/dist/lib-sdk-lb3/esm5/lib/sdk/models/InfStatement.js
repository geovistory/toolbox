var InfStatement = /** @class */ (function () {
    function InfStatement(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfStatement`.
     */
    InfStatement.getModelName = function () {
        return "InfStatement";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of InfStatement for dynamic purposes.
    **/
    InfStatement.factory = function (data) {
        return new InfStatement(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    InfStatement.getModelDefinition = function () {
        return {
            name: 'InfStatement',
            plural: 'InfStatements',
            path: 'InfStatements',
            idName: 'pk_entity',
            properties: {
                "fk_subject_info": {
                    name: 'fk_subject_info',
                    type: 'number',
                    default: 0
                },
                "fk_subject_data": {
                    name: 'fk_subject_data',
                    type: 'number',
                    default: 0
                },
                "fk_subject_tables_cell": {
                    name: 'fk_subject_tables_cell',
                    type: 'number',
                    default: 0
                },
                "fk_subject_tables_row": {
                    name: 'fk_subject_tables_row',
                    type: 'number',
                    default: 0
                },
                "fk_property": {
                    name: 'fk_property',
                    type: 'number',
                    default: 0
                },
                "fk_property_of_property": {
                    name: 'fk_property_of_property',
                    type: 'number',
                    default: 0
                },
                "fk_object_info": {
                    name: 'fk_object_info',
                    type: 'number',
                    default: 0
                },
                "fk_object_data": {
                    name: 'fk_object_data',
                    type: 'number',
                    default: 0
                },
                "fk_object_tables_cell": {
                    name: 'fk_object_tables_cell',
                    type: 'number',
                    default: 0
                },
                "fk_object_tables_row": {
                    name: 'fk_object_tables_row',
                    type: 'number',
                    default: 0
                },
                "is_in_project_count": {
                    name: 'is_in_project_count',
                    type: 'number'
                },
                "is_standard_in_project_count": {
                    name: 'is_standard_in_project_count',
                    type: 'number'
                },
                "community_favorite_calendar": {
                    name: 'community_favorite_calendar',
                    type: 'string'
                },
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
            },
            relations: {
                entity_version_project_rels: {
                    name: 'entity_version_project_rels',
                    type: 'ProInfoProjRel[]',
                    model: 'ProInfoProjRel',
                    relationType: 'hasMany',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_entity'
                },
                subject_temporal_entity: {
                    name: 'subject_temporal_entity',
                    type: 'InfTemporalEntity',
                    model: 'InfTemporalEntity',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_subject_info',
                    keyTo: 'pk_entity'
                },
                subject_digital: {
                    name: 'subject_digital',
                    type: 'DatDigital',
                    model: 'DatDigital',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_subject_data',
                    keyTo: 'pk_entity'
                },
                subject_chunk: {
                    name: 'subject_chunk',
                    type: 'DatChunk',
                    model: 'DatChunk',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_subject_data',
                    keyTo: 'pk_entity'
                },
                subject_statement: {
                    name: 'subject_statement',
                    type: 'InfStatement',
                    model: 'InfStatement',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_subject_info',
                    keyTo: 'pk_entity'
                },
                object_temporal_entity: {
                    name: 'object_temporal_entity',
                    type: 'InfTemporalEntity',
                    model: 'InfTemporalEntity',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_object_info',
                    keyTo: 'pk_entity'
                },
                object_appellation: {
                    name: 'object_appellation',
                    type: 'InfAppellation',
                    model: 'InfAppellation',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_object_info',
                    keyTo: 'pk_entity'
                },
                object_lang_string: {
                    name: 'object_lang_string',
                    type: 'InfLangString',
                    model: 'InfLangString',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_object_info',
                    keyTo: 'pk_entity'
                },
                object_chunk: {
                    name: 'object_chunk',
                    type: 'DatChunk',
                    model: 'DatChunk',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_object_data',
                    keyTo: 'pk_entity'
                },
                object_dimension: {
                    name: 'object_dimension',
                    type: 'InfDimension',
                    model: 'InfDimension',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_object_info',
                    keyTo: 'pk_entity'
                },
                object_language: {
                    name: 'object_language',
                    type: 'InfLanguage',
                    model: 'InfLanguage',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_object_info',
                    keyTo: 'pk_entity'
                },
                subject_persistent_item: {
                    name: 'subject_persistent_item',
                    type: 'InfPersistentItem',
                    model: 'InfPersistentItem',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_subject_info',
                    keyTo: 'pk_entity'
                },
                object_persistent_item: {
                    name: 'object_persistent_item',
                    type: 'InfPersistentItem',
                    model: 'InfPersistentItem',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_object_info',
                    keyTo: 'pk_entity'
                },
                object_time_primitive: {
                    name: 'object_time_primitive',
                    type: 'InfTimePrimitive',
                    model: 'InfTimePrimitive',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_object_info',
                    keyTo: 'pk_entity'
                },
                object_place: {
                    name: 'object_place',
                    type: 'InfPlace',
                    model: 'InfPlace',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_object_info',
                    keyTo: 'pk_entity'
                },
            }
        };
    };
    return InfStatement;
}());
export { InfStatement };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5mU3RhdGVtZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1zZGstbGIzLyIsInNvdXJjZXMiOlsibGliL3Nkay9tb2RlbHMvSW5mU3RhdGVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWdEQTtJQThCRSxzQkFBWSxJQUE0QjtRQUN0QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0Q7OztPQUdHO0lBQ1cseUJBQVksR0FBMUI7UUFDRSxPQUFPLGNBQWMsQ0FBQztJQUN4QixDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFDVyxvQkFBTyxHQUFyQixVQUFzQixJQUEyQjtRQUMvQyxPQUFPLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFDRDs7Ozs7O09BTUc7SUFDVywrQkFBa0IsR0FBaEM7UUFDRSxPQUFPO1lBQ0wsSUFBSSxFQUFFLGNBQWM7WUFDcEIsTUFBTSxFQUFFLGVBQWU7WUFDdkIsSUFBSSxFQUFFLGVBQWU7WUFDckIsTUFBTSxFQUFFLFdBQVc7WUFDbkIsVUFBVSxFQUFFO2dCQUNWLGlCQUFpQixFQUFFO29CQUNqQixJQUFJLEVBQUUsaUJBQWlCO29CQUN2QixJQUFJLEVBQUUsUUFBUTtvQkFDZCxPQUFPLEVBQUUsQ0FBQztpQkFDWDtnQkFDRCxpQkFBaUIsRUFBRTtvQkFDakIsSUFBSSxFQUFFLGlCQUFpQjtvQkFDdkIsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsT0FBTyxFQUFFLENBQUM7aUJBQ1g7Z0JBQ0Qsd0JBQXdCLEVBQUU7b0JBQ3hCLElBQUksRUFBRSx3QkFBd0I7b0JBQzlCLElBQUksRUFBRSxRQUFRO29CQUNkLE9BQU8sRUFBRSxDQUFDO2lCQUNYO2dCQUNELHVCQUF1QixFQUFFO29CQUN2QixJQUFJLEVBQUUsdUJBQXVCO29CQUM3QixJQUFJLEVBQUUsUUFBUTtvQkFDZCxPQUFPLEVBQUUsQ0FBQztpQkFDWDtnQkFD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QVksRUFBRSxXQUFXO29CQUN6QixPQUFPLEVBQUUsaUJBQWlCO29CQUMxQixLQUFLLEVBQUUsV0FBVztpQkFDbkI7Z0JBQ0Qsc0JBQXNCLEVBQUU7b0JBQ3RCLElBQUksRUFBRSx3QkFBd0I7b0JBQzlCLElBQUksRUFBRSxtQkFBbUI7b0JBQ3pCLEtBQUssRUFBRSxtQkFBbUI7b0JBQzFCLFlBQVksRUFBRSxXQUFXO29CQUN6QixPQUFPLEVBQUUsZ0JBQWdCO29CQUN6QixLQUFLLEVBQUUsV0FBVztpQkFDbkI7Z0JBQ0QscUJBQXFCLEVBQUU7b0JBQ3JCLElBQUksRUFBRSx1QkFBdUI7b0JBQzdCLElBQUksRUFBRSxrQkFBa0I7b0JBQ3hCLEtBQUssRUFBRSxrQkFBa0I7b0JBQ3pCLFlBQVksRUFBRSxXQUFXO29CQUN6QixPQUFPLEVBQUUsZ0JBQWdCO29CQUN6QixLQUFLLEVBQUUsV0FBVztpQkFDbkI7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLElBQUksRUFBRSxjQUFjO29CQUNwQixJQUFJLEVBQUUsVUFBVTtvQkFDaEIsS0FBSyxFQUFFLFVBQVU7b0JBQ2pCLFlBQVksRUFBRSxXQUFXO29CQUN6QixPQUFPLEVBQUUsZ0JBQWdCO29CQUN6QixLQUFLLEVBQUUsV0FBVztpQkFDbkI7YUFDRjtTQUNGLENBQUE7SUFDSCxDQUFDO0lBQ0gsbUJBQUM7QUFBRCxDQUFDLEFBOVBELElBOFBDIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cbmltcG9ydCB7XG4gIFByb0luZm9Qcm9qUmVsLFxuICBJbmZUZW1wb3JhbEVudGl0eSxcbiAgRGF0RGlnaXRhbCxcbiAgRGF0Q2h1bmssXG4gIEluZkFwcGVsbGF0aW9uLFxuICBJbmZMYW5nU3RyaW5nLFxuICBJbmZEaW1lbnNpb24sXG4gIEluZkxhbmd1YWdlLFxuICBJbmZQZXJzaXN0ZW50SXRlbSxcbiAgSW5mVGltZVByaW1pdGl2ZSxcbiAgSW5mUGxhY2Vcbn0gZnJvbSAnLi4vaW5kZXgnO1xuXG5kZWNsYXJlIHZhciBPYmplY3Q6IGFueTtcbmV4cG9ydCBpbnRlcmZhY2UgSW5mU3RhdGVtZW50SW50ZXJmYWNlIHtcbiAgXCJma19zdWJqZWN0X2luZm9cIj86IG51bWJlcjtcbiAgXCJma19zdWJqZWN0X2RhdGFcIj86IG51bWJlcjtcbiAgXCJma19zdWJqZWN0X3RhYmxlc19jZWxsXCI/OiBudW1iZXI7XG4gIFwiZmtfc3ViamVjdF90YWJsZXNfcm93XCI/OiBudW1iZXI7XG4gIFwiZmtfcHJvcGVydHlcIj86IG51bWJlcjtcbiAgXCJma19wcm9wZXJ0eV9vZl9wcm9wZXJ0eVwiPzogbnVtYmVyO1xuICBcImZrX29iamVjdF9pbmZvXCI/OiBudW1iZXI7XG4gIFwiZmtfb2JqZWN0X2RhdGFcIj86IG51bWJlcjtcbiAgXCJma19vYmplY3RfdGFibGVzX2NlbGxcIj86IG51bWJlcjtcbiAgXCJma19vYmplY3RfdGFibGVzX3Jvd1wiPzogbnVtYmVyO1xuICBcImlzX2luX3Byb2plY3RfY291bnRcIj86IG51bWJlcjtcbiAgXCJpc19zdGFuZGFyZF9pbl9wcm9qZWN0X2NvdW50XCI/OiBudW1iZXI7XG4gIFwiY29tbXVuaXR5X2Zhdm9yaXRlX2NhbGVuZGFyXCI/OiBzdHJpbmc7XG4gIFwicGtfZW50aXR5XCI/OiBudW1iZXI7XG4gIGVudGl0eV92ZXJzaW9uX3Byb2plY3RfcmVscz86IFByb0luZm9Qcm9qUmVsW107XG4gIHN1YmplY3RfdGVtcG9yYWxfZW50aXR5PzogSW5mVGVtcG9yYWxFbnRpdHk7XG4gIHN1YmplY3RfZGlnaXRhbD86IERhdERpZ2l0YWw7XG4gIHN1YmplY3RfY2h1bms/OiBEYXRDaHVuaztcbiAgc3ViamVjdF9zdGF0ZW1lbnQ/OiBJbmZTdGF0ZW1lbnQ7XG4gIG9iamVjdF90ZW1wb3JhbF9lbnRpdHk/OiBJbmZUZW1wb3JhbEVudGl0eTtcbiAgb2JqZWN0X2FwcGVsbGF0aW9uPzogSW5mQXBwZWxsYXRpb247XG4gIG9iamVjdF9sYW5nX3N0cmluZz86IEluZkxhbmdTdHJpbmc7XG4gIG9iamVjdF9jaHVuaz86IERhdENodW5rO1xuICBvYmplY3RfZGltZW5zaW9uPzogSW5mRGltZW5zaW9uO1xuICBvYmplY3RfbGFuZ3VhZ2U/OiBJbmZMYW5ndWFnZTtcbiAgc3ViamVjdF9wZXJzaXN0ZW50X2l0ZW0/OiBJbmZQZXJzaXN0ZW50SXRlbTtcbiAgb2JqZWN0X3BlcnNpc3RlbnRfaXRlbT86IEluZlBlcnNpc3RlbnRJdGVtO1xuICBvYmplY3RfdGltZV9wcmltaXRpdmU/OiBJbmZUaW1lUHJpbWl0aXZlO1xuICBvYmplY3RfcGxhY2U/OiBJbmZQbGFjZTtcbn1cblxuZXhwb3J0IGNsYXNzIEluZlN0YXRlbWVudCBpbXBsZW1lbnRzIEluZlN0YXRlbWVudEludGVyZmFjZSB7XG4gIFwiZmtfc3ViamVjdF9pbmZvXCI/OiBudW1iZXI7XG4gIFwiZmtfc3ViamVjdF9kYXRhXCI/OiBudW1iZXI7XG4gIFwiZmtfc3ViamVjdF90YWJsZXNfY2VsbFwiPzogbnVtYmVyO1xuICBcImZrX3N1YmplY3RfdGFibGVzX3Jvd1wiPzogbnVtYmVyO1xuICBcImZrX3Byb3BlcnR5XCI/OiBudW1iZXI7XG4gIFwiZmtfcHJvcGVydHlfb2ZfcHJvcGVydHlcIj86IG51bWJlcjtcbiAgXCJma19vYmplY3RfaW5mb1wiPzogbnVtYmVyO1xuICBcImZrX29iamVjdF9kYXRhXCI/OiBudW1iZXI7XG4gIFwiZmtfb2JqZWN0X3RhYmxlc19jZWxsXCI/OiBudW1iZXI7XG4gIFwiZmtfb2JqZWN0X3RhYmxlc19yb3dcIj86IG51bWJlcjtcbiAgXCJpc19pbl9wcm9qZWN0X2NvdW50XCI/OiBudW1iZXI7XG4gIFwiaXNfc3RhbmRhcmRfaW5fcHJvamVjdF9jb3VudFwiPzogbnVtYmVyO1xuICBcImNvbW11bml0eV9mYXZvcml0ZV9jYWxlbmRhclwiPzogc3RyaW5nO1xuICBcInBrX2VudGl0eVwiPzogbnVtYmVyO1xuICBlbnRpdHlfdmVyc2lvbl9wcm9qZWN0X3JlbHM/OiBQcm9JbmZvUHJvalJlbFtdO1xuICBzdWJqZWN0X3RlbXBvcmFsX2VudGl0eT86IEluZlRlbXBvcmFsRW50aXR5O1xuICBzdWJqZWN0X2RpZ2l0YWw/OiBEYXREaWdpdGFsO1xuICBzdWJqZWN0X2NodW5rPzogRGF0Q2h1bms7XG4gIHN1YmplY3Rfc3RhdGVtZW50PzogSW5mU3RhdGVtZW50O1xuICBvYmplY3RfdGVtcG9yYWxfZW50aXR5PzogSW5mVGVtcG9yYWxFbnRpdHk7XG4gIG9iamVjdF9hcHBlbGxhdGlvbj86IEluZkFwcGVsbGF0aW9uO1xuICBvYmplY3RfbGFuZ19zdHJpbmc/OiBJbmZMYW5nU3RyaW5nO1xuICBvYmplY3RfY2h1bms/OiBEYXRDaHVuaztcbiAgb2JqZWN0X2RpbWVuc2lvbj86IEluZkRpbWVuc2lvbjtcbiAgb2JqZWN0X2xhbmd1YWdlPzogSW5mTGFuZ3VhZ2U7XG4gIHN1YmplY3RfcGVyc2lzdGVudF9pdGVtPzogSW5mUGVyc2lzdGVudEl0ZW07XG4gIG9iamVjdF9wZXJzaXN0ZW50X2l0ZW0/OiBJbmZQZXJzaXN0ZW50SXRlbTtcbiAgb2JqZWN0X3RpbWVfcHJpbWl0aXZlPzogSW5mVGltZVByaW1pdGl2ZTtcbiAgb2JqZWN0X3BsYWNlPzogSW5mUGxhY2U7XG4gIGNvbnN0cnVjdG9yKGRhdGE/OiBJbmZTdGF0ZW1lbnRJbnRlcmZhY2UpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xuICB9XG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyAkcmVzb3VyY2UsXG4gICAqIGkuZS4gYEluZlN0YXRlbWVudGAuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsTmFtZSgpIHtcbiAgICByZXR1cm4gXCJJbmZTdGF0ZW1lbnRcIjtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGZhY3RvcnlcbiAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgY3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBJbmZTdGF0ZW1lbnQgZm9yIGR5bmFtaWMgcHVycG9zZXMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGZhY3RvcnkoZGF0YTogSW5mU3RhdGVtZW50SW50ZXJmYWNlKTogSW5mU3RhdGVtZW50IHtcbiAgICByZXR1cm4gbmV3IEluZlN0YXRlbWVudChkYXRhKTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGdldE1vZGVsRGVmaW5pdGlvblxuICAqIEBhdXRob3IgSnVsaWVuIExlZHVuXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgcmV0dXJucyBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIHNvbWUgb2YgdGhlIG1vZGVsXG4gICogZGVmaW5pdGlvbnMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsRGVmaW5pdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJ0luZlN0YXRlbWVudCcsXG4gICAgICBwbHVyYWw6ICdJbmZTdGF0ZW1lbnRzJyxcbiAgICAgIHBhdGg6ICdJbmZTdGF0ZW1lbnRzJyxcbiAgICAgIGlkTmFtZTogJ3BrX2VudGl0eScsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIFwiZmtfc3ViamVjdF9pbmZvXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfc3ViamVjdF9pbmZvJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICBkZWZhdWx0OiAwXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfc3ViamVjdF9kYXRhXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfc3ViamVjdF9kYXRhJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICBkZWZhdWx0OiAwXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfc3ViamVjdF90YWJsZXNfY2VsbFwiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX3N1YmplY3RfdGFibGVzX2NlbGwnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInLFxuICAgICAgICAgIGRlZmF1bHQ6IDBcbiAgICAgICAgfSxcbiAgICAgICAgXCJma19zdWJqZWN0X3RhYmxlc19yb3dcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19zdWJqZWN0X3RhYmxlc19yb3cnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInLFxuICAgICAgICAgIGRlZmF1bHQ6IDBcbiAgICAgICAgfSxcbiAgICAgICAgXCJma19wcm9wZXJ0eVwiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX3Byb3BlcnR5JyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICBkZWZhdWx0OiAwXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfcHJvcGVydHlfb2ZfcHJvcGVydHlcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19wcm9wZXJ0eV9vZl9wcm9wZXJ0eScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcicsXG4gICAgICAgICAgZGVmYXVsdDogMFxuICAgICAgICB9LFxuICAgICAgICBcImZrX29iamVjdF9pbmZvXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfb2JqZWN0X2luZm8nLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInLFxuICAgICAgICAgIGRlZmF1bHQ6IDBcbiAgICAgICAgfSxcbiAgICAgICAgXCJma19vYmplY3RfZGF0YVwiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX29iamVjdF9kYXRhJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICBkZWZhdWx0OiAwXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfb2JqZWN0X3RhYmxlc19jZWxsXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfb2JqZWN0X3RhYmxlc19jZWxsJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICBkZWZhdWx0OiAwXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfb2JqZWN0X3RhYmxlc19yb3dcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19vYmplY3RfdGFibGVzX3JvdycsXG4gICAgICAgICAgdHlwZTogJ251bWJlcicsXG4gICAgICAgICAgZGVmYXVsdDogMFxuICAgICAgICB9LFxuICAgICAgICBcImlzX2luX3Byb2plY3RfY291bnRcIjoge1xuICAgICAgICAgIG5hbWU6ICdpc19pbl9wcm9qZWN0X2NvdW50JyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcImlzX3N0YW5kYXJkX2luX3Byb2plY3RfY291bnRcIjoge1xuICAgICAgICAgIG5hbWU6ICdpc19zdGFuZGFyZF9pbl9wcm9qZWN0X2NvdW50JyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcImNvbW11bml0eV9mYXZvcml0ZV9jYWxlbmRhclwiOiB7XG4gICAgICAgICAgbmFtZTogJ2NvbW11bml0eV9mYXZvcml0ZV9jYWxlbmRhcicsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgXCJwa19lbnRpdHlcIjoge1xuICAgICAgICAgIG5hbWU6ICdwa19lbnRpdHknLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVsYXRpb25zOiB7XG4gICAgICAgIGVudGl0eV92ZXJzaW9uX3Byb2plY3RfcmVsczoge1xuICAgICAgICAgIG5hbWU6ICdlbnRpdHlfdmVyc2lvbl9wcm9qZWN0X3JlbHMnLFxuICAgICAgICAgIHR5cGU6ICdQcm9JbmZvUHJvalJlbFtdJyxcbiAgICAgICAgICBtb2RlbDogJ1Byb0luZm9Qcm9qUmVsJyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdoYXNNYW55JyxcbiAgICAgICAgICBrZXlGcm9tOiAncGtfZW50aXR5JyxcbiAgICAgICAgICBrZXlUbzogJ2ZrX2VudGl0eSdcbiAgICAgICAgfSxcbiAgICAgICAgc3ViamVjdF90ZW1wb3JhbF9lbnRpdHk6IHtcbiAgICAgICAgICBuYW1lOiAnc3ViamVjdF90ZW1wb3JhbF9lbnRpdHknLFxuICAgICAgICAgIHR5cGU6ICdJbmZUZW1wb3JhbEVudGl0eScsXG4gICAgICAgICAgbW9kZWw6ICdJbmZUZW1wb3JhbEVudGl0eScsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnYmVsb25nc1RvJyxcbiAgICAgICAgICBrZXlGcm9tOiAnZmtfc3ViamVjdF9pbmZvJyxcbiAgICAgICAgICBrZXlUbzogJ3BrX2VudGl0eSdcbiAgICAgICAgfSxcbiAgICAgICAgc3ViamVjdF9kaWdpdGFsOiB7XG4gICAgICAgICAgbmFtZTogJ3N1YmplY3RfZGlnaXRhbCcsXG4gICAgICAgICAgdHlwZTogJ0RhdERpZ2l0YWwnLFxuICAgICAgICAgIG1vZGVsOiAnRGF0RGlnaXRhbCcsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnYmVsb25nc1RvJyxcbiAgICAgICAgICBrZXlGcm9tOiAnZmtfc3ViamVjdF9kYXRhJyxcbiAgICAgICAgICBrZXlUbzogJ3BrX2VudGl0eSdcbiAgICAgICAgfSxcbiAgICAgICAgc3ViamVjdF9jaHVuazoge1xuICAgICAgICAgIG5hbWU6ICdzdWJqZWN0X2NodW5rJyxcbiAgICAgICAgICB0eXBlOiAnRGF0Q2h1bmsnLFxuICAgICAgICAgIG1vZGVsOiAnRGF0Q2h1bmsnLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2JlbG9uZ3NUbycsXG4gICAgICAgICAga2V5RnJvbTogJ2ZrX3N1YmplY3RfZGF0YScsXG4gICAgICAgICAga2V5VG86ICdwa19lbnRpdHknXG4gICAgICAgIH0sXG4gICAgICAgIHN1YmplY3Rfc3RhdGVtZW50OiB7XG4gICAgICAgICAgbmFtZTogJ3N1YmplY3Rfc3RhdGVtZW50JyxcbiAgICAgICAgICB0eXBlOiAnSW5mU3RhdGVtZW50JyxcbiAgICAgICAgICBtb2RlbDogJ0luZlN0YXRlbWVudCcsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnYmVsb25nc1RvJyxcbiAgICAgICAgICBrZXlGcm9tOiAnZmtfc3ViamVjdF9pbmZvJyxcbiAgICAgICAgICBrZXlUbzogJ3BrX2VudGl0eSdcbiAgICAgICAgfSxcbiAgICAgICAgb2JqZWN0X3RlbXBvcmFsX2VudGl0eToge1xuICAgICAgICAgIG5hbWU6ICdvYmplY3RfdGVtcG9yYWxfZW50aXR5JyxcbiAgICAgICAgICB0eXBlOiAnSW5mVGVtcG9yYWxFbnRpdHknLFxuICAgICAgICAgIG1vZGVsOiAnSW5mVGVtcG9yYWxFbnRpdHknLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2JlbG9uZ3NUbycsXG4gICAgICAgICAga2V5RnJvbTogJ2ZrX29iamVjdF9pbmZvJyxcbiAgICAgICAgICBrZXlUbzogJ3BrX2VudGl0eSdcbiAgICAgICAgfSxcbiAgICAgICAgb2JqZWN0X2FwcGVsbGF0aW9uOiB7XG4gICAgICAgICAgbmFtZTogJ29iamVjdF9hcHBlbGxhdGlvbicsXG4gICAgICAgICAgdHlwZTogJ0luZkFwcGVsbGF0aW9uJyxcbiAgICAgICAgICBtb2RlbDogJ0luZkFwcGVsbGF0aW9uJyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdiZWxvbmdzVG8nLFxuICAgICAgICAgIGtleUZyb206ICdma19vYmplY3RfaW5mbycsXG4gICAgICAgICAga2V5VG86ICdwa19lbnRpdHknXG4gICAgICAgIH0sXG4gICAgICAgIG9iamVjdF9sYW5nX3N0cmluZzoge1xuICAgICAgICAgIG5hbWU6ICdvYmplY3RfbGFuZ19zdHJpbmcnLFxuICAgICAgICAgIHR5cGU6ICdJbmZMYW5nU3RyaW5nJyxcbiAgICAgICAgICBtb2RlbDogJ0luZkxhbmdTdHJpbmcnLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2JlbG9uZ3NUbycsXG4gICAgICAgICAga2V5RnJvbTogJ2ZrX29iamVjdF9pbmZvJyxcbiAgICAgICAgICBrZXlUbzogJ3BrX2VudGl0eSdcbiAgICAgICAgfSxcbiAgICAgICAgb2JqZWN0X2NodW5rOiB7XG4gICAgICAgICAgbmFtZTogJ29iamVjdF9jaHVuaycsXG4gICAgICAgICAgdHlwZTogJ0RhdENodW5rJyxcbiAgICAgICAgICBtb2RlbDogJ0RhdENodW5rJyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdiZWxvbmdzVG8nLFxuICAgICAgICAgIGtleUZyb206ICdma19vYmplY3RfZGF0YScsXG4gICAgICAgICAga2V5VG86ICdwa19lbnRpdHknXG4gICAgICAgIH0sXG4gICAgICAgIG9iamVjdF9kaW1lbnNpb246IHtcbiAgICAgICAgICBuYW1lOiAnb2JqZWN0X2RpbWVuc2lvbicsXG4gICAgICAgICAgdHlwZTogJ0luZkRpbWVuc2lvbicsXG4gICAgICAgICAgbW9kZWw6ICdJbmZEaW1lbnNpb24nLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2JlbG9uZ3NUbycsXG4gICAgICAgICAga2V5RnJvbTogJ2ZrX29iamVjdF9pbmZvJyxcbiAgICAgICAgICBrZXlUbzogJ3BrX2VudGl0eSdcbiAgICAgICAgfSxcbiAgICAgICAgb2JqZWN0X2xhbmd1YWdlOiB7XG4gICAgICAgICAgbmFtZTogJ29iamVjdF9sYW5ndWFnZScsXG4gICAgICAgICAgdHlwZTogJ0luZkxhbmd1YWdlJyxcbiAgICAgICAgICBtb2RlbDogJ0luZkxhbmd1YWdlJyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdiZWxvbmdzVG8nLFxuICAgICAgICAgIGtleUZyb206ICdma19vYmplY3RfaW5mbycsXG4gICAgICAgICAga2V5VG86ICdwa19lbnRpdHknXG4gICAgICAgIH0sXG4gICAgICAgIHN1YmplY3RfcGVyc2lzdGVudF9pdGVtOiB7XG4gICAgICAgICAgbmFtZTogJ3N1YmplY3RfcGVyc2lzdGVudF9pdGVtJyxcbiAgICAgICAgICB0eXBlOiAnSW5mUGVyc2lzdGVudEl0ZW0nLFxuICAgICAgICAgIG1vZGVsOiAnSW5mUGVyc2lzdGVudEl0ZW0nLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2JlbG9uZ3NUbycsXG4gICAgICAgICAga2V5RnJvbTogJ2ZrX3N1YmplY3RfaW5mbycsXG4gICAgICAgICAga2V5VG86ICdwa19lbnRpdHknXG4gICAgICAgIH0sXG4gICAgICAgIG9iamVjdF9wZXJzaXN0ZW50X2l0ZW06IHtcbiAgICAgICAgICBuYW1lOiAnb2JqZWN0X3BlcnNpc3RlbnRfaXRlbScsXG4gICAgICAgICAgdHlwZTogJ0luZlBlcnNpc3RlbnRJdGVtJyxcbiAgICAgICAgICBtb2RlbDogJ0luZlBlcnNpc3RlbnRJdGVtJyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdiZWxvbmdzVG8nLFxuICAgICAgICAgIGtleUZyb206ICdma19vYmplY3RfaW5mbycsXG4gICAgICAgICAga2V5VG86ICdwa19lbnRpdHknXG4gICAgICAgIH0sXG4gICAgICAgIG9iamVjdF90aW1lX3ByaW1pdGl2ZToge1xuICAgICAgICAgIG5hbWU6ICdvYmplY3RfdGltZV9wcmltaXRpdmUnLFxuICAgICAgICAgIHR5cGU6ICdJbmZUaW1lUHJpbWl0aXZlJyxcbiAgICAgICAgICBtb2RlbDogJ0luZlRpbWVQcmltaXRpdmUnLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2JlbG9uZ3NUbycsXG4gICAgICAgICAga2V5RnJvbTogJ2ZrX29iamVjdF9pbmZvJyxcbiAgICAgICAgICBrZXlUbzogJ3BrX2VudGl0eSdcbiAgICAgICAgfSxcbiAgICAgICAgb2JqZWN0X3BsYWNlOiB7XG4gICAgICAgICAgbmFtZTogJ29iamVjdF9wbGFjZScsXG4gICAgICAgICAgdHlwZTogJ0luZlBsYWNlJyxcbiAgICAgICAgICBtb2RlbDogJ0luZlBsYWNlJyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdiZWxvbmdzVG8nLFxuICAgICAgICAgIGtleUZyb206ICdma19vYmplY3RfaW5mbycsXG4gICAgICAgICAga2V5VG86ICdwa19lbnRpdHknXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=