import {DfhClassLabelId} from '../../../../warehouse/primary-ds/DfhClassLabelService'

export class DfhClassLabelMock {

  static readonly NAMING_EN_ID: DfhClassLabelId = {language: 'en', pkClass: 365}
  static readonly NAMING_EN_LABEL = 'Appellation in a language';

  static readonly NAMING_DE_ID: DfhClassLabelId = {language: 'de', pkClass: 365}
  static readonly NAMING_DE_LABEL = 'Bezeichung in einer Sprache';


  static readonly PERSON_EN_ID: DfhClassLabelId = {language: 'en', pkClass: 21}
  static readonly PERSON_EN_LABEL = 'Person';

  static readonly PERSON_DE_ID: DfhClassLabelId = {language: 'de', pkClass: 21}
  static readonly PERSON_DE_LABEL = 'Mensch';

  static readonly BIRTH_EN_ID: DfhClassLabelId = {language: 'en', pkClass: 61}
  static readonly BIRTH_EN_LABEL = 'Birth'

  static readonly BIRTH_DE_ID: DfhClassLabelId = {language: 'de', pkClass: 61}
  static readonly BIRTH_DE_LABEL = 'GEBURT'

  static readonly UNION_EN_ID: DfhClassLabelId = {language: 'en', pkClass: 66}
  static readonly UNION_EN_LABEL = 'Union'

  static readonly UNION_DE_ID: DfhClassLabelId = {language: 'de', pkClass: 66}
  static readonly UNION_DE_LABEL = 'Paarbeziehung'



}
