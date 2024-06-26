import { NgFor } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { TColFilter, TColFilterNum } from '@kleiolab/lib-sdk-lb4';
import { BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'gv-col-filter-numeric',
  templateUrl: './col-filter-numeric.component.html',
  styleUrls: ['./col-filter-numeric.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, NgFor, MatOptionModule, MatInputModule]
})
export class ColFilterNumericComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  @Output() filterChange = new EventEmitter<TColFilter | undefined>()

  operator$ = new BehaviorSubject<TColFilterNum.OperatorEnum>('=');
  value$ = new BehaviorSubject<string>(null); // input of type number returns a string

  operators: TColFilterNum.OperatorEnum[] = [
    '=', '<', '>'
  ]

  ngOnInit() {
    const debouncedVal$ = this.value$.pipe(
      filter((val) => val !== null),
      debounceTime(600));

    combineLatest([debouncedVal$, this.operator$]).pipe(
      takeUntil(this.destroy$)
    ).subscribe(([value, operator]) => {
      if (!value) this.filterChange.emit()
      else {
        const f: TColFilter = {
          numeric: { operator, value: parseFloat(value) }
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
