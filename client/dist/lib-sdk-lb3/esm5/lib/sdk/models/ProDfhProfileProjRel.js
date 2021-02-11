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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvRGZoUHJvZmlsZVByb2pSZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNkay1sYjMvIiwic291cmNlcyI6WyJsaWIvc2RrL21vZGVscy9Qcm9EZmhQcm9maWxlUHJvalJlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxvQkFBb0I7QUFVcEI7SUFLRSw4QkFBWSxJQUFvQztRQUM5QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0Q7OztPQUdHO0lBQ1csaUNBQVksR0FBMUI7UUFDRSxPQUFPLHNCQUFzQixDQUFDO0lBQ2hDLENBQUM7SUFDRDs7Ozs7T0FLRztJQUNXLDRCQUFPLEdBQXJCLFVBQXNCLElBQW1DO1FBQ3ZELE9BQU8sSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ1csdUNBQWtCLEdBQWhDO1FBQ0UsT0FBTztZQUNMLElBQUksRUFBRSxzQkFBc0I7WUFDNUIsTUFBTSxFQUFFLHVCQUF1QjtZQUMvQixJQUFJLEVBQUUsdUJBQXVCO1lBQzdCLE1BQU0sRUFBRSxXQUFXO1lBQ25CLFVBQVUsRUFBRTtnQkFDVixXQUFXLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELFlBQVksRUFBRTtvQkFDWixJQUFJLEVBQUUsWUFBWTtvQkFDbEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLElBQUksRUFBRSxZQUFZO29CQUNsQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1QsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsSUFBSSxFQUFFLFNBQVM7aUJBQ2hCO2FBQ0Y7WUFDRCxTQUFTLEVBQUUsRUFDVjtTQUNGLENBQUE7SUFDSCxDQUFDO0lBQ0gsMkJBQUM7QUFBRCxDQUFDLEFBM0RELElBMkRDIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cblxuZGVjbGFyZSB2YXIgT2JqZWN0OiBhbnk7XG5leHBvcnQgaW50ZXJmYWNlIFByb0RmaFByb2ZpbGVQcm9qUmVsSW50ZXJmYWNlIHtcbiAgXCJwa19lbnRpdHlcIj86IG51bWJlcjtcbiAgXCJma19wcm9maWxlXCI6IG51bWJlcjtcbiAgXCJma19wcm9qZWN0XCI6IG51bWJlcjtcbiAgXCJlbmFibGVkXCI/OiBib29sZWFuO1xufVxuXG5leHBvcnQgY2xhc3MgUHJvRGZoUHJvZmlsZVByb2pSZWwgaW1wbGVtZW50cyBQcm9EZmhQcm9maWxlUHJvalJlbEludGVyZmFjZSB7XG4gIFwicGtfZW50aXR5XCI6IG51bWJlcjtcbiAgXCJma19wcm9maWxlXCI6IG51bWJlcjtcbiAgXCJma19wcm9qZWN0XCI6IG51bWJlcjtcbiAgXCJlbmFibGVkXCI6IGJvb2xlYW47XG4gIGNvbnN0cnVjdG9yKGRhdGE/OiBQcm9EZmhQcm9maWxlUHJvalJlbEludGVyZmFjZSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG4gIH1cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBtb2RlbCByZXByZXNlbnRlZCBieSB0aGlzICRyZXNvdXJjZSxcbiAgICogaS5lLiBgUHJvRGZoUHJvZmlsZVByb2pSZWxgLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbE5hbWUoKSB7XG4gICAgcmV0dXJuIFwiUHJvRGZoUHJvZmlsZVByb2pSZWxcIjtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGZhY3RvcnlcbiAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgY3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBQcm9EZmhQcm9maWxlUHJvalJlbCBmb3IgZHluYW1pYyBwdXJwb3Nlcy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0aWMgZmFjdG9yeShkYXRhOiBQcm9EZmhQcm9maWxlUHJvalJlbEludGVyZmFjZSk6IFByb0RmaFByb2ZpbGVQcm9qUmVse1xuICAgIHJldHVybiBuZXcgUHJvRGZoUHJvZmlsZVByb2pSZWwoZGF0YSk7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBnZXRNb2RlbERlZmluaXRpb25cbiAgKiBAYXV0aG9yIEp1bGllbiBMZWR1blxuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIHJldHVybnMgYW4gb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBzb21lIG9mIHRoZSBtb2RlbFxuICAqIGRlZmluaXRpb25zLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbERlZmluaXRpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6ICdQcm9EZmhQcm9maWxlUHJvalJlbCcsXG4gICAgICBwbHVyYWw6ICdQcm9EZmhQcm9maWxlUHJvalJlbHMnLFxuICAgICAgcGF0aDogJ1Byb0RmaFByb2ZpbGVQcm9qUmVscycsXG4gICAgICBpZE5hbWU6ICdwa19lbnRpdHknLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBcInBrX2VudGl0eVwiOiB7XG4gICAgICAgICAgbmFtZTogJ3BrX2VudGl0eScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJma19wcm9maWxlXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfcHJvZmlsZScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJma19wcm9qZWN0XCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfcHJvamVjdCcsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJlbmFibGVkXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZW5hYmxlZCcsXG4gICAgICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVsYXRpb25zOiB7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=