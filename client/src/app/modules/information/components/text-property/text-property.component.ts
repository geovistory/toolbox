import { Component, EventEmitter, forwardRef, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { InfTextProperty } from '../../../../core/sdk/models/InfTextProperty';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from 'app/core';
import { QuillDoc } from '../../../quill/quill.models';

@Component({
  selector: 'gv-text-property',
  templateUrl: './text-property.component.html',
  styleUrls: ['./text-property.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextPropertyComponent),
      multi: true
    }
  ],
})
export class TextPropertyComponent implements OnInit, ControlValueAccessor {

  // Form
  formGroup: FormGroup;

  // since language typeahead is a form control we connect it via form ctrl
  langCtrl = new FormControl(null, [Validators.required])

  // since quill-edit is not a form control, we connect it via input and output
  quillDoc: QuillDoc;

  // Emits when form is touched
  @Output() touched = new EventEmitter<void>();

  // Set to true as soon as quill edit is touched
  quillTouched = false;

  // Reflects if quillDoc is valid
  quillValid = false;

  // used to store values that have no crtl, like fk_system_type
  textProperty: InfTextProperty;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    fb: FormBuilder
  ) {
    this.formGroup = fb.group({ langCtrl: this.langCtrl })
  }

  ngOnInit() {
  }

  // triggered when form changes
  subscribeToFormChanges() {
    this.formGroup.valueChanges.subscribe(vals => {
      this.validateAndEmit()
    });
  };

  // triggered when quilldock changes
  quillDocChange(q: QuillDoc) {
    this.quillDoc = q;
    this.validateAndEmit()
  }

  // triggered on quill edit blur
  onQuillBlur() {
    this.markAsTouched();
    this.quillTouched = true;
  }

  // validates and emits onChange
  validateAndEmit() {

    // If quilldoc is not empty
    this.quillValid = (((this.quillDoc || {} as any).contents || {}).ops || {}).length ? true : false;

    // If quillDoc and language are valid
    if (this.quillValid && this.langCtrl.valid) {
      const textProperty = new InfTextProperty({
        ...this.textProperty,
        fk_language: this.langCtrl.value.pk_entity,
        language: this.langCtrl.value,
        quill_doc: this.quillDoc
      })
      this.onChange(textProperty)
    } else {
      this.onChange(null)
    }
  }

  tryToFindDefaultLang() {
    const s = this.ngRedux.getState();
    return !s ? null :
      !s.activeProject ? null :
        !s.activeProject.default_language ? null :
          !s.activeProject.default_language.inf_language ? null :
            s.activeProject.default_language.inf_language
  }

  /****************************************
   *  ControlValueAccessor implementation *
   ****************************************/

  /**
   * Allows Angular to update the model.
   * Update the model and changes needed for the view here.
   *
   */
  writeValue(textProperty: InfTextProperty): void {
    this.textProperty = textProperty;
    if (textProperty) {
      if (textProperty.language) {
        this.langCtrl.setValue(textProperty.language);
      }
      if (textProperty.quill_doc) {
        this.quillDoc = textProperty.quill_doc
      }
      this.validateAndEmit();
    }

    if (!textProperty || !textProperty.language) {
      this.langCtrl.setValue(this.tryToFindDefaultLang());

    }

  }


  /**
   * Allows Angular to register a function to call when the model changes.
   * Save the function as a property to call later here.
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;

    this.subscribeToFormChanges();

  }

  /**
   * gets replaced by angular on registerOnChange
   * This function helps to type the onChange function for the use in this class.
   */
  onChange = (roles: InfTextProperty | null) => {
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
