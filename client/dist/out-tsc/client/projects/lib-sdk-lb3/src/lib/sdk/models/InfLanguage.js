export class InfLanguage {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfLanguage`.
     */
    static getModelName() {
        return "InfLanguage";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of InfLanguage for dynamic purposes.
    **/
    static factory(data) {
        return new InfLanguage(data);
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
            name: 'InfLanguage',
            plural: 'InfLanguages',
            path: 'InfLanguages',
            idName: 'pk_entity',
            properties: {
                "fk_class": {
                    name: 'fk_class',
                    type: 'number'
                },
                "pk_language": {
                    name: 'pk_language',
                    type: 'string'
                },
                "lang_type": {
                    name: 'lang_type',
                    type: 'string'
                },
                "scope": {
                    name: 'scope',
                    type: 'string'
                },
                "iso6392b": {
                    name: 'iso6392b',
                    type: 'string'
                },
                "iso6392t": {
                    name: 'iso6392t',
                    type: 'string'
                },
                "iso6391": {
                    name: 'iso6391',
                    type: 'string'
                },
                "notes": {
                    name: 'notes',
                    type: 'string'
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
//# sourceMappingURL=InfLanguage.js.map