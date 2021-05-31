/* eslint-disable @typescript-eslint/camelcase */
import {
  AuthorizationContext,

  AuthorizationDecision, AuthorizationMetadata, Authorizer
} from '@loopback/authorization';
import { Provider } from "@loopback/core";
import { repository } from '@loopback/repository';
import { RequestContext } from '@loopback/rest';
import { isInteger } from 'lodash';
import { DatDigitalRepository, DatNamespaceRepository, PubAccountProjectRelRepository } from '../../repositories';
import { PubRoleMappingRepository } from '../../repositories/pub-role-mapping.repository';
import { SqlBuilderBase } from '../../utils/sql-builders/sql-builder-base';
import { testdb } from '../../__tests__/helpers/testdb';
import { Roles } from './keys';

export class AuthorizationProvider implements Provider<Authorizer> {
  /**
   * @returns an authorizer function
   *
   */
  value(): Authorizer {
    return this.authorize.bind(this);
  }

  constructor(
    @repository(PubAccountProjectRelRepository) private pubAccountProjectRelRepo: PubAccountProjectRelRepository,
    @repository(PubRoleMappingRepository) private pubRoleMappingRepo: PubRoleMappingRepository,
    @repository(DatNamespaceRepository) private datNamespaceRepository: DatNamespaceRepository,
    @repository(DatDigitalRepository) private datDigitalRepository: DatDigitalRepository
  ) { }

  async authorize(
    context: AuthorizationContext,
    metadata: AuthorizationMetadata,
  ) {
    let decision: AuthorizationDecision = AuthorizationDecision.ALLOW;

    if (metadata.allowedRoles?.includes(Roles.PROJECT_MEMBER)) {
      decision = await this.authorizeProjectMember(context)
      if (decision === AuthorizationDecision.DENY) return decision;
    }

    if (metadata.allowedRoles?.includes(Roles.SYS_ADMIN)) {
      decision = await this.authorizeSystemAdmin(context)
      if (decision === AuthorizationDecision.DENY) return decision;
    }

    if (metadata.allowedRoles?.includes(Roles.NAMESPACE_MEMBER)) {
      decision = await this.authorizeNamespaceMember(context);
      if (decision === AuthorizationDecision.DENY) return decision;
    }

    if (metadata.allowedRoles?.includes(Roles.DATAENTITY_IN_NAMESPACE)) {
      decision = await this.authorizeDataEntityInNamespace(context);
      if (decision === AuthorizationDecision.DENY) return decision;
    }

    return decision;
  }

  private async authorizeProjectMember(context: AuthorizationContext): Promise<AuthorizationDecision> {

    const pkProject = this.extractPkProject(context);

    if (!pkProject) return AuthorizationDecision.DENY

    const accountId = this.extractAccountId(context)

    if (!accountId) return AuthorizationDecision.DENY

    const membership = await this.pubAccountProjectRelRepo.findOne({
      where: {
        'account_id': { eq: accountId },
        'fk_project': { eq: pkProject }
      }
    })

    if (!membership) return AuthorizationDecision.DENY

    return AuthorizationDecision.ALLOW
  }


  private async authorizeSystemAdmin(context: AuthorizationContext): Promise<AuthorizationDecision> {

    const accountId = this.extractAccountId(context)

    if (!accountId) return AuthorizationDecision.DENY;

    const adminRoleMapping = await this.pubRoleMappingRepo.findOne({
      where: {
        and: [
          { roleid: 1 }, // system admin role
          { principalid: accountId },
          { principaltype: 'USER' }
        ]
      }
    })
    if (adminRoleMapping) return AuthorizationDecision.ALLOW
    return AuthorizationDecision.DENY
  }

  private async authorizeNamespaceMember(context: AuthorizationContext): Promise<AuthorizationDecision> {
    const accountId = this.extractAccountId(context);
    const pkNamespace = this.extractPkNamespace(context);
    if (!accountId || !pkNamespace) return AuthorizationDecision.DENY;

    const namespace = await this.datNamespaceRepository.findById(pkNamespace);
    const membership = await this.pubAccountProjectRelRepo.findOne({
      where: {
        and: [
          {
            'account_id': accountId,
            'fk_project': namespace.fk_project
          }
        ]
      }
    })
    if (!membership) return AuthorizationDecision.DENY;
    else return AuthorizationDecision.ALLOW;
  }

  private async authorizeDataEntityInNamespace(context: AuthorizationContext): Promise<AuthorizationDecision> {
    const accountId = this.extractAccountId(context);
    const pkDataEntity = this.extractPkDataEntity(context);
    const pkDigital = this.extractPkDigital(context);

    if (!accountId || (!pkDataEntity && !pkDigital)) return AuthorizationDecision.DENY;
    const q = new SqlBuilderBase();
    q.sql = 'SELECT fk_namespace FROM data.entity WHERE pk_entity=' + q.addParam(pkDataEntity ?? pkDigital) + ';';
    const fkNamespace = (await testdb.execute(q.sql, q.params))[0]?.fk_namespace;
    if (!fkNamespace) return AuthorizationDecision.DENY;
    const namespace = await this.datNamespaceRepository.findById(fkNamespace);
    if (!namespace) return AuthorizationDecision.DENY;

    const membership = await this.pubAccountProjectRelRepo.findOne({
      where: {
        and: [{ 'account_id': accountId, 'fk_project': namespace.fk_project }]
      }
    })

    if (membership) return AuthorizationDecision.ALLOW;
    else return AuthorizationDecision.DENY;
  }


  private extractAccountId(context: AuthorizationContext) {
    const principal = context?.principals[0];
    if (principal?.type !== 'USER') return;
    const userId = principal['id'];
    if (typeof userId === 'string') {
      const id = parseInt(userId)
      if (isInteger(id)) return id;
    }
    if (typeof userId === 'number') {
      if (isInteger(userId)) return userId;
    };
  }

  private extractPkProject(context: AuthorizationContext) {
    const requestContext = context.invocationContext?.parent as RequestContext;
    const request = requestContext?.request;
    const pkProject = request?.query?.pkProject ??
      request?.query?.fkProject ??
      request?.body?.pkProject ??
      request?.body?.fkProject ??
      request?.body?.fk_project;
    if (typeof pkProject === 'string') {
      const pk = parseInt(pkProject)
      if (isInteger(pk)) return pk;
    }

    if (typeof pkProject === 'number') {
      if (isInteger(pkProject)) return pkProject;
    };
  }

  private extractPkNamespace(context: AuthorizationContext) {
    const requestContext = context.invocationContext?.parent as RequestContext;
    const request = requestContext?.request;
    const pkNamespace = request?.query?.pkNamespace ??
      request?.body?.pkNamespace;
    if (typeof pkNamespace === 'string') {
      const pk = parseInt(pkNamespace)
      if (isInteger(pk)) return pk;
    }

    if (typeof pkNamespace === 'number') {
      if (isInteger(pkNamespace)) return pkNamespace;
    };
  }

  private extractPkDataEntity(context: AuthorizationContext) {
    const requestContext = context.invocationContext?.parent as RequestContext;
    const request = requestContext?.request;
    const pkDataEntity = request?.query?.pkDataEntity ?? request?.body?.pkDataEntity;
    if (typeof pkDataEntity === 'string') return isInteger(parseInt(pkDataEntity)) ? parseInt(pkDataEntity) : null;
    if (typeof pkDataEntity === 'string') return parseInt(pkDataEntity);
  }

  private extractPkDigital(context: AuthorizationContext) {
    const requestContext = context.invocationContext?.parent as RequestContext;
    const request = requestContext?.request;
    const pkDigital = request?.query?.pkDigital ?? request?.body?.pkDigital;
    if (typeof pkDigital === 'string') return isInteger(parseInt(pkDigital)) ? parseInt(pkDigital) : null;
    if (typeof pkDigital === 'string') return parseInt(pkDigital);
  }
}