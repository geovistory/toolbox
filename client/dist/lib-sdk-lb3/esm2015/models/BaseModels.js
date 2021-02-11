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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZU1vZGVscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc2RrLWxiMy8iLCJzb3VyY2VzIjpbIm1vZGVscy9CYXNlTW9kZWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG9CQUFvQjtBQXdCcEIsTUFBTSxPQUFPLFdBQVc7SUFPdEIsWUFBWSxJQUEyQjtRQUNyQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0Q7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLFlBQVk7UUFDeEIsT0FBTyxhQUFhLENBQUM7SUFDdkIsQ0FBQztJQUNEOzs7OztPQUtHO0lBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUEwQjtRQUM5QyxPQUFPLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFDRDs7Ozs7O09BTUc7SUFDSSxNQUFNLENBQUMsa0JBQWtCO1FBQzlCLE9BQU87WUFDTCxJQUFJLEVBQUUsYUFBYTtZQUNuQixNQUFNLEVBQUUsY0FBYztZQUN0QixVQUFVLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFO29CQUNKLElBQUksRUFBRSxJQUFJO29CQUNWLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELEtBQUssRUFBRTtvQkFDTCxJQUFJLEVBQUUsS0FBSztvQkFDWCxJQUFJLEVBQUUsUUFBUTtvQkFDZCxPQUFPLEVBQUUsT0FBTztpQkFDakI7Z0JBQ0QsUUFBUSxFQUFFO29CQUNSLElBQUksRUFBRSxRQUFRO29CQUNkLElBQUksRUFBRSxZQUFZO2lCQUNuQjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1QsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsSUFBSSxFQUFFLE1BQU07aUJBQ2I7Z0JBQ0QsUUFBUSxFQUFFO29CQUNSLElBQUksRUFBRSxRQUFRO29CQUNkLElBQUksRUFBRSxRQUFRO2lCQUNmO2FBQ0Y7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsSUFBSSxFQUFFO29CQUNKLElBQUksRUFBRSxNQUFNO29CQUNaLElBQUksRUFBRSxNQUFNO29CQUNaLEtBQUssRUFBRSxNQUFNO2lCQUNkO2FBQ0Y7U0FDRixDQUFBO0lBQ0gsQ0FBQztDQUNGO0FBRUQsTUFBTSxPQUFPLFFBQVE7SUFRbkIsWUFBWSxJQUEyQjtRQVB2QyxPQUFFLEdBQVEsSUFBSSxDQUFDO1FBQ2YsUUFBRyxHQUFXLElBQUksQ0FBQztRQUNuQixXQUFNLEdBQVEsSUFBSSxDQUFDO1FBQ25CLFlBQU8sR0FBUSxJQUFJLENBQUM7UUFDcEIsV0FBTSxHQUFRLElBQUksQ0FBQztRQUNuQixTQUFJLEdBQVEsSUFBSSxDQUFDO1FBQ2pCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFFekIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cblxuXG5cbmRlY2xhcmUgdmFyIE9iamVjdDogYW55O1xuZXhwb3J0IGludGVyZmFjZSBMb29wQmFja0ZpbHRlciB7XG4gIGZpZWxkcz86IGFueTtcbiAgaW5jbHVkZT86IGFueTtcbiAgbGltaXQ/OiBhbnk7XG4gIG9yZGVyPzogYW55O1xuICBza2lwPzogYW55O1xuICBvZmZzZXQ/OiBhbnk7XG4gIHdoZXJlPzogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEFjY2Vzc1Rva2VuSW50ZXJmYWNlIHtcbiAgXCJpZFwiPzogc3RyaW5nO1xuICBcInR0bFwiPzogbnVtYmVyO1xuICBcInNjb3Blc1wiPzogW1wic3RyaW5nXCJdO1xuICBcImNyZWF0ZWRcIj86IERhdGU7XG4gIFwidXNlcklkXCI/OiBzdHJpbmc7XG4gIFwidXNlclwiPzogYW55O1xufVxuXG5leHBvcnQgY2xhc3MgQWNjZXNzVG9rZW4gaW1wbGVtZW50cyBBY2Nlc3NUb2tlbkludGVyZmFjZSB7XG4gIFwiaWRcIjogc3RyaW5nO1xuICBcInR0bFwiOiBudW1iZXI7XG4gIFwic2NvcGVzXCI6IFtcInN0cmluZ1wiXTtcbiAgXCJjcmVhdGVkXCI6IERhdGU7XG4gIFwidXNlcklkXCI6IHN0cmluZztcbiAgXCJ1c2VyXCI6IGFueTtcbiAgY29uc3RydWN0b3IoZGF0YT86IEFjY2Vzc1Rva2VuSW50ZXJmYWNlKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgfVxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxuICAgKiBpLmUuIGBBY2Nlc3NUb2tlbmAuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsTmFtZSgpIHtcbiAgICByZXR1cm4gXCJBY2Nlc3NUb2tlblwiO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgZmFjdG9yeVxuICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXNcbiAgKiBAbGljZW5zZSBNSVRcbiAgKiBUaGlzIG1ldGhvZCBjcmVhdGVzIGFuIGluc3RhbmNlIG9mIEFjY2Vzc1Rva2VuIGZvciBkeW5hbWljIHB1cnBvc2VzLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBmYWN0b3J5KGRhdGE6IEFjY2Vzc1Rva2VuSW50ZXJmYWNlKTogQWNjZXNzVG9rZW57XG4gICAgcmV0dXJuIG5ldyBBY2Nlc3NUb2tlbihkYXRhKTtcbiAgfSAgXG4gIC8qKlxuICAqIEBtZXRob2QgZ2V0TW9kZWxEZWZpbml0aW9uXG4gICogQGF1dGhvciBKdWxpZW4gTGVkdW5cbiAgKiBAbGljZW5zZSBNSVRcbiAgKiBUaGlzIG1ldGhvZCByZXR1cm5zIGFuIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgc29tZSBvZiB0aGUgbW9kZWxcbiAgKiBkZWZpbml0aW9ucy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxEZWZpbml0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiAnQWNjZXNzVG9rZW4nLFxuICAgICAgcGx1cmFsOiAnQWNjZXNzVG9rZW5zJyxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgXCJpZFwiOiB7XG4gICAgICAgICAgbmFtZTogJ2lkJyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBcInR0bFwiOiB7XG4gICAgICAgICAgbmFtZTogJ3R0bCcsXG4gICAgICAgICAgdHlwZTogJ251bWJlcicsXG4gICAgICAgICAgZGVmYXVsdDogMTIwOTYwMFxuICAgICAgICB9LFxuICAgICAgICBcInNjb3Blc1wiOiB7XG4gICAgICAgICAgbmFtZTogJ3Njb3BlcycsXG4gICAgICAgICAgdHlwZTogJ1tcInN0cmluZ1wiXSdcbiAgICAgICAgfSxcbiAgICAgICAgXCJjcmVhdGVkXCI6IHtcbiAgICAgICAgICBuYW1lOiAnY3JlYXRlZCcsXG4gICAgICAgICAgdHlwZTogJ0RhdGUnXG4gICAgICAgIH0sXG4gICAgICAgIFwidXNlcklkXCI6IHtcbiAgICAgICAgICBuYW1lOiAndXNlcklkJyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlbGF0aW9uczoge1xuICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgbmFtZTogJ3VzZXInLFxuICAgICAgICAgIHR5cGU6ICdVc2VyJyxcbiAgICAgICAgICBtb2RlbDogJ1VzZXInXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTREtUb2tlbiBpbXBsZW1lbnRzIEFjY2Vzc1Rva2VuSW50ZXJmYWNlIHtcbiAgaWQ6IGFueSA9IG51bGw7XG4gIHR0bDogbnVtYmVyID0gbnVsbDtcbiAgc2NvcGVzOiBhbnkgPSBudWxsO1xuICBjcmVhdGVkOiBhbnkgPSBudWxsO1xuICB1c2VySWQ6IGFueSA9IG51bGw7XG4gIHVzZXI6IGFueSA9IG51bGw7XG4gIHJlbWVtYmVyTWU6IGJvb2xlYW4gPSBudWxsO1xuICBjb25zdHJ1Y3RvcihkYXRhPzogQWNjZXNzVG9rZW5JbnRlcmZhY2UpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xuICB9XG59XG4vKipcbiogVGhpcyBHZW9Qb2ludCByZXByZXNlbnRzIGJvdGgsIExvb3BCYWNrIGFuZCBNb25nb0RCIEdlb1BvaW50XG4qKi9cbmV4cG9ydCBpbnRlcmZhY2UgR2VvUG9pbnQgIHtcbiAgICBsYXQ/OiBudW1iZXI7XG4gICAgbG5nPzogbnVtYmVyO1xuICAgIHR5cGU/OiBzdHJpbmc7XG4gICAgY29vcmRpbmF0ZXM/OiBudW1iZXJbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdGF0RmlsdGVyIHtcbiAgICByYW5nZTogc3RyaW5nLFxuICAgIGN1c3RvbT86IHtcbiAgICAgIHN0YXJ0OiBzdHJpbmcsXG4gICAgICBlbmQ6IHN0cmluZ1xuICAgIH0sXG4gICAgd2hlcmU/OiB7fSxcbiAgICBncm91cEJ5Pzogc3RyaW5nXG59XG4iXX0=