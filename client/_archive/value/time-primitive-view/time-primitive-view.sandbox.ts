import { registerLocaleData } from '@angular/common';
import localeDeCh from '@angular/common/locales/de-CH';
import { LOCALE_ID } from '@angular/core';
import { sandboxOf } from 'angular-playground';
import { InitStateModule } from '../../../../shared/components/init-state/init-state.module';
import { Information2Module } from '../../information.module';
import { TimePrimitiveViewComponent } from './time-primitive-view.component';


registerLocaleData(localeDeCh);


export default sandboxOf(TimePrimitiveViewComponent, {
  providers: [
    { provide: LOCALE_ID, useValue: 'en-US' },
  ],
  imports: [
    InitStateModule,
    Information2Module
  ],
  declareComponent: false
})
  .add('TimePrimitve | View with cal from Epr ', {
    context: {
      day1: {
        fk_property: 99,
        time_primitive: {
          duration: "1 day",
          julian_day: 1
        },
        entity_version_project_rels: [
          {
            calendar: "julian"
          }
        ]
      },
      may27Bc688: {
        fk_property: 99,
        time_primitive: {
          duration: "1 day",
          julian_day: 1477217
        },
        entity_version_project_rels: [
          {
            calendar: "julian"
          }
        ]
      },
      lastDayBeforeYear1: {
        fk_property: 99,
        time_primitive: {
          duration: "1 day",
          julian_day: 1721422
        },
        entity_version_project_rels: [
          {
            calendar: "julian"
          }
        ]
      },
      firstDayOfYear1: {
        fk_property: 99,
        time_primitive: {
          duration: "1 day",
          julian_day: 1721424
        },
        entity_version_project_rels: [
          {
            calendar: "julian"
          }
        ]
      },
      year2000: {
        fk_property: 152,
        time_primitive: {
          fk_class: 335,
          duration: '1 year',
          julian_day: 2451558
        },
        entity_version_project_rels: [
          {
            calendar: 'julian'
          }
        ]
      },
      year43BC: {
        fk_property: 99,
        time_primitive: {
          duration: "1 day",
          julian_day: 1705718
        },
        entity_version_project_rels: [
          {
            calendar: "julian"
          }
        ]
      }
    },
    template: `
        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-block">
              <p>
                <small>Day 1</small><br/>
                <gv-time-primitive-view [role]="day1" show="duration"></gv-time-primitive-view>
              </p>
              <p>
                <small>Aufgang der verfinsterten Sonne in Babylon (27. Mai 668 v. Chr.)</small><br/>
                <gv-time-primitive-view [role]="may27Bc688" show="duration"></gv-time-primitive-view>
              </p>
              <p>
                <small>Last Day Before Year 1</small><br/>
                <gv-time-primitive-view [role]="lastDayBeforeYear1" show="duration"></gv-time-primitive-view>
              </p>
              <p>
                <small>The year 43 Before</small><br/>
                <gv-time-primitive-view [role]="year43BC" show="duration"></gv-time-primitive-view>
              </p>
              <p>
                <small>First Day Of Year 1</small><br/>
                <gv-time-primitive-view [role]="firstDayOfYear1" show="duration"></gv-time-primitive-view>
              </p>
              <p>
                <small>The year 2000</small><br/>
                <gv-time-primitive-view [role]="year2000" show="duration"></gv-time-primitive-view>
              </p>
            </div>
        </div>`
  })
