/* eslint-disable @typescript-eslint/naming-convention */
import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {get, param, post, tags} from '@loopback/openapi-v3';
import {model, property} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {groupBy} from 'ramda';
import {Roles} from '../../components/authorization';
import {Postgres1DataSource} from '../../datasources/postgres1.datasource';
import {CommunityVisibilityOptions} from '../../models/sys-config/sys-config-community-visibility-options';
import {SysConfigValue} from '../../models/sys-config/sys-config-value.model';
import {AllowedCommunityVisibility} from '../../models/sys-config/sys-config-visibility-range';
import {SqlBuilderLb4Models} from '../../utils/sql-builders/sql-builder-lb4-models';
import {VisibilityController} from './visibility.controller';

interface BasicTypeLookup {[pkClass: number]: number};
@model()
class CommunityVisibilityConflicts {
  @property() channel: string
  @property() conflicting_value: boolean | null
  @property() conflicts: number
};
@model()
export class VisibilityReport {
  @property() classId: number;
  @property() label: string;
  @property() entitiesCount: number;
  @property({type: AllowedCommunityVisibility}) allowedVisibility: AllowedCommunityVisibility
  @property({type: CommunityVisibilityOptions}) defaultVisibility: CommunityVisibilityOptions
  @property.array(CommunityVisibilityConflicts) conflicts: CommunityVisibilityConflicts[]
  @property() totalConflicts: number
}

@tags('community visibility')
export class CommunityVisibilityController {

  systemConfig?: SysConfigValue;
  basicTypeLookup?: BasicTypeLookup;

  constructor(
    @inject('controllers.VisibilityController')
    public visibilityController: VisibilityController,
    @inject('datasources.postgres1')
    public datasource: Postgres1DataSource,
  ) { }



  @get('community-visibility/report-conflicts', {
    responses: {
      '200': {
        description: 'Reports community visibility of entities conflicting with their visibility range',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                'x-ts-type': VisibilityReport
              }
            }
          }
        }
      },
    },
  })
  // @authenticate('basic')
  // @authorize({allowedRoles: [Roles.SYS_ADMIN]})
  async reportConflicts(): Promise<VisibilityReport[]> {
    await this.visibilityController.initializeSystemSettings()
    const classes = this.visibilityController.allClasses ?? [];



    const q = new SqlBuilderLb4Models(this.datasource);
    const allowedVisibliities = classes.map(k => {
      const x = this.visibilityController.getAllowedCommunityVisibility(k.pk_class ?? -1)
      return ` (${k.pk_class}, ARRAY[${x.toolbox}], ARRAY[${x.dataApi}], ARRAY[${x.website}]) `
    }).join(',\n')

    q.sql = `WITH tw1 AS (
      SELECT
        fk_class,
        allowed_toolbox_visibility,
        allowed_dataapi_visibility,
        allowed_website_visibility
      FROM (VALUES
              ${allowedVisibliities}
            ) t1 (
                fk_class,
                allowed_toolbox_visibility,
                allowed_dataapi_visibility,
                allowed_website_visibility
              )
      ),
      tw2 AS (
      select
        t1.fk_class,
        'toolbox' channel,
        t1.community_visibility->'toolbox' conflicting_value,
        count(t1.pk_entity)::int conflicts
      from
        information.resource t1,
        tw1 t2
      where (
          (t1.community_visibility->>'toolbox')::boolean IS NULL OR
          NOT ((t1.community_visibility->>'toolbox')::boolean = ANY(t2.allowed_toolbox_visibility))
        )
      and t2.fk_class = t1.fk_class
      GROUP BY
        t1.fk_class,
        t1.community_visibility->'toolbox'

      UNION ALL

      select
        t1.fk_class,
        'dataApi' channel,
        t1.community_visibility->'dataApi' conflicting_value,
        count(t1.pk_entity)::int conflicts
      from
        information.resource t1,
        tw1 t2
      where (
          (t1.community_visibility->>'dataApi')::boolean IS NULL OR
          NOT ((t1.community_visibility->>'dataApi')::boolean = ANY(t2.allowed_dataapi_visibility))
        )
      and t2.fk_class = t1.fk_class
      GROUP BY
        t1.fk_class,
        t1.community_visibility->'dataApi'

      UNION ALL

      select
        t1.fk_class,
        'website' channel,
        t1.community_visibility->'website' conflicting_value,
        count(t1.pk_entity)::int conflicts
      from
        information.resource t1,
        tw1 t2
      where (
          (t1.community_visibility->>'website')::boolean IS NULL OR
          NOT ((t1.community_visibility->>'website')::boolean = ANY(t2.allowed_website_visibility))
        )
      and t2.fk_class = t1.fk_class
      GROUP BY
        t1.fk_class,
        t1.community_visibility->'website'
      )
      select *
      from tw2`

    const queryResult = await q.execute<{fk_class: number, channel: keyof AllowedCommunityVisibility, conflicting_value: boolean | null, conflicts: number}[]>();


    const res: VisibilityReport[] = []

    const countPerClass = await this.getEntityCountPerClass()
    const labelPerClass = await this.getLabelPerClass()
    const conflictsPerClass = groupBy((c => c.fk_class.toString()), queryResult);


    for (const key in countPerClass) {
      const classId = parseInt(key, 10)
      const entitiesCount = countPerClass[key];
      const label = labelPerClass[key];
      const allowedVisibility = this.visibilityController.getAllowedCommunityVisibility(classId)
      const defaultVisibility = this.visibilityController.getSystemDefaultCommunityVisibility(classId)
      let totalConflicts = 0;
      let conflicts: CommunityVisibilityConflicts[] = []
      // add conflicts
      if (Object.prototype.hasOwnProperty.call(conflictsPerClass, key)) {
        conflicts = conflictsPerClass[key].map(k => {
          totalConflicts = totalConflicts + k.conflicts;
          return {channel: k.channel, conflicts: k.conflicts, conflicting_value: k.conflicting_value}
        });
      }
      const classReport: VisibilityReport = {
        classId,
        entitiesCount,
        label,
        allowedVisibility,
        defaultVisibility,
        conflicts,
        totalConflicts
      }
      res.push(classReport);
    }

    return res.sort((a, b) => (a.classId - b.classId))
  }




  @post('community-visibility/update-visibility')
  @authenticate('basic')
  @authorize({allowedRoles: [Roles.SYS_ADMIN]})
  async update(
    @param.query.number('classId', {required: true}) classId: number,
    @param.query.string('channel', {required: true}) channel: string,
    @param.query.boolean('onlyConflicting', {required: true, description: 'if true, only values which are confliciting witch allowed community visibility are updated, else all.'}) onlyConflicting: boolean,
    @param.query.boolean('newValue', {required: true}) newValue: boolean,
  ): Promise<void> {

    if (!['toolbox', 'dataApi', 'website'].includes(channel)) {
      throw new HttpErrors.UnprocessableEntity('channel must be one of: toolbox, dataApi, website')
    }
    await this.visibilityController.initializeSystemSettings()
    const range = this.visibilityController.getAllowedCommunityVisibility(classId)
    const allowedVals = range[channel as keyof AllowedCommunityVisibility]

    const q = new SqlBuilderLb4Models(this.datasource)
    q.sql = `
    UPDATE information.resource
    SET community_visibility = jsonb_set(coalesce(community_visibility,'{}'::jsonb), '{${channel}}', '${newValue}', true)
    WHERE pk_entity IN (
      SELECT pk_entity
      FROM information.resource t1
      WHERE t1.fk_class = ${q.addParam(classId)}
      ${onlyConflicting ? `
      -- restrict to conflicting entities
      AND (
                (t1.community_visibility->>'${channel}')::boolean IS NULL OR
                (t1.community_visibility->>'${channel}')::boolean NOT IN (${q.addParams(allowedVals)})
        )`: ''}
    )`

    await q.execute()
  }


  async getEntityCountPerClass(): Promise<{[classId: number]: number}> {
    const q = new SqlBuilderLb4Models(this.datasource)
    q.sql = `Select fk_class, count(pk_entity)::int
    FROM information.resource
    GROUP BY fk_class;`
    const qres = await q.execute<{fk_class: number, count: number}[]>()
    const res: {[classId: number]: number} = {}
    for (const item of qres) {
      res[item.fk_class] = item.count
    }
    return res
  }
  async getLabelPerClass(): Promise<{[classId: number]: string}> {
    const q = new SqlBuilderLb4Models(this.datasource)
    q.sql = `SELECT DISTINCT ON (fk_class)
    fk_class, label
    FROM data_for_history.v_label
    WHERE fk_class IS NOT NULL
    AND "type" = 'label'`
    const qres = await q.execute<{fk_class: number, label: string}[]>()
    const res: {[classId: number]: string} = {}
    for (const item of qres) {
      res[item.fk_class] = item.label
    }
    return res
  }

}

