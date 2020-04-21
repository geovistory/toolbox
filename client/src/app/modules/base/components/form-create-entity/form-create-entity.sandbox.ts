import { FormsModule } from '@angular/forms';
import { sandboxOf } from 'angular-playground';
import { InitStateModule } from '../../../../shared/components/init-state/init-state.module';
import { BaseModule } from '../../base.module';
import { FormCreateEntityComponent } from './form-create-entity.component';
import { mockNaming } from './naming.mock';
import { of } from 'rxjs';
import { mockGeoreference } from './georeference.mock';
import { mockPerson } from './person.mock';
import { mockBirth } from './birth.mock';

const pkProject = 591;
export default sandboxOf(FormCreateEntityComponent, {
  declareComponent: false,
  imports: [
    BaseModule,
    FormsModule,
    InitStateModule
  ]
})
  .add('FormCreateEntityComponent | New Georeference', {
    context: { pkProject },
    template: `
        <gv-init-state [projectFromApi]="pkProject" ></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:480px;height:500px" class="d-flex mr-5">
                <gv-form-create-entity [pkClass]="84" #c class="w-100" (searchString)="s=$event"></gv-form-create-entity>
            </div>
            <div>
                <p>searchString: {{s}}</p>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })
  .add('FormCreateEntityComponent | Edit Georeference', {
    context: {
      pkProject,
      initVal$: of(mockGeoreference)
    },
    template: `
        <gv-init-state [projectFromApi]="pkProject" ></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:480px;height:500px" class="d-flex mr-5">
                <gv-form-create-entity [pkClass]="84" [initVal$]="initVal$" #c class="w-100" (searchString)="s=$event"></gv-form-create-entity>
            </div>
            <div>
                <p>searchString: {{s}}</p>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })
  .add('FormCreateEntityComponent | New Appe use', {
    context: {
      pkProject,
    },
    template: `
        <gv-init-state [projectFromApi]="pkProject" ></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:480px;height:500px" class="d-flex mr-5">
                <gv-form-create-entity [pkClass]="365" #c class="w-100" (searchString)="s=$event"></gv-form-create-entity>
            </div>
            <div>
                <p>searchString: {{s}}</p>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })
  .add('FormCreateEntityComponent | Edit Appe use', {
    context: {
      pkProject,
      initVal$: of(mockNaming)
    },
    template: `
        <gv-init-state [projectFromApi]="pkProject" ></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:480px;height:500px" class="d-flex mr-5">
                <gv-form-create-entity [pkClass]="365" [initVal$]="initVal$" #c class="w-100" (searchString)="s=$event"></gv-form-create-entity>
            </div>
            <div>
                <p>searchString: {{s}}</p>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })
  .add('FormCreateEntityComponent | New Birth', {
    context: { pkProject },
    template: `
        <gv-init-state [projectFromApi]="pkProject" ></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:480px;height:500px" class="d-flex mr-5">
                <gv-form-create-entity [pkClass]="61" #c class="w-100" (searchString)="s=$event"></gv-form-create-entity>
            </div>
            <div>
                <p>searchString: {{s}}</p>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })
  .add('FormCreateEntityComponent | Edit Birth', {
    context: {
      pkProject,
      initVal$: of(mockBirth)
    },
    template: `
        <gv-init-state [projectFromApi]="pkProject" ></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:480px;height:500px" class="d-flex mr-5">
                <gv-form-create-entity [pkClass]="61" [initVal$]="initVal$" #c class="w-100" (searchString)="s=$event"></gv-form-create-entity>
            </div>
            <div>
                <p>searchString: {{s}}</p>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })
  .add('FormCreateEntityComponent | New Ship Voyage', {
    context: { pkProject },
    template: `
        <gv-init-state [projectFromApi]="pkProject" ></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:480px;height:500px" class="d-flex mr-5">
                <gv-form-create-entity [pkClass]="523" #c class="w-100" (searchString)="s=$event"></gv-form-create-entity>
            </div>
            <div>
                <p>searchString: {{s}}</p>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })
  .add('FormCreateEntityComponent | New Person', {
    context: { pkProject },
    template: `
        <gv-init-state [projectFromApi]="pkProject" ></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:480px;height:500px" class="d-flex mr-5">
                <gv-form-create-entity [pkClass]="21" #c class="w-100" (searchString)="s=$event"></gv-form-create-entity>
            </div>
            <div>
                <p>searchString: {{s}}</p>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })
  .add('FormCreateEntityComponent | Edit Person', {
    context: {
      pkProject,
      initVal$: of(mockPerson)
    },
    template: `
        <gv-init-state [projectFromApi]="pkProject" ></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:480px;height:500px" class="d-flex mr-5">
                <gv-form-create-entity [pkClass]="21" [initVal$]="initVal$"  #c class="w-100" (searchString)="s=$event"></gv-form-create-entity>
            </div>
            <div>
                <p>searchString: {{s}}</p>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })
  .add('FormCreateEntityComponent | New Geographical Place', {
    context: { pkProject },
    template: `
        <gv-init-state [projectFromApi]="pkProject" ></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:480px;height:500px" class="d-flex mr-5">
                <gv-form-create-entity [pkClass]="363" #c class="w-100" (searchString)="s=$event"></gv-form-create-entity>
            </div>
            <div>
                <p>searchString: {{s}}</p>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })
  .add('FormCreateEntityComponent | New Manifestation Singleton', {
    context: { pkProject },
    template: `
        <gv-init-state [projectFromApi]="pkProject" ></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:480px;height:500px" class="d-flex mr-5">
                <gv-form-create-entity [pkClass]="220" #c class="w-100" (searchString)="s=$event"></gv-form-create-entity>
            </div>
            <div>
                <p>searchString: {{s}}</p>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })
  .add('FormCreateEntityComponent | Expression Portion', {
    context: { pkProject },
    template: `
        <gv-init-state [projectFromApi]="pkProject" ></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:480px;height:500px" class="d-flex mr-5">
                <gv-form-create-entity [pkClass]="503" #c class="w-100" (searchString)="s=$event"></gv-form-create-entity>
            </div>
            <div>
                <p>searchString: {{s}}</p>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })
  .add('FormCreateEntityComponent | Union', {
    context: { pkProject },
    template: `
        <gv-init-state [projectFromApi]="pkProject" ></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:480px;height:500px" class="d-flex mr-5">
                <gv-form-create-entity [pkClass]="633" #c class="w-100" (searchString)="s=$event"></gv-form-create-entity>
            </div>
            <div>
                <p>searchString: {{s}}</p>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })

  .add('FormCreateEntityComponent | Was present at -> place', {
    context: {
      pkProject,
      listDefinition: {
        fkClassField: undefined,
        identityDefiningForSource: true,
        identityDefiningForTarget: false,
        targetMinQuantity: undefined,
        sourceMinQuantity: undefined,
        sourceMaxQuantity: undefined,
        sourceClassLabel: undefined,
        isOutgoing: true,
        label: 'Was present at',
        listType: 'place',
        ontoInfoLabel: 'P167',
        ontoInfoUrl: 'http://ontologies.dataforhistory.org/property/148',
        property: { pkProperty: 148 },
        targetClass: 51,
        sourceClass: 84,
        targetClassLabel: 'Place',
        targetMaxQuantity: 1,
      }
    },
    template: `
        <gv-init-state [projectFromApi]="pkProject" ></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:480px;height:500px" class="d-flex mr-5">
                <gv-form-create-entity [pkSourceEntity]="456" [listDefinition]="listDefinition" #c class="w-100" (searchString)="s=$event"></gv-form-create-entity>
            </div>
            <div>
                <p>searchString: {{s}}</p>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })



  .add('FormCreateEntityComponent | has spelling --> spelling', {
    context: {
      pkProject,
      listDefinition: {
        fkClassField: undefined,
        identityDefiningForSource: true,
        identityDefiningForTarget: false,
        targetMinQuantity: undefined,
        sourceMinQuantity: undefined,
        sourceMaxQuantity: undefined,
        sourceClassLabel: undefined,
        isOutgoing: true,
        label: 'Spelling',
        listType: 'appellation',
        ontoInfoLabel: 'histP11',
        ontoInfoUrl: 'http://ontologies.dataforhistory.org/property/1113',
        property: { pkProperty: 1113 },
        targetClass: 40,
        sourceClass: 365,
        targetClassLabel: 'Appellation',
        targetMaxQuantity: 1,
      }
    },
    template: `
        <gv-init-state [projectFromApi]="pkProject" ></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:480px;height:500px" class="d-flex mr-5">
                <gv-form-create-entity [pkSourceEntity]="456" [listDefinition]="listDefinition" #c class="w-100" (searchString)="s=$event"></gv-form-create-entity>
            </div>
            <div>
                <p>searchString: {{s}}</p>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })
  .add('FormCreateEntityComponent | Used in Language --> Language', {
    context: {
      pkProject,
      listDefinition: {
        fkClassField: undefined,
        identityDefiningForSource: true,
        identityDefiningForTarget: false,
        targetMinQuantity: undefined,
        sourceMinQuantity: undefined,
        sourceMaxQuantity: undefined,
        sourceClassLabel: undefined,
        isOutgoing: true,
        label: 'Used in Language',
        listType: 'language',
        ontoInfoLabel: 'histP10',
        ontoInfoUrl: 'http://ontologies.dataforhistory.org/property/1112',
        property: { pkProperty: 1112 },
        targetClass: 54,
        sourceClass: 365,
        targetClassLabel: 'Language',
        targetMaxQuantity: 1,
      }
    },
    template: `
        <gv-init-state [projectFromApi]="pkProject" ></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:480px;height:500px" class="d-flex mr-5">
                <gv-form-create-entity [pkSourceEntity]="456" [listDefinition]="listDefinition" #c class="w-100" (searchString)="s=$event"></gv-form-create-entity>
            </div>
            <div>
                <p>searchString: {{s}}</p>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })
  .add('FormCreateEntityComponent | Exact Reference --> text-property', {
    context: {
      pkProject,
      listDefinition: {
        identityDefiningForSource: true,
        identityDefiningForTarget: false,
        targetMinQuantity: undefined,
        sourceMinQuantity: undefined,
        sourceMaxQuantity: undefined,
        sourceClassLabel: undefined,
        fkClassField: 123,
        isOutgoing: true,
        label: 'Exact Reference',
        listType: 'text-property',
        ontoInfoLabel: undefined,
        ontoInfoUrl: undefined,
        property: { pkProperty: undefined },
        targetClass: undefined,
        sourceClass: undefined,
        targetClassLabel: undefined,
        targetMaxQuantity: undefined,
      }
    },
    template: `
        <gv-init-state [projectFromApi]="pkProject" ></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:480px;height:500px" class="d-flex mr-5">
                <gv-form-create-entity [pkSourceEntity]="456"  [listDefinition]="listDefinition" #c class="w-100" (searchString)="s=$event"></gv-form-create-entity>
            </div>
            <div>
                <p>searchString: {{s}}</p>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })
  .add('FormCreateEntityComponent | has departure place -> Geographical Place', {
    context: {
      pkProject,
      listDefinition: {
        fkClassField: undefined,
        identityDefiningForSource: true,
        identityDefiningForTarget: false,
        targetMinQuantity: undefined,
        sourceMinQuantity: undefined,
        sourceMaxQuantity: undefined,
        sourceClassLabel: undefined,
        isOutgoing: true,
        label: 'has departure place',
        listType: 'entity-preview',
        ontoInfoLabel: 'P1',
        ontoInfoUrl: 'http://ontologies.dataforhistory.org/property/1335',
        property: { pkProperty: 1335 },
        sourceClass: 523,
        targetClass: 363,
        targetClassLabel: 'Geographical Place',
        targetMaxQuantity: 1,
      }
    },
    template: `
        <gv-init-state [projectFromApi]="pkProject" ></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:480px;height:500px" class="d-flex mr-5">
                <gv-form-create-entity [pkSourceEntity]="456"  [listDefinition]="listDefinition" #c class="w-100" (searchString)="s=$event"></gv-form-create-entity>
            </div>
            <div>
                <p>searchString: {{s}}</p>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })
