import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ViewChildren, QueryList, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FilterTree, FilterTreeData } from '../../containers/query-detail/query-detail.component';
import { MatSelectChange, MatOption } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { takeUntil, filter, map } from 'rxjs/operators';
import { equals, uniq } from 'ramda';
import { propertyFieldKeyFromParams } from 'app/core/state/services/state-creator';
export interface PropertyOption { propertyFieldKey: string, isOutgoing: boolean, pk: number, label: string };
@Component({
  selector: 'gv-property-select',
  templateUrl: './property-select.component.html',
  styleUrls: ['./property-select.component.scss']
})
export class PropertySelectComponent implements AfterViewInit, OnDestroy, OnInit {
  destroy$ = new Subject<void>();

  @Input() qtree: FilterTree;
  @Input() options$: Observable<PropertyOption[]>;
  @Output() selectionChanged = new EventEmitter<PropertyOption[]>();
  @ViewChildren(MatOption) matOptions: QueryList<MatOption>;

  selected$: Observable<PropertyOption[]>;

  // selected: PropertyOption[];

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit() {

    this.options$.pipe(
      map(options => options.filter(option => this.getSelectedIds().indexOf(option.propertyFieldKey) > -1))
    ).subscribe(selected => {
      this.setSelectedIds(selected);
      // this.selectionChanged.emit(selected);
    })
  }
  ngAfterViewInit() {

    this.reselectMatOptions();

    this.matOptions.changes.pipe(takeUntil(this.destroy$)).subscribe(matOptions => {
      this.reselectMatOptions();
    })

  }

  reselectMatOptions() {
    this.matOptions.forEach(matOption => {
      if (
        this.getSelectedIds().indexOf(matOption.id) > -1
        && !matOption.selected
      ) {
        matOption.select()
        this.ref.detectChanges()
      };
    });
  }

  selectionChange(e: MatSelectChange) {

    const newSelection = uniq(e.value) as PropertyOption[];

    if (!equals(this.createSelectedIds(newSelection), this.getSelectedIds())) {
      this.qtree.data = {
        ...this.qtree.data,
        outgoingProperties: newSelection.filter(p => p.isOutgoing === true).map(p => p.pk),
        ingoingProperties: newSelection.filter(p => p.isOutgoing === false).map(p => p.pk),
      }
      // this.selected = newSelection;
    }
    this.selectionChanged.emit(newSelection);
  }

  private createSelectedIds(selected: PropertyOption[]): string[] {
    if (!selected) return [];
    return selected.map(x => x.propertyFieldKey);
  }

  private getSelectedIds(): string[] {
    return [
      ...((this.qtree.data || {}).ingoingProperties || []).map(pk => propertyFieldKeyFromParams(pk, false)),
      ...((this.qtree.data || {}).outgoingProperties || []).map(pk => propertyFieldKeyFromParams(pk, true)),
    ]
  }

  setSelectedIds(selected: PropertyOption[]) {
    this.qtree.data = {
      ...this.qtree.data,
      outgoingProperties: selected.filter(p => p.isOutgoing === true).map(p => p.pk),
      ingoingProperties: selected.filter(p => p.isOutgoing === false).map(p => p.pk),
    }
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }


}
