import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, AfterViewInit } from '@angular/core';
import { MatSelectChange } from '@angular/material';
import { ActiveProjectService, ComConfig, PropertyField } from 'app/core';
import { Observable, Subject, combineLatest, BehaviorSubject } from 'rxjs';
import { first, map, takeUntil, filter } from 'rxjs/operators';
import { FilterTree, FilterTreeData } from '../../containers/query-detail/query-detail.component';
import { PropertyOption } from '../property-select/property-select.component';
import { uniq } from 'ramda';
import { QueryService } from '../../services/query.service';

@Component({
  selector: 'gv-property-filter',
  templateUrl: './property-filter.component.html',
  styleUrls: ['./property-filter.component.scss']
})
export class PropertyFilterComponent implements OnInit, OnDestroy, AfterViewInit {
  destroy$ = new Subject<void>();

  @Input() qtree: FilterTree;
  @Input() propertyOptions$: Observable<PropertyOption[]>;

  @Output() remove = new EventEmitter<void>();
  @Output() validChanged = new EventEmitter<boolean>();

  pkProperties: number[];

  // the pkClasses get derived from the selctedProperties
  pkClasses$ = new BehaviorSubject<number[] | null>(null);

  selectedOperator;

  selectedProperties$ = new BehaviorSubject<PropertyOption[] | null>(null);
  get selectedProperties() {
    return this.selectedProperties$.value;
  }
  set selectedProperties(val: PropertyOption[]) {
    this.selectedProperties$.next(val)
  }

  valid: boolean;

  get showAddSubwqueryBtn(): boolean {
    return this.valid;
  }
  constructor(public p: ActiveProjectService, private q: QueryService) {
  }

  ngOnInit() {

    this.selectedProperties$.pipe(
      this.q.targetClassesOfPropertyOptions(),
      takeUntil(this.destroy$)
    ).subscribe(pks => {
      this.pkClasses$.next(pks)
    })

    if (this.qtree && this.qtree.data && this.qtree.data.operator) {
      this.selectedOperator = this.qtree.data.operator;
    }

  }

  ngAfterViewInit() {
    this.setValid();
  }


  addChild() {
    this.qtree.children.push(new FilterTree({
      subgroup: 'classAndType'
    }));
  }

  removeChild(i) {
    this.qtree.children.splice(i, 1)
  }

  // selection of the operator changed
  operatorSelectionChange(e: MatSelectChange) {
    const val = e.value;
    this.qtree.data = {
      ...this.qtree.data,
      operator: val
    }
  }

  // selection of the properties changed
  propertySelectionChange(selection: PropertyOption[]) {
    this.selectedProperties = selection;
    this.setValid();
  }


  setValid() {
    this.valid = [
      ...(this.qtree.data.outgoingProperties || []),
      ...(this.qtree.data.ingoingProperties || [])
    ].length > 0;
    this.validChanged.emit(this.valid)
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }
}
