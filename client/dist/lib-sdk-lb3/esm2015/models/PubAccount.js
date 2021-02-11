/* tslint:disable */
export class PubAccount {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `PubAccount`.
     */
    static getModelName() {
        return "PubAccount";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of PubAccount for dynamic purposes.
    **/
    static factory(data) {
        return new PubAccount(data);
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
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHViQWNjb3VudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc2RrLWxiMy8iLCJzb3VyY2VzIjpbIm1vZGVscy9QdWJBY2NvdW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG9CQUFvQjtBQWFwQixNQUFNLE9BQU8sVUFBVTtJQVFyQixZQUFZLElBQTBCO1FBQ3BDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsWUFBWTtRQUN4QixPQUFPLFlBQVksQ0FBQztJQUN0QixDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQXlCO1FBQzdDLE9BQU8sSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUNEOzs7Ozs7T0FNRztJQUNJLE1BQU0sQ0FBQyxrQkFBa0I7UUFDOUIsT0FBTztZQUNMLElBQUksRUFBRSxZQUFZO1lBQ2xCLE1BQU0sRUFBRSxhQUFhO1lBQ3JCLElBQUksRUFBRSxhQUFhO1lBQ25CLE1BQU0sRUFBRSxJQUFJO1lBQ1osVUFBVSxFQUFFO2dCQUNWLElBQUksRUFBRTtvQkFDSixJQUFJLEVBQUUsSUFBSTtvQkFDVixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsSUFBSSxFQUFFLE9BQU87b0JBQ2IsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsVUFBVSxFQUFFO29CQUNWLElBQUksRUFBRSxVQUFVO29CQUNoQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsSUFBSSxFQUFFLE9BQU87b0JBQ2IsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsZUFBZSxFQUFFO29CQUNmLElBQUksRUFBRSxlQUFlO29CQUNyQixJQUFJLEVBQUUsU0FBUztpQkFDaEI7YUFDRjtZQUNELFNBQVMsRUFBRTtnQkFDVCxZQUFZLEVBQUU7b0JBQ1osSUFBSSxFQUFFLGNBQWM7b0JBQ3BCLElBQUksRUFBRSxPQUFPO29CQUNiLEtBQUssRUFBRSxFQUFFO29CQUNULFlBQVksRUFBRSxTQUFTO29CQUNmLE9BQU8sRUFBRSxJQUFJO29CQUNyQixLQUFLLEVBQUUsUUFBUTtpQkFDaEI7Z0JBQ0QsUUFBUSxFQUFFO29CQUNSLElBQUksRUFBRSxVQUFVO29CQUNoQixJQUFJLEVBQUUsT0FBTztvQkFDYixLQUFLLEVBQUUsRUFBRTtvQkFDVCxZQUFZLEVBQUUsU0FBUztvQkFDdkIsWUFBWSxFQUFFLHNCQUFzQjtvQkFDcEMsVUFBVSxFQUFFLFlBQVk7b0JBQ3hCLE9BQU8sRUFBRSxJQUFJO29CQUNiLEtBQUssRUFBRSxZQUFZO2lCQUNwQjthQUNGO1NBQ0YsQ0FBQTtJQUNILENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5cbmRlY2xhcmUgdmFyIE9iamVjdDogYW55O1xuZXhwb3J0IGludGVyZmFjZSBQdWJBY2NvdW50SW50ZXJmYWNlIHtcbiAgXCJpZFwiPzogbnVtYmVyO1xuICBcInJlYWxtXCI/OiBzdHJpbmc7XG4gIFwidXNlcm5hbWVcIj86IHN0cmluZztcbiAgXCJlbWFpbFwiOiBzdHJpbmc7XG4gIFwiZW1haWxWZXJpZmllZFwiPzogYm9vbGVhbjtcbiAgYWNjZXNzVG9rZW5zPzogYW55W107XG4gIHByb2plY3RzPzogYW55W107XG59XG5cbmV4cG9ydCBjbGFzcyBQdWJBY2NvdW50IGltcGxlbWVudHMgUHViQWNjb3VudEludGVyZmFjZSB7XG4gIFwiaWRcIjogbnVtYmVyO1xuICBcInJlYWxtXCI6IHN0cmluZztcbiAgXCJ1c2VybmFtZVwiOiBzdHJpbmc7XG4gIFwiZW1haWxcIjogc3RyaW5nO1xuICBcImVtYWlsVmVyaWZpZWRcIjogYm9vbGVhbjtcbiAgYWNjZXNzVG9rZW5zPzogYW55W107XG4gIHByb2plY3RzPzogYW55W107XG4gIGNvbnN0cnVjdG9yKGRhdGE/OiBQdWJBY2NvdW50SW50ZXJmYWNlKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgfVxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxuICAgKiBpLmUuIGBQdWJBY2NvdW50YC5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxOYW1lKCkge1xuICAgIHJldHVybiBcIlB1YkFjY291bnRcIjtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGZhY3RvcnlcbiAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgY3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBQdWJBY2NvdW50IGZvciBkeW5hbWljIHB1cnBvc2VzLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBmYWN0b3J5KGRhdGE6IFB1YkFjY291bnRJbnRlcmZhY2UpOiBQdWJBY2NvdW50e1xuICAgIHJldHVybiBuZXcgUHViQWNjb3VudChkYXRhKTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGdldE1vZGVsRGVmaW5pdGlvblxuICAqIEBhdXRob3IgSnVsaWVuIExlZHVuXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgcmV0dXJucyBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIHNvbWUgb2YgdGhlIG1vZGVsXG4gICogZGVmaW5pdGlvbnMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsRGVmaW5pdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJ1B1YkFjY291bnQnLFxuICAgICAgcGx1cmFsOiAnUHViQWNjb3VudHMnLFxuICAgICAgcGF0aDogJ1B1YkFjY291bnRzJyxcbiAgICAgIGlkTmFtZTogJ2lkJyxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgXCJpZFwiOiB7XG4gICAgICAgICAgbmFtZTogJ2lkJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcInJlYWxtXCI6IHtcbiAgICAgICAgICBuYW1lOiAncmVhbG0nLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwidXNlcm5hbWVcIjoge1xuICAgICAgICAgIG5hbWU6ICd1c2VybmFtZScsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgXCJlbWFpbFwiOiB7XG4gICAgICAgICAgbmFtZTogJ2VtYWlsJyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBcImVtYWlsVmVyaWZpZWRcIjoge1xuICAgICAgICAgIG5hbWU6ICdlbWFpbFZlcmlmaWVkJyxcbiAgICAgICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZWxhdGlvbnM6IHtcbiAgICAgICAgYWNjZXNzVG9rZW5zOiB7XG4gICAgICAgICAgbmFtZTogJ2FjY2Vzc1Rva2VucycsXG4gICAgICAgICAgdHlwZTogJ2FueVtdJyxcbiAgICAgICAgICBtb2RlbDogJycsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnaGFzTWFueScsXG4gICAgICAgICAgICAgICAgICBrZXlGcm9tOiAnaWQnLFxuICAgICAgICAgIGtleVRvOiAndXNlcklkJ1xuICAgICAgICB9LFxuICAgICAgICBwcm9qZWN0czoge1xuICAgICAgICAgIG5hbWU6ICdwcm9qZWN0cycsXG4gICAgICAgICAgdHlwZTogJ2FueVtdJyxcbiAgICAgICAgICBtb2RlbDogJycsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnaGFzTWFueScsXG4gICAgICAgICAgbW9kZWxUaHJvdWdoOiAnUHViQWNjb3VudFByb2plY3RSZWwnLFxuICAgICAgICAgIGtleVRocm91Z2g6ICdma19wcm9qZWN0JyxcbiAgICAgICAgICBrZXlGcm9tOiAnaWQnLFxuICAgICAgICAgIGtleVRvOiAnYWNjb3VudF9pZCdcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==