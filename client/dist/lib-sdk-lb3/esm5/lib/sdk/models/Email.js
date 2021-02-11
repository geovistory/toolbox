/* tslint:disable */
var Email = /** @class */ (function () {
    function Email(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `Email`.
     */
    Email.getModelName = function () {
        return "Email";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of Email for dynamic purposes.
    **/
    Email.factory = function (data) {
        return new Email(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    Email.getModelDefinition = function () {
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
    };
    return Email;
}());
export { Email };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW1haWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNkay1sYjMvIiwic291cmNlcyI6WyJsaWIvc2RrL21vZGVscy9FbWFpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxvQkFBb0I7QUFZcEI7SUFPRSxlQUFZLElBQXFCO1FBQy9CLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRDs7O09BR0c7SUFDVyxrQkFBWSxHQUExQjtRQUNFLE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7SUFDRDs7Ozs7T0FLRztJQUNXLGFBQU8sR0FBckIsVUFBc0IsSUFBb0I7UUFDeEMsT0FBTyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ1csd0JBQWtCLEdBQWhDO1FBQ0UsT0FBTztZQUNMLElBQUksRUFBRSxPQUFPO1lBQ2IsTUFBTSxFQUFFLFFBQVE7WUFDaEIsSUFBSSxFQUFFLFFBQVE7WUFDZCxNQUFNLEVBQUUsSUFBSTtZQUNaLFVBQVUsRUFBRTtnQkFDVixJQUFJLEVBQUU7b0JBQ0osSUFBSSxFQUFFLElBQUk7b0JBQ1YsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsTUFBTSxFQUFFO29CQUNOLElBQUksRUFBRSxNQUFNO29CQUNaLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELFNBQVMsRUFBRTtvQkFDVCxJQUFJLEVBQUUsU0FBUztvQkFDZixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxNQUFNLEVBQUU7b0JBQ04sSUFBSSxFQUFFLE1BQU07b0JBQ1osSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsTUFBTSxFQUFFO29CQUNOLElBQUksRUFBRSxNQUFNO29CQUNaLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELElBQUksRUFBRTtvQkFDSixJQUFJLEVBQUUsSUFBSTtvQkFDVixJQUFJLEVBQUUsUUFBUTtpQkFDZjthQUNGO1lBQ0QsU0FBUyxFQUFFLEVBQ1Y7U0FDRixDQUFBO0lBQ0gsQ0FBQztJQUNILFlBQUM7QUFBRCxDQUFDLEFBckVELElBcUVDIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cblxuZGVjbGFyZSB2YXIgT2JqZWN0OiBhbnk7XG5leHBvcnQgaW50ZXJmYWNlIEVtYWlsSW50ZXJmYWNlIHtcbiAgXCJ0b1wiOiBzdHJpbmc7XG4gIFwiZnJvbVwiOiBzdHJpbmc7XG4gIFwic3ViamVjdFwiOiBzdHJpbmc7XG4gIFwidGV4dFwiPzogc3RyaW5nO1xuICBcImh0bWxcIj86IHN0cmluZztcbiAgXCJpZFwiPzogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgRW1haWwgaW1wbGVtZW50cyBFbWFpbEludGVyZmFjZSB7XG4gIFwidG9cIjogc3RyaW5nO1xuICBcImZyb21cIjogc3RyaW5nO1xuICBcInN1YmplY3RcIjogc3RyaW5nO1xuICBcInRleHRcIjogc3RyaW5nO1xuICBcImh0bWxcIjogc3RyaW5nO1xuICBcImlkXCI6IG51bWJlcjtcbiAgY29uc3RydWN0b3IoZGF0YT86IEVtYWlsSW50ZXJmYWNlKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgfVxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxuICAgKiBpLmUuIGBFbWFpbGAuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsTmFtZSgpIHtcbiAgICByZXR1cm4gXCJFbWFpbFwiO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgZmFjdG9yeVxuICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXNcbiAgKiBAbGljZW5zZSBNSVRcbiAgKiBUaGlzIG1ldGhvZCBjcmVhdGVzIGFuIGluc3RhbmNlIG9mIEVtYWlsIGZvciBkeW5hbWljIHB1cnBvc2VzLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBmYWN0b3J5KGRhdGE6IEVtYWlsSW50ZXJmYWNlKTogRW1haWx7XG4gICAgcmV0dXJuIG5ldyBFbWFpbChkYXRhKTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGdldE1vZGVsRGVmaW5pdGlvblxuICAqIEBhdXRob3IgSnVsaWVuIExlZHVuXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgcmV0dXJucyBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIHNvbWUgb2YgdGhlIG1vZGVsXG4gICogZGVmaW5pdGlvbnMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsRGVmaW5pdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJ0VtYWlsJyxcbiAgICAgIHBsdXJhbDogJ0VtYWlscycsXG4gICAgICBwYXRoOiAnRW1haWxzJyxcbiAgICAgIGlkTmFtZTogJ2lkJyxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgXCJ0b1wiOiB7XG4gICAgICAgICAgbmFtZTogJ3RvJyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBcImZyb21cIjoge1xuICAgICAgICAgIG5hbWU6ICdmcm9tJyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBcInN1YmplY3RcIjoge1xuICAgICAgICAgIG5hbWU6ICdzdWJqZWN0JyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBcInRleHRcIjoge1xuICAgICAgICAgIG5hbWU6ICd0ZXh0JyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBcImh0bWxcIjoge1xuICAgICAgICAgIG5hbWU6ICdodG1sJyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBcImlkXCI6IHtcbiAgICAgICAgICBuYW1lOiAnaWQnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVsYXRpb25zOiB7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=