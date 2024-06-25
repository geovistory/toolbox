import {ProEntityLabelConfig} from '@kleiolab/lib-sdk-lb4';
import {C_218_EXPRESSION_ID, P_1316_HAS_CARRIER_PROVIDED_BY_ID, P_979_CARRIERS_PROVIDED_BY_ID} from '../ontome-ids';
import {DfhApiClassMock} from './DfhApiClassMock';
import {DfhApiPropertyMock} from './DfhApiPropertyMock';
import {PK_DEFAULT_CONFIG_PROJECT} from './local-model.helpers';
import {ProProjectMock} from './ProProjectMock';

/**
 * pk_entity prefixed with 600
 */

export class ProEntityLabelConfigMock {
  static readonly C633_UNION_PROJECT_DEFAULT: Partial<ProEntityLabelConfig> = ({
    pk_entity: 6001,
    fk_project: PK_DEFAULT_CONFIG_PROJECT,
    fk_class: DfhApiClassMock.EN_633_UNION.dfh_pk_class,
    config: {
      labelParts: [
        {
          ordNum: 0,
          field: {
            fkProperty: DfhApiPropertyMock.EN_1436_HAS_PARTNER.dfh_pk_property,
            isOutgoing: true,
            nrOfStatementsInLabel: 2
          }
        }
      ]
    }
  })
  static readonly C633_UNION_PROJECT_DEFAULT_2: Partial<ProEntityLabelConfig> = ({
    pk_entity: 6003,
    fk_project: PK_DEFAULT_CONFIG_PROJECT,
    fk_class: DfhApiClassMock.EN_633_UNION.dfh_pk_class,
    config: {
      labelParts: [
        {
          ordNum: 0,
          field: {
            fkProperty: DfhApiPropertyMock.EN_1436_HAS_PARTNER.dfh_pk_property,
            isOutgoing: true,
            nrOfStatementsInLabel: 2
          }
        },
        {
          ordNum: 1,
          field: {
            fkProperty: DfhApiPropertyMock.EN_1435_STEMS_FROM.dfh_pk_property,
            isOutgoing: false,
            nrOfStatementsInLabel: 1
          }
        }
      ]
    }
  })
  static readonly C633_UNION_PROJECT_1: Partial<ProEntityLabelConfig> = ({
    pk_entity: 6002,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_class: DfhApiClassMock.EN_633_UNION.dfh_pk_class,
    config: {
      labelParts: [
        {
          ordNum: 0,
          field: {
            fkProperty: DfhApiPropertyMock.EN_1436_HAS_PARTNER.dfh_pk_property,
            isOutgoing: true,
            nrOfStatementsInLabel: 2
          }
        },
        {
          ordNum: 1,
          field: {
            fkProperty: DfhApiPropertyMock.EN_1435_STEMS_FROM.dfh_pk_property,
            isOutgoing: false,
            nrOfStatementsInLabel: 1
          }
        }
      ]
    }
  })

  static readonly C61_BIRTH_PROJECT_DEFAULT: Partial<ProEntityLabelConfig> = ({
    pk_entity: 6004,
    fk_project: PK_DEFAULT_CONFIG_PROJECT,
    fk_class: DfhApiClassMock.EN_61_BIRTH.dfh_pk_class,
    config: {
      labelParts: [
        {
          ordNum: 0,
          field: {
            fkProperty: DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE.dfh_pk_property,
            isOutgoing: true,
            nrOfStatementsInLabel: 1
          }
        }
      ]
    }
  })
  static readonly C21_PERSON_INFINIT_LABEL_PROJECT_DEFAULT: Partial<ProEntityLabelConfig> = ({
    pk_entity: 6005,
    fk_project: PK_DEFAULT_CONFIG_PROJECT,
    fk_class: DfhApiClassMock.EN_21_PERSON.dfh_pk_class,
    config: {
      labelParts: [
        {
          ordNum: 0,
          field: {
            fkProperty: DfhApiPropertyMock.EN_1111_IS_APPE_OF.dfh_pk_property,
            isOutgoing: false,
            nrOfStatementsInLabel: 1
          }
        },
        {
          ordNum: 1,
          field: {
            fkProperty: DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE.dfh_pk_property,
            isOutgoing: false,
            nrOfStatementsInLabel: 1
          }
        }
      ]
    }
  })
  static readonly F2_EXPRESSION_LABEL: Partial<ProEntityLabelConfig> = ({
    pk_entity: 6002,
    fk_project: PK_DEFAULT_CONFIG_PROJECT,
    fk_class: C_218_EXPRESSION_ID,
    config: {
      labelParts: [
        {
          ordNum: 0,
          field: {
            fkProperty: P_979_CARRIERS_PROVIDED_BY_ID,
            isOutgoing: true,
            nrOfStatementsInLabel: 1
          }
        },
        {
          ordNum: 1,
          field: {
            fkProperty: P_1316_HAS_CARRIER_PROVIDED_BY_ID,
            isOutgoing: true,
            nrOfStatementsInLabel: 1
          }
        }

      ]
    }
  })
}
