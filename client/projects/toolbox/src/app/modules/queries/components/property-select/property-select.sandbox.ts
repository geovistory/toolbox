import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { sandboxOf } from 'angular-playground';
import { InitStateModule } from 'projects/toolbox/src/app/shared/components/init-state/init-state.module';
import { BehaviorSubject } from 'rxjs';
import { delay, first } from 'rxjs/operators';
import { QueriesModule } from '../../queries.module';
import { PropertyOption, PropertySelectComponent } from './property-select.component';
import { propertyOptionFieldKey } from 'projects/toolbox/src/app/core/redux-queries/services/information-pipes.service';


const options$ = new BehaviorSubject(null)
options$.pipe(first(), delay(3000)).subscribe(() => {
  options$.next([
    {
      label: 'A',
      isOutgoing: true,
      pk: 7, // took place on or within – P8
      propertyFieldKey: propertyOptionFieldKey(7, true)
    }
  ] as PropertyOption[])
})

export default sandboxOf(PropertySelectComponent, {
  imports: [
    QueriesModule,
    InitStateModule,
    MatFormFieldModule,
    FormsModule
  ],
  declareComponent: false
})
  .add('Properties Select | Preselected ', {
    context: {
      pkProject: 24,
      sandboxState: {},
      model: {
        outgoingProperties: [7]
      },
      options$
    },
    template: `
        <gv-init-state [projectFromApi]="pkProject" [sandboxState]="sandboxState">
          <div class="d-flex justify-content-center mt-5">
              <div style="width:430px;height:400px" class="d-flex mr-4">
                  <form #f="ngForm" class="gv-grow-1">
                      <mat-form-field>
                          <gv-property-select placeholder="Select Properties" name="control" [(ngModel)]="model" #control="ngModel"  [options$]="options$" gvPropertiesRequired></gv-property-select>
                          <mat-error *ngIf="control.invalid">You must enter a value</mat-error>
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

                  Invalid: {{control.invalid | json}}

              </div>
          </div>
        </gv-init-state>`

  })

