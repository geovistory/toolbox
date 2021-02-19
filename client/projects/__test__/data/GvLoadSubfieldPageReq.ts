import { GvLoadSubfieldPageReq } from '@kleiolab/lib-sdk-lb4';
import { InfAppellationMock } from './auto-gen/InfAppellationMock';
import { InfStatementMock } from './auto-gen/InfStatementMock';
import { InfTemporalEntityMock } from './auto-gen/InfTemporalEntityMock';
import { ProProjectMock } from './auto-gen/ProProjectMock';

export namespace GvLoadSubfieldPageReqMock {

  export const appeTeEnHasAppeVt: GvLoadSubfieldPageReq = {
    pkProject: ProProjectMock.PROJECT_1.pk_entity,
    subfieldType: { appellation: 'true' },
    page: {
      fkSourceEntity: InfStatementMock.NAME_1_TO_APPE.fk_subject_info,
      fkProperty: InfStatementMock.NAME_1_TO_APPE.fk_property,
      isOutgoing: true,
      targetClass: InfAppellationMock.JACK_THE_FOO.fk_class,
      scope: { inProject: ProProjectMock.PROJECT_1.pk_entity },
      limit: 7,
      offset: 0
    }
  }


  export const person1HasAppeTeEn: GvLoadSubfieldPageReq = {
    pkProject: ProProjectMock.PROJECT_1.pk_entity,
    subfieldType: { temporalEntity: 'true' },
    page: {
      fkSourceEntity: InfStatementMock.NAME_1_TO_PERSON.fk_object_info,
      fkProperty: InfStatementMock.NAME_1_TO_PERSON.fk_property,
      isOutgoing: false,
      targetClass: InfTemporalEntityMock.NAMING_1.fk_class,
      scope: { inProject: ProProjectMock.PROJECT_1.pk_entity },
      limit: 7,
      offset: 0
    }
  }
}
