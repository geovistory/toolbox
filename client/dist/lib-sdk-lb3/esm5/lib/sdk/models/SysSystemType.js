/* tslint:disable */
var SysSystemType = /** @class */ (function () {
    function SysSystemType(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `SysSystemType`.
     */
    SysSystemType.getModelName = function () {
        return "SysSystemType";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of SysSystemType for dynamic purposes.
    **/
    SysSystemType.factory = function (data) {
        return new SysSystemType(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    SysSystemType.getModelDefinition = function () {
        return {
            name: 'SysSystemType',
            plural: 'SysSystemTypes',
            path: 'SysSystemTypes',
            idName: 'pk_entity',
            properties: {
                "notes": {
                    name: 'notes',
                    type: 'string'
                },
                "definition": {
                    name: 'definition',
                    type: 'string'
                },
                "st_schema_name": {
                    name: 'st_schema_name',
                    type: 'string'
                },
                "st_table_name": {
                    name: 'st_table_name',
                    type: 'string'
                },
                "st_column_name": {
                    name: 'st_column_name',
                    type: 'string'
                },
                "st_group": {
                    name: 'st_group',
                    type: 'string'
                },
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
            },
            relations: {}
        };
    };
    return SysSystemType;
}());
export { SysSystemType };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3lzU3lzdGVtVHlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc2RrLWxiMy8iLCJzb3VyY2VzIjpbImxpYi9zZGsvbW9kZWxzL1N5c1N5c3RlbVR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0JBQW9CO0FBYXBCO0lBUUUsdUJBQVksSUFBNkI7UUFDdkMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNEOzs7T0FHRztJQUNXLDBCQUFZLEdBQTFCO1FBQ0UsT0FBTyxlQUFlLENBQUM7SUFDekIsQ0FBQztJQUNEOzs7OztPQUtHO0lBQ1cscUJBQU8sR0FBckIsVUFBc0IsSUFBNEI7UUFDaEQsT0FBTyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ1csZ0NBQWtCLEdBQWhDO1FBQ0UsT0FBTztZQUNMLElBQUksRUFBRSxlQUFlO1lBQ3JCLE1BQU0sRUFBRSxnQkFBZ0I7WUFDeEIsSUFBSSxFQUFFLGdCQUFnQjtZQUN0QixNQUFNLEVBQUUsV0FBVztZQUNuQixVQUFVLEVBQUU7Z0JBQ1YsT0FBTyxFQUFFO29CQUNQLElBQUksRUFBRSxPQUFPO29CQUNiLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELFlBQVksRUFBRTtvQkFDWixJQUFJLEVBQUUsWUFBWTtvQkFDbEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsZ0JBQWdCLEVBQUU7b0JBQ2hCLElBQUksRUFBRSxnQkFBZ0I7b0JBQ3RCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELGVBQWUsRUFBRTtvQkFDZixJQUFJLEVBQUUsZUFBZTtvQkFDckIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsZ0JBQWdCLEVBQUU7b0JBQ2hCLElBQUksRUFBRSxnQkFBZ0I7b0JBQ3RCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELFVBQVUsRUFBRTtvQkFDVixJQUFJLEVBQUUsVUFBVTtvQkFDaEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsV0FBVyxFQUFFO29CQUNYLElBQUksRUFBRSxXQUFXO29CQUNqQixJQUFJLEVBQUUsUUFBUTtpQkFDZjthQUNGO1lBQ0QsU0FBUyxFQUFFLEVBQ1Y7U0FDRixDQUFBO0lBQ0gsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FBQyxBQTFFRCxJQTBFQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5cbmRlY2xhcmUgdmFyIE9iamVjdDogYW55O1xuZXhwb3J0IGludGVyZmFjZSBTeXNTeXN0ZW1UeXBlSW50ZXJmYWNlIHtcbiAgXCJub3Rlc1wiPzogc3RyaW5nO1xuICBcImRlZmluaXRpb25cIj86IHN0cmluZztcbiAgXCJzdF9zY2hlbWFfbmFtZVwiPzogc3RyaW5nO1xuICBcInN0X3RhYmxlX25hbWVcIj86IHN0cmluZztcbiAgXCJzdF9jb2x1bW5fbmFtZVwiPzogc3RyaW5nO1xuICBcInN0X2dyb3VwXCI/OiBzdHJpbmc7XG4gIFwicGtfZW50aXR5XCI/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBTeXNTeXN0ZW1UeXBlIGltcGxlbWVudHMgU3lzU3lzdGVtVHlwZUludGVyZmFjZSB7XG4gIFwibm90ZXNcIjogc3RyaW5nO1xuICBcImRlZmluaXRpb25cIjogc3RyaW5nO1xuICBcInN0X3NjaGVtYV9uYW1lXCI6IHN0cmluZztcbiAgXCJzdF90YWJsZV9uYW1lXCI6IHN0cmluZztcbiAgXCJzdF9jb2x1bW5fbmFtZVwiOiBzdHJpbmc7XG4gIFwic3RfZ3JvdXBcIjogc3RyaW5nO1xuICBcInBrX2VudGl0eVwiOiBudW1iZXI7XG4gIGNvbnN0cnVjdG9yKGRhdGE/OiBTeXNTeXN0ZW1UeXBlSW50ZXJmYWNlKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgfVxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxuICAgKiBpLmUuIGBTeXNTeXN0ZW1UeXBlYC5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxOYW1lKCkge1xuICAgIHJldHVybiBcIlN5c1N5c3RlbVR5cGVcIjtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGZhY3RvcnlcbiAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgY3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBTeXNTeXN0ZW1UeXBlIGZvciBkeW5hbWljIHB1cnBvc2VzLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBmYWN0b3J5KGRhdGE6IFN5c1N5c3RlbVR5cGVJbnRlcmZhY2UpOiBTeXNTeXN0ZW1UeXBle1xuICAgIHJldHVybiBuZXcgU3lzU3lzdGVtVHlwZShkYXRhKTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGdldE1vZGVsRGVmaW5pdGlvblxuICAqIEBhdXRob3IgSnVsaWVuIExlZHVuXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgcmV0dXJucyBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIHNvbWUgb2YgdGhlIG1vZGVsXG4gICogZGVmaW5pdGlvbnMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsRGVmaW5pdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJ1N5c1N5c3RlbVR5cGUnLFxuICAgICAgcGx1cmFsOiAnU3lzU3lzdGVtVHlwZXMnLFxuICAgICAgcGF0aDogJ1N5c1N5c3RlbVR5cGVzJyxcbiAgICAgIGlkTmFtZTogJ3BrX2VudGl0eScsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIFwibm90ZXNcIjoge1xuICAgICAgICAgIG5hbWU6ICdub3RlcycsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgXCJkZWZpbml0aW9uXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZGVmaW5pdGlvbicsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgXCJzdF9zY2hlbWFfbmFtZVwiOiB7XG4gICAgICAgICAgbmFtZTogJ3N0X3NjaGVtYV9uYW1lJyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBcInN0X3RhYmxlX25hbWVcIjoge1xuICAgICAgICAgIG5hbWU6ICdzdF90YWJsZV9uYW1lJyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBcInN0X2NvbHVtbl9uYW1lXCI6IHtcbiAgICAgICAgICBuYW1lOiAnc3RfY29sdW1uX25hbWUnLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwic3RfZ3JvdXBcIjoge1xuICAgICAgICAgIG5hbWU6ICdzdF9ncm91cCcsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgXCJwa19lbnRpdHlcIjoge1xuICAgICAgICAgIG5hbWU6ICdwa19lbnRpdHknLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVsYXRpb25zOiB7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=