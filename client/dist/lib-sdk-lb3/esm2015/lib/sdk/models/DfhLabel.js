/* tslint:disable */
export class DfhLabel {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `DfhLabel`.
     */
    static getModelName() {
        return "DfhLabel";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of DfhLabel for dynamic purposes.
    **/
    static factory(data) {
        return new DfhLabel(data);
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
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGZoTGFiZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNkay1sYjMvIiwic291cmNlcyI6WyJsaWIvc2RrL21vZGVscy9EZmhMYWJlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxvQkFBb0I7QUFhcEIsTUFBTSxPQUFPLFFBQVE7SUFRbkIsWUFBWSxJQUF3QjtRQUNsQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0Q7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLFlBQVk7UUFDeEIsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztJQUNEOzs7OztPQUtHO0lBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUF1QjtRQUMzQyxPQUFPLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRDs7Ozs7O09BTUc7SUFDSSxNQUFNLENBQUMsa0JBQWtCO1FBQzlCLE9BQU87WUFDTCxJQUFJLEVBQUUsVUFBVTtZQUNoQixNQUFNLEVBQUUsV0FBVztZQUNuQixJQUFJLEVBQUUsV0FBVztZQUNqQixNQUFNLEVBQUUsTUFBTTtZQUNkLFVBQVUsRUFBRTtnQkFDVixNQUFNLEVBQUU7b0JBQ04sSUFBSSxFQUFFLE1BQU07b0JBQ1osSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLElBQUksRUFBRSxPQUFPO29CQUNiLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELFVBQVUsRUFBRTtvQkFDVixJQUFJLEVBQUUsVUFBVTtvQkFDaEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLElBQUksRUFBRSxZQUFZO29CQUNsQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osSUFBSSxFQUFFLFlBQVk7b0JBQ2xCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELGFBQWEsRUFBRTtvQkFDYixJQUFJLEVBQUUsYUFBYTtvQkFDbkIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsVUFBVSxFQUFFO29CQUNWLElBQUksRUFBRSxVQUFVO29CQUNoQixJQUFJLEVBQUUsUUFBUTtpQkFDZjthQUNGO1lBQ0QsU0FBUyxFQUFFLEVBQ1Y7U0FDRixDQUFBO0lBQ0gsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cblxuZGVjbGFyZSB2YXIgT2JqZWN0OiBhbnk7XG5leHBvcnQgaW50ZXJmYWNlIERmaExhYmVsSW50ZXJmYWNlIHtcbiAgXCJ0eXBlXCI/OiBzdHJpbmc7XG4gIFwibGFiZWxcIj86IHN0cmluZztcbiAgXCJsYW5ndWFnZVwiPzogc3RyaW5nO1xuICBcImZrX3Byb2ZpbGVcIj86IG51bWJlcjtcbiAgXCJma19wcm9qZWN0XCI/OiBudW1iZXI7XG4gIFwiZmtfcHJvcGVydHlcIj86IG51bWJlcjtcbiAgXCJma19jbGFzc1wiPzogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgRGZoTGFiZWwgaW1wbGVtZW50cyBEZmhMYWJlbEludGVyZmFjZSB7XG4gIFwidHlwZVwiOiBzdHJpbmc7XG4gIFwibGFiZWxcIjogc3RyaW5nO1xuICBcImxhbmd1YWdlXCI6IHN0cmluZztcbiAgXCJma19wcm9maWxlXCI6IG51bWJlcjtcbiAgXCJma19wcm9qZWN0XCI6IG51bWJlcjtcbiAgXCJma19wcm9wZXJ0eVwiOiBudW1iZXI7XG4gIFwiZmtfY2xhc3NcIjogbnVtYmVyO1xuICBjb25zdHJ1Y3RvcihkYXRhPzogRGZoTGFiZWxJbnRlcmZhY2UpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xuICB9XG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyAkcmVzb3VyY2UsXG4gICAqIGkuZS4gYERmaExhYmVsYC5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxOYW1lKCkge1xuICAgIHJldHVybiBcIkRmaExhYmVsXCI7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBmYWN0b3J5XG4gICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1Ymlhc1xuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIGNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgRGZoTGFiZWwgZm9yIGR5bmFtaWMgcHVycG9zZXMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGZhY3RvcnkoZGF0YTogRGZoTGFiZWxJbnRlcmZhY2UpOiBEZmhMYWJlbHtcbiAgICByZXR1cm4gbmV3IERmaExhYmVsKGRhdGEpO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgZ2V0TW9kZWxEZWZpbml0aW9uXG4gICogQGF1dGhvciBKdWxpZW4gTGVkdW5cbiAgKiBAbGljZW5zZSBNSVRcbiAgKiBUaGlzIG1ldGhvZCByZXR1cm5zIGFuIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgc29tZSBvZiB0aGUgbW9kZWxcbiAgKiBkZWZpbml0aW9ucy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxEZWZpbml0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiAnRGZoTGFiZWwnLFxuICAgICAgcGx1cmFsOiAnRGZoTGFiZWxzJyxcbiAgICAgIHBhdGg6ICdEZmhMYWJlbHMnLFxuICAgICAgaWROYW1lOiAndHlwZScsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIFwidHlwZVwiOiB7XG4gICAgICAgICAgbmFtZTogJ3R5cGUnLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwibGFiZWxcIjoge1xuICAgICAgICAgIG5hbWU6ICdsYWJlbCcsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgXCJsYW5ndWFnZVwiOiB7XG4gICAgICAgICAgbmFtZTogJ2xhbmd1YWdlJyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBcImZrX3Byb2ZpbGVcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19wcm9maWxlJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcImZrX3Byb2plY3RcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19wcm9qZWN0JyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcImZrX3Byb3BlcnR5XCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfcHJvcGVydHknLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfY2xhc3NcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19jbGFzcycsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZWxhdGlvbnM6IHtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==