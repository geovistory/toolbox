
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActiveProjectService } from "app/core/active-project";
import { InfActions } from 'app/core/inf/inf.actions';
import { GvPaginationObject, InfStatement, PaginatedStatementsControllerService, WarEntityPreview, InfAppellation, InfDimension, InfLangString, InfLanguage, InfPlace, InfTextProperty } from 'app/core/sdk-lb4';
import { equals, indexBy } from 'ramda';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, first, map, shareReplay, switchMap, takeUntil, tap } from 'rxjs/operators';
import { isLeafItemSubfield } from '../../base.helpers';
import { InformationPipesService } from '../../../../core/redux-queries/services/information-pipes.service';
import { AppellationItem, BasicStatementItem, DimensionItem, EntityPreviewItem, Item, ItemList, LangStringItem, LanguageItem, PlaceItem, Subfield, TextPropertyItem } from '../properties-tree/properties-tree.models';
import { PropertiesTreeService } from '../properties-tree/properties-tree.service';

type Row<M> = Item & {
  store?: {
    storeFn?: (items: M[], removePending: string, pk?: number) => void,
    items: any[]
  }
}

@Component({
  selector: 'gv-leaf-item-add-list',
  templateUrl: './leaf-item-add-list.component.html',
  styleUrls: ['./leaf-item-add-list.component.scss']
})
export class LeafItemAddListComponent implements OnInit, AfterViewInit {
  destroy$ = new Subject<boolean>();

  // @ViewChild(MatSelectionList) selectionList: MatSelectionList;

  @Input() pkEntity: number;

  @Input() listDefinition: Subfield;
  @Input() readonly$: Observable<boolean>
  @Input() showOntoInfo$;
  @Input() addButtonVisible;
  @Input() toggleButtonVisible;

  @Output() close = new EventEmitter()
  @Output() next = new EventEmitter()

  itemsCount: number;

  dataSource = new MatTableDataSource<Row<any>>();

  displayedColumns: string[];

  selectedCount$: Observable<number>
  selection: SelectionModel<Row<any>>;

  length$: Observable<number[]>;

  pageSize$ = new BehaviorSubject(5)

  pageIndex$ = new BehaviorSubject(0)

  loading = false;

  valueObjectsToStore = []

  constructor(
    public p: ActiveProjectService,
    public i: InformationPipesService,
    public t: PropertiesTreeService,
    public inf: InfActions,
    public pagApi: PaginatedStatementsControllerService
  ) { }

  ngOnInit() {
    // stop initialization if this is not a leaf item list
    if (!isLeafItemSubfield(this.listDefinition.listType)) return;

    const relateBy = this.listDefinition.isOutgoing ? 'fk_subject_info' : 'fk_object_info';
    const filterObject: Partial<InfStatement> = {
      [relateBy]: this.pkEntity,
      fk_property: this.listDefinition.property.pkProperty,
      fk_property_of_property: this.listDefinition.property.pkPropertyOfProperty
    }
    const loadConfig$ = combineLatest(
      this.pageSize$,
      this.pageIndex$,
      this.p.pkProject$
    ).pipe(shareReplay({ refCount: true, bufferSize: 1 }))

    const res$ = loadConfig$.pipe(
      distinctUntilChanged(equals),
      tap(() => {
        this.loading = true
      }),
      switchMap(([
        pageSize,
        pageIndex,
        pkProject,

      ]) => this.pagApi.paginatedStatementsControllerAlternativeLeafItems({
        pkProject,
        filterObject,
        limit: pageSize,
        offset: (pageSize * pageIndex)
      })),
      tap(() => {
        this.loading = false
      }),
      shareReplay({ bufferSize: 1, refCount: true })
    )

    res$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((res: GvPaginationObject) => {
      if (res.count === 0) {
        this.next.emit()
      } else {
        this.itemsCount = res.count;
        this.dataSource.data = this.getItems(res);
      }
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

  private getItems(res: GvPaginationObject): ItemList {
    const relateBy = this.listDefinition.isOutgoing ? 'fk_object_info' : 'fk_subject_info';
    if (this.listDefinition.listType.entityPreview) {
      const leafItems = indexBy((x) => x.pk_entity.toString(), res.schemas.war.entity_preview)
      return res.schemas.inf.statement.map(statement => {
        const preview: WarEntityPreview = leafItems[statement[relateBy]];
        const item: EntityPreviewItem = {
          statement,
          preview: (!preview ? { pk_entity: statement[relateBy] } : preview) as WarEntityPreview,
          fkClass: !preview ? undefined : preview.fk_class,
          label: !preview ? undefined : preview.entity_label,
          ordNum: undefined,
          projRel: undefined
        }
        return item;
      })
    }
    else if (this.listDefinition.listType.appellation) {
      const leafItems = indexBy((x) => x.pk_entity.toString(), res.schemas.inf.appellation)
      return res.schemas.inf.statement.map(statement => {
        const appellation = leafItems[statement[relateBy]];
        const item: AppellationItem = {
          statement,
          fkClass: appellation.fk_class,
          label: appellation.string,
          ordNum: undefined,
          projRel: undefined
        }
        const row: Row<InfAppellation> = {
          ...item,
          store: {
            storeFn: this.p.inf.appellation.loadSucceeded,
            items: [appellation]
          }
        }
        return row;
      })
    }
    else if (this.listDefinition.listType.place) {
      const leafItems = indexBy((x) => x.pk_entity.toString(), res.schemas.inf.place)
      return res.schemas.inf.statement.map(statement => {
        const place = leafItems[statement[relateBy]];
        const item: PlaceItem = {
          statement,
          fkClass: place.fk_class,
          label: 'WGS84: ' + place.lat + '°, ' + place.long + '°',
          ordNum: undefined,
          projRel: undefined
        }
        const row: Row<InfPlace> = {
          ...item,
          store: {
            storeFn: this.p.inf.place.loadSucceeded,
            items: [place]
          }
        }
        return row;
      })
    }
    else if (this.listDefinition.listType.langString) {
      const leafItems = indexBy((x) => x.pk_entity.toString(), res.schemas.inf.lang_string)
      const languages = indexBy((x) => x.pk_entity.toString(), res.schemas.inf.language)

      return res.schemas.inf.statement.map(statement => {
        const langString = leafItems[statement[relateBy]];
        const item: LangStringItem = {
          statement,
          fkClass: langString.fk_class,
          label: langString.string,
          language: languages[langString.fk_language],
          fkLanguage: langString.fk_language,
          ordNum: undefined,
          projRel: undefined
        }
        const row: Row<InfLangString> = {
          ...item,
          store: {
            storeFn: this.p.inf.lang_string.loadSucceeded,
            items: [langString]
          }
        }
        return row;
      })
    }
    else if (this.listDefinition.listType.dimension) {
      const leafItems = indexBy((x) => x.pk_entity.toString(), res.schemas.inf.dimension)
      const entityPreviews = indexBy((x) => x.pk_entity.toString(), res.schemas.war.entity_preview)

      return res.schemas.inf.statement.map(statement => {
        const dimension = leafItems[statement[relateBy]];
        const item: DimensionItem = {
          statement,
          fkClass: dimension.fk_class,
          label: `${dimension.numeric_value} ${entityPreviews[dimension.fk_measurement_unit].entity_label}`,
          ordNum: undefined,
          projRel: undefined
        }
        const row: Row<InfDimension> = {
          ...item,
          store: {
            storeFn: this.p.inf.dimension.loadSucceeded,
            items: [dimension]
          }
        }
        return row;
      })
    }
    else if (this.listDefinition.listType.language) {
      const leafItems = indexBy((x) => x.pk_entity.toString(), res.schemas.inf.language)
      return res.schemas.inf.statement.map(statement => {
        const language = leafItems[statement[relateBy]];
        const item: LanguageItem = {
          statement,
          fkClass: language.fk_class,
          label: language.notes,
          ordNum: undefined,
          projRel: undefined
        }
        const row: Row<InfLanguage> = {
          ...item,
          store: {
            storeFn: this.p.inf.language.loadSucceeded,
            items: [language]
          }
        }
        return row;
      })
    }
  }
  onPageChange(e: PageEvent) {
    this.pageIndex$.next(e.pageIndex)
    this.pageSize$.next(e.pageSize)
  }

  ngAfterViewInit() {
    // this.selectionList.selectedOptions = this.selectionModel;
  }

  add() {

    const statements: InfStatement[] = this.selection.selected.map(option => (option as BasicStatementItem).statement);

    this.p.pkProject$.pipe(first()).subscribe(pkProject => this.inf.statement.upsert(statements, pkProject)
      .resolved$.pipe(first(x => !!x), takeUntil(this.destroy$)).subscribe(pending => {
        this.close.emit()
      })
    )

    // add leaf values objects to store
    this.selection.selected.forEach(s => {
      if (s.store) s.store.storeFn(s.store.items, '')
    })


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
