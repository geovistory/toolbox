// Uncomment these imports to begin using these cool features!

import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {tags} from '@loopback/openapi-v3/dist/decorators/tags.decorator';
import {get, HttpErrors, post, requestBody} from '@loopback/rest';
import {Roles} from '../components/authorization';
import {Postgres1DataSource} from '../datasources/postgres1.datasource';
import {SysConfigValue} from '../models/sys-config/sys-config-value.model';
export interface NumericIndex {[key: number]: true;}

export const SYS_CONFIG_KEY = 'SYS_CONFIG';

@tags('system configuration')
export class SysConfigController {
  constructor(@inject('datasources.postgres1') private dataSource: Postgres1DataSource) { }

  @get('get-system-config', {
    responses: {
      '200': {
        description: 'System Configuration',
        content: {
          'application/json': {
            schema: {'x-ts-type': SysConfigValue}
          },
        },
      },
    },
  })
  async getSystemConfig(): Promise<SysConfigValue> {

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
          schema: {'x-ts-type': SysConfigValue}// SYS_CONFIG_REQUEST
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
          schema: {'x-ts-type': SysConfigValue}// SYS_CONFIG_REQUEST
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

  /**
   * returns a object with the pkClasses that map to a value object type.
   * e.g. {40:true, 51:true, ...}
   * remark: internal function (no rest api)
   */
  async getValueObjectClasses() {
    const sysConfig = await this.getSystemConfig()
    const valueObjectClasses: NumericIndex = {}
    for (const pkClass in sysConfig.classes) {
      if (Object.prototype.hasOwnProperty.call(sysConfig.classes, pkClass)) {
        const specialClass = sysConfig.classes[pkClass];
        if (specialClass?.valueObjectType) {
          valueObjectClasses[pkClass] = true
        }
      }
    }
    return valueObjectClasses
  }
}
