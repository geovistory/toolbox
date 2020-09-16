/* eslint-disable @typescript-eslint/camelcase */
import {ProClassFieldConfig} from '../../../../models';
import {PK_DEFAULT_CONFIG_PROJECT} from '../../../../warehouse/Warehouse';
import {DfhApiPropertyMock} from './DfhApiPropertyMock';
import {DfhApiClassMock} from './DfhApiClassMock';

/**
 * pk_entity prefix: 400
 */
export class ProClassFieldConfigMock {


  /**
   * Fields of class 365 Naming (Appellation in a language (time indexed))
   */
  static readonly PROJ_DEF_C365_NAMING_P1113_REFERS_TO_NAME = new ProClassFieldConfig({
    pk_entity: 4001,
    fk_project: PK_DEFAULT_CONFIG_PROJECT,
    fk_domain_class: DfhApiClassMock.EN_365_NAMING.dfh_pk_class,
    fk_property: DfhApiPropertyMock.EN_1113_REFERS_TO_NAME.dfh_pk_property,
    ord_num: 1
  })
  static readonly PROJ_DEF_C365_NAMING_P1111_IS_APPE_OF = new ProClassFieldConfig({
    pk_entity: 4002,
    fk_project: PK_DEFAULT_CONFIG_PROJECT,
    fk_domain_class: DfhApiClassMock.EN_365_NAMING.dfh_pk_class,
    fk_property: DfhApiPropertyMock.EN_1111_IS_APPE_OF.dfh_pk_property,
    ord_num: 2
  })


}
