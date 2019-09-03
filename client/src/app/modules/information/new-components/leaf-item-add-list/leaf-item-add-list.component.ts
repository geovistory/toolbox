
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject } from 'rxjs';
import { first, map, takeUntil } from 'rxjs/operators';
import { ActiveProjectService, InfRole, InfTextProperty } from '../../../../core';
import { InfActions } from '../../../../core/inf/inf.actions';
import { InformationPipesService } from '../../new-services/information-pipes.service';
import { BasicRoleItem, Item, ItemList, ListDefinition, TextPropertyItem } from '../properties-tree/properties-tree.models';
import { PropertiesTreeService } from '../properties-tree/properties-tree.service';


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
    public i: InformationPipesService,
    public t: PropertiesTreeService,
    public inf: InfActions
  ) { }

  ngOnInit() {
    this.items$ = this.i.pipeAltList(this.listDefinition, this.pkEntity)
    this.itemsCount$ = this.items$.pipe(map(i => (i || []).length))


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
      const roles: InfRole[] = this.selection.selected.map(option => (option as BasicRoleItem).role);
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
