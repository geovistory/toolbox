import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { ClassConfig, TimePrimitive, U } from 'app/core';
import { CollapsedExpanded, DataUnitChildList, DataUnitLabel, ExTimeLabel } from 'app/core/state/models';

@Component({
  selector: 'gv-te-ent-label',
  templateUrl: './te-ent-label.component.html',
  styleUrls: ['./te-ent-label.component.scss'],
  providers: [DatePipe],
})
export class TeEntLabelComponent implements OnChanges {

  @Output() onToggle = new EventEmitter<void>();

  @Input() children: DataUnitChildList;
  @Input() childrenPath: string[];
  @Input() classConfig: ClassConfig
  @Input() toggle: CollapsedExpanded;
  @Input() labelInEdit: string;

  label: DataUnitLabel;

  constructor(private datePipe: DatePipe) { }

  ngOnChanges() {
    if (!this.childrenPath.length) throw Error('you must provide a childrenPath for <gv-te-ent-label>');

    if (this.toggle === 'expanded') {

      // create full version label with all children
      this.label = U.labelFromDataUnitChildList(this.children, { path: this.childrenPath })

    } else if (this.toggle === 'collapsed') {

      // create reduced label
      this.label = U.labelFromDataUnitChildList(this.children, {
        path: this.childrenPath,
        dataUnitChildrenMax: 2,
        rolesMax: 1
      })

    }
  }

  getExTLabel(d: ExTimeLabel) {
    const parts = [];
    if (d.earliest) {
      parts.push(this.getTpLabel(d.earliest, 'duration'));
    }
    if (d.latest) {
      parts.push(this.getTpLabel(d.latest, 'duration'));
    }

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

  // called when user clicks to toggle
  toggleClicked() {
    this.onToggle.emit()
  }
}
