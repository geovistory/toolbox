import { Injectable } from '@angular/core';
import { sum } from 'ramda';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ViewFieldItemCountSumService {

  itemCountObservables = new BehaviorSubject<Observable<number>[]>([])
  sum$ = this.itemCountObservables.pipe(switchMap(observables => combineLatest(observables).pipe(map(counts => sum(counts)))))
  constructor() { }

  addItemCountObservable(itemCount$: Observable<number>) {
    this.itemCountObservables.next([...this.itemCountObservables.value, itemCount$])
  }
  removeItemCountObservable(itemCount$: Observable<number>) {
    this.itemCountObservables.next(this.itemCountObservables.value.filter(i => i !== itemCount$))
  }
}
