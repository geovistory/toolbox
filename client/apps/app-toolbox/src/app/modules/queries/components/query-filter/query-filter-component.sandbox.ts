import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { sandboxOf } from 'angular-playground';
import { InitStateModule } from '../../../../shared/components/init-state/init-state.module';
import { QueriesModule } from '../../queries.module';
import { QueryFilterComponent } from './query-filter.component';
import { of } from 'rxjs';

const filterDefLong = {
  'data': {
    'classes': [
      21
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
            'outgoingProperties': [],
            'ingoingProperties': [
              1192
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
                    'classes': [
                      365
                    ],
                    'types': []
                  },
                  'children': []
                }
              ]
            }
          ]
        },
        {
          'data': {
            'operator': 'IS',
            'outgoingProperties': [],
            'ingoingProperties': [
              88
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
                    'classes': [
                      63
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
                              1191
                            ],
                            'ingoingProperties': []
                          },
                          'children': []
                        }
                      ]
                    }
                  ]
                },
                {
                  'data': {
                    'classes': [
                      63
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
                              88
                            ],
                            'ingoingProperties': []
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
        }
      ]
    }
  ]
}
const filterDefShort = {
  'data': {
    'classes': [
      21
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
            'outgoingProperties': [],
            'ingoingProperties': [
              1192
            ]
          }
        }
      ]
    }
  ]
}
const filterDefShort2 = {
  'data': {
    'classes': [
      21
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
            'operator': 'ENTITY_LABEL_CONTAINS',
            'searchTerm': 'Henrik'
          }
        }
      ]
    }
  ]
}
const filterDefLong2 = {
  'data': {
    'classes': [
      21
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
            'outgoingProperties': [],
            'ingoingProperties': [
              86
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
                    'classes': [
                      61
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
                              84
                            ],
                            'ingoingProperties': []
                          },
                          'children': []
                        },
                        {
                          'data': {
                            'operator': 'IS',
                            'outgoingProperties': [
                              86
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
                                      21
                                    ],
                                    'types': []
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
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}


export default sandboxOf(QueryFilterComponent, {
  declareComponent: false,
  imports: [
    QueriesModule,
    MatFormFieldModule,
    FormsModule,
    InitStateModule
  ]
})
  .add('Query Filter Component | Empty ', {
    context: {
      pkProject: 24,
      f: {},
    },
    template: `
      <gv-init-state [projectFromApi]="pkProject">
        <div class="d-flex justify-content-center mt-5">
            <div style="width:600px;height:400px" class="d-flex mr-4">
                <gv-query-filter #c></gv-query-filter>
            </div>
            <div>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>
      </gv-init-state>`
  })
  .add('Query Filter Component | Preset Short ', {
    context: {
      pkProject: 24,
      f: {},
      initVal$: of(filterDefShort)
    },
    template: `
        <gv-init-state [projectFromApi]="pkProject">
          <div class="d-flex justify-content-center mt-5">
              <div style="width:600px;height:400px" class="d-flex mr-4">
                  <gv-query-filter #c [initVal$]="initVal$"></gv-query-filter>
              </div>
              <div>
                  <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                  <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                  <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                  <p>Form.value </p>
                  <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
              </div>
          </div>
        </gv-init-state>`
  })
  .add('Query Filter Component | Preset Long ', {
    context: {
      pkProject: 24,
      f: {},
      initVal$: of(filterDefLong)
    },
    template: `
        <gv-init-state [projectFromApi]="pkProject">
          <div class="d-flex justify-content-center mt-5">
              <div style="width:600px;height:400px" class="d-flex mr-4">
                  <gv-query-filter #c [initVal$]="initVal$"></gv-query-filter>
              </div>
              <div>
                  <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                  <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                  <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                  <p>Form.value </p>
                  <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
              </div>
          </div>
        </gv-init-state>`
  })
  .add('Query Filter Component | Preset Long2 ', {
    context: {
      pkProject: 24,
      f: {},
      initVal$: of(filterDefLong2)
    },
    template: `
        <gv-init-state [projectFromApi]="pkProject">
          <div class="d-flex justify-content-center mt-5">
              <div style="width:600px;height:400px" class="d-flex mr-4">
                  <gv-query-filter #c [initVal$]="initVal$"></gv-query-filter>
              </div>
              <div>
                  <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                  <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                  <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                  <p>Form.value </p>
                  <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
              </div>
          </div>
        </gv-init-state>`
  })
  .add('Query Filter Component | Preset Short2 ', {
    context: {
      pkProject: 24,
      f: {},
      initVal$: of(filterDefShort2)
    },
    template: `
        <gv-init-state [projectFromApi]="pkProject">
          <div class="d-flex justify-content-center mt-5">
              <div style="width:600px;height:400px" class="d-flex mr-4">
                  <gv-query-filter #c [initVal$]="initVal$"></gv-query-filter>
              </div>
              <div>
                  <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                  <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                  <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                  <p>Form.value </p>
                  <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
              </div>
          </div>
        </gv-init-state>`
  })
