var SysClassField = /** @class */ (function () {
    function SysClassField(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `SysClassField`.
     */
    SysClassField.getModelName = function () {
        return "SysClassField";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of SysClassField for dynamic purposes.
    **/
    SysClassField.factory = function (data) {
        return new SysClassField(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    SysClassField.getModelDefinition = function () {
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
    };
    return SysClassField;
}());
export { SysClassField };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3lzQ2xhc3NGaWVsZC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc2RrLWxiMy8iLCJzb3VyY2VzIjpbImxpYi9zZGsvbW9kZWxzL1N5c0NsYXNzRmllbGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBaUJBO0lBUUUsdUJBQVksSUFBNkI7UUFDdkMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNEOzs7T0FHRztJQUNXLDBCQUFZLEdBQTFCO1FBQ0UsT0FBTyxlQUFlLENBQUM7SUFDekIsQ0FBQztJQUNEOzs7OztPQUtHO0lBQ1cscUJBQU8sR0FBckIsVUFBc0IsSUFBNEI7UUFDaEQsT0FBTyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ1csZ0NBQWtCLEdBQWhDO1FBQ0UsT0FBTztZQUNMLElBQUksRUFBRSxlQUFlO1lBQ3JCLE1BQU0sRUFBRSxnQkFBZ0I7WUFDeEIsSUFBSSxFQUFFLGdCQUFnQjtZQUN0QixNQUFNLEVBQUUsV0FBVztZQUNuQixVQUFVLEVBQUU7Z0JBQ1YsV0FBVyxFQUFFO29CQUNYLElBQUksRUFBRSxXQUFXO29CQUNqQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxhQUFhLEVBQUU7b0JBQ2IsSUFBSSxFQUFFLGFBQWE7b0JBQ25CLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxJQUFJLEVBQUUsT0FBTztvQkFDYixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCw2QkFBNkIsRUFBRTtvQkFDN0IsSUFBSSxFQUFFLDZCQUE2QjtvQkFDbkMsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLElBQUksRUFBRSxZQUFZO29CQUNsQixJQUFJLEVBQUUsUUFBUTtpQkFDZjthQUNGO1lBQ0QsU0FBUyxFQUFFO2dCQUNULHdCQUF3QixFQUFFO29CQUN4QixJQUFJLEVBQUUsMEJBQTBCO29CQUNoQyxJQUFJLEVBQUUsNEJBQTRCO29CQUNsQyxLQUFLLEVBQUUsMEJBQTBCO29CQUNqQyxZQUFZLEVBQUUsU0FBUztvQkFDdkIsT0FBTyxFQUFFLFdBQVc7b0JBQ3BCLEtBQUssRUFBRSxnQkFBZ0I7aUJBQ3hCO2dCQUNELG1CQUFtQixFQUFFO29CQUNuQixJQUFJLEVBQUUscUJBQXFCO29CQUMzQixJQUFJLEVBQUUsdUJBQXVCO29CQUM3QixLQUFLLEVBQUUscUJBQXFCO29CQUM1QixZQUFZLEVBQUUsU0FBUztvQkFDdkIsT0FBTyxFQUFFLFdBQVc7b0JBQ3BCLEtBQUssRUFBRSxnQkFBZ0I7aUJBQ3hCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxJQUFJLEVBQUUsU0FBUztvQkFDZixJQUFJLEVBQUUsWUFBWTtvQkFDbEIsS0FBSyxFQUFFLFVBQVU7b0JBQ2pCLFlBQVksRUFBRSxTQUFTO29CQUN2QixZQUFZLEVBQUUscUJBQXFCO29CQUNuQyxVQUFVLEVBQUUsMEJBQTBCO29CQUN0QyxPQUFPLEVBQUUsV0FBVztvQkFDcEIsS0FBSyxFQUFFLGdCQUFnQjtpQkFDeEI7YUFDRjtTQUNGLENBQUE7SUFDSCxDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLEFBNUZELElBNEZDIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cbmltcG9ydCB7XG4gIFN5c0NsYXNzRmllbGRQcm9wZXJ0eVJlbCxcbiAgUHJvQ2xhc3NGaWVsZENvbmZpZyxcbn0gZnJvbSAnLi4vaW5kZXgnO1xuXG5kZWNsYXJlIHZhciBPYmplY3Q6IGFueTtcbmV4cG9ydCBpbnRlcmZhY2UgU3lzQ2xhc3NGaWVsZEludGVyZmFjZSB7XG4gIFwicGtfZW50aXR5XCI/OiBudW1iZXI7XG4gIFwiZGVzY3JpcHRpb25cIj86IHN0cmluZztcbiAgXCJsYWJlbFwiPzogc3RyaW5nO1xuICBcImZrX3N5c3RlbV90eXBlX25nX2NvbXBvbmVudFwiPzogbnVtYmVyO1xuICBcInVzZWRfdGFibGVcIj86IHN0cmluZztcbiAgY2xhc3NfZmllbGRfcHJvcGVydHlfcmVsPzogU3lzQ2xhc3NGaWVsZFByb3BlcnR5UmVsW107XG4gIGNsYXNzX2ZpZWxkX2NvbmZpZ3M/OiBQcm9DbGFzc0ZpZWxkQ29uZmlnW107XG59XG5cbmV4cG9ydCBjbGFzcyBTeXNDbGFzc0ZpZWxkIGltcGxlbWVudHMgU3lzQ2xhc3NGaWVsZEludGVyZmFjZSB7XG4gIFwicGtfZW50aXR5XCI6IG51bWJlcjtcbiAgXCJkZXNjcmlwdGlvblwiOiBzdHJpbmc7XG4gIFwibGFiZWxcIjogc3RyaW5nO1xuICBcImZrX3N5c3RlbV90eXBlX25nX2NvbXBvbmVudFwiOiBudW1iZXI7XG4gIFwidXNlZF90YWJsZVwiOiBzdHJpbmc7XG4gIGNsYXNzX2ZpZWxkX3Byb3BlcnR5X3JlbD86IFN5c0NsYXNzRmllbGRQcm9wZXJ0eVJlbFtdO1xuICBjbGFzc19maWVsZF9jb25maWdzPzogUHJvQ2xhc3NGaWVsZENvbmZpZ1tdO1xuICBjb25zdHJ1Y3RvcihkYXRhPzogU3lzQ2xhc3NGaWVsZEludGVyZmFjZSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG4gIH1cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBtb2RlbCByZXByZXNlbnRlZCBieSB0aGlzICRyZXNvdXJjZSxcbiAgICogaS5lLiBgU3lzQ2xhc3NGaWVsZGAuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsTmFtZSgpIHtcbiAgICByZXR1cm4gXCJTeXNDbGFzc0ZpZWxkXCI7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBmYWN0b3J5XG4gICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1Ymlhc1xuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIGNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgU3lzQ2xhc3NGaWVsZCBmb3IgZHluYW1pYyBwdXJwb3Nlcy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0aWMgZmFjdG9yeShkYXRhOiBTeXNDbGFzc0ZpZWxkSW50ZXJmYWNlKTogU3lzQ2xhc3NGaWVsZCB7XG4gICAgcmV0dXJuIG5ldyBTeXNDbGFzc0ZpZWxkKGRhdGEpO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgZ2V0TW9kZWxEZWZpbml0aW9uXG4gICogQGF1dGhvciBKdWxpZW4gTGVkdW5cbiAgKiBAbGljZW5zZSBNSVRcbiAgKiBUaGlzIG1ldGhvZCByZXR1cm5zIGFuIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgc29tZSBvZiB0aGUgbW9kZWxcbiAgKiBkZWZpbml0aW9ucy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxEZWZpbml0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiAnU3lzQ2xhc3NGaWVsZCcsXG4gICAgICBwbHVyYWw6ICdTeXNDbGFzc0ZpZWxkcycsXG4gICAgICBwYXRoOiAnU3lzQ2xhc3NGaWVsZHMnLFxuICAgICAgaWROYW1lOiAncGtfZW50aXR5JyxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgXCJwa19lbnRpdHlcIjoge1xuICAgICAgICAgIG5hbWU6ICdwa19lbnRpdHknLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwiZGVzY3JpcHRpb25cIjoge1xuICAgICAgICAgIG5hbWU6ICdkZXNjcmlwdGlvbicsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgXCJsYWJlbFwiOiB7XG4gICAgICAgICAgbmFtZTogJ2xhYmVsJyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBcImZrX3N5c3RlbV90eXBlX25nX2NvbXBvbmVudFwiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX3N5c3RlbV90eXBlX25nX2NvbXBvbmVudCcsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJ1c2VkX3RhYmxlXCI6IHtcbiAgICAgICAgICBuYW1lOiAndXNlZF90YWJsZScsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZWxhdGlvbnM6IHtcbiAgICAgICAgY2xhc3NfZmllbGRfcHJvcGVydHlfcmVsOiB7XG4gICAgICAgICAgbmFtZTogJ2NsYXNzX2ZpZWxkX3Byb3BlcnR5X3JlbCcsXG4gICAgICAgICAgdHlwZTogJ1N5c0NsYXNzRmllbGRQcm9wZXJ0eVJlbFtdJyxcbiAgICAgICAgICBtb2RlbDogJ1N5c0NsYXNzRmllbGRQcm9wZXJ0eVJlbCcsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnaGFzTWFueScsXG4gICAgICAgICAga2V5RnJvbTogJ3BrX2VudGl0eScsXG4gICAgICAgICAga2V5VG86ICdma19jbGFzc19maWVsZCdcbiAgICAgICAgfSxcbiAgICAgICAgY2xhc3NfZmllbGRfY29uZmlnczoge1xuICAgICAgICAgIG5hbWU6ICdjbGFzc19maWVsZF9jb25maWdzJyxcbiAgICAgICAgICB0eXBlOiAnUHJvQ2xhc3NGaWVsZENvbmZpZ1tdJyxcbiAgICAgICAgICBtb2RlbDogJ1Byb0NsYXNzRmllbGRDb25maWcnLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2hhc01hbnknLFxuICAgICAgICAgIGtleUZyb206ICdwa19lbnRpdHknLFxuICAgICAgICAgIGtleVRvOiAnZmtfY2xhc3NfZmllbGQnXG4gICAgICAgIH0sXG4gICAgICAgIGNsYXNzZXM6IHtcbiAgICAgICAgICBuYW1lOiAnY2xhc3NlcycsXG4gICAgICAgICAgdHlwZTogJ0RmaENsYXNzW10nLFxuICAgICAgICAgIG1vZGVsOiAnRGZoQ2xhc3MnLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2hhc01hbnknLFxuICAgICAgICAgIG1vZGVsVGhyb3VnaDogJ1Byb0NsYXNzRmllbGRDb25maWcnLFxuICAgICAgICAgIGtleVRocm91Z2g6ICdma19jbGFzc19mb3JfY2xhc3NfZmllbGQnLFxuICAgICAgICAgIGtleUZyb206ICdwa19lbnRpdHknLFxuICAgICAgICAgIGtleVRvOiAnZmtfY2xhc3NfZmllbGQnXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=