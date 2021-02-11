var ProClassFieldConfig = /** @class */ (function () {
    function ProClassFieldConfig(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `ProClassFieldConfig`.
     */
    ProClassFieldConfig.getModelName = function () {
        return "ProClassFieldConfig";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of ProClassFieldConfig for dynamic purposes.
    **/
    ProClassFieldConfig.factory = function (data) {
        return new ProClassFieldConfig(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    ProClassFieldConfig.getModelDefinition = function () {
        return {
            name: 'ProClassFieldConfig',
            plural: 'ProClassFieldConfigs',
            path: 'ProClassFieldConfigs',
            idName: 'pk_entity',
            properties: {
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
                "fk_project": {
                    name: 'fk_project',
                    type: 'number'
                },
                "fk_property": {
                    name: 'fk_property',
                    type: 'number'
                },
                "fk_class_field": {
                    name: 'fk_class_field',
                    type: 'number'
                },
                "fk_domain_class": {
                    name: 'fk_domain_class',
                    type: 'number'
                },
                "fk_range_class": {
                    name: 'fk_range_class',
                    type: 'number'
                },
                "ord_num": {
                    name: 'ord_num',
                    type: 'number'
                },
                "fk_class_for_class_field": {
                    name: 'fk_class_for_class_field',
                    type: 'number'
                },
            },
            relations: {
                property: {
                    name: 'property',
                    type: 'DfhProperty',
                    model: 'DfhProperty',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_property',
                    keyTo: 'pk_property'
                },
                class_field: {
                    name: 'class_field',
                    type: 'SysClassField',
                    model: 'SysClassField',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_class_field',
                    keyTo: 'pk_entity'
                },
                project: {
                    name: 'project',
                    type: 'ProProject',
                    model: 'ProProject',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_project',
                    keyTo: 'pk_entity'
                },
            }
        };
    };
    return ProClassFieldConfig;
}());
export { ProClassFieldConfig };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvQ2xhc3NGaWVsZENvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc2RrLWxiMy8iLCJzb3VyY2VzIjpbImxpYi9zZGsvbW9kZWxzL1Byb0NsYXNzRmllbGRDb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBc0JBO0lBWUUsNkJBQVksSUFBbUM7UUFDN0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNEOzs7T0FHRztJQUNXLGdDQUFZLEdBQTFCO1FBQ0UsT0FBTyxxQkFBcUIsQ0FBQztJQUMvQixDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFDVywyQkFBTyxHQUFyQixVQUFzQixJQUFrQztRQUN0RCxPQUFPLElBQUksbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUNEOzs7Ozs7T0FNRztJQUNXLHNDQUFrQixHQUFoQztRQUNFLE9BQU87WUFDTCxJQUFJLEVBQUUscUJBQXFCO1lBQzNCLE1BQU0sRUFBRSxzQkFBc0I7WUFDOUIsSUFBSSxFQUFFLHNCQUFzQjtZQUM1QixNQUFNLEVBQUUsV0FBVztZQUNuQixVQUFVLEVBQUU7Z0JBQ1YsV0FBVyxFQUFFO29CQUNYLElBQUksRUFBRSxXQUFXO29CQUNqQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osSUFBSSxFQUFFLFlBQVk7b0JBQ2xCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELGFBQWEsRUFBRTtvQkFDYixJQUFJLEVBQUUsYUFBYTtvQkFDbkIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsZ0JBQWdCLEVBQUU7b0JBQ2hCLElBQUksRUFBRSxnQkFBZ0I7b0JBQ3RCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELGlCQUFpQixFQUFFO29CQUNqQixJQUFJLEVBQUUsaUJBQWlCO29CQUN2QixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxnQkFBZ0IsRUFBRTtvQkFDaEIsSUFBSSxFQUFFLGdCQUFnQjtvQkFDdEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULElBQUksRUFBRSxTQUFTO29CQUNmLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELDBCQUEwQixFQUFFO29CQUMxQixJQUFJLEVBQUUsMEJBQTBCO29CQUNoQyxJQUFJLEVBQUUsUUFBUTtpQkFDZjthQUNGO1lBQ0QsU0FBUyxFQUFFO2dCQUNULFFBQVEsRUFBRTtvQkFDUixJQUFJLEVBQUUsVUFBVTtvQkFDaEIsSUFBSSxFQUFFLGFBQWE7b0JBQ25CLEtBQUssRUFBRSxhQUFhO29CQUNwQixZQUFZLEVBQUUsV0FBVztvQkFDekIsT0FBTyxFQUFFLGFBQWE7b0JBQ3RCLEtBQUssRUFBRSxhQUFhO2lCQUNyQjtnQkFDRCxXQUFXLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLGFBQWE7b0JBQ25CLElBQUksRUFBRSxlQUFlO29CQUNyQixLQUFLLEVBQUUsZUFBZTtvQkFDdEIsWUFBWSxFQUFFLFdBQVc7b0JBQ3pCLE9BQU8sRUFBRSxnQkFBZ0I7b0JBQ3pCLEtBQUssRUFBRSxXQUFXO2lCQUNuQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsSUFBSSxFQUFFLFlBQVk7b0JBQ2xCLEtBQUssRUFBRSxZQUFZO29CQUNuQixZQUFZLEVBQUUsV0FBVztvQkFDekIsT0FBTyxFQUFFLFlBQVk7b0JBQ3JCLEtBQUssRUFBRSxXQUFXO2lCQUNuQjthQUNGO1NBQ0YsQ0FBQTtJQUNILENBQUM7SUFDSCwwQkFBQztBQUFELENBQUMsQUExR0QsSUEwR0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuaW1wb3J0IHtcbiAgLy8gRGZoUHJvcGVydHksXG4gIFN5c0NsYXNzRmllbGQsXG4gIFByb1Byb2plY3Rcbn0gZnJvbSAnLi4vaW5kZXgnO1xuXG5kZWNsYXJlIHZhciBPYmplY3Q6IGFueTtcbmV4cG9ydCBpbnRlcmZhY2UgUHJvQ2xhc3NGaWVsZENvbmZpZ0ludGVyZmFjZSB7XG4gIFwicGtfZW50aXR5XCI/OiBudW1iZXI7XG4gIFwiZmtfcHJvamVjdFwiPzogbnVtYmVyO1xuICBcImZrX3Byb3BlcnR5XCI/OiBudW1iZXI7XG4gIFwiZmtfY2xhc3NfZmllbGRcIj86IG51bWJlcjtcbiAgXCJma19kb21haW5fY2xhc3NcIj86IG51bWJlcjtcbiAgXCJma19yYW5nZV9jbGFzc1wiPzogbnVtYmVyO1xuICBcIm9yZF9udW1cIj86IG51bWJlcjtcbiAgXCJma19jbGFzc19mb3JfY2xhc3NfZmllbGRcIj86IG51bWJlcjtcbiAgLy8gcHJvcGVydHk/OiBEZmhQcm9wZXJ0eTtcbiAgY2xhc3NfZmllbGQ/OiBTeXNDbGFzc0ZpZWxkO1xuICBwcm9qZWN0PzogUHJvUHJvamVjdDtcbn1cblxuZXhwb3J0IGNsYXNzIFByb0NsYXNzRmllbGRDb25maWcgaW1wbGVtZW50cyBQcm9DbGFzc0ZpZWxkQ29uZmlnSW50ZXJmYWNlIHtcbiAgXCJwa19lbnRpdHlcIjogbnVtYmVyO1xuICBcImZrX3Byb2plY3RcIjogbnVtYmVyO1xuICBcImZrX3Byb3BlcnR5XCI6IG51bWJlcjtcbiAgXCJma19jbGFzc19maWVsZFwiOiBudW1iZXI7XG4gIFwiZmtfZG9tYWluX2NsYXNzXCI6IG51bWJlcjtcbiAgXCJma19yYW5nZV9jbGFzc1wiOiBudW1iZXI7XG4gIFwib3JkX251bVwiOiBudW1iZXI7XG4gIFwiZmtfY2xhc3NfZm9yX2NsYXNzX2ZpZWxkXCI6IG51bWJlcjtcbiAgLy8gcHJvcGVydHk/OiBEZmhQcm9wZXJ0eTtcbiAgY2xhc3NfZmllbGQ/OiBTeXNDbGFzc0ZpZWxkO1xuICBwcm9qZWN0PzogUHJvUHJvamVjdDtcbiAgY29uc3RydWN0b3IoZGF0YT86IFByb0NsYXNzRmllbGRDb25maWdJbnRlcmZhY2UpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xuICB9XG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyAkcmVzb3VyY2UsXG4gICAqIGkuZS4gYFByb0NsYXNzRmllbGRDb25maWdgLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbE5hbWUoKSB7XG4gICAgcmV0dXJuIFwiUHJvQ2xhc3NGaWVsZENvbmZpZ1wiO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgZmFjdG9yeVxuICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXNcbiAgKiBAbGljZW5zZSBNSVRcbiAgKiBUaGlzIG1ldGhvZCBjcmVhdGVzIGFuIGluc3RhbmNlIG9mIFByb0NsYXNzRmllbGRDb25maWcgZm9yIGR5bmFtaWMgcHVycG9zZXMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGZhY3RvcnkoZGF0YTogUHJvQ2xhc3NGaWVsZENvbmZpZ0ludGVyZmFjZSk6IFByb0NsYXNzRmllbGRDb25maWcge1xuICAgIHJldHVybiBuZXcgUHJvQ2xhc3NGaWVsZENvbmZpZyhkYXRhKTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGdldE1vZGVsRGVmaW5pdGlvblxuICAqIEBhdXRob3IgSnVsaWVuIExlZHVuXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgcmV0dXJucyBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIHNvbWUgb2YgdGhlIG1vZGVsXG4gICogZGVmaW5pdGlvbnMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsRGVmaW5pdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJ1Byb0NsYXNzRmllbGRDb25maWcnLFxuICAgICAgcGx1cmFsOiAnUHJvQ2xhc3NGaWVsZENvbmZpZ3MnLFxuICAgICAgcGF0aDogJ1Byb0NsYXNzRmllbGRDb25maWdzJyxcbiAgICAgIGlkTmFtZTogJ3BrX2VudGl0eScsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIFwicGtfZW50aXR5XCI6IHtcbiAgICAgICAgICBuYW1lOiAncGtfZW50aXR5JyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcImZrX3Byb2plY3RcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19wcm9qZWN0JyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcImZrX3Byb3BlcnR5XCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfcHJvcGVydHknLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfY2xhc3NfZmllbGRcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19jbGFzc19maWVsZCcsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJma19kb21haW5fY2xhc3NcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19kb21haW5fY2xhc3MnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfcmFuZ2VfY2xhc3NcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19yYW5nZV9jbGFzcycsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJvcmRfbnVtXCI6IHtcbiAgICAgICAgICBuYW1lOiAnb3JkX251bScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJma19jbGFzc19mb3JfY2xhc3NfZmllbGRcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19jbGFzc19mb3JfY2xhc3NfZmllbGQnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVsYXRpb25zOiB7XG4gICAgICAgIHByb3BlcnR5OiB7XG4gICAgICAgICAgbmFtZTogJ3Byb3BlcnR5JyxcbiAgICAgICAgICB0eXBlOiAnRGZoUHJvcGVydHknLFxuICAgICAgICAgIG1vZGVsOiAnRGZoUHJvcGVydHknLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2JlbG9uZ3NUbycsXG4gICAgICAgICAga2V5RnJvbTogJ2ZrX3Byb3BlcnR5JyxcbiAgICAgICAgICBrZXlUbzogJ3BrX3Byb3BlcnR5J1xuICAgICAgICB9LFxuICAgICAgICBjbGFzc19maWVsZDoge1xuICAgICAgICAgIG5hbWU6ICdjbGFzc19maWVsZCcsXG4gICAgICAgICAgdHlwZTogJ1N5c0NsYXNzRmllbGQnLFxuICAgICAgICAgIG1vZGVsOiAnU3lzQ2xhc3NGaWVsZCcsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnYmVsb25nc1RvJyxcbiAgICAgICAgICBrZXlGcm9tOiAnZmtfY2xhc3NfZmllbGQnLFxuICAgICAgICAgIGtleVRvOiAncGtfZW50aXR5J1xuICAgICAgICB9LFxuICAgICAgICBwcm9qZWN0OiB7XG4gICAgICAgICAgbmFtZTogJ3Byb2plY3QnLFxuICAgICAgICAgIHR5cGU6ICdQcm9Qcm9qZWN0JyxcbiAgICAgICAgICBtb2RlbDogJ1Byb1Byb2plY3QnLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2JlbG9uZ3NUbycsXG4gICAgICAgICAga2V5RnJvbTogJ2ZrX3Byb2plY3QnLFxuICAgICAgICAgIGtleVRvOiAncGtfZW50aXR5J1xuICAgICAgICB9LFxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19