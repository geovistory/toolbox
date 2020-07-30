// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/core';
import {get, SchemaObject, post, requestBody, HttpErrors} from '@loopback/rest';
import {Postgres1DataSource} from '../datasources/postgres1.datasource';
import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {Roles} from '../components/authorization';
import {tags} from '@loopback/openapi-v3/dist/decorators/tags.decorator';
// import {SysConfig, SysConfigClass} from '../models/sys-config.model';

const SYS_CONFIG_REQUEST: SchemaObject = {
  title: 'SysConfig',
  additionalProperties: false,
  properties: {
    classes: {
      title: 'ClassesIndex',
      description: 'Classes indexed by primary key: Use class id as key (e.g. "21" for Person, https://ontome.dataforhistory.org/class/21) ',
      additionalProperties: {
        title: 'ClassConfig',
        description: 'System wide configuration for the class.',
        additionalProperties: false,
        properties: {
          mapsToListType: {
            description: 'If present, defines a specific list type for the class.',
            title: 'ListType',
            maxProperties: 1,
            minProperties: 1,
            additionalProperties: false,
            properties: {
              appellation: {
                description: 'This list type allows to create / view / edit strings.',
                type: 'string',
                enum: ['true']
              },
              language: {
                description: 'This list type allows to select / view a language.',
                type: 'string',
                enum: ['true']
              },
              place: {
                description: 'This list type allows to create / view / edit geo-point-coordinates.',
                type: 'string',
                enum: ['true']
              },
              timePrimitive: {
                description: 'This list type allows to create / view / edit time primitives.',
                type: 'string',
                enum: ['true']
              },
              langString: {
                description: 'This list type allows to create / view / edit a string with language.',
                type: 'string',
                enum: ['true']
              },
              dimension: {
                description: 'This list type allows to create / view / edit a numeric value with a measurement unit.',
                title: 'DimensionListType',
                required: ['measurementUnitClass'],
                properties: {
                  measurementUnitClass: {
                    description: 'Defines the class providing the measurement unit types.',
                    type: 'number'
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  example: {
    "classes": {
      "40": {
        "mapsToListType": {
          "appellation": "true"
        }
      },
      "54": {
        "mapsToListType": {"language": "true"}
      },
      "51": {
        "mapsToListType": {"place": "true"}
      },
      "335": {
        "mapsToListType": {"timePrimitive": "true"}
      },
      "657": {
        "mapsToListType": {"langString": "true"}
      },
      "52": {
        "mapsToListType": {
          "dimension": {"measurementUnitClass": 56}
        }
      }
    }
  }

}
const SYS_CONFIG_KEY = 'SYS_CONFIG';

@tags('system configuration')
export class SysConfigController {
  constructor(@inject('datasources.postgres1') private dataSource: Postgres1DataSource) {}

  @get('get-system-config', {
    responses: {
      '200': {
        description: 'System Configuration',
        content: {
          'application/json': {
            schema: SYS_CONFIG_REQUEST
          },
        },
      },
    },
  })
  async getSystemConfig(): Promise<object> {

    const res = await this.dataSource.execute(
      `SELECT config FROM system.config WHERE key = $1`,
      [SYS_CONFIG_KEY]
    )

    if (res.length === 0) {
      throw new HttpErrors.NotFound()
    }

    return res?.[0]?.config
  }


  @post('validate-system-config')
  async validateSystemConfig(
    @requestBody({
      description: 'Validates the configuration without persisting it.',
      content: {
        'application/json': {
          schema: SYS_CONFIG_REQUEST
        },
      },
      required: true
    }) config: object
  ): Promise<string> {
    return 'Valid'
  }

  @post('set-system-config')
  @authenticate('basic')
  @authorize({allowedRoles: [Roles.SYS_ADMIN]})
  async setSystemConfig(
    @requestBody({
      description: `Sets or updates the system configuration. This affects the basic behavior of geovistory (i.e. for all projects).
      The provided (json) value is validated against the json schema. If invalid, the request is rejected and the current configuration stays unchanged.
      Hint: You can download the current cofiguration using "/get-system-config", modify it and upload the modified version here.`,
      content: {
        'application/json': {
          schema: SYS_CONFIG_REQUEST
        },
      },
      required: true
    }) config: object
  ): Promise<string> {
    await this.dataSource.execute(
      `DELETE FROM system.config WHERE key = $1`,
      [SYS_CONFIG_KEY]
    )

    await this.dataSource.execute(
      `INSERT INTO system.config (key, config) VALUES ($1,$2)`,
      [SYS_CONFIG_KEY, config]
    )

    return 'System Config Updated!'
  }
}
