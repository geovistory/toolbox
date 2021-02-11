/* tslint:disable */
export class Email {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `Email`.
     */
    static getModelName() {
        return "Email";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of Email for dynamic purposes.
    **/
    static factory(data) {
        return new Email(data);
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
            name: 'Email',
            plural: 'Emails',
            path: 'Emails',
            idName: 'id',
            properties: {
                "to": {
                    name: 'to',
                    type: 'string'
                },
                "from": {
                    name: 'from',
                    type: 'string'
                },
                "subject": {
                    name: 'subject',
                    type: 'string'
                },
                "text": {
                    name: 'text',
                    type: 'string'
                },
                "html": {
                    name: 'html',
                    type: 'string'
                },
                "id": {
                    name: 'id',
                    type: 'number'
                },
            },
            relations: {}
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW1haWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNkay1sYjMvIiwic291cmNlcyI6WyJsaWIvc2RrL21vZGVscy9FbWFpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxvQkFBb0I7QUFZcEIsTUFBTSxPQUFPLEtBQUs7SUFPaEIsWUFBWSxJQUFxQjtRQUMvQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0Q7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLFlBQVk7UUFDeEIsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUNEOzs7OztPQUtHO0lBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFvQjtRQUN4QyxPQUFPLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFDRDs7Ozs7O09BTUc7SUFDSSxNQUFNLENBQUMsa0JBQWtCO1FBQzlCLE9BQU87WUFDTCxJQUFJLEVBQUUsT0FBTztZQUNiLE1BQU0sRUFBRSxRQUFRO1lBQ2hCLElBQUksRUFBRSxRQUFRO1lBQ2QsTUFBTSxFQUFFLElBQUk7WUFDWixVQUFVLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFO29CQUNKLElBQUksRUFBRSxJQUFJO29CQUNWLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELE1BQU0sRUFBRTtvQkFDTixJQUFJLEVBQUUsTUFBTTtvQkFDWixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1QsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsTUFBTSxFQUFFO29CQUNOLElBQUksRUFBRSxNQUFNO29CQUNaLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELE1BQU0sRUFBRTtvQkFDTixJQUFJLEVBQUUsTUFBTTtvQkFDWixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxJQUFJLEVBQUU7b0JBQ0osSUFBSSxFQUFFLElBQUk7b0JBQ1YsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7YUFDRjtZQUNELFNBQVMsRUFBRSxFQUNWO1NBQ0YsQ0FBQTtJQUNILENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5cbmRlY2xhcmUgdmFyIE9iamVjdDogYW55O1xuZXhwb3J0IGludGVyZmFjZSBFbWFpbEludGVyZmFjZSB7XG4gIFwidG9cIjogc3RyaW5nO1xuICBcImZyb21cIjogc3RyaW5nO1xuICBcInN1YmplY3RcIjogc3RyaW5nO1xuICBcInRleHRcIj86IHN0cmluZztcbiAgXCJodG1sXCI/OiBzdHJpbmc7XG4gIFwiaWRcIj86IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIEVtYWlsIGltcGxlbWVudHMgRW1haWxJbnRlcmZhY2Uge1xuICBcInRvXCI6IHN0cmluZztcbiAgXCJmcm9tXCI6IHN0cmluZztcbiAgXCJzdWJqZWN0XCI6IHN0cmluZztcbiAgXCJ0ZXh0XCI6IHN0cmluZztcbiAgXCJodG1sXCI6IHN0cmluZztcbiAgXCJpZFwiOiBudW1iZXI7XG4gIGNvbnN0cnVjdG9yKGRhdGE/OiBFbWFpbEludGVyZmFjZSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG4gIH1cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBtb2RlbCByZXByZXNlbnRlZCBieSB0aGlzICRyZXNvdXJjZSxcbiAgICogaS5lLiBgRW1haWxgLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbE5hbWUoKSB7XG4gICAgcmV0dXJuIFwiRW1haWxcIjtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGZhY3RvcnlcbiAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgY3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBFbWFpbCBmb3IgZHluYW1pYyBwdXJwb3Nlcy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0aWMgZmFjdG9yeShkYXRhOiBFbWFpbEludGVyZmFjZSk6IEVtYWlse1xuICAgIHJldHVybiBuZXcgRW1haWwoZGF0YSk7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBnZXRNb2RlbERlZmluaXRpb25cbiAgKiBAYXV0aG9yIEp1bGllbiBMZWR1blxuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIHJldHVybnMgYW4gb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBzb21lIG9mIHRoZSBtb2RlbFxuICAqIGRlZmluaXRpb25zLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbERlZmluaXRpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6ICdFbWFpbCcsXG4gICAgICBwbHVyYWw6ICdFbWFpbHMnLFxuICAgICAgcGF0aDogJ0VtYWlscycsXG4gICAgICBpZE5hbWU6ICdpZCcsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIFwidG9cIjoge1xuICAgICAgICAgIG5hbWU6ICd0bycsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgXCJmcm9tXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZnJvbScsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgXCJzdWJqZWN0XCI6IHtcbiAgICAgICAgICBuYW1lOiAnc3ViamVjdCcsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgXCJ0ZXh0XCI6IHtcbiAgICAgICAgICBuYW1lOiAndGV4dCcsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgXCJodG1sXCI6IHtcbiAgICAgICAgICBuYW1lOiAnaHRtbCcsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgXCJpZFwiOiB7XG4gICAgICAgICAgbmFtZTogJ2lkJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlbGF0aW9uczoge1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19