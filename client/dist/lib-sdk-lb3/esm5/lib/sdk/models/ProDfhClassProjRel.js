/* tslint:disable */
var ProDfhClassProjRel = /** @class */ (function () {
    function ProDfhClassProjRel(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `ProDfhClassProjRel`.
     */
    ProDfhClassProjRel.getModelName = function () {
        return "ProDfhClassProjRel";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of ProDfhClassProjRel for dynamic purposes.
    **/
    ProDfhClassProjRel.factory = function (data) {
        return new ProDfhClassProjRel(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    ProDfhClassProjRel.getModelDefinition = function () {
        return {
            name: 'ProDfhClassProjRel',
            plural: 'ProDfhClassProjRels',
            path: 'ProDfhClassProjRels',
            idName: 'pk_entity',
            properties: {
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
                "fk_class": {
                    name: 'fk_class',
                    type: 'number'
                },
                "fk_project": {
                    name: 'fk_project',
                    type: 'number'
                },
                "enabled_in_entities": {
                    name: 'enabled_in_entities',
                    type: 'boolean'
                },
            },
            relations: {}
        };
    };
    return ProDfhClassProjRel;
}());
export { ProDfhClassProjRel };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvRGZoQ2xhc3NQcm9qUmVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1zZGstbGIzLyIsInNvdXJjZXMiOlsibGliL3Nkay9tb2RlbHMvUHJvRGZoQ2xhc3NQcm9qUmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG9CQUFvQjtBQVVwQjtJQUtFLDRCQUFZLElBQWtDO1FBQzVDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRDs7O09BR0c7SUFDVywrQkFBWSxHQUExQjtRQUNFLE9BQU8sb0JBQW9CLENBQUM7SUFDOUIsQ0FBQztJQUNEOzs7OztPQUtHO0lBQ1csMEJBQU8sR0FBckIsVUFBc0IsSUFBaUM7UUFDckQsT0FBTyxJQUFJLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFDRDs7Ozs7O09BTUc7SUFDVyxxQ0FBa0IsR0FBaEM7UUFDRSxPQUFPO1lBQ0wsSUFBSSxFQUFFLG9CQUFvQjtZQUMxQixNQUFNLEVBQUUscUJBQXFCO1lBQzdCLElBQUksRUFBRSxxQkFBcUI7WUFDM0IsTUFBTSxFQUFFLFdBQVc7WUFDbkIsVUFBVSxFQUFFO2dCQUNWLFdBQVcsRUFBRTtvQkFDWCxJQUFJLEVBQUUsV0FBVztvQkFDakIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsVUFBVSxFQUFFO29CQUNWLElBQUksRUFBRSxVQUFVO29CQUNoQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osSUFBSSxFQUFFLFlBQVk7b0JBQ2xCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELHFCQUFxQixFQUFFO29CQUNyQixJQUFJLEVBQUUscUJBQXFCO29CQUMzQixJQUFJLEVBQUUsU0FBUztpQkFDaEI7YUFDRjtZQUNELFNBQVMsRUFBRSxFQUNWO1NBQ0YsQ0FBQTtJQUNILENBQUM7SUFDSCx5QkFBQztBQUFELENBQUMsQUEzREQsSUEyREMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuXG5kZWNsYXJlIHZhciBPYmplY3Q6IGFueTtcbmV4cG9ydCBpbnRlcmZhY2UgUHJvRGZoQ2xhc3NQcm9qUmVsSW50ZXJmYWNlIHtcbiAgXCJwa19lbnRpdHlcIj86IG51bWJlcjtcbiAgXCJma19jbGFzc1wiOiBudW1iZXI7XG4gIFwiZmtfcHJvamVjdFwiOiBudW1iZXI7XG4gIFwiZW5hYmxlZF9pbl9lbnRpdGllc1wiPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNsYXNzIFByb0RmaENsYXNzUHJvalJlbCBpbXBsZW1lbnRzIFByb0RmaENsYXNzUHJvalJlbEludGVyZmFjZSB7XG4gIFwicGtfZW50aXR5XCI6IG51bWJlcjtcbiAgXCJma19jbGFzc1wiOiBudW1iZXI7XG4gIFwiZmtfcHJvamVjdFwiOiBudW1iZXI7XG4gIFwiZW5hYmxlZF9pbl9lbnRpdGllc1wiOiBib29sZWFuO1xuICBjb25zdHJ1Y3RvcihkYXRhPzogUHJvRGZoQ2xhc3NQcm9qUmVsSW50ZXJmYWNlKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgfVxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxuICAgKiBpLmUuIGBQcm9EZmhDbGFzc1Byb2pSZWxgLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbE5hbWUoKSB7XG4gICAgcmV0dXJuIFwiUHJvRGZoQ2xhc3NQcm9qUmVsXCI7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBmYWN0b3J5XG4gICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1Ymlhc1xuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIGNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgUHJvRGZoQ2xhc3NQcm9qUmVsIGZvciBkeW5hbWljIHB1cnBvc2VzLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBmYWN0b3J5KGRhdGE6IFByb0RmaENsYXNzUHJvalJlbEludGVyZmFjZSk6IFByb0RmaENsYXNzUHJvalJlbHtcbiAgICByZXR1cm4gbmV3IFByb0RmaENsYXNzUHJvalJlbChkYXRhKTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGdldE1vZGVsRGVmaW5pdGlvblxuICAqIEBhdXRob3IgSnVsaWVuIExlZHVuXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgcmV0dXJucyBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIHNvbWUgb2YgdGhlIG1vZGVsXG4gICogZGVmaW5pdGlvbnMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsRGVmaW5pdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJ1Byb0RmaENsYXNzUHJvalJlbCcsXG4gICAgICBwbHVyYWw6ICdQcm9EZmhDbGFzc1Byb2pSZWxzJyxcbiAgICAgIHBhdGg6ICdQcm9EZmhDbGFzc1Byb2pSZWxzJyxcbiAgICAgIGlkTmFtZTogJ3BrX2VudGl0eScsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIFwicGtfZW50aXR5XCI6IHtcbiAgICAgICAgICBuYW1lOiAncGtfZW50aXR5JyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcImZrX2NsYXNzXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfY2xhc3MnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfcHJvamVjdFwiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX3Byb2plY3QnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwiZW5hYmxlZF9pbl9lbnRpdGllc1wiOiB7XG4gICAgICAgICAgbmFtZTogJ2VuYWJsZWRfaW5fZW50aXRpZXMnLFxuICAgICAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlbGF0aW9uczoge1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19