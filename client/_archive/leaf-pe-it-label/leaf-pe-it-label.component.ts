import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {  ClassInstanceLabel, RoleLabel, ExTimeLabel, FieldList } from 'app/core/state/models';
import { DatePipe } from '@angular/common';
import { TimePrimitive, ClassConfig, U } from 'app/core';

@Component({
  selector: 'gv-leaf-pe-it-label',
  templateUrl: './leaf-pe-it-label.component.html',
  styleUrls: ['./leaf-pe-it-label.component.scss'],
  providers: [DatePipe]
})
export class LeafPeItLabelComponent implements OnChanges {

  @Input() children: FieldList;
  @Input() classConfig: ClassConfig
  @Input() labelInEdit: string;

  label:  ClassInstanceLabel;

  constructor(private datePipe: DatePipe) { }

  ngOnChanges() {
    this.label = U.labelFromFieldList(this.children, { path: [] })
  }

  getExTLabel(d: ExTimeLabel) {
    const parts = [];
    if (d.earliest) parts.push(this.getTpLabel(d.earliest, 'duration'));
    if (d.latest) parts.push(this.getTpLabel(d.latest, 'duration'));

    return parts.join(' – ');
  }

  getTpLabel(p: TimePrimitive, show: 'duration' | 'firstSecond' | 'lastSecond'): string {

    const tp = new TimePrimitive(p)

    const dt = tp.getDateTime();

    switch (show) {

      case 'duration':
        return this.datePipe.transform(dt.getDate(), tp.getShortesDateFormatString());

      case 'firstSecond':
        return this.datePipe.transform(dt.getDate(), tp.getDateFormatString('1 second'));

      case 'lastSecond':
        dt.toLastSecondOf(tp.duration);
        return this.datePipe.transform(dt.getDate(), tp.getDateFormatString('1 second'));

      default:
        return '';

    }
  }

}