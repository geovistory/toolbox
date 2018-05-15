import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { InfLanguage, EntityEditorService, ActiveProjectService } from 'app/core';
import { NG_VALUE_ACCESSOR, FormBuilder, FormGroup, FormControl, Validators, ControlValueAccessor } from '@angular/forms';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { ILanguageState } from './language.model';
import { NgRedux } from '@angular-redux/store';

@AutoUnsubscribe()
@Component({
  selector: 'gv-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LanguageComponent),
      multi: true
    }
  ]
})
export class LanguageComponent implements OnInit, ControlValueAccessor  {


  @Input() parentPath: string[];

  getBasePath = () => [...this.parentPath, 'langState']
  basePath: string[];

  langState: ILanguageState;

  language: InfLanguage;

  peItLangState: string;

  /**
  * Outputs
  */
  @Output() touched: EventEmitter<void> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    public entityEditor: EntityEditorService,
    private activeProjectService: ActiveProjectService,
    private ngRedux: NgRedux<ILanguageState>,
  ) {
     // create the formGroup used to create/edit an appellation
     this.formGroup = this.fb.group({})

     // subscribe to form changes here
     this.formGroup.valueChanges.subscribe(val => {
       if (this.formGroup.valid) {
 
         // send the language to the parent form
         this.onChange(this.formGroup.get('language').value)
       }
       else {
         this.onChange(null)
       }
     })
 
  }

  ngOnInit() {

    this.basePath = this.getBasePath();
    this.ngRedux.select<ILanguageState>(this.basePath).subscribe(d => {
      this.langState = d;
      if (d) {
        this.language = this.langState.language;
        this.peItLangState = this.langState.state;

        this.formGroup.addControl('language', new FormControl(
          this.langState.language,
          [
            Validators.required
          ]
        ))    

      }
    })


  }


  languageChange(language: InfLanguage) {

    if (language && language.pk_entity) {
      this.onChange(new InfLanguage(language))
    }
    else {
      this.onChange(null);
    }
  }


  /****************************************
   *  ControlValueAccessor implementation *
   ****************************************/
  formGroup: FormGroup;

  /**
   * Allows Angular to update the model.
   * Update the model and changes needed for the view here.
   */
  writeValue(language: InfLanguage): void {


  }


  /**
   * Allows Angular to register a function to call when the model changes.
   * Save the function as a property to call later here.
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * gets replaced by angular on registerOnChange
   * This function helps to type the onChange function for the use in this class.
   */
  onChange = (appe: InfLanguage | null) => {
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

  markAsTouched(){
    this.onTouched()
    this.touched.emit()
  }
}
