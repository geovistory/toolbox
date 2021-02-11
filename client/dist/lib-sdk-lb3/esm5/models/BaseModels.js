/* tslint:disable */
var AccessToken = /** @class */ (function () {
    function AccessToken(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `AccessToken`.
     */
    AccessToken.getModelName = function () {
        return "AccessToken";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of AccessToken for dynamic purposes.
    **/
    AccessToken.factory = function (data) {
        return new AccessToken(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    AccessToken.getModelDefinition = function () {
        return {
            name: 'AccessToken',
            plural: 'AccessTokens',
            properties: {
                "id": {
                    name: 'id',
                    type: 'string'
                },
                "ttl": {
                    name: 'ttl',
                    type: 'number',
                    default: 1209600
                },
                "scopes": {
                    name: 'scopes',
                    type: '["string"]'
                },
                "created": {
                    name: 'created',
                    type: 'Date'
                },
                "userId": {
                    name: 'userId',
                    type: 'string'
                },
            },
            relations: {
                user: {
                    name: 'user',
                    type: 'User',
                    model: 'User'
                },
            }
        };
    };
    return AccessToken;
}());
export { AccessToken };
var SDKToken = /** @class */ (function () {
    function SDKToken(data) {
        this.id = null;
        this.ttl = null;
        this.scopes = null;
        this.created = null;
        this.userId = null;
        this.user = null;
        this.rememberMe = null;
        Object.assign(this, data);
    }
    return SDKToken;
}());
export { SDKToken };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZU1vZGVscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc2RrLWxiMy8iLCJzb3VyY2VzIjpbIm1vZGVscy9CYXNlTW9kZWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG9CQUFvQjtBQXdCcEI7SUFPRSxxQkFBWSxJQUEyQjtRQUNyQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0Q7OztPQUdHO0lBQ1csd0JBQVksR0FBMUI7UUFDRSxPQUFPLGFBQWEsQ0FBQztJQUN2QixDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFDVyxtQkFBTyxHQUFyQixVQUFzQixJQUEwQjtRQUM5QyxPQUFPLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFDRDs7Ozs7O09BTUc7SUFDVyw4QkFBa0IsR0FBaEM7UUFDRSxPQUFPO1lBQ0wsSUFBSSxFQUFFLGFBQWE7WUFDbkIsTUFBTSxFQUFFLGNBQWM7WUFDdEIsVUFBVSxFQUFFO2dCQUNWLElBQUksRUFBRTtvQkFDSixJQUFJLEVBQUUsSUFBSTtvQkFDVixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxLQUFLLEVBQUU7b0JBQ0wsSUFBSSxFQUFFLEtBQUs7b0JBQ1gsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsT0FBTyxFQUFFLE9BQU87aUJBQ2pCO2dCQUNELFFBQVEsRUFBRTtvQkFDUixJQUFJLEVBQUUsUUFBUTtvQkFDZCxJQUFJLEVBQUUsWUFBWTtpQkFDbkI7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULElBQUksRUFBRSxTQUFTO29CQUNmLElBQUksRUFBRSxNQUFNO2lCQUNiO2dCQUNELFFBQVEsRUFBRTtvQkFDUixJQUFJLEVBQUUsUUFBUTtvQkFDZCxJQUFJLEVBQUUsUUFBUTtpQkFDZjthQUNGO1lBQ0QsU0FBUyxFQUFFO2dCQUNULElBQUksRUFBRTtvQkFDSixJQUFJLEVBQUUsTUFBTTtvQkFDWixJQUFJLEVBQUUsTUFBTTtvQkFDWixLQUFLLEVBQUUsTUFBTTtpQkFDZDthQUNGO1NBQ0YsQ0FBQTtJQUNILENBQUM7SUFDSCxrQkFBQztBQUFELENBQUMsQUFyRUQsSUFxRUM7O0FBRUQ7SUFRRSxrQkFBWSxJQUEyQjtRQVB2QyxPQUFFLEdBQVEsSUFBSSxDQUFDO1FBQ2YsUUFBRyxHQUFXLElBQUksQ0FBQztRQUNuQixXQUFNLEdBQVEsSUFBSSxDQUFDO1FBQ25CLFlBQU8sR0FBUSxJQUFJLENBQUM7UUFDcEIsV0FBTSxHQUFRLElBQUksQ0FBQztRQUNuQixTQUFJLEdBQVEsSUFBSSxDQUFDO1FBQ2pCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFFekIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNILGVBQUM7QUFBRCxDQUFDLEFBWEQsSUFXQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5cblxuXG5kZWNsYXJlIHZhciBPYmplY3Q6IGFueTtcbmV4cG9ydCBpbnRlcmZhY2UgTG9vcEJhY2tGaWx0ZXIge1xuICBmaWVsZHM/OiBhbnk7XG4gIGluY2x1ZGU/OiBhbnk7XG4gIGxpbWl0PzogYW55O1xuICBvcmRlcj86IGFueTtcbiAgc2tpcD86IGFueTtcbiAgb2Zmc2V0PzogYW55O1xuICB3aGVyZT86IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBY2Nlc3NUb2tlbkludGVyZmFjZSB7XG4gIFwiaWRcIj86IHN0cmluZztcbiAgXCJ0dGxcIj86IG51bWJlcjtcbiAgXCJzY29wZXNcIj86IFtcInN0cmluZ1wiXTtcbiAgXCJjcmVhdGVkXCI/OiBEYXRlO1xuICBcInVzZXJJZFwiPzogc3RyaW5nO1xuICBcInVzZXJcIj86IGFueTtcbn1cblxuZXhwb3J0IGNsYXNzIEFjY2Vzc1Rva2VuIGltcGxlbWVudHMgQWNjZXNzVG9rZW5JbnRlcmZhY2Uge1xuICBcImlkXCI6IHN0cmluZztcbiAgXCJ0dGxcIjogbnVtYmVyO1xuICBcInNjb3Blc1wiOiBbXCJzdHJpbmdcIl07XG4gIFwiY3JlYXRlZFwiOiBEYXRlO1xuICBcInVzZXJJZFwiOiBzdHJpbmc7XG4gIFwidXNlclwiOiBhbnk7XG4gIGNvbnN0cnVjdG9yKGRhdGE/OiBBY2Nlc3NUb2tlbkludGVyZmFjZSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG4gIH1cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBtb2RlbCByZXByZXNlbnRlZCBieSB0aGlzICRyZXNvdXJjZSxcbiAgICogaS5lLiBgQWNjZXNzVG9rZW5gLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbE5hbWUoKSB7XG4gICAgcmV0dXJuIFwiQWNjZXNzVG9rZW5cIjtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGZhY3RvcnlcbiAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgY3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBBY2Nlc3NUb2tlbiBmb3IgZHluYW1pYyBwdXJwb3Nlcy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0aWMgZmFjdG9yeShkYXRhOiBBY2Nlc3NUb2tlbkludGVyZmFjZSk6IEFjY2Vzc1Rva2Vue1xuICAgIHJldHVybiBuZXcgQWNjZXNzVG9rZW4oZGF0YSk7XG4gIH0gIFxuICAvKipcbiAgKiBAbWV0aG9kIGdldE1vZGVsRGVmaW5pdGlvblxuICAqIEBhdXRob3IgSnVsaWVuIExlZHVuXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgcmV0dXJucyBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIHNvbWUgb2YgdGhlIG1vZGVsXG4gICogZGVmaW5pdGlvbnMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsRGVmaW5pdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJ0FjY2Vzc1Rva2VuJyxcbiAgICAgIHBsdXJhbDogJ0FjY2Vzc1Rva2VucycsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIFwiaWRcIjoge1xuICAgICAgICAgIG5hbWU6ICdpZCcsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgXCJ0dGxcIjoge1xuICAgICAgICAgIG5hbWU6ICd0dGwnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInLFxuICAgICAgICAgIGRlZmF1bHQ6IDEyMDk2MDBcbiAgICAgICAgfSxcbiAgICAgICAgXCJzY29wZXNcIjoge1xuICAgICAgICAgIG5hbWU6ICdzY29wZXMnLFxuICAgICAgICAgIHR5cGU6ICdbXCJzdHJpbmdcIl0nXG4gICAgICAgIH0sXG4gICAgICAgIFwiY3JlYXRlZFwiOiB7XG4gICAgICAgICAgbmFtZTogJ2NyZWF0ZWQnLFxuICAgICAgICAgIHR5cGU6ICdEYXRlJ1xuICAgICAgICB9LFxuICAgICAgICBcInVzZXJJZFwiOiB7XG4gICAgICAgICAgbmFtZTogJ3VzZXJJZCcsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZWxhdGlvbnM6IHtcbiAgICAgICAgdXNlcjoge1xuICAgICAgICAgIG5hbWU6ICd1c2VyJyxcbiAgICAgICAgICB0eXBlOiAnVXNlcicsXG4gICAgICAgICAgbW9kZWw6ICdVc2VyJ1xuICAgICAgICB9LFxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgU0RLVG9rZW4gaW1wbGVtZW50cyBBY2Nlc3NUb2tlbkludGVyZmFjZSB7XG4gIGlkOiBhbnkgPSBudWxsO1xuICB0dGw6IG51bWJlciA9IG51bGw7XG4gIHNjb3BlczogYW55ID0gbnVsbDtcbiAgY3JlYXRlZDogYW55ID0gbnVsbDtcbiAgdXNlcklkOiBhbnkgPSBudWxsO1xuICB1c2VyOiBhbnkgPSBudWxsO1xuICByZW1lbWJlck1lOiBib29sZWFuID0gbnVsbDtcbiAgY29uc3RydWN0b3IoZGF0YT86IEFjY2Vzc1Rva2VuSW50ZXJmYWNlKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgfVxufVxuLyoqXG4qIFRoaXMgR2VvUG9pbnQgcmVwcmVzZW50cyBib3RoLCBMb29wQmFjayBhbmQgTW9uZ29EQiBHZW9Qb2ludFxuKiovXG5leHBvcnQgaW50ZXJmYWNlIEdlb1BvaW50ICB7XG4gICAgbGF0PzogbnVtYmVyO1xuICAgIGxuZz86IG51bWJlcjtcbiAgICB0eXBlPzogc3RyaW5nO1xuICAgIGNvb3JkaW5hdGVzPzogbnVtYmVyW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhdEZpbHRlciB7XG4gICAgcmFuZ2U6IHN0cmluZyxcbiAgICBjdXN0b20/OiB7XG4gICAgICBzdGFydDogc3RyaW5nLFxuICAgICAgZW5kOiBzdHJpbmdcbiAgICB9LFxuICAgIHdoZXJlPzoge30sXG4gICAgZ3JvdXBCeT86IHN0cmluZ1xufVxuIl19