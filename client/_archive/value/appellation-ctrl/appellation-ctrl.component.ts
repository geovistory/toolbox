import { Component, EventEmitter, forwardRef, OnDestroy, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InfAppellation, InfRole } from 'app/core';
import { QuillDoc } from 'app/modules/quill/quill.models';
import { pick } from 'ramda';
import { Subject } from 'rxjs';

@Component({
  selector: 'gv-appellation-ctrl',
  templateUrl: './appellation-ctrl.component.html',
  styleUrls: ['./appellation-ctrl.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppellationCtrlComponent),
      multi: true
    }
  ],
})
export class AppellationCtrlComponent implements OnDestroy, ControlValueAccessor {

  appellation: InfAppellation;


  quillDoc: QuillDoc;

  @Output() touched = new EventEmitter<void>();

  // parent role, needed to create a proper role value to emit onChange of the form
  role: InfRole;

  destroy$ = new Subject<boolean>();

  onChangeRegistered = false;

  editorConfig = {
    placeholder: 'Start typing...'
  }

  constructor() { }



  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  // this will be called as soon as the form control is registered by parents
  quillDocChange(qd: QuillDoc) {
    this.validateAndEmit(qd);
  }

  private validateAndEmit(quill_doc: QuillDoc) {
    if (this.onChangeRegistered) {
      if (quill_doc &&  quill_doc.ops.filter(op => op.insert.length > 0).length > 1 && this.role) {
        // build the role
        const role = new InfRole(pick(['fk_temporal_entity', 'fk_property'], this.role) as InfRole);
        // build a appe with the appellation_label given by the formControl
        role.appellation = new InfAppellation({
          ...this.appellation,
          quill_doc
        });
        // send the appe the parent form
        this.onChange(role);
      } else {
        this.onChange(null);
      }
    }
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

    this.quillDoc = this.appellation.quill_doc

    this.validateAndEmit(this.quillDoc)
  }


  /**
   * Allows Angular to register a function to call when the model changes.
   * Save the function as a property to call later here.
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;

    this.onChangeRegistered = true;

    this.validateAndEmit(this.quillDoc)

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