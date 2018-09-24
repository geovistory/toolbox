import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { InfAppellation, InfRole } from 'app/core';
import { Subject } from 'rxjs';
import { AppellationLabel } from '../../shared/appellation-label';

@Component({
  selector: 'gv-appellation-ctrl2',
  templateUrl: './appellation-ctrl2.component.html',
  styleUrls: ['./appellation-ctrl2.component.scss']
})
export class AppellationCtrl2Component implements OnDestroy, ControlValueAccessor {

  appellation: InfAppellation;

  appellationLabel: AppellationLabel = new AppellationLabel();

  @Output() touched = new EventEmitter<void>();

  // parent role, needed to create a proper role value to emit onChange of the form
  role: InfRole;

  destroy$ = new Subject<boolean>();

  constructor() { }


  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  // this will be called as soon as the form control is registered by parents
  subscribeToQuillChanges() {
    // send the appe the parent form
  }

  // converts quill Delta to Appellation Label
  quillDeltaToAppellationLabel() {

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

  }


  /**
   * Allows Angular to register a function to call when the model changes.
   * Save the function as a property to call later here.
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;

    this.subscribeToQuillChanges();

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
