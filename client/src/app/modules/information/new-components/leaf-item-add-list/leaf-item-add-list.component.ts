import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { SelectionModel } from '../../../../../../node_modules/@angular/cdk/collections';
import { Observable, Subject } from '../../../../../../node_modules/rxjs';
import { first, takeUntil, map } from '../../../../../../node_modules/rxjs/operators';
import { ActiveProjectService, InfRole, InfTextProperty } from '../../../../core';
import { InfActions } from '../../../../core/inf/inf.actions';
import { ItemList, ListDefinition, Item, RoleItemBasics, TextPropertyItem } from '../properties-tree/properties-tree.models';
import { PropertyTreeService } from '../properties-tree/properties-tree.service';
import { MatSelectionList, MatListOption, MatTableDataSource } from '../../../../../../node_modules/@angular/material';


@Component({
  selector: 'gv-leaf-item-add-list',
  templateUrl: './leaf-item-add-list.component.html',
  styleUrls: ['./leaf-item-add-list.component.scss']
})
export class LeafItemAddListComponent implements OnInit, AfterViewInit {
  destroy$ = new Subject<boolean>();

  // @ViewChild(MatSelectionList) selectionList: MatSelectionList;

  @Input() pkEntity: number;

  @Input() listDefinition: ListDefinition;
  @Input() readonly$: Observable<boolean>
  @Input() showOntoInfo$;
  @Input() addButtonVisible;
  @Input() toggleButtonVisible;

  items$: Observable<ItemList>
  itemsCount$: Observable<number>

  dataSource = new MatTableDataSource<Item>();

  displayedColumns: string[];

  selectedCount$: Observable<number>
  selection: SelectionModel<Item>;


  constructor(
    public p: ActiveProjectService,
    public t: PropertyTreeService,
    public inf: InfActions
  ) { }

  ngOnInit() {
    this.items$ = this.t.pipeAlternativeList(this.listDefinition, this.pkEntity)
    this.itemsCount$ = this.items$.map(i => (i || []).length)


    this.items$.pipe(takeUntil(this.destroy$)).subscribe(items => {
      this.dataSource.data = items;
    })

    const allowMultiSelect = this.listDefinition.targetMaxQuantity === 1 ? false : true;

    allowMultiSelect ?
      this.displayedColumns = ['checkbox', 'item', 'projects'] :
      this.displayedColumns = ['radiobutton', 'item', 'projects'];

    const initialSelection = [];
    this.selection = new SelectionModel<Item>(allowMultiSelect, initialSelection);
    this.selectedCount$ = this.selection.changed.pipe(
      map(s => s.source.selected.length)
    )

  }

  ngAfterViewInit() {
    // this.selectionList.selectedOptions = this.selectionModel;
  }

  add() {
    if (this.listDefinition.listType == 'text-property') {
      const txtP: InfTextProperty[] = this.selection.selected.map(option => (option as TextPropertyItem).textProperty);
      this.p.pkProject$.pipe(first()).subscribe(pkProject => this.inf.text_property.upsert(txtP, pkProject)
        .resolved$.pipe(first(x => !!x), takeUntil(this.destroy$)).subscribe(pending => {
          this.t.showControl$.next(null)
        })
      )
    }
    else {
      const roles: InfRole[] = this.selection.selected.map(option => (option as RoleItemBasics).role);
      this.p.pkProject$.pipe(first()).subscribe(pkProject => this.inf.role.upsert(roles, pkProject)
        .resolved$.pipe(first(x => !!x), takeUntil(this.destroy$)).subscribe(pending => {
          this.t.showControl$.next(null)
        })
      )
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Item): string {
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.label}`;
  }

}
