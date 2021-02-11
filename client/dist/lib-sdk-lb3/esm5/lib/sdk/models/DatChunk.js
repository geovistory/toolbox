var DatChunk = /** @class */ (function () {
    function DatChunk(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `DatChunk`.
     */
    DatChunk.getModelName = function () {
        return "DatChunk";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of DatChunk for dynamic purposes.
    **/
    DatChunk.factory = function (data) {
        return new DatChunk(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    DatChunk.getModelDefinition = function () {
        return {
            name: 'DatChunk',
            plural: 'DatChunks',
            path: 'DatChunks',
            idName: 'pk_entity',
            properties: {
                "quill_doc": {
                    name: 'quill_doc',
                    type: 'any'
                },
                "string": {
                    name: 'string',
                    type: 'string'
                },
                "fk_text": {
                    name: 'fk_text',
                    type: 'number'
                },
                "fk_entity_version": {
                    name: 'fk_entity_version',
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
                digital: {
                    name: 'digital',
                    type: 'DatDigital',
                    model: 'DatDigital',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_text',
                    keyTo: 'pk_text'
                },
                outgoing_statements: {
                    name: 'outgoing_statements',
                    type: 'InfStatement[]',
                    model: 'InfStatement',
                    relationType: 'hasMany',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_subject_data'
                },
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
    };
    return DatChunk;
}());
export { DatChunk };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0Q2h1bmsuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNkay1sYjMvIiwic291cmNlcyI6WyJsaWIvc2RrL21vZGVscy9EYXRDaHVuay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFvQkE7SUFVRSxrQkFBWSxJQUF3QjtRQUNsQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0Q7OztPQUdHO0lBQ1cscUJBQVksR0FBMUI7UUFDRSxPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFDVyxnQkFBTyxHQUFyQixVQUFzQixJQUF1QjtRQUMzQyxPQUFPLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRDs7Ozs7O09BTUc7SUFDVywyQkFBa0IsR0FBaEM7UUFDRSxPQUFPO1lBQ0wsSUFBSSxFQUFFLFVBQVU7WUFDaEIsTUFBTSxFQUFFLFdBQVc7WUFDbkIsSUFBSSxFQUFFLFdBQVc7WUFDakIsTUFBTSxFQUFFLFdBQVc7WUFDbkIsVUFBVSxFQUFFO2dCQUNWLFdBQVcsRUFBRTtvQkFDWCxJQUFJLEVBQUUsV0FBVztvQkFDakIsSUFBSSxFQUFFLEtBQUs7aUJBQ1o7Z0JBQ0QsUUFBUSxFQUFFO29CQUNSLElBQUksRUFBRSxRQUFRO29CQUNkLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELFNBQVMsRUFBRTtvQkFDVCxJQUFJLEVBQUUsU0FBUztvQkFDZixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxtQkFBbUIsRUFBRTtvQkFDbkIsSUFBSSxFQUFFLG1CQUFtQjtvQkFDekIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsV0FBVyxFQUFFO29CQUNYLElBQUksRUFBRSxXQUFXO29CQUNqQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxjQUFjLEVBQUU7b0JBQ2QsSUFBSSxFQUFFLGNBQWM7b0JBQ3BCLElBQUksRUFBRSxRQUFRO2lCQUNmO2FBQ0Y7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsT0FBTyxFQUFFO29CQUNQLElBQUksRUFBRSxTQUFTO29CQUNmLElBQUksRUFBRSxZQUFZO29CQUNsQixLQUFLLEVBQUUsWUFBWTtvQkFDbkIsWUFBWSxFQUFFLFdBQVc7b0JBQ2pCLE9BQU8sRUFBRSxTQUFTO29CQUMxQixLQUFLLEVBQUUsU0FBUztpQkFDakI7Z0JBQ0QsbUJBQW1CLEVBQUU7b0JBQ25CLElBQUksRUFBRSxxQkFBcUI7b0JBQzNCLElBQUksRUFBRSxnQkFBZ0I7b0JBQ3RCLEtBQUssRUFBRSxjQUFjO29CQUNyQixZQUFZLEVBQUUsU0FBUztvQkFDZixPQUFPLEVBQUUsV0FBVztvQkFDNUIsS0FBSyxFQUFFLGlCQUFpQjtpQkFDekI7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULElBQUksRUFBRSxXQUFXO29CQUNqQixJQUFJLEVBQUUsY0FBYztvQkFDcEIsS0FBSyxFQUFFLGNBQWM7b0JBQ3JCLFlBQVksRUFBRSxXQUFXO29CQUNqQixPQUFPLEVBQUUsY0FBYztvQkFDL0IsS0FBSyxFQUFFLFdBQVc7aUJBQ25CO2FBQ0Y7U0FDRixDQUFBO0lBQ0gsQ0FBQztJQUNILGVBQUM7QUFBRCxDQUFDLEFBaEdELElBZ0dDIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cbmltcG9ydCB7XG4gIERhdERpZ2l0YWwsXG4gIEluZlN0YXRlbWVudCxcbiAgRGF0TmFtZXNwYWNlXG59IGZyb20gJy4uL2luZGV4JztcblxuZGVjbGFyZSB2YXIgT2JqZWN0OiBhbnk7XG5leHBvcnQgaW50ZXJmYWNlIERhdENodW5rSW50ZXJmYWNlIHtcbiAgXCJxdWlsbF9kb2NcIj86IGFueTtcbiAgXCJzdHJpbmdcIj86IHN0cmluZztcbiAgXCJma190ZXh0XCI6IG51bWJlcjtcbiAgXCJma19lbnRpdHlfdmVyc2lvblwiOiBudW1iZXI7XG4gIFwicGtfZW50aXR5XCI/OiBudW1iZXI7XG4gIFwiZmtfbmFtZXNwYWNlXCI/OiBudW1iZXI7XG4gIGRpZ2l0YWw/OiBEYXREaWdpdGFsO1xuICBvdXRnb2luZ19zdGF0ZW1lbnRzPzogSW5mU3RhdGVtZW50W107XG4gIG5hbWVzcGFjZT86IERhdE5hbWVzcGFjZTtcbn1cblxuZXhwb3J0IGNsYXNzIERhdENodW5rIGltcGxlbWVudHMgRGF0Q2h1bmtJbnRlcmZhY2Uge1xuICBcInF1aWxsX2RvY1wiOiBhbnk7XG4gIFwic3RyaW5nXCI6IHN0cmluZztcbiAgXCJma190ZXh0XCI6IG51bWJlcjtcbiAgXCJma19lbnRpdHlfdmVyc2lvblwiOiBudW1iZXI7XG4gIFwicGtfZW50aXR5XCI6IG51bWJlcjtcbiAgXCJma19uYW1lc3BhY2VcIjogbnVtYmVyO1xuICBkaWdpdGFsPzogRGF0RGlnaXRhbDtcbiAgb3V0Z29pbmdfc3RhdGVtZW50cz86IEluZlN0YXRlbWVudFtdO1xuICBuYW1lc3BhY2U/OiBEYXROYW1lc3BhY2U7XG4gIGNvbnN0cnVjdG9yKGRhdGE/OiBEYXRDaHVua0ludGVyZmFjZSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG4gIH1cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBtb2RlbCByZXByZXNlbnRlZCBieSB0aGlzICRyZXNvdXJjZSxcbiAgICogaS5lLiBgRGF0Q2h1bmtgLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbE5hbWUoKSB7XG4gICAgcmV0dXJuIFwiRGF0Q2h1bmtcIjtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGZhY3RvcnlcbiAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgY3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBEYXRDaHVuayBmb3IgZHluYW1pYyBwdXJwb3Nlcy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0aWMgZmFjdG9yeShkYXRhOiBEYXRDaHVua0ludGVyZmFjZSk6IERhdENodW5re1xuICAgIHJldHVybiBuZXcgRGF0Q2h1bmsoZGF0YSk7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBnZXRNb2RlbERlZmluaXRpb25cbiAgKiBAYXV0aG9yIEp1bGllbiBMZWR1blxuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIHJldHVybnMgYW4gb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBzb21lIG9mIHRoZSBtb2RlbFxuICAqIGRlZmluaXRpb25zLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbERlZmluaXRpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6ICdEYXRDaHVuaycsXG4gICAgICBwbHVyYWw6ICdEYXRDaHVua3MnLFxuICAgICAgcGF0aDogJ0RhdENodW5rcycsXG4gICAgICBpZE5hbWU6ICdwa19lbnRpdHknLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBcInF1aWxsX2RvY1wiOiB7XG4gICAgICAgICAgbmFtZTogJ3F1aWxsX2RvYycsXG4gICAgICAgICAgdHlwZTogJ2FueSdcbiAgICAgICAgfSxcbiAgICAgICAgXCJzdHJpbmdcIjoge1xuICAgICAgICAgIG5hbWU6ICdzdHJpbmcnLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfdGV4dFwiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX3RleHQnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfZW50aXR5X3ZlcnNpb25cIjoge1xuICAgICAgICAgIG5hbWU6ICdma19lbnRpdHlfdmVyc2lvbicsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJwa19lbnRpdHlcIjoge1xuICAgICAgICAgIG5hbWU6ICdwa19lbnRpdHknLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfbmFtZXNwYWNlXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfbmFtZXNwYWNlJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlbGF0aW9uczoge1xuICAgICAgICBkaWdpdGFsOiB7XG4gICAgICAgICAgbmFtZTogJ2RpZ2l0YWwnLFxuICAgICAgICAgIHR5cGU6ICdEYXREaWdpdGFsJyxcbiAgICAgICAgICBtb2RlbDogJ0RhdERpZ2l0YWwnLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2JlbG9uZ3NUbycsXG4gICAgICAgICAgICAgICAgICBrZXlGcm9tOiAnZmtfdGV4dCcsXG4gICAgICAgICAga2V5VG86ICdwa190ZXh0J1xuICAgICAgICB9LFxuICAgICAgICBvdXRnb2luZ19zdGF0ZW1lbnRzOiB7XG4gICAgICAgICAgbmFtZTogJ291dGdvaW5nX3N0YXRlbWVudHMnLFxuICAgICAgICAgIHR5cGU6ICdJbmZTdGF0ZW1lbnRbXScsXG4gICAgICAgICAgbW9kZWw6ICdJbmZTdGF0ZW1lbnQnLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2hhc01hbnknLFxuICAgICAgICAgICAgICAgICAga2V5RnJvbTogJ3BrX2VudGl0eScsXG4gICAgICAgICAga2V5VG86ICdma19zdWJqZWN0X2RhdGEnXG4gICAgICAgIH0sXG4gICAgICAgIG5hbWVzcGFjZToge1xuICAgICAgICAgIG5hbWU6ICduYW1lc3BhY2UnLFxuICAgICAgICAgIHR5cGU6ICdEYXROYW1lc3BhY2UnLFxuICAgICAgICAgIG1vZGVsOiAnRGF0TmFtZXNwYWNlJyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdiZWxvbmdzVG8nLFxuICAgICAgICAgICAgICAgICAga2V5RnJvbTogJ2ZrX25hbWVzcGFjZScsXG4gICAgICAgICAga2V5VG86ICdwa19lbnRpdHknXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=