import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {Roles} from '../components/authorization/keys';
import {Postgres1DataSource} from '../datasources';
import {DfhProperty} from '../models';
import {DfhPropertyRepository} from '../repositories';
import {SqlBuilderLb4Models} from '../utils/sql-builders/sql-builder-lb4-models';

export class DfhPropertyController {
  constructor(
    @repository(DfhPropertyRepository)
    public datChunkRepository: DfhPropertyRepository,
    @inject('datasources.postgres1')
    public datasource: Postgres1DataSource,
  ) { }

  @get('properties/of-project', {
    responses: {
      '200': {
        description: "Get all properties that are selected by at least one of the profiles used by the given project.",
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                'x-ts-type': DfhProperty,
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
    @param.query.number('pkProject') pkProject: number): Promise<DfhProperty[]> {
    const q = new SqlBuilderLb4Models(this.datasource)
    q.sql = `
      WITH tw1 AS (
        SELECT fk_profile
        FROM projects.dfh_profile_proj_rel
        WHERE fk_project = ${q.addParam(pkProject)}
        UNION
        SELECT 5 as fk_profile -- GEOVISTORY BASICS
      )
      SELECT DISTINCT ON (pk_property,has_domain,has_range)
        ${q.createSelect('t3', DfhProperty.definition)}
      FROM
        tw1 t1,
        data_for_history.api_property t2,
        data_for_history.v_property t3
      WHERE t1.fk_profile = t2.dfh_fk_profile
      AND t3.pk_property = t2.dfh_pk_property
      `;
    return q.execute<DfhProperty[]>()
  }



}
