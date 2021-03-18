import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {get, param} from '@loopback/rest';
import {Roles} from '../components/authorization/keys';
import {Postgres1DataSource} from '../datasources';
import {DfhClass} from '../models';
import {DfhClassRepository} from '../repositories';
import {SqlBuilderLb4Models} from '../utils/sql-builders/sql-builder-lb4-models';

export class DfhClassController {
  constructor(
    @repository(DfhClassRepository)
    public datChunkRepository: DfhClassRepository,
    @inject('datasources.postgres1')
    public datasource: Postgres1DataSource,
  ) { }

  @get('classes/of-project', {
    responses: {
      '200': {
        description: "Get all classes that are selected by at least one of the profiles used by the given project.",
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                'x-ts-type': DfhClass,
              },
            }
          }
        },
      },
    },
  })
  @authenticate('basic')
  @authorize({allowedRoles: [Roles.PROJECT_MEMBER]})
  async ofProject(
    @param.query.number('pkProject') pkProject: number): Promise<DfhClass[]> {
    const q = new SqlBuilderLb4Models(this.datasource)
    q.sql = `
    WITH tw1 AS (
      SELECT fk_profile
      FROM projects.dfh_profile_proj_rel
      WHERE fk_project = ${q.addParam(pkProject)}
      UNION
      SELECT 5 as fk_profile -- GEOVISTORY BASICS
    )
    SELECT DISTINCT ON (pk_class)
      ${q.createSelect('t3', DfhClass.definition)}
    FROM
      tw1 t1,
      data_for_history.api_class t2,
      data_for_history.v_class t3
    WHERE t1.fk_profile = t2.dfh_fk_profile
    AND t3.pk_class = t2.dfh_pk_class
    `;
    return q.execute<DfhClass[]>()
  }



}
