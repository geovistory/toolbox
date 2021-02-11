var PubAccountProjectRel = /** @class */ (function () {
    function PubAccountProjectRel(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `PubAccountProjectRel`.
     */
    PubAccountProjectRel.getModelName = function () {
        return "PubAccountProjectRel";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of PubAccountProjectRel for dynamic purposes.
    **/
    PubAccountProjectRel.factory = function (data) {
        return new PubAccountProjectRel(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    PubAccountProjectRel.getModelDefinition = function () {
        return {
            name: 'PubAccountProjectRel',
            plural: 'PubAccountProjectRels',
            path: 'PubAccountProjectRels',
            idName: 'id',
            properties: {
                "role": {
                    name: 'role',
                    type: 'string',
                    default: 'admin'
                },
                "fk_project": {
                    name: 'fk_project',
                    type: 'number'
                },
                "account_id": {
                    name: 'account_id',
                    type: 'number'
                },
                "id": {
                    name: 'id',
                    type: 'number'
                },
            },
            relations: {
                account: {
                    name: 'account',
                    type: 'PubAccount',
                    model: 'PubAccount',
                    relationType: 'belongsTo',
                    keyFrom: 'account_id',
                    keyTo: 'id'
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
    return PubAccountProjectRel;
}());
export { PubAccountProjectRel };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHViQWNjb3VudFByb2plY3RSZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNkay1sYjMvIiwic291cmNlcyI6WyJtb2RlbHMvUHViQWNjb3VudFByb2plY3RSZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZ0JBO0lBT0UsOEJBQVksSUFBb0M7UUFDOUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNEOzs7T0FHRztJQUNXLGlDQUFZLEdBQTFCO1FBQ0UsT0FBTyxzQkFBc0IsQ0FBQztJQUNoQyxDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFDVyw0QkFBTyxHQUFyQixVQUFzQixJQUFtQztRQUN2RCxPQUFPLElBQUksb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUNEOzs7Ozs7T0FNRztJQUNXLHVDQUFrQixHQUFoQztRQUNFLE9BQU87WUFDTCxJQUFJLEVBQUUsc0JBQXNCO1lBQzVCLE1BQU0sRUFBRSx1QkFBdUI7WUFDL0IsSUFBSSxFQUFFLHVCQUF1QjtZQUM3QixNQUFNLEVBQUUsSUFBSTtZQUNaLFVBQVUsRUFBRTtnQkFDVixNQUFNLEVBQUU7b0JBQ04sSUFBSSxFQUFFLE1BQU07b0JBQ1osSUFBSSxFQUFFLFFBQVE7b0JBQ2QsT0FBTyxFQUFFLE9BQU87aUJBQ2pCO2dCQUNELFlBQVksRUFBRTtvQkFDWixJQUFJLEVBQUUsWUFBWTtvQkFDbEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLElBQUksRUFBRSxZQUFZO29CQUNsQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxJQUFJLEVBQUU7b0JBQ0osSUFBSSxFQUFFLElBQUk7b0JBQ1YsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7YUFDRjtZQUNELFNBQVMsRUFBRTtnQkFDVCxPQUFPLEVBQUU7b0JBQ1AsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsSUFBSSxFQUFFLFlBQVk7b0JBQ2xCLEtBQUssRUFBRSxZQUFZO29CQUNuQixZQUFZLEVBQUUsV0FBVztvQkFDakIsT0FBTyxFQUFFLFlBQVk7b0JBQzdCLEtBQUssRUFBRSxJQUFJO2lCQUNaO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxJQUFJLEVBQUUsU0FBUztvQkFDZixJQUFJLEVBQUUsWUFBWTtvQkFDbEIsS0FBSyxFQUFFLFlBQVk7b0JBQ25CLFlBQVksRUFBRSxXQUFXO29CQUNqQixPQUFPLEVBQUUsWUFBWTtvQkFDN0IsS0FBSyxFQUFFLFdBQVc7aUJBQ25CO2FBQ0Y7U0FDRixDQUFBO0lBQ0gsQ0FBQztJQUNILDJCQUFDO0FBQUQsQ0FBQyxBQTlFRCxJQThFQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5pbXBvcnQge1xuICBQdWJBY2NvdW50LFxuICBQcm9Qcm9qZWN0XG59IGZyb20gJy4uL2luZGV4JztcblxuZGVjbGFyZSB2YXIgT2JqZWN0OiBhbnk7XG5leHBvcnQgaW50ZXJmYWNlIFB1YkFjY291bnRQcm9qZWN0UmVsSW50ZXJmYWNlIHtcbiAgXCJyb2xlXCI6IHN0cmluZztcbiAgXCJma19wcm9qZWN0XCI6IG51bWJlcjtcbiAgXCJhY2NvdW50X2lkXCI/OiBudW1iZXI7XG4gIFwiaWRcIj86IG51bWJlcjtcbiAgYWNjb3VudD86IFB1YkFjY291bnQ7XG4gIHByb2plY3Q/OiBQcm9Qcm9qZWN0O1xufVxuXG5leHBvcnQgY2xhc3MgUHViQWNjb3VudFByb2plY3RSZWwgaW1wbGVtZW50cyBQdWJBY2NvdW50UHJvamVjdFJlbEludGVyZmFjZSB7XG4gIFwicm9sZVwiOiBzdHJpbmc7XG4gIFwiZmtfcHJvamVjdFwiOiBudW1iZXI7XG4gIFwiYWNjb3VudF9pZFwiOiBudW1iZXI7XG4gIFwiaWRcIjogbnVtYmVyO1xuICBhY2NvdW50PzogUHViQWNjb3VudDtcbiAgcHJvamVjdD86IFByb1Byb2plY3Q7XG4gIGNvbnN0cnVjdG9yKGRhdGE/OiBQdWJBY2NvdW50UHJvamVjdFJlbEludGVyZmFjZSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG4gIH1cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBtb2RlbCByZXByZXNlbnRlZCBieSB0aGlzICRyZXNvdXJjZSxcbiAgICogaS5lLiBgUHViQWNjb3VudFByb2plY3RSZWxgLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbE5hbWUoKSB7XG4gICAgcmV0dXJuIFwiUHViQWNjb3VudFByb2plY3RSZWxcIjtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGZhY3RvcnlcbiAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgY3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBQdWJBY2NvdW50UHJvamVjdFJlbCBmb3IgZHluYW1pYyBwdXJwb3Nlcy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0aWMgZmFjdG9yeShkYXRhOiBQdWJBY2NvdW50UHJvamVjdFJlbEludGVyZmFjZSk6IFB1YkFjY291bnRQcm9qZWN0UmVse1xuICAgIHJldHVybiBuZXcgUHViQWNjb3VudFByb2plY3RSZWwoZGF0YSk7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBnZXRNb2RlbERlZmluaXRpb25cbiAgKiBAYXV0aG9yIEp1bGllbiBMZWR1blxuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIHJldHVybnMgYW4gb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBzb21lIG9mIHRoZSBtb2RlbFxuICAqIGRlZmluaXRpb25zLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbERlZmluaXRpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6ICdQdWJBY2NvdW50UHJvamVjdFJlbCcsXG4gICAgICBwbHVyYWw6ICdQdWJBY2NvdW50UHJvamVjdFJlbHMnLFxuICAgICAgcGF0aDogJ1B1YkFjY291bnRQcm9qZWN0UmVscycsXG4gICAgICBpZE5hbWU6ICdpZCcsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIFwicm9sZVwiOiB7XG4gICAgICAgICAgbmFtZTogJ3JvbGUnLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgIGRlZmF1bHQ6ICdhZG1pbidcbiAgICAgICAgfSxcbiAgICAgICAgXCJma19wcm9qZWN0XCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfcHJvamVjdCcsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJhY2NvdW50X2lkXCI6IHtcbiAgICAgICAgICBuYW1lOiAnYWNjb3VudF9pZCcsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJpZFwiOiB7XG4gICAgICAgICAgbmFtZTogJ2lkJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlbGF0aW9uczoge1xuICAgICAgICBhY2NvdW50OiB7XG4gICAgICAgICAgbmFtZTogJ2FjY291bnQnLFxuICAgICAgICAgIHR5cGU6ICdQdWJBY2NvdW50JyxcbiAgICAgICAgICBtb2RlbDogJ1B1YkFjY291bnQnLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2JlbG9uZ3NUbycsXG4gICAgICAgICAgICAgICAgICBrZXlGcm9tOiAnYWNjb3VudF9pZCcsXG4gICAgICAgICAga2V5VG86ICdpZCdcbiAgICAgICAgfSxcbiAgICAgICAgcHJvamVjdDoge1xuICAgICAgICAgIG5hbWU6ICdwcm9qZWN0JyxcbiAgICAgICAgICB0eXBlOiAnUHJvUHJvamVjdCcsXG4gICAgICAgICAgbW9kZWw6ICdQcm9Qcm9qZWN0JyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdiZWxvbmdzVG8nLFxuICAgICAgICAgICAgICAgICAga2V5RnJvbTogJ2ZrX3Byb2plY3QnLFxuICAgICAgICAgIGtleVRvOiAncGtfZW50aXR5J1xuICAgICAgICB9LFxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19