import { Component, Input, OnDestroy, Output, EventEmitter, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CoreTable } from 'app/shared/components/core-table/table';
import { Observable, of, Subject } from 'rxjs';
import { delay, exhaustMap, filter, map, tap, takeUntil, first } from 'rxjs/operators';
import { ColDef } from '../col-def-editor/col-def-editor.component';

export interface Example {
  id: number;
  name: string;
}


@Component({
  selector: 'gv-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.scss']
})
export class ResultTableComponent extends CoreTable<Example> implements OnDestroy, AfterViewInit {
  $destroy = new Subject();
  @Input() data$: Observable<any[]>;
  @Input() pending$: Observable<boolean>;

  @Input() colDef: ColDef[];
  @Input() columns: string[];
  @Input() limit: number;

  sticky: boolean;

  @Output() rangeChange = new EventEmitter<{ start: number, end: number }>();

  headerTop$: Observable<number>;

  constructor(
    private ref: ChangeDetectorRef
  ) {
    super();
  }

  onInit() {
    this.set([]);

    let dataRefreshs = 0;
    this.data$.pipe(
      tap(() => dataRefreshs++),
      takeUntil(this.$destroy)
    ).subscribe(data => {
      // if (dataRefreshs === 1) {
      //   this.set(data);
      // } else {
      // }
      this.dataSource.allData = data;

      if (data.length === 0) {
        this.viewport.scrollTo({ top: 0, left: 0 })
      }
    })


    this.headerTop$ = this.viewport.renderedRangeStream.pipe(
      map(() => -this.viewport.getOffsetToRenderedContentStart())
    );

    // fake infinite scroll

    this.viewport.renderedRangeStream.subscribe(({ start, end }) => {
      this.rangeChange.emit({ start, end })
    });
  }

  afterViewInit() {
    this.sticky = true;
    this.ref.detectChanges()
  }

  ngOnDestroy() {
    this.$destroy.next()
    this.$destroy.unsubscribe()
  }
}
