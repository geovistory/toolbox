/* tslint:disable */
export class SysSystemType {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `SysSystemType`.
     */
    static getModelName() {
        return "SysSystemType";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of SysSystemType for dynamic purposes.
    **/
    static factory(data) {
        return new SysSystemType(data);
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
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3lzU3lzdGVtVHlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc2RrLWxiMy8iLCJzb3VyY2VzIjpbImxpYi9zZGsvbW9kZWxzL1N5c1N5c3RlbVR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0JBQW9CO0FBYXBCLE1BQU0sT0FBTyxhQUFhO0lBUXhCLFlBQVksSUFBNkI7UUFDdkMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxZQUFZO1FBQ3hCLE9BQU8sZUFBZSxDQUFDO0lBQ3pCLENBQUM7SUFDRDs7Ozs7T0FLRztJQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBNEI7UUFDaEQsT0FBTyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ0ksTUFBTSxDQUFDLGtCQUFrQjtRQUM5QixPQUFPO1lBQ0wsSUFBSSxFQUFFLGVBQWU7WUFDckIsTUFBTSxFQUFFLGdCQUFnQjtZQUN4QixJQUFJLEVBQUUsZ0JBQWdCO1lBQ3RCLE1BQU0sRUFBRSxXQUFXO1lBQ25CLFVBQVUsRUFBRTtnQkFDVixPQUFPLEVBQUU7b0JBQ1AsSUFBSSxFQUFFLE9BQU87b0JBQ2IsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLElBQUksRUFBRSxZQUFZO29CQUNsQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxnQkFBZ0IsRUFBRTtvQkFDaEIsSUFBSSxFQUFFLGdCQUFnQjtvQkFDdEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsZUFBZSxFQUFFO29CQUNmLElBQUksRUFBRSxlQUFlO29CQUNyQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxnQkFBZ0IsRUFBRTtvQkFDaEIsSUFBSSxFQUFFLGdCQUFnQjtvQkFDdEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsVUFBVSxFQUFFO29CQUNWLElBQUksRUFBRSxVQUFVO29CQUNoQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxXQUFXLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLElBQUksRUFBRSxRQUFRO2lCQUNmO2FBQ0Y7WUFDRCxTQUFTLEVBQUUsRUFDVjtTQUNGLENBQUE7SUFDSCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuXG5kZWNsYXJlIHZhciBPYmplY3Q6IGFueTtcbmV4cG9ydCBpbnRlcmZhY2UgU3lzU3lzdGVtVHlwZUludGVyZmFjZSB7XG4gIFwibm90ZXNcIj86IHN0cmluZztcbiAgXCJkZWZpbml0aW9uXCI/OiBzdHJpbmc7XG4gIFwic3Rfc2NoZW1hX25hbWVcIj86IHN0cmluZztcbiAgXCJzdF90YWJsZV9uYW1lXCI/OiBzdHJpbmc7XG4gIFwic3RfY29sdW1uX25hbWVcIj86IHN0cmluZztcbiAgXCJzdF9ncm91cFwiPzogc3RyaW5nO1xuICBcInBrX2VudGl0eVwiPzogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgU3lzU3lzdGVtVHlwZSBpbXBsZW1lbnRzIFN5c1N5c3RlbVR5cGVJbnRlcmZhY2Uge1xuICBcIm5vdGVzXCI6IHN0cmluZztcbiAgXCJkZWZpbml0aW9uXCI6IHN0cmluZztcbiAgXCJzdF9zY2hlbWFfbmFtZVwiOiBzdHJpbmc7XG4gIFwic3RfdGFibGVfbmFtZVwiOiBzdHJpbmc7XG4gIFwic3RfY29sdW1uX25hbWVcIjogc3RyaW5nO1xuICBcInN0X2dyb3VwXCI6IHN0cmluZztcbiAgXCJwa19lbnRpdHlcIjogbnVtYmVyO1xuICBjb25zdHJ1Y3RvcihkYXRhPzogU3lzU3lzdGVtVHlwZUludGVyZmFjZSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG4gIH1cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBtb2RlbCByZXByZXNlbnRlZCBieSB0aGlzICRyZXNvdXJjZSxcbiAgICogaS5lLiBgU3lzU3lzdGVtVHlwZWAuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsTmFtZSgpIHtcbiAgICByZXR1cm4gXCJTeXNTeXN0ZW1UeXBlXCI7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBmYWN0b3J5XG4gICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1Ymlhc1xuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIGNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgU3lzU3lzdGVtVHlwZSBmb3IgZHluYW1pYyBwdXJwb3Nlcy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0aWMgZmFjdG9yeShkYXRhOiBTeXNTeXN0ZW1UeXBlSW50ZXJmYWNlKTogU3lzU3lzdGVtVHlwZXtcbiAgICByZXR1cm4gbmV3IFN5c1N5c3RlbVR5cGUoZGF0YSk7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBnZXRNb2RlbERlZmluaXRpb25cbiAgKiBAYXV0aG9yIEp1bGllbiBMZWR1blxuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIHJldHVybnMgYW4gb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBzb21lIG9mIHRoZSBtb2RlbFxuICAqIGRlZmluaXRpb25zLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbERlZmluaXRpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6ICdTeXNTeXN0ZW1UeXBlJyxcbiAgICAgIHBsdXJhbDogJ1N5c1N5c3RlbVR5cGVzJyxcbiAgICAgIHBhdGg6ICdTeXNTeXN0ZW1UeXBlcycsXG4gICAgICBpZE5hbWU6ICdwa19lbnRpdHknLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBcIm5vdGVzXCI6IHtcbiAgICAgICAgICBuYW1lOiAnbm90ZXMnLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwiZGVmaW5pdGlvblwiOiB7XG4gICAgICAgICAgbmFtZTogJ2RlZmluaXRpb24nLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwic3Rfc2NoZW1hX25hbWVcIjoge1xuICAgICAgICAgIG5hbWU6ICdzdF9zY2hlbWFfbmFtZScsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgXCJzdF90YWJsZV9uYW1lXCI6IHtcbiAgICAgICAgICBuYW1lOiAnc3RfdGFibGVfbmFtZScsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgXCJzdF9jb2x1bW5fbmFtZVwiOiB7XG4gICAgICAgICAgbmFtZTogJ3N0X2NvbHVtbl9uYW1lJyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBcInN0X2dyb3VwXCI6IHtcbiAgICAgICAgICBuYW1lOiAnc3RfZ3JvdXAnLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwicGtfZW50aXR5XCI6IHtcbiAgICAgICAgICBuYW1lOiAncGtfZW50aXR5JyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlbGF0aW9uczoge1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19