// Uncomment these imports to begin using these cool features!

import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {tags} from '@loopback/openapi-v3/dist/decorators/tags.decorator';
import {repository} from '@loopback/repository';
import {get} from '@loopback/rest';
import {Roles} from '../../components/authorization';
import {SysSystemType} from '../../models';
import {SysSystemTypeRepository} from '../../repositories';


@tags('system types')
export class SysTypeController {
  constructor(
    @repository(SysSystemTypeRepository)
    public sysSystemTypeRepository: SysSystemTypeRepository,
  ) { }

  @get('get-system-types', {
    responses: {
      '200': {
        description: 'Get all system types',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                'x-ts-type': SysSystemType
              }
            }
          },
        },
      },
    },
  })
  @authenticate('basic')
  @authorize({allowedRoles: [Roles.SYS_ADMIN]})
  async getSystemTypes(): Promise<SysSystemType[]> {
    return this.sysSystemTypeRepository.find()
  }
}
