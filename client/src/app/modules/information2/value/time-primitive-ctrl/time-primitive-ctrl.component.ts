import { Component, EventEmitter, forwardRef, HostBinding, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import {
  GregorianDateTime,
  InfEntityProjectRel,
  InfRole,
  InfTimePrimitive,
  JulianDateTime,
  TimePrimitive,
  ValidationService,
} from 'app/core';
import { CalendarType } from 'app/core/date-time/time-primitive';
import { pick } from 'ramda';

import { infRole2TimePrimitive } from '../../information.helpers';
import { Observable, Subscription, Subject, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'gv-time-primitive-ctrl',
  templateUrl: './time-primitive-ctrl.component.html',
  styleUrls: ['./time-primitive-ctrl.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimePrimitiveCtrlComponent),
      multi: true
    }
  ]
})
export class TimePrimitiveCtrlComponent implements OnInit, OnDestroy, ControlValueAccessor {


  /**
  * Inputs
  */



  @Input() currentCal: CalendarType;

  // Allow the input to be disabled, and when it is make it somewhat transparent.
  @Input() disabled = false;

  // Flag indicates if submit button is visible in edit state
  @Input() submitBtnVisible: boolean;

  // Flag indicates if cancel button is visible in edit state
  @Input() cancelBtnVisible: boolean;

  /**
   * Outputs
   */

  @Output() onEdit: EventEmitter<void> = new EventEmitter();
  @Output() onCancel: EventEmitter<void> = new EventEmitter();
  @Output() onSubmit: EventEmitter<void> = new EventEmitter();
  @Output() touched: EventEmitter<void> = new EventEmitter();


  @HostBinding('style.opacity')
  get opacity() {
    return this.disabled ? 0.25 : 1;
  }

  /**
   * Properties
   */
  role: InfRole; // parent teEnt-Role (passed in by writeValue)

  timePrimitive: TimePrimitive;

  gregorianDateTime: GregorianDateTime;

  julianDateTime: JulianDateTime;

  julianDay: number;

  timeInputsVisible: boolean;

  infoVisible: boolean;

  info: {
    duration?: string;
    gregStartDate?: Date;
    gregEndDate?: Date;
    julStartDate?: Date;
    julEndDate?: Date;
  };

  form: FormGroup;

  onChange = (role: InfRole) => {
    console.error('called before registerOnChange')
  };

  editingCalendar = false;

  registerOnChangeCalled: Subject<boolean>;
  writeValueCalled: Subject<boolean>;

  subs: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
  ) {
    this.gregorianDateTime = new GregorianDateTime();
    this.julianDateTime = new JulianDateTime();

    this.registerOnChangeCalled = new BehaviorSubject(null)
    this.writeValueCalled = new BehaviorSubject(null)

    // emitValue as soon as registerOnChange and WriteValue have been called once 
    this.subs.push(
      Observable.combineLatest(
        this.registerOnChangeCalled,
        this.writeValueCalled
      ).subscribe((result) => {
        if (result[0] && result[1]) {
          this.emitVal();
        }
      })
    )

  }

  ngOnInit() {

    this.currentCal = this.currentCal ? this.currentCal : 'julian'

    this.infoVisible = true;

    this.info = {};

    this.initFormControls();

    // // if there is an timePrimitive input, populate the form
    // if (this.timePrimitive && this.timePrimitive.calendar) {

    //   this.writeValue(this.timePrimitive)

    // }
    // // else create an empty form
    // else {

    //   this.setFormValue()
    // }

  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe())
  }

  subscribeToFormChanges() {

    // register form changes to update view
    this.form.valueChanges.subscribe(val => {
      this.emitVal()
    });
  }

  /**
   * Compares given InfRole and TimePrimitive.
   * Returns true, if equal
   * @param role 
   * @param tp 
   */
  roleEqualsTimePrimitive(role: InfRole, tp: TimePrimitive): boolean {
    if (
      role.time_primitive &&
      role.time_primitive.duration == tp.duration &&
      role.time_primitive.julian_day == tp.julianDay &&
      role.entity_version_project_rels &&
      role.entity_version_project_rels[0].calendar == tp.calendar
    )
      return true;
    else return false;
  }

  emitVal() {
    var tp = new TimePrimitive();

    if (this.form && this.form.status === 'VALID') {

      // update duration
      this.updateDurationInfo();

      // update Gregorian Info
      this.updateGregorianInfo();

      // update Julian Info
      this.updateJulianInfo();


      // update tp
      tp.calendar = this.currentCal;
      if (this.currentCal === 'gregorian') {
        tp.julianDay = this.gregorianDateTime.getJulianDay();
        tp.duration = this.gregorianDateTime.getGranularity();
      }
      else if (this.currentCal === 'julian') {
        tp.julianDay = this.julianDateTime.getJulianDay();
        tp.duration = this.julianDateTime.getGranularity();
      }

    }

    // If all required values of timePrimitive ok, pass the timePtimitive to
    // the onChange function, that may be registered by parent's form control
    if (tp.calendar && tp.julianDay && tp.duration) {

      // build the role
      let role = new InfRole(pick(['fk_temporal_entity', 'fk_property'], this.role));

      // from TimePrimitive to InfTimePrimitve
      const infTp = {
        duration: tp.duration,
        julian_day: tp.julianDay,
        fk_class: undefined,
        pk_entity_version_concat: undefined,
        pk_entity: undefined,
        entity_version: undefined,
        notes: undefined,
        tmsp_creation: undefined,
        tmsp_last_modification: undefined,
        entity_version_project_rels: undefined,
        is_community_favorite: undefined,
        is_latest_version: undefined,
        sys_period: undefined
      } as InfTimePrimitive;
      role.time_primitive = infTp;

      // build a epr with the calendar information
      role.entity_version_project_rels = [
        {
          calendar: tp.calendar as string
        } as InfEntityProjectRel
      ]

      this.timePrimitive = tp;

      if (this.roleEqualsTimePrimitive(this.role, tp)){
        this.onChange(this.role);
      }
      else {
        this.onChange(role);
      }
    }
    // else send null to the parent's form control
    else
      this.onChange(null);
  }

  initFormControls() {
    this.form = this.fb.group(
      {
        calendar: null,
        year: [null, [Validators.required, Validators.min(-4713), Validators.max(3000)]],
        month: [null, [Validators.min(1), Validators.max(12)]],
        day: [null, Validators.min(1)],
        hours: [null, [Validators.min(0), Validators.max(23)]],
        minutes: [null, [Validators.min(0), Validators.max(59)]],
        seconds: [null, [Validators.min(0), Validators.max(59)]]
      },
      {
        validator: this.validateForm(this)
      }
    );

  }

  setFormValue(year = null, month = null, day = null, hours = null, minutes = null, seconds = null) {

    this.form.setValue(
      {
        calendar: this.currentCal,
        year,
        month,
        day,
        hours,
        minutes,
        seconds
      }
    );
  }


  /**
  * Validate the form and update the component's values
  */
  validateForm(component: TimePrimitiveCtrlComponent): Function {

    return (fg: FormGroup): void => {

      // get fields
      const yearField = fg.controls['year'];
      const monthField = fg.controls['month'];
      const dayField = fg.controls['day'];
      const hoursField = fg.controls['hours'];
      const minutesField = fg.controls['minutes'];
      const secondsField = fg.controls['seconds'];
      const calendarField = fg.controls['calendar'];

      // If day is set, month is required
      this.validationService.requiredBy(['month'], 'day')(fg);

      this.validationService.requiredBy(['day'], 'hours')(fg);

      this.validationService.requiredBy(['hours'], 'minutes')(fg);

      this.validationService.requiredBy(['minutes'], 'seconds')(fg);


      // AUTO ADAPT CALENDAR
      // if calendar field is pristine, and form is dirty (user changed a value), and the value was
      // not set by an existing role (role.pk_entity) fit calendar to the date
      // according to the switch-day of 2299161 (1582-10-4/1582-10-15)
      if (calendarField.pristine && fg.dirty && !this.role.pk_entity) {
        var g = new GregorianDateTime();
        g.year = yearField.value;
        g.month = monthField.value;
        g.day = dayField.value;
        if (g.getJulianDay() >= 2299161 && calendarField.value !== 'gregorian') {
          calendarField.setValue('gregorian');
        }
        else if (g.getJulianDay() < 2299161 && calendarField.value !== 'julian') {
          calendarField.setValue('julian');
        }
      }

      // RECALC DATE ON USER CHANGE CALENDAR
      // if calendar is dirty, the value got changed manually, and year, month,
      // and day are valid, recalculate the date
      else if (calendarField.dirty && yearField.value && monthField.value && dayField.value) {

        // if user changed from gregorian to julian
        if (component.currentCal === 'gregorian' && calendarField.value === 'julian' && calendarField.valid) {
          var g = new GregorianDateTime();
          g.year = yearField.value;
          g.month = monthField.value;
          g.day = dayField.value;
          var julianDay = g.getJulianDay();
          if (julianDay >= 2299161) {
            var j = new JulianDateTime();
            j.fromJulianDay(julianDay);
            component.currentCal = 'julian';
            fg.patchValue({
              calendar: 'julian',
              year: j.year,
              month: j.month,
              day: j.day
            })
          }
        }
        // else if user changed from julian to gregorian

        else if (component.currentCal === 'julian' && calendarField.value === 'gregorian') {
          var j = new JulianDateTime();
          j.year = yearField.value;
          j.month = monthField.value;
          j.day = dayField.value;
          var g = new GregorianDateTime();
          g.fromJulianDay(j.getJulianDay());
          component.currentCal = 'gregorian';
          fg.patchValue({
            calendar: 'gregorian',
            year: g.year,
            month: g.month,
            day: g.day
          })
        }

      }


      //set currentCal
      component.currentCal = calendarField.value;

      // Set gregorianDateTime values
      if (calendarField.value === 'gregorian') {
        component.gregorianDateTime.year = yearField.value;
        component.gregorianDateTime.month = monthField.value;
        component.gregorianDateTime.day = dayField.value;
        component.gregorianDateTime.hours = hoursField.value;
        component.gregorianDateTime.minutes = minutesField.value;
        component.gregorianDateTime.seconds = secondsField.value;

        var lengthOfMonth = component.gregorianDateTime.lengthOfMonth();
      }

      // Set julianDateTime values
      else if (calendarField.value === 'julian') {
        component.julianDateTime.year = yearField.value;
        component.julianDateTime.month = monthField.value;
        component.julianDateTime.day = dayField.value;
        component.julianDateTime.hours = hoursField.value;
        component.julianDateTime.minutes = minutesField.value;
        component.julianDateTime.seconds = secondsField.value;
        var lengthOfMonth = component.julianDateTime.lengthOfMonth();
      }

      // Validate day is in length of month
      if (dayField.value > lengthOfMonth) {
        this.validationService.addError(dayField, 'dayMax', { 'max': lengthOfMonth });
      }
      else {
        this.validationService.removeError(dayField, 'dayMax');
      }

      // Valdiate that date not before introduction of gregorian calendar
      if (calendarField.value === 'gregorian' && yearField.value) {
        const julianDay = component.gregorianDateTime.getJulianDay();
        const errorName = 'beforeGregorian';
        if (julianDay < 2299161) {
          this.validationService.addError(calendarField, errorName, true)
        }
        else {
          this.validationService.removeError(calendarField, errorName)
        }
      }

    }
  }


  updateDurationInfo() {
    if (this.currentCal === 'gregorian') {
      this.info.duration = this.gregorianDateTime.getGranularity();
    }
    else if (this.currentCal === 'julian') {
      this.info.duration = this.julianDateTime.getGranularity();
    }
  }

  updateGregorianInfo() {
    if (this.currentCal === 'gregorian') {
      this.info.gregStartDate = this.gregorianDateTime.getDate();
      this.info.gregEndDate = this.gregorianDateTime.getEndOf(this.gregorianDateTime.getGranularity()).getDate();
    }
    else if (this.currentCal === 'julian') {
      this.julianDay = this.julianDateTime.getJulianDay();
      if (this.julianDay >= 2299161) {
        const gdt = new GregorianDateTime(this.julianDateTime);
        gdt.fromJulianDay(this.julianDay);
        this.info.gregStartDate = gdt.getDate();
        this.info.gregEndDate = gdt.getEndOf(this.julianDateTime.getGranularity()).getDate();
      } else {
        this.info.gregStartDate = undefined;
        this.info.gregEndDate = undefined;
      }
    }
  }

  updateJulianInfo() {
    if (this.currentCal === 'julian') {
      this.info.julStartDate = this.julianDateTime.getDate();
      this.info.julEndDate = this.julianDateTime.getEndOf(this.julianDateTime.getGranularity()).getDate();
    }
    else if (this.currentCal === 'gregorian') {
      this.julianDay = this.gregorianDateTime.getJulianDay();
      const jdt = new JulianDateTime(this.gregorianDateTime);
      jdt.fromJulianDay(this.julianDay);
      this.info.julStartDate = jdt.getDate();
      this.info.julEndDate = jdt.getEndOf(this.gregorianDateTime.getGranularity()).getDate();
    }
  }



  /**
  * Implements ControlValueAccessor interface
  */

  /**
  * Allows Angular to update the model (timePrimitive).
  * Update the model and changes needed for the view here.
  */
  writeValue(role: InfRole): void {

    this.role = role ? role : new InfRole();

    this.timePrimitive = infRole2TimePrimitive(role);

    this.currentCal = this.timePrimitive.calendar;
    const dt = this.timePrimitive.getDateTime(this.timePrimitive.calendar);

    switch (this.timePrimitive.duration) {
      case '1 year': this.setFormValue(dt.year)
        break;
      case '1 month': this.setFormValue(dt.year, dt.month)
        break;
      case '1 day': this.setFormValue(dt.year, dt.month, dt.day)
        break;
      case '1 hour': this.setFormValue(dt.year, dt.month, dt.day, dt.hours)
        break;
      case '1 minute': this.setFormValue(dt.year, dt.month, dt.day, dt.hours, dt.minutes)
        break;
      case '1 second': this.setFormValue(dt.year, dt.month, dt.day, dt.hours, dt.minutes, dt.seconds)
        break;
    }

    // update duration
    this.updateDurationInfo();

    // update Gregorian Info
    this.updateGregorianInfo();

    // update Julian Info
    this.updateJulianInfo();

    this.writeValueCalled.next(true);

  }




  /**
  * Allows Angular to register a function to call when the model (timePrimitive) changes.
  * Save the function as a property to call later here.
  */
  registerOnChange(fn: any): void {
    this.onChange = fn;

    this.subscribeToFormChanges()

    this.registerOnChangeCalled.next(true)
  }

  /**
  * Allows Angular to register a function to call when the input has been touched.
  * Save the function as a property to call later here.
  */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  onTouched() { };

  /**
  * Allows Angular to disable the input.
  */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  markAsTouched() {
    this.onTouched()
    this.touched.emit()
  }

  showTimeInputs() {
    this.timeInputsVisible = true;
  }

  hideTimeInputs() {
    this.timeInputsVisible = false;
    this.form.patchValue({
      hours: null, minutes: null, seconds: null
    })
  }


  showInfo() {
    this.infoVisible = true;
  }

  hideInfo() {
    this.infoVisible = false;
  }

  submit() {

    if (!this.form.valid) {
      // show all error messages
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    } else {
      this.onSubmit.emit();
    }
  }

  cancel() {
    this.onCancel.emit();
  }

  edit() {
    this.onEdit.emit();
  }


  fieldNames = ['year', 'month', 'day', 'hours', 'minutes', 'seconds'];

  hasValueImmediatelyBefore(fieldN) {
    const fieldBefore = this.fieldNames[(this.fieldNames.indexOf(fieldN) - 1)];
    return (this.form.controls[fieldBefore].value || this.form.controls[fieldBefore].value === 0);
  }
  hasValue(fieldN) {
    return (this.form.controls[fieldN].value || this.form.controls[fieldN].value === 0);
  }
  hasValueAfter(fieldN) {
    const startIndex = this.fieldNames.indexOf(fieldN) + 1;
    for (let i = startIndex; i < this.fieldNames.length; i++) {
      if (this.form.controls[this.fieldNames[i]].value || this.form.controls[fieldN].value === 0)
        return true;
    }
    return false;
  }
  fieldIsVisible(field) {
    return (this.hasValueImmediatelyBefore(field) || this.hasValue(field) || this.hasValueAfter(field));
  }

  get monthVisible(): boolean {
    return this.fieldIsVisible('month');
  }
  get dayVisible(): boolean {
    return this.fieldIsVisible('day');
  }
  get addTimeBtnVisible(): boolean {
    return (this.fieldIsVisible('hours') && !this.timeInputsVisible);
  }
  get removeTimeBtnVisible(): boolean {
    return (this.hoursVisible && !this.fieldIsVisible('minutes'));
  }
  get hoursVisible(): boolean {
    return (this.fieldIsVisible('hours') && this.timeInputsVisible);
  }
  get minutesVisible(): boolean {
    return (this.fieldIsVisible('minutes') && this.timeInputsVisible);
  }
  get secondsVisible(): boolean {
    return (this.fieldIsVisible('seconds') && this.timeInputsVisible);
  }
  get editCalBtnVisible(): boolean {
    // show btn only if both cals are possible (first condition)
    // or if the control was already changed by user (second condition)
    if (this.julianDay >= 2299161
      // || this.form.controls.calendar.dirty
    )
      return true;
    return false;
  }
}
