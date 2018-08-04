import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, OnDestroy, Output } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { InfAppellation, InfAppellationApi, InfRole } from 'app/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { pick } from 'ramda';
import { Subscription } from 'rxjs';

import { AppellationLabel } from '../../shared/appellation-label';

@AutoUnsubscribe()
@Component({
  selector: 'gv-appellation-ctrl',
  templateUrl: './appellation-ctrl.component.html',
  styleUrls: ['./appellation-ctrl.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppellationCtrlComponent),
      multi: true
    }
  ]
})
export class AppellationCtrlComponent implements OnDestroy, ControlValueAccessor {


  appellation: InfAppellation;


  /**
  * Outputs
  */
  @Output() cancelEdit: EventEmitter<void> = new EventEmitter();

  @Output() touched: EventEmitter<void> = new EventEmitter();


  /**
  * Properties
  */

  appellationLabel: AppellationLabel = new AppellationLabel();

  appellationLabelInEdit: AppellationLabel;

  subs: Subscription[] = [];

  formGroup: FormGroup;

  appeCtrl: FormControl;

  // parent role, needed to create a proper role value to emit onChange of the form
  role: InfRole;

  constructor(
    private fb: FormBuilder,
    private appellationApi: InfAppellationApi,
    private slimLoadingBarService: SlimLoadingBarService,
  ) {
    // create the formGroup used to create/edit an appellation
    this.formGroup = this.fb.group({})

    this.initFormCtrls();

  }

  initFormCtrls() {
    // create the form control
    this.appeCtrl = new FormControl(this.appellationLabel, [Validators.required]);

    this.formGroup.addControl('appellationLabel', this.appeCtrl)
  }

  subscribeFormChanges() {

    // subscribe to form changes here
    this.subs.push(this.formGroup.valueChanges.subscribe(val => {
      if (this.formGroup.valid && this.role) {

        // build the role
        const role = new InfRole(pick(['fk_temporal_entity', 'fk_property'], this.role));

        // build a appe with the appellation_label given by the formControl 
        role.appellation = new InfAppellation({
          ...this.appellation
        });

        if (this.formGroup.get('appellationLabel')) {

          role.appellation.appellation_label = this.formGroup.get('appellationLabel').value

        }

        // send the appe the parent form
        this.onChange(role)
      }
      else {
        this.onChange(null)
      }
    }))

  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe())
  }


  onCancel() {
    this.cancelEdit.emit()
  }



  /****************************************
   *  ControlValueAccessor implementation *
   ****************************************/

  /**
   * Allows Angular to update the model.
   * Update the model and changes needed for the view here.
   */
  writeValue(role: InfRole): void {

    this.role = role ? role : new InfRole();

    this.appellation = (role && role.appellation) ? role.appellation : new InfAppellation();

    this.appellationLabel = new AppellationLabel(this.appellation.appellation_label);

    this.appeCtrl.setValue(this.appellationLabel)
  }


  /**
   * Allows Angular to register a function to call when the model changes.
   * Save the function as a property to call later here.
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;

    this.subscribeFormChanges();

  }

  /**
   * gets replaced by angular on registerOnChange
   * This function helps to type the onChange function for the use in this class.
   */
  onChange = (role: InfRole | null) => {
    console.error('called before registerOnChange')
  };

  /**
   * Allows Angular to register a function to call when the input has been touched.
   * Save the function as a property to call later here.
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * gets replaced by angular on registerOnTouched
   * Call this function when the form has been touched.
   */
  onTouched = () => {
  };

  markAsTouched() {
    this.onTouched()
    this.touched.emit()
  }

  /**
  * Loading Bar Logic
  */

  startLoading() {
    this.slimLoadingBarService.progress = 20;
    this.slimLoadingBarService.start(() => {
    });
  }

  stopLoading() {
    this.slimLoadingBarService.stop();
  }

  completeLoading() {
    this.slimLoadingBarService.complete();
  }

  resetLoading() {
    this.slimLoadingBarService.reset();
  }

}
