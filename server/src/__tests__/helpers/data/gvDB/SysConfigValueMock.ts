import {SysConfigValue, TrueEnum} from '../../../../models';

export class SysConfigValueMock {
  static readonly SYS_CONFIC_VALID: SysConfigValue = {
    classesDefault: {
      formControlType: {
        entity: TrueEnum.true
      },
      viewType: {
        nestedResource: []
      }
    },
    classesByBasicType: {
      [8]: {
        formControlType: {
          entity: TrueEnum.true
        },
        viewType: {
          entityPreview: TrueEnum.true
        }
      },
      [30]: {
        formControlType: {
          entity: TrueEnum.true
        },
        viewType: {
          entityPreview: TrueEnum.true
        }
      }
    },

    'classes': {
      '365': {
        formControlType: {
          appellationTeEn: TrueEnum.true
        }
      },
      '1': {
        'excludedFromEntities': true
      },
      '40': {
        'viewType': {
          'appellation': TrueEnum.true
        },
        'formControlType': {
          'appellation': TrueEnum.true
        },
        'valueObjectType': {
          'appellation': TrueEnum.true
        },
        'excludedFromEntities': true
      },
      '50': {
        'excludedFromEntities': true
      },
      '51': {
        'valueObjectType': {
          'place': TrueEnum.true
        },
        'formControlType': {
          'place': TrueEnum.true
        },
        'excludedFromEntities': true
      },
      '52': {
        'viewType': {
          'dimension': {
            'measurementUnitClass': 56
          }
        },
        'formControlType': {
          'dimension': {
            'measurementUnitClass': 56
          }
        },
        'valueObjectType': {
          'dimension': {
            'measurementUnitClass': 56
          }
        },
        'excludedFromEntities': true
      },
      '54': {
        'viewType': {
          'language': TrueEnum.true
        },
        'valueObjectType': {
          'language': TrueEnum.true
        },
        'formControlType': {
          'language': TrueEnum.true
        },
        'excludedFromEntities': true
      },
      '70': {
        'excludedFromEntities': true
      },
      '218': {
        'excludedFromEntities': true
      },
      '335': {
        'viewType': {
          'timePrimitive': TrueEnum.true
        },
        'valueObjectType': {
          'timePrimitive': TrueEnum.true
        },
        'formControlType': {
          'timePrimitive': TrueEnum.true
        },
        'excludedFromEntities': true
      },
      '445': {
        'excludedFromEntities': true
      },
      '454': {
        'excludedFromEntities': true
      },
      '455': {
        'excludedFromEntities': true
      },
      '456': {
        'excludedFromEntities': true
      },
      '457': {
        'excludedFromEntities': true
      },
      '518': {
        'excludedFromEntities': true
      },
      '521': {
        'excludedFromEntities': true
      },
      '657': {
        'viewType': {
          'langString': TrueEnum.true
        },
        'valueObjectType': {
          'langString': TrueEnum.true
        },
        'formControlType': {
          'langString': TrueEnum.true
        },
        'excludedFromEntities': true
      },
      '689': {
        'viewType': {
          'dimension': {
            'measurementUnitClass': 690
          }
        },
        'valueObjectType': {
          'dimension': {
            'measurementUnitClass': 690
          }
        },
        'formControlType': {
          'dimension': {
            'measurementUnitClass': 690
          }
        },
        'excludedFromEntities': true
      },
      '707': {
        'excludedFromEntities': true
      },
      '709': {
        'excludedFromEntities': true
      },
      '713': {
        'excludedFromEntities': true
      },
      '716': {
        'excludedFromEntities': true
      },
      '717': {
        'excludedFromEntities': true
      },
      '783': {
        'excludedFromEntities': true
      },
      '784': {
        'viewType': {
          'langString': TrueEnum.true
        },
        'valueObjectType': {
          'langString': TrueEnum.true
        },
        'formControlType': {
          'langString': TrueEnum.true
        },
        'excludedFromEntities': true
      },
      '785': {
        'viewType': {
          'langString': TrueEnum.true
        },
        'valueObjectType': {
          'langString': TrueEnum.true
        },
        'formControlType': {
          'langString': TrueEnum.true
        },
        'excludedFromEntities': true
      }
    },
    'specialFields': {
      'incomingProperties': {
        '1111': {
          'comment': 'has appellation for language',
          'displayInBasicFields': {
            'position': 2
          }
        },
        '1782': {
          'comment': 'has identification – P18',
          'displayInBasicFields': {
            'position': 9
          }
        },
        '1499': {
          'comment': 'has to be preferred to',
          'displayInBasicFields': {
            'position': 11
          }
        }
      },
      'outgoingProperties': {
        '4': {
          'comment': 'has time-span (When)',
          'displayInBasicFields': {
            'position': 7
          },
          'isHasTimeSpanShortCut': true
        },
        '145': {
          'comment': 'during (When)',
          'displayInBasicFields': {
            'position': 8
          },
          'isHasTimeSpanShortCut': true
        },
        '1760': {
          'comment': 'has web address (is web addess of) – P16',
          'displayInBasicFields': {
            'position': 5
          }
        },
        '1761': {
          'comment': 'has short title',
          'displayInBasicFields': {
            'position': 1
          }
        },
        '1762': {
          'comment': 'P18 has definition (is definition of)',
          'displayInBasicFields': {
            'position': 4
          }
        },
        '1763': {
          'comment': 'P19 has comment (is comment about)',
          'displayInBasicFields': {
            'position': 6
          }
        },
        '1499': {
          'comment': 'has to be merged with',
          'displayInBasicFields': {
            'position': 10
          }
        }
      },
      'hasTypeSubproperties': {
        'comment': 'all subproperties of has type (dfh.api_property.is_has_type_subproperty=true)',
        'displayInBasicFields': {
          'position': 3
        }
      }
    },
    'addProperty': [
      {
        'comment': 'add <has appellation> to all teEn, peIt and types except for appe for lang itself',
        'wherePkProperty': 1111,
        'whereFkDomain': 365,
        'isOutgoing': false,
        'toSourceClass': {
          'wherePkClassNotIn': [365],
          'whereBasicTypeIn': [8, 9, 30]
        }
      },
      {
        'comment': 'add <has definition> to all teEn, peIt and types',
        'wherePkProperty': 1762,
        'isOutgoing': true,
        'toSourceClass': {
          'whereBasicTypeIn': [8, 9, 30]
        }
      },
      {
        'comment': 'add <has time span> to all teEn',
        'wherePkProperty': 4,
        'isOutgoing': true,
        'toSourceClass': {
          'whereBasicTypeIn': [9]
        }
      },
      {
        'comment': 'add <has identification> to teEn, peIt and types',
        'wherePkProperty': 1782,
        'isOutgoing': false,
        'toSourceClass': {
          'whereBasicTypeIn': [8, 9, 30]
        }
      },
      {
        'comment': 'add <has to be merged with> to a lot of classes',
        'wherePkProperty': 1499,
        'isOutgoing': true,
        'toSourceClass': {
          'whereBasicTypeIn': [8, 9, 10, 30]
        },
        'replaceTargetClassWithSourceClass': true
      }
    ]
  }
}
