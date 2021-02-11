export class InfStatement {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfStatement`.
     */
    static getModelName() {
        return "InfStatement";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of InfStatement for dynamic purposes.
    **/
    static factory(data) {
        return new InfStatement(data);
    }
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    static getModelDefinition() {
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
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5mU3RhdGVtZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1zZGstbGIzLyIsInNvdXJjZXMiOlsibW9kZWxzL0luZlN0YXRlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFnREEsTUFBTSxPQUFPLFlBQVk7SUE4QnZCLFlBQVksSUFBNEI7UUFDdEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxZQUFZO1FBQ3hCLE9BQU8sY0FBYyxDQUFDO0lBQ3hCLENBQUM7SUFDRDs7Ozs7T0FLRztJQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBMkI7UUFDL0MsT0FBTyxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ0ksTUFBTSxDQUFDLGtCQUFrQjtRQUM5QixPQUFPO1lBQ0wsSUFBSSxFQUFFLGNBQWM7WUFDcEIsTUFBTSxFQUFFLGVBQWU7WUFDdkIsSUFBSSxFQUFFLGVBQWU7WUFDckIsTUFBTSxFQUFFLFdBQVc7WUFDbkIsVUFBVSxFQUFFO2dCQUNWLGlCQUFpQixFQUFFO29CQUNqQixJQUFJLEVBQUUsaUJBQWlCO29CQUN2QixJQUFJLEVBQUUsUUFBUTtvQkFDZCxPQUFPLEVBQUUsQ0FBQztpQkFDWDtnQkFDRCxpQkFBaUIsRUFBRTtvQkFDakIsSUFBSSxFQUFFLGlCQUFpQjtvQkFDdkIsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsT0FBTyxFQUFFLENBQUM7aUJBQ1g7Z0JBQ0Qsd0JBQXdCLEVBQUU7b0JBQ3hCLElBQUksRUFBRSx3QkFBd0I7b0JBQzlCLElBQUksRUFBRSxRQUFRO29CQUNkLE9BQU8sRUFBRSxDQUFDO2lCQUNYO2dCQUNELHVCQUF1QixFQUFFO29CQUN2QixJQUFJLEVBQUUsdUJBQXVCO29CQUM3QixJQUFJLEVBQUUsUUFBUTtvQkFDZCxPQUFPLEVB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RSxtQkFBbUI7b0JBQzFCLFlBQVksRUFBRSxXQUFXO29CQUN6QixPQUFPLEVBQUUsaUJBQWlCO29CQUMxQixLQUFLLEVBQUUsV0FBVztpQkFDbkI7Z0JBQ0Qsc0JBQXNCLEVBQUU7b0JBQ3RCLElBQUksRUFBRSx3QkFBd0I7b0JBQzlCLElBQUksRUFBRSxtQkFBbUI7b0JBQ3pCLEtBQUssRUFBRSxtQkFBbUI7b0JBQzFCLFlBQVksRUFBRSxXQUFXO29CQUN6QixPQUFPLEVBQUUsZ0JBQWdCO29CQUN6QixLQUFLLEVBQUUsV0FBVztpQkFDbkI7Z0JBQ0QscUJBQXFCLEVBQUU7b0JBQ3JCLElBQUksRUFBRSx1QkFBdUI7b0JBQzdCLElBQUksRUFBRSxrQkFBa0I7b0JBQ3hCLEtBQUssRUFBRSxrQkFBa0I7b0JBQ3pCLFlBQVksRUFBRSxXQUFXO29CQUN6QixPQUFPLEVBQUUsZ0JBQWdCO29CQUN6QixLQUFLLEVBQUUsV0FBVztpQkFDbkI7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLElBQUksRUFBRSxjQUFjO29CQUNwQixJQUFJLEVBQUUsVUFBVTtvQkFDaEIsS0FBSyxFQUFFLFVBQVU7b0JBQ2pCLFlBQVksRUFBRSxXQUFXO29CQUN6QixPQUFPLEVBQUUsZ0JBQWdCO29CQUN6QixLQUFLLEVBQUUsV0FBVztpQkFDbkI7YUFDRjtTQUNGLENBQUE7SUFDSCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuaW1wb3J0IHtcbiAgUHJvSW5mb1Byb2pSZWwsXG4gIEluZlRlbXBvcmFsRW50aXR5LFxuICBEYXREaWdpdGFsLFxuICBEYXRDaHVuayxcbiAgSW5mQXBwZWxsYXRpb24sXG4gIEluZkxhbmdTdHJpbmcsXG4gIEluZkRpbWVuc2lvbixcbiAgSW5mTGFuZ3VhZ2UsXG4gIEluZlBlcnNpc3RlbnRJdGVtLFxuICBJbmZUaW1lUHJpbWl0aXZlLFxuICBJbmZQbGFjZVxufSBmcm9tICcuLi9pbmRleCc7XG5cbmRlY2xhcmUgdmFyIE9iamVjdDogYW55O1xuZXhwb3J0IGludGVyZmFjZSBJbmZTdGF0ZW1lbnRJbnRlcmZhY2Uge1xuICBcImZrX3N1YmplY3RfaW5mb1wiPzogbnVtYmVyO1xuICBcImZrX3N1YmplY3RfZGF0YVwiPzogbnVtYmVyO1xuICBcImZrX3N1YmplY3RfdGFibGVzX2NlbGxcIj86IG51bWJlcjtcbiAgXCJma19zdWJqZWN0X3RhYmxlc19yb3dcIj86IG51bWJlcjtcbiAgXCJma19wcm9wZXJ0eVwiPzogbnVtYmVyO1xuICBcImZrX3Byb3BlcnR5X29mX3Byb3BlcnR5XCI/OiBudW1iZXI7XG4gIFwiZmtfb2JqZWN0X2luZm9cIj86IG51bWJlcjtcbiAgXCJma19vYmplY3RfZGF0YVwiPzogbnVtYmVyO1xuICBcImZrX29iamVjdF90YWJsZXNfY2VsbFwiPzogbnVtYmVyO1xuICBcImZrX29iamVjdF90YWJsZXNfcm93XCI/OiBudW1iZXI7XG4gIFwiaXNfaW5fcHJvamVjdF9jb3VudFwiPzogbnVtYmVyO1xuICBcImlzX3N0YW5kYXJkX2luX3Byb2plY3RfY291bnRcIj86IG51bWJlcjtcbiAgXCJjb21tdW5pdHlfZmF2b3JpdGVfY2FsZW5kYXJcIj86IHN0cmluZztcbiAgXCJwa19lbnRpdHlcIj86IG51bWJlcjtcbiAgZW50aXR5X3ZlcnNpb25fcHJvamVjdF9yZWxzPzogUHJvSW5mb1Byb2pSZWxbXTtcbiAgc3ViamVjdF90ZW1wb3JhbF9lbnRpdHk/OiBJbmZUZW1wb3JhbEVudGl0eTtcbiAgc3ViamVjdF9kaWdpdGFsPzogRGF0RGlnaXRhbDtcbiAgc3ViamVjdF9jaHVuaz86IERhdENodW5rO1xuICBzdWJqZWN0X3N0YXRlbWVudD86IEluZlN0YXRlbWVudDtcbiAgb2JqZWN0X3RlbXBvcmFsX2VudGl0eT86IEluZlRlbXBvcmFsRW50aXR5O1xuICBvYmplY3RfYXBwZWxsYXRpb24/OiBJbmZBcHBlbGxhdGlvbjtcbiAgb2JqZWN0X2xhbmdfc3RyaW5nPzogSW5mTGFuZ1N0cmluZztcbiAgb2JqZWN0X2NodW5rPzogRGF0Q2h1bms7XG4gIG9iamVjdF9kaW1lbnNpb24/OiBJbmZEaW1lbnNpb247XG4gIG9iamVjdF9sYW5ndWFnZT86IEluZkxhbmd1YWdlO1xuICBzdWJqZWN0X3BlcnNpc3RlbnRfaXRlbT86IEluZlBlcnNpc3RlbnRJdGVtO1xuICBvYmplY3RfcGVyc2lzdGVudF9pdGVtPzogSW5mUGVyc2lzdGVudEl0ZW07XG4gIG9iamVjdF90aW1lX3ByaW1pdGl2ZT86IEluZlRpbWVQcmltaXRpdmU7XG4gIG9iamVjdF9wbGFjZT86IEluZlBsYWNlO1xufVxuXG5leHBvcnQgY2xhc3MgSW5mU3RhdGVtZW50IGltcGxlbWVudHMgSW5mU3RhdGVtZW50SW50ZXJmYWNlIHtcbiAgXCJma19zdWJqZWN0X2luZm9cIj86IG51bWJlcjtcbiAgXCJma19zdWJqZWN0X2RhdGFcIj86IG51bWJlcjtcbiAgXCJma19zdWJqZWN0X3RhYmxlc19jZWxsXCI/OiBudW1iZXI7XG4gIFwiZmtfc3ViamVjdF90YWJsZXNfcm93XCI/OiBudW1iZXI7XG4gIFwiZmtfcHJvcGVydHlcIj86IG51bWJlcjtcbiAgXCJma19wcm9wZXJ0eV9vZl9wcm9wZXJ0eVwiPzogbnVtYmVyO1xuICBcImZrX29iamVjdF9pbmZvXCI/OiBudW1iZXI7XG4gIFwiZmtfb2JqZWN0X2RhdGFcIj86IG51bWJlcjtcbiAgXCJma19vYmplY3RfdGFibGVzX2NlbGxcIj86IG51bWJlcjtcbiAgXCJma19vYmplY3RfdGFibGVzX3Jvd1wiPzogbnVtYmVyO1xuICBcImlzX2luX3Byb2plY3RfY291bnRcIj86IG51bWJlcjtcbiAgXCJpc19zdGFuZGFyZF9pbl9wcm9qZWN0X2NvdW50XCI/OiBudW1iZXI7XG4gIFwiY29tbXVuaXR5X2Zhdm9yaXRlX2NhbGVuZGFyXCI/OiBzdHJpbmc7XG4gIFwicGtfZW50aXR5XCI/OiBudW1iZXI7XG4gIGVudGl0eV92ZXJzaW9uX3Byb2plY3RfcmVscz86IFByb0luZm9Qcm9qUmVsW107XG4gIHN1YmplY3RfdGVtcG9yYWxfZW50aXR5PzogSW5mVGVtcG9yYWxFbnRpdHk7XG4gIHN1YmplY3RfZGlnaXRhbD86IERhdERpZ2l0YWw7XG4gIHN1YmplY3RfY2h1bms/OiBEYXRDaHVuaztcbiAgc3ViamVjdF9zdGF0ZW1lbnQ/OiBJbmZTdGF0ZW1lbnQ7XG4gIG9iamVjdF90ZW1wb3JhbF9lbnRpdHk/OiBJbmZUZW1wb3JhbEVudGl0eTtcbiAgb2JqZWN0X2FwcGVsbGF0aW9uPzogSW5mQXBwZWxsYXRpb247XG4gIG9iamVjdF9sYW5nX3N0cmluZz86IEluZkxhbmdTdHJpbmc7XG4gIG9iamVjdF9jaHVuaz86IERhdENodW5rO1xuICBvYmplY3RfZGltZW5zaW9uPzogSW5mRGltZW5zaW9uO1xuICBvYmplY3RfbGFuZ3VhZ2U/OiBJbmZMYW5ndWFnZTtcbiAgc3ViamVjdF9wZXJzaXN0ZW50X2l0ZW0/OiBJbmZQZXJzaXN0ZW50SXRlbTtcbiAgb2JqZWN0X3BlcnNpc3RlbnRfaXRlbT86IEluZlBlcnNpc3RlbnRJdGVtO1xuICBvYmplY3RfdGltZV9wcmltaXRpdmU/OiBJbmZUaW1lUHJpbWl0aXZlO1xuICBvYmplY3RfcGxhY2U/OiBJbmZQbGFjZTtcbiAgY29uc3RydWN0b3IoZGF0YT86IEluZlN0YXRlbWVudEludGVyZmFjZSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG4gIH1cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBtb2RlbCByZXByZXNlbnRlZCBieSB0aGlzICRyZXNvdXJjZSxcbiAgICogaS5lLiBgSW5mU3RhdGVtZW50YC5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxOYW1lKCkge1xuICAgIHJldHVybiBcIkluZlN0YXRlbWVudFwiO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgZmFjdG9yeVxuICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXNcbiAgKiBAbGljZW5zZSBNSVRcbiAgKiBUaGlzIG1ldGhvZCBjcmVhdGVzIGFuIGluc3RhbmNlIG9mIEluZlN0YXRlbWVudCBmb3IgZHluYW1pYyBwdXJwb3Nlcy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0aWMgZmFjdG9yeShkYXRhOiBJbmZTdGF0ZW1lbnRJbnRlcmZhY2UpOiBJbmZTdGF0ZW1lbnQge1xuICAgIHJldHVybiBuZXcgSW5mU3RhdGVtZW50KGRhdGEpO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgZ2V0TW9kZWxEZWZpbml0aW9uXG4gICogQGF1dGhvciBKdWxpZW4gTGVkdW5cbiAgKiBAbGljZW5zZSBNSVRcbiAgKiBUaGlzIG1ldGhvZCByZXR1cm5zIGFuIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgc29tZSBvZiB0aGUgbW9kZWxcbiAgKiBkZWZpbml0aW9ucy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxEZWZpbml0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiAnSW5mU3RhdGVtZW50JyxcbiAgICAgIHBsdXJhbDogJ0luZlN0YXRlbWVudHMnLFxuICAgICAgcGF0aDogJ0luZlN0YXRlbWVudHMnLFxuICAgICAgaWROYW1lOiAncGtfZW50aXR5JyxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgXCJma19zdWJqZWN0X2luZm9cIjoge1xuICAgICAgICAgIG5hbWU6ICdma19zdWJqZWN0X2luZm8nLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInLFxuICAgICAgICAgIGRlZmF1bHQ6IDBcbiAgICAgICAgfSxcbiAgICAgICAgXCJma19zdWJqZWN0X2RhdGFcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19zdWJqZWN0X2RhdGEnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInLFxuICAgICAgICAgIGRlZmF1bHQ6IDBcbiAgICAgICAgfSxcbiAgICAgICAgXCJma19zdWJqZWN0X3RhYmxlc19jZWxsXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfc3ViamVjdF90YWJsZXNfY2VsbCcsXG4gICAgICAgICAgdHlwZTogJ251bWJlcicsXG4gICAgICAgICAgZGVmYXVsdDogMFxuICAgICAgICB9LFxuICAgICAgICBcImZrX3N1YmplY3RfdGFibGVzX3Jvd1wiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX3N1YmplY3RfdGFibGVzX3JvdycsXG4gICAgICAgICAgdHlwZTogJ251bWJlcicsXG4gICAgICAgICAgZGVmYXVsdDogMFxuICAgICAgICB9LFxuICAgICAgICBcImZrX3Byb3BlcnR5XCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfcHJvcGVydHknLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInLFxuICAgICAgICAgIGRlZmF1bHQ6IDBcbiAgICAgICAgfSxcbiAgICAgICAgXCJma19wcm9wZXJ0eV9vZl9wcm9wZXJ0eVwiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX3Byb3BlcnR5X29mX3Byb3BlcnR5JyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICBkZWZhdWx0OiAwXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfb2JqZWN0X2luZm9cIjoge1xuICAgICAgICAgIG5hbWU6ICdma19vYmplY3RfaW5mbycsXG4gICAgICAgICAgdHlwZTogJ251bWJlcicsXG4gICAgICAgICAgZGVmYXVsdDogMFxuICAgICAgICB9LFxuICAgICAgICBcImZrX29iamVjdF9kYXRhXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfb2JqZWN0X2RhdGEnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInLFxuICAgICAgICAgIGRlZmF1bHQ6IDBcbiAgICAgICAgfSxcbiAgICAgICAgXCJma19vYmplY3RfdGFibGVzX2NlbGxcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19vYmplY3RfdGFibGVzX2NlbGwnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInLFxuICAgICAgICAgIGRlZmF1bHQ6IDBcbiAgICAgICAgfSxcbiAgICAgICAgXCJma19vYmplY3RfdGFibGVzX3Jvd1wiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX29iamVjdF90YWJsZXNfcm93JyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICBkZWZhdWx0OiAwXG4gICAgICAgIH0sXG4gICAgICAgIFwiaXNfaW5fcHJvamVjdF9jb3VudFwiOiB7XG4gICAgICAgICAgbmFtZTogJ2lzX2luX3Byb2plY3RfY291bnQnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwiaXNfc3RhbmRhcmRfaW5fcHJvamVjdF9jb3VudFwiOiB7XG4gICAgICAgICAgbmFtZTogJ2lzX3N0YW5kYXJkX2luX3Byb2plY3RfY291bnQnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwiY29tbXVuaXR5X2Zhdm9yaXRlX2NhbGVuZGFyXCI6IHtcbiAgICAgICAgICBuYW1lOiAnY29tbXVuaXR5X2Zhdm9yaXRlX2NhbGVuZGFyJyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBcInBrX2VudGl0eVwiOiB7XG4gICAgICAgICAgbmFtZTogJ3BrX2VudGl0eScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZWxhdGlvbnM6IHtcbiAgICAgICAgZW50aXR5X3ZlcnNpb25fcHJvamVjdF9yZWxzOiB7XG4gICAgICAgICAgbmFtZTogJ2VudGl0eV92ZXJzaW9uX3Byb2plY3RfcmVscycsXG4gICAgICAgICAgdHlwZTogJ1Byb0luZm9Qcm9qUmVsW10nLFxuICAgICAgICAgIG1vZGVsOiAnUHJvSW5mb1Byb2pSZWwnLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2hhc01hbnknLFxuICAgICAgICAgIGtleUZyb206ICdwa19lbnRpdHknLFxuICAgICAgICAgIGtleVRvOiAnZmtfZW50aXR5J1xuICAgICAgICB9LFxuICAgICAgICBzdWJqZWN0X3RlbXBvcmFsX2VudGl0eToge1xuICAgICAgICAgIG5hbWU6ICdzdWJqZWN0X3RlbXBvcmFsX2VudGl0eScsXG4gICAgICAgICAgdHlwZTogJ0luZlRlbXBvcmFsRW50aXR5JyxcbiAgICAgICAgICBtb2RlbDogJ0luZlRlbXBvcmFsRW50aXR5JyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdiZWxvbmdzVG8nLFxuICAgICAgICAgIGtleUZyb206ICdma19zdWJqZWN0X2luZm8nLFxuICAgICAgICAgIGtleVRvOiAncGtfZW50aXR5J1xuICAgICAgICB9LFxuICAgICAgICBzdWJqZWN0X2RpZ2l0YWw6IHtcbiAgICAgICAgICBuYW1lOiAnc3ViamVjdF9kaWdpdGFsJyxcbiAgICAgICAgICB0eXBlOiAnRGF0RGlnaXRhbCcsXG4gICAgICAgICAgbW9kZWw6ICdEYXREaWdpdGFsJyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdiZWxvbmdzVG8nLFxuICAgICAgICAgIGtleUZyb206ICdma19zdWJqZWN0X2RhdGEnLFxuICAgICAgICAgIGtleVRvOiAncGtfZW50aXR5J1xuICAgICAgICB9LFxuICAgICAgICBzdWJqZWN0X2NodW5rOiB7XG4gICAgICAgICAgbmFtZTogJ3N1YmplY3RfY2h1bmsnLFxuICAgICAgICAgIHR5cGU6ICdEYXRDaHVuaycsXG4gICAgICAgICAgbW9kZWw6ICdEYXRDaHVuaycsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnYmVsb25nc1RvJyxcbiAgICAgICAgICBrZXlGcm9tOiAnZmtfc3ViamVjdF9kYXRhJyxcbiAgICAgICAgICBrZXlUbzogJ3BrX2VudGl0eSdcbiAgICAgICAgfSxcbiAgICAgICAgc3ViamVjdF9zdGF0ZW1lbnQ6IHtcbiAgICAgICAgICBuYW1lOiAnc3ViamVjdF9zdGF0ZW1lbnQnLFxuICAgICAgICAgIHR5cGU6ICdJbmZTdGF0ZW1lbnQnLFxuICAgICAgICAgIG1vZGVsOiAnSW5mU3RhdGVtZW50JyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdiZWxvbmdzVG8nLFxuICAgICAgICAgIGtleUZyb206ICdma19zdWJqZWN0X2luZm8nLFxuICAgICAgICAgIGtleVRvOiAncGtfZW50aXR5J1xuICAgICAgICB9LFxuICAgICAgICBvYmplY3RfdGVtcG9yYWxfZW50aXR5OiB7XG4gICAgICAgICAgbmFtZTogJ29iamVjdF90ZW1wb3JhbF9lbnRpdHknLFxuICAgICAgICAgIHR5cGU6ICdJbmZUZW1wb3JhbEVudGl0eScsXG4gICAgICAgICAgbW9kZWw6ICdJbmZUZW1wb3JhbEVudGl0eScsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnYmVsb25nc1RvJyxcbiAgICAgICAgICBrZXlGcm9tOiAnZmtfb2JqZWN0X2luZm8nLFxuICAgICAgICAgIGtleVRvOiAncGtfZW50aXR5J1xuICAgICAgICB9LFxuICAgICAgICBvYmplY3RfYXBwZWxsYXRpb246IHtcbiAgICAgICAgICBuYW1lOiAnb2JqZWN0X2FwcGVsbGF0aW9uJyxcbiAgICAgICAgICB0eXBlOiAnSW5mQXBwZWxsYXRpb24nLFxuICAgICAgICAgIG1vZGVsOiAnSW5mQXBwZWxsYXRpb24nLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2JlbG9uZ3NUbycsXG4gICAgICAgICAga2V5RnJvbTogJ2ZrX29iamVjdF9pbmZvJyxcbiAgICAgICAgICBrZXlUbzogJ3BrX2VudGl0eSdcbiAgICAgICAgfSxcbiAgICAgICAgb2JqZWN0X2xhbmdfc3RyaW5nOiB7XG4gICAgICAgICAgbmFtZTogJ29iamVjdF9sYW5nX3N0cmluZycsXG4gICAgICAgICAgdHlwZTogJ0luZkxhbmdTdHJpbmcnLFxuICAgICAgICAgIG1vZGVsOiAnSW5mTGFuZ1N0cmluZycsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnYmVsb25nc1RvJyxcbiAgICAgICAgICBrZXlGcm9tOiAnZmtfb2JqZWN0X2luZm8nLFxuICAgICAgICAgIGtleVRvOiAncGtfZW50aXR5J1xuICAgICAgICB9LFxuICAgICAgICBvYmplY3RfY2h1bms6IHtcbiAgICAgICAgICBuYW1lOiAnb2JqZWN0X2NodW5rJyxcbiAgICAgICAgICB0eXBlOiAnRGF0Q2h1bmsnLFxuICAgICAgICAgIG1vZGVsOiAnRGF0Q2h1bmsnLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2JlbG9uZ3NUbycsXG4gICAgICAgICAga2V5RnJvbTogJ2ZrX29iamVjdF9kYXRhJyxcbiAgICAgICAgICBrZXlUbzogJ3BrX2VudGl0eSdcbiAgICAgICAgfSxcbiAgICAgICAgb2JqZWN0X2RpbWVuc2lvbjoge1xuICAgICAgICAgIG5hbWU6ICdvYmplY3RfZGltZW5zaW9uJyxcbiAgICAgICAgICB0eXBlOiAnSW5mRGltZW5zaW9uJyxcbiAgICAgICAgICBtb2RlbDogJ0luZkRpbWVuc2lvbicsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnYmVsb25nc1RvJyxcbiAgICAgICAgICBrZXlGcm9tOiAnZmtfb2JqZWN0X2luZm8nLFxuICAgICAgICAgIGtleVRvOiAncGtfZW50aXR5J1xuICAgICAgICB9LFxuICAgICAgICBvYmplY3RfbGFuZ3VhZ2U6IHtcbiAgICAgICAgICBuYW1lOiAnb2JqZWN0X2xhbmd1YWdlJyxcbiAgICAgICAgICB0eXBlOiAnSW5mTGFuZ3VhZ2UnLFxuICAgICAgICAgIG1vZGVsOiAnSW5mTGFuZ3VhZ2UnLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2JlbG9uZ3NUbycsXG4gICAgICAgICAga2V5RnJvbTogJ2ZrX29iamVjdF9pbmZvJyxcbiAgICAgICAgICBrZXlUbzogJ3BrX2VudGl0eSdcbiAgICAgICAgfSxcbiAgICAgICAgc3ViamVjdF9wZXJzaXN0ZW50X2l0ZW06IHtcbiAgICAgICAgICBuYW1lOiAnc3ViamVjdF9wZXJzaXN0ZW50X2l0ZW0nLFxuICAgICAgICAgIHR5cGU6ICdJbmZQZXJzaXN0ZW50SXRlbScsXG4gICAgICAgICAgbW9kZWw6ICdJbmZQZXJzaXN0ZW50SXRlbScsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnYmVsb25nc1RvJyxcbiAgICAgICAgICBrZXlGcm9tOiAnZmtfc3ViamVjdF9pbmZvJyxcbiAgICAgICAgICBrZXlUbzogJ3BrX2VudGl0eSdcbiAgICAgICAgfSxcbiAgICAgICAgb2JqZWN0X3BlcnNpc3RlbnRfaXRlbToge1xuICAgICAgICAgIG5hbWU6ICdvYmplY3RfcGVyc2lzdGVudF9pdGVtJyxcbiAgICAgICAgICB0eXBlOiAnSW5mUGVyc2lzdGVudEl0ZW0nLFxuICAgICAgICAgIG1vZGVsOiAnSW5mUGVyc2lzdGVudEl0ZW0nLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2JlbG9uZ3NUbycsXG4gICAgICAgICAga2V5RnJvbTogJ2ZrX29iamVjdF9pbmZvJyxcbiAgICAgICAgICBrZXlUbzogJ3BrX2VudGl0eSdcbiAgICAgICAgfSxcbiAgICAgICAgb2JqZWN0X3RpbWVfcHJpbWl0aXZlOiB7XG4gICAgICAgICAgbmFtZTogJ29iamVjdF90aW1lX3ByaW1pdGl2ZScsXG4gICAgICAgICAgdHlwZTogJ0luZlRpbWVQcmltaXRpdmUnLFxuICAgICAgICAgIG1vZGVsOiAnSW5mVGltZVByaW1pdGl2ZScsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnYmVsb25nc1RvJyxcbiAgICAgICAgICBrZXlGcm9tOiAnZmtfb2JqZWN0X2luZm8nLFxuICAgICAgICAgIGtleVRvOiAncGtfZW50aXR5J1xuICAgICAgICB9LFxuICAgICAgICBvYmplY3RfcGxhY2U6IHtcbiAgICAgICAgICBuYW1lOiAnb2JqZWN0X3BsYWNlJyxcbiAgICAgICAgICB0eXBlOiAnSW5mUGxhY2UnLFxuICAgICAgICAgIG1vZGVsOiAnSW5mUGxhY2UnLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2JlbG9uZ3NUbycsXG4gICAgICAgICAga2V5RnJvbTogJ2ZrX29iamVjdF9pbmZvJyxcbiAgICAgICAgICBrZXlUbzogJ3BrX2VudGl0eSdcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==