/* tslint:disable */
import {
  InfLanguage
} from '../index';

declare var Object: any;
export interface ComLanguageInterface {
  "pk_language": string;
  "lang_type"?: string;
  "scope"?: string;
  "iso6392b"?: string;
  "iso6392t"?: string;
  "iso6391"?: string;
  "notes"?: string;
  inf_language?: InfLanguage;
}

export class ComLanguage implements ComLanguageInterface {
  "pk_language": string;
  "lang_type": string;
  "scope": string;
  "iso6392b": string;
  "iso6392t": string;
  "iso6391": string;
  "notes": string;
  inf_language?: InfLanguage;
  constructor(data?: ComLanguageInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ComLanguage`.
   */
  public static getModelName() {
    return "ComLanguage";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ComLanguage for dynamic purposes.
  **/
  public static factory(data: ComLanguageInterface): ComLanguage{
    return new ComLanguage(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'ComLanguage',
      plural: 'ComLanguages',
      path: 'ComLanguages',
      idName: 'pk_language',
      properties: {
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
      },
      relations: {
        inf_language: {
          name: 'inf_language',
          type: 'InfLanguage',
          model: 'InfLanguage',
          relationType: 'hasOne',
                  keyFrom: 'pk_language',
          keyTo: 'pk_language'
        },
      }
    }
  }
}
