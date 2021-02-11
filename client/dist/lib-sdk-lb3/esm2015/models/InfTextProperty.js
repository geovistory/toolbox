export class InfTextProperty {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfTextProperty`.
     */
    static getModelName() {
        return "InfTextProperty";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of InfTextProperty for dynamic purposes.
    **/
    static factory(data) {
        return new InfTextProperty(data);
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
            name: 'InfTextProperty',
            plural: 'InfTextProperties',
            path: 'InfTextProperties',
            idName: 'pk_entity',
            properties: {
                "fk_class_field": {
                    name: 'fk_class_field',
                    type: 'number'
                },
                "fk_concerned_entity": {
                    name: 'fk_concerned_entity',
                    type: 'number'
                },
                "fk_language": {
                    name: 'fk_language',
                    type: 'number'
                },
                "quill_doc": {
                    name: 'quill_doc',
                    type: 'any'
                },
                "string": {
                    name: 'string',
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
                persistent_item: {
                    name: 'persistent_item',
                    type: 'InfPersistentItem',
                    model: 'InfPersistentItem',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_concerned_entity',
                    keyTo: 'pk_entity'
                },
                temporal_entity: {
                    name: 'temporal_entity',
                    type: 'InfTemporalEntity',
                    model: 'InfTemporalEntity',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_concerned_entity',
                    keyTo: 'pk_entity'
                },
                language: {
                    name: 'language',
                    type: 'InfLanguage',
                    model: 'InfLanguage',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_language',
                    keyTo: 'pk_entity'
                },
                class_field: {
                    name: 'class_field',
                    type: 'SysClassField',
                    model: 'SysClassField',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_class_field',
                    keyTo: 'pk_entity'
                },
            }
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5mVGV4dFByb3BlcnR5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1zZGstbGIzLyIsInNvdXJjZXMiOlsibW9kZWxzL0luZlRleHRQcm9wZXJ0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF3QkEsTUFBTSxPQUFPLGVBQWU7SUFZMUIsWUFBWSxJQUErQjtRQUN6QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0Q7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLFlBQVk7UUFDeEIsT0FBTyxpQkFBaUIsQ0FBQztJQUMzQixDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQThCO1FBQ2xELE9BQU8sSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUNEOzs7Ozs7T0FNRztJQUNJLE1BQU0sQ0FBQyxrQkFBa0I7UUFDOUIsT0FBTztZQUNMLElBQUksRUFBRSxpQkFBaUI7WUFDdkIsTUFBTSxFQUFFLG1CQUFtQjtZQUMzQixJQUFJLEVBQUUsbUJBQW1CO1lBQ3pCLE1BQU0sRUFBRSxXQUFXO1lBQ25CLFVBQVUsRUFBRTtnQkFDVixnQkFBZ0IsRUFBRTtvQkFDaEIsSUFBSSxFQUFFLGdCQUFnQjtvQkFDdEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QscUJBQXFCLEVBQUU7b0JBQ3JCLElBQUksRUFBRSxxQkFBcUI7b0JBQzNCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELGFBQWEsRUFBRTtvQkFDYixJQUFJLEVBQUUsYUFBYTtvQkFDbkIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsV0FBVyxFQUFFO29CQUNYLElBQUksRUFBRSxXQUFXO29CQUNqQixJQUFJLEVBQUUsS0FBSztpQkFDWjtnQkFDRCxRQUFRLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsV0FBVyxFQUFFO29CQUNYLElBQUksRUFBRSxXQUFXO29CQUNqQixJQUFJLEVBQUUsUUFBUTtpQkFDZjthQUNGO1lBQ0QsU0FBUyxFQUFFO2dCQUNULDJCQUEyQixFQUFFO29CQUMzQixJQUFJLEVBQUUsNkJBQTZCO29CQUNuQyxJQUFJLEVBQUUsa0JBQWtCO29CQUN4QixLQUFLLEVBQUUsZ0JBQWdCO29CQUN2QixZQUFZLEVBQUUsU0FBUztvQkFDZixPQUFPLEVBQUUsV0FBVztvQkFDNUIsS0FBSyxFQUFFLFdBQVc7aUJBQ25CO2dCQUNELGVBQWUsRUFBRTtvQkFDZixJQUFJLEVBQUUsaUJBQWlCO29CQUN2QixJQUFJLEVBQUUsbUJBQW1CO29CQUN6QixLQUFLLEVBQUUsbUJBQW1CO29CQUMxQixZQUFZLEVBQUUsV0FBVztvQkFDakIsT0FBTyxFQUFFLHFCQUFxQjtvQkFDdEMsS0FBSyxFQUFFLFdBQVc7aUJBQ25CO2dCQUNELGVBQWUsRUFBRTtvQkFDZixJQUFJLEVBQUUsaUJBQWlCO29CQUN2QixJQUFJLEVBQUUsbUJBQW1CO29CQUN6QixLQUFLLEVBQUUsbUJBQW1CO29CQUMxQixZQUFZLEVBQUUsV0FBVztvQkFDakIsT0FBTyxFQUFFLHFCQUFxQjtvQkFDdEMsS0FBSyxFQUFFLFdBQVc7aUJBQ25CO2dCQUNELFFBQVEsRUFBRTtvQkFDUixJQUFJLEVBQUUsVUFBVTtvQkFDaEIsSUFBSSxFQUFFLGFBQWE7b0JBQ25CLEtBQUssRUFBRSxhQUFhO29CQUNwQixZQUFZLEVBQUUsV0FBVztvQkFDakIsT0FBTyxFQUFFLGFBQWE7b0JBQzlCLEtBQUssRUFBRSxXQUFXO2lCQUNuQjtnQkFDRCxXQUFXLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLGFBQWE7b0JBQ25CLElBQUksRUFBRSxlQUFlO29CQUNyQixLQUFLLEVBQUUsZUFBZTtvQkFDdEIsWUFBWSxFQUFFLFdBQVc7b0JBQ2pCLE9BQU8sRUFBRSxnQkFBZ0I7b0JBQ2pDLEtBQUssRUFBRSxXQUFXO2lCQUNuQjthQUNGO1NBQ0YsQ0FBQTtJQUNILENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5pbXBvcnQge1xuICBQcm9JbmZvUHJvalJlbCxcbiAgSW5mUGVyc2lzdGVudEl0ZW0sXG4gIEluZlRlbXBvcmFsRW50aXR5LFxuICBJbmZMYW5ndWFnZSxcbiAgU3lzQ2xhc3NGaWVsZFxufSBmcm9tICcuLi9pbmRleCc7XG5cbmRlY2xhcmUgdmFyIE9iamVjdDogYW55O1xuZXhwb3J0IGludGVyZmFjZSBJbmZUZXh0UHJvcGVydHlJbnRlcmZhY2Uge1xuICBcImZrX2NsYXNzX2ZpZWxkXCI6IG51bWJlcjtcbiAgXCJma19jb25jZXJuZWRfZW50aXR5XCI6IG51bWJlcjtcbiAgXCJma19sYW5ndWFnZVwiOiBudW1iZXI7XG4gIFwicXVpbGxfZG9jXCI6IGFueTtcbiAgXCJzdHJpbmdcIj86IHN0cmluZztcbiAgXCJwa19lbnRpdHlcIj86IG51bWJlcjtcbiAgZW50aXR5X3ZlcnNpb25fcHJvamVjdF9yZWxzPzogUHJvSW5mb1Byb2pSZWxbXTtcbiAgcGVyc2lzdGVudF9pdGVtPzogSW5mUGVyc2lzdGVudEl0ZW07XG4gIHRlbXBvcmFsX2VudGl0eT86IEluZlRlbXBvcmFsRW50aXR5O1xuICBsYW5ndWFnZT86IEluZkxhbmd1YWdlO1xuICBjbGFzc19maWVsZD86IFN5c0NsYXNzRmllbGQ7XG59XG5cbmV4cG9ydCBjbGFzcyBJbmZUZXh0UHJvcGVydHkgaW1wbGVtZW50cyBJbmZUZXh0UHJvcGVydHlJbnRlcmZhY2Uge1xuICBcImZrX2NsYXNzX2ZpZWxkXCI6IG51bWJlcjtcbiAgXCJma19jb25jZXJuZWRfZW50aXR5XCI6IG51bWJlcjtcbiAgXCJma19sYW5ndWFnZVwiOiBudW1iZXI7XG4gIFwicXVpbGxfZG9jXCI6IGFueTtcbiAgXCJzdHJpbmdcIjogc3RyaW5nO1xuICBcInBrX2VudGl0eVwiOiBudW1iZXI7XG4gIGVudGl0eV92ZXJzaW9uX3Byb2plY3RfcmVscz86IFByb0luZm9Qcm9qUmVsW107XG4gIHBlcnNpc3RlbnRfaXRlbT86IEluZlBlcnNpc3RlbnRJdGVtO1xuICB0ZW1wb3JhbF9lbnRpdHk/OiBJbmZUZW1wb3JhbEVudGl0eTtcbiAgbGFuZ3VhZ2U/OiBJbmZMYW5ndWFnZTtcbiAgY2xhc3NfZmllbGQ/OiBTeXNDbGFzc0ZpZWxkO1xuICBjb25zdHJ1Y3RvcihkYXRhPzogSW5mVGV4dFByb3BlcnR5SW50ZXJmYWNlKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgfVxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxuICAgKiBpLmUuIGBJbmZUZXh0UHJvcGVydHlgLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbE5hbWUoKSB7XG4gICAgcmV0dXJuIFwiSW5mVGV4dFByb3BlcnR5XCI7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBmYWN0b3J5XG4gICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1Ymlhc1xuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIGNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgSW5mVGV4dFByb3BlcnR5IGZvciBkeW5hbWljIHB1cnBvc2VzLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBmYWN0b3J5KGRhdGE6IEluZlRleHRQcm9wZXJ0eUludGVyZmFjZSk6IEluZlRleHRQcm9wZXJ0eXtcbiAgICByZXR1cm4gbmV3IEluZlRleHRQcm9wZXJ0eShkYXRhKTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGdldE1vZGVsRGVmaW5pdGlvblxuICAqIEBhdXRob3IgSnVsaWVuIExlZHVuXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgcmV0dXJucyBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIHNvbWUgb2YgdGhlIG1vZGVsXG4gICogZGVmaW5pdGlvbnMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsRGVmaW5pdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJ0luZlRleHRQcm9wZXJ0eScsXG4gICAgICBwbHVyYWw6ICdJbmZUZXh0UHJvcGVydGllcycsXG4gICAgICBwYXRoOiAnSW5mVGV4dFByb3BlcnRpZXMnLFxuICAgICAgaWROYW1lOiAncGtfZW50aXR5JyxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgXCJma19jbGFzc19maWVsZFwiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX2NsYXNzX2ZpZWxkJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcImZrX2NvbmNlcm5lZF9lbnRpdHlcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19jb25jZXJuZWRfZW50aXR5JyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcImZrX2xhbmd1YWdlXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfbGFuZ3VhZ2UnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwicXVpbGxfZG9jXCI6IHtcbiAgICAgICAgICBuYW1lOiAncXVpbGxfZG9jJyxcbiAgICAgICAgICB0eXBlOiAnYW55J1xuICAgICAgICB9LFxuICAgICAgICBcInN0cmluZ1wiOiB7XG4gICAgICAgICAgbmFtZTogJ3N0cmluZycsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgXCJwa19lbnRpdHlcIjoge1xuICAgICAgICAgIG5hbWU6ICdwa19lbnRpdHknLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVsYXRpb25zOiB7XG4gICAgICAgIGVudGl0eV92ZXJzaW9uX3Byb2plY3RfcmVsczoge1xuICAgICAgICAgIG5hbWU6ICdlbnRpdHlfdmVyc2lvbl9wcm9qZWN0X3JlbHMnLFxuICAgICAgICAgIHR5cGU6ICdQcm9JbmZvUHJvalJlbFtdJyxcbiAgICAgICAgICBtb2RlbDogJ1Byb0luZm9Qcm9qUmVsJyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdoYXNNYW55JyxcbiAgICAgICAgICAgICAgICAgIGtleUZyb206ICdwa19lbnRpdHknLFxuICAgICAgICAgIGtleVRvOiAnZmtfZW50aXR5J1xuICAgICAgICB9LFxuICAgICAgICBwZXJzaXN0ZW50X2l0ZW06IHtcbiAgICAgICAgICBuYW1lOiAncGVyc2lzdGVudF9pdGVtJyxcbiAgICAgICAgICB0eXBlOiAnSW5mUGVyc2lzdGVudEl0ZW0nLFxuICAgICAgICAgIG1vZGVsOiAnSW5mUGVyc2lzdGVudEl0ZW0nLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2JlbG9uZ3NUbycsXG4gICAgICAgICAgICAgICAgICBrZXlGcm9tOiAnZmtfY29uY2VybmVkX2VudGl0eScsXG4gICAgICAgICAga2V5VG86ICdwa19lbnRpdHknXG4gICAgICAgIH0sXG4gICAgICAgIHRlbXBvcmFsX2VudGl0eToge1xuICAgICAgICAgIG5hbWU6ICd0ZW1wb3JhbF9lbnRpdHknLFxuICAgICAgICAgIHR5cGU6ICdJbmZUZW1wb3JhbEVudGl0eScsXG4gICAgICAgICAgbW9kZWw6ICdJbmZUZW1wb3JhbEVudGl0eScsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnYmVsb25nc1RvJyxcbiAgICAgICAgICAgICAgICAgIGtleUZyb206ICdma19jb25jZXJuZWRfZW50aXR5JyxcbiAgICAgICAgICBrZXlUbzogJ3BrX2VudGl0eSdcbiAgICAgICAgfSxcbiAgICAgICAgbGFuZ3VhZ2U6IHtcbiAgICAgICAgICBuYW1lOiAnbGFuZ3VhZ2UnLFxuICAgICAgICAgIHR5cGU6ICdJbmZMYW5ndWFnZScsXG4gICAgICAgICAgbW9kZWw6ICdJbmZMYW5ndWFnZScsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnYmVsb25nc1RvJyxcbiAgICAgICAgICAgICAgICAgIGtleUZyb206ICdma19sYW5ndWFnZScsXG4gICAgICAgICAga2V5VG86ICdwa19lbnRpdHknXG4gICAgICAgIH0sXG4gICAgICAgIGNsYXNzX2ZpZWxkOiB7XG4gICAgICAgICAgbmFtZTogJ2NsYXNzX2ZpZWxkJyxcbiAgICAgICAgICB0eXBlOiAnU3lzQ2xhc3NGaWVsZCcsXG4gICAgICAgICAgbW9kZWw6ICdTeXNDbGFzc0ZpZWxkJyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdiZWxvbmdzVG8nLFxuICAgICAgICAgICAgICAgICAga2V5RnJvbTogJ2ZrX2NsYXNzX2ZpZWxkJyxcbiAgICAgICAgICBrZXlUbzogJ3BrX2VudGl0eSdcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==