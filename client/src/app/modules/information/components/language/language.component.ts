import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, forwardRef, OnDestroy } from '@angular/core';
import { InfLanguage, EntityEditorService, ActiveProjectService, InfRole } from 'app/core';
import { NG_VALUE_ACCESSOR, FormBuilder, FormGroup, FormControl, Validators, ControlValueAccessor } from '@angular/forms';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { ILanguageState } from './language.model';
import { NgRedux } from '@angular-redux/store';
import { Subscription } from 'rxjs';
import { IRoleState } from '../role/role.model';
import { pick } from 'ramda'

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
export class LanguageComponent implements OnInit, OnDestroy, ControlValueAccessor {


  @Input() parentPath: string[];

  getBasePath = () => [...this.parentPath, 'langState']
  basePath: string[];

  langState: ILanguageState;

  language: InfLanguage;

  peItLangState: string;

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
    public entityEditor: EntityEditorService,
    private activeProjectService: ActiveProjectService,
    private ngRedux: NgRedux<ILanguageState>,
  ) {

    // create the form control
    this.languageCtrl = new FormControl(null, [Validators.required]);

    // create the formGroup used to create/edit an appellation
    this.formGroup = this.fb.group({})
    this.formGroup.addControl('language', this.languageCtrl)

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

  ngOnInit() {

    this.basePath = this.getBasePath();
    this.subs.push(this.ngRedux.select<ILanguageState>(this.basePath).subscribe(d => {
      this.langState = d;
      if (d) {
        this.language = this.langState.language;
        this.peItLangState = this.langState.state;
      }
    }))

    this.subs.push(this.ngRedux.select<IRoleState>(this.parentPath).subscribe(d => {
      if (d) {
        const role = d.role;

        const lang = (role && role.language) ? role.language : null;

        this.languageCtrl.setValue(lang, { onlySelf: true, emitEvent: false })

        if (role) this.role = role;
      }

    }))


  }


  /****************************************
   *  ControlValueAccessor implementation *
   ****************************************/

  /**
   * Allows Angular to update the model.
   * Update the model and changes needed for the view here.
   */
  writeValue(role: InfRole): void {


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
  onChange = (role: InfRole | null) => {
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
