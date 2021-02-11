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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5mU3RhdGVtZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1zZGstbGIzLyIsInNvdXJjZXMiOlsibW9kZWxzL0luZlN0YXRlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFnREE7SUE4QkUsc0JBQVksSUFBNEI7UUFDdEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNEOzs7T0FHRztJQUNXLHlCQUFZLEdBQTFCO1FBQ0UsT0FBTyxjQUFjLENBQUM7SUFDeEIsQ0FBQztJQUNEOzs7OztPQUtHO0lBQ1csb0JBQU8sR0FBckIsVUFBc0IsSUFBMkI7UUFDL0MsT0FBTyxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ1csK0JBQWtCLEdBQWhDO1FBQ0UsT0FBTztZQUNMLElBQUksRUFBRSxjQUFjO1lBQ3BCLE1BQU0sRUFBRSxlQUFlO1lBQ3ZCLElBQUksRUFBRSxlQUFlO1lBQ3JCLE1BQU0sRUFBRSxXQUFXO1lBQ25CLFVBQVUsRUFBRTtnQkFDVixpQkFBaUIsRUFBRTtvQkFDakIsSUFBSSxFQUFFLGlCQUFpQjtvQkFDdkIsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsT0FBTyxFQUFFLENBQUM7aUJBQ1g7Z0JBQ0QsaUJBQWlCLEVBQUU7b0JBQ2pCLElBQUksRUFBRSxpQkFBaUI7b0JBQ3ZCLElBQUksRUFBRSxRQUFRO29CQUNkLE9BQU8sRUFBRSxDQUFDO2lCQUNYO2dCQUNELHdCQUF3QixFQUFFO29CQUN4QixJQUFJLEVBQUUsd0JBQXdCO29CQUM5QixJQUFJLEVBQUUsUUFBUTtvQkFDZCxPQUFPLEVBQUUsQ0FBQztpQkFDWDtnQkFDRCx1QkFBdUIsRUFBRTtvQkFDdkIsSUFBSSxFQUFFLHVCQUF1QjtvQkFDN0IsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsT0FBTyxFQUFFLENBQUM7aUJBQ1g7Z0JBQ0QsYUFBYSxF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V0FBVztvQkFDekIsT0FBTyxFQUFFLGlCQUFpQjtvQkFDMUIsS0FBSyxFQUFFLFdBQVc7aUJBQ25CO2dCQUNELHNCQUFzQixFQUFFO29CQUN0QixJQUFJLEVBQUUsd0JBQXdCO29CQUM5QixJQUFJLEVBQUUsbUJBQW1CO29CQUN6QixLQUFLLEVBQUUsbUJBQW1CO29CQUMxQixZQUFZLEVBQUUsV0FBVztvQkFDekIsT0FBTyxFQUFFLGdCQUFnQjtvQkFDekIsS0FBSyxFQUFFLFdBQVc7aUJBQ25CO2dCQUNELHFCQUFxQixFQUFFO29CQUNyQixJQUFJLEVBQUUsdUJBQXVCO29CQUM3QixJQUFJLEVBQUUsa0JBQWtCO29CQUN4QixLQUFLLEVBQUUsa0JBQWtCO29CQUN6QixZQUFZLEVBQUUsV0FBVztvQkFDekIsT0FBTyxFQUFFLGdCQUFnQjtvQkFDekIsS0FBSyxFQUFFLFdBQVc7aUJBQ25CO2dCQUNELFlBQVksRUFBRTtvQkFDWixJQUFJLEVBQUUsY0FBYztvQkFDcEIsSUFBSSxFQUFFLFVBQVU7b0JBQ2hCLEtBQUssRUFBRSxVQUFVO29CQUNqQixZQUFZLEVBQUUsV0FBVztvQkFDekIsT0FBTyxFQUFFLGdCQUFnQjtvQkFDekIsS0FBSyxFQUFFLFdBQVc7aUJBQ25CO2FBQ0Y7U0FDRixDQUFBO0lBQ0gsQ0FBQztJQUNILG1CQUFDO0FBQUQsQ0FBQyxBQTlQRCxJQThQQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5pbXBvcnQge1xuICBQcm9JbmZvUHJvalJlbCxcbiAgSW5mVGVtcG9yYWxFbnRpdHksXG4gIERhdERpZ2l0YWwsXG4gIERhdENodW5rLFxuICBJbmZBcHBlbGxhdGlvbixcbiAgSW5mTGFuZ1N0cmluZyxcbiAgSW5mRGltZW5zaW9uLFxuICBJbmZMYW5ndWFnZSxcbiAgSW5mUGVyc2lzdGVudEl0ZW0sXG4gIEluZlRpbWVQcmltaXRpdmUsXG4gIEluZlBsYWNlXG59IGZyb20gJy4uL2luZGV4JztcblxuZGVjbGFyZSB2YXIgT2JqZWN0OiBhbnk7XG5leHBvcnQgaW50ZXJmYWNlIEluZlN0YXRlbWVudEludGVyZmFjZSB7XG4gIFwiZmtfc3ViamVjdF9pbmZvXCI/OiBudW1iZXI7XG4gIFwiZmtfc3ViamVjdF9kYXRhXCI/OiBudW1iZXI7XG4gIFwiZmtfc3ViamVjdF90YWJsZXNfY2VsbFwiPzogbnVtYmVyO1xuICBcImZrX3N1YmplY3RfdGFibGVzX3Jvd1wiPzogbnVtYmVyO1xuICBcImZrX3Byb3BlcnR5XCI/OiBudW1iZXI7XG4gIFwiZmtfcHJvcGVydHlfb2ZfcHJvcGVydHlcIj86IG51bWJlcjtcbiAgXCJma19vYmplY3RfaW5mb1wiPzogbnVtYmVyO1xuICBcImZrX29iamVjdF9kYXRhXCI/OiBudW1iZXI7XG4gIFwiZmtfb2JqZWN0X3RhYmxlc19jZWxsXCI/OiBudW1iZXI7XG4gIFwiZmtfb2JqZWN0X3RhYmxlc19yb3dcIj86IG51bWJlcjtcbiAgXCJpc19pbl9wcm9qZWN0X2NvdW50XCI/OiBudW1iZXI7XG4gIFwiaXNfc3RhbmRhcmRfaW5fcHJvamVjdF9jb3VudFwiPzogbnVtYmVyO1xuICBcImNvbW11bml0eV9mYXZvcml0ZV9jYWxlbmRhclwiPzogc3RyaW5nO1xuICBcInBrX2VudGl0eVwiPzogbnVtYmVyO1xuICBlbnRpdHlfdmVyc2lvbl9wcm9qZWN0X3JlbHM/OiBQcm9JbmZvUHJvalJlbFtdO1xuICBzdWJqZWN0X3RlbXBvcmFsX2VudGl0eT86IEluZlRlbXBvcmFsRW50aXR5O1xuICBzdWJqZWN0X2RpZ2l0YWw/OiBEYXREaWdpdGFsO1xuICBzdWJqZWN0X2NodW5rPzogRGF0Q2h1bms7XG4gIHN1YmplY3Rfc3RhdGVtZW50PzogSW5mU3RhdGVtZW50O1xuICBvYmplY3RfdGVtcG9yYWxfZW50aXR5PzogSW5mVGVtcG9yYWxFbnRpdHk7XG4gIG9iamVjdF9hcHBlbGxhdGlvbj86IEluZkFwcGVsbGF0aW9uO1xuICBvYmplY3RfbGFuZ19zdHJpbmc/OiBJbmZMYW5nU3RyaW5nO1xuICBvYmplY3RfY2h1bms/OiBEYXRDaHVuaztcbiAgb2JqZWN0X2RpbWVuc2lvbj86IEluZkRpbWVuc2lvbjtcbiAgb2JqZWN0X2xhbmd1YWdlPzogSW5mTGFuZ3VhZ2U7XG4gIHN1YmplY3RfcGVyc2lzdGVudF9pdGVtPzogSW5mUGVyc2lzdGVudEl0ZW07XG4gIG9iamVjdF9wZXJzaXN0ZW50X2l0ZW0/OiBJbmZQZXJzaXN0ZW50SXRlbTtcbiAgb2JqZWN0X3RpbWVfcHJpbWl0aXZlPzogSW5mVGltZVByaW1pdGl2ZTtcbiAgb2JqZWN0X3BsYWNlPzogSW5mUGxhY2U7XG59XG5cbmV4cG9ydCBjbGFzcyBJbmZTdGF0ZW1lbnQgaW1wbGVtZW50cyBJbmZTdGF0ZW1lbnRJbnRlcmZhY2Uge1xuICBcImZrX3N1YmplY3RfaW5mb1wiPzogbnVtYmVyO1xuICBcImZrX3N1YmplY3RfZGF0YVwiPzogbnVtYmVyO1xuICBcImZrX3N1YmplY3RfdGFibGVzX2NlbGxcIj86IG51bWJlcjtcbiAgXCJma19zdWJqZWN0X3RhYmxlc19yb3dcIj86IG51bWJlcjtcbiAgXCJma19wcm9wZXJ0eVwiPzogbnVtYmVyO1xuICBcImZrX3Byb3BlcnR5X29mX3Byb3BlcnR5XCI/OiBudW1iZXI7XG4gIFwiZmtfb2JqZWN0X2luZm9cIj86IG51bWJlcjtcbiAgXCJma19vYmplY3RfZGF0YVwiPzogbnVtYmVyO1xuICBcImZrX29iamVjdF90YWJsZXNfY2VsbFwiPzogbnVtYmVyO1xuICBcImZrX29iamVjdF90YWJsZXNfcm93XCI/OiBudW1iZXI7XG4gIFwiaXNfaW5fcHJvamVjdF9jb3VudFwiPzogbnVtYmVyO1xuICBcImlzX3N0YW5kYXJkX2luX3Byb2plY3RfY291bnRcIj86IG51bWJlcjtcbiAgXCJjb21tdW5pdHlfZmF2b3JpdGVfY2FsZW5kYXJcIj86IHN0cmluZztcbiAgXCJwa19lbnRpdHlcIj86IG51bWJlcjtcbiAgZW50aXR5X3ZlcnNpb25fcHJvamVjdF9yZWxzPzogUHJvSW5mb1Byb2pSZWxbXTtcbiAgc3ViamVjdF90ZW1wb3JhbF9lbnRpdHk/OiBJbmZUZW1wb3JhbEVudGl0eTtcbiAgc3ViamVjdF9kaWdpdGFsPzogRGF0RGlnaXRhbDtcbiAgc3ViamVjdF9jaHVuaz86IERhdENodW5rO1xuICBzdWJqZWN0X3N0YXRlbWVudD86IEluZlN0YXRlbWVudDtcbiAgb2JqZWN0X3RlbXBvcmFsX2VudGl0eT86IEluZlRlbXBvcmFsRW50aXR5O1xuICBvYmplY3RfYXBwZWxsYXRpb24/OiBJbmZBcHBlbGxhdGlvbjtcbiAgb2JqZWN0X2xhbmdfc3RyaW5nPzogSW5mTGFuZ1N0cmluZztcbiAgb2JqZWN0X2NodW5rPzogRGF0Q2h1bms7XG4gIG9iamVjdF9kaW1lbnNpb24/OiBJbmZEaW1lbnNpb247XG4gIG9iamVjdF9sYW5ndWFnZT86IEluZkxhbmd1YWdlO1xuICBzdWJqZWN0X3BlcnNpc3RlbnRfaXRlbT86IEluZlBlcnNpc3RlbnRJdGVtO1xuICBvYmplY3RfcGVyc2lzdGVudF9pdGVtPzogSW5mUGVyc2lzdGVudEl0ZW07XG4gIG9iamVjdF90aW1lX3ByaW1pdGl2ZT86IEluZlRpbWVQcmltaXRpdmU7XG4gIG9iamVjdF9wbGFjZT86IEluZlBsYWNlO1xuICBjb25zdHJ1Y3RvcihkYXRhPzogSW5mU3RhdGVtZW50SW50ZXJmYWNlKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgfVxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxuICAgKiBpLmUuIGBJbmZTdGF0ZW1lbnRgLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbE5hbWUoKSB7XG4gICAgcmV0dXJuIFwiSW5mU3RhdGVtZW50XCI7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBmYWN0b3J5XG4gICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1Ymlhc1xuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIGNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgSW5mU3RhdGVtZW50IGZvciBkeW5hbWljIHB1cnBvc2VzLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBmYWN0b3J5KGRhdGE6IEluZlN0YXRlbWVudEludGVyZmFjZSk6IEluZlN0YXRlbWVudCB7XG4gICAgcmV0dXJuIG5ldyBJbmZTdGF0ZW1lbnQoZGF0YSk7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBnZXRNb2RlbERlZmluaXRpb25cbiAgKiBAYXV0aG9yIEp1bGllbiBMZWR1blxuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIHJldHVybnMgYW4gb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBzb21lIG9mIHRoZSBtb2RlbFxuICAqIGRlZmluaXRpb25zLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbERlZmluaXRpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6ICdJbmZTdGF0ZW1lbnQnLFxuICAgICAgcGx1cmFsOiAnSW5mU3RhdGVtZW50cycsXG4gICAgICBwYXRoOiAnSW5mU3RhdGVtZW50cycsXG4gICAgICBpZE5hbWU6ICdwa19lbnRpdHknLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBcImZrX3N1YmplY3RfaW5mb1wiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX3N1YmplY3RfaW5mbycsXG4gICAgICAgICAgdHlwZTogJ251bWJlcicsXG4gICAgICAgICAgZGVmYXVsdDogMFxuICAgICAgICB9LFxuICAgICAgICBcImZrX3N1YmplY3RfZGF0YVwiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX3N1YmplY3RfZGF0YScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcicsXG4gICAgICAgICAgZGVmYXVsdDogMFxuICAgICAgICB9LFxuICAgICAgICBcImZrX3N1YmplY3RfdGFibGVzX2NlbGxcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19zdWJqZWN0X3RhYmxlc19jZWxsJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICBkZWZhdWx0OiAwXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfc3ViamVjdF90YWJsZXNfcm93XCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfc3ViamVjdF90YWJsZXNfcm93JyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICBkZWZhdWx0OiAwXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfcHJvcGVydHlcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19wcm9wZXJ0eScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcicsXG4gICAgICAgICAgZGVmYXVsdDogMFxuICAgICAgICB9LFxuICAgICAgICBcImZrX3Byb3BlcnR5X29mX3Byb3BlcnR5XCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfcHJvcGVydHlfb2ZfcHJvcGVydHknLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInLFxuICAgICAgICAgIGRlZmF1bHQ6IDBcbiAgICAgICAgfSxcbiAgICAgICAgXCJma19vYmplY3RfaW5mb1wiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX29iamVjdF9pbmZvJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICBkZWZhdWx0OiAwXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfb2JqZWN0X2RhdGFcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19vYmplY3RfZGF0YScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcicsXG4gICAgICAgICAgZGVmYXVsdDogMFxuICAgICAgICB9LFxuICAgICAgICBcImZrX29iamVjdF90YWJsZXNfY2VsbFwiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX29iamVjdF90YWJsZXNfY2VsbCcsXG4gICAgICAgICAgdHlwZTogJ251bWJlcicsXG4gICAgICAgICAgZGVmYXVsdDogMFxuICAgICAgICB9LFxuICAgICAgICBcImZrX29iamVjdF90YWJsZXNfcm93XCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfb2JqZWN0X3RhYmxlc19yb3cnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInLFxuICAgICAgICAgIGRlZmF1bHQ6IDBcbiAgICAgICAgfSxcbiAgICAgICAgXCJpc19pbl9wcm9qZWN0X2NvdW50XCI6IHtcbiAgICAgICAgICBuYW1lOiAnaXNfaW5fcHJvamVjdF9jb3VudCcsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJpc19zdGFuZGFyZF9pbl9wcm9qZWN0X2NvdW50XCI6IHtcbiAgICAgICAgICBuYW1lOiAnaXNfc3RhbmRhcmRfaW5fcHJvamVjdF9jb3VudCcsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJjb21tdW5pdHlfZmF2b3JpdGVfY2FsZW5kYXJcIjoge1xuICAgICAgICAgIG5hbWU6ICdjb21tdW5pdHlfZmF2b3JpdGVfY2FsZW5kYXInLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwicGtfZW50aXR5XCI6IHtcbiAgICAgICAgICBuYW1lOiAncGtfZW50aXR5JyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlbGF0aW9uczoge1xuICAgICAgICBlbnRpdHlfdmVyc2lvbl9wcm9qZWN0X3JlbHM6IHtcbiAgICAgICAgICBuYW1lOiAnZW50aXR5X3ZlcnNpb25fcHJvamVjdF9yZWxzJyxcbiAgICAgICAgICB0eXBlOiAnUHJvSW5mb1Byb2pSZWxbXScsXG4gICAgICAgICAgbW9kZWw6ICdQcm9JbmZvUHJvalJlbCcsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnaGFzTWFueScsXG4gICAgICAgICAga2V5RnJvbTogJ3BrX2VudGl0eScsXG4gICAgICAgICAga2V5VG86ICdma19lbnRpdHknXG4gICAgICAgIH0sXG4gICAgICAgIHN1YmplY3RfdGVtcG9yYWxfZW50aXR5OiB7XG4gICAgICAgICAgbmFtZTogJ3N1YmplY3RfdGVtcG9yYWxfZW50aXR5JyxcbiAgICAgICAgICB0eXBlOiAnSW5mVGVtcG9yYWxFbnRpdHknLFxuICAgICAgICAgIG1vZGVsOiAnSW5mVGVtcG9yYWxFbnRpdHknLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2JlbG9uZ3NUbycsXG4gICAgICAgICAga2V5RnJvbTogJ2ZrX3N1YmplY3RfaW5mbycsXG4gICAgICAgICAga2V5VG86ICdwa19lbnRpdHknXG4gICAgICAgIH0sXG4gICAgICAgIHN1YmplY3RfZGlnaXRhbDoge1xuICAgICAgICAgIG5hbWU6ICdzdWJqZWN0X2RpZ2l0YWwnLFxuICAgICAgICAgIHR5cGU6ICdEYXREaWdpdGFsJyxcbiAgICAgICAgICBtb2RlbDogJ0RhdERpZ2l0YWwnLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2JlbG9uZ3NUbycsXG4gICAgICAgICAga2V5RnJvbTogJ2ZrX3N1YmplY3RfZGF0YScsXG4gICAgICAgICAga2V5VG86ICdwa19lbnRpdHknXG4gICAgICAgIH0sXG4gICAgICAgIHN1YmplY3RfY2h1bms6IHtcbiAgICAgICAgICBuYW1lOiAnc3ViamVjdF9jaHVuaycsXG4gICAgICAgICAgdHlwZTogJ0RhdENodW5rJyxcbiAgICAgICAgICBtb2RlbDogJ0RhdENodW5rJyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdiZWxvbmdzVG8nLFxuICAgICAgICAgIGtleUZyb206ICdma19zdWJqZWN0X2RhdGEnLFxuICAgICAgICAgIGtleVRvOiAncGtfZW50aXR5J1xuICAgICAgICB9LFxuICAgICAgICBzdWJqZWN0X3N0YXRlbWVudDoge1xuICAgICAgICAgIG5hbWU6ICdzdWJqZWN0X3N0YXRlbWVudCcsXG4gICAgICAgICAgdHlwZTogJ0luZlN0YXRlbWVudCcsXG4gICAgICAgICAgbW9kZWw6ICdJbmZTdGF0ZW1lbnQnLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2JlbG9uZ3NUbycsXG4gICAgICAgICAga2V5RnJvbTogJ2ZrX3N1YmplY3RfaW5mbycsXG4gICAgICAgICAga2V5VG86ICdwa19lbnRpdHknXG4gICAgICAgIH0sXG4gICAgICAgIG9iamVjdF90ZW1wb3JhbF9lbnRpdHk6IHtcbiAgICAgICAgICBuYW1lOiAnb2JqZWN0X3RlbXBvcmFsX2VudGl0eScsXG4gICAgICAgICAgdHlwZTogJ0luZlRlbXBvcmFsRW50aXR5JyxcbiAgICAgICAgICBtb2RlbDogJ0luZlRlbXBvcmFsRW50aXR5JyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdiZWxvbmdzVG8nLFxuICAgICAgICAgIGtleUZyb206ICdma19vYmplY3RfaW5mbycsXG4gICAgICAgICAga2V5VG86ICdwa19lbnRpdHknXG4gICAgICAgIH0sXG4gICAgICAgIG9iamVjdF9hcHBlbGxhdGlvbjoge1xuICAgICAgICAgIG5hbWU6ICdvYmplY3RfYXBwZWxsYXRpb24nLFxuICAgICAgICAgIHR5cGU6ICdJbmZBcHBlbGxhdGlvbicsXG4gICAgICAgICAgbW9kZWw6ICdJbmZBcHBlbGxhdGlvbicsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnYmVsb25nc1RvJyxcbiAgICAgICAgICBrZXlGcm9tOiAnZmtfb2JqZWN0X2luZm8nLFxuICAgICAgICAgIGtleVRvOiAncGtfZW50aXR5J1xuICAgICAgICB9LFxuICAgICAgICBvYmplY3RfbGFuZ19zdHJpbmc6IHtcbiAgICAgICAgICBuYW1lOiAnb2JqZWN0X2xhbmdfc3RyaW5nJyxcbiAgICAgICAgICB0eXBlOiAnSW5mTGFuZ1N0cmluZycsXG4gICAgICAgICAgbW9kZWw6ICdJbmZMYW5nU3RyaW5nJyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdiZWxvbmdzVG8nLFxuICAgICAgICAgIGtleUZyb206ICdma19vYmplY3RfaW5mbycsXG4gICAgICAgICAga2V5VG86ICdwa19lbnRpdHknXG4gICAgICAgIH0sXG4gICAgICAgIG9iamVjdF9jaHVuazoge1xuICAgICAgICAgIG5hbWU6ICdvYmplY3RfY2h1bmsnLFxuICAgICAgICAgIHR5cGU6ICdEYXRDaHVuaycsXG4gICAgICAgICAgbW9kZWw6ICdEYXRDaHVuaycsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnYmVsb25nc1RvJyxcbiAgICAgICAgICBrZXlGcm9tOiAnZmtfb2JqZWN0X2RhdGEnLFxuICAgICAgICAgIGtleVRvOiAncGtfZW50aXR5J1xuICAgICAgICB9LFxuICAgICAgICBvYmplY3RfZGltZW5zaW9uOiB7XG4gICAgICAgICAgbmFtZTogJ29iamVjdF9kaW1lbnNpb24nLFxuICAgICAgICAgIHR5cGU6ICdJbmZEaW1lbnNpb24nLFxuICAgICAgICAgIG1vZGVsOiAnSW5mRGltZW5zaW9uJyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdiZWxvbmdzVG8nLFxuICAgICAgICAgIGtleUZyb206ICdma19vYmplY3RfaW5mbycsXG4gICAgICAgICAga2V5VG86ICdwa19lbnRpdHknXG4gICAgICAgIH0sXG4gICAgICAgIG9iamVjdF9sYW5ndWFnZToge1xuICAgICAgICAgIG5hbWU6ICdvYmplY3RfbGFuZ3VhZ2UnLFxuICAgICAgICAgIHR5cGU6ICdJbmZMYW5ndWFnZScsXG4gICAgICAgICAgbW9kZWw6ICdJbmZMYW5ndWFnZScsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnYmVsb25nc1RvJyxcbiAgICAgICAgICBrZXlGcm9tOiAnZmtfb2JqZWN0X2luZm8nLFxuICAgICAgICAgIGtleVRvOiAncGtfZW50aXR5J1xuICAgICAgICB9LFxuICAgICAgICBzdWJqZWN0X3BlcnNpc3RlbnRfaXRlbToge1xuICAgICAgICAgIG5hbWU6ICdzdWJqZWN0X3BlcnNpc3RlbnRfaXRlbScsXG4gICAgICAgICAgdHlwZTogJ0luZlBlcnNpc3RlbnRJdGVtJyxcbiAgICAgICAgICBtb2RlbDogJ0luZlBlcnNpc3RlbnRJdGVtJyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdiZWxvbmdzVG8nLFxuICAgICAgICAgIGtleUZyb206ICdma19zdWJqZWN0X2luZm8nLFxuICAgICAgICAgIGtleVRvOiAncGtfZW50aXR5J1xuICAgICAgICB9LFxuICAgICAgICBvYmplY3RfcGVyc2lzdGVudF9pdGVtOiB7XG4gICAgICAgICAgbmFtZTogJ29iamVjdF9wZXJzaXN0ZW50X2l0ZW0nLFxuICAgICAgICAgIHR5cGU6ICdJbmZQZXJzaXN0ZW50SXRlbScsXG4gICAgICAgICAgbW9kZWw6ICdJbmZQZXJzaXN0ZW50SXRlbScsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnYmVsb25nc1RvJyxcbiAgICAgICAgICBrZXlGcm9tOiAnZmtfb2JqZWN0X2luZm8nLFxuICAgICAgICAgIGtleVRvOiAncGtfZW50aXR5J1xuICAgICAgICB9LFxuICAgICAgICBvYmplY3RfdGltZV9wcmltaXRpdmU6IHtcbiAgICAgICAgICBuYW1lOiAnb2JqZWN0X3RpbWVfcHJpbWl0aXZlJyxcbiAgICAgICAgICB0eXBlOiAnSW5mVGltZVByaW1pdGl2ZScsXG4gICAgICAgICAgbW9kZWw6ICdJbmZUaW1lUHJpbWl0aXZlJyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdiZWxvbmdzVG8nLFxuICAgICAgICAgIGtleUZyb206ICdma19vYmplY3RfaW5mbycsXG4gICAgICAgICAga2V5VG86ICdwa19lbnRpdHknXG4gICAgICAgIH0sXG4gICAgICAgIG9iamVjdF9wbGFjZToge1xuICAgICAgICAgIG5hbWU6ICdvYmplY3RfcGxhY2UnLFxuICAgICAgICAgIHR5cGU6ICdJbmZQbGFjZScsXG4gICAgICAgICAgbW9kZWw6ICdJbmZQbGFjZScsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnYmVsb25nc1RvJyxcbiAgICAgICAgICBrZXlGcm9tOiAnZmtfb2JqZWN0X2luZm8nLFxuICAgICAgICAgIGtleVRvOiAncGtfZW50aXR5J1xuICAgICAgICB9LFxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19