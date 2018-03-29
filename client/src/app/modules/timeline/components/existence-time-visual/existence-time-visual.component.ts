import { Component, OnInit, Input } from '@angular/core';
import { ExistenceTime } from '../../../information/components/existence-time';
import { XAxisDefinition } from '../../models/x-axis-definition';
import { TimePrimitive } from '../../../../core';

@Component({
  selector: '[existenceTimeVisual]',
  templateUrl: './existence-time-visual.component.html',
  styleUrls: ['./existence-time-visual.component.scss']
})
export class ExistenceTimeVisualComponent implements OnInit {
  
  inner:{start:Date, end:Date} = {
    start: undefined,
    end:undefined
  };

  @Input('existenceTimeVisual') existenceTimeOnXAxis : {existenceTime:ExistenceTime, xAxis:XAxisDefinition};

  constructor() { }

  ngOnInit() {
    this.createInnerRectangle()
  }

  createInnerRectangle(){
    const et = this.existenceTimeOnXAxis.existenceTime;

    if(et.p81 || (et.p81a && et.p81b)){

      if(et.p81a && et.p81b){
        this.inner.start = et.p81a.getEndDate();
        this.inner.end = et.p81b.getDate()
      }
    }

    
  }

}
