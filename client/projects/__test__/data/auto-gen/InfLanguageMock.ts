/* eslint-disable @typescript-eslint/camelcase */
import { InfLanguage } from '@kleiolab/lib-sdk-lb4';

/**
 * pk_entity prefixed with 100
 */

export class InfLanguageMock {
  static readonly ENGLISH: Partial<InfLanguage> = ({
    "notes": "English",
    "iso6391": "en ",
    "iso6392b": "eng",
    "iso6392t": "eng",
    "pk_entity": 18889,
    "pk_language": "eng"
  })
  static readonly GERMAN: Partial<InfLanguage> = ({
    "notes": "German",
    "iso6391": "de ",
    "iso6392b": "ger",
    "iso6392t": "deu",
    "pk_entity": 18605,
    "pk_language": "deu"
  })

  static readonly ITALIAN: Partial<InfLanguage> = ({
    "notes": "Italian",
    "iso6391": "it ",
    "iso6392b": "ita",
    "iso6392t": "ita",
    "pk_entity": 19703,
    "pk_language": "ita"
  })

  static readonly FRENCH: Partial<InfLanguage> = ({
    "notes": "French",
    "iso6391": "fr ",
    "iso6392b": "fre",
    "iso6392t": "fra",
    "pk_entity": 19008,
    "pk_language": "fra"
  })
}


/**
 * SQL to create mock
 */
// SELECT jsonb_pretty(jsonb_build_object(
//   'pk_entity',pk_entity,
//   'notes',notes,
//   'pk_language', pk_language,
//   'iso6391',iso6391,
//   'iso6392b',iso6392b,
//   'iso6392t',iso6392t
//   ))
//   FROM information.language t1
//   WHERE iso6391 =  'en'
