import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { QueryTree } from '../../containers/query-detail/query-detail.component';
import { MatSelectChange, MatOption } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { takeUntil, filter, map } from 'rxjs/operators';
import { equals, uniq } from 'ramda';
export interface PropertyOption { propertyFieldKey: string, isOutgoing: boolean, pk: number, label: string };
@Component({
  selector: 'gv-property-select',
  templateUrl: './property-select.component.html',
  styleUrls: ['./property-select.component.scss']
})
export class PropertySelectComponent implements AfterViewInit, OnDestroy, OnInit {
  destroy$ = new Subject<void>();

  @Input() qtree: QueryTree;
  @Input() options$: Observable<PropertyOption[]>;
  @Output() selectionChanged = new EventEmitter<PropertyOption[]>();
  @ViewChildren(MatOption) matOptions: QueryList<MatOption>;

  selected$: Observable<PropertyOption[]>;

  selected: PropertyOption[];

  constructor() { }

  ngOnInit() {

    this.options$.pipe(
      map(options => options.filter(option => this.createSelectedIds(this.selected).indexOf(option.propertyFieldKey) > -1))
    ).subscribe(selected => {
      this.selected = selected;
      this.selectionChanged.emit(selected);
    })
  }
  ngAfterViewInit() {


    this.matOptions.changes.pipe(takeUntil(this.destroy$)).subscribe(matOptions => {
      // if (this.matOptions.toArray().length) {

      const selected = []
      this.matOptions.forEach(matOption => {
        if (
          this.createSelectedIds(this.selected).indexOf(matOption.id) > -1
          && !matOption.selected
        ) {
          matOption.select()
          selected.push(matOption.value)
        };
      });
      // if (!equals(this.selectedIds, this.createSelectedIds(selected))) {
      //   this.selectionChanged.emit(selected);
      //   // this.selectedIds = this.createSelectedIds(selected);
      // }

      // }
    })
  }

  selectionChange(e: MatSelectChange) {

    const newSelection = uniq(e.value) as PropertyOption[];

    if (!equals(this.createSelectedIds(newSelection), this.createSelectedIds(this.selected))) {
      this.qtree.data = {
        ...this.qtree.data,
        outgoingProperties: newSelection.filter(p => p.isOutgoing === true).map(p => p.pk),
        ingoingProperties: newSelection.filter(p => p.isOutgoing === false).map(p => p.pk),
      }
      this.selectionChanged.emit(newSelection);
      this.selected = newSelection;
    }
  }

  private createSelectedIds(selected: PropertyOption[]): string[] {
    if(!selected) return [];
    return selected.map(x => x.propertyFieldKey);
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }


}
