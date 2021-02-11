export class DatColumn {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `DatColumn`.
     */
    static getModelName() {
        return "DatColumn";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of DatColumn for dynamic purposes.
    **/
    static factory(data) {
        return new DatColumn(data);
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
            name: 'DatColumn',
            plural: 'DatColumns',
            path: 'DatColumns',
            idName: 'pk_entity',
            properties: {
                "fk_digital": {
                    name: 'fk_digital',
                    type: 'number'
                },
                "fk_data_type": {
                    name: 'fk_data_type',
                    type: 'number'
                },
                "fk_column_content_type": {
                    name: 'fk_column_content_type',
                    type: 'number'
                },
                "fk_column_relationship_type": {
                    name: 'fk_column_relationship_type',
                    type: 'number'
                },
                "fk_original_column": {
                    name: 'fk_original_column',
                    type: 'number'
                },
                "is_imported": {
                    name: 'is_imported',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0Q29sdW1uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1zZGstbGIzLyIsInNvdXJjZXMiOlsibGliL3Nkay9tb2RlbHMvRGF0Q29sdW1uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWtCQSxNQUFNLE9BQU8sU0FBUztJQVVwQixZQUFZLElBQXlCO1FBQ25DLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsWUFBWTtRQUN4QixPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQXdCO1FBQzVDLE9BQU8sSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUNEOzs7Ozs7T0FNRztJQUNJLE1BQU0sQ0FBQyxrQkFBa0I7UUFDOUIsT0FBTztZQUNMLElBQUksRUFBRSxXQUFXO1lBQ2pCLE1BQU0sRUFBRSxZQUFZO1lBQ3BCLElBQUksRUFBRSxZQUFZO1lBQ2xCLE1BQU0sRUFBRSxXQUFXO1lBQ25CLFVBQVUsRUFBRTtnQkFDVixZQUFZLEVBQUU7b0JBQ1osSUFBSSxFQUFFLFlBQVk7b0JBQ2xCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELGNBQWMsRUFBRTtvQkFDZCxJQUFJLEVBQUUsY0FBYztvQkFDcEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0Qsd0JBQXdCLEVBQUU7b0JBQ3hCLElBQUksRUFBRSx3QkFBd0I7b0JBQzlCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELDZCQUE2QixFQUFFO29CQUM3QixJQUFJLEVBQUUsNkJBQTZCO29CQUNuQyxJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxvQkFBb0IsRUFBRTtvQkFDcEIsSUFBSSxFQUFFLG9CQUFvQjtvQkFDMUIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsYUFBYSxFQUFFO29CQUNiLElBQUksRUFBRSxhQUFhO29CQUNuQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxXQUFXLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELGNBQWMsRUFBRTtvQkFDZCxJQUFJLEVBQUUsY0FBYztvQkFDcEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7YUFDRjtZQUNELFNBQVMsRUFBRTtnQkFDVCxTQUFTLEVBQUU7b0JBQ1QsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLElBQUksRUFBRSxjQUFjO29CQUNwQixLQUFLLEVBQUUsY0FBYztvQkFDckIsWUFBWSxFQUFFLFdBQVc7b0JBQ2pCLE9BQU8sRUFBRSxjQUFjO29CQUMvQixLQUFLLEVBQUUsV0FBVztpQkFDbkI7YUFDRjtTQUNGLENBQUE7SUFDSCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuaW1wb3J0IHtcbiAgRGF0TmFtZXNwYWNlXG59IGZyb20gJy4uL2luZGV4JztcblxuZGVjbGFyZSB2YXIgT2JqZWN0OiBhbnk7XG5leHBvcnQgaW50ZXJmYWNlIERhdENvbHVtbkludGVyZmFjZSB7XG4gIFwiZmtfZGlnaXRhbFwiPzogbnVtYmVyO1xuICBcImZrX2RhdGFfdHlwZVwiPzogbnVtYmVyO1xuICBcImZrX2NvbHVtbl9jb250ZW50X3R5cGVcIj86IG51bWJlcjtcbiAgXCJma19jb2x1bW5fcmVsYXRpb25zaGlwX3R5cGVcIj86IG51bWJlcjtcbiAgXCJma19vcmlnaW5hbF9jb2x1bW5cIj86IG51bWJlcjtcbiAgXCJpc19pbXBvcnRlZFwiPzogbnVtYmVyO1xuICBcInBrX2VudGl0eVwiPzogbnVtYmVyO1xuICBcImZrX25hbWVzcGFjZVwiPzogbnVtYmVyO1xuICBuYW1lc3BhY2U/OiBEYXROYW1lc3BhY2U7XG59XG5cbmV4cG9ydCBjbGFzcyBEYXRDb2x1bW4gaW1wbGVtZW50cyBEYXRDb2x1bW5JbnRlcmZhY2Uge1xuICBcImZrX2RpZ2l0YWxcIjogbnVtYmVyO1xuICBcImZrX2RhdGFfdHlwZVwiOiBudW1iZXI7XG4gIFwiZmtfY29sdW1uX2NvbnRlbnRfdHlwZVwiOiBudW1iZXI7XG4gIFwiZmtfY29sdW1uX3JlbGF0aW9uc2hpcF90eXBlXCI6IG51bWJlcjtcbiAgXCJma19vcmlnaW5hbF9jb2x1bW5cIjogbnVtYmVyO1xuICBcImlzX2ltcG9ydGVkXCI6IG51bWJlcjtcbiAgXCJwa19lbnRpdHlcIjogbnVtYmVyO1xuICBcImZrX25hbWVzcGFjZVwiOiBudW1iZXI7XG4gIG5hbWVzcGFjZT86IERhdE5hbWVzcGFjZTtcbiAgY29uc3RydWN0b3IoZGF0YT86IERhdENvbHVtbkludGVyZmFjZSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG4gIH1cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBtb2RlbCByZXByZXNlbnRlZCBieSB0aGlzICRyZXNvdXJjZSxcbiAgICogaS5lLiBgRGF0Q29sdW1uYC5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxOYW1lKCkge1xuICAgIHJldHVybiBcIkRhdENvbHVtblwiO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgZmFjdG9yeVxuICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXNcbiAgKiBAbGljZW5zZSBNSVRcbiAgKiBUaGlzIG1ldGhvZCBjcmVhdGVzIGFuIGluc3RhbmNlIG9mIERhdENvbHVtbiBmb3IgZHluYW1pYyBwdXJwb3Nlcy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0aWMgZmFjdG9yeShkYXRhOiBEYXRDb2x1bW5JbnRlcmZhY2UpOiBEYXRDb2x1bW57XG4gICAgcmV0dXJuIG5ldyBEYXRDb2x1bW4oZGF0YSk7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBnZXRNb2RlbERlZmluaXRpb25cbiAgKiBAYXV0aG9yIEp1bGllbiBMZWR1blxuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIHJldHVybnMgYW4gb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBzb21lIG9mIHRoZSBtb2RlbFxuICAqIGRlZmluaXRpb25zLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbERlZmluaXRpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6ICdEYXRDb2x1bW4nLFxuICAgICAgcGx1cmFsOiAnRGF0Q29sdW1ucycsXG4gICAgICBwYXRoOiAnRGF0Q29sdW1ucycsXG4gICAgICBpZE5hbWU6ICdwa19lbnRpdHknLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBcImZrX2RpZ2l0YWxcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19kaWdpdGFsJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcImZrX2RhdGFfdHlwZVwiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX2RhdGFfdHlwZScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJma19jb2x1bW5fY29udGVudF90eXBlXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfY29sdW1uX2NvbnRlbnRfdHlwZScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJma19jb2x1bW5fcmVsYXRpb25zaGlwX3R5cGVcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19jb2x1bW5fcmVsYXRpb25zaGlwX3R5cGUnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfb3JpZ2luYWxfY29sdW1uXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfb3JpZ2luYWxfY29sdW1uJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcImlzX2ltcG9ydGVkXCI6IHtcbiAgICAgICAgICBuYW1lOiAnaXNfaW1wb3J0ZWQnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwicGtfZW50aXR5XCI6IHtcbiAgICAgICAgICBuYW1lOiAncGtfZW50aXR5JyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcImZrX25hbWVzcGFjZVwiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX25hbWVzcGFjZScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZWxhdGlvbnM6IHtcbiAgICAgICAgbmFtZXNwYWNlOiB7XG4gICAgICAgICAgbmFtZTogJ25hbWVzcGFjZScsXG4gICAgICAgICAgdHlwZTogJ0RhdE5hbWVzcGFjZScsXG4gICAgICAgICAgbW9kZWw6ICdEYXROYW1lc3BhY2UnLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2JlbG9uZ3NUbycsXG4gICAgICAgICAgICAgICAgICBrZXlGcm9tOiAnZmtfbmFtZXNwYWNlJyxcbiAgICAgICAgICBrZXlUbzogJ3BrX2VudGl0eSdcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==