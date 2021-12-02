/* eslint-disable @typescript-eslint/camelcase */
import {ProTextProperty} from '../../../../models';
import {DfhApiClassMock} from './DfhApiClassMock';
import {DfhApiPropertyMock} from './DfhApiPropertyMock';
import {InfLanguageMock} from './InfLanguageMock';
import {PK_DEFAULT_CONFIG_PROJECT} from './local-model.helpers';
import {ProProjectMock} from './ProProjectMock';
import {SysSystemTypeMock} from './SysSystemTypeMock';

/**
 * pk_entity prefix: 500
 */
export class ProTextPropertyMock {

  static readonly PROJ_DEF_DE_PROPERTY_BROUGHT_INTO_LIFE: Partial<ProTextProperty> = ({
    pk_entity: 5001,
    fk_project: PK_DEFAULT_CONFIG_PROJECT,
    fk_language: InfLanguageMock.GERMAN.pk_entity,
    fk_dfh_property: DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE.dfh_pk_property,
    fk_dfh_property_domain: DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE.dfh_property_domain,
    fk_system_type: SysSystemTypeMock.PRO_TEXT_PROPTERTY_LABEL.pk_entity,
    string: 'Brachte zur Welt (default)'

  })
  static readonly PROJ_DEF_DE_PROPERTY_BROUGHT_INTO_LIFE_REVERSE: Partial<ProTextProperty> = ({
    pk_entity: 5002,
    fk_project: PK_DEFAULT_CONFIG_PROJECT,
    fk_language: InfLanguageMock.GERMAN.pk_entity,
    fk_dfh_property: DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE.dfh_pk_property,
    fk_dfh_property_range: DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE.dfh_property_range,
    fk_system_type: SysSystemTypeMock.PRO_TEXT_PROPTERTY_LABEL.pk_entity,
    string: 'Wurde geboren (default)'
  })


  static readonly PROJ_1_PROPERTY_BROUGHT_INTO_LIFE: Partial<ProTextProperty> = ({
    pk_entity: 5003,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_language: InfLanguageMock.GERMAN.pk_entity,
    fk_dfh_property: DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE.dfh_pk_property,
    fk_dfh_property_domain: DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE.dfh_property_domain,
    fk_system_type: SysSystemTypeMock.PRO_TEXT_PROPTERTY_LABEL.pk_entity,
    string: 'Brachte zur Welt (project 1)'

  })
  static readonly PROJ_1_PROPERTY_BROUGHT_INTO_LIFE_REVERSE: Partial<ProTextProperty> = ({
    pk_entity: 5004,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_language: InfLanguageMock.GERMAN.pk_entity,
    fk_dfh_property: DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE.dfh_pk_property,
    fk_dfh_property_range: DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE.dfh_property_range,
    fk_system_type: SysSystemTypeMock.PRO_TEXT_PROPTERTY_LABEL.pk_entity,
    string: 'Wurde geboren (project 1)'
  })

  static readonly PROJ_1_PROPERTY_PERSON_HAS_APPELLATION: Partial<ProTextProperty> = ({
    pk_entity: 5005,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_language: InfLanguageMock.GERMAN.pk_entity,
    fk_dfh_property: DfhApiPropertyMock.EN_1111_IS_APPE_OF.dfh_pk_property,
    fk_dfh_property_range: DfhApiClassMock.EN_21_PERSON.dfh_pk_class,
    fk_system_type: SysSystemTypeMock.PRO_TEXT_PROPTERTY_LABEL.pk_entity,
    string: 'has appellations'
  })

  static readonly PROJ_DEF_EN_PROPERTY_BROUGHT_INTO_LIFE: Partial<ProTextProperty> = ({
    pk_entity: 5006,
    fk_project: PK_DEFAULT_CONFIG_PROJECT,
    fk_language: InfLanguageMock.ENGLISH.pk_entity,
    fk_dfh_property: DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE.dfh_pk_property,
    fk_dfh_property_domain: DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE.dfh_property_domain,
    fk_system_type: SysSystemTypeMock.PRO_TEXT_PROPTERTY_LABEL.pk_entity,
    string: 'Brought into life (default)'
  })

  static readonly PROJ_DEF_EN_PROPERTY_BROUGHT_INTO_LIFE_REVERSE: Partial<ProTextProperty> = ({
    pk_entity: 5007,
    fk_project: PK_DEFAULT_CONFIG_PROJECT,
    fk_language: InfLanguageMock.ENGLISH.pk_entity,
    fk_dfh_property: DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE.dfh_pk_property,
    fk_dfh_property_range: DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE.dfh_property_range,
    fk_system_type: SysSystemTypeMock.PRO_TEXT_PROPTERTY_LABEL.pk_entity,
    string: 'Was born (default)'
  })

  static readonly PROJ_DEF_EN_PROPERTY_PERSON_HAS_APPELLATION: Partial<ProTextProperty> = ({
    pk_entity: 5008,
    fk_project: PK_DEFAULT_CONFIG_PROJECT,
    fk_language: InfLanguageMock.ENGLISH.pk_entity,
    fk_dfh_property: DfhApiPropertyMock.EN_1111_IS_APPE_OF.dfh_pk_property,
    fk_dfh_property_range: DfhApiClassMock.EN_21_PERSON.dfh_pk_class,
    fk_system_type: SysSystemTypeMock.PRO_TEXT_PROPTERTY_LABEL.pk_entity,
    string: 'has appellations (default)'
  })

  static readonly SANDBOX_PROJECT_NAME: Partial<ProTextProperty> = ({
    pk_entity: 5009,
    fk_project: ProProjectMock.SANDBOX_PROJECT.pk_entity,
    fk_pro_project: ProProjectMock.SANDBOX_PROJECT.pk_entity,
    fk_language: InfLanguageMock.ENGLISH.pk_entity,
    fk_system_type: SysSystemTypeMock.PRO_TEXT_PROPTERTY_LABEL.pk_entity,
    string: 'Sandbox Project'
  })
  static readonly PROJECT_1_NAME: Partial<ProTextProperty> = ({
    pk_entity: 5010,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_pro_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_language: InfLanguageMock.ENGLISH.pk_entity,
    fk_system_type: SysSystemTypeMock.PRO_TEXT_PROPTERTY_LABEL.pk_entity,
    string: 'Project 1'
  })
}
