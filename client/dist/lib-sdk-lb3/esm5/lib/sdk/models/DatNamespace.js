/* tslint:disable */
var DatNamespace = /** @class */ (function () {
    function DatNamespace(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `DatNamespace`.
     */
    DatNamespace.getModelName = function () {
        return "DatNamespace";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of DatNamespace for dynamic purposes.
    **/
    DatNamespace.factory = function (data) {
        return new DatNamespace(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    DatNamespace.getModelDefinition = function () {
        return {
            name: 'DatNamespace',
            plural: 'DatNamespaces',
            path: 'DatNamespaces',
            idName: 'pk_entity',
            properties: {
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
                "fk_root_namespace": {
                    name: 'fk_root_namespace',
                    type: 'number'
                },
                "fk_project": {
                    name: 'fk_project',
                    type: 'number'
                },
                "standard_label": {
                    name: 'standard_label',
                    type: 'string'
                },
            },
            relations: {}
        };
    };
    return DatNamespace;
}());
export { DatNamespace };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0TmFtZXNwYWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1zZGstbGIzLyIsInNvdXJjZXMiOlsibGliL3Nkay9tb2RlbHMvRGF0TmFtZXNwYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG9CQUFvQjtBQVVwQjtJQUtFLHNCQUFZLElBQTRCO1FBQ3RDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRDs7O09BR0c7SUFDVyx5QkFBWSxHQUExQjtRQUNFLE9BQU8sY0FBYyxDQUFDO0lBQ3hCLENBQUM7SUFDRDs7Ozs7T0FLRztJQUNXLG9CQUFPLEdBQXJCLFVBQXNCLElBQTJCO1FBQy9DLE9BQU8sSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUNEOzs7Ozs7T0FNRztJQUNXLCtCQUFrQixHQUFoQztRQUNFLE9BQU87WUFDTCxJQUFJLEVBQUUsY0FBYztZQUNwQixNQUFNLEVBQUUsZUFBZTtZQUN2QixJQUFJLEVBQUUsZUFBZTtZQUNyQixNQUFNLEVBQUUsV0FBVztZQUNuQixVQUFVLEVBQUU7Z0JBQ1YsV0FBVyxFQUFFO29CQUNYLElBQUksRUFBRSxXQUFXO29CQUNqQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxtQkFBbUIsRUFBRTtvQkFDbkIsSUFBSSxFQUFFLG1CQUFtQjtvQkFDekIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLElBQUksRUFBRSxZQUFZO29CQUNsQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxnQkFBZ0IsRUFBRTtvQkFDaEIsSUFBSSxFQUFFLGdCQUFnQjtvQkFDdEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7YUFDRjtZQUNELFNBQVMsRUFBRSxFQUNWO1NBQ0YsQ0FBQTtJQUNILENBQUM7SUFDSCxtQkFBQztBQUFELENBQUMsQUEzREQsSUEyREMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuXG5kZWNsYXJlIHZhciBPYmplY3Q6IGFueTtcbmV4cG9ydCBpbnRlcmZhY2UgRGF0TmFtZXNwYWNlSW50ZXJmYWNlIHtcbiAgXCJwa19lbnRpdHlcIj86IG51bWJlcjtcbiAgXCJma19yb290X25hbWVzcGFjZVwiPzogbnVtYmVyO1xuICBcImZrX3Byb2plY3RcIjogbnVtYmVyO1xuICBcInN0YW5kYXJkX2xhYmVsXCI6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIERhdE5hbWVzcGFjZSBpbXBsZW1lbnRzIERhdE5hbWVzcGFjZUludGVyZmFjZSB7XG4gIFwicGtfZW50aXR5XCI6IG51bWJlcjtcbiAgXCJma19yb290X25hbWVzcGFjZVwiOiBudW1iZXI7XG4gIFwiZmtfcHJvamVjdFwiOiBudW1iZXI7XG4gIFwic3RhbmRhcmRfbGFiZWxcIjogc3RyaW5nO1xuICBjb25zdHJ1Y3RvcihkYXRhPzogRGF0TmFtZXNwYWNlSW50ZXJmYWNlKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgfVxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxuICAgKiBpLmUuIGBEYXROYW1lc3BhY2VgLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbE5hbWUoKSB7XG4gICAgcmV0dXJuIFwiRGF0TmFtZXNwYWNlXCI7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBmYWN0b3J5XG4gICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1Ymlhc1xuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIGNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgRGF0TmFtZXNwYWNlIGZvciBkeW5hbWljIHB1cnBvc2VzLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBmYWN0b3J5KGRhdGE6IERhdE5hbWVzcGFjZUludGVyZmFjZSk6IERhdE5hbWVzcGFjZXtcbiAgICByZXR1cm4gbmV3IERhdE5hbWVzcGFjZShkYXRhKTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGdldE1vZGVsRGVmaW5pdGlvblxuICAqIEBhdXRob3IgSnVsaWVuIExlZHVuXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgcmV0dXJucyBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIHNvbWUgb2YgdGhlIG1vZGVsXG4gICogZGVmaW5pdGlvbnMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsRGVmaW5pdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJ0RhdE5hbWVzcGFjZScsXG4gICAgICBwbHVyYWw6ICdEYXROYW1lc3BhY2VzJyxcbiAgICAgIHBhdGg6ICdEYXROYW1lc3BhY2VzJyxcbiAgICAgIGlkTmFtZTogJ3BrX2VudGl0eScsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIFwicGtfZW50aXR5XCI6IHtcbiAgICAgICAgICBuYW1lOiAncGtfZW50aXR5JyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcImZrX3Jvb3RfbmFtZXNwYWNlXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfcm9vdF9uYW1lc3BhY2UnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfcHJvamVjdFwiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX3Byb2plY3QnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwic3RhbmRhcmRfbGFiZWxcIjoge1xuICAgICAgICAgIG5hbWU6ICdzdGFuZGFyZF9sYWJlbCcsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZWxhdGlvbnM6IHtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==