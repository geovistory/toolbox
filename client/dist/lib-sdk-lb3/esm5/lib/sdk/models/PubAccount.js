/* tslint:disable */
var PubAccount = /** @class */ (function () {
    function PubAccount(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `PubAccount`.
     */
    PubAccount.getModelName = function () {
        return "PubAccount";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of PubAccount for dynamic purposes.
    **/
    PubAccount.factory = function (data) {
        return new PubAccount(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    PubAccount.getModelDefinition = function () {
        return {
            name: 'PubAccount',
            plural: 'PubAccounts',
            path: 'PubAccounts',
            idName: 'id',
            properties: {
                "id": {
                    name: 'id',
                    type: 'number'
                },
                "realm": {
                    name: 'realm',
                    type: 'string'
                },
                "username": {
                    name: 'username',
                    type: 'string'
                },
                "email": {
                    name: 'email',
                    type: 'string'
                },
                "emailVerified": {
                    name: 'emailVerified',
                    type: 'boolean'
                },
            },
            relations: {
                accessTokens: {
                    name: 'accessTokens',
                    type: 'any[]',
                    model: '',
                    relationType: 'hasMany',
                    keyFrom: 'id',
                    keyTo: 'userId'
                },
                projects: {
                    name: 'projects',
                    type: 'any[]',
                    model: '',
                    relationType: 'hasMany',
                    modelThrough: 'PubAccountProjectRel',
                    keyThrough: 'fk_project',
                    keyFrom: 'id',
                    keyTo: 'account_id'
                },
            }
        };
    };
    return PubAccount;
}());
export { PubAccount };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHViQWNjb3VudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc2RrLWxiMy8iLCJzb3VyY2VzIjpbImxpYi9zZGsvbW9kZWxzL1B1YkFjY291bnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0JBQW9CO0FBYXBCO0lBUUUsb0JBQVksSUFBMEI7UUFDcEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNEOzs7T0FHRztJQUNXLHVCQUFZLEdBQTFCO1FBQ0UsT0FBTyxZQUFZLENBQUM7SUFDdEIsQ0FBQztJQUNEOzs7OztPQUtHO0lBQ1csa0JBQU8sR0FBckIsVUFBc0IsSUFBeUI7UUFDN0MsT0FBTyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ1csNkJBQWtCLEdBQWhDO1FBQ0UsT0FBTztZQUNMLElBQUksRUFBRSxZQUFZO1lBQ2xCLE1BQU0sRUFBRSxhQUFhO1lBQ3JCLElBQUksRUFBRSxhQUFhO1lBQ25CLE1BQU0sRUFBRSxJQUFJO1lBQ1osVUFBVSxFQUFFO2dCQUNWLElBQUksRUFBRTtvQkFDSixJQUFJLEVBQUUsSUFBSTtvQkFDVixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsSUFBSSxFQUFFLE9BQU87b0JBQ2IsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsVUFBVSxFQUFFO29CQUNWLElBQUksRUFBRSxVQUFVO29CQUNoQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsSUFBSSxFQUFFLE9BQU87b0JBQ2IsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsZUFBZSxFQUFFO29CQUNmLElBQUksRUFBRSxlQUFlO29CQUNyQixJQUFJLEVBQUUsU0FBUztpQkFDaEI7YUFDRjtZQUNELFNBQVMsRUFBRTtnQkFDVCxZQUFZLEVBQUU7b0JBQ1osSUFBSSxFQUFFLGNBQWM7b0JBQ3BCLElBQUksRUFBRSxPQUFPO29CQUNiLEtBQUssRUFBRSxFQUFFO29CQUNULFlBQVksRUFBRSxTQUFTO29CQUNmLE9BQU8sRUFBRSxJQUFJO29CQUNyQixLQUFLLEVBQUUsUUFBUTtpQkFDaEI7Z0JBQ0QsUUFBUSxFQUFFO29CQUNSLElBQUksRUFBRSxVQUFVO29CQUNoQixJQUFJLEVBQUUsT0FBTztvQkFDYixLQUFLLEVBQUUsRUFBRTtvQkFDVCxZQUFZLEVBQUUsU0FBUztvQkFDdkIsWUFBWSxFQUFFLHNCQUFzQjtvQkFDcEMsVUFBVSxFQUFFLFlBQVk7b0JBQ3hCLE9BQU8sRUFBRSxJQUFJO29CQUNiLEtBQUssRUFBRSxZQUFZO2lCQUNwQjthQUNGO1NBQ0YsQ0FBQTtJQUNILENBQUM7SUFDSCxpQkFBQztBQUFELENBQUMsQUFwRkQsSUFvRkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuXG5kZWNsYXJlIHZhciBPYmplY3Q6IGFueTtcbmV4cG9ydCBpbnRlcmZhY2UgUHViQWNjb3VudEludGVyZmFjZSB7XG4gIFwiaWRcIj86IG51bWJlcjtcbiAgXCJyZWFsbVwiPzogc3RyaW5nO1xuICBcInVzZXJuYW1lXCI/OiBzdHJpbmc7XG4gIFwiZW1haWxcIjogc3RyaW5nO1xuICBcImVtYWlsVmVyaWZpZWRcIj86IGJvb2xlYW47XG4gIGFjY2Vzc1Rva2Vucz86IGFueVtdO1xuICBwcm9qZWN0cz86IGFueVtdO1xufVxuXG5leHBvcnQgY2xhc3MgUHViQWNjb3VudCBpbXBsZW1lbnRzIFB1YkFjY291bnRJbnRlcmZhY2Uge1xuICBcImlkXCI6IG51bWJlcjtcbiAgXCJyZWFsbVwiOiBzdHJpbmc7XG4gIFwidXNlcm5hbWVcIjogc3RyaW5nO1xuICBcImVtYWlsXCI6IHN0cmluZztcbiAgXCJlbWFpbFZlcmlmaWVkXCI6IGJvb2xlYW47XG4gIGFjY2Vzc1Rva2Vucz86IGFueVtdO1xuICBwcm9qZWN0cz86IGFueVtdO1xuICBjb25zdHJ1Y3RvcihkYXRhPzogUHViQWNjb3VudEludGVyZmFjZSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG4gIH1cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBtb2RlbCByZXByZXNlbnRlZCBieSB0aGlzICRyZXNvdXJjZSxcbiAgICogaS5lLiBgUHViQWNjb3VudGAuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsTmFtZSgpIHtcbiAgICByZXR1cm4gXCJQdWJBY2NvdW50XCI7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBmYWN0b3J5XG4gICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1Ymlhc1xuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIGNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgUHViQWNjb3VudCBmb3IgZHluYW1pYyBwdXJwb3Nlcy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0aWMgZmFjdG9yeShkYXRhOiBQdWJBY2NvdW50SW50ZXJmYWNlKTogUHViQWNjb3VudHtcbiAgICByZXR1cm4gbmV3IFB1YkFjY291bnQoZGF0YSk7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBnZXRNb2RlbERlZmluaXRpb25cbiAgKiBAYXV0aG9yIEp1bGllbiBMZWR1blxuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIHJldHVybnMgYW4gb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBzb21lIG9mIHRoZSBtb2RlbFxuICAqIGRlZmluaXRpb25zLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbERlZmluaXRpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6ICdQdWJBY2NvdW50JyxcbiAgICAgIHBsdXJhbDogJ1B1YkFjY291bnRzJyxcbiAgICAgIHBhdGg6ICdQdWJBY2NvdW50cycsXG4gICAgICBpZE5hbWU6ICdpZCcsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIFwiaWRcIjoge1xuICAgICAgICAgIG5hbWU6ICdpZCcsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJyZWFsbVwiOiB7XG4gICAgICAgICAgbmFtZTogJ3JlYWxtJyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBcInVzZXJuYW1lXCI6IHtcbiAgICAgICAgICBuYW1lOiAndXNlcm5hbWUnLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwiZW1haWxcIjoge1xuICAgICAgICAgIG5hbWU6ICdlbWFpbCcsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgXCJlbWFpbFZlcmlmaWVkXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZW1haWxWZXJpZmllZCcsXG4gICAgICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVsYXRpb25zOiB7XG4gICAgICAgIGFjY2Vzc1Rva2Vuczoge1xuICAgICAgICAgIG5hbWU6ICdhY2Nlc3NUb2tlbnMnLFxuICAgICAgICAgIHR5cGU6ICdhbnlbXScsXG4gICAgICAgICAgbW9kZWw6ICcnLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2hhc01hbnknLFxuICAgICAgICAgICAgICAgICAga2V5RnJvbTogJ2lkJyxcbiAgICAgICAgICBrZXlUbzogJ3VzZXJJZCdcbiAgICAgICAgfSxcbiAgICAgICAgcHJvamVjdHM6IHtcbiAgICAgICAgICBuYW1lOiAncHJvamVjdHMnLFxuICAgICAgICAgIHR5cGU6ICdhbnlbXScsXG4gICAgICAgICAgbW9kZWw6ICcnLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2hhc01hbnknLFxuICAgICAgICAgIG1vZGVsVGhyb3VnaDogJ1B1YkFjY291bnRQcm9qZWN0UmVsJyxcbiAgICAgICAgICBrZXlUaHJvdWdoOiAnZmtfcHJvamVjdCcsXG4gICAgICAgICAga2V5RnJvbTogJ2lkJyxcbiAgICAgICAgICBrZXlUbzogJ2FjY291bnRfaWQnXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=