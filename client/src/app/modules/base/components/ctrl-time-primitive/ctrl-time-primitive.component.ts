import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, Input, OnDestroy, Optional, Output, Self, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NgControl, Validators, FormControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatMenuTrigger } from '@angular/material/menu';
import { Granularity } from 'app/core/date-time/date-time-commons';
import { Subject } from 'rxjs';
import { GregorianDateTime, InfTimePrimitive, JulianDateTime, ValidationService } from '../../../../core';
import { CalendarType, TimePrimitive } from '../../../../core/date-time/time-primitive';
import { takeUntil } from '../../../../../../node_modules/rxjs/operators';

export interface InfTimePrimitiveWithCalendar extends InfTimePrimitive {
  calendar: CalendarType
}

type CtrlModel = InfTimePrimitiveWithCalendar;

@Component({
  selector: 'gv-ctrl-time-primitive',
  templateUrl: './ctrl-time-primitive.component.html',
  styleUrls: ['./ctrl-time-primitive.component.css'],
  providers: [{ provide: MatFormFieldControl, useExisting: CtrlTimePrimitiveComponent }],

})
export class CtrlTimePrimitiveComponent implements OnDestroy, ControlValueAccessor, MatFormFieldControl<CtrlModel> {
  static nextId = 0;

  model: CtrlModel;

  @ViewChild(MatMenuTrigger, { static: true }) trigger: MatMenuTrigger;
  @ViewChild('yearInput', { static: true }) yearInput: ElementRef;


  @Output() blur = new EventEmitter<void>();
  @Output() focus = new EventEmitter<void>();

  autofilled?: boolean;
  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();
  stateChanges = new Subject<void>();
  focused = false;
  errorState = false;
  controlType = 'ctrl-time-primitive';
  id = `ctrl-time-primitive-${CtrlTimePrimitiveComponent.nextId++}`;
  describedBy = '';
  onChange = (_: any) => { };
  onTouched = () => { };

  @Input() autofocus: boolean;

  get empty() {
    return this.model ? false : true;
  }

  get shouldLabelFloat() { return this.focused || !this.empty; }

  @Input()
  get placeholder(): string { return this._placeholder; }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  private _placeholder: string;

  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);

    // TODO implement some disable state
    // this._disabled ? this.parts.disable() : this.parts.enable();
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get value(): CtrlModel | null {
    return this.model;
  }
  set value(value: CtrlModel | null) {
    if (!value || !value.calendar || !value.julian_day || !value.duration) {
      this.model = undefined
    }
    else {
      this.model = value;
    }

    this.onChange(this.model)
  }



  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private fb: FormBuilder,
    private validationService: ValidationService,
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

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

    this.form.valueChanges.subscribe(val => {

      if (this.form.invalid) {
        this.value = undefined
      } else {

        if (this.calendar === 'gregorian') {
          this.julianDay = this.gregorianDateTime.getJulianDay();
          this.duration = this.gregorianDateTime.getGranularity();
        } else if (this.calendar === 'julian') {
          this.julianDay = this.julianDateTime.getJulianDay();
          this.duration = this.julianDateTime.getGranularity();
        }

        this.value = {
          ...this.value,
          julian_day: this.julianDay,
          duration: this.duration,
          calendar: this.calendar
        }
      }
    });

  }

  // TODO: Adapt way of changing the value
  newFoo(val) {
    this.value = val
  }

  ngDoCheck(): void {
    if (this.ngControl) {
      this.errorState = this.ngControl.invalid && this.ngControl.touched;
      this.stateChanges.next();
    }
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }


  onContainerClick(event: MouseEvent) {
    // TODO: implement this

  }

  writeValue(value: CtrlModel | null): void {
    this.value = value;
    if (value) {
      if (value.calendar) {
        this.calendar = value.calendar;
        this.calendarGivenByWriteValue = true;
      }
      if (value.duration) this.duration = value.duration as Granularity;
      if (value.julian_day) this.julianDay = value.julian_day;

      const timePrimitive = new TimePrimitive({
        calendar: this.calendar,
        julianDay: this.julianDay,
        duration: this.duration,
      })
      const dt = timePrimitive.getDateTime(this.calendar);

      switch (timePrimitive.duration) {
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
    } else {
      this.clearForm()
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onBlur() {
    this.onTouched();
    this.blur.emit()
    this.focused = false;
  }

  onFocus() {
    this.focus.emit()
    this.focused = true;
  }



  /**
 * Custom class variables
 */
  // value properties
  julianDay: number
  duration: Granularity;
  calendar: CalendarType = 'julian'

  // custom logic
  gregorianDateTime = new GregorianDateTime();
  julianDateTime = new JulianDateTime();

  fieldNames = ['year', 'month', 'day', 'hours', 'minutes', 'seconds'];
  editingCalendar = false;
  timeInputsVisible = false;
  calendarGivenByWriteValue: boolean

  form: FormGroup;


  /**
   * Custom functions
   */


  ngAfterViewInit() {
    if (this.autofocus) setTimeout(() => { this.trigger.openMenu() })

    this.trigger.onMenuOpen.pipe(takeUntil(this.destroy$)).subscribe(() => {
      setTimeout(() => { this.yearInput.nativeElement.focus() })
    })
  }

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
      if (this.form.controls[this.fieldNames[i]].value || this.form.controls[fieldN].value === 0) return true;
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
      || this.form.controls.calendar.hasError('beforeGregorian')
    ) return true;
    return false;
  }

  setFormValue(year = null, month = null, day = null, hours = null, minutes = null, seconds = null) {

    this.form.setValue(
      {
        calendar: this.calendar,
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
  validateForm(component: CtrlTimePrimitiveComponent): Function {

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
      if (calendarField.pristine && fg.dirty && !this.calendarGivenByWriteValue) {
        const g = new GregorianDateTime();
        g.year = yearField.value;
        g.month = monthField.value;
        g.day = dayField.value;
        if (g.getJulianDay() >= 2299161 && calendarField.value !== 'gregorian') {
          calendarField.setValue('gregorian');
        } else if (g.getJulianDay() < 2299161 && calendarField.value !== 'julian') {
          calendarField.setValue('julian');
        }
      } else if (calendarField.dirty && yearField.value && monthField.value && dayField.value) {
        // RECALC DATE ON USER CHANGE CALENDAR
        // if calendar is dirty, the value got changed manually, and year, month,
        // and day are valid, recalculate the date

        // if user changed from gregorian to julian
        if (component.calendar === 'gregorian' && calendarField.value === 'julian' && calendarField.valid) {
          const g = new GregorianDateTime();
          g.year = yearField.value;
          g.month = monthField.value;
          g.day = dayField.value;
          const julianDay = g.getJulianDay();
          if (julianDay >= 2299161) {
            const j = new JulianDateTime();
            j.fromJulianDay(julianDay);
            component.calendar = 'julian';
            fg.patchValue({
              calendar: 'julian',
              year: j.year,
              month: j.month,
              day: j.day
            })
          }
        } else if (component.calendar === 'julian' && calendarField.value === 'gregorian') {
          // else if user changed from julian to gregorian
          const j = new JulianDateTime();
          j.year = yearField.value;
          j.month = monthField.value;
          j.day = dayField.value;
          const g = new GregorianDateTime();
          g.fromJulianDay(j.getJulianDay());
          component.calendar = 'gregorian';
          fg.patchValue({
            calendar: 'gregorian',
            year: g.year,
            month: g.month,
            day: g.day
          })
        }

      }


      // set calendar
      component.calendar = calendarField.value;
      let lengthOfMonth;

      if (calendarField.value === 'gregorian') {
        // Set gregorianDateTime values

        component.gregorianDateTime.year = yearField.value;
        component.gregorianDateTime.month = monthField.value;
        component.gregorianDateTime.day = dayField.value;
        component.gregorianDateTime.hours = hoursField.value;
        component.gregorianDateTime.minutes = minutesField.value;
        component.gregorianDateTime.seconds = secondsField.value;
        lengthOfMonth = component.gregorianDateTime.lengthOfMonth();

      } else if (calendarField.value === 'julian') {
        // Set julianDateTime values

        component.julianDateTime.year = yearField.value;
        component.julianDateTime.month = monthField.value;
        component.julianDateTime.day = dayField.value;
        component.julianDateTime.hours = hoursField.value;
        component.julianDateTime.minutes = minutesField.value;
        component.julianDateTime.seconds = secondsField.value;
        lengthOfMonth = component.julianDateTime.lengthOfMonth();
      }

      if (dayField.value > lengthOfMonth) {
        // Validate day is in length of month
        this.validationService.addError(dayField, 'dayMax', { 'max': lengthOfMonth });

      } else {

        this.validationService.removeError(dayField, 'dayMax');

      }

      // Valdiate that date not before introduction of gregorian calendar
      if (calendarField.value === 'gregorian' && yearField.value) {
        const julianDay = component.gregorianDateTime.getJulianDay();
        const errorName = 'beforeGregorian';
        if (julianDay < 2299161) {
          this.validationService.addError(calendarField, errorName, true)
        } else {
          this.validationService.removeError(calendarField, errorName)
        }
      }

    }
  }

  closeMenu() {
    this.trigger.closeMenu();
  }
  openMenu() {
    this.trigger.openMenu();
  }

  clearForm() {
    this.calendar = 'julian';
    this.setFormValue()
  }


}
