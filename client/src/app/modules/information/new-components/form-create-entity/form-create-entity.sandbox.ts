import { FormsModule } from '@angular/forms';
import { sandboxOf } from 'angular-playground';
import { InitStateModule } from '../../../../shared/components/init-state/init-state.module';
import { Information2Module } from '../../information.module';
import { FormCreateEntityComponent } from './form-create-entity.component';

export default sandboxOf(FormCreateEntityComponent, {
  declareComponent: false,
  imports: [
    Information2Module,
    FormsModule,
    InitStateModule
  ]
})
  .add('FormCreateEntityComponent | New Georeference', {
    context: {},
    template: `
        <gv-init-state [projectFromApi]="24" ></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:350px;height:400px" class="d-flex mr-5">
                <gv-form-create-entity [pkClass]="84" #c class="w-100"></gv-form-create-entity>
            </div>
            <div>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })
  .add('FormCreateEntityComponent | New Appe use', {
    context: {},
    template: `
        <gv-init-state [projectFromApi]="24" ></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:350px;height:400px" class="d-flex mr-5">
                <gv-form-create-entity [pkClass]="365" #c class="w-100"></gv-form-create-entity>
            </div>
            <div>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })
  .add('FormCreateEntityComponent | New Birth', {
    context: {},
    template: `
        <gv-init-state [projectFromApi]="24" ></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:350px;height:400px" class="d-flex mr-5">
                <gv-form-create-entity [pkClass]="61" #c class="w-100"></gv-form-create-entity>
            </div>
            <div>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })
  .add('FormCreateEntityComponent | New Ship Voyage', {
    context: {},
    template: `
        <gv-init-state [projectFromApi]="24" ></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:350px;height:400px" class="d-flex mr-5">
                <gv-form-create-entity [pkClass]="523" #c class="w-100"></gv-form-create-entity>
            </div>
            <div>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })
  .add('FormCreateEntityComponent | New Person', {
    context: {},
    template: `
        <gv-init-state [projectFromApi]="24" ></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:350px;height:400px" class="d-flex mr-5">
                <gv-form-create-entity [pkClass]="21" #c class="w-100"></gv-form-create-entity>
            </div>
            <div>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })
  .add('FormCreateEntityComponent | New Manifestation Singleton', {
    context: {},
    template: `
        <gv-init-state [projectFromApi]="24" ></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:350px;height:400px" class="d-flex mr-5">
                <gv-form-create-entity [pkClass]="220" #c class="w-100"></gv-form-create-entity>
            </div>
            <div>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })
