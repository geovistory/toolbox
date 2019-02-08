import { sandboxOf } from 'angular-playground';

import { D3Service } from '../../shared/d3.service';
import { TimelineModule } from '../../timeline.module';
import { TimelineComponent } from './timeline.component';
import { timeLineData } from './timeline.component.sandbox.mock';
import { InitStateModule } from '../../../../shared/components/init-state/init-state.module';
import { TimeLineSettings } from '../../models/timeline';
import { TimeSpan, TimePrimitive } from 'app/core';





export default sandboxOf(TimelineComponent, {
  imports: [
    TimelineModule,
    InitStateModule
  ],
  declareComponent: false,
  providers: [
    D3Service
  ]
})

  .add('State: Flex-Item', {
    context: {
      timeLineData,
      state: {
        timelineSettings: {
        } as TimeLineSettings
      }
    },
    template: `
    <gv-init-state [sandboxState]="state"></gv-init-state>

    <div class="d-flex">

      <div class="d-flex flex-column mt-5 gv-grow-1" style="overflow:hidden">

        <div class="p-3 border"> some flex item </div>

          <gv-timeline class="border border-primary p-3" [data]="timeLineData" [path]="['timelineSettings']"></gv-timeline>

        <div class="p-3 border"> some flex item </div>

      </div> 
      
      
      <div class="d-flex flex-column mt-5">

        <div class="p-3 border"> some flex item </div>

          <gv-timeline class="border border-primary p-3" [data]="timeLineData" [path]="['timelineSettings']"></gv-timeline>

        <div class="p-3 border"> some flex item </div>

      </div>

    </div>


    `
  })
  .add('State: Mockdata', {
    context: {
      timeLineData,
      state: {
        timelineSettings: {
        } as TimeLineSettings
      }
    },
    template: `
    <gv-init-state [sandboxState]="state"></gv-init-state>

    <div class="d-flex flex-column mt-5" >
      <div class="p-3 border"> some flex item </div>
      <div class="d-flex d-flex-grow-1">
          <gv-timeline class="border border-primary p-3" [data]="timeLineData" [path]="['timelineSettings']"></gv-timeline>   
      </div>
      <div class="p-3 border"> some flex item </div>
    </div>
  `
  })
  .add('State: Empty', {
    template: `

    <div class="d-flex flex-column mt-5" >
      <div class="p-3 border"> some flex item </div>
      <div class="d-flex d-flex-grow-1">
          <gv-timeline class="border border-primary p-3"></gv-timeline>   
      </div>
      <div class="p-3 border"> some flex item </div>
    </div>
  `
  })
  .add('State: Min Width', {
    context: {
      timeLineData: {
        rows: [
          {
            accentuation: 'none',
            label: 'Birth: Max Muster',
            existenceTime: new TimeSpan({
              p81: new TimePrimitive({
                julianDay: 2394600,
                duration: '1 day',
                calendar: 'julian'
              })
            })
          },
        ]
      },
      state: {
        timelineSettings: {
        } as TimeLineSettings
      }
    },
    template: `
    <gv-init-state [sandboxState]="state"></gv-init-state>

    <div class="d-flex flex-column mt-5" >
      <div class="p-3 border"> some flex item </div>
      <div class="d-flex d-flex-grow-1">
          <gv-timeline class="border border-primary p-3" [data]="timeLineData" [path]="['timelineSettings']"></gv-timeline>   
      </div>
      <div class="p-3 border"> some flex item </div>
    </div>
  `
  })