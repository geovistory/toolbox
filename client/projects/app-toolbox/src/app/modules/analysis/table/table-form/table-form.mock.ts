import { QueryDefinition } from 'projects/app-toolbox/src/app/core/sdk-lb4/model/queryDefinition';

export const mockQuery: QueryDefinition = {
  'filter': {
    'data': {
      'types': [],
      'classes': [
        442
      ]
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
              'ingoingProperties': [],
              'outgoingProperties': [
                1189,
                1188
              ]
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
                      'types': [
                        81893
                      ],
                      'classes': [
                        68
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
    // {
    //   'label': 'Entity',
    //   'queryPath': [
    //     {
    //       'data': {},
    //       'type': 'properties'
    //     }
    //   ],
    //   'defaultType': 'entity_preview',
    //   'ofRootTable': true
    // },
    // {
    //   'label': 'Entity Label',
    //   'colName': 'entity_label',
    //   'queryPath': [
    //     {
    //       'data': {},
    //       'type': 'properties'
    //     }
    //   ],
    //   'defaultType': 'entity_label',
    //   'ofRootTable': true
    // },
    // {
    //   'label': 'Class Label',
    //   'colName': 'class_label',
    //   'queryPath': [
    //     {
    //       'data': {},
    //       'type': 'properties'
    //     }
    //   ],
    //   'defaultType': 'class_label',
    //   'ofRootTable': true
    // },
    {
      'id': 'col_0',
      'label': 'Type Label',
      'queryPath': [
        {
          'data': {},
          'type': 'properties'
        }
      ],
      'defaultType': 'type_label',
      'ofRootTable': true
    },
    {
      'id': 'col_1',
      'label': 'Places of University',
      'queryPath': [
        {
          'data': {
            'ingoingProperties': [],
            'outgoingProperties': [
              1189
            ]
          },
          'type': 'properties'
        },
        {
          'data': {
            'types': [
              81893
            ],
            'classes': [
              68
            ]
          },
          'type': 'classes'
        },
        {
          'data': {
            'ingoingProperties': [
              1182
            ],
            'outgoingProperties': []
          },
          'type': 'properties'
        },
        {
          'data': {
            'types': [],
            'classes': [
              212
            ]
          },
          'type': 'classes'
        },
        {
          'data': {
            'ingoingProperties': [],
            'outgoingProperties': [
              1178
            ]
          },
          'type': 'properties'
        },
        {
          'data': {
            'types': [
              80412
            ],
            'classes': [
              363
            ]
          },
          'type': 'classes'
        }
      ]
    }
  ]
}
