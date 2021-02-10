import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { DatColumn, TColFilterOpText, TColFilter } from '../../../../../../../../../../../server/src/lb3/server/table/interfaces';
import { MatSelectChange } from '@angular/material';
import { Subject, BehaviorSubject, combineLatest } from 'rxjs';
import { takeUntil, debounceTime, filter } from 'rxjs/operators';
import { combineLatestOrEmpty } from 'projects/toolbox/src/app/core/util/combineLatestOrEmpty';

@Component({
  selector: 'gv-col-filter-text',
  templateUrl: './col-filter-text.component.html',
  styleUrls: ['./col-filter-text.component.scss']
})
export class ColFilterTextComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<boolean>();

  @Output() filterChange = new EventEmitter<TColFilter | undefined>()

  operator$ = new BehaviorSubject<TColFilterOpText>('%iLike%');
  value$ = new BehaviorSubject<string>(null);

  constructor() { }

  ngOnInit() {
    const debouncedVal$ = this.value$.pipe(
      filter((val) => val !== null),
      debounceTime(600));

    combineLatest(debouncedVal$, this.operator$).pipe(
      takeUntil(this.destroy$)
    ).subscribe(([value, operator]) => {
      if (value === '') this.filterChange.emit()
      else {
        const f: TColFilter = {
          text: { operator, value }
        }
        this.filterChange.emit(f)
      }
    })
  }

  /**
   * listen to user changes regarding the operator
   * @param val
   */
  onOperatorChange(val: MatSelectChange) {
    this.operator$.next(val.value)
  }

  /**
   * listen to user changes regarding the string value
   * @param val
   */
  onValueChange(val: string) {
    this.value$.next(val)
  }

  ngOnDestroy() {
    this.filterChange.emit()
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
