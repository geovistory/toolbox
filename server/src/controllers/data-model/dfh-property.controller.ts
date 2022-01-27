import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {get, param, tags} from '@loopback/rest';
import {values} from 'lodash';
import {indexBy} from 'ramda';
import {SysConfigController} from '..';
import {Roles} from '../../components/authorization/keys';
import {Postgres1DataSource} from '../../datasources';
import {DfhProperty} from '../../models';
import {GvPositiveSchemaObject} from '../../models/gv-positive-schema-object.model';
import {GvSchemaModifier} from '../../models/gv-schema-modifier.model';
import {SysConfigValue} from '../../models/sys-config';
import {DfhPropertyRepository} from '../../repositories';
import {SqlBuilderLb4Models} from '../../utils/sql-builders/sql-builder-lb4-models';
import {FindDataModelController} from './find-data-model.controller';

@tags('data model')
export class DfhPropertyController {
  constructor(
    @repository(DfhPropertyRepository)
    public datChunkRepository: DfhPropertyRepository,
    @inject('datasources.postgres1')
    public datasource: Postgres1DataSource,
    @inject('controllers.SysConfigController')
    public sysConfigController: SysConfigController,
    @inject('controllers.FindDataModelController')
    public findDataModelController: FindDataModelController,
  ) { }

  @get('data-model/properties/of-project', {
    responses: {
      '200': {
        description: "Get all properties that are selected by at least one of the profiles used by the given project.",
        content: {
          'application/json': {
            schema: {
              'x-ts-type': GvSchemaModifier
            }
          }
        },
      },
    },
  })
  @authenticate('basic')
  @authorize({allowedRoles: [Roles.PROJECT_MEMBER]})
  async ofProject(
    @param.query.number('pkProject') pkProject: number
  ): Promise<GvSchemaModifier> {

    const q = new SqlBuilderLb4Models(this.datasource)
    // const addProperties = await this.createAddPropertiesSql(q);

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
        AND
          enabled = true
        UNION
        SELECT
          5 AS fk_profile -- GEOVISTORY BASICS
      ),
		  tw1 AS (
			  select fk_profile as enabled_profiles
			  from tw0
		  ),
      -- select all properties
      tw2 AS (

        SELECT
          t1.dfh_pk_property,
          t1.dfh_is_inherited,
          t1.dfh_property_domain,
          t1.dfh_domain_instances_min_quantifier,
          t1.dfh_domain_instances_max_quantifier,
          t1.dfh_property_range,
          t1.dfh_range_instances_min_quantifier,
          t1.dfh_range_instances_max_quantifier,
          t1.dfh_identity_defining,
          t1.dfh_is_has_type_subproperty,
          t1.dfh_property_identifier_in_namespace,
          t1.dfh_fk_profile,
          t1.dfh_parent_properties,
          t1.dfh_ancestor_properties,
          t1.removed_from_api
          FROM
	          data_for_history.api_property t1,
            data_for_history.api_class t2, -- domain class
            data_for_history.api_class t3, -- range class
            tw1 t4
          -- only properties where domain, property and range is enabled by profile
          WHERE
            t1.dfh_property_domain = t2.dfh_pk_class
            AND
            t1.dfh_property_range = t3.dfh_pk_class
          AND
            t1.dfh_fk_profile = (t4.enabled_profiles)
          AND
            t2.dfh_fk_profile = (t4.enabled_profiles)
          AND
            t3.dfh_fk_profile = (t4.enabled_profiles)
      ),

      -- group by domain, property, range
      tw3 AS (
        SELECT
          t1.dfh_pk_property,
          t1.dfh_property_domain,
          t1.dfh_property_range,
          jsonb_agg(DISTINCT jsonb_build_object('fk_profile', t1.dfh_fk_profile, 'removed_from_api', t1.removed_from_api)) AS profiles
        FROM
          tw2 t1
        GROUP BY
          t1.dfh_pk_property,
          t1.dfh_property_domain,
          t1.dfh_property_range
      ),

      -- rename columns to loopback model and select distinct (DfhProperty)
      tw4 AS (
        SELECT DISTINCT ON (t1.dfh_pk_property,
          t1.dfh_property_domain,
          t1.dfh_property_range)
          t1.dfh_pk_property AS pk_property,
          t1.dfh_property_domain AS has_domain,
          t1.dfh_domain_instances_min_quantifier AS domain_instances_min_quantifier,
          t1.dfh_domain_instances_max_quantifier AS domain_instances_max_quantifier,
          t1.dfh_property_range AS has_range,
          t1.dfh_range_instances_min_quantifier AS range_instances_min_quantifier,
          t1.dfh_range_instances_max_quantifier AS range_instances_max_quantifier,
          t1.dfh_property_identifier_in_namespace AS identifier_in_namespace,
          t1.dfh_parent_properties AS parent_properties,
          t1.dfh_ancestor_properties AS ancestor_properties,
          t2.profiles
        FROM
          tw2 t1,
          tw3 t2
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
        ${q.createSelect('tw4', DfhProperty.definition)}
      FROM
        tw4

      `;
    const properties = await q.execute<DfhProperty[]>()
    const sysConfig = await this.sysConfigController.getSystemConfig()
    const schemaModifier = await this.findDataModelController.dfhClassesOfProject(pkProject)
    const schemaObj: GvPositiveSchemaObject = {dfh: {property: properties, klass: schemaModifier.positive.dfh?.klass}}
    const addedPropeties = this.addProperties(sysConfig, schemaObj)

    const resultingProperties = indexBy(
      (p => p.has_domain + '_' + p.pk_property + '_' + p.has_range),
      [...properties, ...addedPropeties]
    )
    const positive: GvPositiveSchemaObject = {dfh: {property: values(resultingProperties)}}
    // const merged: GvPositiveSchemaObject = mergeDeepWith(concat, schemaObj, autoPropsObj)
    return {positive, negative: {}}
  }


  addProperties(sysConf: SysConfigValue, schemaObj: GvPositiveSchemaObject) {
    const autoProps: Partial<DfhProperty>[] = []
    const toAdd = sysConf.addProperty ?? []
    toAdd.forEach(i => {

      // find property
      const prop = schemaObj?.dfh?.property?.find(p =>
        i.wherePkProperty ? p.pk_property === i.wherePkProperty : true &&
          i.whereFkRange ? p.has_range === i.whereFkRange : true &&
            i.whereFkDomain ? p.has_domain === i.whereFkDomain : true
      )

      // extend property
      if (prop && schemaObj?.dfh?.klass) {
        schemaObj.dfh.klass.forEach(k => {
          if (k.basic_type && i.toSourceClass?.whereBasicTypeNotIn?.includes(k.basic_type)) return;
          if (k.pk_class && i.toSourceClass?.wherePkClassNotIn?.includes(k.pk_class)) return;
          if (i.toSourceClass?.all ||
            (k.pk_class && i.toSourceClass?.wherePkClassIn?.includes(k.pk_class)) ||
            (k.basic_type && i.toSourceClass?.whereBasicTypeIn?.includes(k.basic_type))
          ) {
            let newProp: Partial<DfhProperty>;
            if (i.replaceTargetClassWithSourceClass) {
              newProp = {
                ...prop,
                has_domain: k.pk_class,
                has_range: k.pk_class
              }
            } else {
              newProp = {
                ...prop,
                [i.isOutgoing ? 'has_domain' : 'has_range']: k.pk_class
              }
            }

            // prevent duplication
            if (
              !(prop.has_domain === newProp.has_domain &&
                prop.pk_property === newProp.pk_property &&
                prop.has_range === newProp.has_range)
            ) {
              autoProps.push(newProp)
            }


          }
        })
      }
    })
    return autoProps
  }


}
