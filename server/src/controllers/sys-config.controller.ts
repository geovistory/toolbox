// Uncomment these imports to begin using these cool features!

import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {tags} from '@loopback/openapi-v3/dist/decorators/tags.decorator';
import {model, property} from '@loopback/repository';
import {get, HttpErrors, post, requestBody} from '@loopback/rest';
import {Roles} from '../components/authorization';
import {registerType} from '../components/spec-enhancer/model.spec.enhancer';
import {Postgres1DataSource} from '../datasources/postgres1.datasource';
import {SysConfigSpecialFields} from '../models/sys-config/sys-config-special-fields.model';
export interface NumericIndex {[key: number]: true;}

const SYS_CONFIG_KEY = 'SYS_CONFIG';

@model({
  jsonSchema: {
    description: "This list type allows to create / view / edit a numeric value with a measurement unit.",
  }
})
export class DimensionListType {
  @property({required: true}) measurementUnitClass: number
}

export enum TrueEnum {true = 'true'}
@model({
  jsonSchema: {
    description: "If present, defines a specific list type for the class.",
    maxProperties: 1,
    minProperties: 1,

  }
})
export class ValueObjectType {
  @property({type: 'string', jsonSchema: {enum: Object.values(TrueEnum)}})
  appellation?: TrueEnum

  @property({type: 'string', jsonSchema: {enum: Object.values(TrueEnum)}})
  language?: TrueEnum

  @property({type: 'string', jsonSchema: {enum: Object.values(TrueEnum)}})
  place?: TrueEnum

  @property({type: 'string', jsonSchema: {enum: Object.values(TrueEnum)}})
  timePrimitive?: TrueEnum

  @property({type: 'string', jsonSchema: {enum: Object.values(TrueEnum)}})
  langString?: TrueEnum

  @property({type: DimensionListType, })
  dimension?: DimensionListType
}

@model({
  jsonSchema: {
    description: "System wide configuration for the class."
  }
})
export class ClassConfig {
  @property({type: ValueObjectType}) valueObjectType?: ValueObjectType
}
@model({jsonSchema: {additionalProperties: {$ref: registerType(ClassConfig)}, }})
export class ClassesIndex {
  [key: number]: ClassConfig | undefined;
  @property({type: ClassConfig}) 1?: ClassConfig
}

@model({
  jsonSchema: {
    title: "SysConfig",
    description: 'Classes indexed by primary key: Use class id as key (e.g. \"21\" for Person, https://ontome.dataforhistory.org/class/21) ',
    example: {
      classes: {
        40: {
          valueObjectType: {
            appellation: "true"
          }
        },
        51: {
          valueObjectType: {
            place: "true"
          }
        },
        52: {
          valueObjectType: {
            dimension: {
              measurementUnitClass: 56
            }
          }
        },
        54: {
          valueObjectType: {
            language: "true"
          }
        },
        335: {
          valueObjectType: {
            timePrimitive: "true"
          }
        },
        657: {
          valueObjectType: {
            langString: "true"
          }
        }
      },
      specialFields: {
        incomingProperties: {
          1761: {
            comment: 'has short title',
            displayInBasicFields: {position: 1}
          },
          1111: {
            comment: 'has appellation for language',
            displayInBasicFields: {position: 2}
          },
          1762: {
            comment: 'P18 has definition (is definition of)',
            displayInBasicFields: {position: 4}
          },
          1760: {
            comment: 'has web address (is web addess of) – P16',
            displayInBasicFields: {position: 5}
          },
          1763: {
            comment: 'P19 has comment (is comment about)',
            displayInBasicFields: {position: 6}
          },
        },
        outgoingProperties: {
          [4]: {
            comment: 'has time-span (When)',
            displayInBasicFields: {position: 1000}
          }
        },
        hasTypeSubproperties: {
          comment: 'all subproperties of has type (dfh.api_property.is_has_type_subproperty=true)',
          displayInBasicFields: {position: 3}
        }
      }
    }
  }
})





export class SysConfigValue {
  @property({type: ClassesIndex, required: true})
  classes: ClassesIndex
  @property({type: SysConfigSpecialFields, required: true})
  specialFields: SysConfigSpecialFields
}


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
