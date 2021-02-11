/* tslint:disable */
var SysAppContext = /** @class */ (function () {
    function SysAppContext(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `SysAppContext`.
     */
    SysAppContext.getModelName = function () {
        return "SysAppContext";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of SysAppContext for dynamic purposes.
    **/
    SysAppContext.factory = function (data) {
        return new SysAppContext(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    SysAppContext.getModelDefinition = function () {
        return {
            name: 'SysAppContext',
            plural: 'SysAppContexts',
            path: 'SysAppContexts',
            idName: 'pk_entity',
            properties: {
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
                "description": {
                    name: 'description',
                    type: 'string'
                },
                "label": {
                    name: 'label',
                    type: 'string'
                },
            },
            relations: {}
        };
    };
    return SysAppContext;
}());
export { SysAppContext };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3lzQXBwQ29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc2RrLWxiMy8iLCJzb3VyY2VzIjpbImxpYi9zZGsvbW9kZWxzL1N5c0FwcENvbnRleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0JBQW9CO0FBU3BCO0lBSUUsdUJBQVksSUFBNkI7UUFDdkMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNEOzs7T0FHRztJQUNXLDBCQUFZLEdBQTFCO1FBQ0UsT0FBTyxlQUFlLENBQUM7SUFDekIsQ0FBQztJQUNEOzs7OztPQUtHO0lBQ1cscUJBQU8sR0FBckIsVUFBc0IsSUFBNEI7UUFDaEQsT0FBTyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ1csZ0NBQWtCLEdBQWhDO1FBQ0UsT0FBTztZQUNMLElBQUksRUFBRSxlQUFlO1lBQ3JCLE1BQU0sRUFBRSxnQkFBZ0I7WUFDeEIsSUFBSSxFQUFFLGdCQUFnQjtZQUN0QixNQUFNLEVBQUUsV0FBVztZQUNuQixVQUFVLEVBQUU7Z0JBQ1YsV0FBVyxFQUFFO29CQUNYLElBQUksRUFBRSxXQUFXO29CQUNqQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxhQUFhLEVBQUU7b0JBQ2IsSUFBSSxFQUFFLGFBQWE7b0JBQ25CLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxJQUFJLEVBQUUsT0FBTztvQkFDYixJQUFJLEVBQUUsUUFBUTtpQkFDZjthQUNGO1lBQ0QsU0FBUyxFQUFFLEVBQ1Y7U0FDRixDQUFBO0lBQ0gsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FBQyxBQXRERCxJQXNEQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5cbmRlY2xhcmUgdmFyIE9iamVjdDogYW55O1xuZXhwb3J0IGludGVyZmFjZSBTeXNBcHBDb250ZXh0SW50ZXJmYWNlIHtcbiAgXCJwa19lbnRpdHlcIj86IG51bWJlcjtcbiAgXCJkZXNjcmlwdGlvblwiPzogc3RyaW5nO1xuICBcImxhYmVsXCI/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBTeXNBcHBDb250ZXh0IGltcGxlbWVudHMgU3lzQXBwQ29udGV4dEludGVyZmFjZSB7XG4gIFwicGtfZW50aXR5XCI6IG51bWJlcjtcbiAgXCJkZXNjcmlwdGlvblwiOiBzdHJpbmc7XG4gIFwibGFiZWxcIjogc3RyaW5nO1xuICBjb25zdHJ1Y3RvcihkYXRhPzogU3lzQXBwQ29udGV4dEludGVyZmFjZSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG4gIH1cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBtb2RlbCByZXByZXNlbnRlZCBieSB0aGlzICRyZXNvdXJjZSxcbiAgICogaS5lLiBgU3lzQXBwQ29udGV4dGAuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsTmFtZSgpIHtcbiAgICByZXR1cm4gXCJTeXNBcHBDb250ZXh0XCI7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBmYWN0b3J5XG4gICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1Ymlhc1xuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIGNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgU3lzQXBwQ29udGV4dCBmb3IgZHluYW1pYyBwdXJwb3Nlcy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0aWMgZmFjdG9yeShkYXRhOiBTeXNBcHBDb250ZXh0SW50ZXJmYWNlKTogU3lzQXBwQ29udGV4dHtcbiAgICByZXR1cm4gbmV3IFN5c0FwcENvbnRleHQoZGF0YSk7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBnZXRNb2RlbERlZmluaXRpb25cbiAgKiBAYXV0aG9yIEp1bGllbiBMZWR1blxuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIHJldHVybnMgYW4gb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBzb21lIG9mIHRoZSBtb2RlbFxuICAqIGRlZmluaXRpb25zLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbERlZmluaXRpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6ICdTeXNBcHBDb250ZXh0JyxcbiAgICAgIHBsdXJhbDogJ1N5c0FwcENvbnRleHRzJyxcbiAgICAgIHBhdGg6ICdTeXNBcHBDb250ZXh0cycsXG4gICAgICBpZE5hbWU6ICdwa19lbnRpdHknLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBcInBrX2VudGl0eVwiOiB7XG4gICAgICAgICAgbmFtZTogJ3BrX2VudGl0eScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJkZXNjcmlwdGlvblwiOiB7XG4gICAgICAgICAgbmFtZTogJ2Rlc2NyaXB0aW9uJyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBcImxhYmVsXCI6IHtcbiAgICAgICAgICBuYW1lOiAnbGFiZWwnLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVsYXRpb25zOiB7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=