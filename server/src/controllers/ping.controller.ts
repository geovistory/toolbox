import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/context';
import {model, property} from '@loopback/repository';
import {get, param, post, Request, requestBody, ResponseObject, RestBindings} from '@loopback/rest';
import {SecurityBindings, UserProfile} from '@loopback/security';
import {Roles} from '../components/authorization/keys';
import {TColFilter} from '../components/query/q-table-page';
import {GvSubentityTargetType, SysConfigFieldDisplay, SysConfigFieldsOfSourceClass} from '../models';
import {GvTargetType} from '../models/field/gv-target-type';
import {ClassConfig} from './sys-config-class-config';

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
        content: {'application/json': {schema: {'x-ts-type': GvTargetType}}}
      }
    }
  })
  xGvTargetType() { }

  @post('/GvSubentityTargetType', {
    responses: {
      '200': {
        description: '',
        content: {'application/json': {schema: {'x-ts-type': GvSubentityTargetType}}}
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


}


