/* eslint-disable @typescript-eslint/camelcase */
import {ProEntityLabelConfig} from '../../../../models';
import {DfhApiClassMock} from './DfhApiClassMock';
import {PK_DEFAULT_CONFIG_PROJECT} from '../../../../warehouse/Warehouse';
import {DfhApiPropertyMock} from './DfhApiPropertyMock';
import {ProProjectMock} from './ProProjectMock';

/**
 * pk_entity prefixed with 600
 */

export class ProEntityLabelConfigMock {
  static readonly C633_UNION_PROJECT_DEFAULT = new ProEntityLabelConfig({
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
  static readonly C633_UNION_PROJECT_DEFAULT_2 = new ProEntityLabelConfig({
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
  static readonly C633_UNION_PROJECT_1 = new ProEntityLabelConfig({
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

  static readonly C61_BIRTH_PROJECT_DEFAULT = new ProEntityLabelConfig({
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
  static readonly C21_PERSON_INFINIT_LABEL_PROJECT_DEFAULT = new ProEntityLabelConfig({
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
}
