import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';
import { TColFilter, TColFilterOpText } from '../../../../../../../../../../../server/src/lb3/server/table/interfaces';

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
  onValueChange(val: KeyboardEvent) {
    const target = val.target as HTMLInputElement
    this.value$.next(target.value)
  }

  ngOnDestroy() {
    this.filterChange.emit()
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
