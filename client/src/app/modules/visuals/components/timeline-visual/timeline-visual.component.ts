
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActiveProjectService, TimeSpan, EntityPreview } from 'app/core';
import { TimeLineData, TimeLineRow, TimeLineSettings } from 'app/modules/timeline/models/timeline';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

export interface TimeLineDataSetSettings {
  queryPk: number
  queryVersion: number

  // Column used to create timespans
  temporalCol: string;

  // Column used to create labels

  color?: string // RGB string like #FFFFFF
}

export interface TimelineVisualSettings {
  dataSets: TimeLineDataSetSettings[]
}


@Component({
  selector: 'gv-timeline-visual',
  templateUrl: './timeline-visual.component.html',
  styleUrls: ['./timeline-visual.component.scss']
})
export class TimelineVisualComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();

  timelineData$: Observable<TimeLineData>
  timelineSettings: TimeLineSettings = {};

  @Output() cursorChange = new EventEmitter<number>();

  // initialize a private variable _settings, it's a BehaviorSubject
  _settings$ = new BehaviorSubject<TimelineVisualSettings>(null);

  // change settings to use getter and setter
  @Input() settings$: Observable<TimelineVisualSettings>;

  get settings() {
    // get the latest value from _settings BehaviorSubject
    return this._settings$.getValue();
  }

  // initialize a  variable _data, it's a BehaviorSubject
  _data$ = new BehaviorSubject<{ [key: string]: any[] }>({});
  @Input() data$: Observable<{ [key: string]: any[] }>;

  constructor(private p: ActiveProjectService) {

    this.timelineData$ = combineLatest(this._data$, this._settings$).pipe(
      filter(([d, s]) => !!d && !!s),
      map(([d, s]) => {

        let timeLineRows: TimeLineRow[] = [];

        // Iterate over each data set to visualize
        // a data set could be visualized as a line (with a color) or
        // as a table with the time span for each temporal entity
        s.dataSets.map(dataSet => {
          const key = (dataSet.queryPk + '_' + dataSet.queryVersion);
          let dataSetRows: TimeLineRow[] = [];
          if (!d || !d[key]) {
            this.p.loadQueryVersion(dataSet.queryPk, dataSet.queryVersion)
            return;
          } else {
            const rows = d[key];
            // TODO add different types of timeline visualizations here

            if (dataSet.temporalCol) {
              dataSetRows = [];
              const addRow = (entityPreview: EntityPreview) => {
                const row: TimeLineRow = {
                  entityPreview,
                  accentuation: 'none',
                  label: entityPreview.class_label + ' ' + entityPreview.entity_label,
                  existenceTime: new TimeSpan(entityPreview.time_span),
                  color: dataSet.color
                }
                dataSetRows.push(row)
              }
              rows.forEach(row => {
                const value = row[dataSet.temporalCol];
                // if the temporal column is the root entity, we have no array
                // else we have an array
                if (Array.isArray(value)) {
                  (value as EntityPreview[]).forEach(e => addRow(e))
                } else {
                  addRow(value)
                }
              })

              dataSetRows.sort((a, b) => (a.existenceTime.earliestDay > b.existenceTime.earliestDay ? 1 : -1))
            }
          }

          timeLineRows = [...timeLineRows, ...dataSetRows]

        })

        const t: TimeLineData = {
          rows: timeLineRows
        }
        return t
      })
    )

  }

  ngOnInit() {
    this.data$.pipe(takeUntil(this.destroy$)).subscribe(d => this._data$.next(d))
    this.settings$.pipe(takeUntil(this.destroy$)).subscribe(d => this._settings$.next(d))
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }

}
