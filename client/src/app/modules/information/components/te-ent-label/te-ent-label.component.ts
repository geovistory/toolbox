import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DataUnitLabel, RoleLabel, ExTimeLabel, DataUnitChildList } from '../../information.models';
import { DatePipe } from '@angular/common';
import { TimePrimitive, ClassConfig, U } from 'app/core';

@Component({
  selector: 'gv-te-ent-label',
  templateUrl: './te-ent-label.component.html',
  styleUrls: ['./te-ent-label.component.scss'],
  providers: [DatePipe]
})
export class TeEntLabelComponent implements OnChanges {

  @Input() children: DataUnitChildList;
  @Input() classConfig: ClassConfig
  @Input() labelInEdit:string;
  
  label: DataUnitLabel;

  constructor(private datePipe: DatePipe) { }

  ngOnChanges() {
    this.label = U.labelFromDataUnitChildList(this.children)
  }

  getExTLabel(d: ExTimeLabel) {
    let parts = [];
    if (d.earliest)
      parts.push(this.getTpLabel(d.earliest, 'duration'));
    if (d.latest)
    parts.push(this.getTpLabel(d.latest, 'duration'));

    return parts.join(' – ');
  }

  getTpLabel(p: TimePrimitive, show: 'duration' | 'firstSecond' | 'lastSecond'): string {

    const tp = new TimePrimitive(p)

    let dt = tp.getDateTime();

    switch (show) {

      case "duration":
        return this.datePipe.transform(dt.getDate(), tp.getShortesDateFormatString());

      case "firstSecond":
        return this.datePipe.transform(dt.getDate(), tp.getDateFormatString('1 second'));

      case "lastSecond":
        dt.toLastSecondOf(tp.duration);
        return this.datePipe.transform(dt.getDate(), tp.getDateFormatString('1 second'));

      default:
        return '';

    }
  }

}
