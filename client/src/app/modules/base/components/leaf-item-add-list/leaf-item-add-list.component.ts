
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject, combineLatest, BehaviorSubject } from 'rxjs';
import { first, map, takeUntil, shareReplay, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';
import { ActiveProjectService, InfRole, InfTextProperty, PaginationObjectApi, EntityPreview } from '../../../../core';
import { InfActions } from '../../../../core/inf/inf.actions';
import { InformationPipesService } from '../../services/information-pipes.service';
import { BasicRoleItem, Item, ItemList, ListDefinition, TextPropertyItem, EntityPreviewItem, LanguageItem, AppellationItem, PlaceItem, LangStringItem } from '../properties-tree/properties-tree.models';
import { PropertiesTreeService } from '../properties-tree/properties-tree.service';
import { equals, indexBy } from 'ramda';
import { PaginationObject } from 'app/core/store/model';
import { PageEvent } from '@angular/material/paginator';


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

  @Output() close = new EventEmitter()
  @Output() next = new EventEmitter()

  itemsCount: number;

  dataSource = new MatTableDataSource<Item>();

  displayedColumns: string[];

  selectedCount$: Observable<number>
  selection: SelectionModel<Item>;

  length$: Observable<number[]>;

  pageSize$ = new BehaviorSubject(5)

  pageIndex$ = new BehaviorSubject(0)

  loading = false;

  constructor(
    public p: ActiveProjectService,
    public i: InformationPipesService,
    public t: PropertiesTreeService,
    public inf: InfActions,
    public pagApi: PaginationObjectApi
  ) { }

  ngOnInit() {
    // stop initialization if this is not a leaf item list
    if (!['appellation', 'language', 'place', 'text-property', 'lang-string', 'entity-preview']
      .includes(this.listDefinition.listType)) return;

    const relateBy = this.listDefinition.isOutgoing ? 'fk_temporal_entity' : 'fk_entity';
    const filterObject: Partial<InfRole> = {
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

      ]) => this.pagApi.listAlternativeLeafItems(pkProject, filterObject, pageSize, (pageSize * pageIndex))),
      tap(() => {
        this.loading = false
      }),
      shareReplay({ bufferSize: 1, refCount: true })
    )

    res$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((res: PaginationObject) => {
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

  private getItems(res: PaginationObject): ItemList {
    const relateBy = this.listDefinition.isOutgoing ? 'fk_entity' : 'fk_temporal_entity';
    if (this.listDefinition.listType === 'entity-preview') {
      const leafItems = indexBy((x) => x.pk_entity.toString(), res.schemas.war.entity_preview)
      return res.schemas.inf.role.map(role => {
        const preview: EntityPreview = leafItems[role[relateBy]] as EntityPreview;
        const item: EntityPreviewItem = {
          role,
          preview: !preview ? { pk_entity: role[relateBy] } as EntityPreview : preview,
          fkClass: !preview ? undefined : preview.fk_class,
          label: !preview ? undefined : preview.entity_label,
          ordNum: undefined,
          projRel: undefined
        }
        return item;
      })
    }
    else if (this.listDefinition.listType === 'appellation') {
      const leafItems = indexBy((x) => x.pk_entity.toString(), res.schemas.inf.appellation)
      return res.schemas.inf.role.map(role => {
        const appellation = leafItems[role[relateBy]];
        const item: AppellationItem = {
          role,
          fkClass: appellation.fk_class,
          label: appellation.string,
          ordNum: undefined,
          projRel: undefined
        }
        return item;
      })
    }
    else if (this.listDefinition.listType === 'place') {
      const leafItems = indexBy((x) => x.pk_entity.toString(), res.schemas.inf.place)
      return res.schemas.inf.role.map(role => {
        const place = leafItems[role[relateBy]];
        const item: PlaceItem = {
          role,
          fkClass: place.fk_class,
          label: 'WGS84: ' + place.lat + '°, ' + place.long + '°',
          ordNum: undefined,
          projRel: undefined
        }
        return item;
      })
    }
    else if (this.listDefinition.listType === 'lang-string') {
      const leafItems = indexBy((x) => x.pk_entity.toString(), res.schemas.inf.lang_string)
      const languages = indexBy((x) => x.pk_entity.toString(), res.schemas.inf.language)

      return res.schemas.inf.role.map(role => {
        const langString = leafItems[role[relateBy]];
        const item: LangStringItem = {
          role,
          fkClass: langString.fk_class,
          label: langString.string,
          language: languages[langString.fk_language],
          ordNum: undefined,
          projRel: undefined
        }
        return item;
      })
    }
    else if (this.listDefinition.listType === 'language') {
      const leafItems = indexBy((x) => x.pk_entity.toString(), res.schemas.inf.language)
      return res.schemas.inf.role.map(role => {
        const language = leafItems[role[relateBy]];
        const item: LanguageItem = {
          role,
          fkClass: language.fk_class,
          label: language.notes,
          ordNum: undefined,
          projRel: undefined
        }
        return item;
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
    if (this.listDefinition.listType == 'text-property') {
      const txtP: InfTextProperty[] = this.selection.selected.map(option => (option as TextPropertyItem).textProperty);
      this.p.pkProject$.pipe(first()).subscribe(pkProject => this.inf.text_property.upsert(txtP, pkProject)
        .resolved$.pipe(first(x => !!x), takeUntil(this.destroy$)).subscribe(pending => {
          this.close.emit()
        })
      )
    }
    else {
      const roles: InfRole[] = this.selection.selected.map(option => (option as BasicRoleItem).role);
      this.p.pkProject$.pipe(first()).subscribe(pkProject => this.inf.role.upsert(roles, pkProject)
        .resolved$.pipe(first(x => !!x), takeUntil(this.destroy$)).subscribe(pending => {
          this.close.emit()
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
