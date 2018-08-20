import { Component, OnInit, ChangeDetectionStrategy, forwardRef, OnDestroy, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { InfRole, InfPlace } from 'app/core';
import { pick } from 'ramda'
import { DfhConfig } from '../../shared/dfh-config';

@Component({
  selector: 'gv-place-ctrl',
  templateUrl: './place-ctrl.component.html',
  styleUrls: ['./place-ctrl.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PlaceCtrlComponent),
      multi: true
    }
  ]
})
export class PlaceCtrlComponent implements OnInit, OnDestroy, ControlValueAccessor {

  subs: Subscription[] = [];

  formGroup: FormGroup;

  // the role used as the form control's value
  role: InfRole;

  /**
  * Outputs
  */
  @Output() touched: EventEmitter<void> = new EventEmitter();

  constructor(
    private fb: FormBuilder
  ) {

    this.formGroup = this.fb.group({
      'lat': [null, [Validators.required]],
      'long': [null, [Validators.required]],
    })

  }

  ngOnInit() {
  }




  subscribeFormChanges() {
    // subscribe to form changes here
    this.subs.push(this.formGroup.valueChanges.subscribe(val => {
      if (this.formGroup.valid) {

        // build the role
        const role = new InfRole(pick(['fk_temporal_entity', 'fk_property', 'fk_class'], this.role) as InfRole);

        role.place = {
          lat: val.lat,
          long: val.long,
          fk_class: DfhConfig.CLASS_PK_PLACE
        } as InfPlace

        // send the role to the parent form
        this.onChange(role)
      } else {
        this.onChange(null)
      }
    }))
  }


  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
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

    if (role && role.place && role.place.lat) {
      this.formGroup.get('lat').setValue(role.place.lat)
    }

    if (role && role.place && role.place.long) {
      this.formGroup.get('long').setValue(role.place.long)
    }

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

}
