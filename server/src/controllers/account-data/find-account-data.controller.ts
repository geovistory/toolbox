/* eslint-disable @typescript-eslint/camelcase */
import { authenticate } from '@loopback/authentication';
import { inject } from '@loopback/core';
import { param, tags } from '@loopback/openapi-v3';
import { repository } from '@loopback/repository';
import { get } from '@loopback/rest';
import { SecurityBindings, securityId, UserProfile } from '@loopback/security';
import { PK_SYSTEM_TYPE__PRO_TEXT_PROPERTY__DESCRIPTION, PK_SYSTEM_TYPE__PRO_TEXT_PROPERTY__LABEL } from '../../config';
import { Postgres1DataSource } from '../../datasources/postgres1.datasource';
import { GvPositiveSchemaObject } from '../../models/gv-positive-schema-object.model';
import { PubRole } from '../../models/pub-role.model';
import { InfLanguageRepository, ProProjectRepository, ProTextPropertyRepository, PubAccountProjectRelRepository } from '../../repositories';

@tags('account data')
export class FindAccountDataController {
  constructor(
    @inject('datasources.postgres1')
    public datasource: Postgres1DataSource,
    @repository(PubAccountProjectRelRepository)
    public accountProjectRepo: PubAccountProjectRelRepository,
    @repository(ProProjectRepository)
    public proProjectRepo: ProProjectRepository,
    @repository(ProTextPropertyRepository)
    public proTextPropertyRepo: ProTextPropertyRepository,
    @repository(InfLanguageRepository)
    public infLanguageRepo: InfLanguageRepository,
    @inject(SecurityBindings.USER, { optional: true }) public user: UserProfile,

  ) { }



  @get('account-data/get-projects-of-account', {
    responses: {
      '200': {
        description: 'The projects of account with name and description',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': GvPositiveSchemaObject
            }
          }
        }
      },
    },
  })
  @authenticate('basic')
  async getProjetcsOfAccount(): Promise<GvPositiveSchemaObject> {
    const accountId = this.user[securityId];


    const accountProjectRels = await this.accountProjectRepo.find({ where: { account_id: parseInt(accountId) } })
    const projects = await this.proProjectRepo.find({ where: { pk_entity: { inq: accountProjectRels.map(r => r.fk_project) } } })
    const textProperties = await this.proTextPropertyRepo.find({
      where: {
        fk_pro_project: { inq: projects.map(p => p.pk_entity) },
        fk_system_type: {
          inq: [
            PK_SYSTEM_TYPE__PRO_TEXT_PROPERTY__LABEL,
            PK_SYSTEM_TYPE__PRO_TEXT_PROPERTY__DESCRIPTION
          ]
        }
      }
    })
    const languages = await this.infLanguageRepo.find({ where: { pk_entity: { inq: projects.map(r => r.fk_language) } } })


    return {
      inf: {
        language: languages
      },
      pro: {
        project: projects,
        text_property: textProperties
      }
    }
  }

  @get('account-data/get-roles-of-account', {
    responses: {
      '200': {
        description: 'The roles of the account',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                'x-ts-type': PubRole
              }
            }
          }
        }
      },
    },
  })
  @authenticate('basic')
  async getRoles(
    @param.query.number('accountId') accountId: number
  ) {
    const sql = `
      SELECT role.id, role.name
      FROM role
      JOIN rolemapping ON role.id = rolemapping.roleid
      WHERE rolemapping.principaltype = 'USER'
      AND rolemapping.principalid = $1::text
    `;
    const params = [accountId];
    const res: PubRole[] = await this.datasource.execute(sql, params)
    return res;
  };




}

