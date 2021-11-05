import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/context';
import {model, property} from '@loopback/repository';
import {get, param, post, Request, requestBody, ResponseObject, RestBindings} from '@loopback/rest';
import {SecurityBindings, UserProfile} from '@loopback/security';
import {Roles} from '../components/authorization/keys';
import {TColFilter} from '../components/query/q-table-page';
import {StatementWithTarget} from '../models/field-response/gv-statement-with-target';
import {GvFieldTargetViewType} from '../models/field/gv-field-target-view-type';
import {GvSubentityFieldTargetViewType} from '../models/field/gv-subentity-field-target-view-type';
import {QuillOperationWithRelations} from '../models/quill-doc/quill-operation-with-relations';
import {ClassConfig} from '../models/sys-config/sys-config-class-config';
import {CommunityVisibilityOptionsWithRelations} from '../models/sys-config/sys-config-community-visibility-options';
import {SysConfigFieldDisplay} from '../models/sys-config/sys-config-field-display.model';
import {SysConfigFieldsOfSourceClass} from '../models/sys-config/sys-config-fields-of-source-class.model';
import {ProjectVisibilityOptionsWithRelations} from '../models/sys-config/sys-config-project-visibility-options';

/**
 * OpenAPI response for ping()
 */
const PING_RESPONSE: ResponseObject = {
  description: 'Ping Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'PingResponse',
        properties: {
          greeting: {type: 'string'},
          date: {type: 'string'},
          url: {type: 'string'},
          headers: {
            type: 'object',
            properties: {
              'Content-Type': {type: 'string'},
            },
            additionalProperties: true,
          },
        },
      },
    },
  },
};

@model()
class ProjectPongRequest {
  @property() pkProject: number
}
/**
 * A simple controller to bounce back http requests
 */
export class PingController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @inject(SecurityBindings.USER, {optional: true}) public user: UserProfile,
  ) { }

  // Map to `GET /ping`
  @get('/ping', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  ping(): object {
    // Reply with a greeting, the current time, the url, and request headers
    return {
      greeting: 'Hello from LoopBack',
      date: new Date(),
      url: this.req.url,
      headers: Object.assign({}, this.req.headers),
    };
  }


  @get('/project-ping', {
    description: 'Test get access to project: Only Project members get a response.',
    responses: {
      '200': PING_RESPONSE,
    },
  })
  @authenticate('basic')
  @authorize({allowedRoles: [Roles.PROJECT_MEMBER]})
  projectPing(
    @param.query.number('pkProject') pkProject: number
  ): string {
    return `Hello ${this.user.name}, you are member of project ${pkProject}!`
  }

  @post('/project-pong', {
    description: 'Test post access to project: Only Project members get a response.',
    responses: {
      '200': PING_RESPONSE,
    },
  })
  @authenticate('basic')
  @authorize({allowedRoles: [Roles.PROJECT_MEMBER]})
  projectPong(
    @requestBody() req: ProjectPongRequest
  ): string {
    return `Hello ${this.user.name}, you are member of project ${req.pkProject}!`
  }


  @get('/system-admin-ping', {
    description: 'Test access as system admin: Only system administrators get a response.',
    responses: {
      '200': PING_RESPONSE,
    },
  })
  @authenticate('basic')
  @authorize({allowedRoles: [Roles.SYS_ADMIN]})
  sysAdminPing(): string {
    return `Hello ${this.user.name}, you are system admin!`
  }



  /**
   * HACK to register types
   */
  @post('/GvTargetType', {
    responses: {
      '200': {
        description: '',
        content: {'application/json': {schema: {'x-ts-type': GvFieldTargetViewType}}}
      }
    }
  })
  xGvTargetType() { }

  @post('/GvSubentityTargetType', {
    responses: {
      '200': {
        description: '',
        content: {'application/json': {schema: {'x-ts-type': GvSubentityFieldTargetViewType}}}
      }
    }
  })
  xGvSubentityTargetType() { }

  @post('/ClassConfig', {
    responses: {
      '200': {
        description: '',
        content: {'application/json': {schema: {'x-ts-type': ClassConfig}}}
      }
    }
  })
  xClassConfig() { }

  @post('/TColFilter', {
    responses: {
      '200': {
        description: '',
        content: {'application/json': {schema: {'x-ts-type': TColFilter}}}
      }
    }
  })
  xTColFilter() { }

  @post('/SysConfigFieldsOfSourceClass', {
    responses: {
      '200': {
        description: '',
        content: {'application/json': {schema: {'x-ts-type': SysConfigFieldsOfSourceClass}}}
      }
    }
  })
  xSysConfigFieldsOfSourceClass() { }

  @post('/SysConfigFieldDisplay', {
    responses: {
      '200': {
        description: '',
        content: {'application/json': {schema: {'x-ts-type': SysConfigFieldDisplay}}}
      }
    }
  })
  xSysConfigFieldDisplay() { }

  @post('/QuillOperationWithRelations', {
    responses: {
      '200': {
        description: '',
        content: {'application/json': {schema: {'x-ts-type': QuillOperationWithRelations}}}
      }
    }
  })
  xQuillOperationWithRelations() { }


  @post('/CommunityVisibilityOptionsWithRelations', {
    responses: {
      '200': {
        description: '',
        content: {'application/json': {schema: {'x-ts-type': CommunityVisibilityOptionsWithRelations}}}
      }
    }
  })
  xCommunityVisibilityOptionsWithRelations() { }

  @post('/ProjectVisibilityOptionsWithRelations', {
    responses: {
      '200': {
        description: '',
        content: {'application/json': {schema: {'x-ts-type': ProjectVisibilityOptionsWithRelations}}}
      }
    }
  })
  xProjectVisibilityOptionsWithRelations() { }


  @post('/StatementWithTarget', {
    responses: {
      '200': {
        description: '',
        content: {'application/json': {schema: {'x-ts-type': StatementWithTarget}}}
      }
    }
  })
  xStatementWithTarget() { }
}


