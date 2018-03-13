import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidatorFn } from '@angular/forms';




import { Component, OnInit, EventEmitter } from '@angular/core';
import { GregorianDateTime } from '../shared/classes/date-time/gregorian-date-time';
import { JulianDateTime } from '../shared/classes/date-time/julian-date-time';
import { YearMonthDay } from '../shared/classes/date-time/interfaces';


type Granularity =
  '1 century' |
  '1 decade' |
  '1 year' |
  '1 month' |
  '1 day' |
  '1 hour' |
  '1 minute' |
  '1 second';


class TimePrimitive {

  julianDay?: number;
  duration?: Granularity;

  constructor() {
  }

  updateDuration(year, month, day, hours, minutes, seconds) {
    this.duration = undefined;
    if (year) { this.duration = "1 year" }
    if (month) { this.duration = "1 month" }
    if (day) { this.duration = "1 day" }
    if (hours) { this.duration = "1 hour" }
    if (minutes) { this.duration = "1 minute" }
    if (seconds) { this.duration = "1 second" }
  }


}

@Component({
  selector: 'gv-pe-it-date',
  templateUrl: './pe-it-date.component.html',
  styleUrls: ['./pe-it-date.component.scss']
})
export class PeItDateComponent implements OnInit {

  tp: TimePrimitive;

  gregorianDateTime: GregorianDateTime;

  julianDateTime: JulianDateTime;

  timeInputsVisible: boolean;

  julianDayFromJulianCal: number;

  julianDayFromGregorianCal: number;

  gregorianForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.tp = new TimePrimitive();
    this.gregorianDateTime = new GregorianDateTime();

    this.gregorianDateTime.year = 1600;

    this.julianDateTime = new JulianDateTime();

    this.gregorianDateTime.onDateChange.subscribe((ymd: YearMonthDay) => {

      this.julianDayFromGregorianCal = this.gregorianDateTime.getJulianDay();

      // this.julianDateTime.fromJulianDay(this.gregorianDateTime.getJulianDay())

    })

    this.julianDateTime.onDateChange.subscribe((ymd: YearMonthDay) => {

      this.julianDayFromJulianCal = this.julianDateTime.getJulianDay();

      // this.gregorianDateTime.fromJulianDay(this.julianDateTime.getJulianDay())
    })
    this.createGregorianForm()
  }


  createGregorianForm() {
    this.gregorianForm = this.fb.group(
      {
        year: [null, Validators.required],
        month: [
          this.gregorianDateTime.month,
          [
            Validators.min(1),
            Validators.max(12)
          ]
        ],
        day: [null],
      },
      {
        validator: this.dateValidationFunction(this.gregorianDateTime)
      }
    );

  }


  /**
   * A date must exist in the calendar. Especially 29. January depends on
   * the leap year rule of the calendar.
   */
  dateValidationFunction(dateTimeInstance): Function {
    return (formGroup: FormGroup): void => {
      let yearField = formGroup.controls['year'];
      let monthField = formGroup.controls['month'];
      let dayField = formGroup.controls['day'];

      dateTimeInstance.year = yearField.value;
      dateTimeInstance.month = monthField.value;
      dateTimeInstance.day = dayField.value;

      // compare field1 to field2
      // if(error) {
      //   field1.setError({formGroupValidationFunction:true});
      //   field2.setError({formGroupValidationFunction:true});
      // }
    }
  }

  /**
   * This field requires those other fields.
   *
   * @param {string} field  Name of field that requires other fields
   * @param {Array<String>} requiredFields Array with names of required fields
   */
  requiredBy(requiredFields: string[], byField: string): Function {
    return (formGroup: FormGroup): void => {

      // field that requires other fields
      let f = formGroup.controls[byField];

      // if this field has a valid value
      if (f.value && f.valid) {

        // check validate required fields
        requiredFields.forEach(fieldname => {
          var reqF = formGroup.controls[fieldname];

          if(!f.value || !f.valid){
            var validatorName = 'requiredBy'+byField;
            var error = {};
            error[validatorName]=true;
            reqF.setErrors(error)
          }

        })

      }

      let monthField = formGroup.controls['month'];
      let dayField = formGroup.controls['day'];


    }
  }


  /**
   * A gregorian date must be later than 1582.10.15. Otherwise the choosen
   * calenadar is wrong.
   */
  monthOutsideRangeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const outsideRange = control.value > 12 || control.value < 1;
      return outsideRange ? { 'outsideRange': { value: control.value } } : null;
    };
  }





  ngOnInit() {
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
  }



  ok() {
    console.log()
  }
}
