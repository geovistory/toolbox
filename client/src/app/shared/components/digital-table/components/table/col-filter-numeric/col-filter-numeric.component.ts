import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { DatColumn, TColFilterOpNumeric, TColFilter, TColFilters } from '../../../../../../../../../src/server/table/interfaces';
import { MatSelectChange } from '@angular/material/select';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { filter, debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'gv-col-filter-numeric',
  templateUrl: './col-filter-numeric.component.html',
  styleUrls: ['./col-filter-numeric.component.scss']
})
export class ColFilterNumericComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  @Output() filterChange = new EventEmitter<TColFilter | undefined>()

  operator$ = new BehaviorSubject<TColFilterOpNumeric>('=');
  value$ = new BehaviorSubject<number>(null);

  operators: TColFilterOpNumeric[] = [
    '=', '<', '>'
  ]

  constructor() { }

  ngOnInit() {
    const debouncedVal$ = this.value$.pipe(
      filter((val) => val !== null),
      debounceTime(600));

    combineLatest(debouncedVal$, this.operator$).pipe(
      takeUntil(this.destroy$)
    ).subscribe(([value, operator]) => {
      if (!value) this.filterChange.emit()
      else {
        const f: TColFilter = {
          numeric: { operator, value }
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
  onValueChange(val: number) {
    this.value$.next(val)
  }

  ngOnDestroy() {
    this.filterChange.emit()
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
