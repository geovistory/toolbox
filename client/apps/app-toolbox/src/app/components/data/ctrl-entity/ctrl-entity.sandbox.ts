import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { sandboxOf } from 'angular-playground';
import { InitStateModule } from '../../../shared/components/init-state/init-state.module';
import { BaseModule } from '../../../modules/base/base.module';
import { CtrlEntityComponent, CtrlEntityModel } from './ctrl-entity.component';

const initVal1: CtrlEntityModel = { pkEntity: 767402 }
const initVal2: CtrlEntityModel = {
  'resource': {
    pk_entity: undefined,
    incoming_statements: [
      {
        fk_subject_info: undefined,
        fk_subject_data: undefined,
        fk_subject_tables_cell: undefined,
        fk_subject_tables_row: undefined,
        // community_favorite_calendar: undefined,
        fk_object_data: undefined,
        fk_object_tables_cell: undefined,
        fk_object_info: undefined,
        fk_object_tables_row: undefined,
        fk_property_of_property: undefined,
        is_standard_in_project_count: undefined,
        is_in_project_count: undefined,
        pk_entity: undefined,
        'fk_property': 1111,
        'subject_resource': {
          'outgoing_statements': [
            {
              fk_subject_info: undefined,
              fk_subject_data: undefined,
              fk_subject_tables_cell: undefined,
              fk_subject_tables_row: undefined,
              // community_favorite_calendar: undefined,
              fk_object_data: undefined,
              fk_object_tables_cell: undefined,
              fk_object_info: undefined,
              fk_object_tables_row: undefined,
              fk_property_of_property: undefined,
              is_standard_in_project_count: undefined,
              is_in_project_count: undefined,
              pk_entity: undefined,
              'fk_property': 1113,
              'object_appellation': {
                pk_entity: undefined,
                string: undefined,

                'fk_class': 40,
                'quill_doc': {
                  'latestId': 17,
                  'ops': [
                    {
                      'attributes': {
                        'charid': '7'
                      },
                      'insert': 'H'
                    },
                    {
                      'attributes': {
                        'charid': '8'
                      },
                      'insert': 'a'
                    },
                    {
                      'attributes': {
                        'charid': '9'
                      },
                      'insert': 'n'
                    },
                    {
                      'attributes': {
                        'charid': '10'
                      },
                      'insert': 's'
                    },
                    {
                      'attributes': {
                        'charid': '11'
                      },
                      'insert': ' '
                    },
                    {
                      'attributes': {
                        'charid': '12'
                      },
                      'insert': 'M'
                    },
                    {
                      'attributes': {
                        'charid': '13'
                      },
                      'insert': 'u'
                    },
                    {
                      'attributes': {
                        'charid': '14'
                      },
                      'insert': 's'
                    },
                    {
                      'attributes': {
                        'charid': '15'
                      },
                      'insert': 't'
                    },
                    {
                      'attributes': {
                        'charid': '16'
                      },
                      'insert': 'e'
                    },
                    {
                      'attributes': {
                        'charid': '17'
                      },
                      'insert': 'r'
                    },
                    {
                      'attributes': {
                        'blockid': '1'
                      },
                      'insert': '\n'
                    }
                  ]
                }
              }
            },
            {

              fk_subject_info: undefined,
              fk_subject_data: undefined,
              fk_subject_tables_cell: undefined,
              fk_subject_tables_row: undefined,
              // community_favorite_calendar: undefined,
              fk_object_data: undefined,
              fk_object_tables_cell: undefined,
              fk_object_info: undefined,
              fk_object_tables_row: undefined,
              fk_property_of_property: undefined,
              is_standard_in_project_count: undefined,
              is_in_project_count: undefined,
              pk_entity: undefined,
              'fk_property': 1112,
              'object_language': {
                'fk_class': 54,
                'pk_language': 'deu',
                'lang_type': 'living',
                'scope': 'individual',
                'iso6392b': 'ger',
                'iso6392t': 'deu',
                'iso6391': 'de ',
                'notes': 'German',
                'pk_entity': 18605
              }
            },
            {
              fk_subject_info: undefined,
              fk_subject_data: undefined,
              fk_subject_tables_cell: undefined,
              fk_subject_tables_row: undefined,
              // community_favorite_calendar: undefined,
              fk_object_data: undefined,
              fk_object_tables_cell: undefined,
              fk_object_tables_row: undefined,
              fk_property_of_property: undefined,
              is_standard_in_project_count: undefined,
              is_in_project_count: undefined,
              pk_entity: undefined,
              'fk_property': 1430,
              'fk_object_info': 741575,
            }
          ],
          'fk_class': 365,
          pk_entity: undefined,

        }

      }
    ],
    'fk_class': 21
  }

}


export default sandboxOf(CtrlEntityComponent, {
  declareComponent: false,
  imports: [
    BaseModule,
    InitStateModule,
    MatFormFieldModule,
    FormsModule
  ]
})
  .add('CtrlEntity | New ', {
    context: {
      model: undefined,
      parentPath: ''
    },
    template: `
        <gv-init-state [projectFromApi]="591" ></gv-init-state>

        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex mr-4">
                <form #f="ngForm" class="gv-grow-1">
                    <mat-form-field class="w-100" appearance="fill">
                        <gv-ctrl-entity [pkClass]="21" placeholder="Add a Person..." name="controlName" [(ngModel)]="model" #m="ngModel" required></gv-ctrl-entity>
                        <mat-error *ngIf="m.invalid">You must enter a value</mat-error>
                        <mat-icon matSuffix svgIcon="pencil"></mat-icon>
                    </mat-form-field>
                </form>
            </div>
            <div>
                <p>Form.valid: {{f.valid | json}}</p>

                <p>Form.touched: {{f.touched | json}}</p>

                <p>Form.dirty: {{f.dirty | json}}</p>

                <p>Form.value </p>
                <pre>
                    {{f.value | json}}
                </pre>

                Invalid: {{m.invalid | json}}

            </div>
        </div>`
  })
  .add('CtrlEntity | Existing pkEntity', {
    context: {
      model: initVal1,
      parentPath: ''
    },
    template: `
        <gv-init-state [projectFromApi]="591" ></gv-init-state>

        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex mr-4">
                <form #f="ngForm" class="gv-grow-1">
                    <mat-form-field class="w-100">
                        <gv-ctrl-entity [pkClass]="21" placeholder="Enter Foo" name="controlName" [(ngModel)]="model" #m="ngModel" required></gv-ctrl-entity>
                        <mat-error *ngIf="m.invalid">You must enter a value</mat-error>
                    </mat-form-field>
                </form>
            </div>
            <div>
                <p>Form.valid: {{f.valid | json}}</p>

                <p>Form.touched: {{f.touched | json}}</p>

                <p>Form.dirty: {{f.dirty | json}}</p>

                <p>Form.value </p>
                <pre>
                    {{f.value | json}}
                </pre>

                Invalid: {{m.invalid | json}}

            </div>
        </div>`
  })
  .add('CtrlEntity | Existing persistent_item', {
    context: {
      model: initVal2,
      parentPath: ''
    },
    template: `
        <gv-init-state [projectFromApi]="591" ></gv-init-state>

        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex mr-4">
                <form #f="ngForm" class="gv-grow-1">
                    <mat-form-field class="w-100">
                        <gv-ctrl-entity [pkClass]="21" placeholder="Enter Foo" name="controlName" [(ngModel)]="model" #m="ngModel" required></gv-ctrl-entity>
                        <mat-error *ngIf="m.invalid">You must enter a value</mat-error>
                    </mat-form-field>
                </form>
            </div>
            <div>
                <p>Form.valid: {{f.valid | json}}</p>

                <p>Form.touched: {{f.touched | json}}</p>

                <p>Form.dirty: {{f.dirty | json}}</p>

                <p>Form.value </p>
                <pre>
                    {{f.value | json}}
                </pre>

                Invalid: {{m.invalid | json}}

            </div>
        </div>`
  })
