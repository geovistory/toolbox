import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {tags} from '@loopback/openapi-v3';
import {get} from '@loopback/rest';
import {SecurityBindings, UserProfile} from '@loopback/security';
import {Roles} from '../../components/authorization';
import {Postgres1DataSource} from '../../datasources/postgres1.datasource';
import {AccountInfo} from '../../models/backoffice/account-info.model';

@tags('backoffice')
export class FindAccountDataController {
  constructor(
    @inject('datasources.postgres1')
    public datasource: Postgres1DataSource,

    @inject(SecurityBindings.USER, {optional: true}) public user: UserProfile,

  ) { }

  @get('backoffice/get-accounts', {
    responses: {
      '200': {
        description: 'Get all accounts',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                'x-ts-type': AccountInfo
              }
            }
          }
        }
      },
    },
  })
  @authenticate('basic')
  @authorize({allowedRoles: [Roles.SYS_ADMIN]})
  async getAccounts() {
    const sql = `
     SELECT
      account.id,
      account.username,
      account.email,
      account.emailverified,
      COALESCE(json_agg(DISTINCT rolemappings.roles) FILTER (WHERE rolemappings.principalid IS NOT NULL), '[]') AS roles,
      COALESCE(json_agg(DISTINCT project_rels.projects) FILTER (WHERE project_rels.account_id IS NOT NULL), '[]') AS projectrels
      from account
      LEFT JOIN LATERAL (
        SELECT jsonb_build_object('id', role.id, 'name', role.name) roles, rolemapping.principalid
        FROM role
        JOIN rolemapping ON role.id = rolemapping.roleid
        WHERE rolemapping.principaltype = 'USER'
        AND rolemapping.principalid = account.id::text
      ) AS rolemappings
      ON rolemappings.principalid = account.id::text
      LEFT JOIN LATERAL (
        SELECT apr.account_id ,jsonb_build_object('fk_project', fk_project, 'role', role) projects
        FROM account_project_rel AS apr
        JOIN projects.project ON apr.fk_project = project.pk_entity
      ) AS project_rels
      ON project_rels.account_id = account.id
      GROUP BY
      account.id,
      account.username,
      account.email,
      account.emailverified
    `;
    const res: AccountInfo[] = await this.datasource.execute(sql, [])
    return res;
  };




}
