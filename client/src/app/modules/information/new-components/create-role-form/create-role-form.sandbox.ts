import { sandboxOf } from 'angular-playground';

import { Information2Module } from '../../information.module';
import { CreateRoleFormComponent } from './create-role-form.component';
import { InitStateModule } from '../../../../shared/components/init-state/init-state.module';
import { ListDefinition } from '../properties-tree/properties-tree.models';

// ROLES LEADING TO VALUES
const listDefSpelling: ListDefinition = {
  fkClassField: undefined,
  fkPropertyOfOrigin: 1113,
  isIdentityDefining: true,
  isOutgoing: true,
  label: "Spelling",
  listType: "appellation",
  ontoInfoLabel: "histP11",
  ontoInfoUrl: "http://ontologies.dataforhistory.org/property/1113",
  pkProperty: 1113,
  targetClass: 40,
  sourceClass: 365,
  targetClassLabel: "Appellation",
  targetMaxQuantity: 1,
}

const listDefLanguage: ListDefinition = {
  fkClassField: undefined,
  fkPropertyOfOrigin: 1112,
  isIdentityDefining: true,
  isOutgoing: true,
  label: "Used in Language",
  listType: "language",
  ontoInfoLabel: "histP10",
  ontoInfoUrl: "http://ontologies.dataforhistory.org/property/1112",
  pkProperty: 1112,
  targetClass: 54,
  sourceClass: 365,
  targetClassLabel: "Language",
  targetMaxQuantity: 1,
}

const listDefPlace: ListDefinition = {
  fkClassField: undefined,
  fkPropertyOfOrigin: 148,
  isIdentityDefining: true,
  isOutgoing: true,
  label: "Was present at",
  listType: "place",
  ontoInfoLabel: "P167",
  ontoInfoUrl: "http://ontologies.dataforhistory.org/property/148",
  pkProperty: 148,
  targetClass: 51,
  sourceClass: 84,
  targetClassLabel: "Place",
  targetMaxQuantity: 1,
}

const listDefTextProperty: ListDefinition = {
  fkClassField: 123,
  fkPropertyOfOrigin: undefined,
  isIdentityDefining: true,
  isOutgoing: true,
  label: "Exact Reference",
  listType: "text-property",
  ontoInfoLabel: undefined,
  ontoInfoUrl: undefined,
  pkProperty: undefined,
  targetClass: undefined,
  sourceClass: undefined,
  targetClassLabel: undefined,
  targetMaxQuantity: undefined,
}

const listDefHadParticipants: ListDefinition = {
  fkClassField: undefined,
  fkPropertyOfOrigin: 1359,
  isIdentityDefining: false,
  isOutgoing: false,
  label: "had participants",
  listType: "entity-preview",
  ontoInfoLabel: "P12",
  ontoInfoUrl: "http://ontologies.dataforhistory.org/property/1359",
  pkProperty: 1359,
  sourceClass: 523,
  targetClass: 21,
  targetClassLabel: "Person",
  targetMaxQuantity: -1
}
const listDefDeparturePlace: ListDefinition = {
  fkClassField: undefined,
  fkPropertyOfOrigin: 1335,
  isIdentityDefining: false,
  isOutgoing: true,
  label: "has departure place",
  listType: "entity-preview",
  ontoInfoLabel: "P1",
  ontoInfoUrl: "http://ontologies.dataforhistory.org/property/1335",
  pkProperty: 1335,
  sourceClass: 523,
  targetClass: 363,
  targetClassLabel: "Geographical Place",
  targetMaxQuantity: 1,
}




/// ROLES LEADING TO TE ENs
const listDefAppellationUse: ListDefinition = {
  fkClassField: undefined,
  fkPropertyOfOrigin: 1111,
  isIdentityDefining: true,
  isOutgoing: false,
  label: "Bibliographic References",
  listType: "temporal-entity",
  ontoInfoLabel: "histP9",
  ontoInfoUrl: "http://ontologies.dataforhistory.org/property/1202",
  pkProperty: 1202,
  sourceClass: 219,
  targetClass: 365,
  targetClassLabel: "Naming",
  targetMaxQuantity: -1,
};

const listDefAppellationUseOfTeEn: ListDefinition = {
  fkClassField: undefined,
  fkPropertyOfOrigin: 1111,
  isIdentityDefining: true,
  isOutgoing: false,
  label: "Has appellation",
  listType: "temporal-entity",
  ontoInfoLabel: "histP9",
  ontoInfoUrl: "http://ontologies.dataforhistory.org/property/2003500523",
  pkProperty: 2003500523,
  sourceClass: 523,
  targetClass: 365,
  targetClassLabel: "Naming",
  targetMaxQuantity: -1,
};



const listDefBirth: ListDefinition = {
  fkClassField: undefined,
  fkPropertyOfOrigin: 86,
  isIdentityDefining: true,
  isOutgoing: false,
  label: "Has Birth",
  listType: "temporal-entity",
  ontoInfoLabel: "E67",
  ontoInfoUrl: "http://ontologies.dataforhistory.org/property/86",
  pkProperty: 86,
  targetClass: 61,
  sourceClass: 21,
  targetClassLabel: "Birth",
  targetMaxQuantity: -1,
};
const listDefPresence: ListDefinition = {
  fkClassField: undefined,
  fkPropertyOfOrigin: 147,
  isIdentityDefining: true,
  isOutgoing: false,
  label: "Was present at",
  listType: "temporal-entity",
  ontoInfoLabel: "E93",
  ontoInfoUrl: "http://ontologies.dataforhistory.org/property/1181",
  pkProperty: 1181,
  sourceClass: 363,
  targetClass: 84,
  targetClassLabel: "Presence",
  targetMaxQuantity: -1,
};


export default sandboxOf(CreateRoleFormComponent, {
  declareComponent: false,
  imports: [
    InitStateModule,
    Information2Module
  ]
})
  .add('Create Role Form | Spelling ', {
    context: {
      pkEntity: 82537,
      listDefinition: listDefSpelling,
      parentPath: ''
    },
    template: `
        <gv-init-state [projectFromApi]="24" ></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex">
                <form #f="ngForm">
                  <gv-create-role-form [listDefinition]="listDefinition" [pkEntity]="pkEntity" #c></gv-create-role-form>
                </form>
            </div>
            <div>
                <p>Form.valid: {{f.valid | json}}</p>

                <p>Form.touched: {{f.touched | json}}</p>

                <p>Form.dirty: {{f.dirty | json}}</p>

                <p>Composed Value </p>
                <pre>
                    {{c.valueChanges$ | async | json}}
                </pre>
            </div>
        </div>`
  })
  .add('Create Role Form | Language ', {
    context: {
      pkEntity: 82537,
      listDefinition: listDefLanguage,
      parentPath: ''
    },
    template: `
        <gv-init-state [projectFromApi]="24" ></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex">
                <form #f="ngForm">
                  <gv-create-role-form [listDefinition]="listDefinition" [pkEntity]="pkEntity" #c></gv-create-role-form>
                </form>
            </div>
            <div>
                <p>Form.valid: {{f.valid | json}}</p>

                <p>Form.touched: {{f.touched | json}}</p>

                <p>Form.dirty: {{f.dirty | json}}</p>

                <p>Composed Value </p>
                <pre>
                    {{c.valueChanges$ | async | json}}
                </pre>
            </div>
        </div>`
  })
  .add('Create Role Form | Place ', {
    context: {
      pkEntity: 82537,
      listDefinition: listDefPlace,
      parentPath: ''
    },
    template: `
        <gv-init-state [projectFromApi]="24" ></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex">
                <form #f="ngForm">
                  <gv-create-role-form [listDefinition]="listDefinition" [pkEntity]="pkEntity" #c></gv-create-role-form>
                </form>
            </div>
            <div>
                <p>Form.valid: {{f.valid | json}}</p>

                <p>Form.touched: {{f.touched | json}}</p>

                <p>Form.dirty: {{f.dirty | json}}</p>

                <p>Composed Value </p>
                <pre>
                    {{c.valueChanges$ | async | json}}
                </pre>
            </div>
        </div>`
  })
  .add('Create Role Form | Had Departure Place', {
    context: {
      pkEntity: 150724,
      listDefinition: listDefDeparturePlace,
      parentPath: ''
    },
    template: `
        <gv-init-state [projectFromApi]="24" ></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex">
                <form #f="ngForm">
                  <gv-create-role-form [listDefinition]="listDefinition" [pkEntity]="pkEntity" #c></gv-create-role-form>
                </form>
            </div>
            <div>
                <p>Form.valid: {{f.valid | json}}</p>

                <p>Form.touched: {{f.touched | json}}</p>

                <p>Form.dirty: {{f.dirty | json}}</p>

                <p>Composed Value </p>
                <pre>
                    {{c.valueChanges$ | async | json}}
                </pre>
            </div>
        </div>`
  })
  .add('Create Role Form | Had Participants (Domain PeIt & Range TeEn !!)', {
    context: {
      pkEntity: 150724,
      listDefinition: listDefHadParticipants,
      parentPath: ''
    },
    template: `
        <gv-init-state [projectFromApi]="24" ></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex">
                <form #f="ngForm">
                  <gv-create-role-form [listDefinition]="listDefinition" [pkEntity]="pkEntity" #c></gv-create-role-form>
                </form>
            </div>
            <div>
                <p>Form.valid: {{f.valid | json}}</p>

                <p>Form.touched: {{f.touched | json}}</p>

                <p>Form.dirty: {{f.dirty | json}}</p>

                <p>Composed Value </p>
                <pre>
                    {{c.valueChanges$ | async | json}}
                </pre>
            </div>
        </div>`
  })
  .add('Create Role Form | Appellation use for language ', {
    context: {
      pkEntity: 299923,
      listDefinition: listDefAppellationUse,
      parentPath: ''
    },
    template: `
        <gv-init-state [projectFromApi]="24" ></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex">
                  <gv-create-role-form [listDefinition]="listDefinition" [pkEntity]="pkEntity" #c></gv-create-role-form>
            </div>
            <div>
              <p>Form.valid: {{c?.formGroup?.valid | json}}</p>

                <p>Form.touched: {{c?.formGroup?.touched | json}}</p>

                <p>Form.dirty: {{c?.formGroup?.dirty | json}}</p>

                <p>Composed Value </p>
                <pre>
                    {{c.valueChanges$ | async | json}}
                </pre>
            </div>
        </div>`
  })
  .add('Create Role Form | Appellation use for language of Ship Voyage ', {
    context: {
      pkEntity: 150723,
      listDefinition: listDefAppellationUseOfTeEn,
      parentPath: ''
    },
    template: `
        <gv-init-state [projectFromApi]="24" ></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex">
                  <gv-create-role-form [listDefinition]="listDefinition" [pkEntity]="pkEntity" #c></gv-create-role-form>
            </div>
            <div>
              <p>Form.valid: {{c?.formGroup?.valid | json}}</p>

                <p>Form.touched: {{c?.formGroup?.touched | json}}</p>

                <p>Form.dirty: {{c?.formGroup?.dirty | json}}</p>

                <p>Composed Value </p>
                <pre>
                    {{c.valueChanges$ | async | json}}
                </pre>
            </div>
        </div>`
  })
  .add('Create Role Form | Birth ', {
    context: {
      pkEntity: 82129,
      listDefinition: listDefBirth,
      parentPath: ''
    },
    template: `
        <gv-init-state [projectFromApi]="24" ></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex">
                  <gv-create-role-form [listDefinition]="listDefinition" [pkEntity]="pkEntity" #c></gv-create-role-form>
            </div>
            <div>
              <p>Form.valid: {{c?.formGroup?.valid | json}}</p>

                <p>Form.touched: {{c?.formGroup?.touched | json}}</p>

                <p>Form.dirty: {{c?.formGroup?.dirty | json}}</p>

                <p>Composed Value </p>
                <pre>
                    {{c.valueChanges$ | async | json}}
                </pre>
            </div>
        </div>`
  })

  .add('Create Role Form | Presence ', {
    context: {
      pkEntity: 82129,
      listDefinition: listDefPresence,
      parentPath: ''
    },
    template: `
        <gv-init-state [projectFromApi]="24" ></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex">
                  <gv-create-role-form [listDefinition]="listDefinition" [pkEntity]="pkEntity" #c></gv-create-role-form>
            </div>
            <div>
              <p>Form.valid: {{c?.formGroup?.valid | json}}</p>

                <p>Form.touched: {{c?.formGroup?.touched | json}}</p>

                <p>Form.dirty: {{c?.formGroup?.dirty | json}}</p>

                <p>Composed Value </p>
                <pre>
                    {{c.valueChanges$ | async | json}}
                </pre>
            </div>
        </div>`
  })
  .add('Create Role Form | TextProperty ', {
    context: {
      pkEntity: 82129,
      listDefinition: listDefTextProperty,
      parentPath: ''
    },
    template: `
        <gv-init-state [projectFromApi]="24" ></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex">
                  <gv-create-role-form [listDefinition]="listDefinition" [pkEntity]="pkEntity" #c></gv-create-role-form>
            </div>
            <div>
              <p>Form.valid: {{c?.formGroup?.valid | json}}</p>

                <p>Form.touched: {{c?.formGroup?.touched | json}}</p>

                <p>Form.dirty: {{c?.formGroup?.dirty | json}}</p>

                <p>Composed Value </p>
                <pre>
                    {{c.valueChanges$ | async | json}}
                </pre>
            </div>
        </div>`
  })
