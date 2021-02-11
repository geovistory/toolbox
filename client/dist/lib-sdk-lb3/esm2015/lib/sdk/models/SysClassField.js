export class SysClassField {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `SysClassField`.
     */
    static getModelName() {
        return "SysClassField";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of SysClassField for dynamic purposes.
    **/
    static factory(data) {
        return new SysClassField(data);
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
            name: 'SysClassField',
            plural: 'SysClassFields',
            path: 'SysClassFields',
            idName: 'pk_entity',
            properties: {
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
                "description": {
                    name: 'description',
                    type: 'string'
                },
                "label": {
                    name: 'label',
                    type: 'string'
                },
                "fk_system_type_ng_component": {
                    name: 'fk_system_type_ng_component',
                    type: 'number'
                },
                "used_table": {
                    name: 'used_table',
                    type: 'string'
                },
            },
            relations: {
                class_field_property_rel: {
                    name: 'class_field_property_rel',
                    type: 'SysClassFieldPropertyRel[]',
                    model: 'SysClassFieldPropertyRel',
                    relationType: 'hasMany',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_class_field'
                },
                class_field_configs: {
                    name: 'class_field_configs',
                    type: 'ProClassFieldConfig[]',
                    model: 'ProClassFieldConfig',
                    relationType: 'hasMany',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_class_field'
                },
                classes: {
                    name: 'classes',
                    type: 'DfhClass[]',
                    model: 'DfhClass',
                    relationType: 'hasMany',
                    modelThrough: 'ProClassFieldConfig',
                    keyThrough: 'fk_class_for_class_field',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_class_field'
                },
            }
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3lzQ2xhc3NGaWVsZC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc2RrLWxiMy8iLCJzb3VyY2VzIjpbImxpYi9zZGsvbW9kZWxzL1N5c0NsYXNzRmllbGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBaUJBLE1BQU0sT0FBTyxhQUFhO0lBUXhCLFlBQVksSUFBNkI7UUFDdkMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxZQUFZO1FBQ3hCLE9BQU8sZUFBZSxDQUFDO0lBQ3pCLENBQUM7SUFDRDs7Ozs7T0FLRztJQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBNEI7UUFDaEQsT0FBTyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ0ksTUFBTSxDQUFDLGtCQUFrQjtRQUM5QixPQUFPO1lBQ0wsSUFBSSxFQUFFLGVBQWU7WUFDckIsTUFBTSxFQUFFLGdCQUFnQjtZQUN4QixJQUFJLEVBQUUsZ0JBQWdCO1lBQ3RCLE1BQU0sRUFBRSxXQUFXO1lBQ25CLFVBQVUsRUFBRTtnQkFDVixXQUFXLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELGFBQWEsRUFBRTtvQkFDYixJQUFJLEVBQUUsYUFBYTtvQkFDbkIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLElBQUksRUFBRSxPQUFPO29CQUNiLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELDZCQUE2QixFQUFFO29CQUM3QixJQUFJLEVBQUUsNkJBQTZCO29CQUNuQyxJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osSUFBSSxFQUFFLFlBQVk7b0JBQ2xCLElBQUksRUFBRSxRQUFRO2lCQUNmO2FBQ0Y7WUFDRCxTQUFTLEVBQUU7Z0JBQ1Qsd0JBQXdCLEVBQUU7b0JBQ3hCLElBQUksRUFBRSwwQkFBMEI7b0JBQ2hDLElBQUksRUFBRSw0QkFBNEI7b0JBQ2xDLEtBQUssRUFBRSwwQkFBMEI7b0JBQ2pDLFlBQVksRUFBRSxTQUFTO29CQUN2QixPQUFPLEVBQUUsV0FBVztvQkFDcEIsS0FBSyxFQUFFLGdCQUFnQjtpQkFDeEI7Z0JBQ0QsbUJBQW1CLEVBQUU7b0JBQ25CLElBQUksRUFBRSxxQkFBcUI7b0JBQzNCLElBQUksRUFBRSx1QkFBdUI7b0JBQzdCLEtBQUssRUFBRSxxQkFBcUI7b0JBQzVCLFlBQVksRUFBRSxTQUFTO29CQUN2QixPQUFPLEVBQUUsV0FBVztvQkFDcEIsS0FBSyxFQUFFLGdCQUFnQjtpQkFDeEI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLElBQUksRUFBRSxTQUFTO29CQUNmLElBQUksRUFBRSxZQUFZO29CQUNsQixLQUFLLEVBQUUsVUFBVTtvQkFDakIsWUFBWSxFQUFFLFNBQVM7b0JBQ3ZCLFlBQVksRUFBRSxxQkFBcUI7b0JBQ25DLFVBQVUsRUFBRSwwQkFBMEI7b0JBQ3RDLE9BQU8sRUFBRSxXQUFXO29CQUNwQixLQUFLLEVBQUUsZ0JBQWdCO2lCQUN4QjthQUNGO1NBQ0YsQ0FBQTtJQUNILENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5pbXBvcnQge1xuICBTeXNDbGFzc0ZpZWxkUHJvcGVydHlSZWwsXG4gIFByb0NsYXNzRmllbGRDb25maWcsXG59IGZyb20gJy4uL2luZGV4JztcblxuZGVjbGFyZSB2YXIgT2JqZWN0OiBhbnk7XG5leHBvcnQgaW50ZXJmYWNlIFN5c0NsYXNzRmllbGRJbnRlcmZhY2Uge1xuICBcInBrX2VudGl0eVwiPzogbnVtYmVyO1xuICBcImRlc2NyaXB0aW9uXCI/OiBzdHJpbmc7XG4gIFwibGFiZWxcIj86IHN0cmluZztcbiAgXCJma19zeXN0ZW1fdHlwZV9uZ19jb21wb25lbnRcIj86IG51bWJlcjtcbiAgXCJ1c2VkX3RhYmxlXCI/OiBzdHJpbmc7XG4gIGNsYXNzX2ZpZWxkX3Byb3BlcnR5X3JlbD86IFN5c0NsYXNzRmllbGRQcm9wZXJ0eVJlbFtdO1xuICBjbGFzc19maWVsZF9jb25maWdzPzogUHJvQ2xhc3NGaWVsZENvbmZpZ1tdO1xufVxuXG5leHBvcnQgY2xhc3MgU3lzQ2xhc3NGaWVsZCBpbXBsZW1lbnRzIFN5c0NsYXNzRmllbGRJbnRlcmZhY2Uge1xuICBcInBrX2VudGl0eVwiOiBudW1iZXI7XG4gIFwiZGVzY3JpcHRpb25cIjogc3RyaW5nO1xuICBcImxhYmVsXCI6IHN0cmluZztcbiAgXCJma19zeXN0ZW1fdHlwZV9uZ19jb21wb25lbnRcIjogbnVtYmVyO1xuICBcInVzZWRfdGFibGVcIjogc3RyaW5nO1xuICBjbGFzc19maWVsZF9wcm9wZXJ0eV9yZWw/OiBTeXNDbGFzc0ZpZWxkUHJvcGVydHlSZWxbXTtcbiAgY2xhc3NfZmllbGRfY29uZmlncz86IFByb0NsYXNzRmllbGRDb25maWdbXTtcbiAgY29uc3RydWN0b3IoZGF0YT86IFN5c0NsYXNzRmllbGRJbnRlcmZhY2UpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xuICB9XG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyAkcmVzb3VyY2UsXG4gICAqIGkuZS4gYFN5c0NsYXNzRmllbGRgLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbE5hbWUoKSB7XG4gICAgcmV0dXJuIFwiU3lzQ2xhc3NGaWVsZFwiO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgZmFjdG9yeVxuICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXNcbiAgKiBAbGljZW5zZSBNSVRcbiAgKiBUaGlzIG1ldGhvZCBjcmVhdGVzIGFuIGluc3RhbmNlIG9mIFN5c0NsYXNzRmllbGQgZm9yIGR5bmFtaWMgcHVycG9zZXMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGZhY3RvcnkoZGF0YTogU3lzQ2xhc3NGaWVsZEludGVyZmFjZSk6IFN5c0NsYXNzRmllbGQge1xuICAgIHJldHVybiBuZXcgU3lzQ2xhc3NGaWVsZChkYXRhKTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGdldE1vZGVsRGVmaW5pdGlvblxuICAqIEBhdXRob3IgSnVsaWVuIExlZHVuXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgcmV0dXJucyBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIHNvbWUgb2YgdGhlIG1vZGVsXG4gICogZGVmaW5pdGlvbnMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsRGVmaW5pdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJ1N5c0NsYXNzRmllbGQnLFxuICAgICAgcGx1cmFsOiAnU3lzQ2xhc3NGaWVsZHMnLFxuICAgICAgcGF0aDogJ1N5c0NsYXNzRmllbGRzJyxcbiAgICAgIGlkTmFtZTogJ3BrX2VudGl0eScsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIFwicGtfZW50aXR5XCI6IHtcbiAgICAgICAgICBuYW1lOiAncGtfZW50aXR5JyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcImRlc2NyaXB0aW9uXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZGVzY3JpcHRpb24nLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwibGFiZWxcIjoge1xuICAgICAgICAgIG5hbWU6ICdsYWJlbCcsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgXCJma19zeXN0ZW1fdHlwZV9uZ19jb21wb25lbnRcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19zeXN0ZW1fdHlwZV9uZ19jb21wb25lbnQnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwidXNlZF90YWJsZVwiOiB7XG4gICAgICAgICAgbmFtZTogJ3VzZWRfdGFibGUnLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVsYXRpb25zOiB7XG4gICAgICAgIGNsYXNzX2ZpZWxkX3Byb3BlcnR5X3JlbDoge1xuICAgICAgICAgIG5hbWU6ICdjbGFzc19maWVsZF9wcm9wZXJ0eV9yZWwnLFxuICAgICAgICAgIHR5cGU6ICdTeXNDbGFzc0ZpZWxkUHJvcGVydHlSZWxbXScsXG4gICAgICAgICAgbW9kZWw6ICdTeXNDbGFzc0ZpZWxkUHJvcGVydHlSZWwnLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2hhc01hbnknLFxuICAgICAgICAgIGtleUZyb206ICdwa19lbnRpdHknLFxuICAgICAgICAgIGtleVRvOiAnZmtfY2xhc3NfZmllbGQnXG4gICAgICAgIH0sXG4gICAgICAgIGNsYXNzX2ZpZWxkX2NvbmZpZ3M6IHtcbiAgICAgICAgICBuYW1lOiAnY2xhc3NfZmllbGRfY29uZmlncycsXG4gICAgICAgICAgdHlwZTogJ1Byb0NsYXNzRmllbGRDb25maWdbXScsXG4gICAgICAgICAgbW9kZWw6ICdQcm9DbGFzc0ZpZWxkQ29uZmlnJyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdoYXNNYW55JyxcbiAgICAgICAgICBrZXlGcm9tOiAncGtfZW50aXR5JyxcbiAgICAgICAgICBrZXlUbzogJ2ZrX2NsYXNzX2ZpZWxkJ1xuICAgICAgICB9LFxuICAgICAgICBjbGFzc2VzOiB7XG4gICAgICAgICAgbmFtZTogJ2NsYXNzZXMnLFxuICAgICAgICAgIHR5cGU6ICdEZmhDbGFzc1tdJyxcbiAgICAgICAgICBtb2RlbDogJ0RmaENsYXNzJyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdoYXNNYW55JyxcbiAgICAgICAgICBtb2RlbFRocm91Z2g6ICdQcm9DbGFzc0ZpZWxkQ29uZmlnJyxcbiAgICAgICAgICBrZXlUaHJvdWdoOiAnZmtfY2xhc3NfZm9yX2NsYXNzX2ZpZWxkJyxcbiAgICAgICAgICBrZXlGcm9tOiAncGtfZW50aXR5JyxcbiAgICAgICAgICBrZXlUbzogJ2ZrX2NsYXNzX2ZpZWxkJ1xuICAgICAgICB9LFxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19