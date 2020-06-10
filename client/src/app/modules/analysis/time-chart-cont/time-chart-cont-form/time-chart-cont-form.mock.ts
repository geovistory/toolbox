import { TimeChartContInput } from '../../../../../../../server/lb3app/src/common/interfaces';

export const initVal1: TimeChartContInput = {
  'lines': [
    {
      'queryDefinition': {
        'filter': {
          'data': {
            'types': [],
            'classes': [
              61
            ]
          },
          'children': []
        },
        'columns': [
          {
            'id': 'col_0',
            'defaultType': 'temporal_distribution',
            'ofRootTable': true,
            'preventGroupBy': true
          }
        ]
      },
      'visualizationDefinition': {
        'label': 'Line xyz'
      }
    }
  ]
}
export const initVal2: TimeChartContInput = {
  'lines': [
    {
      'queryDefinition': {
        'filter': {
          'data': {
            'classes': [
              61
            ],
            'types': []
          },
          'children': []
        },
        'columns': [
          {
            'id': 'col_0',
            'ofRootTable': true,
            'preventGroupBy': true,
            'defaultType': 'temporal_distribution'
          }
        ]
      },
      'visualizationDefinition': {
        'label': 'Hallöchen'
      }
    },
    {
      'queryDefinition': {
        'filter': {
          'data': {
            'classes': [
              523
            ],
            'types': []
          },
          'children': [
            {
              'data': {
                'operator': 'AND',
                'subgroup': 'property'
              },
              'children': [
                {
                  'data': {
                    'operator': 'IS',
                    'outgoingProperties': [
                      1335
                    ],
                    'ingoingProperties': []
                  },
                  'children': [
                    {
                      'data': {
                        'operator': 'AND',
                        'subgroup': 'classAndType'
                      },
                      'children': [
                        {
                          'data': {
                            'classes': [
                              363
                            ],
                            'types': [
                              80412
                            ]
                          },
                          'children': []
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        'columns': [
          {
            'id': 'col_0',
            'ofRootTable': true,
            'preventGroupBy': true,
            'defaultType': 'temporal_distribution'
          }
        ]
      },
      'visualizationDefinition': {
        'label': 'My new line'
      }
    }
  ]
}
