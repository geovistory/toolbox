import { sandboxOf } from 'angular-playground';

import { registerLocaleData } from '@angular/common';
import localeDeCh from '@angular/common/locales/de-CH';
registerLocaleData(localeDeCh);

import { DatePipe } from '@angular/common';

let year30 = new Date()
year30.setFullYear(30);
year30.setMonth(7); // -> August
year30.setDate(25);


export default sandboxOf(DatePipe, {
  declareComponent: false
})
  .add('Recent Date', {
    template: `
    <div class="d-flex justify-content-center mt-5">
      <div>
        {{'1900-01-01 00:00:00' | date : 'medium' : '' :'de-CH' }}
      </div>
    </div>
    `
  })
  .add('BC Date', {
    context: {
      input: '-001900-01-01 00:00:00',
      format: 'MMM d, y GG, h:mm:ss',
      locale: 'de-CH'
    },
    template: `
    <div class="d-flex justify-content-center mt-5">
      <div>

        <p>
          Input: {{input}}
        </p>
        <p>
          Format: {{format}}
        </p>
        <p>
          Locale: {{locale}}
        </p>
        <p>
          Output: {{input | date : format : '' : locale }}
        </p>

      </div>
    </div>
    `
  })
  .add('Year 30', {
    context: {
      input: year30,
      format: 'MMM d, y GG, h:mm:ss',
      locale: 'de-CH'
    },
    template: `
    <div class="d-flex justify-content-center mt-5">
      <div>

        <p>
          Input: {{input.toString()}}
        </p>
        <p>
          Format: {{format}}
        </p>
        <p>
          Locale: {{locale}}
        </p>
        <p>
          Output: {{input | date : format : '' : locale }}
        </p>

      </div>
    </div>
    `
  })
  ;