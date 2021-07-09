import {model, property} from '@loopback/repository';
import {SysConfigSpecialFields} from './sys-config-special-fields.model';
import {ClassesIndex} from "./sys-config-classes-index";
import {TrueEnum} from './TrueEnum';
import {SysConfigAddProperty} from './sys-config-add-property';
import {ClassConfig} from './sys-config-class-config';
const example: SysConfigValue = {
  classesDefault: {
    projectVisibilityDefault: {toolbox: true, dataApi: false, website: false},
    communityVisibilityDefault: {toolbox: false, dataApi: false, website: false},
  },
  classesByBasicType: {
    8: {
      communityVisibilityRange: {
        min: {toolbox: true, dataApi: true, website: true},
        max: {toolbox: true, dataApi: true, website: true},
      },
      communityVisibilityDefault: {toolbox: true, dataApi: true, website: true},
    },
    9: {
      communityVisibilityRange: {
        min: {toolbox: true, dataApi: false, website: false},
        max: {toolbox: true, dataApi: true, website: true},
      },
      communityVisibilityDefault: {toolbox: true, dataApi: false, website: false},
    },
    30: {
      communityVisibilityRange: {
        min: {toolbox: true, dataApi: true, website: true},
        max: {toolbox: true, dataApi: true, website: true},
      },
      communityVisibilityDefault: {toolbox: true, dataApi: true, website: true},
    }
  },
  classes: {
    40: {
      valueObjectType: {
        appellation: TrueEnum.true
      }
    },
    51: {
      valueObjectType: {
        place: TrueEnum.true
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
        language: TrueEnum.true
      }
    },
    335: {
      valueObjectType: {
        timePrimitive: TrueEnum.true
      }
    },
    657: {
      valueObjectType: {
        langString: TrueEnum.true
      }
    },
    635: {
      communityVisibilityRange: {
        min: {toolbox: false, dataApi: false, website: false},
        max: {toolbox: false, dataApi: false, website: false},
      },
      communityVisibilityDefault: {toolbox: false, dataApi: false, website: false},
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
    },
    bySourceClass: {
      '502': {
        incomingProperties: {},
        outgoingProperties: {
          1760: {
            comment: "has web address (is web addess of) – P16",
            displayInBasicFields: {
              position: 5
            }
          }
        }
      }
    }
  },
  addProperty: [
    {
      wherePkProperty: 1111,
      isOutgoing: false,
      toSourceClass: {
        whereBasicTypeIn: [8, 9, 30],
        wherePkClassNotIn: [365]
      },
    }
  ]
}
@model({
  jsonSchema: {
    title: "SysConfigValue",
    description: 'Classes indexed by primary key: Use class id as key (e.g. \"21\" for Person, https://ontome.net/class/21) ',
    example
  }
})

export class SysConfigValue {


  @property({type: ClassesIndex})
  classesDefault?: ClassConfig;

  @property({type: ClassesIndex})
  classesByBasicType?: ClassesIndex;

  @property({type: ClassesIndex, required: true})
  classes: ClassesIndex;

  @property({type: SysConfigSpecialFields, required: true})
  specialFields: SysConfigSpecialFields;

  @property.array(SysConfigAddProperty)
  addProperty?: SysConfigAddProperty[]
}


