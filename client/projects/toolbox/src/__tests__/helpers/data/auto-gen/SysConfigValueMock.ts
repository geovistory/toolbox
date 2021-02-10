import { SysConfigValue, SysConfigValueObjectType } from 'projects/toolbox/src/app/core/sdk-lb4';

export class SysConfigValueMock {
  static readonly SYS_CONFIC_VALID: SysConfigValue = {
    classes: {
      40: {
        valueObjectType: {
          appellation: 'true' as SysConfigValueObjectType.AppellationEnum
        }
      },
      51: {
        valueObjectType: {
          place: 'true' as SysConfigValueObjectType.AppellationEnum
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
          language: 'true' as SysConfigValueObjectType.AppellationEnum
        }
      },
      335: {
        valueObjectType: {
          timePrimitive: 'true' as SysConfigValueObjectType.AppellationEnum
        }
      },
      657: {
        valueObjectType: {
          langString: 'true' as SysConfigValueObjectType.AppellationEnum
        }
      },
      784: {
        valueObjectType: {
          langString: 'true' as SysConfigValueObjectType.AppellationEnum
        }
      },
      785: {
        valueObjectType: {
          langString: 'true' as SysConfigValueObjectType.AppellationEnum
        }
      }
    },
    specialFields: {
      incomingProperties: {
        1111: {
          comment: 'has appellation for language',
          displayInBasicFields: { position: 2 }
        },
      },
      outgoingProperties: {
        1761: {
          comment: 'has short title',
          displayInBasicFields: { position: 1 }
        },
        1762: {
          comment: 'P18 has definition (is definition of)',
          displayInBasicFields: { position: 4 }
        },
        1760: {
          comment: 'has web address (is web addess of) – P16',
          displayInBasicFields: { position: 5 }
        },
        1763: {
          comment: 'P19 has comment (is comment about)',
          displayInBasicFields: { position: 6 }
        },
        4: {
          comment: 'has time-span (When)',
          displayInBasicFields: { position: 1000 }
        }
      },
      hasTypeSubproperties: {
        comment: 'all subproperties of has type (dfh.api_property.is_has_type_subproperty=true)',
        displayInBasicFields: { position: 3 }
      }
    }
  }
}
