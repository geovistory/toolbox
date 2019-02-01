import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { ClassConfig, TimePrimitive, U } from 'app/core';
import { ClassInstanceLabel, CollapsedExpanded, ExTimeLabel, FieldList } from 'app/core/state/models';
import { Observable, Subject, from, BehaviorSubject, combineLatest } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

@Component({
  selector: 'gv-te-ent-label',
  templateUrl: './te-ent-label.component.html',
  styleUrls: ['./te-ent-label.component.scss'],
  providers: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeEntLabelComponent implements OnInit, OnChanges, OnDestroy {

  destroy$ = new Subject<boolean>();

  @Output() onToggle = new EventEmitter<void>();

  @Input() fields$: Observable<FieldList>;
  @Input() childrenPath: string[];
  @Input() classConfig: ClassConfig
  @Input() toggle: CollapsedExpanded;
  @Input() labelInEdit: string;
  @Output() onLabelChange = new EventEmitter<ClassInstanceLabel>();

  toggle$ = new Subject<CollapsedExpanded>();

  label: ClassInstanceLabel;

  constructor(private datePipe: DatePipe) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.toggle) {
      this.toggle$.next(changes.toggle.currentValue)
    }
  }

  ngOnInit() {

    if (!this.childrenPath.length) throw Error('you must provide a childrenPath for <gv-te-ent-label>');

    combineLatest(this.fields$, this.toggle$).pipe(
      filter(items => items.filter(item => !!item).length > 0),
      takeUntil(this.destroy$)
    ).subscribe(([fields, toggle]) => {

      if (toggle === 'expanded') {

        // create full version label with all children
        this.label = U.labelFromFieldList(fields, { path: this.childrenPath })

      } else if (toggle === 'collapsed') {

        // create reduced label
        this.label = U.labelFromFieldList(fields, {
          path: this.childrenPath,
          fieldsMax: 3,
          rolesMax: 1
        })

      }
      this.onLabelChange.emit(this.label)
    })

    this.toggle$.next(this.toggle)
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
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
