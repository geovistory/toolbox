/* tslint:disable */
var ProDfhProfileProjRel = /** @class */ (function () {
    function ProDfhProfileProjRel(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `ProDfhProfileProjRel`.
     */
    ProDfhProfileProjRel.getModelName = function () {
        return "ProDfhProfileProjRel";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of ProDfhProfileProjRel for dynamic purposes.
    **/
    ProDfhProfileProjRel.factory = function (data) {
        return new ProDfhProfileProjRel(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    ProDfhProfileProjRel.getModelDefinition = function () {
        return {
            name: 'ProDfhProfileProjRel',
            plural: 'ProDfhProfileProjRels',
            path: 'ProDfhProfileProjRels',
            idName: 'pk_entity',
            properties: {
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
                "fk_profile": {
                    name: 'fk_profile',
                    type: 'number'
                },
                "fk_project": {
                    name: 'fk_project',
                    type: 'number'
                },
                "enabled": {
                    name: 'enabled',
                    type: 'boolean'
                },
            },
            relations: {}
        };
    };
    return ProDfhProfileProjRel;
}());
export { ProDfhProfileProjRel };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvRGZoUHJvZmlsZVByb2pSZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNkay1sYjMvIiwic291cmNlcyI6WyJtb2RlbHMvUHJvRGZoUHJvZmlsZVByb2pSZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0JBQW9CO0FBVXBCO0lBS0UsOEJBQVksSUFBb0M7UUFDOUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNEOzs7T0FHRztJQUNXLGlDQUFZLEdBQTFCO1FBQ0UsT0FBTyxzQkFBc0IsQ0FBQztJQUNoQyxDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFDVyw0QkFBTyxHQUFyQixVQUFzQixJQUFtQztRQUN2RCxPQUFPLElBQUksb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUNEOzs7Ozs7T0FNRztJQUNXLHVDQUFrQixHQUFoQztRQUNFLE9BQU87WUFDTCxJQUFJLEVBQUUsc0JBQXNCO1lBQzVCLE1BQU0sRUFBRSx1QkFBdUI7WUFDL0IsSUFBSSxFQUFFLHVCQUF1QjtZQUM3QixNQUFNLEVBQUUsV0FBVztZQUNuQixVQUFVLEVBQUU7Z0JBQ1YsV0FBVyxFQUFFO29CQUNYLElBQUksRUFBRSxXQUFXO29CQUNqQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osSUFBSSxFQUFFLFlBQVk7b0JBQ2xCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELFlBQVksRUFBRTtvQkFDWixJQUFJLEVBQUUsWUFBWTtvQkFDbEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULElBQUksRUFBRSxTQUFTO29CQUNmLElBQUksRUFBRSxTQUFTO2lCQUNoQjthQUNGO1lBQ0QsU0FBUyxFQUFFLEVBQ1Y7U0FDRixDQUFBO0lBQ0gsQ0FBQztJQUNILDJCQUFDO0FBQUQsQ0FBQyxBQTNERCxJQTJEQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5cbmRlY2xhcmUgdmFyIE9iamVjdDogYW55O1xuZXhwb3J0IGludGVyZmFjZSBQcm9EZmhQcm9maWxlUHJvalJlbEludGVyZmFjZSB7XG4gIFwicGtfZW50aXR5XCI/OiBudW1iZXI7XG4gIFwiZmtfcHJvZmlsZVwiOiBudW1iZXI7XG4gIFwiZmtfcHJvamVjdFwiOiBudW1iZXI7XG4gIFwiZW5hYmxlZFwiPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNsYXNzIFByb0RmaFByb2ZpbGVQcm9qUmVsIGltcGxlbWVudHMgUHJvRGZoUHJvZmlsZVByb2pSZWxJbnRlcmZhY2Uge1xuICBcInBrX2VudGl0eVwiOiBudW1iZXI7XG4gIFwiZmtfcHJvZmlsZVwiOiBudW1iZXI7XG4gIFwiZmtfcHJvamVjdFwiOiBudW1iZXI7XG4gIFwiZW5hYmxlZFwiOiBib29sZWFuO1xuICBjb25zdHJ1Y3RvcihkYXRhPzogUHJvRGZoUHJvZmlsZVByb2pSZWxJbnRlcmZhY2UpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xuICB9XG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyAkcmVzb3VyY2UsXG4gICAqIGkuZS4gYFByb0RmaFByb2ZpbGVQcm9qUmVsYC5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxOYW1lKCkge1xuICAgIHJldHVybiBcIlByb0RmaFByb2ZpbGVQcm9qUmVsXCI7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBmYWN0b3J5XG4gICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1Ymlhc1xuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIGNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgUHJvRGZoUHJvZmlsZVByb2pSZWwgZm9yIGR5bmFtaWMgcHVycG9zZXMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGZhY3RvcnkoZGF0YTogUHJvRGZoUHJvZmlsZVByb2pSZWxJbnRlcmZhY2UpOiBQcm9EZmhQcm9maWxlUHJvalJlbHtcbiAgICByZXR1cm4gbmV3IFByb0RmaFByb2ZpbGVQcm9qUmVsKGRhdGEpO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgZ2V0TW9kZWxEZWZpbml0aW9uXG4gICogQGF1dGhvciBKdWxpZW4gTGVkdW5cbiAgKiBAbGljZW5zZSBNSVRcbiAgKiBUaGlzIG1ldGhvZCByZXR1cm5zIGFuIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgc29tZSBvZiB0aGUgbW9kZWxcbiAgKiBkZWZpbml0aW9ucy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxEZWZpbml0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiAnUHJvRGZoUHJvZmlsZVByb2pSZWwnLFxuICAgICAgcGx1cmFsOiAnUHJvRGZoUHJvZmlsZVByb2pSZWxzJyxcbiAgICAgIHBhdGg6ICdQcm9EZmhQcm9maWxlUHJvalJlbHMnLFxuICAgICAgaWROYW1lOiAncGtfZW50aXR5JyxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgXCJwa19lbnRpdHlcIjoge1xuICAgICAgICAgIG5hbWU6ICdwa19lbnRpdHknLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfcHJvZmlsZVwiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX3Byb2ZpbGUnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfcHJvamVjdFwiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX3Byb2plY3QnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwiZW5hYmxlZFwiOiB7XG4gICAgICAgICAgbmFtZTogJ2VuYWJsZWQnLFxuICAgICAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlbGF0aW9uczoge1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19