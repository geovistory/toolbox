import {Provider} from "@loopback/core";
import {
  Authorizer,
  AuthorizationContext,
  AuthorizationMetadata,
  AuthorizationDecision
} from '@loopback/authorization';
import {Roles} from './keys';
import {inject} from '@loopback/testlab';
import {repository} from '@loopback/repository';
import {PubAccountProjectRelRepository} from '../../repositories';
import {RequestContext, HttpErrors} from '@loopback/rest';
import {securityId} from '@loopback/authorization/node_modules/@loopback/security';
import {isInteger} from 'lodash';
import {PubRoleMappingRepository} from '../../repositories/pub-role-mapping.repository';

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
    @repository(PubRoleMappingRepository) private pubRoleMappingRepo: PubRoleMappingRepository
  ) {}

  async authorize(
    context: AuthorizationContext,
    metadata: AuthorizationMetadata,
  ) {


    if (metadata.allowedRoles?.includes(Roles.PROJECT_MEMBER)) {
      const decision = await this.authorizeProjectMember(context)
      return decision;
    }

    if (metadata.allowedRoles?.includes(Roles.SYS_ADMIN)) {
      const decision = await this.authorizeSystemAdmin(context)
      return decision;
    }

    throw new HttpErrors.InternalServerError('This type of authorization is not supported.')

  }

  private async authorizeProjectMember(context: AuthorizationContext): Promise<AuthorizationDecision> {

    const pkProject = this.extractPkProject(context);

    if (!pkProject) return AuthorizationDecision.DENY

    const accountId = this.extractAccountId(context)

    if (!accountId) return AuthorizationDecision.DENY

    const membbership = await this.pubAccountProjectRelRepo.findOne({
      where: {
        and: [
          {
            accountId: accountId,
            'fk_project': pkProject
          }
        ]
      }
    })

    if (!membbership) return AuthorizationDecision.DENY

    return AuthorizationDecision.ALLOW
  }


  private async authorizeSystemAdmin(context: AuthorizationContext): Promise<AuthorizationDecision> {

    const accountId = this.extractAccountId(context)

    if (!accountId) return AuthorizationDecision.DENY;

    const adminRoleMapping = await this.pubRoleMappingRepo.findOne({
      where: {
        and: [
          {roleid: 1}, // system admin role
          {principalid: accountId},
          {principaltype: 'USER'}
        ]
      }
    })
    if (adminRoleMapping) return AuthorizationDecision.ALLOW
    return AuthorizationDecision.DENY
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
    const pkProject = request?.query?.pkProject || request?.body?.pkProject;
    if (typeof pkProject === 'string') {
      const pk = parseInt(pkProject)
      if (isInteger(pk)) return pk;
    }

    if (typeof pkProject === 'number') {
      if (isInteger(pkProject)) return pkProject;
    };

  }
}
