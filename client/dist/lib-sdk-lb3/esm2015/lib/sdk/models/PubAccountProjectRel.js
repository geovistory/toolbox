export class PubAccountProjectRel {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `PubAccountProjectRel`.
     */
    static getModelName() {
        return "PubAccountProjectRel";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of PubAccountProjectRel for dynamic purposes.
    **/
    static factory(data) {
        return new PubAccountProjectRel(data);
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
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHViQWNjb3VudFByb2plY3RSZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNkay1sYjMvIiwic291cmNlcyI6WyJsaWIvc2RrL21vZGVscy9QdWJBY2NvdW50UHJvamVjdFJlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFnQkEsTUFBTSxPQUFPLG9CQUFvQjtJQU8vQixZQUFZLElBQW9DO1FBQzlDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsWUFBWTtRQUN4QixPQUFPLHNCQUFzQixDQUFDO0lBQ2hDLENBQUM7SUFDRDs7Ozs7T0FLRztJQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBbUM7UUFDdkQsT0FBTyxJQUFJLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFDRDs7Ozs7O09BTUc7SUFDSSxNQUFNLENBQUMsa0JBQWtCO1FBQzlCLE9BQU87WUFDTCxJQUFJLEVBQUUsc0JBQXNCO1lBQzVCLE1BQU0sRUFBRSx1QkFBdUI7WUFDL0IsSUFBSSxFQUFFLHVCQUF1QjtZQUM3QixNQUFNLEVBQUUsSUFBSTtZQUNaLFVBQVUsRUFBRTtnQkFDVixNQUFNLEVBQUU7b0JBQ04sSUFBSSxFQUFFLE1BQU07b0JBQ1osSUFBSSxFQUFFLFFBQVE7b0JBQ2QsT0FBTyxFQUFFLE9BQU87aUJBQ2pCO2dCQUNELFlBQVksRUFBRTtvQkFDWixJQUFJLEVBQUUsWUFBWTtvQkFDbEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLElBQUksRUFBRSxZQUFZO29CQUNsQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxJQUFJLEVBQUU7b0JBQ0osSUFBSSxFQUFFLElBQUk7b0JBQ1YsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7YUFDRjtZQUNELFNBQVMsRUFBRTtnQkFDVCxPQUFPLEVBQUU7b0JBQ1AsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsSUFBSSxFQUFFLFlBQVk7b0JBQ2xCLEtBQUssRUFBRSxZQUFZO29CQUNuQixZQUFZLEVBQUUsV0FBVztvQkFDakIsT0FBTyxFQUFFLFlBQVk7b0JBQzdCLEtBQUssRUFBRSxJQUFJO2lCQUNaO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxJQUFJLEVBQUUsU0FBUztvQkFDZixJQUFJLEVBQUUsWUFBWTtvQkFDbEIsS0FBSyxFQUFFLFlBQVk7b0JBQ25CLFlBQVksRUFBRSxXQUFXO29CQUNqQixPQUFPLEVBQUUsWUFBWTtvQkFDN0IsS0FBSyxFQUFFLFdBQVc7aUJBQ25CO2FBQ0Y7U0FDRixDQUFBO0lBQ0gsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cbmltcG9ydCB7XG4gIFB1YkFjY291bnQsXG4gIFByb1Byb2plY3Rcbn0gZnJvbSAnLi4vaW5kZXgnO1xuXG5kZWNsYXJlIHZhciBPYmplY3Q6IGFueTtcbmV4cG9ydCBpbnRlcmZhY2UgUHViQWNjb3VudFByb2plY3RSZWxJbnRlcmZhY2Uge1xuICBcInJvbGVcIjogc3RyaW5nO1xuICBcImZrX3Byb2plY3RcIjogbnVtYmVyO1xuICBcImFjY291bnRfaWRcIj86IG51bWJlcjtcbiAgXCJpZFwiPzogbnVtYmVyO1xuICBhY2NvdW50PzogUHViQWNjb3VudDtcbiAgcHJvamVjdD86IFByb1Byb2plY3Q7XG59XG5cbmV4cG9ydCBjbGFzcyBQdWJBY2NvdW50UHJvamVjdFJlbCBpbXBsZW1lbnRzIFB1YkFjY291bnRQcm9qZWN0UmVsSW50ZXJmYWNlIHtcbiAgXCJyb2xlXCI6IHN0cmluZztcbiAgXCJma19wcm9qZWN0XCI6IG51bWJlcjtcbiAgXCJhY2NvdW50X2lkXCI6IG51bWJlcjtcbiAgXCJpZFwiOiBudW1iZXI7XG4gIGFjY291bnQ/OiBQdWJBY2NvdW50O1xuICBwcm9qZWN0PzogUHJvUHJvamVjdDtcbiAgY29uc3RydWN0b3IoZGF0YT86IFB1YkFjY291bnRQcm9qZWN0UmVsSW50ZXJmYWNlKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgfVxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxuICAgKiBpLmUuIGBQdWJBY2NvdW50UHJvamVjdFJlbGAuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsTmFtZSgpIHtcbiAgICByZXR1cm4gXCJQdWJBY2NvdW50UHJvamVjdFJlbFwiO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgZmFjdG9yeVxuICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXNcbiAgKiBAbGljZW5zZSBNSVRcbiAgKiBUaGlzIG1ldGhvZCBjcmVhdGVzIGFuIGluc3RhbmNlIG9mIFB1YkFjY291bnRQcm9qZWN0UmVsIGZvciBkeW5hbWljIHB1cnBvc2VzLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBmYWN0b3J5KGRhdGE6IFB1YkFjY291bnRQcm9qZWN0UmVsSW50ZXJmYWNlKTogUHViQWNjb3VudFByb2plY3RSZWx7XG4gICAgcmV0dXJuIG5ldyBQdWJBY2NvdW50UHJvamVjdFJlbChkYXRhKTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGdldE1vZGVsRGVmaW5pdGlvblxuICAqIEBhdXRob3IgSnVsaWVuIExlZHVuXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgcmV0dXJucyBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIHNvbWUgb2YgdGhlIG1vZGVsXG4gICogZGVmaW5pdGlvbnMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsRGVmaW5pdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJ1B1YkFjY291bnRQcm9qZWN0UmVsJyxcbiAgICAgIHBsdXJhbDogJ1B1YkFjY291bnRQcm9qZWN0UmVscycsXG4gICAgICBwYXRoOiAnUHViQWNjb3VudFByb2plY3RSZWxzJyxcbiAgICAgIGlkTmFtZTogJ2lkJyxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgXCJyb2xlXCI6IHtcbiAgICAgICAgICBuYW1lOiAncm9sZScsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgZGVmYXVsdDogJ2FkbWluJ1xuICAgICAgICB9LFxuICAgICAgICBcImZrX3Byb2plY3RcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19wcm9qZWN0JyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcImFjY291bnRfaWRcIjoge1xuICAgICAgICAgIG5hbWU6ICdhY2NvdW50X2lkJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcImlkXCI6IHtcbiAgICAgICAgICBuYW1lOiAnaWQnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVsYXRpb25zOiB7XG4gICAgICAgIGFjY291bnQ6IHtcbiAgICAgICAgICBuYW1lOiAnYWNjb3VudCcsXG4gICAgICAgICAgdHlwZTogJ1B1YkFjY291bnQnLFxuICAgICAgICAgIG1vZGVsOiAnUHViQWNjb3VudCcsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnYmVsb25nc1RvJyxcbiAgICAgICAgICAgICAgICAgIGtleUZyb206ICdhY2NvdW50X2lkJyxcbiAgICAgICAgICBrZXlUbzogJ2lkJ1xuICAgICAgICB9LFxuICAgICAgICBwcm9qZWN0OiB7XG4gICAgICAgICAgbmFtZTogJ3Byb2plY3QnLFxuICAgICAgICAgIHR5cGU6ICdQcm9Qcm9qZWN0JyxcbiAgICAgICAgICBtb2RlbDogJ1Byb1Byb2plY3QnLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2JlbG9uZ3NUbycsXG4gICAgICAgICAgICAgICAgICBrZXlGcm9tOiAnZmtfcHJvamVjdCcsXG4gICAgICAgICAga2V5VG86ICdwa19lbnRpdHknXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=