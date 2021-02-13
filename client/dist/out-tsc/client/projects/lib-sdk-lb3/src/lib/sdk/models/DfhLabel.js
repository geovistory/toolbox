/* tslint:disable */
export class DfhLabel {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `DfhLabel`.
     */
    static getModelName() {
        return "DfhLabel";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of DfhLabel for dynamic purposes.
    **/
    static factory(data) {
        return new DfhLabel(data);
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
            name: 'DfhLabel',
            plural: 'DfhLabels',
            path: 'DfhLabels',
            idName: 'type',
            properties: {
                "type": {
                    name: 'type',
                    type: 'string'
                },
                "label": {
                    name: 'label',
                    type: 'string'
                },
                "language": {
                    name: 'language',
                    type: 'string'
                },
                "fk_profile": {
                    name: 'fk_profile',
                    type: 'number'
                },
                "fk_project": {
                    name: 'fk_project',
                    type: 'number'
                },
                "fk_property": {
                    name: 'fk_property',
                    type: 'number'
                },
                "fk_class": {
                    name: 'fk_class',
                    type: 'number'
                },
            },
            relations: {}
        };
    }
}
//# sourceMappingURL=DfhLabel.js.map