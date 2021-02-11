export class InfPlace {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfPlace`.
     */
    static getModelName() {
        return "InfPlace";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of InfPlace for dynamic purposes.
    **/
    static factory(data) {
        return new InfPlace(data);
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
            name: 'InfPlace',
            plural: 'InfPlaces',
            path: 'InfPlaces',
            idName: 'pk_entity',
            properties: {
                "long": {
                    name: 'long',
                    type: 'number'
                },
                "lat": {
                    name: 'lat',
                    type: 'number'
                },
                "fk_class": {
                    name: 'fk_class',
                    type: 'number'
                },
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
            },
            relations: {
                entity_version_project_rels: {
                    name: 'entity_version_project_rels',
                    type: 'ProInfoProjRel[]',
                    model: 'ProInfoProjRel',
                    relationType: 'hasMany',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_entity'
                },
            }
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5mUGxhY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNkay1sYjMvIiwic291cmNlcyI6WyJsaWIvc2RrL21vZGVscy9JbmZQbGFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFjQSxNQUFNLE9BQU8sUUFBUTtJQU1uQixZQUFZLElBQXdCO1FBQ2xDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsWUFBWTtRQUN4QixPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQXVCO1FBQzNDLE9BQU8sSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNEOzs7Ozs7T0FNRztJQUNJLE1BQU0sQ0FBQyxrQkFBa0I7UUFDOUIsT0FBTztZQUNMLElBQUksRUFBRSxVQUFVO1lBQ2hCLE1BQU0sRUFBRSxXQUFXO1lBQ25CLElBQUksRUFBRSxXQUFXO1lBQ2pCLE1BQU0sRUFBRSxXQUFXO1lBQ25CLFVBQVUsRUFBRTtnQkFDVixNQUFNLEVBQUU7b0JBQ04sSUFBSSxFQUFFLE1BQU07b0JBQ1osSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsS0FBSyxFQUFFO29CQUNMLElBQUksRUFBRSxLQUFLO29CQUNYLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELFVBQVUsRUFBRTtvQkFDVixJQUFJLEVBQUUsVUFBVTtvQkFDaEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsV0FBVyxFQUFFO29CQUNYLElBQUksRUFBRSxXQUFXO29CQUNqQixJQUFJLEVBQUUsUUFBUTtpQkFDZjthQUNGO1lBQ0QsU0FBUyxFQUFFO2dCQUNULDJCQUEyQixFQUFFO29CQUMzQixJQUFJLEVBQUUsNkJBQTZCO29CQUNuQyxJQUFJLEVBQUUsa0JBQWtCO29CQUN4QixLQUFLLEVBQUUsZ0JBQWdCO29CQUN2QixZQUFZLEVBQUUsU0FBUztvQkFDZixPQUFPLEVBQUUsV0FBVztvQkFDNUIsS0FBSyxFQUFFLFdBQVc7aUJBQ25CO2FBQ0Y7U0FDRixDQUFBO0lBQ0gsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cbmltcG9ydCB7XG4gIFByb0luZm9Qcm9qUmVsXG59IGZyb20gJy4uL2luZGV4JztcblxuZGVjbGFyZSB2YXIgT2JqZWN0OiBhbnk7XG5leHBvcnQgaW50ZXJmYWNlIEluZlBsYWNlSW50ZXJmYWNlIHtcbiAgXCJsb25nXCI6IG51bWJlcjtcbiAgXCJsYXRcIjogbnVtYmVyO1xuICBcImZrX2NsYXNzXCI6IG51bWJlcjtcbiAgXCJwa19lbnRpdHlcIj86IG51bWJlcjtcbiAgZW50aXR5X3ZlcnNpb25fcHJvamVjdF9yZWxzPzogUHJvSW5mb1Byb2pSZWxbXTtcbn1cblxuZXhwb3J0IGNsYXNzIEluZlBsYWNlIGltcGxlbWVudHMgSW5mUGxhY2VJbnRlcmZhY2Uge1xuICBcImxvbmdcIjogbnVtYmVyO1xuICBcImxhdFwiOiBudW1iZXI7XG4gIFwiZmtfY2xhc3NcIjogbnVtYmVyO1xuICBcInBrX2VudGl0eVwiOiBudW1iZXI7XG4gIGVudGl0eV92ZXJzaW9uX3Byb2plY3RfcmVscz86IFByb0luZm9Qcm9qUmVsW107XG4gIGNvbnN0cnVjdG9yKGRhdGE/OiBJbmZQbGFjZUludGVyZmFjZSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG4gIH1cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBtb2RlbCByZXByZXNlbnRlZCBieSB0aGlzICRyZXNvdXJjZSxcbiAgICogaS5lLiBgSW5mUGxhY2VgLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbE5hbWUoKSB7XG4gICAgcmV0dXJuIFwiSW5mUGxhY2VcIjtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGZhY3RvcnlcbiAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgY3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBJbmZQbGFjZSBmb3IgZHluYW1pYyBwdXJwb3Nlcy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0aWMgZmFjdG9yeShkYXRhOiBJbmZQbGFjZUludGVyZmFjZSk6IEluZlBsYWNle1xuICAgIHJldHVybiBuZXcgSW5mUGxhY2UoZGF0YSk7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBnZXRNb2RlbERlZmluaXRpb25cbiAgKiBAYXV0aG9yIEp1bGllbiBMZWR1blxuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIHJldHVybnMgYW4gb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBzb21lIG9mIHRoZSBtb2RlbFxuICAqIGRlZmluaXRpb25zLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbERlZmluaXRpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6ICdJbmZQbGFjZScsXG4gICAgICBwbHVyYWw6ICdJbmZQbGFjZXMnLFxuICAgICAgcGF0aDogJ0luZlBsYWNlcycsXG4gICAgICBpZE5hbWU6ICdwa19lbnRpdHknLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBcImxvbmdcIjoge1xuICAgICAgICAgIG5hbWU6ICdsb25nJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcImxhdFwiOiB7XG4gICAgICAgICAgbmFtZTogJ2xhdCcsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJma19jbGFzc1wiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX2NsYXNzJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcInBrX2VudGl0eVwiOiB7XG4gICAgICAgICAgbmFtZTogJ3BrX2VudGl0eScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZWxhdGlvbnM6IHtcbiAgICAgICAgZW50aXR5X3ZlcnNpb25fcHJvamVjdF9yZWxzOiB7XG4gICAgICAgICAgbmFtZTogJ2VudGl0eV92ZXJzaW9uX3Byb2plY3RfcmVscycsXG4gICAgICAgICAgdHlwZTogJ1Byb0luZm9Qcm9qUmVsW10nLFxuICAgICAgICAgIG1vZGVsOiAnUHJvSW5mb1Byb2pSZWwnLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2hhc01hbnknLFxuICAgICAgICAgICAgICAgICAga2V5RnJvbTogJ3BrX2VudGl0eScsXG4gICAgICAgICAga2V5VG86ICdma19lbnRpdHknXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=