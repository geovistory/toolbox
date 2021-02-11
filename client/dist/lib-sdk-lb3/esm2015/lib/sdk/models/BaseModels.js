/* tslint:disable */
export class AccessToken {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `AccessToken`.
     */
    static getModelName() {
        return "AccessToken";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of AccessToken for dynamic purposes.
    **/
    static factory(data) {
        return new AccessToken(data);
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
    }
}
export class SDKToken {
    constructor(data) {
        this.id = null;
        this.ttl = null;
        this.scopes = null;
        this.created = null;
        this.userId = null;
        this.user = null;
        this.rememberMe = null;
        Object.assign(this, data);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZU1vZGVscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc2RrLWxiMy8iLCJzb3VyY2VzIjpbImxpYi9zZGsvbW9kZWxzL0Jhc2VNb2RlbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0JBQW9CO0FBd0JwQixNQUFNLE9BQU8sV0FBVztJQU90QixZQUFZLElBQTJCO1FBQ3JDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsWUFBWTtRQUN4QixPQUFPLGFBQWEsQ0FBQztJQUN2QixDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQTBCO1FBQzlDLE9BQU8sSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUNEOzs7Ozs7T0FNRztJQUNJLE1BQU0sQ0FBQyxrQkFBa0I7UUFDOUIsT0FBTztZQUNMLElBQUksRUFBRSxhQUFhO1lBQ25CLE1BQU0sRUFBRSxjQUFjO1lBQ3RCLFVBQVUsRUFBRTtnQkFDVixJQUFJLEVBQUU7b0JBQ0osSUFBSSxFQUFFLElBQUk7b0JBQ1YsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsS0FBSyxFQUFFO29CQUNMLElBQUksRUFBRSxLQUFLO29CQUNYLElBQUksRUFBRSxRQUFRO29CQUNkLE9BQU8sRUFBRSxPQUFPO2lCQUNqQjtnQkFDRCxRQUFRLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsSUFBSSxFQUFFLFlBQVk7aUJBQ25CO2dCQUNELFNBQVMsRUFBRTtvQkFDVCxJQUFJLEVBQUUsU0FBUztvQkFDZixJQUFJLEVBQUUsTUFBTTtpQkFDYjtnQkFDRCxRQUFRLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7YUFDRjtZQUNELFNBQVMsRUFBRTtnQkFDVCxJQUFJLEVBQUU7b0JBQ0osSUFBSSxFQUFFLE1BQU07b0JBQ1osSUFBSSxFQUFFLE1BQU07b0JBQ1osS0FBSyxFQUFFLE1BQU07aUJBQ2Q7YUFDRjtTQUNGLENBQUE7SUFDSCxDQUFDO0NBQ0Y7QUFFRCxNQUFNLE9BQU8sUUFBUTtJQVFuQixZQUFZLElBQTJCO1FBUHZDLE9BQUUsR0FBUSxJQUFJLENBQUM7UUFDZixRQUFHLEdBQVcsSUFBSSxDQUFDO1FBQ25CLFdBQU0sR0FBUSxJQUFJLENBQUM7UUFDbkIsWUFBTyxHQUFRLElBQUksQ0FBQztRQUNwQixXQUFNLEdBQVEsSUFBSSxDQUFDO1FBQ25CLFNBQUksR0FBUSxJQUFJLENBQUM7UUFDakIsZUFBVSxHQUFZLElBQUksQ0FBQztRQUV6QixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuXG5cblxuZGVjbGFyZSB2YXIgT2JqZWN0OiBhbnk7XG5leHBvcnQgaW50ZXJmYWNlIExvb3BCYWNrRmlsdGVyIHtcbiAgZmllbGRzPzogYW55O1xuICBpbmNsdWRlPzogYW55O1xuICBsaW1pdD86IGFueTtcbiAgb3JkZXI/OiBhbnk7XG4gIHNraXA/OiBhbnk7XG4gIG9mZnNldD86IGFueTtcbiAgd2hlcmU/OiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWNjZXNzVG9rZW5JbnRlcmZhY2Uge1xuICBcImlkXCI/OiBzdHJpbmc7XG4gIFwidHRsXCI/OiBudW1iZXI7XG4gIFwic2NvcGVzXCI/OiBbXCJzdHJpbmdcIl07XG4gIFwiY3JlYXRlZFwiPzogRGF0ZTtcbiAgXCJ1c2VySWRcIj86IHN0cmluZztcbiAgXCJ1c2VyXCI/OiBhbnk7XG59XG5cbmV4cG9ydCBjbGFzcyBBY2Nlc3NUb2tlbiBpbXBsZW1lbnRzIEFjY2Vzc1Rva2VuSW50ZXJmYWNlIHtcbiAgXCJpZFwiOiBzdHJpbmc7XG4gIFwidHRsXCI6IG51bWJlcjtcbiAgXCJzY29wZXNcIjogW1wic3RyaW5nXCJdO1xuICBcImNyZWF0ZWRcIjogRGF0ZTtcbiAgXCJ1c2VySWRcIjogc3RyaW5nO1xuICBcInVzZXJcIjogYW55O1xuICBjb25zdHJ1Y3RvcihkYXRhPzogQWNjZXNzVG9rZW5JbnRlcmZhY2UpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xuICB9XG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyAkcmVzb3VyY2UsXG4gICAqIGkuZS4gYEFjY2Vzc1Rva2VuYC5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxOYW1lKCkge1xuICAgIHJldHVybiBcIkFjY2Vzc1Rva2VuXCI7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBmYWN0b3J5XG4gICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1Ymlhc1xuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIGNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQWNjZXNzVG9rZW4gZm9yIGR5bmFtaWMgcHVycG9zZXMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGZhY3RvcnkoZGF0YTogQWNjZXNzVG9rZW5JbnRlcmZhY2UpOiBBY2Nlc3NUb2tlbntcbiAgICByZXR1cm4gbmV3IEFjY2Vzc1Rva2VuKGRhdGEpO1xuICB9ICBcbiAgLyoqXG4gICogQG1ldGhvZCBnZXRNb2RlbERlZmluaXRpb25cbiAgKiBAYXV0aG9yIEp1bGllbiBMZWR1blxuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIHJldHVybnMgYW4gb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBzb21lIG9mIHRoZSBtb2RlbFxuICAqIGRlZmluaXRpb25zLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbERlZmluaXRpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6ICdBY2Nlc3NUb2tlbicsXG4gICAgICBwbHVyYWw6ICdBY2Nlc3NUb2tlbnMnLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBcImlkXCI6IHtcbiAgICAgICAgICBuYW1lOiAnaWQnLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwidHRsXCI6IHtcbiAgICAgICAgICBuYW1lOiAndHRsJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICBkZWZhdWx0OiAxMjA5NjAwXG4gICAgICAgIH0sXG4gICAgICAgIFwic2NvcGVzXCI6IHtcbiAgICAgICAgICBuYW1lOiAnc2NvcGVzJyxcbiAgICAgICAgICB0eXBlOiAnW1wic3RyaW5nXCJdJ1xuICAgICAgICB9LFxuICAgICAgICBcImNyZWF0ZWRcIjoge1xuICAgICAgICAgIG5hbWU6ICdjcmVhdGVkJyxcbiAgICAgICAgICB0eXBlOiAnRGF0ZSdcbiAgICAgICAgfSxcbiAgICAgICAgXCJ1c2VySWRcIjoge1xuICAgICAgICAgIG5hbWU6ICd1c2VySWQnLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVsYXRpb25zOiB7XG4gICAgICAgIHVzZXI6IHtcbiAgICAgICAgICBuYW1lOiAndXNlcicsXG4gICAgICAgICAgdHlwZTogJ1VzZXInLFxuICAgICAgICAgIG1vZGVsOiAnVXNlcidcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFNES1Rva2VuIGltcGxlbWVudHMgQWNjZXNzVG9rZW5JbnRlcmZhY2Uge1xuICBpZDogYW55ID0gbnVsbDtcbiAgdHRsOiBudW1iZXIgPSBudWxsO1xuICBzY29wZXM6IGFueSA9IG51bGw7XG4gIGNyZWF0ZWQ6IGFueSA9IG51bGw7XG4gIHVzZXJJZDogYW55ID0gbnVsbDtcbiAgdXNlcjogYW55ID0gbnVsbDtcbiAgcmVtZW1iZXJNZTogYm9vbGVhbiA9IG51bGw7XG4gIGNvbnN0cnVjdG9yKGRhdGE/OiBBY2Nlc3NUb2tlbkludGVyZmFjZSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG4gIH1cbn1cbi8qKlxuKiBUaGlzIEdlb1BvaW50IHJlcHJlc2VudHMgYm90aCwgTG9vcEJhY2sgYW5kIE1vbmdvREIgR2VvUG9pbnRcbioqL1xuZXhwb3J0IGludGVyZmFjZSBHZW9Qb2ludCAge1xuICAgIGxhdD86IG51bWJlcjtcbiAgICBsbmc/OiBudW1iZXI7XG4gICAgdHlwZT86IHN0cmluZztcbiAgICBjb29yZGluYXRlcz86IG51bWJlcltdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN0YXRGaWx0ZXIge1xuICAgIHJhbmdlOiBzdHJpbmcsXG4gICAgY3VzdG9tPzoge1xuICAgICAgc3RhcnQ6IHN0cmluZyxcbiAgICAgIGVuZDogc3RyaW5nXG4gICAgfSxcbiAgICB3aGVyZT86IHt9LFxuICAgIGdyb3VwQnk/OiBzdHJpbmdcbn1cbiJdfQ==