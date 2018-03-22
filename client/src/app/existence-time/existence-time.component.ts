import { Input, Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';
import { DatePipe } from '@angular/common';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { InfEntityProjectRelApi } from '../shared/sdk/services/custom/InfEntityProjectRel';
import { InfRoleApi } from '../shared/sdk/services/custom/InfRole';
import { ActiveProjectService } from '../shared/services/active-project.service';
import { RoleService } from '../shared/services/role.service';
import { PropertyService } from '../shared/services/property.service';
import { UtilitiesService } from '../shared/services/utilities.service';
import { EntityEditorService } from '../shared/services/entity-editor.service';

import { PropertyComponent } from '../property/property.component';
import { TimePrimitive } from '../shared/classes/date-time/time-primitive';
import { ValidationService } from '../shared/services/validation.service';
import { Fieldset } from './fieldset/fieldset';
import { ExistenceTime } from './existence-time';
import { Field , FieldState } from './field/field';



interface Fieldsets {
  begin: Fieldset;
  end: Fieldset;
  inner: Fieldset;
  outer: Fieldset;
}

// interface innerFields {
//   inner:Field;
//   leftInner:Field;
//   rightInner:Field;
// }

@Component({
  selector: 'gv-existence-time',
  templateUrl: './existence-time.component.html',
  styleUrls: ['./existence-time.component.scss'],
  providers: [DatePipe],
  animations: [
    trigger('slideInOut', [
      state('expanded', style({
        height: '*',
      })),
      state('collapsed', style({
        height: '0px',
        overflow: 'hidden'
      })),
      transition('expanded => collapsed', animate('400ms ease-in-out', keyframes([
        style({
          height: '*',
          overflow: 'hidden',
          offset: 0
        }),
        style({
          height: '0px',
          display: 'hidden',
          offset: 1
        })
      ]))),
      transition('collapsed => expanded', animate('400ms ease-in-out', keyframes([
        style({
          height: '0px',
          overflow: 'hidden',
          offset: 0
        }),
        style({
          height: '*',
          display: 'hidden',
          offset: 1
        })
      ])))
    ])
  ]
})
export class ExistenceTimeComponent extends PropertyComponent implements OnInit, AfterViewInit {


  /**
  * Inputs
  */


  /**
  * State
  *
  * view: shows relevant information (without buttons to start editing)
  * editable: shows relevant information and buttons to start editing
  * edit: shows interface to edit
  */

  @Input() state: 'view' | 'editable' | 'edit';

  @Input() existenceTime: ExistenceTime;


  /**
  *  Properties
  */

  model: any = {};

  loading = false;
  errorMessages: Object;
  account: Account;
  confirm: boolean = false; //if true, form is hidden and confirmation shown.



  // timePrimitive created from initialForm
  initialTimePrimitive: TimePrimitive;

  // label of timePrimitive when choosing an option
  initTpLabel: string;

  // state of initial TimePrimitiveComponent
  initialTpState: 'editable' | 'view' | 'edit';

  fieldsets: Fieldsets;


  // Initial Form used to create the first TimePrimitive
  initialForm: FormGroup;

  // Main Form used to edit and extend an existing existenceTime
  mainForm: FormGroup;

  // Object defining the mainForm
  mainFormDefinition;

  // Object defining the initialForm
  initialFormDefinition;

  private _chooseStatementVisible: boolean;


  mainFormBtnsVisible: boolean;

  constructor(
    eprApi: InfEntityProjectRelApi,
    roleApi: InfRoleApi,
    activeProject: ActiveProjectService,
    roleService: RoleService,
    propertyService: PropertyService,
    util: UtilitiesService,
    public entityEditor: EntityEditorService,
    changeDetector: ChangeDetectorRef,
    private slimLoadingBarService: SlimLoadingBarService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private validationService: ValidationService
  ) {
    super(eprApi, roleApi, activeProject, roleService, propertyService, util, entityEditor, changeDetector)

    this.initialFormDefinition = {
      timePrimitive: [null, Validators.required]
    };

  }


  ngOnInit() {

    this.existenceTime = new ExistenceTime(this.existenceTime);

    this.fieldsets = {
      begin: new Fieldset({
        label: 'Begin',
        state: 'expanded',
        visible: true,
        fields: {
          beg: new Field({
            state: 'editable',
            label: 'Begin',
            datePrefix: '',
            ctrlName: 'beg',
            tpName: 'p81a',
            isImplicit: true
          }),
          begBeg: new Field({
            state: 'editable',
            label: 'Begin of begin',
            datePrefix: 'Begin of',
            ctrlName: 'begBeg',
            tpName: 'p82a',
            isImplicit: true
          }),
          endBeg: new Field({
            state: 'editable',
            label: 'End of begin',
            datePrefix: 'End of',
            ctrlName: 'endBeg',
            tpName: 'p81a',
            isImplicit: false
          })
        }
      }),
      end: new Fieldset({
        label: 'End',
        state: 'expanded',
        visible: true,
        fields: {
          end: new Field({
            state: 'editable',
            label: 'End',
            datePrefix: '',
            ctrlName: 'end',
            tpName: 'p81b',
            isImplicit: true
          }),
          begEnd: new Field({
            state: 'editable',
            label: 'Begin of end',
            datePrefix: 'Begin of',
            ctrlName: 'begEnd',
            tpName: 'p81b'
          }),
          endEnd: new Field({
            state: 'editable',
            label: 'End of end',
            datePrefix: 'End of',
            ctrlName: 'endEnd',
            tpName: 'p82b'
          })
        }
      }),
      inner: new Fieldset({
        label: 'Inner Bounds',
        state: 'expanded',
        visible: true,
        fields: {
          inner: new Field({
            state: 'editable',
            label: 'Inner bound',
            datePrefix: '',
            ctrlName: 'inner',
            tpName: 'p81',
            isImplicit: true
          }),
          leftInner: new Field({
            state: 'editable',
            label: 'Left inner bound',
            datePrefix: 'End of',
            ctrlName: 'leftInner',
            tpName: 'p81a',
          }),
          rightInner: new Field({
            state: 'editable',
            label: 'Right inner bound',
            datePrefix: 'Begin of',
            ctrlName: 'rightInner',
            tpName: 'p81b'
          })
        }
      }),
      outer: new Fieldset({
        label: 'Outer Bounds',
        state: 'expanded',
        visible: true,
        fields: {
          outer: new Field({
            state: 'editable',
            label: 'Outer bound',
            datePrefix: '',
            ctrlName: 'outer',
            tpName: 'p82',
            isImplicit: true
          }),
          leftOuter: new Field({
            state: 'editable',
            label: 'Left outer bound',
            datePrefix: 'Begin of',
            ctrlName: 'leftOuter',
            tpName: 'p82a'
          }),
          rightOuter: new Field({
            state: 'editable',
            label: 'Right outer bound',
            datePrefix: 'End of',
            ctrlName: 'rightOuter',
            tpName: 'p82b',
          })
        }
      })
    }

    this.createForms();

    this.mainFormBtnsVisible = true;

  }



  /**
   * Updates the given field
   *
   * @param  {type} field: Field         description
   * @param  {type} val: TimePrimitive   description
   * @param  {type} isImplicit?: boolean description
   * @param  {type} state?: FieldState   description
   * @return {type}                      description
   */
  updateField(field: Field, isImplicit?: boolean, state?: FieldState) {

    if (isImplicit !== undefined) {
      field.isImplicit = isImplicit;
    }
    if (state !== undefined) {
      field.state = state;
    }
  }


  /**
    * Updates  the given field and the formControl of mainForm
   *
   * @param  {type} field: Field         description
   * @param  {type} val: TimePrimitive   description
   * @param  {type} isImplicit?: boolean description
   * @param  {type} state?: FieldState   description
   * @return {type}                      description
   */
  updateFieldAndCtrl(field: Field, val: TimePrimitive, isImplicit?: boolean, state?: FieldState) {
    // update field and existenceTime
    this.updateField(field, isImplicit, state);

    // if mainForm is initialized
    if (this.mainForm) {

      const ctrl = this.mainForm.get(field.ctrlName);
      //if the controls value differs from given value
      if (val && ctrl.value && (ctrl.value.julianDay !== val.julianDay || ctrl.value.duration !== val.duration || ctrl.value.calendar !== val.calendar)) {
        ctrl.setValue(val, { onlySelf: true, emitEvent: false });
      } else if ((!val || !ctrl.value) && val != ctrl.value) {
        ctrl.setValue(val, { onlySelf: true, emitEvent: false });
      }
    }
    // if mainForm is not yet initialized
    else {
      this.mainFormDefinition[field.ctrlName][0] = val;
    }
  }



  /**
   * changeOwnExistenceTime - Change the existence time of the given field.
   * The exististence time is only changed, if the field's state is editing.
   *
   * @param  {type} field: Field                 description
   * @param  {type} timePrimitive: TimePrimitive description
   * @return {type}                              description
   */
  changeOwnExistenceTime(field: Field, timePrimitive: TimePrimitive) {
    if (field.state === 'edit')
      this.existenceTime[field.tpName] = timePrimitive;


    switch (field.tpName) {
      case 'p81a':
        this.updateBeg();
        this.update82a('begBeg');
        this.update82a('leftOuter')
        this.update81a('endBeg');
        this.update81a('leftInner');
        break;
      case 'p82a':
        this.updateBeg();
        this.update82a('begBeg');
        this.update82a('leftOuter')
        break;
      case 'p81b':
        this.updateEnd();
        this.update81b('begEnd');
        this.update81b('rightInner');
        this.update82b('endEnd');
        this.update82b('rightOuter')
        break;
      case 'p82b':
        this.updateEnd();
        this.update82b('endEnd');
        this.update82b('rightOuter')
        break;
      case 'p81':
        this.updateBeg();
        this.updateEnd();
        this.update81a('endBeg');
        this.update81a('leftInner');
        this.update81b('begEnd');
        this.update81b('rightInner');
        break;

    }
  }

  createForms() {

    this.mainFormDefinition = {
      beg: [null],
      begBeg: [null],
      endBeg: [this.existenceTime.p81a],

      end: [null],
      begEnd: [null],
      endEnd: [this.existenceTime.p81b],

      inner: [this.existenceTime.p81],
      leftInner: [this.existenceTime.p81a],
      rightInner: [this.existenceTime.p81b],

      outer: [this.existenceTime.p82],
      leftOuter: [this.existenceTime.p82a],
      rightOuter: [this.existenceTime.p82b],

    };

    this.initialForm = this.fb.group(this.initialFormDefinition);

    this.mainForm = this.fb.group(this.mainFormDefinition,
      {
        validator: this.validateForm(this)
      });

    this.updateAllFields();

  }

  updateAllFields() {
    this.updateInner()
    this.updateOuter()

    this.update81a('endBeg');
    this.update81a('leftInner');
    this.update81b('begEnd');
    this.update81b('rightInner');

    this.update82a('begBeg');
    this.update82a('leftOuter')
    this.update82b('endEnd');
    this.update82b('rightOuter')

    this.updateBeg();
    this.updateEnd();
  }


  /**
   * Called before Validation. Updates beg field values
   */
  updateBeg() {
    const begField = this.fieldsets.begin.fields.beg;

    // since on form init, field state will be addBtn, we have to get away from it
    const state = begField.state === 'addBtn' ? 'editable': begField.state;

    if (this.existenceTime.p82a || this.existenceTime.p82 || this.existenceTime.p81) {
      // if there in not only p81a that helps to imply Beg, set to null
      this.updateFieldAndCtrl(begField, null, true, 'view')
    }
    else if (this.existenceTime.p81a) {

      this.updateFieldAndCtrl(begField, this.existenceTime.p81a, false, state)
    }
    else {
      this.updateFieldAndCtrl(begField, null, true, 'addBtn')
    }
  }


  /**
   * Called before Validation. Updates end field values
   */
  updateEnd() {
    const field = this.fieldsets.end.fields.end;

    // since on form init, field state will be addBtn, we have to get away from it
    const state = field.state === 'addBtn' ? 'editable': field.state;

    if (this.existenceTime.p82b || this.existenceTime.p82 || this.existenceTime.p81) {
      // if there in not only p81b that helps to imply Beg, set to null
      this.updateFieldAndCtrl(field, null, true, 'view')
    }
    else if (this.existenceTime.p81b) {
      this.updateFieldAndCtrl(field, this.existenceTime.p81b, false, state)
    }
    else {
      this.updateFieldAndCtrl(field, null, true, 'addBtn')
    }
  }



  /**
   * Called before Validation. Updates inner field values
   */
  updateInner() {
    const field = this.fieldsets.inner.fields.inner;

    // since on form init, field state will be addBtn, we have to get away from it
    const state = field.state === 'addBtn' ? 'editable': field.state;

    if (this.existenceTime.p81) {
      this.updateFieldAndCtrl(field, this.existenceTime.p81, false, state);
    }
    else if (!this.existenceTime.p81a && !this.existenceTime.p81b && !this.existenceTime.p81) {
      this.updateFieldAndCtrl(field, null, true, 'addBtn');
    }
    else {
      this.updateFieldAndCtrl(field, null, false, state);
    }
  }

  /**
   * Called before Validation. Updates outer field values
   */
  updateOuter() {
    const field = this.fieldsets.outer.fields.outer;

    // since on form init, field state will be addBtn, we have to get away from it
    const state = field.state === 'addBtn' ? 'editable': field.state;

    if (this.existenceTime.p82) {
      this.updateFieldAndCtrl(field, this.existenceTime.p82, false, state);
    }
    else if (!this.existenceTime.p82a && !this.existenceTime.p82b && !this.existenceTime.p82) {
      this.updateFieldAndCtrl(field, null, true, 'addBtn');
    }
    else {
      this.updateFieldAndCtrl(field, null, false, state);
    }
  }

  /**
   * Called before Validation. Updates begBeg or leftOuter field values
   */
  update82a(fieldName: 'begBeg' | 'leftOuter') {

    const field = this.fieldsets.begin.fields[fieldName] || this.fieldsets.outer.fields[fieldName];
    if (this.existenceTime.p82a) {
      this.updateFieldAndCtrl(field, this.existenceTime.p82a, false);
    }
    else if (this.existenceTime.p82) {
      this.updateFieldAndCtrl(field, this.existenceTime.p82, true);
    }
    else if (this.existenceTime.p81a) {
      this.updateFieldAndCtrl(field, this.existenceTime.p81a, true);
    }
    else {
      this.updateFieldAndCtrl(field, null);
    }
  }

  /**
   * Called before Validation. Updates endEnd or rightOuter field values
   */
  update82b(fieldName: 'endEnd' | 'rightOuter') {

    const field = this.fieldsets.end.fields[fieldName] || this.fieldsets.outer.fields[fieldName];
    if (this.existenceTime.p82b) {
      this.updateFieldAndCtrl(field, this.existenceTime.p82b, false);
    }
    else if (this.existenceTime.p82) {
      this.updateFieldAndCtrl(field, this.existenceTime.p82, true);
    }
    else if (this.existenceTime.p81b) {
      this.updateFieldAndCtrl(field, this.existenceTime.p81b, true);
    }
    else {
      this.updateFieldAndCtrl(field, null);
    }
  }



  /**
   * Called before Validation. Updates endBeg or leftInner field values
   */
  update81a(fieldName: 'endBeg' | 'leftInner') {
    const field = this.fieldsets.begin.fields[fieldName] || this.fieldsets.inner.fields[fieldName];

    // since on form init, field state will be addBtn, we have to get away from it
    const state = field.state === 'addBtn' ? 'editable': field.state;

    if (this.existenceTime.p81a) {
      this.updateFieldAndCtrl(field, this.existenceTime.p81a, false, state);
    }
    else if (this.existenceTime.p81) {
      this.updateFieldAndCtrl(field, this.existenceTime.p81, true, state);
    }
    else {
      this.updateFieldAndCtrl(field, null, true, 'addBtn');
    }
  }


  /**
   * Called before Validation. Updates endBeg or leftInner field values
   */
  update81b(fieldName: 'begEnd' | 'rightInner') {
    const field = this.fieldsets.end.fields[fieldName] || this.fieldsets.inner.fields[fieldName];

    // since on form init, field state will be addBtn, we have to get away from it
    const state = field.state === 'addBtn' ? 'editable': field.state;

    if (this.existenceTime.p81b) {
      this.updateFieldAndCtrl(field, this.existenceTime.p81b, false, state);
    }
    else if (this.existenceTime.p81) {
      this.updateFieldAndCtrl(field, this.existenceTime.p81, true, state);
    }
    else {
      this.updateFieldAndCtrl(field, null, true, 'addBtn');
    }
  }

  ngAfterViewInit() {
    this.mainForm.valueChanges.subscribe(val => {


    })


    this.mainForm.controls.beg.valueChanges.subscribe(val => {
      this.onChangesBeg(val);
    })

    this.mainForm.controls.end.valueChanges.subscribe(val => {
      this.onChangesEnd(val);
    })

    this.mainForm.controls.inner.valueChanges.subscribe(val => {
      this.onChangesInner(val);
    })

    this.mainForm.controls.outer.valueChanges.subscribe(val => {
      this.onChangesOuter(val);
    })

    this.mainForm.controls.begBeg.valueChanges.subscribe(val => {
      this.onChanges82a(val, 'begBeg');
    })

    this.mainForm.controls.leftOuter.valueChanges.subscribe(val => {
      this.onChanges82a(val, 'leftOuter');
    })

    this.mainForm.controls.endBeg.valueChanges.subscribe(val => {
      this.onChanges81a(val, 'endBeg');
    })

    this.mainForm.controls.leftInner.valueChanges.subscribe(val => {
      this.onChanges81a(val, 'leftInner');
    })

    this.mainForm.controls.rightInner.valueChanges.subscribe(val => {
      this.onChanges81b(val, 'rightInner');
    })

    this.mainForm.controls.begEnd.valueChanges.subscribe(val => {
      this.onChanges81b(val, 'begEnd');
    })

    this.mainForm.controls.endEnd.valueChanges.subscribe(val => {
      this.onChanges82b(val, 'endEnd');
    })

    this.mainForm.controls.rightOuter.valueChanges.subscribe(val => {
      this.onChanges82b(val, 'rightOuter');
    })
  }

  // BEGIN

  /**
  * Called, when formControl beg of mainForm is changed
  */
  onChangesBeg(timePrimitive: TimePrimitive) {
    const field = this.fieldsets.begin.fields.beg;

    this.changeOwnExistenceTime(field, timePrimitive);

  }


  // END

  /**
  * Called, when formControl end of mainForm is changed
  */
  onChangesEnd(timePrimitive: TimePrimitive) {
    const field = this.fieldsets.end.fields.end;

    this.changeOwnExistenceTime(field, timePrimitive);
  }


  // INNER BOUNDS

  /**
  * Called, when formControl inner of mainForm is changed
  */
  onChangesInner(timePrimitive: TimePrimitive) {
    const field = this.fieldsets.inner.fields.inner;

    if (this.existenceTime.p81a) {
      this.existenceTime.p81a = null;
    }
    if (this.existenceTime.p81b) {
      this.existenceTime.p81b = null;
    }

    this.changeOwnExistenceTime(field, timePrimitive);

    // set field explicit
    this.updateField(field, false);

  }


  // OUTER BOUNDS

  /**
  * Called, when formControl outer of mainForm is changed
  */
  onChangesOuter(timePrimitive: TimePrimitive) {
    const field = this.fieldsets.outer.fields.outer;

    if (this.existenceTime.p82a) {
      this.existenceTime.p82a = null;
    }
    if (this.existenceTime.p82b) {
      this.existenceTime.p82b = null;
    }

    this.changeOwnExistenceTime(field, timePrimitive);

    // set field explicit
    this.updateField(field, false);

  }


  // BOUND-Extremes

  /**
  * Called, when formControl endBeg or leftInner of mainForm is changed
  */
  onChanges81a(timePrimitive: TimePrimitive, fieldName: string) {
    const field = this.fieldsets.begin.fields[fieldName] || this.fieldsets.inner.fields[fieldName];;
    if (this.existenceTime.p81) {
      this.existenceTime.p81b = this.existenceTime.p81;
      this.existenceTime.p81 = null;
    }

    this.changeOwnExistenceTime(field, timePrimitive);

    this.updateField(field, false);

    // this.updateBeg()
  }

  /**
  * Called, when formControl begEnd or rightInner of mainForm is changed
  */
  onChanges81b(timePrimitive: TimePrimitive, fieldName: 'begEnd' | 'rightInner') {
    const field = this.fieldsets.end.fields[fieldName] || this.fieldsets.inner.fields[fieldName];;
    if (this.existenceTime.p81) {
      this.existenceTime.p81a = this.existenceTime.p81;
      this.existenceTime.p81 = null;
    }

    this.changeOwnExistenceTime(field, timePrimitive);

    this.updateField(field, false);
  }

  /**
  * Called, when formControl begBeg or leftOuter of mainForm is changed
  */
  onChanges82a(timePrimitive: TimePrimitive, fieldName: string) {
    const field = this.fieldsets.begin.fields[fieldName] || this.fieldsets.outer.fields[fieldName];
    if (!this.existenceTime.p82a && this.existenceTime.p82) {
      this.existenceTime.p82b = this.existenceTime.p82;
      this.existenceTime.p82 = null;
    }

    this.changeOwnExistenceTime(field, timePrimitive);

    // this.updateField(field, true);

  }

  /**
  * Called, when formControl endEnd or rightOuter of mainForm is changed
  */
  onChanges82b(timePrimitive: TimePrimitive, fieldName: 'endEnd' | 'rightOuter') {
    const field = this.fieldsets.end.fields[fieldName] || this.fieldsets.outer.fields[fieldName];
    if (!this.existenceTime.p82b && this.existenceTime.p82) {
      this.existenceTime.p82a = this.existenceTime.p82;
      this.existenceTime.p82 = null;
    }

    this.changeOwnExistenceTime(field, timePrimitive);

    // this.updateField(field, true);

  }




  /**
  * Validate the mainForm and update the component's values
  */
  validateForm(component: ExistenceTimeComponent): Function {

    return (fg: FormGroup): void => {

      /********* get controls *************/

      const begCtrl = fg.controls['beg'];
      const begBegCtrl = fg.controls['begBeg'];
      const endBegCtrl = fg.controls['endBeg'];

      const endCtrl = fg.controls['end'];
      const begEndCtrl = fg.controls['begEnd'];
      const endEndCtrl = fg.controls['endEnd'];

      const innerCtrl = fg.controls['inner'];
      const leftInnerCtrl = fg.controls['leftInner'];
      const rightInnerCtrl = fg.controls['rightInner'];

      const outerCtrl = fg.controls['outer'];
      const leftOuterCtrl = fg.controls['leftOuter'];
      const rightOuterCtrl = fg.controls['rightOuter'];



      /********* Validate controls **********/

      // 81a (surelyFrom) must end before 81b (surelyTo)

      this.validationService.mustBeginBeforeEnd('begBeg', 'Begin of Begin', 'endBeg', 'End of Begin')(fg);

      this.validationService.mustBeginBeforeEnd('begEnd', 'Begin of End', 'endEnd', 'End of End')(fg);
      this.validationService.mustBeginBeforeEnd('leftInner', 'Left Inner', 'rightInner', 'Right Inner')(fg);

      this.validationService.mustNotIntersect('endBeg', 'End of Begin', 'begEnd', 'Begin of End')(fg);


    }
  }






  save() {
    console.log('save')
  }
  cancel() {
    console.log('cancel')
  }



  /**
  * Start editing a specific field
  *
  * @param  {Fieldset} fieldset Fieldset of the field to edit
  * @param  {Field} field Field to edit
  */
  startEditingField(fieldset: Fieldset, field: Field): void {

    // store the current time primitive, so it can be reset on cancel
    field.tpForReset = this.mainForm.controls[field.ctrlName].value;

    for (let key in this.fieldsets) {
      let fs = this.fieldsets[key];

      //put all fields of this fieldset
      for (let key in fs.fields) {
        fs.fields[key].state = 'view';
      }
    }

    //show this field
    field.state = 'edit';

    // hide main form buttons
    this.mainFormBtnsVisible = false;

  }



  /**
  * stop editing field
  *
  * @param  {Fieldset} fieldset Fieldset of the field to submit in mainForm
  * @param  {Field} field Field to submit in mainFormt
  */
  submitEditingField(fieldset: Fieldset, field: Field): void {

    //show all fieldsets
    for (let key in this.fieldsets) {

      let fs = this.fieldsets[key];

      fs.visible = true;

      //show all fields
      for (let key in fs.fields) {
        fs.fields[key].state = 'editable';
      }

    }

    // show main form buttons
    this.mainFormBtnsVisible = true;
  }


  /**
  * stop editing field
  *
  * @param  {Fieldset} fieldset Fieldset of the field to submit in mainForm
  * @param  {Field} field Field to submit in mainFormt
  */
  cancelEditingField(fieldset: Fieldset, field: Field): void {

    //show all fieldsets
    for (let key in this.fieldsets) {

      let fs = this.fieldsets[key];

      fs.visible = true;

      //show all fields
      for (let key in fs.fields) {
        fs.fields[key].state = 'editable';
      }

    }

    // store the current time primitive, so it can be reset on cancel
    this.mainForm.get(field.ctrlName).setValue(field.tpForReset);

    // show main form buttons
    this.mainFormBtnsVisible = true;
  }


  /**
  * remove the value from field
  *
  * @param  {Fieldset} fieldset Fieldset of the field in mainForm
  * @param  {Field} field Field in mainFormt
  */
  removeValueFromField(fieldset: Fieldset, field: Field): void {

    field.state = 'edit';
    this.mainForm.get(field.ctrlName).setValue(null);
    field.state = 'editable';
  }



  /**
  * stop editing all fields
  */
  stopEditingFields(): void {

    //show all fieldsets
    for (let key in this.fieldsets) {

      let fs = this.fieldsets[key];

      fs.visible = true;

      //show all fields
      for (let key in fs.fields) {
        fs.fields[key].state = 'editable';
      }

    }

    // show main form buttons
    this.mainFormBtnsVisible = true;
  }



  /**
  * start editing initial form
  */
  startEditingInitialForm(): void {

    this.state = 'edit';

    // show the initialTimePrimitive Form Control
    this.initialTpState = 'edit';

    // reset
    this._chooseStatementVisible = false;

    this.initialForm.reset();

  }


  /**
  * stop editing initial form
  */
  stopEditingInitialForm(): void {

    this.state = 'editable';

  }


  /**
  * start editing the main form
  */
  startEditingMainForm(): void {
    // show main form buttons
    this.mainFormBtnsVisible = true;
    this.updateAllFields();
  }

  /**
  * stop editing main form
  */
  stopEditingMainForm(): void {

    this.stopEditingFields();

    this.state = 'editable';


  }


  /**
  * start choosing meaning of first TimePrimitive
  */
  startChooseStatement() {
    this._chooseStatementVisible = true;
    this.initialTpState = 'view'
    this.initialTimePrimitive = this.initialForm.controls.timePrimitive.value;



    this.initTpLabel = this.labelOfTimePrimitive(this.initialTimePrimitive);


  }


  /**
  * stop choosing meaning of first TimePrimitive
  */
  stopChooseStatement() {
    this._chooseStatementVisible = false;
  }



  /**
  * Called when user chooses "begins" in order to make the initial
  * timePrimitive a 81a
  */
  chooseBegins() {
    this._chooseStatementVisible = false;

    this.existenceTime.p81a = this.initialTimePrimitive;

    this.startEditingMainForm()

  }

  /**
  * Called when user chooses "throughout" in order to make the initial
  * timePrimitive a 81
  */
  chooseThroughout() {

    this.existenceTime.p81 = this.initialTimePrimitive;

    this.state = 'editable';

    this.startEditingMainForm()

  }

  /**
  * Called when user chooses "at some time within" in order to make the initial
  * timePrimitive a 82
  */
  chooseAtSomeTimeWithin() {

    this.existenceTime.p82 = this.initialTimePrimitive;

    this.state = 'editable';

    this.startEditingMainForm()
  }


  labelOfTimePrimitive(tp: TimePrimitive) {

    return this.datePipe.transform(
      tp.getDate(),
      tp.getShortesDateFormatString()
    )
  }


  /**
  * Figures out if any TimePrimitive is set.
  * If so, return true, else returns false.
  *
  * @return {boolean}  True if any TimePrimitive is set, else false
  */
  formHasValue() {
    if (
      this.mainForm.dirty ||

      this.mainForm.controls.beg.value ||
      this.mainForm.controls.begBeg.value ||
      this.mainForm.controls.endBeg.value ||

      this.mainForm.controls.end.value ||
      this.mainForm.controls.begEnd.value ||
      this.mainForm.controls.endEnd.value ||

      this.mainForm.controls.inner.value ||
      this.mainForm.controls.leftInner.value ||
      this.mainForm.controls.rightInner.value ||

      this.mainForm.controls.outer.value ||
      this.mainForm.controls.leftOuter.value ||
      this.mainForm.controls.rightOuter.value
    ) {
      return true;
    }
    else {
      return false;
    }
  }


  /**
  * Visibility
  */

  get initialFormVisible() {
    return (this.state === 'edit' && !this.formHasValue());
  }

  get mainFormVisible() {
    return (this.state === 'edit' && this.formHasValue());
  }


  /**
  * Visibility within the initial form
  */
  get initialTimePrimitiveVisible() {
    return (this.initialTpState === 'edit')
  }

  get chooseStatementVisible() {
    return this._chooseStatementVisible;
  }

  get okBtnVisible() {
    return (this.initialForm.controls.timePrimitive.valid && !this.chooseStatementVisible);
  }


  /**
  * Visibility within the main form
  */




  /**
  * Loading Bar Logic
  */

  startLoading() {
    this.loading = true;
    this.slimLoadingBarService.progress = 20;
    this.slimLoadingBarService.start(() => {
    });
  }

  stopLoading() {
    this.slimLoadingBarService.stop();
  }

  completeLoading() {
    this.loading = false;
    this.slimLoadingBarService.complete();
  }

  resetLoading() {
    this.loading = false;
    this.slimLoadingBarService.reset();
  }

}
