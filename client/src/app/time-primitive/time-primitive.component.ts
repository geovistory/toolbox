import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidatorFn } from '@angular/forms';

import { Component, OnInit, EventEmitter } from '@angular/core';
import { GregorianDateTime } from '../shared/classes/date-time/gregorian-date-time';
import { JulianDateTime } from '../shared/classes/date-time/julian-date-time';
import { YearMonthDay } from '../shared/classes/date-time/interfaces';
import { ValidationService } from '../shared/services/validation.service';
import { DateTimeCommons, Granularity } from '../shared/classes/date-time/date-time-commons';


@Component({
  selector: 'gv-time-primitive',
  templateUrl: './time-primitive.component.html',
  styleUrls: ['./time-primitive.component.scss']
})
export class TimePrimitiveComponent implements OnInit {


  currentCal: 'gregorian' | 'julian';

  gregorianDateTime: GregorianDateTime;

  julianDateTime: JulianDateTime;

  timeInputsVisible: boolean;

  infoVisible: boolean;

  info: {
    duration?: string;
    gregStartIso?: string;
    gregEndIso?: string;
    julStartIso?: string;
    julEndIso?: string;
  };

  julianDayFromJulianCal: number;

  julianDayFromGregorianCal: number;

  // ISO-date-string of julian date that corresponds to current gregorianDateTime
  correspJulianDateIso: string;

  // ISO-date-string of gregorian date that corresponds to current julianDateTime
  correspGregorianDateIso: string;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService
  ) {
    this.gregorianDateTime = new GregorianDateTime();
    this.julianDateTime = new JulianDateTime();
  }

  ngOnInit() {
    this.infoVisible = true;
    this.info = {};
    this.createForm()
    this.onChanges();
  }

  createForm() {
    this.form = this.fb.group(
      {
        calendar: [
          'gregorian'
        ],
        year: [
          null,
          [
            Validators.required,
            Validators.min(-4713),
            Validators.max(3000)
          ]
        ],
        month: [
          null,
          [
            Validators.min(1),
            Validators.max(12)
          ]
        ],
        day: [null, Validators.min(1)],
        hours: [null, [Validators.min(0),Validators.max(23)]],
        minutes: [null, [Validators.min(0),Validators.max(59)]],
        seconds: [null, [Validators.min(0),Validators.max(59)]]
      },
      {
        validator: this.validateForm(this)
      }
    );

  }


  /**
  * Validate the form and update the component's values
  */
  validateForm(component: TimePrimitiveComponent): Function {

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


  onChanges(): void {
    this.form.valueChanges.subscribe(val => {
      if (this.form && this.form.status === 'VALID') {

        // update duration
        this.updateDurationInfo();

        // update Gregorian Info
        this.updateGregorianInfo();

        // update Julian Info
        this.updateJulianInfo();

      }
    });
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
      this.info.gregStartIso = this.gregorianDateTime.getTimeStamp();
      this.info.gregEndIso = this.gregorianDateTime.getEndDateTime().getTimeStamp();
    }
    else if (this.currentCal === 'julian') {
      const jd = this.julianDateTime.getJulianDay();
      if (jd >= 2299161) {
        const gdt = new GregorianDateTime(this.julianDateTime);
        gdt.fromJulianDay(jd);
        this.info.gregStartIso = gdt.getTimeStamp();
        this.info.gregEndIso = gdt.getEndDateTime().getTimeStamp();
      }else{
        this.info.gregStartIso = undefined;
        this.info.gregEndIso = undefined;
      }
    }
  }

  updateJulianInfo() {
    if (this.currentCal === 'julian') {
      this.info.julStartIso = this.julianDateTime.getTimeStamp();
      this.info.julEndIso = this.julianDateTime.getEndDateTime().getTimeStamp();
    }
    else if (this.currentCal === 'gregorian') {
      const jd = this.gregorianDateTime.getJulianDay();
      const jdt = new JulianDateTime(this.gregorianDateTime);
      jdt.fromJulianDay(jd);
      this.info.julStartIso = jdt.getTimeStamp();
      this.info.julEndIso = jdt.getEndDateTime().getTimeStamp();
    }
  }

  updateCorrespJuilanDate() {

    this.correspJulianDateIso = undefined;

    if (this.form && this.form.status == 'VALID') {

      const jd = this.gregorianDateTime.getJulianDay();

      const jdt = new JulianDateTime()
      jdt.fromJulianDay(jd);

      this.correspJulianDateIso = jdt.getTimeStamp();
    }
  }


  julianDayChange(julianDay) {
    this.julianDateTime.fromJulianDay(parseInt(julianDay))
  }

  gregorianDayChange(julianDay) {
    this.gregorianDateTime.fromJulianDay(parseInt(julianDay))
  }


  showTimeInputs() {
    this.timeInputsVisible = true;
  }

  hideTimeInputs() {
    this.timeInputsVisible = false;
    this.form.patchValue({
      hours:0,minutes:0,seconds:0
    })
  }


  showInfo() {
    this.infoVisible = true;
  }

  hideInfo() {
    this.infoVisible = false;
  }

  onSubmit() {

    if (this.form.valid) {
      this.form.controls.calendar.value

      if (this.currentCal === 'gregorian') {
        console.log("Greg: Julian Day: " + this.gregorianDateTime.getJulianDay());
        console.log("Duration: " + this.gregorianDateTime.getGranularity());
      }
      else if (this.currentCal === 'julian') {
        console.log("Jul: Julian Day: " + this.julianDateTime.getJulianDay());
        console.log("Duration: " + this.julianDateTime.getGranularity());
      }
    } else {
      // show all error messages
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }
}
