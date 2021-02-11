/* tslint:disable */
var DfhLabel = /** @class */ (function () {
    function DfhLabel(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `DfhLabel`.
     */
    DfhLabel.getModelName = function () {
        return "DfhLabel";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of DfhLabel for dynamic purposes.
    **/
    DfhLabel.factory = function (data) {
        return new DfhLabel(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    DfhLabel.getModelDefinition = function () {
        return {
            name: 'DfhLabel',
            plural: 'DfhLabels',
            path: 'DfhLabels',
            idName: 'type',
            properties: {
                "type": {
                    name: 'type',
                    type: 'string'
                },
                "label": {
                    name: 'label',
                    type: 'string'
                },
                "language": {
                    name: 'language',
                    type: 'string'
                },
                "fk_profile": {
                    name: 'fk_profile',
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
                "fk_class": {
                    name: 'fk_class',
                    type: 'number'
                },
            },
            relations: {}
        };
    };
    return DfhLabel;
}());
export { DfhLabel };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGZoTGFiZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNkay1sYjMvIiwic291cmNlcyI6WyJtb2RlbHMvRGZoTGFiZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0JBQW9CO0FBYXBCO0lBUUUsa0JBQVksSUFBd0I7UUFDbEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNEOzs7T0FHRztJQUNXLHFCQUFZLEdBQTFCO1FBQ0UsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztJQUNEOzs7OztPQUtHO0lBQ1csZ0JBQU8sR0FBckIsVUFBc0IsSUFBdUI7UUFDM0MsT0FBTyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ1csMkJBQWtCLEdBQWhDO1FBQ0UsT0FBTztZQUNMLElBQUksRUFBRSxVQUFVO1lBQ2hCLE1BQU0sRUFBRSxXQUFXO1lBQ25CLElBQUksRUFBRSxXQUFXO1lBQ2pCLE1BQU0sRUFBRSxNQUFNO1lBQ2QsVUFBVSxFQUFFO2dCQUNWLE1BQU0sRUFBRTtvQkFDTixJQUFJLEVBQUUsTUFBTTtvQkFDWixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsSUFBSSxFQUFFLE9BQU87b0JBQ2IsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsVUFBVSxFQUFFO29CQUNWLElBQUksRUFBRSxVQUFVO29CQUNoQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osSUFBSSxFQUFFLFlBQVk7b0JBQ2xCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELFlBQVksRUFBRTtvQkFDWixJQUFJLEVBQUUsWUFBWTtvQkFDbEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsYUFBYSxFQUFFO29CQUNiLElBQUksRUFBRSxhQUFhO29CQUNuQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxVQUFVLEVBQUU7b0JBQ1YsSUFBSSxFQUFFLFVBQVU7b0JBQ2hCLElBQUksRUFBRSxRQUFRO2lCQUNmO2FBQ0Y7WUFDRCxTQUFTLEVBQUUsRUFDVjtTQUNGLENBQUE7SUFDSCxDQUFDO0lBQ0gsZUFBQztBQUFELENBQUMsQUExRUQsSUEwRUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuXG5kZWNsYXJlIHZhciBPYmplY3Q6IGFueTtcbmV4cG9ydCBpbnRlcmZhY2UgRGZoTGFiZWxJbnRlcmZhY2Uge1xuICBcInR5cGVcIj86IHN0cmluZztcbiAgXCJsYWJlbFwiPzogc3RyaW5nO1xuICBcImxhbmd1YWdlXCI/OiBzdHJpbmc7XG4gIFwiZmtfcHJvZmlsZVwiPzogbnVtYmVyO1xuICBcImZrX3Byb2plY3RcIj86IG51bWJlcjtcbiAgXCJma19wcm9wZXJ0eVwiPzogbnVtYmVyO1xuICBcImZrX2NsYXNzXCI/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBEZmhMYWJlbCBpbXBsZW1lbnRzIERmaExhYmVsSW50ZXJmYWNlIHtcbiAgXCJ0eXBlXCI6IHN0cmluZztcbiAgXCJsYWJlbFwiOiBzdHJpbmc7XG4gIFwibGFuZ3VhZ2VcIjogc3RyaW5nO1xuICBcImZrX3Byb2ZpbGVcIjogbnVtYmVyO1xuICBcImZrX3Byb2plY3RcIjogbnVtYmVyO1xuICBcImZrX3Byb3BlcnR5XCI6IG51bWJlcjtcbiAgXCJma19jbGFzc1wiOiBudW1iZXI7XG4gIGNvbnN0cnVjdG9yKGRhdGE/OiBEZmhMYWJlbEludGVyZmFjZSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG4gIH1cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBtb2RlbCByZXByZXNlbnRlZCBieSB0aGlzICRyZXNvdXJjZSxcbiAgICogaS5lLiBgRGZoTGFiZWxgLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbE5hbWUoKSB7XG4gICAgcmV0dXJuIFwiRGZoTGFiZWxcIjtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGZhY3RvcnlcbiAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgY3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBEZmhMYWJlbCBmb3IgZHluYW1pYyBwdXJwb3Nlcy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0aWMgZmFjdG9yeShkYXRhOiBEZmhMYWJlbEludGVyZmFjZSk6IERmaExhYmVse1xuICAgIHJldHVybiBuZXcgRGZoTGFiZWwoZGF0YSk7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBnZXRNb2RlbERlZmluaXRpb25cbiAgKiBAYXV0aG9yIEp1bGllbiBMZWR1blxuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIHJldHVybnMgYW4gb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBzb21lIG9mIHRoZSBtb2RlbFxuICAqIGRlZmluaXRpb25zLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbERlZmluaXRpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6ICdEZmhMYWJlbCcsXG4gICAgICBwbHVyYWw6ICdEZmhMYWJlbHMnLFxuICAgICAgcGF0aDogJ0RmaExhYmVscycsXG4gICAgICBpZE5hbWU6ICd0eXBlJyxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgXCJ0eXBlXCI6IHtcbiAgICAgICAgICBuYW1lOiAndHlwZScsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgXCJsYWJlbFwiOiB7XG4gICAgICAgICAgbmFtZTogJ2xhYmVsJyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBcImxhbmd1YWdlXCI6IHtcbiAgICAgICAgICBuYW1lOiAnbGFuZ3VhZ2UnLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfcHJvZmlsZVwiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX3Byb2ZpbGUnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfcHJvamVjdFwiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX3Byb2plY3QnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfcHJvcGVydHlcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19wcm9wZXJ0eScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJma19jbGFzc1wiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX2NsYXNzJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlbGF0aW9uczoge1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19