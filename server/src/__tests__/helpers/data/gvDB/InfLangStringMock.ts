import {InfLangString} from '../../../../models';
import {DfhApiClassMock} from './DfhApiClassMock';
import {InfLanguageMock} from './InfLanguageMock';
import {OmitEntity} from './local-model.helpers';

/**
 * pk_entity prefix: 900
 */

export class InfLangStringMock {
  static readonly EN_SHORT_TITLE_MONTH: OmitEntity<InfLangString> = {
    pk_entity: 9001,
    fk_class: DfhApiClassMock.EN_784_SHORT_TITLE.dfh_pk_class,
    fk_language: InfLanguageMock.ENGLISH.pk_entity as number,
    string: 'Month'
  }

  static readonly EN_SHORT_TITLE_THE_MURDERER: OmitEntity<InfLangString> = {
    pk_entity: 9002,
    fk_class: DfhApiClassMock.EN_784_SHORT_TITLE.dfh_pk_class,
    fk_language: InfLanguageMock.ENGLISH.pk_entity as number,
    string: 'Manuscript «The Murderer»'
  }
  static readonly EN_PAGE_1: OmitEntity<InfLangString> = {
    pk_entity: 9003,
    fk_class: DfhApiClassMock.EN_785_TEXT.dfh_pk_class,
    fk_language: InfLanguageMock.ENGLISH.pk_entity as number,
    string: 'p. 1'
  }

}
