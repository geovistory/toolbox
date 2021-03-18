import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {get, param} from '@loopback/rest';
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
    WITH
      -- select profiles enabled by project (+basics profile)
      tw0 AS (
        SELECT
          fk_profile
        FROM
          projects.dfh_profile_proj_rel
        WHERE
          fk_project = ${q.addParam(pkProject)}
        UNION
        SELECT
          5 AS fk_profile -- GEOVISTORY BASICS
      ),

      -- select all properties and generate generic properties (e.g. 1111)
      tw1 AS (
        SELECT
          t1_1.dfh_pk_property,
          t1_1.dfh_is_inherited,
          t1_1.dfh_property_domain,
          t1_1.dfh_domain_instances_min_quantifier,
          t1_1.dfh_domain_instances_max_quantifier,
          t1_1.dfh_property_range,
          t1_1.dfh_range_instances_min_quantifier,
          t1_1.dfh_range_instances_max_quantifier,
          t1_1.dfh_identity_defining,
          t1_1.dfh_is_has_type_subproperty,
          t1_1.dfh_property_identifier_in_namespace,
          t1_1.dfh_fk_profile,
          t1_1.removed_from_api
        FROM
          data_for_history.api_property t1_1
        UNION ALL

        SELECT
          1111 AS dfh_pk_property,
          TRUE AS dfh_is_inherited,
          365 AS dfh_property_domain,
          0 AS dfh_domain_instances_min_quantifier,
          '-1'::integer AS dfh_domain_instances_max_quantifier,
          t1_1.dfh_pk_class AS dfh_property_range,
          1 AS dfh_range_instances_min_quantifier,
          1 AS dfh_range_instances_max_quantifier,
          TRUE AS dfh_identity_defining,
          FALSE AS dfh_is_has_type_subproperty,
          'histP9'::character varying AS dfh_property_identifier_in_namespace,
          t1_1.dfh_fk_profile,
          t1_1.removed_from_api
        FROM
          data_for_history.api_class t1_1
        WHERE
          t1_1.dfh_pk_class <> 365
          AND (t1_1.dfh_basic_type = ANY (ARRAY[8,
              9,
              30]))
        GROUP BY
          t1_1.dfh_fk_profile,
          t1_1.removed_from_api,
          t1_1.dfh_pk_class,
          t1_1.dfh_class_identifier_in_namespace,
          t1_1.dfh_basic_type,
          t1_1.dfh_basic_type_label
      ),

      -- filter properties by enabled profiles and group by domain, property, range
      tw2 AS (
        SELECT
          t1_1.dfh_pk_property,
          t1_1.dfh_property_domain,
          t1_1.dfh_property_range,
          jsonb_agg(DISTINCT jsonb_build_object('fk_profile', t1_1.dfh_fk_profile, 'removed_from_api', t1_1.removed_from_api)) AS profiles
        FROM
          tw1 t1_1,
          tw0 t2
        WHERE
          t2.fk_profile = t1_1.dfh_fk_profile
        GROUP BY
          t1_1.dfh_pk_property,
          t1_1.dfh_property_domain,
          t1_1.dfh_property_range
      ),

      -- rename columns to loopback model and select distinct (DfhProperty)
      tw3 AS (
        SELECT DISTINCT ON (t1.dfh_pk_property,
          t1.dfh_property_domain,
          t1.dfh_property_range)
          t1.dfh_pk_property AS pk_property,
          t1.dfh_is_inherited AS is_inherited,
          t1.dfh_property_domain AS has_domain,
          t1.dfh_domain_instances_min_quantifier AS domain_instances_min_quantifier,
          t1.dfh_domain_instances_max_quantifier AS domain_instances_max_quantifier,
          t1.dfh_property_range AS has_range,
          t1.dfh_range_instances_min_quantifier AS range_instances_min_quantifier,
          t1.dfh_range_instances_max_quantifier AS range_instances_max_quantifier,
          t1.dfh_identity_defining AS identity_defining,
          t1.dfh_is_has_type_subproperty AS is_has_type_subproperty,
          t1.dfh_property_identifier_in_namespace AS identifier_in_namespace,
          t2.profiles
        FROM
          tw1 t1,
          tw2 t2
        WHERE
          t1.dfh_pk_property = t2.dfh_pk_property
          AND t1.dfh_property_domain = t2.dfh_property_domain
          AND t1.dfh_property_range = t2.dfh_property_range
        ORDER BY
          t1.dfh_pk_property,
          t1.dfh_property_domain,
          t1.dfh_property_range,
          t1.removed_from_api
      )
      SELECT
        ${q.createSelect('tw3', DfhProperty.definition)}
      FROM
        tw3

      `;
    return q.execute<DfhProperty[]>()
  }



}
