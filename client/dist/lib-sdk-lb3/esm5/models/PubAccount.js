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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHViQWNjb3VudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc2RrLWxiMy8iLCJzb3VyY2VzIjpbIm1vZGVscy9QdWJBY2NvdW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG9CQUFvQjtBQWFwQjtJQVFFLG9CQUFZLElBQTBCO1FBQ3BDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRDs7O09BR0c7SUFDVyx1QkFBWSxHQUExQjtRQUNFLE9BQU8sWUFBWSxDQUFDO0lBQ3RCLENBQUM7SUFDRDs7Ozs7T0FLRztJQUNXLGtCQUFPLEdBQXJCLFVBQXNCLElBQXlCO1FBQzdDLE9BQU8sSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUNEOzs7Ozs7T0FNRztJQUNXLDZCQUFrQixHQUFoQztRQUNFLE9BQU87WUFDTCxJQUFJLEVBQUUsWUFBWTtZQUNsQixNQUFNLEVBQUUsYUFBYTtZQUNyQixJQUFJLEVBQUUsYUFBYTtZQUNuQixNQUFNLEVBQUUsSUFBSTtZQUNaLFVBQVUsRUFBRTtnQkFDVixJQUFJLEVBQUU7b0JBQ0osSUFBSSxFQUFFLElBQUk7b0JBQ1YsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLElBQUksRUFBRSxPQUFPO29CQUNiLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELFVBQVUsRUFBRTtvQkFDVixJQUFJLEVBQUUsVUFBVTtvQkFDaEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLElBQUksRUFBRSxPQUFPO29CQUNiLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELGVBQWUsRUFBRTtvQkFDZixJQUFJLEVBQUUsZUFBZTtvQkFDckIsSUFBSSxFQUFFLFNBQVM7aUJBQ2hCO2FBQ0Y7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsWUFBWSxFQUFFO29CQUNaLElBQUksRUFBRSxjQUFjO29CQUNwQixJQUFJLEVBQUUsT0FBTztvQkFDYixLQUFLLEVBQUUsRUFBRTtvQkFDVCxZQUFZLEVBQUUsU0FBUztvQkFDZixPQUFPLEVBQUUsSUFBSTtvQkFDckIsS0FBSyxFQUFFLFFBQVE7aUJBQ2hCO2dCQUNELFFBQVEsRUFBRTtvQkFDUixJQUFJLEVBQUUsVUFBVTtvQkFDaEIsSUFBSSxFQUFFLE9BQU87b0JBQ2IsS0FBSyxFQUFFLEVBQUU7b0JBQ1QsWUFBWSxFQUFFLFNBQVM7b0JBQ3ZCLFlBQVksRUFBRSxzQkFBc0I7b0JBQ3BDLFVBQVUsRUFBRSxZQUFZO29CQUN4QixPQUFPLEVBQUUsSUFBSTtvQkFDYixLQUFLLEVBQUUsWUFBWTtpQkFDcEI7YUFDRjtTQUNGLENBQUE7SUFDSCxDQUFDO0lBQ0gsaUJBQUM7QUFBRCxDQUFDLEFBcEZELElBb0ZDIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cblxuZGVjbGFyZSB2YXIgT2JqZWN0OiBhbnk7XG5leHBvcnQgaW50ZXJmYWNlIFB1YkFjY291bnRJbnRlcmZhY2Uge1xuICBcImlkXCI/OiBudW1iZXI7XG4gIFwicmVhbG1cIj86IHN0cmluZztcbiAgXCJ1c2VybmFtZVwiPzogc3RyaW5nO1xuICBcImVtYWlsXCI6IHN0cmluZztcbiAgXCJlbWFpbFZlcmlmaWVkXCI/OiBib29sZWFuO1xuICBhY2Nlc3NUb2tlbnM/OiBhbnlbXTtcbiAgcHJvamVjdHM/OiBhbnlbXTtcbn1cblxuZXhwb3J0IGNsYXNzIFB1YkFjY291bnQgaW1wbGVtZW50cyBQdWJBY2NvdW50SW50ZXJmYWNlIHtcbiAgXCJpZFwiOiBudW1iZXI7XG4gIFwicmVhbG1cIjogc3RyaW5nO1xuICBcInVzZXJuYW1lXCI6IHN0cmluZztcbiAgXCJlbWFpbFwiOiBzdHJpbmc7XG4gIFwiZW1haWxWZXJpZmllZFwiOiBib29sZWFuO1xuICBhY2Nlc3NUb2tlbnM/OiBhbnlbXTtcbiAgcHJvamVjdHM/OiBhbnlbXTtcbiAgY29uc3RydWN0b3IoZGF0YT86IFB1YkFjY291bnRJbnRlcmZhY2UpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xuICB9XG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyAkcmVzb3VyY2UsXG4gICAqIGkuZS4gYFB1YkFjY291bnRgLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbE5hbWUoKSB7XG4gICAgcmV0dXJuIFwiUHViQWNjb3VudFwiO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgZmFjdG9yeVxuICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXNcbiAgKiBAbGljZW5zZSBNSVRcbiAgKiBUaGlzIG1ldGhvZCBjcmVhdGVzIGFuIGluc3RhbmNlIG9mIFB1YkFjY291bnQgZm9yIGR5bmFtaWMgcHVycG9zZXMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGZhY3RvcnkoZGF0YTogUHViQWNjb3VudEludGVyZmFjZSk6IFB1YkFjY291bnR7XG4gICAgcmV0dXJuIG5ldyBQdWJBY2NvdW50KGRhdGEpO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgZ2V0TW9kZWxEZWZpbml0aW9uXG4gICogQGF1dGhvciBKdWxpZW4gTGVkdW5cbiAgKiBAbGljZW5zZSBNSVRcbiAgKiBUaGlzIG1ldGhvZCByZXR1cm5zIGFuIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgc29tZSBvZiB0aGUgbW9kZWxcbiAgKiBkZWZpbml0aW9ucy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxEZWZpbml0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiAnUHViQWNjb3VudCcsXG4gICAgICBwbHVyYWw6ICdQdWJBY2NvdW50cycsXG4gICAgICBwYXRoOiAnUHViQWNjb3VudHMnLFxuICAgICAgaWROYW1lOiAnaWQnLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBcImlkXCI6IHtcbiAgICAgICAgICBuYW1lOiAnaWQnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwicmVhbG1cIjoge1xuICAgICAgICAgIG5hbWU6ICdyZWFsbScsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgXCJ1c2VybmFtZVwiOiB7XG4gICAgICAgICAgbmFtZTogJ3VzZXJuYW1lJyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBcImVtYWlsXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZW1haWwnLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwiZW1haWxWZXJpZmllZFwiOiB7XG4gICAgICAgICAgbmFtZTogJ2VtYWlsVmVyaWZpZWQnLFxuICAgICAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlbGF0aW9uczoge1xuICAgICAgICBhY2Nlc3NUb2tlbnM6IHtcbiAgICAgICAgICBuYW1lOiAnYWNjZXNzVG9rZW5zJyxcbiAgICAgICAgICB0eXBlOiAnYW55W10nLFxuICAgICAgICAgIG1vZGVsOiAnJyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdoYXNNYW55JyxcbiAgICAgICAgICAgICAgICAgIGtleUZyb206ICdpZCcsXG4gICAgICAgICAga2V5VG86ICd1c2VySWQnXG4gICAgICAgIH0sXG4gICAgICAgIHByb2plY3RzOiB7XG4gICAgICAgICAgbmFtZTogJ3Byb2plY3RzJyxcbiAgICAgICAgICB0eXBlOiAnYW55W10nLFxuICAgICAgICAgIG1vZGVsOiAnJyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdoYXNNYW55JyxcbiAgICAgICAgICBtb2RlbFRocm91Z2g6ICdQdWJBY2NvdW50UHJvamVjdFJlbCcsXG4gICAgICAgICAga2V5VGhyb3VnaDogJ2ZrX3Byb2plY3QnLFxuICAgICAgICAgIGtleUZyb206ICdpZCcsXG4gICAgICAgICAga2V5VG86ICdhY2NvdW50X2lkJ1xuICAgICAgICB9LFxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19