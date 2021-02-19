import { StatementWithTarget } from 'projects/lib-queries/src/lib/queries/models/StatementWithTarget';
import { InfAppellationMock } from './auto-gen/InfAppellationMock';
import { InfStatementMock } from './auto-gen/InfStatementMock';
import { InfTemporalEntityMock } from './auto-gen/InfTemporalEntityMock';
import { ProInfoProjRelMock } from './auto-gen/ProInfoProjRelMock';
import { ProProjectMock } from './auto-gen/ProProjectMock';

export namespace StatementWithTargetMock {
  export const appeTeEnHasAppeVtWithTarget: StatementWithTarget = {
    statement: InfStatementMock.NAME_1_TO_APPE,
    projRel: ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_APPE,
    ordNum: ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_APPE.ord_num_of_range,
    isOutgoing: true,
    targetLabel: InfAppellationMock.JACK_THE_FOO.string,
    targetClass: InfAppellationMock.JACK_THE_FOO.fk_class,
    target: {
      appellation: InfAppellationMock.JACK_THE_FOO
    }
  }
  export const person1HasAppeTeEnWithTarget: StatementWithTarget = {
    statement: InfStatementMock.NAME_1_TO_PERSON,
    projRel: ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON,
    ordNum: ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON.ord_num_of_domain,
    isOutgoing: false,
    targetLabel: '',
    targetClass: InfTemporalEntityMock.NAMING_1.fk_class,
    target: {
      entity: {
        pkEntity: InfTemporalEntityMock.NAMING_1.pk_entity,
        projRel: ProInfoProjRelMock.PROJ_1_NAMING_1,
        subfields: [{
          subfield: {
            fkProperty: appeTeEnHasAppeVtWithTarget.statement.fk_property,
            fkSourceEntity: appeTeEnHasAppeVtWithTarget.statement.fk_subject_info,
            isOutgoing: appeTeEnHasAppeVtWithTarget.isOutgoing,
            scope: { inProject: ProProjectMock.PROJECT_1.pk_entity },
            targetClass: appeTeEnHasAppeVtWithTarget.targetClass
          },
          count: 1,
          stmtsWithTarget: [
            appeTeEnHasAppeVtWithTarget
          ]
        }]
      }
    }
  }


}
