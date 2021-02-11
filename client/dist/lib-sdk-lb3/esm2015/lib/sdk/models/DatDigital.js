export class DatDigital {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `DatDigital`.
     */
    static getModelName() {
        return "DatDigital";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of DatDigital for dynamic purposes.
    **/
    static factory(data) {
        return new DatDigital(data);
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
            name: 'DatDigital',
            plural: 'DatDigitals',
            path: 'DatDigitals',
            idName: 'pk_entity',
            properties: {
                "entity_version": {
                    name: 'entity_version',
                    type: 'number'
                },
                "pk_text": {
                    name: 'pk_text',
                    type: 'number'
                },
                "quill_doc": {
                    name: 'quill_doc',
                    type: 'any'
                },
                "string": {
                    name: 'string',
                    type: 'string'
                },
                "fk_system_type": {
                    name: 'fk_system_type',
                    type: 'number'
                },
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
                "fk_namespace": {
                    name: 'fk_namespace',
                    type: 'number'
                },
            },
            relations: {
                namespace: {
                    name: 'namespace',
                    type: 'DatNamespace',
                    model: 'DatNamespace',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_namespace',
                    keyTo: 'pk_entity'
                },
            }
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0RGlnaXRhbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc2RrLWxiMy8iLCJzb3VyY2VzIjpbImxpYi9zZGsvbW9kZWxzL0RhdERpZ2l0YWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBaUJBLE1BQU0sT0FBTyxVQUFVO0lBU3JCLFlBQVksSUFBMEI7UUFDcEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxZQUFZO1FBQ3hCLE9BQU8sWUFBWSxDQUFDO0lBQ3RCLENBQUM7SUFDRDs7Ozs7T0FLRztJQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBeUI7UUFDN0MsT0FBTyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ0ksTUFBTSxDQUFDLGtCQUFrQjtRQUM5QixPQUFPO1lBQ0wsSUFBSSxFQUFFLFlBQVk7WUFDbEIsTUFBTSxFQUFFLGFBQWE7WUFDckIsSUFBSSxFQUFFLGFBQWE7WUFDbkIsTUFBTSxFQUFFLFdBQVc7WUFDbkIsVUFBVSxFQUFFO2dCQUNWLGdCQUFnQixFQUFFO29CQUNoQixJQUFJLEVBQUUsZ0JBQWdCO29CQUN0QixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1QsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsV0FBVyxFQUFFO29CQUNYLElBQUksRUFBRSxXQUFXO29CQUNqQixJQUFJLEVBQUUsS0FBSztpQkFDWjtnQkFDRCxRQUFRLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsZ0JBQWdCLEVBQUU7b0JBQ2hCLElBQUksRUFBRSxnQkFBZ0I7b0JBQ3RCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELFdBQVcsRUFBRTtvQkFDWCxJQUFJLEVBQUUsV0FBVztvQkFDakIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsY0FBYyxFQUFFO29CQUNkLElBQUksRUFBRSxjQUFjO29CQUNwQixJQUFJLEVBQUUsUUFBUTtpQkFDZjthQUNGO1lBQ0QsU0FBUyxFQUFFO2dCQUNULFNBQVMsRUFBRTtvQkFDVCxJQUFJLEVBQUUsV0FBVztvQkFDakIsSUFBSSxFQUFFLGNBQWM7b0JBQ3BCLEtBQUssRUFBRSxjQUFjO29CQUNyQixZQUFZLEVBQUUsV0FBVztvQkFDakIsT0FBTyxFQUFFLGNBQWM7b0JBQy9CLEtBQUssRUFBRSxXQUFXO2lCQUNuQjthQUNGO1NBQ0YsQ0FBQTtJQUNILENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5pbXBvcnQge1xuICBEYXROYW1lc3BhY2Vcbn0gZnJvbSAnLi4vaW5kZXgnO1xuXG5kZWNsYXJlIHZhciBPYmplY3Q6IGFueTtcbmV4cG9ydCBpbnRlcmZhY2UgRGF0RGlnaXRhbEludGVyZmFjZSB7XG4gIFwiZW50aXR5X3ZlcnNpb25cIj86IG51bWJlcjtcbiAgXCJwa190ZXh0XCI/OiBudW1iZXI7XG4gIFwicXVpbGxfZG9jXCI/OiBhbnk7XG4gIFwic3RyaW5nXCI/OiBzdHJpbmc7XG4gIFwiZmtfc3lzdGVtX3R5cGVcIj86IG51bWJlcjtcbiAgXCJwa19lbnRpdHlcIj86IG51bWJlcjtcbiAgXCJma19uYW1lc3BhY2VcIj86IG51bWJlcjtcbiAgbmFtZXNwYWNlPzogRGF0TmFtZXNwYWNlO1xufVxuXG5leHBvcnQgY2xhc3MgRGF0RGlnaXRhbCBpbXBsZW1lbnRzIERhdERpZ2l0YWxJbnRlcmZhY2Uge1xuICBcImVudGl0eV92ZXJzaW9uXCI6IG51bWJlcjtcbiAgXCJwa190ZXh0XCI6IG51bWJlcjtcbiAgXCJxdWlsbF9kb2NcIjogYW55O1xuICBcInN0cmluZ1wiOiBzdHJpbmc7XG4gIFwiZmtfc3lzdGVtX3R5cGVcIjogbnVtYmVyO1xuICBcInBrX2VudGl0eVwiOiBudW1iZXI7XG4gIFwiZmtfbmFtZXNwYWNlXCI6IG51bWJlcjtcbiAgbmFtZXNwYWNlPzogRGF0TmFtZXNwYWNlO1xuICBjb25zdHJ1Y3RvcihkYXRhPzogRGF0RGlnaXRhbEludGVyZmFjZSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG4gIH1cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBtb2RlbCByZXByZXNlbnRlZCBieSB0aGlzICRyZXNvdXJjZSxcbiAgICogaS5lLiBgRGF0RGlnaXRhbGAuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsTmFtZSgpIHtcbiAgICByZXR1cm4gXCJEYXREaWdpdGFsXCI7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBmYWN0b3J5XG4gICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1Ymlhc1xuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIGNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgRGF0RGlnaXRhbCBmb3IgZHluYW1pYyBwdXJwb3Nlcy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0aWMgZmFjdG9yeShkYXRhOiBEYXREaWdpdGFsSW50ZXJmYWNlKTogRGF0RGlnaXRhbHtcbiAgICByZXR1cm4gbmV3IERhdERpZ2l0YWwoZGF0YSk7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBnZXRNb2RlbERlZmluaXRpb25cbiAgKiBAYXV0aG9yIEp1bGllbiBMZWR1blxuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIHJldHVybnMgYW4gb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBzb21lIG9mIHRoZSBtb2RlbFxuICAqIGRlZmluaXRpb25zLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbERlZmluaXRpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6ICdEYXREaWdpdGFsJyxcbiAgICAgIHBsdXJhbDogJ0RhdERpZ2l0YWxzJyxcbiAgICAgIHBhdGg6ICdEYXREaWdpdGFscycsXG4gICAgICBpZE5hbWU6ICdwa19lbnRpdHknLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBcImVudGl0eV92ZXJzaW9uXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZW50aXR5X3ZlcnNpb24nLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwicGtfdGV4dFwiOiB7XG4gICAgICAgICAgbmFtZTogJ3BrX3RleHQnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwicXVpbGxfZG9jXCI6IHtcbiAgICAgICAgICBuYW1lOiAncXVpbGxfZG9jJyxcbiAgICAgICAgICB0eXBlOiAnYW55J1xuICAgICAgICB9LFxuICAgICAgICBcInN0cmluZ1wiOiB7XG4gICAgICAgICAgbmFtZTogJ3N0cmluZycsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgXCJma19zeXN0ZW1fdHlwZVwiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX3N5c3RlbV90eXBlJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcInBrX2VudGl0eVwiOiB7XG4gICAgICAgICAgbmFtZTogJ3BrX2VudGl0eScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJma19uYW1lc3BhY2VcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19uYW1lc3BhY2UnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVsYXRpb25zOiB7XG4gICAgICAgIG5hbWVzcGFjZToge1xuICAgICAgICAgIG5hbWU6ICduYW1lc3BhY2UnLFxuICAgICAgICAgIHR5cGU6ICdEYXROYW1lc3BhY2UnLFxuICAgICAgICAgIG1vZGVsOiAnRGF0TmFtZXNwYWNlJyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdiZWxvbmdzVG8nLFxuICAgICAgICAgICAgICAgICAga2V5RnJvbTogJ2ZrX25hbWVzcGFjZScsXG4gICAgICAgICAga2V5VG86ICdwa19lbnRpdHknXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=