export class ProClassFieldConfig {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `ProClassFieldConfig`.
     */
    static getModelName() {
        return "ProClassFieldConfig";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of ProClassFieldConfig for dynamic purposes.
    **/
    static factory(data) {
        return new ProClassFieldConfig(data);
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
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvQ2xhc3NGaWVsZENvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc2RrLWxiMy8iLCJzb3VyY2VzIjpbIm1vZGVscy9Qcm9DbGFzc0ZpZWxkQ29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXNCQSxNQUFNLE9BQU8sbUJBQW1CO0lBWTlCLFlBQVksSUFBbUM7UUFDN0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxZQUFZO1FBQ3hCLE9BQU8scUJBQXFCLENBQUM7SUFDL0IsQ0FBQztJQUNEOzs7OztPQUtHO0lBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFrQztRQUN0RCxPQUFPLElBQUksbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUNEOzs7Ozs7T0FNRztJQUNJLE1BQU0sQ0FBQyxrQkFBa0I7UUFDOUIsT0FBTztZQUNMLElBQUksRUFBRSxxQkFBcUI7WUFDM0IsTUFBTSxFQUFFLHNCQUFzQjtZQUM5QixJQUFJLEVBQUUsc0JBQXNCO1lBQzVCLE1BQU0sRUFBRSxXQUFXO1lBQ25CLFVBQVUsRUFBRTtnQkFDVixXQUFXLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELFlBQVksRUFBRTtvQkFDWixJQUFJLEVBQUUsWUFBWTtvQkFDbEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsYUFBYSxFQUFFO29CQUNiLElBQUksRUFBRSxhQUFhO29CQUNuQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxnQkFBZ0IsRUFBRTtvQkFDaEIsSUFBSSxFQUFFLGdCQUFnQjtvQkFDdEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsaUJBQWlCLEVBQUU7b0JBQ2pCLElBQUksRUFBRSxpQkFBaUI7b0JBQ3ZCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELGdCQUFnQixFQUFFO29CQUNoQixJQUFJLEVBQUUsZ0JBQWdCO29CQUN0QixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1QsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsMEJBQTBCLEVBQUU7b0JBQzFCLElBQUksRUFBRSwwQkFBMEI7b0JBQ2hDLElBQUksRUFBRSxRQUFRO2lCQUNmO2FBQ0Y7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsUUFBUSxFQUFFO29CQUNSLElBQUksRUFBRSxVQUFVO29CQUNoQixJQUFJLEVBQUUsYUFBYTtvQkFDbkIsS0FBSyxFQUFFLGFBQWE7b0JBQ3BCLFlBQVksRUFBRSxXQUFXO29CQUN6QixPQUFPLEVBQUUsYUFBYTtvQkFDdEIsS0FBSyxFQUFFLGFBQWE7aUJBQ3JCO2dCQUNELFdBQVcsRUFBRTtvQkFDWCxJQUFJLEVBQUUsYUFBYTtvQkFDbkIsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLEtBQUssRUFBRSxlQUFlO29CQUN0QixZQUFZLEVBQUUsV0FBVztvQkFDekIsT0FBTyxFQUFFLGdCQUFnQjtvQkFDekIsS0FBSyxFQUFFLFdBQVc7aUJBQ25CO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxJQUFJLEVBQUUsU0FBUztvQkFDZixJQUFJLEVBQUUsWUFBWTtvQkFDbEIsS0FBSyxFQUFFLFlBQVk7b0JBQ25CLFlBQVksRUFBRSxXQUFXO29CQUN6QixPQUFPLEVBQUUsWUFBWTtvQkFDckIsS0FBSyxFQUFFLFdBQVc7aUJBQ25CO2FBQ0Y7U0FDRixDQUFBO0lBQ0gsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cbmltcG9ydCB7XG4gIC8vIERmaFByb3BlcnR5LFxuICBTeXNDbGFzc0ZpZWxkLFxuICBQcm9Qcm9qZWN0XG59IGZyb20gJy4uL2luZGV4JztcblxuZGVjbGFyZSB2YXIgT2JqZWN0OiBhbnk7XG5leHBvcnQgaW50ZXJmYWNlIFByb0NsYXNzRmllbGRDb25maWdJbnRlcmZhY2Uge1xuICBcInBrX2VudGl0eVwiPzogbnVtYmVyO1xuICBcImZrX3Byb2plY3RcIj86IG51bWJlcjtcbiAgXCJma19wcm9wZXJ0eVwiPzogbnVtYmVyO1xuICBcImZrX2NsYXNzX2ZpZWxkXCI/OiBudW1iZXI7XG4gIFwiZmtfZG9tYWluX2NsYXNzXCI/OiBudW1iZXI7XG4gIFwiZmtfcmFuZ2VfY2xhc3NcIj86IG51bWJlcjtcbiAgXCJvcmRfbnVtXCI/OiBudW1iZXI7XG4gIFwiZmtfY2xhc3NfZm9yX2NsYXNzX2ZpZWxkXCI/OiBudW1iZXI7XG4gIC8vIHByb3BlcnR5PzogRGZoUHJvcGVydHk7XG4gIGNsYXNzX2ZpZWxkPzogU3lzQ2xhc3NGaWVsZDtcbiAgcHJvamVjdD86IFByb1Byb2plY3Q7XG59XG5cbmV4cG9ydCBjbGFzcyBQcm9DbGFzc0ZpZWxkQ29uZmlnIGltcGxlbWVudHMgUHJvQ2xhc3NGaWVsZENvbmZpZ0ludGVyZmFjZSB7XG4gIFwicGtfZW50aXR5XCI6IG51bWJlcjtcbiAgXCJma19wcm9qZWN0XCI6IG51bWJlcjtcbiAgXCJma19wcm9wZXJ0eVwiOiBudW1iZXI7XG4gIFwiZmtfY2xhc3NfZmllbGRcIjogbnVtYmVyO1xuICBcImZrX2RvbWFpbl9jbGFzc1wiOiBudW1iZXI7XG4gIFwiZmtfcmFuZ2VfY2xhc3NcIjogbnVtYmVyO1xuICBcIm9yZF9udW1cIjogbnVtYmVyO1xuICBcImZrX2NsYXNzX2Zvcl9jbGFzc19maWVsZFwiOiBudW1iZXI7XG4gIC8vIHByb3BlcnR5PzogRGZoUHJvcGVydHk7XG4gIGNsYXNzX2ZpZWxkPzogU3lzQ2xhc3NGaWVsZDtcbiAgcHJvamVjdD86IFByb1Byb2plY3Q7XG4gIGNvbnN0cnVjdG9yKGRhdGE/OiBQcm9DbGFzc0ZpZWxkQ29uZmlnSW50ZXJmYWNlKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgfVxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxuICAgKiBpLmUuIGBQcm9DbGFzc0ZpZWxkQ29uZmlnYC5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxOYW1lKCkge1xuICAgIHJldHVybiBcIlByb0NsYXNzRmllbGRDb25maWdcIjtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGZhY3RvcnlcbiAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgY3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBQcm9DbGFzc0ZpZWxkQ29uZmlnIGZvciBkeW5hbWljIHB1cnBvc2VzLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBmYWN0b3J5KGRhdGE6IFByb0NsYXNzRmllbGRDb25maWdJbnRlcmZhY2UpOiBQcm9DbGFzc0ZpZWxkQ29uZmlnIHtcbiAgICByZXR1cm4gbmV3IFByb0NsYXNzRmllbGRDb25maWcoZGF0YSk7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBnZXRNb2RlbERlZmluaXRpb25cbiAgKiBAYXV0aG9yIEp1bGllbiBMZWR1blxuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIHJldHVybnMgYW4gb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBzb21lIG9mIHRoZSBtb2RlbFxuICAqIGRlZmluaXRpb25zLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbERlZmluaXRpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6ICdQcm9DbGFzc0ZpZWxkQ29uZmlnJyxcbiAgICAgIHBsdXJhbDogJ1Byb0NsYXNzRmllbGRDb25maWdzJyxcbiAgICAgIHBhdGg6ICdQcm9DbGFzc0ZpZWxkQ29uZmlncycsXG4gICAgICBpZE5hbWU6ICdwa19lbnRpdHknLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBcInBrX2VudGl0eVwiOiB7XG4gICAgICAgICAgbmFtZTogJ3BrX2VudGl0eScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJma19wcm9qZWN0XCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfcHJvamVjdCcsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJma19wcm9wZXJ0eVwiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX3Byb3BlcnR5JyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcImZrX2NsYXNzX2ZpZWxkXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfY2xhc3NfZmllbGQnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfZG9tYWluX2NsYXNzXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfZG9tYWluX2NsYXNzJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcImZrX3JhbmdlX2NsYXNzXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfcmFuZ2VfY2xhc3MnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwib3JkX251bVwiOiB7XG4gICAgICAgICAgbmFtZTogJ29yZF9udW0nLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfY2xhc3NfZm9yX2NsYXNzX2ZpZWxkXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfY2xhc3NfZm9yX2NsYXNzX2ZpZWxkJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlbGF0aW9uczoge1xuICAgICAgICBwcm9wZXJ0eToge1xuICAgICAgICAgIG5hbWU6ICdwcm9wZXJ0eScsXG4gICAgICAgICAgdHlwZTogJ0RmaFByb3BlcnR5JyxcbiAgICAgICAgICBtb2RlbDogJ0RmaFByb3BlcnR5JyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdiZWxvbmdzVG8nLFxuICAgICAgICAgIGtleUZyb206ICdma19wcm9wZXJ0eScsXG4gICAgICAgICAga2V5VG86ICdwa19wcm9wZXJ0eSdcbiAgICAgICAgfSxcbiAgICAgICAgY2xhc3NfZmllbGQ6IHtcbiAgICAgICAgICBuYW1lOiAnY2xhc3NfZmllbGQnLFxuICAgICAgICAgIHR5cGU6ICdTeXNDbGFzc0ZpZWxkJyxcbiAgICAgICAgICBtb2RlbDogJ1N5c0NsYXNzRmllbGQnLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2JlbG9uZ3NUbycsXG4gICAgICAgICAga2V5RnJvbTogJ2ZrX2NsYXNzX2ZpZWxkJyxcbiAgICAgICAgICBrZXlUbzogJ3BrX2VudGl0eSdcbiAgICAgICAgfSxcbiAgICAgICAgcHJvamVjdDoge1xuICAgICAgICAgIG5hbWU6ICdwcm9qZWN0JyxcbiAgICAgICAgICB0eXBlOiAnUHJvUHJvamVjdCcsXG4gICAgICAgICAgbW9kZWw6ICdQcm9Qcm9qZWN0JyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdiZWxvbmdzVG8nLFxuICAgICAgICAgIGtleUZyb206ICdma19wcm9qZWN0JyxcbiAgICAgICAgICBrZXlUbzogJ3BrX2VudGl0eSdcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==