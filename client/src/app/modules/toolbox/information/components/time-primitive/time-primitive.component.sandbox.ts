import { sandboxOf } from 'angular-playground';

import { ReactiveFormsModule } from '@angular/forms';

import { registerLocaleData, DatePipe } from '@angular/common';
import localeDeCh from '@angular/common/locales/de-CH';
registerLocaleData(localeDeCh);


import { TimePrimitiveComponent } from './time-primitive.component';
import { TimePrimitive, ValidationService } from 'app/core';



export default sandboxOf(TimePrimitiveComponent, {
  providers: [
    ValidationService,
    DatePipe
  ]
})
  .add('State: Edit – new', {
    template: `
    <div class="d-flex justify-content-center mt-5">
      <div style="width:430px">
        <gv-time-primitive [state]="'edit'">Hey playground!</gv-time-primitive>
      </div>
    </div>
    `
  })
  .add('State: Edit – existing', {
    context: {
      tp: new TimePrimitive({
        'julianDay': 2444270,
        'duration': '1 year',
        'calendar':'gregorian'
      })
    },
    template: `
    <div class="d-flex justify-content-center mt-5">
      <div style="width:430px">
        <gv-time-primitive [state]="'edit'" [timePrimitive]="tp"></gv-time-primitive>
      </div>
    </div>
    `
  })
  .add('State: Editable – existing', {
    context: {
      tp: new TimePrimitive({
        'julianDay': 2444270,
        'duration': '1 year',
        'calendar':'gregorian'
      })
    },
    template: `
    <div class="d-flex justify-content-center mt-5">
      <div style="width:430px">
        <gv-time-primitive [state]="'editable'" [timePrimitive]="tp"></gv-time-primitive>
      </div>
    </div>
    `
  })
  .add('State: View – firstSecond of 1980', {
    context: {
      tp: new TimePrimitive({
        'julianDay': 2444270,
        'duration': '1 year'
      })
    },
    template: `
    <div class="d-flex justify-content-center mt-5">
      <div style="width:430px">
        <gv-time-primitive [state]="'view'" [show]="'firstSecond'" currentCal="gregorian" [timePrimitive]="tp"></gv-time-primitive>
      </div>
    </div>
    `
  })
  .add('State: View – lastSecond of 1980', {
    context: {
      tp: new TimePrimitive({
        'julianDay': 2444240,
        'duration': '1 year'
      })
    },
    template: `
    <div class="d-flex justify-content-center mt-5">
      <div style="width:430px">
        <gv-time-primitive [state]="'view'" [show]="'lastSecond'" currentCal="gregorian" [timePrimitive]="tp"></gv-time-primitive>
      </div>
    </div>
    `
  })
  .add('State: View – duration of 1 year', {
    context: {
      tp: new TimePrimitive({
        'julianDay': 2444240,
        'duration': '1 year'
      })
    },
    template: `
      <div class="d-flex justify-content-center mt-5">
        <div style="width:430px">
          <gv-time-primitive [state]="'view'" [show]="'duration'" currentCal="gregorian" [timePrimitive]="tp"></gv-time-primitive>
        </div>
      </div>
      `
  })
  .add('State: View – duration of 1 month', {
    context: {
      tp: new TimePrimitive({
        'julianDay': 2444271,
        'duration': '1 month'
      })
    },
    template: `
      <div class="d-flex justify-content-center mt-5">
        <div style="width:430px">
          <gv-time-primitive [state]="'view'" [show]="'duration'" currentCal="gregorian" [timePrimitive]="tp"></gv-time-primitive>
        </div>
      </div>
      `
  })
  .add('State: View – duration of 1 day', {
    context: {
      tp: new TimePrimitive({
        'julianDay': 2444275,
        'duration': '1 day'
      })
    },
    template: `
      <div class="d-flex justify-content-center mt-5">
        <div style="width:430px">
          <gv-time-primitive [state]="'view'" [show]="'duration'" currentCal="gregorian" [timePrimitive]="tp"></gv-time-primitive>
        </div>
      </div>
      `
  })
  .add('State: View – duration of 1 hour', {
    context: {
      tp: new TimePrimitive({
        'julianDay': 2444275,
        'duration': '1 hour'
      })
    },
    template: `
      <div class="d-flex justify-content-center mt-5">
        <div style="width:430px">
          <gv-time-primitive [state]="'view'" [show]="'duration'" currentCal="gregorian" [timePrimitive]="tp"></gv-time-primitive>
        </div>
      </div>
      `
  });;