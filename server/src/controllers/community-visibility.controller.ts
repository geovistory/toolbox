/* eslint-disable @typescript-eslint/naming-convention */
import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {get, param, post, tags} from '@loopback/openapi-v3';
import {model, property} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {groupBy, uniq} from 'ramda';
import {Roles} from '../components/authorization';
import {Postgres1DataSource} from '../datasources/postgres1.datasource';
import {CommunityVisibilityOptions} from '../models/sys-config/sys-config-community-visibility-options';
import {SysConfigValue} from '../models/sys-config/sys-config-value.model';
import {VisibilityRange} from '../models/sys-config/sys-config-visibility-range';
import {SqlBuilderLb4Models} from '../utils/sql-builders/sql-builder-lb4-models';
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
  @property({type: VisibilityRange}) visibilityRange: VisibilityRange
  @property({type: VisibilityRange}) visibilityDefault: CommunityVisibilityOptions
  @property() classId: number;
  @property.array(CommunityVisibilityConflicts) conflicts: CommunityVisibilityConflicts[]
  @property() totalConflicts: number
}

@tags('community visibility')
export class CommunityVisibiliyController {

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
    await this.visibilityController.initializeConfiguration()
    const classes = this.visibilityController.allClasses ?? [];

    // const report = []

    // const channels: (keyof CommunityVisibilityOptions)[] = ['toolbox', 'website', 'dataApi']
    const q = new SqlBuilderLb4Models(this.datasource);

    const allowedVisibliities = classes.map(k => {
      const visibilityRange = this.visibilityController.getCommunityVisibilityRange(k.pk_class)
      const tlbx = uniq([visibilityRange.max.toolbox, visibilityRange.min.toolbox])
      const dapi = uniq([visibilityRange.max.dataApi, visibilityRange.min.dataApi])
      const webs = uniq([visibilityRange.max.website, visibilityRange.min.website])
      return ` (${k.pk_class}, ARRAY[${tlbx}], ARRAY[${dapi}], ARRAY[${webs}]) `
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
          (t1.community_visibility->'toolbox')::boolean IS NULL OR
          (t1.community_visibility->'toolbox')::boolean <> ANY(t2.allowed_toolbox_visibility)
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
          (t1.community_visibility->'dataApi')::boolean IS NULL OR
          (t1.community_visibility->'dataApi')::boolean <> ANY(t2.allowed_dataapi_visibility)
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
          (t1.community_visibility->'website')::boolean IS NULL OR
          (t1.community_visibility->'website')::boolean <> ANY(t2.allowed_website_visibility)
        )
      and t2.fk_class = t1.fk_class
      GROUP BY
        t1.fk_class,
        t1.community_visibility->'website'
      )
      select *
      from tw2`

    const queryResult = await q.execute<{fk_class: number, channel: string, conflicting_value: boolean | null, conflicts: number}[]>();


    const res: VisibilityReport[] = []
    const grouped = groupBy((c => c.fk_class.toString()), queryResult);
    for (const key in grouped) {
      if (Object.prototype.hasOwnProperty.call(grouped, key)) {
        const classId = parseInt(key, 10)
        const allowedVisibilityRange = this.visibilityController.getCommunityVisibilityRange(classId)
        const visibilityDefault = this.visibilityController.getCommunityVisibilityDefault(classId)
        let totalConflicts = 0;
        const konflicts: CommunityVisibilityConflicts[] = grouped[key].map(k => {
          const {channel, conflicts, conflicting_value} = k
          totalConflicts = totalConflicts + conflicts;
          return {channel, conflicts, conflicting_value}
        });
        const classReport: VisibilityReport = {
          classId,
          visibilityRange: allowedVisibilityRange,
          visibilityDefault,
          conflicts: konflicts,
          totalConflicts
        }
        res.push(classReport);
      }
    }

    // for (const k of classes) {
    //   const visibilityRange = this.visibilityController.getCommunityVisibilityRange(k.pk_class)
    //   const reportForClass: VisibilityReport = {
    //     classId: k.pk_class,
    //     allowedVisibilityRange: visibilityRange,
    //     toolbox: {
    //       conflictingTrue: 0,
    //       conflictingFalse: 0,
    //       conflictingUndefined: 0,
    //       totalConflicts: 0
    //     },
    //     dataApi: {
    //       conflictingTrue: 0,
    //       conflictingFalse: 0,
    //       conflictingUndefined: 0,
    //       totalConflicts: 0
    //     },
    //     website: {
    //       conflictingTrue: 0,
    //       conflictingFalse: 0,
    //       conflictingUndefined: 0,
    //       totalConflicts: 0
    //     }
    //   }

    //   for (const channel of channels) {

    //     if (visibilityRange.max[channel] === false) {
    //       // channel visbility must not be true
    //       const q = new SqlBuilderLb4Models(this.datasource)
    //       q.sql = `
    //         select count(*) from information.resource
    //         where (community_visibility->'${channel}')::boolean = true
    //         and fk_class = ${q.addParam(k.pk_class)}
    //       `
    //       const res = await q.execute<{count: string}[]>()
    //       reportForClass[channel].conflictingTrue = parseInt(res[0].count);
    //     }
    //     if (visibilityRange.min[channel] === true) {
    //       // channel visbility must not be false
    //       const q = new SqlBuilderLb4Models(this.datasource)
    //       q.sql = `
    //         select count(*) from information.resource
    //         where (community_visibility->'${channel}')::boolean = false
    //         and fk_class = ${q.addParam(k.pk_class)}
    //       `
    //       const res = await q.execute<{count: string}[]>()
    //       reportForClass[channel].conflictingFalse = parseInt(res[0].count);
    //     }
    //     // channel visibility must not be undefined
    //     const q = new SqlBuilderLb4Models(this.datasource)
    //     q.sql = `
    //       select count(*) from information.resource
    //       where (community_visibility->'${channel}')::boolean is null
    //       and fk_class = ${q.addParam(k.pk_class)}
    //     `
    //     const res = await q.execute<{count: string}[]>()
    //     reportForClass[channel].conflictingUndefined = parseInt(res[0].count);
    //     reportForClass[channel].totalConflicts = reportForClass[channel].conflictingTrue +
    //       reportForClass[channel].conflictingFalse +
    //       reportForClass[channel].conflictingUndefined;

    //   }

    //   report.push(reportForClass)
    // }

    return res.sort((a, b) => (a.classId - b.classId))
  }




  @post('community-visibility/update-visibility')
  @authenticate('basic')
  @authorize({allowedRoles: [Roles.SYS_ADMIN]})
  async update(
    @param.query.number('classId', {required: true}) classId: number,
    @param.query.string('channel', {required: true}) channel: keyof CommunityVisibilityOptions,
    @param.query.boolean('onlyConflicting', {required: true, description: 'if true, only values which are confliciting witch allowed community visibility are updated, else all.'}) onlyConflicting: boolean,
    @param.query.boolean('newValue', {required: true}) newValue: boolean,
  ): Promise<void> {

    if (!['toolbox', 'dataApi', 'website'].includes(channel)) {
      throw new HttpErrors.UnprocessableEntity('channel must be one of: toolbox, dataApi, website')
    }
    await this.visibilityController.initializeConfiguration()
    const range = this.visibilityController.getCommunityVisibilityRange(classId)
    const allowedVals = [range.min[channel], range.max[channel]]

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
                (t1.community_visibility->'${channel}')::boolean IS NULL OR
                (t1.community_visibility->'${channel}')::boolean NOT IN (${q.addParams(allowedVals)})
        )`: ''}
    )`

    await q.execute()
  }


}

