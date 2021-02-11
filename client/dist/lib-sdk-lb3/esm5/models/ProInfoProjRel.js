/* tslint:disable */
var ProInfoProjRel = /** @class */ (function () {
    function ProInfoProjRel(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `ProInfoProjRel`.
     */
    ProInfoProjRel.getModelName = function () {
        return "ProInfoProjRel";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of ProInfoProjRel for dynamic purposes.
    **/
    ProInfoProjRel.factory = function (data) {
        return new ProInfoProjRel(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    ProInfoProjRel.getModelDefinition = function () {
        return {
            name: 'ProInfoProjRel',
            plural: 'ProInfoProjRels',
            path: 'ProInfoProjRels',
            idName: 'pk_entity',
            properties: {
                "fk_project": {
                    name: 'fk_project',
                    type: 'number'
                },
                "fk_entity": {
                    name: 'fk_entity',
                    type: 'number'
                },
                "fk_entity_version": {
                    name: 'fk_entity_version',
                    type: 'string'
                },
                "fk_entity_version_concat": {
                    name: 'fk_entity_version_concat',
                    type: 'string'
                },
                "is_in_project": {
                    name: 'is_in_project',
                    type: 'boolean'
                },
                "is_standard_in_project": {
                    name: 'is_standard_in_project',
                    type: 'boolean'
                },
                "calendar": {
                    name: 'calendar',
                    type: 'string'
                },
                "ord_num_of_domain": {
                    name: 'ord_num_of_domain',
                    type: 'number'
                },
                "ord_num_of_range": {
                    name: 'ord_num_of_range',
                    type: 'number'
                },
                "ord_num_of_text_property": {
                    name: 'ord_num_of_text_property',
                    type: 'number'
                },
                "tmsp_last_modification": {
                    name: 'tmsp_last_modification',
                    type: 'string'
                },
                "fk_creator": {
                    name: 'fk_creator',
                    type: 'number'
                },
                "fk_last_modifier": {
                    name: 'fk_last_modifier',
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
            },
            relations: {}
        };
    };
    return ProInfoProjRel;
}());
export { ProInfoProjRel };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvSW5mb1Byb2pSZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNkay1sYjMvIiwic291cmNlcyI6WyJtb2RlbHMvUHJvSW5mb1Byb2pSZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0JBQW9CO0FBc0JwQjtJQWlCRSx3QkFBWSxJQUE4QjtRQUN4QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0Q7OztPQUdHO0lBQ1csMkJBQVksR0FBMUI7UUFDRSxPQUFPLGdCQUFnQixDQUFDO0lBQzFCLENBQUM7SUFDRDs7Ozs7T0FLRztJQUNXLHNCQUFPLEdBQXJCLFVBQXNCLElBQTZCO1FBQ2pELE9BQU8sSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUNEOzs7Ozs7T0FNRztJQUNXLGlDQUFrQixHQUFoQztRQUNFLE9BQU87WUFDTCxJQUFJLEVBQUUsZ0JBQWdCO1lBQ3RCLE1BQU0sRUFBRSxpQkFBaUI7WUFDekIsSUFBSSxFQUFFLGlCQUFpQjtZQUN2QixNQUFNLEVBQUUsV0FBVztZQUNuQixVQUFVLEVBQUU7Z0JBQ1YsWUFBWSxFQUFFO29CQUNaLElBQUksRUFBRSxZQUFZO29CQUNsQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxXQUFXLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELG1CQUFtQixFQUFFO29CQUNuQixJQUFJLEVBQUUsbUJBQW1CO29CQUN6QixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCwwQkFBMEIsRUFBRTtvQkFDMUIsSUFBSSxFQUFFLDBCQUEwQjtvQkFDaEMsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsZUFBZSxFQUFFO29CQUNmLElBQUksRUFBRSxlQUFlO29CQUNyQixJQUFJLEVBQUUsU0FBUztpQkFDaEI7Z0JBQ0Qsd0JBQXdCLEVBQUU7b0JBQ3hCLElBQUksRUFBRSx3QkFBd0I7b0JBQzlCLElBQUksRUFBRSxTQUFTO2lCQUNoQjtnQkFDRCxVQUFVLEVBQUU7b0JBQ1YsSUFBSSxFQUFFLFVBQVU7b0JBQ2hCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELG1CQUFtQixFQUFFO29CQUNuQixJQUFJLEVBQUUsbUJBQW1CO29CQUN6QixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxrQkFBa0IsRUFBRTtvQkFDbEIsSUFBSSxFQUFFLGtCQUFrQjtvQkFDeEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsMEJBQTBCLEVBQUU7b0JBQzFCLElBQUksRUFBRSwwQkFBMEI7b0JBQ2hDLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELHdCQUF3QixFQUFFO29CQUN4QixJQUFJLEVBQUUsd0JBQXdCO29CQUM5QixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osSUFBSSxFQUFFLFlBQVk7b0JBQ2xCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELGtCQUFrQixFQUFFO29CQUNsQixJQUFJLEVBQUUsa0JBQWtCO29CQUN4QixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxXQUFXLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELGdCQUFnQixFQUFFO29CQUNoQixJQUFJLEVBQUUsZ0JBQWdCO29CQUN0QixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxlQUFlLEVBQUU7b0JBQ2YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLElBQUksRUFBRSxRQUFRO2lCQUNmO2FBQ0Y7WUFDRCxTQUFTLEVBQUUsRUFDVjtTQUNGLENBQUE7SUFDSCxDQUFDO0lBQ0gscUJBQUM7QUFBRCxDQUFDLEFBdkhELElBdUhDIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cblxuZGVjbGFyZSB2YXIgT2JqZWN0OiBhbnk7XG5leHBvcnQgaW50ZXJmYWNlIFByb0luZm9Qcm9qUmVsSW50ZXJmYWNlIHtcbiAgXCJma19wcm9qZWN0XCI6IG51bWJlcjtcbiAgXCJma19lbnRpdHlcIj86IG51bWJlcjtcbiAgXCJma19lbnRpdHlfdmVyc2lvblwiPzogc3RyaW5nO1xuICBcImZrX2VudGl0eV92ZXJzaW9uX2NvbmNhdFwiPzogc3RyaW5nO1xuICBcImlzX2luX3Byb2plY3RcIj86IGJvb2xlYW47XG4gIFwiaXNfc3RhbmRhcmRfaW5fcHJvamVjdFwiPzogYm9vbGVhbjtcbiAgXCJjYWxlbmRhclwiPzogc3RyaW5nO1xuICBcIm9yZF9udW1fb2ZfZG9tYWluXCI/OiBudW1iZXI7XG4gIFwib3JkX251bV9vZl9yYW5nZVwiPzogbnVtYmVyO1xuICBcIm9yZF9udW1fb2ZfdGV4dF9wcm9wZXJ0eVwiPzogbnVtYmVyO1xuICBcInRtc3BfbGFzdF9tb2RpZmljYXRpb25cIj86IHN0cmluZztcbiAgXCJma19jcmVhdG9yXCI/OiBudW1iZXI7XG4gIFwiZmtfbGFzdF9tb2RpZmllclwiOiBudW1iZXI7XG4gIFwicGtfZW50aXR5XCI/OiBudW1iZXI7XG4gIFwiZW50aXR5X3ZlcnNpb25cIj86IG51bWJlcjtcbiAgXCJ0bXNwX2NyZWF0aW9uXCI/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBQcm9JbmZvUHJvalJlbCBpbXBsZW1lbnRzIFByb0luZm9Qcm9qUmVsSW50ZXJmYWNlIHtcbiAgXCJma19wcm9qZWN0XCI6IG51bWJlcjtcbiAgXCJma19lbnRpdHlcIj86IG51bWJlcjtcbiAgXCJma19lbnRpdHlfdmVyc2lvblwiPzogc3RyaW5nO1xuICBcImZrX2VudGl0eV92ZXJzaW9uX2NvbmNhdFwiPzogc3RyaW5nO1xuICBcImlzX2luX3Byb2plY3RcIj86IGJvb2xlYW47XG4gIFwiaXNfc3RhbmRhcmRfaW5fcHJvamVjdFwiPzogYm9vbGVhbjtcbiAgXCJjYWxlbmRhclwiPzogc3RyaW5nO1xuICBcIm9yZF9udW1fb2ZfZG9tYWluXCI/OiBudW1iZXI7XG4gIFwib3JkX251bV9vZl9yYW5nZVwiPzogbnVtYmVyO1xuICBcIm9yZF9udW1fb2ZfdGV4dF9wcm9wZXJ0eVwiPzogbnVtYmVyO1xuICBcInRtc3BfbGFzdF9tb2RpZmljYXRpb25cIj86IHN0cmluZztcbiAgXCJma19jcmVhdG9yXCI/OiBudW1iZXI7XG4gIFwiZmtfbGFzdF9tb2RpZmllclwiOiBudW1iZXI7XG4gIFwicGtfZW50aXR5XCI/OiBudW1iZXI7XG4gIFwiZW50aXR5X3ZlcnNpb25cIj86IG51bWJlcjtcbiAgXCJ0bXNwX2NyZWF0aW9uXCI/OiBzdHJpbmc7XG4gIGNvbnN0cnVjdG9yKGRhdGE/OiBQcm9JbmZvUHJvalJlbEludGVyZmFjZSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG4gIH1cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBtb2RlbCByZXByZXNlbnRlZCBieSB0aGlzICRyZXNvdXJjZSxcbiAgICogaS5lLiBgUHJvSW5mb1Byb2pSZWxgLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbE5hbWUoKSB7XG4gICAgcmV0dXJuIFwiUHJvSW5mb1Byb2pSZWxcIjtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGZhY3RvcnlcbiAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgY3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBQcm9JbmZvUHJvalJlbCBmb3IgZHluYW1pYyBwdXJwb3Nlcy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0aWMgZmFjdG9yeShkYXRhOiBQcm9JbmZvUHJvalJlbEludGVyZmFjZSk6IFByb0luZm9Qcm9qUmVsIHtcbiAgICByZXR1cm4gbmV3IFByb0luZm9Qcm9qUmVsKGRhdGEpO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgZ2V0TW9kZWxEZWZpbml0aW9uXG4gICogQGF1dGhvciBKdWxpZW4gTGVkdW5cbiAgKiBAbGljZW5zZSBNSVRcbiAgKiBUaGlzIG1ldGhvZCByZXR1cm5zIGFuIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgc29tZSBvZiB0aGUgbW9kZWxcbiAgKiBkZWZpbml0aW9ucy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxEZWZpbml0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiAnUHJvSW5mb1Byb2pSZWwnLFxuICAgICAgcGx1cmFsOiAnUHJvSW5mb1Byb2pSZWxzJyxcbiAgICAgIHBhdGg6ICdQcm9JbmZvUHJvalJlbHMnLFxuICAgICAgaWROYW1lOiAncGtfZW50aXR5JyxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgXCJma19wcm9qZWN0XCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfcHJvamVjdCcsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJma19lbnRpdHlcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19lbnRpdHknLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfZW50aXR5X3ZlcnNpb25cIjoge1xuICAgICAgICAgIG5hbWU6ICdma19lbnRpdHlfdmVyc2lvbicsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgXCJma19lbnRpdHlfdmVyc2lvbl9jb25jYXRcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19lbnRpdHlfdmVyc2lvbl9jb25jYXQnLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwiaXNfaW5fcHJvamVjdFwiOiB7XG4gICAgICAgICAgbmFtZTogJ2lzX2luX3Byb2plY3QnLFxuICAgICAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgICAgICB9LFxuICAgICAgICBcImlzX3N0YW5kYXJkX2luX3Byb2plY3RcIjoge1xuICAgICAgICAgIG5hbWU6ICdpc19zdGFuZGFyZF9pbl9wcm9qZWN0JyxcbiAgICAgICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICAgICAgfSxcbiAgICAgICAgXCJjYWxlbmRhclwiOiB7XG4gICAgICAgICAgbmFtZTogJ2NhbGVuZGFyJyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBcIm9yZF9udW1fb2ZfZG9tYWluXCI6IHtcbiAgICAgICAgICBuYW1lOiAnb3JkX251bV9vZl9kb21haW4nLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwib3JkX251bV9vZl9yYW5nZVwiOiB7XG4gICAgICAgICAgbmFtZTogJ29yZF9udW1fb2ZfcmFuZ2UnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwib3JkX251bV9vZl90ZXh0X3Byb3BlcnR5XCI6IHtcbiAgICAgICAgICBuYW1lOiAnb3JkX251bV9vZl90ZXh0X3Byb3BlcnR5JyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcInRtc3BfbGFzdF9tb2RpZmljYXRpb25cIjoge1xuICAgICAgICAgIG5hbWU6ICd0bXNwX2xhc3RfbW9kaWZpY2F0aW9uJyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBcImZrX2NyZWF0b3JcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19jcmVhdG9yJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcImZrX2xhc3RfbW9kaWZpZXJcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19sYXN0X21vZGlmaWVyJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcInBrX2VudGl0eVwiOiB7XG4gICAgICAgICAgbmFtZTogJ3BrX2VudGl0eScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJlbnRpdHlfdmVyc2lvblwiOiB7XG4gICAgICAgICAgbmFtZTogJ2VudGl0eV92ZXJzaW9uJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcInRtc3BfY3JlYXRpb25cIjoge1xuICAgICAgICAgIG5hbWU6ICd0bXNwX2NyZWF0aW9uJyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlbGF0aW9uczoge1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19