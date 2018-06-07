import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, OnDestroy, Output } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { InfLanguage, InfRole } from 'app/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { pick } from 'ramda';
import { Subscription } from 'rxjs';


@AutoUnsubscribe()
@Component({
  selector: 'gv-language-ctrl',
  templateUrl: './language-ctrl.component.html',
  styleUrls: ['./language-ctrl.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LanguageCtrlComponent),
      multi: true
    }
  ]
})
export class LanguageCtrlComponent implements OnDestroy, ControlValueAccessor {


  language: InfLanguage;

  // the role used as the form control's value
  role: InfRole;

  subs: Subscription[] = [];

  formGroup: FormGroup;
  languageCtrl: FormControl;

  /**
  * Outputs
  */
  @Output() touched: EventEmitter<void> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
  ) {

    // create the form control
    this.languageCtrl = new FormControl(null, [Validators.required]);

    // create the formGroup used to create/edit an appellation
    this.formGroup = this.fb.group({})
    this.formGroup.addControl('language', this.languageCtrl)

  }

  subscribeFormChanges() {
    // subscribe to form changes here
    this.subs.push(this.formGroup.valueChanges.subscribe(val => {
      if (this.formGroup.valid) {

        // build the role
        const role = new InfRole(pick(['fk_temporal_entity', 'fk_property'], this.role));
        role.language = new InfLanguage(this.formGroup.get('language').value);

        // send the role to the parent form
        this.onChange(role)
      }
      else {
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

    const lang = (role && role.language) ? role.language : null;

    this.languageCtrl.setValue(lang, { onlySelf: true, emitEvent: false })


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
