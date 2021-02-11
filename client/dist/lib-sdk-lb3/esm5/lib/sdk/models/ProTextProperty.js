var ProTextProperty = /** @class */ (function () {
    function ProTextProperty(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `ProTextProperty`.
     */
    ProTextProperty.getModelName = function () {
        return "ProTextProperty";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of ProTextProperty for dynamic purposes.
    **/
    ProTextProperty.factory = function (data) {
        return new ProTextProperty(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    ProTextProperty.getModelDefinition = function () {
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
    };
    return ProTextProperty;
}());
export { ProTextProperty };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvVGV4dFByb3BlcnR5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1zZGstbGIzLyIsInNvdXJjZXMiOlsibGliL3Nkay9tb2RlbHMvUHJvVGV4dFByb3BlcnR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTJCQTtJQWlCRSx5QkFBWSxJQUErQjtRQUN6QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0Q7OztPQUdHO0lBQ1csNEJBQVksR0FBMUI7UUFDRSxPQUFPLGlCQUFpQixDQUFDO0lBQzNCLENBQUM7SUFDRDs7Ozs7T0FLRztJQUNXLHVCQUFPLEdBQXJCLFVBQXNCLElBQThCO1FBQ2xELE9BQU8sSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUNEOzs7Ozs7T0FNRztJQUNXLGtDQUFrQixHQUFoQztRQUNFLE9BQU87WUFDTCxJQUFJLEVBQUUsaUJBQWlCO1lBQ3ZCLE1BQU0sRUFBRSxtQkFBbUI7WUFDM0IsSUFBSSxFQUFFLG1CQUFtQjtZQUN6QixNQUFNLEVBQUUsV0FBVztZQUNuQixVQUFVLEVBQUU7Z0JBQ1YsUUFBUSxFQUFFO29CQUNSLElBQUksRUFBRSxRQUFRO29CQUNkLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELGdCQUFnQixFQUFFO29CQUNoQixJQUFJLEVBQUUsZ0JBQWdCO29CQUN0QixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxhQUFhLEVBQUU7b0JBQ2IsSUFBSSxFQUFFLGFBQWE7b0JBQ25CLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELFlBQVksRUFBRTtvQkFDWixJQUFJLEVBQUUsWUFBWTtvQkFDbEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsY0FBYyxFQUFFO29CQUNkLElBQUksRUFBRSxjQUFjO29CQUNwQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxpQkFBaUIsRUFBRTtvQkFDakIsSUFBSSxFQUFFLGlCQUFpQjtvQkFDdkIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0Qsd0JBQXdCLEVBQUU7b0JBQ3hCLElBQUksRUFBRSx3QkFBd0I7b0JBQzlCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELHVCQUF1QixFQUFFO29CQUN2QixJQUFJLEVBQUUsdUJBQXVCO29CQUM3QixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxnQkFBZ0IsRUFBRTtvQkFDaEIsSUFBSSxFQUFFLGdCQUFnQjtvQkFDdEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsV0FBVyxFQUFFO29CQUNYLElBQUksRUFBRSxXQUFXO29CQUNqQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxnQkFBZ0IsRUFBRTtvQkFDaEIsSUFBSSxFQUFFLGdCQUFnQjtvQkFDdEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsZUFBZSxFQUFFO29CQUNmLElBQUksRUFBRSxlQUFlO29CQUNyQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCx3QkFBd0IsRUFBRTtvQkFDeEIsSUFBSSxFQUFFLHdCQUF3QjtvQkFDOUIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7YUFDRjtZQUNELFNBQVMsRUFBRTtnQkFDVCxPQUFPLEVBQUU7b0JBQ1AsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsSUFBSSxFQUFFLFlBQVk7b0JBQ2xCLEtBQUssRUFBRSxZQUFZO29CQUNuQixZQUFZLEVBQUUsV0FBVztvQkFDakIsT0FBTyxFQUFFLFlBQVk7b0JBQzdCLEtBQUssRUFBRSxXQUFXO2lCQUNuQjtnQkFDRCxRQUFRLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLFVBQVU7b0JBQ2hCLElBQUksRUFBRSxhQUFhO29CQUNuQixLQUFLLEVBQUUsYUFBYTtvQkFDcEIsWUFBWSxFQUFFLFdBQVc7b0JBQ2pCLE9BQU8sRUFBRSxhQUFhO29CQUM5QixLQUFLLEVBQUUsV0FBVztpQkFDbkI7Z0JBQ0QsVUFBVSxFQUFFO29CQUNWLElBQUksRUFBRSxZQUFZO29CQUNsQixJQUFJLEVBQUUsZUFBZTtvQkFDckIsS0FBSyxFQUFFLGVBQWU7b0JBQ3RCLFlBQVksRUFBRSxXQUFXO29CQUNqQixPQUFPLEVBQUUsZ0JBQWdCO29CQUNqQyxLQUFLLEVBQUUsV0FBVztpQkFDbkI7YUFDRjtTQUNGLENBQUE7SUFDSCxDQUFDO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLEFBbklELElBbUlDIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cbmltcG9ydCB7XG4gIFByb1Byb2plY3QsXG4gIEluZkxhbmd1YWdlLFxuICBTeXNTeXN0ZW1UeXBlXG59IGZyb20gJy4uL2luZGV4JztcblxuZGVjbGFyZSB2YXIgT2JqZWN0OiBhbnk7XG5leHBvcnQgaW50ZXJmYWNlIFByb1RleHRQcm9wZXJ0eUludGVyZmFjZSB7XG4gIFwic3RyaW5nXCI6IHN0cmluZztcbiAgXCJma19zeXN0ZW1fdHlwZVwiOiBudW1iZXI7XG4gIFwiZmtfbGFuZ3VhZ2VcIjogbnVtYmVyO1xuICBcImZrX3Byb2plY3RcIjogbnVtYmVyO1xuICBcImZrX2RmaF9jbGFzc1wiPzogbnVtYmVyO1xuICBcImZrX2RmaF9wcm9wZXJ0eVwiPzogbnVtYmVyO1xuICBcImZrX2RmaF9wcm9wZXJ0eV9kb21haW5cIj86IG51bWJlcjtcbiAgXCJma19kZmhfcHJvcGVydHlfcmFuZ2VcIj86IG51bWJlcjtcbiAgXCJma19wcm9fcHJvamVjdFwiPzogbnVtYmVyO1xuICBcInBrX2VudGl0eVwiPzogbnVtYmVyO1xuICBcImVudGl0eV92ZXJzaW9uXCI/OiBudW1iZXI7XG4gIFwidG1zcF9jcmVhdGlvblwiPzogc3RyaW5nO1xuICBcInRtc3BfbGFzdF9tb2RpZmljYXRpb25cIj86IHN0cmluZztcbiAgcHJvamVjdD86IFByb1Byb2plY3Q7XG4gIGxhbmd1YWdlPzogSW5mTGFuZ3VhZ2U7XG4gIHN5c3RlbVR5cGU/OiBTeXNTeXN0ZW1UeXBlO1xufVxuXG5leHBvcnQgY2xhc3MgUHJvVGV4dFByb3BlcnR5IGltcGxlbWVudHMgUHJvVGV4dFByb3BlcnR5SW50ZXJmYWNlIHtcbiAgXCJzdHJpbmdcIjogc3RyaW5nO1xuICBcImZrX3N5c3RlbV90eXBlXCI6IG51bWJlcjtcbiAgXCJma19sYW5ndWFnZVwiOiBudW1iZXI7XG4gIFwiZmtfcHJvamVjdFwiOiBudW1iZXI7XG4gIFwiZmtfZGZoX2NsYXNzXCI6IG51bWJlcjtcbiAgXCJma19kZmhfcHJvcGVydHlcIjogbnVtYmVyO1xuICBcImZrX2RmaF9wcm9wZXJ0eV9kb21haW5cIjogbnVtYmVyO1xuICBcImZrX2RmaF9wcm9wZXJ0eV9yYW5nZVwiOiBudW1iZXI7XG4gIFwiZmtfcHJvX3Byb2plY3RcIjogbnVtYmVyO1xuICBcInBrX2VudGl0eVwiOiBudW1iZXI7XG4gIFwiZW50aXR5X3ZlcnNpb25cIjogbnVtYmVyO1xuICBcInRtc3BfY3JlYXRpb25cIjogc3RyaW5nO1xuICBcInRtc3BfbGFzdF9tb2RpZmljYXRpb25cIjogc3RyaW5nO1xuICBwcm9qZWN0PzogUHJvUHJvamVjdDtcbiAgbGFuZ3VhZ2U/OiBJbmZMYW5ndWFnZTtcbiAgc3lzdGVtVHlwZT86IFN5c1N5c3RlbVR5cGU7XG4gIGNvbnN0cnVjdG9yKGRhdGE/OiBQcm9UZXh0UHJvcGVydHlJbnRlcmZhY2UpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xuICB9XG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyAkcmVzb3VyY2UsXG4gICAqIGkuZS4gYFByb1RleHRQcm9wZXJ0eWAuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsTmFtZSgpIHtcbiAgICByZXR1cm4gXCJQcm9UZXh0UHJvcGVydHlcIjtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGZhY3RvcnlcbiAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgY3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBQcm9UZXh0UHJvcGVydHkgZm9yIGR5bmFtaWMgcHVycG9zZXMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGZhY3RvcnkoZGF0YTogUHJvVGV4dFByb3BlcnR5SW50ZXJmYWNlKTogUHJvVGV4dFByb3BlcnR5e1xuICAgIHJldHVybiBuZXcgUHJvVGV4dFByb3BlcnR5KGRhdGEpO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgZ2V0TW9kZWxEZWZpbml0aW9uXG4gICogQGF1dGhvciBKdWxpZW4gTGVkdW5cbiAgKiBAbGljZW5zZSBNSVRcbiAgKiBUaGlzIG1ldGhvZCByZXR1cm5zIGFuIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgc29tZSBvZiB0aGUgbW9kZWxcbiAgKiBkZWZpbml0aW9ucy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxEZWZpbml0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiAnUHJvVGV4dFByb3BlcnR5JyxcbiAgICAgIHBsdXJhbDogJ1Byb1RleHRQcm9wZXJ0aWVzJyxcbiAgICAgIHBhdGg6ICdQcm9UZXh0UHJvcGVydGllcycsXG4gICAgICBpZE5hbWU6ICdwa19lbnRpdHknLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBcInN0cmluZ1wiOiB7XG4gICAgICAgICAgbmFtZTogJ3N0cmluZycsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgXCJma19zeXN0ZW1fdHlwZVwiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX3N5c3RlbV90eXBlJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcImZrX2xhbmd1YWdlXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfbGFuZ3VhZ2UnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfcHJvamVjdFwiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX3Byb2plY3QnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfZGZoX2NsYXNzXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfZGZoX2NsYXNzJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcImZrX2RmaF9wcm9wZXJ0eVwiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX2RmaF9wcm9wZXJ0eScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJma19kZmhfcHJvcGVydHlfZG9tYWluXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfZGZoX3Byb3BlcnR5X2RvbWFpbicsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJma19kZmhfcHJvcGVydHlfcmFuZ2VcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19kZmhfcHJvcGVydHlfcmFuZ2UnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfcHJvX3Byb2plY3RcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19wcm9fcHJvamVjdCcsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJwa19lbnRpdHlcIjoge1xuICAgICAgICAgIG5hbWU6ICdwa19lbnRpdHknLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwiZW50aXR5X3ZlcnNpb25cIjoge1xuICAgICAgICAgIG5hbWU6ICdlbnRpdHlfdmVyc2lvbicsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJ0bXNwX2NyZWF0aW9uXCI6IHtcbiAgICAgICAgICBuYW1lOiAndG1zcF9jcmVhdGlvbicsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgXCJ0bXNwX2xhc3RfbW9kaWZpY2F0aW9uXCI6IHtcbiAgICAgICAgICBuYW1lOiAndG1zcF9sYXN0X21vZGlmaWNhdGlvbicsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZWxhdGlvbnM6IHtcbiAgICAgICAgcHJvamVjdDoge1xuICAgICAgICAgIG5hbWU6ICdwcm9qZWN0JyxcbiAgICAgICAgICB0eXBlOiAnUHJvUHJvamVjdCcsXG4gICAgICAgICAgbW9kZWw6ICdQcm9Qcm9qZWN0JyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdiZWxvbmdzVG8nLFxuICAgICAgICAgICAgICAgICAga2V5RnJvbTogJ2ZrX3Byb2plY3QnLFxuICAgICAgICAgIGtleVRvOiAncGtfZW50aXR5J1xuICAgICAgICB9LFxuICAgICAgICBsYW5ndWFnZToge1xuICAgICAgICAgIG5hbWU6ICdsYW5ndWFnZScsXG4gICAgICAgICAgdHlwZTogJ0luZkxhbmd1YWdlJyxcbiAgICAgICAgICBtb2RlbDogJ0luZkxhbmd1YWdlJyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdiZWxvbmdzVG8nLFxuICAgICAgICAgICAgICAgICAga2V5RnJvbTogJ2ZrX2xhbmd1YWdlJyxcbiAgICAgICAgICBrZXlUbzogJ3BrX2VudGl0eSdcbiAgICAgICAgfSxcbiAgICAgICAgc3lzdGVtVHlwZToge1xuICAgICAgICAgIG5hbWU6ICdzeXN0ZW1UeXBlJyxcbiAgICAgICAgICB0eXBlOiAnU3lzU3lzdGVtVHlwZScsXG4gICAgICAgICAgbW9kZWw6ICdTeXNTeXN0ZW1UeXBlJyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdiZWxvbmdzVG8nLFxuICAgICAgICAgICAgICAgICAga2V5RnJvbTogJ2ZrX3N5c3RlbV90eXBlJyxcbiAgICAgICAgICBrZXlUbzogJ3BrX2VudGl0eSdcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==