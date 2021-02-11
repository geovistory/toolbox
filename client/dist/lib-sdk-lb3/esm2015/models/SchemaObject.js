/* tslint:disable */
export class SchemaObject {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `SchemaObject`.
     */
    static getModelName() {
        return "SchemaObject";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of SchemaObject for dynamic purposes.
    **/
    static factory(data) {
        return new SchemaObject(data);
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
            name: 'SchemaObject',
            plural: 'SchemaObjects',
            path: 'SchemaObjects',
            idName: 'inf',
            properties: {
                "inf": {
                    name: 'inf',
                    type: 'any'
                },
                "pro": {
                    name: 'pro',
                    type: 'any'
                },
                "dat": {
                    name: 'dat',
                    type: 'any'
                },
                "sys": {
                    name: 'sys',
                    type: 'any'
                },
                "dfh": {
                    name: 'dfh',
                    type: 'any'
                },
            },
            relations: {}
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NoZW1hT2JqZWN0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1zZGstbGIzLyIsInNvdXJjZXMiOlsibW9kZWxzL1NjaGVtYU9iamVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxvQkFBb0I7QUFXcEIsTUFBTSxPQUFPLFlBQVk7SUFNdkIsWUFBWSxJQUE0QjtRQUN0QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0Q7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLFlBQVk7UUFDeEIsT0FBTyxjQUFjLENBQUM7SUFDeEIsQ0FBQztJQUNEOzs7OztPQUtHO0lBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUEyQjtRQUMvQyxPQUFPLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFDRDs7Ozs7O09BTUc7SUFDSSxNQUFNLENBQUMsa0JBQWtCO1FBQzlCLE9BQU87WUFDTCxJQUFJLEVBQUUsY0FBYztZQUNwQixNQUFNLEVBQUUsZUFBZTtZQUN2QixJQUFJLEVBQUUsZUFBZTtZQUNyQixNQUFNLEVBQUUsS0FBSztZQUNiLFVBQVUsRUFBRTtnQkFDVixLQUFLLEVBQUU7b0JBQ0wsSUFBSSxFQUFFLEtBQUs7b0JBQ1gsSUFBSSxFQUFFLEtBQUs7aUJBQ1o7Z0JBQ0QsS0FBSyxFQUFFO29CQUNMLElBQUksRUFBRSxLQUFLO29CQUNYLElBQUksRUFBRSxLQUFLO2lCQUNaO2dCQUNELEtBQUssRUFBRTtvQkFDTCxJQUFJLEVBQUUsS0FBSztvQkFDWCxJQUFJLEVBQUUsS0FBSztpQkFDWjtnQkFDRCxLQUFLLEVBQUU7b0JBQ0wsSUFBSSxFQUFFLEtBQUs7b0JBQ1gsSUFBSSxFQUFFLEtBQUs7aUJBQ1o7Z0JBQ0QsS0FBSyxFQUFFO29CQUNMLElBQUksRUFBRSxLQUFLO29CQUNYLElBQUksRUFBRSxLQUFLO2lCQUNaO2FBQ0Y7WUFDRCxTQUFTLEVBQUUsRUFDVjtTQUNGLENBQUE7SUFDSCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuXG5kZWNsYXJlIHZhciBPYmplY3Q6IGFueTtcbmV4cG9ydCBpbnRlcmZhY2UgU2NoZW1hT2JqZWN0SW50ZXJmYWNlIHtcbiAgXCJpbmZcIj86IGFueTtcbiAgXCJwcm9cIj86IGFueTtcbiAgXCJkYXRcIj86IGFueTtcbiAgXCJzeXNcIj86IGFueTtcbiAgXCJkZmhcIj86IGFueTtcbn1cblxuZXhwb3J0IGNsYXNzIFNjaGVtYU9iamVjdCBpbXBsZW1lbnRzIFNjaGVtYU9iamVjdEludGVyZmFjZSB7XG4gIFwiaW5mXCI6IGFueTtcbiAgXCJwcm9cIjogYW55O1xuICBcImRhdFwiOiBhbnk7XG4gIFwic3lzXCI6IGFueTtcbiAgXCJkZmhcIjogYW55O1xuICBjb25zdHJ1Y3RvcihkYXRhPzogU2NoZW1hT2JqZWN0SW50ZXJmYWNlKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgfVxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxuICAgKiBpLmUuIGBTY2hlbWFPYmplY3RgLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbE5hbWUoKSB7XG4gICAgcmV0dXJuIFwiU2NoZW1hT2JqZWN0XCI7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBmYWN0b3J5XG4gICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1Ymlhc1xuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIGNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgU2NoZW1hT2JqZWN0IGZvciBkeW5hbWljIHB1cnBvc2VzLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBmYWN0b3J5KGRhdGE6IFNjaGVtYU9iamVjdEludGVyZmFjZSk6IFNjaGVtYU9iamVjdHtcbiAgICByZXR1cm4gbmV3IFNjaGVtYU9iamVjdChkYXRhKTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGdldE1vZGVsRGVmaW5pdGlvblxuICAqIEBhdXRob3IgSnVsaWVuIExlZHVuXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgcmV0dXJucyBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIHNvbWUgb2YgdGhlIG1vZGVsXG4gICogZGVmaW5pdGlvbnMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsRGVmaW5pdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJ1NjaGVtYU9iamVjdCcsXG4gICAgICBwbHVyYWw6ICdTY2hlbWFPYmplY3RzJyxcbiAgICAgIHBhdGg6ICdTY2hlbWFPYmplY3RzJyxcbiAgICAgIGlkTmFtZTogJ2luZicsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIFwiaW5mXCI6IHtcbiAgICAgICAgICBuYW1lOiAnaW5mJyxcbiAgICAgICAgICB0eXBlOiAnYW55J1xuICAgICAgICB9LFxuICAgICAgICBcInByb1wiOiB7XG4gICAgICAgICAgbmFtZTogJ3BybycsXG4gICAgICAgICAgdHlwZTogJ2FueSdcbiAgICAgICAgfSxcbiAgICAgICAgXCJkYXRcIjoge1xuICAgICAgICAgIG5hbWU6ICdkYXQnLFxuICAgICAgICAgIHR5cGU6ICdhbnknXG4gICAgICAgIH0sXG4gICAgICAgIFwic3lzXCI6IHtcbiAgICAgICAgICBuYW1lOiAnc3lzJyxcbiAgICAgICAgICB0eXBlOiAnYW55J1xuICAgICAgICB9LFxuICAgICAgICBcImRmaFwiOiB7XG4gICAgICAgICAgbmFtZTogJ2RmaCcsXG4gICAgICAgICAgdHlwZTogJ2FueSdcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZWxhdGlvbnM6IHtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==