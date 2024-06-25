/* eslint-disable @typescript-eslint/camelcase */
import {InfLanguage} from '@kleiolab/lib-sdk-lb4';
import {DfhApiClassMock} from './DfhApiClassMock';
import {OmitEntity} from './local-model.helpers';

/**
 * pk_entity prefixed with 100
 */

export class InfLanguageMock {
  static readonly ENGLISH: OmitEntity<InfLanguage> = {
    fk_class: DfhApiClassMock.EN_54_LANGUAGE.dfh_pk_class,
    "notes": "English",
    "iso6391": "en ",
    "iso6392b": "eng",
    "iso6392t": "eng",
    "pk_entity": 18889,
    "pk_language": "eng"
  }
  static readonly GERMAN: OmitEntity<InfLanguage> = {
    fk_class: DfhApiClassMock.EN_54_LANGUAGE.dfh_pk_class,
    "notes": "German",
    "iso6391": "de ",
    "iso6392b": "ger",
    "iso6392t": "deu",
    "pk_entity": 18605,
    "pk_language": "deu"
  }

  static readonly ITALIAN: OmitEntity<InfLanguage> = {
    fk_class: DfhApiClassMock.EN_54_LANGUAGE.dfh_pk_class,
    "notes": "Italian",
    "iso6391": "it ",
    "iso6392b": "ita",
    "iso6392t": "ita",
    "pk_entity": 19703,
    "pk_language": "ita"
  }

  static readonly FRENCH: OmitEntity<InfLanguage> = {
    fk_class: DfhApiClassMock.EN_54_LANGUAGE.dfh_pk_class,
    "notes": "French",
    "iso6391": "fr ",
    "iso6392b": "fre",
    "iso6392t": "fra",
    "pk_entity": 19008,
    "pk_language": "fra"
  }
}


/**
 * SQL to create mock
 */
// SELECT jsonb_pretty(jsonb_build_object(
//   'pk_entity',pk_entity,
//   'notes',notes,
//   'pk_language', pk_language,
//   'fk_class', fk_class,
//   'iso6391',iso6391,
//   'iso6392b',iso6392b,
//   'iso6392t',iso6392t
//   ))
//   FROM information.language t1
//   WHERE iso6391 =  'en'
