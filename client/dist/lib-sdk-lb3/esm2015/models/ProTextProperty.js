export class ProTextProperty {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `ProTextProperty`.
     */
    static getModelName() {
        return "ProTextProperty";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of ProTextProperty for dynamic purposes.
    **/
    static factory(data) {
        return new ProTextProperty(data);
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
            name: 'ProTextProperty',
            plural: 'ProTextProperties',
            path: 'ProTextProperties',
            idName: 'pk_entity',
            properties: {
                "string": {
                    name: 'string',
                    type: 'string'
                },
                "fk_system_type": {
                    name: 'fk_system_type',
                    type: 'number'
                },
                "fk_language": {
                    name: 'fk_language',
                    type: 'number'
                },
                "fk_project": {
                    name: 'fk_project',
                    type: 'number'
                },
                "fk_dfh_class": {
                    name: 'fk_dfh_class',
                    type: 'number'
                },
                "fk_dfh_property": {
                    name: 'fk_dfh_property',
                    type: 'number'
                },
                "fk_dfh_property_domain": {
                    name: 'fk_dfh_property_domain',
                    type: 'number'
                },
                "fk_dfh_property_range": {
                    name: 'fk_dfh_property_range',
                    type: 'number'
                },
                "fk_pro_project": {
                    name: 'fk_pro_project',
                    type: 'number'
                },
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
                "entity_version": {
                    name: 'entity_version',
                    type: 'number'
                },
                "tmsp_creation": {
                    name: 'tmsp_creation',
                    type: 'string'
                },
                "tmsp_last_modification": {
                    name: 'tmsp_last_modification',
                    type: 'string'
                },
            },
            relations: {
                project: {
                    name: 'project',
                    type: 'ProProject',
                    model: 'ProProject',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_project',
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
                systemType: {
                    name: 'systemType',
                    type: 'SysSystemType',
                    model: 'SysSystemType',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_system_type',
                    keyTo: 'pk_entity'
                },
            }
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvVGV4dFByb3BlcnR5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1zZGstbGIzLyIsInNvdXJjZXMiOlsibW9kZWxzL1Byb1RleHRQcm9wZXJ0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEyQkEsTUFBTSxPQUFPLGVBQWU7SUFpQjFCLFlBQVksSUFBK0I7UUFDekMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxZQUFZO1FBQ3hCLE9BQU8saUJBQWlCLENBQUM7SUFDM0IsQ0FBQztJQUNEOzs7OztPQUtHO0lBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUE4QjtRQUNsRCxPQUFPLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFDRDs7Ozs7O09BTUc7SUFDSSxNQUFNLENBQUMsa0JBQWtCO1FBQzlCLE9BQU87WUFDTCxJQUFJLEVBQUUsaUJBQWlCO1lBQ3ZCLE1BQU0sRUFBRSxtQkFBbUI7WUFDM0IsSUFBSSxFQUFFLG1CQUFtQjtZQUN6QixNQUFNLEVBQUUsV0FBVztZQUNuQixVQUFVLEVBQUU7Z0JBQ1YsUUFBUSxFQUFFO29CQUNSLElBQUksRUFBRSxRQUFRO29CQUNkLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELGdCQUFnQixFQUFFO29CQUNoQixJQUFJLEVBQUUsZ0JBQWdCO29CQUN0QixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxhQUFhLEVBQUU7b0JBQ2IsSUFBSSxFQUFFLGFBQWE7b0JBQ25CLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELFlBQVksRUFBRTtvQkFDWixJQUFJLEVBQUUsWUFBWTtvQkFDbEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsY0FBYyxFQUFFO29CQUNkLElBQUksRUFBRSxjQUFjO29CQUNwQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxpQkFBaUIsRUFBRTtvQkFDakIsSUFBSSxFQUFFLGlCQUFpQjtvQkFDdkIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0Qsd0JBQXdCLEVBQUU7b0JBQ3hCLElBQUksRUFBRSx3QkFBd0I7b0JBQzlCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELHVCQUF1QixFQUFFO29CQUN2QixJQUFJLEVBQUUsdUJBQXVCO29CQUM3QixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxnQkFBZ0IsRUFBRTtvQkFDaEIsSUFBSSxFQUFFLGdCQUFnQjtvQkFDdEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsV0FBVyxFQUFFO29CQUNYLElBQUksRUFBRSxXQUFXO29CQUNqQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxnQkFBZ0IsRUFBRTtvQkFDaEIsSUFBSSxFQUFFLGdCQUFnQjtvQkFDdEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsZUFBZSxFQUFFO29CQUNmLElBQUksRUFBRSxlQUFlO29CQUNyQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCx3QkFBd0IsRUFBRTtvQkFDeEIsSUFBSSxFQUFFLHdCQUF3QjtvQkFDOUIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7YUFDRjtZQUNELFNBQVMsRUFBRTtnQkFDVCxPQUFPLEVBQUU7b0JBQ1AsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsSUFBSSxFQUFFLFlBQVk7b0JBQ2xCLEtBQUssRUFBRSxZQUFZO29CQUNuQixZQUFZLEVBQUUsV0FBVztvQkFDakIsT0FBTyxFQUFFLFlBQVk7b0JBQzdCLEtBQUssRUFBRSxXQUFXO2lCQUNuQjtnQkFDRCxRQUFRLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLFVBQVU7b0JBQ2hCLElBQUksRUFBRSxhQUFhO29CQUNuQixLQUFLLEVBQUUsYUFBYTtvQkFDcEIsWUFBWSxFQUFFLFdBQVc7b0JBQ2pCLE9BQU8sRUFBRSxhQUFhO29CQUM5QixLQUFLLEVBQUUsV0FBVztpQkFDbkI7Z0JBQ0QsVUFBVSxFQUFFO29CQUNWLElBQUksRUFBRSxZQUFZO29CQUNsQixJQUFJLEVBQUUsZUFBZTtvQkFDckIsS0FBSyxFQUFFLGVBQWU7b0JBQ3RCLFlBQVksRUFBRSxXQUFXO29CQUNqQixPQUFPLEVBQUUsZ0JBQWdCO29CQUNqQyxLQUFLLEVBQUUsV0FBVztpQkFDbkI7YUFDRjtTQUNGLENBQUE7SUFDSCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuaW1wb3J0IHtcbiAgUHJvUHJvamVjdCxcbiAgSW5mTGFuZ3VhZ2UsXG4gIFN5c1N5c3RlbVR5cGVcbn0gZnJvbSAnLi4vaW5kZXgnO1xuXG5kZWNsYXJlIHZhciBPYmplY3Q6IGFueTtcbmV4cG9ydCBpbnRlcmZhY2UgUHJvVGV4dFByb3BlcnR5SW50ZXJmYWNlIHtcbiAgXCJzdHJpbmdcIjogc3RyaW5nO1xuICBcImZrX3N5c3RlbV90eXBlXCI6IG51bWJlcjtcbiAgXCJma19sYW5ndWFnZVwiOiBudW1iZXI7XG4gIFwiZmtfcHJvamVjdFwiOiBudW1iZXI7XG4gIFwiZmtfZGZoX2NsYXNzXCI/OiBudW1iZXI7XG4gIFwiZmtfZGZoX3Byb3BlcnR5XCI/OiBudW1iZXI7XG4gIFwiZmtfZGZoX3Byb3BlcnR5X2RvbWFpblwiPzogbnVtYmVyO1xuICBcImZrX2RmaF9wcm9wZXJ0eV9yYW5nZVwiPzogbnVtYmVyO1xuICBcImZrX3Byb19wcm9qZWN0XCI/OiBudW1iZXI7XG4gIFwicGtfZW50aXR5XCI/OiBudW1iZXI7XG4gIFwiZW50aXR5X3ZlcnNpb25cIj86IG51bWJlcjtcbiAgXCJ0bXNwX2NyZWF0aW9uXCI/OiBzdHJpbmc7XG4gIFwidG1zcF9sYXN0X21vZGlmaWNhdGlvblwiPzogc3RyaW5nO1xuICBwcm9qZWN0PzogUHJvUHJvamVjdDtcbiAgbGFuZ3VhZ2U/OiBJbmZMYW5ndWFnZTtcbiAgc3lzdGVtVHlwZT86IFN5c1N5c3RlbVR5cGU7XG59XG5cbmV4cG9ydCBjbGFzcyBQcm9UZXh0UHJvcGVydHkgaW1wbGVtZW50cyBQcm9UZXh0UHJvcGVydHlJbnRlcmZhY2Uge1xuICBcInN0cmluZ1wiOiBzdHJpbmc7XG4gIFwiZmtfc3lzdGVtX3R5cGVcIjogbnVtYmVyO1xuICBcImZrX2xhbmd1YWdlXCI6IG51bWJlcjtcbiAgXCJma19wcm9qZWN0XCI6IG51bWJlcjtcbiAgXCJma19kZmhfY2xhc3NcIjogbnVtYmVyO1xuICBcImZrX2RmaF9wcm9wZXJ0eVwiOiBudW1iZXI7XG4gIFwiZmtfZGZoX3Byb3BlcnR5X2RvbWFpblwiOiBudW1iZXI7XG4gIFwiZmtfZGZoX3Byb3BlcnR5X3JhbmdlXCI6IG51bWJlcjtcbiAgXCJma19wcm9fcHJvamVjdFwiOiBudW1iZXI7XG4gIFwicGtfZW50aXR5XCI6IG51bWJlcjtcbiAgXCJlbnRpdHlfdmVyc2lvblwiOiBudW1iZXI7XG4gIFwidG1zcF9jcmVhdGlvblwiOiBzdHJpbmc7XG4gIFwidG1zcF9sYXN0X21vZGlmaWNhdGlvblwiOiBzdHJpbmc7XG4gIHByb2plY3Q/OiBQcm9Qcm9qZWN0O1xuICBsYW5ndWFnZT86IEluZkxhbmd1YWdlO1xuICBzeXN0ZW1UeXBlPzogU3lzU3lzdGVtVHlwZTtcbiAgY29uc3RydWN0b3IoZGF0YT86IFByb1RleHRQcm9wZXJ0eUludGVyZmFjZSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG4gIH1cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBtb2RlbCByZXByZXNlbnRlZCBieSB0aGlzICRyZXNvdXJjZSxcbiAgICogaS5lLiBgUHJvVGV4dFByb3BlcnR5YC5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxOYW1lKCkge1xuICAgIHJldHVybiBcIlByb1RleHRQcm9wZXJ0eVwiO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgZmFjdG9yeVxuICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXNcbiAgKiBAbGljZW5zZSBNSVRcbiAgKiBUaGlzIG1ldGhvZCBjcmVhdGVzIGFuIGluc3RhbmNlIG9mIFByb1RleHRQcm9wZXJ0eSBmb3IgZHluYW1pYyBwdXJwb3Nlcy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0aWMgZmFjdG9yeShkYXRhOiBQcm9UZXh0UHJvcGVydHlJbnRlcmZhY2UpOiBQcm9UZXh0UHJvcGVydHl7XG4gICAgcmV0dXJuIG5ldyBQcm9UZXh0UHJvcGVydHkoZGF0YSk7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBnZXRNb2RlbERlZmluaXRpb25cbiAgKiBAYXV0aG9yIEp1bGllbiBMZWR1blxuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIHJldHVybnMgYW4gb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBzb21lIG9mIHRoZSBtb2RlbFxuICAqIGRlZmluaXRpb25zLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbERlZmluaXRpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6ICdQcm9UZXh0UHJvcGVydHknLFxuICAgICAgcGx1cmFsOiAnUHJvVGV4dFByb3BlcnRpZXMnLFxuICAgICAgcGF0aDogJ1Byb1RleHRQcm9wZXJ0aWVzJyxcbiAgICAgIGlkTmFtZTogJ3BrX2VudGl0eScsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIFwic3RyaW5nXCI6IHtcbiAgICAgICAgICBuYW1lOiAnc3RyaW5nJyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBcImZrX3N5c3RlbV90eXBlXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfc3lzdGVtX3R5cGUnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfbGFuZ3VhZ2VcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19sYW5ndWFnZScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJma19wcm9qZWN0XCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfcHJvamVjdCcsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJma19kZmhfY2xhc3NcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19kZmhfY2xhc3MnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfZGZoX3Byb3BlcnR5XCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfZGZoX3Byb3BlcnR5JyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcImZrX2RmaF9wcm9wZXJ0eV9kb21haW5cIjoge1xuICAgICAgICAgIG5hbWU6ICdma19kZmhfcHJvcGVydHlfZG9tYWluJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcImZrX2RmaF9wcm9wZXJ0eV9yYW5nZVwiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX2RmaF9wcm9wZXJ0eV9yYW5nZScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJma19wcm9fcHJvamVjdFwiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX3Byb19wcm9qZWN0JyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcInBrX2VudGl0eVwiOiB7XG4gICAgICAgICAgbmFtZTogJ3BrX2VudGl0eScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJlbnRpdHlfdmVyc2lvblwiOiB7XG4gICAgICAgICAgbmFtZTogJ2VudGl0eV92ZXJzaW9uJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcInRtc3BfY3JlYXRpb25cIjoge1xuICAgICAgICAgIG5hbWU6ICd0bXNwX2NyZWF0aW9uJyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBcInRtc3BfbGFzdF9tb2RpZmljYXRpb25cIjoge1xuICAgICAgICAgIG5hbWU6ICd0bXNwX2xhc3RfbW9kaWZpY2F0aW9uJyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlbGF0aW9uczoge1xuICAgICAgICBwcm9qZWN0OiB7XG4gICAgICAgICAgbmFtZTogJ3Byb2plY3QnLFxuICAgICAgICAgIHR5cGU6ICdQcm9Qcm9qZWN0JyxcbiAgICAgICAgICBtb2RlbDogJ1Byb1Byb2plY3QnLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2JlbG9uZ3NUbycsXG4gICAgICAgICAgICAgICAgICBrZXlGcm9tOiAnZmtfcHJvamVjdCcsXG4gICAgICAgICAga2V5VG86ICdwa19lbnRpdHknXG4gICAgICAgIH0sXG4gICAgICAgIGxhbmd1YWdlOiB7XG4gICAgICAgICAgbmFtZTogJ2xhbmd1YWdlJyxcbiAgICAgICAgICB0eXBlOiAnSW5mTGFuZ3VhZ2UnLFxuICAgICAgICAgIG1vZGVsOiAnSW5mTGFuZ3VhZ2UnLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2JlbG9uZ3NUbycsXG4gICAgICAgICAgICAgICAgICBrZXlGcm9tOiAnZmtfbGFuZ3VhZ2UnLFxuICAgICAgICAgIGtleVRvOiAncGtfZW50aXR5J1xuICAgICAgICB9LFxuICAgICAgICBzeXN0ZW1UeXBlOiB7XG4gICAgICAgICAgbmFtZTogJ3N5c3RlbVR5cGUnLFxuICAgICAgICAgIHR5cGU6ICdTeXNTeXN0ZW1UeXBlJyxcbiAgICAgICAgICBtb2RlbDogJ1N5c1N5c3RlbVR5cGUnLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2JlbG9uZ3NUbycsXG4gICAgICAgICAgICAgICAgICBrZXlGcm9tOiAnZmtfc3lzdGVtX3R5cGUnLFxuICAgICAgICAgIGtleVRvOiAncGtfZW50aXR5J1xuICAgICAgICB9LFxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19