var InfPlace = /** @class */ (function () {
    function InfPlace(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfPlace`.
     */
    InfPlace.getModelName = function () {
        return "InfPlace";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of InfPlace for dynamic purposes.
    **/
    InfPlace.factory = function (data) {
        return new InfPlace(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    InfPlace.getModelDefinition = function () {
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
    };
    return InfPlace;
}());
export { InfPlace };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5mUGxhY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNkay1sYjMvIiwic291cmNlcyI6WyJsaWIvc2RrL21vZGVscy9JbmZQbGFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFjQTtJQU1FLGtCQUFZLElBQXdCO1FBQ2xDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRDs7O09BR0c7SUFDVyxxQkFBWSxHQUExQjtRQUNFLE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7SUFDRDs7Ozs7T0FLRztJQUNXLGdCQUFPLEdBQXJCLFVBQXNCLElBQXVCO1FBQzNDLE9BQU8sSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNEOzs7Ozs7T0FNRztJQUNXLDJCQUFrQixHQUFoQztRQUNFLE9BQU87WUFDTCxJQUFJLEVBQUUsVUFBVTtZQUNoQixNQUFNLEVBQUUsV0FBVztZQUNuQixJQUFJLEVBQUUsV0FBVztZQUNqQixNQUFNLEVBQUUsV0FBVztZQUNuQixVQUFVLEVBQUU7Z0JBQ1YsTUFBTSxFQUFFO29CQUNOLElBQUksRUFBRSxNQUFNO29CQUNaLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELEtBQUssRUFBRTtvQkFDTCxJQUFJLEVBQUUsS0FBSztvQkFDWCxJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxVQUFVLEVBQUU7b0JBQ1YsSUFBSSxFQUFFLFVBQVU7b0JBQ2hCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELFdBQVcsRUFBRTtvQkFDWCxJQUFJLEVBQUUsV0FBVztvQkFDakIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7YUFDRjtZQUNELFNBQVMsRUFBRTtnQkFDVCwyQkFBMkIsRUFBRTtvQkFDM0IsSUFBSSxFQUFFLDZCQUE2QjtvQkFDbkMsSUFBSSxFQUFFLGtCQUFrQjtvQkFDeEIsS0FBSyxFQUFFLGdCQUFnQjtvQkFDdkIsWUFBWSxFQUFFLFNBQVM7b0JBQ2YsT0FBTyxFQUFFLFdBQVc7b0JBQzVCLEtBQUssRUFBRSxXQUFXO2lCQUNuQjthQUNGO1NBQ0YsQ0FBQTtJQUNILENBQUM7SUFDSCxlQUFDO0FBQUQsQ0FBQyxBQXBFRCxJQW9FQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5pbXBvcnQge1xuICBQcm9JbmZvUHJvalJlbFxufSBmcm9tICcuLi9pbmRleCc7XG5cbmRlY2xhcmUgdmFyIE9iamVjdDogYW55O1xuZXhwb3J0IGludGVyZmFjZSBJbmZQbGFjZUludGVyZmFjZSB7XG4gIFwibG9uZ1wiOiBudW1iZXI7XG4gIFwibGF0XCI6IG51bWJlcjtcbiAgXCJma19jbGFzc1wiOiBudW1iZXI7XG4gIFwicGtfZW50aXR5XCI/OiBudW1iZXI7XG4gIGVudGl0eV92ZXJzaW9uX3Byb2plY3RfcmVscz86IFByb0luZm9Qcm9qUmVsW107XG59XG5cbmV4cG9ydCBjbGFzcyBJbmZQbGFjZSBpbXBsZW1lbnRzIEluZlBsYWNlSW50ZXJmYWNlIHtcbiAgXCJsb25nXCI6IG51bWJlcjtcbiAgXCJsYXRcIjogbnVtYmVyO1xuICBcImZrX2NsYXNzXCI6IG51bWJlcjtcbiAgXCJwa19lbnRpdHlcIjogbnVtYmVyO1xuICBlbnRpdHlfdmVyc2lvbl9wcm9qZWN0X3JlbHM/OiBQcm9JbmZvUHJvalJlbFtdO1xuICBjb25zdHJ1Y3RvcihkYXRhPzogSW5mUGxhY2VJbnRlcmZhY2UpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xuICB9XG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyAkcmVzb3VyY2UsXG4gICAqIGkuZS4gYEluZlBsYWNlYC5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxOYW1lKCkge1xuICAgIHJldHVybiBcIkluZlBsYWNlXCI7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBmYWN0b3J5XG4gICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1Ymlhc1xuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIGNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgSW5mUGxhY2UgZm9yIGR5bmFtaWMgcHVycG9zZXMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGZhY3RvcnkoZGF0YTogSW5mUGxhY2VJbnRlcmZhY2UpOiBJbmZQbGFjZXtcbiAgICByZXR1cm4gbmV3IEluZlBsYWNlKGRhdGEpO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgZ2V0TW9kZWxEZWZpbml0aW9uXG4gICogQGF1dGhvciBKdWxpZW4gTGVkdW5cbiAgKiBAbGljZW5zZSBNSVRcbiAgKiBUaGlzIG1ldGhvZCByZXR1cm5zIGFuIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgc29tZSBvZiB0aGUgbW9kZWxcbiAgKiBkZWZpbml0aW9ucy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxEZWZpbml0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiAnSW5mUGxhY2UnLFxuICAgICAgcGx1cmFsOiAnSW5mUGxhY2VzJyxcbiAgICAgIHBhdGg6ICdJbmZQbGFjZXMnLFxuICAgICAgaWROYW1lOiAncGtfZW50aXR5JyxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgXCJsb25nXCI6IHtcbiAgICAgICAgICBuYW1lOiAnbG9uZycsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJsYXRcIjoge1xuICAgICAgICAgIG5hbWU6ICdsYXQnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfY2xhc3NcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19jbGFzcycsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJwa19lbnRpdHlcIjoge1xuICAgICAgICAgIG5hbWU6ICdwa19lbnRpdHknLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVsYXRpb25zOiB7XG4gICAgICAgIGVudGl0eV92ZXJzaW9uX3Byb2plY3RfcmVsczoge1xuICAgICAgICAgIG5hbWU6ICdlbnRpdHlfdmVyc2lvbl9wcm9qZWN0X3JlbHMnLFxuICAgICAgICAgIHR5cGU6ICdQcm9JbmZvUHJvalJlbFtdJyxcbiAgICAgICAgICBtb2RlbDogJ1Byb0luZm9Qcm9qUmVsJyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdoYXNNYW55JyxcbiAgICAgICAgICAgICAgICAgIGtleUZyb206ICdwa19lbnRpdHknLFxuICAgICAgICAgIGtleVRvOiAnZmtfZW50aXR5J1xuICAgICAgICB9LFxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19