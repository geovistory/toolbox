import { Component, Input, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActiveProjectService } from 'app/core';
import { Observable, Subject, BehaviorSubject, combineLatest } from 'rxjs';
import { AddListComponentInterface, ListDefinition, TemporalEntityItem } from '../properties-tree/properties-tree.models';
import { InformationPipesService } from '../../new-services/information-pipes.service';
import { MatPaginator, PageEvent } from '../../../../../../node_modules/@angular/material';
import { TemporalEntityTable, Row } from '../temporal-entity-list/temporal-entity-list.component';
import { SelectionModel } from '../../../../../../node_modules/@angular/cdk/collections';
import { map, startWith, first, takeUntil, switchMap } from '../../../../../../node_modules/rxjs/operators';
import { InfActions } from '../../../../core/inf/inf.actions';
import { PropertiesTreeService } from '../properties-tree/properties-tree.service';
import { ConfigurationPipesService } from '../../new-services/configuration-pipes.service';

@Component({
  selector: 'gv-temporal-entity-add-list',
  templateUrl: './temporal-entity-add-list.component.html',
  styleUrls: ['./temporal-entity-add-list.component.scss']
})
export class TemporalEntityAddListComponent implements OnInit, OnDestroy, AddListComponentInterface {

  destroy$ = new Subject<boolean>();

  @Input() pkEntity: number;

  @Input() listDefinition: ListDefinition;
  @Input() readonly$: Observable<boolean>
  @Input() showOntoInfo$;
  @Input() addButtonVisible;
  @Input() toggleButtonVisible;

  @Input() appContext: number

  items$: Observable<TemporalEntityItem[]>
  itemsCount$: Observable<number>


  table: TemporalEntityTable;
  limit$ = new BehaviorSubject(5)
  offset$ = new BehaviorSubject(0);

  selectedCount$: Observable<number>
  selection: SelectionModel<number>;


  constructor(
    public p: ActiveProjectService,
    public c: ConfigurationPipesService,
    public i: InformationPipesService,
    public t: PropertiesTreeService,
    public inf: InfActions
  ) { }

  ngOnInit() {
    this.items$ = combineLatest(
      this.limit$.pipe(),
      this.offset$.pipe()
    ).pipe(
      switchMap(([limit, offset]) => this.i.pipeAltListTemporalEntity(this.listDefinition, this.pkEntity, this.appContext, limit, offset)
      )
    )


    // get columns of this temporal entity
    const columDefs$ = this.c.pipeFieldDefinitions(this.listDefinition.targetClass, this.appContext)


    // SELECTION
    const allowMultiSelect = this.listDefinition.targetMaxQuantity === 1 ? false : true;

    let customCols;
    allowMultiSelect ?
      customCols = { columnsBefore: ['_checkbox_', '_classInfo_'], columnsAfter: ['_projects_', '_actions_'] } :
      customCols = { columnsBefore: ['_radiobutton_', '_classInfo_'], columnsAfter: ['_projects_', '_actions_'] };
    this.table = new TemporalEntityTable(this.items$, columDefs$, this.destroy$, this.listDefinition, customCols);

    this.itemsCount$ = this.i.pipeAltListLength(this.listDefinition, this.pkEntity)

    const initialSelection = [];
    this.selection = new SelectionModel<number>(allowMultiSelect, initialSelection);
    this.selectedCount$ = this.selection.changed.pipe(
      map(s => s.source.selected.length)
    )
  }

  onPageChange(e: PageEvent) {
    this.offset$.next(e.pageIndex)
    this.limit$.next(e.pageSize)
  }



  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  add() {

    const pkRoles: number[] = this.selection.selected;
    this.p.pkProject$.pipe(first()).subscribe(pkProject => this.inf.role.addToProjectWithTeEnt(pkRoles, pkProject)
      .resolved$.pipe(first(x => !!x), takeUntil(this.destroy$)).subscribe(pending => {
        this.t.showControl$.next(null)
      })
    )

  }

}
