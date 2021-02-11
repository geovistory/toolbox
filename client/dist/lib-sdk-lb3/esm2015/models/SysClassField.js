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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3lzQ2xhc3NGaWVsZC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc2RrLWxiMy8iLCJzb3VyY2VzIjpbIm1vZGVscy9TeXNDbGFzc0ZpZWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWlCQSxNQUFNLE9BQU8sYUFBYTtJQVF4QixZQUFZLElBQTZCO1FBQ3ZDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsWUFBWTtRQUN4QixPQUFPLGVBQWUsQ0FBQztJQUN6QixDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQTRCO1FBQ2hELE9BQU8sSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUNEOzs7Ozs7T0FNRztJQUNJLE1BQU0sQ0FBQyxrQkFBa0I7UUFDOUIsT0FBTztZQUNMLElBQUksRUFBRSxlQUFlO1lBQ3JCLE1BQU0sRUFBRSxnQkFBZ0I7WUFDeEIsSUFBSSxFQUFFLGdCQUFnQjtZQUN0QixNQUFNLEVBQUUsV0FBVztZQUNuQixVQUFVLEVBQUU7Z0JBQ1YsV0FBVyxFQUFFO29CQUNYLElBQUksRUFBRSxXQUFXO29CQUNqQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxhQUFhLEVBQUU7b0JBQ2IsSUFBSSxFQUFFLGFBQWE7b0JBQ25CLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxJQUFJLEVBQUUsT0FBTztvQkFDYixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCw2QkFBNkIsRUFBRTtvQkFDN0IsSUFBSSxFQUFFLDZCQUE2QjtvQkFDbkMsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLElBQUksRUFBRSxZQUFZO29CQUNsQixJQUFJLEVBQUUsUUFBUTtpQkFDZjthQUNGO1lBQ0QsU0FBUyxFQUFFO2dCQUNULHdCQUF3QixFQUFFO29CQUN4QixJQUFJLEVBQUUsMEJBQTBCO29CQUNoQyxJQUFJLEVBQUUsNEJBQTRCO29CQUNsQyxLQUFLLEVBQUUsMEJBQTBCO29CQUNqQyxZQUFZLEVBQUUsU0FBUztvQkFDdkIsT0FBTyxFQUFFLFdBQVc7b0JBQ3BCLEtBQUssRUFBRSxnQkFBZ0I7aUJBQ3hCO2dCQUNELG1CQUFtQixFQUFFO29CQUNuQixJQUFJLEVBQUUscUJBQXFCO29CQUMzQixJQUFJLEVBQUUsdUJBQXVCO29CQUM3QixLQUFLLEVBQUUscUJBQXFCO29CQUM1QixZQUFZLEVBQUUsU0FBUztvQkFDdkIsT0FBTyxFQUFFLFdBQVc7b0JBQ3BCLEtBQUssRUFBRSxnQkFBZ0I7aUJBQ3hCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxJQUFJLEVBQUUsU0FBUztvQkFDZixJQUFJLEVBQUUsWUFBWTtvQkFDbEIsS0FBSyxFQUFFLFVBQVU7b0JBQ2pCLFlBQVksRUFBRSxTQUFTO29CQUN2QixZQUFZLEVBQUUscUJBQXFCO29CQUNuQyxVQUFVLEVBQUUsMEJBQTBCO29CQUN0QyxPQUFPLEVBQUUsV0FBVztvQkFDcEIsS0FBSyxFQUFFLGdCQUFnQjtpQkFDeEI7YUFDRjtTQUNGLENBQUE7SUFDSCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuaW1wb3J0IHtcbiAgU3lzQ2xhc3NGaWVsZFByb3BlcnR5UmVsLFxuICBQcm9DbGFzc0ZpZWxkQ29uZmlnLFxufSBmcm9tICcuLi9pbmRleCc7XG5cbmRlY2xhcmUgdmFyIE9iamVjdDogYW55O1xuZXhwb3J0IGludGVyZmFjZSBTeXNDbGFzc0ZpZWxkSW50ZXJmYWNlIHtcbiAgXCJwa19lbnRpdHlcIj86IG51bWJlcjtcbiAgXCJkZXNjcmlwdGlvblwiPzogc3RyaW5nO1xuICBcImxhYmVsXCI/OiBzdHJpbmc7XG4gIFwiZmtfc3lzdGVtX3R5cGVfbmdfY29tcG9uZW50XCI/OiBudW1iZXI7XG4gIFwidXNlZF90YWJsZVwiPzogc3RyaW5nO1xuICBjbGFzc19maWVsZF9wcm9wZXJ0eV9yZWw/OiBTeXNDbGFzc0ZpZWxkUHJvcGVydHlSZWxbXTtcbiAgY2xhc3NfZmllbGRfY29uZmlncz86IFByb0NsYXNzRmllbGRDb25maWdbXTtcbn1cblxuZXhwb3J0IGNsYXNzIFN5c0NsYXNzRmllbGQgaW1wbGVtZW50cyBTeXNDbGFzc0ZpZWxkSW50ZXJmYWNlIHtcbiAgXCJwa19lbnRpdHlcIjogbnVtYmVyO1xuICBcImRlc2NyaXB0aW9uXCI6IHN0cmluZztcbiAgXCJsYWJlbFwiOiBzdHJpbmc7XG4gIFwiZmtfc3lzdGVtX3R5cGVfbmdfY29tcG9uZW50XCI6IG51bWJlcjtcbiAgXCJ1c2VkX3RhYmxlXCI6IHN0cmluZztcbiAgY2xhc3NfZmllbGRfcHJvcGVydHlfcmVsPzogU3lzQ2xhc3NGaWVsZFByb3BlcnR5UmVsW107XG4gIGNsYXNzX2ZpZWxkX2NvbmZpZ3M/OiBQcm9DbGFzc0ZpZWxkQ29uZmlnW107XG4gIGNvbnN0cnVjdG9yKGRhdGE/OiBTeXNDbGFzc0ZpZWxkSW50ZXJmYWNlKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgfVxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxuICAgKiBpLmUuIGBTeXNDbGFzc0ZpZWxkYC5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxOYW1lKCkge1xuICAgIHJldHVybiBcIlN5c0NsYXNzRmllbGRcIjtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGZhY3RvcnlcbiAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgY3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBTeXNDbGFzc0ZpZWxkIGZvciBkeW5hbWljIHB1cnBvc2VzLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBmYWN0b3J5KGRhdGE6IFN5c0NsYXNzRmllbGRJbnRlcmZhY2UpOiBTeXNDbGFzc0ZpZWxkIHtcbiAgICByZXR1cm4gbmV3IFN5c0NsYXNzRmllbGQoZGF0YSk7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBnZXRNb2RlbERlZmluaXRpb25cbiAgKiBAYXV0aG9yIEp1bGllbiBMZWR1blxuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIHJldHVybnMgYW4gb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBzb21lIG9mIHRoZSBtb2RlbFxuICAqIGRlZmluaXRpb25zLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbERlZmluaXRpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6ICdTeXNDbGFzc0ZpZWxkJyxcbiAgICAgIHBsdXJhbDogJ1N5c0NsYXNzRmllbGRzJyxcbiAgICAgIHBhdGg6ICdTeXNDbGFzc0ZpZWxkcycsXG4gICAgICBpZE5hbWU6ICdwa19lbnRpdHknLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBcInBrX2VudGl0eVwiOiB7XG4gICAgICAgICAgbmFtZTogJ3BrX2VudGl0eScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJkZXNjcmlwdGlvblwiOiB7XG4gICAgICAgICAgbmFtZTogJ2Rlc2NyaXB0aW9uJyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBcImxhYmVsXCI6IHtcbiAgICAgICAgICBuYW1lOiAnbGFiZWwnLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfc3lzdGVtX3R5cGVfbmdfY29tcG9uZW50XCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfc3lzdGVtX3R5cGVfbmdfY29tcG9uZW50JyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcInVzZWRfdGFibGVcIjoge1xuICAgICAgICAgIG5hbWU6ICd1c2VkX3RhYmxlJyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlbGF0aW9uczoge1xuICAgICAgICBjbGFzc19maWVsZF9wcm9wZXJ0eV9yZWw6IHtcbiAgICAgICAgICBuYW1lOiAnY2xhc3NfZmllbGRfcHJvcGVydHlfcmVsJyxcbiAgICAgICAgICB0eXBlOiAnU3lzQ2xhc3NGaWVsZFByb3BlcnR5UmVsW10nLFxuICAgICAgICAgIG1vZGVsOiAnU3lzQ2xhc3NGaWVsZFByb3BlcnR5UmVsJyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdoYXNNYW55JyxcbiAgICAgICAgICBrZXlGcm9tOiAncGtfZW50aXR5JyxcbiAgICAgICAgICBrZXlUbzogJ2ZrX2NsYXNzX2ZpZWxkJ1xuICAgICAgICB9LFxuICAgICAgICBjbGFzc19maWVsZF9jb25maWdzOiB7XG4gICAgICAgICAgbmFtZTogJ2NsYXNzX2ZpZWxkX2NvbmZpZ3MnLFxuICAgICAgICAgIHR5cGU6ICdQcm9DbGFzc0ZpZWxkQ29uZmlnW10nLFxuICAgICAgICAgIG1vZGVsOiAnUHJvQ2xhc3NGaWVsZENvbmZpZycsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnaGFzTWFueScsXG4gICAgICAgICAga2V5RnJvbTogJ3BrX2VudGl0eScsXG4gICAgICAgICAga2V5VG86ICdma19jbGFzc19maWVsZCdcbiAgICAgICAgfSxcbiAgICAgICAgY2xhc3Nlczoge1xuICAgICAgICAgIG5hbWU6ICdjbGFzc2VzJyxcbiAgICAgICAgICB0eXBlOiAnRGZoQ2xhc3NbXScsXG4gICAgICAgICAgbW9kZWw6ICdEZmhDbGFzcycsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnaGFzTWFueScsXG4gICAgICAgICAgbW9kZWxUaHJvdWdoOiAnUHJvQ2xhc3NGaWVsZENvbmZpZycsXG4gICAgICAgICAga2V5VGhyb3VnaDogJ2ZrX2NsYXNzX2Zvcl9jbGFzc19maWVsZCcsXG4gICAgICAgICAga2V5RnJvbTogJ3BrX2VudGl0eScsXG4gICAgICAgICAga2V5VG86ICdma19jbGFzc19maWVsZCdcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==