import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, Optional, forwardRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfigurationPipesService, Field, InformationPipesService, StateFacade } from '@kleiolab/lib-redux';
import { GvFieldPage, GvFieldPageReq, GvFieldPageScope, GvFieldSourceEntity, InfResourceWithRelations, StatementWithTarget } from '@kleiolab/lib-sdk-lb4';
import { combineLatestOrEmpty } from '@kleiolab/lib-utils';
import { BehaviorSubject, Observable, Subject, combineLatest } from 'rxjs';
import { first, map, mapTo, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
import { C_934_ANNOTATION_IN_TABLE_ID, P_1872_IS_ANNOTATED_IN_ID, P_1874_AT_POSITION_ID, P_1875_ANNOTATED_ENTITY_ID } from '../../../lib/constants/ontome-ids';
import { statemenTargetToInfData } from '../../../lib/converters/statemenTargetToInfData';
import { PaginationService } from '../../../services/pagination.service';
import { TableDetailService } from '../../layout/tab-bodies/table-detail/table-detail.service';
import { TableService } from '../../table-editor/table/table.service';
import { CtrlEntityDialogComponent, CtrlEntityDialogData } from '../ctrl-entity/ctrl-entity-dialog/ctrl-entity-dialog.component';
import { CtrlEntityModel } from '../ctrl-entity/ctrl-entity.component';
import { ViewFieldAnnotationsOfCellItemComponent } from '../view-field-annotations-of-cell-item/view-field-annotations-of-cell-item.component';
import { ViewFieldAnnotationsOfCellService } from './view-field-annotations-of-cell.service';
export interface ViewFieldAnnotationOfCellItemData {
  hasAnnotation: StatementWithTarget;
  refersTo: StatementWithTarget[];
}
@Component({
  selector: 'gv-view-field-annotations-of-cell',
  templateUrl: './view-field-annotations-of-cell.component.html',
  styleUrls: ['./view-field-annotations-of-cell.component.scss'],
  providers: [ViewFieldAnnotationsOfCellService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, MatProgressSpinnerModule, NgFor, forwardRef(() => ViewFieldAnnotationsOfCellItemComponent), MatButtonModule, MatMenuModule, MatIconModule, AsyncPipe]
})
export class ViewFieldAnnotationsOfCellComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<boolean>();
  @Input() pkProject: number;
  @Input() pkCell?: number;
  @Input() pkMappedClass: number;
  @Input() cellContent?: string; // the content of the cell (for auto search)

  showOntoInfo$: Observable<boolean>

  source: GvFieldSourceEntity;
  scope: GvFieldPageScope;
  showBodyOnInit = true;

  items$: Observable<ViewFieldAnnotationOfCellItemData[]>
  itemsCount$: Observable<number>

  field$: Observable<Field>

  loadingTrigger$ = new BehaviorSubject<void>(undefined)
  lodaded$ = new Subject<void>()
  loading$: Observable<boolean>

  constructor(
    private pag: PaginationService,
    private i: InformationPipesService,
    private c: ConfigurationPipesService,
    private state: StateFacade,
    private dialog: MatDialog,
    public table: TableService,
    fiewFieldAnnotationsOfCellService: ViewFieldAnnotationsOfCellService,
    @Optional() private tableDetail?: TableDetailService,
  ) { fiewFieldAnnotationsOfCellService.registerComponent(this) }

  ngOnInit(): void {
    const errors: string[] = []
    if (!this.pkProject) errors.push('@Input() pkProject is required.');
    if (!this.pkMappedClass) errors.push('@Input() pkMappedClass is required.');
    if (errors.length) throw new Error(errors.join('\n'));

    if (this.pkCell) {

      const gvFieldPageReq$ = this.createGvFieldPageReq();

      this.source = { fkTablesCell: this.pkCell }
      this.scope = { inProject: this.pkProject }
      this.showOntoInfo$ = this.tableDetail?.component ? this.tableDetail?.component.showOntoInfo$ : new BehaviorSubject(false);
      const annotations$ = gvFieldPageReq$.pipe(
        switchMap((field) => {
          // load data from server
          this.pag.addPageLoader(field, this.destroy$)

          // pipe data from store
          return this.i.pipeFieldPage(field.page, field.targets, false)
        }),
        tap(() => {
          setTimeout(() => { this.lodaded$.next() })
        }),
        shareReplay({ refCount: true, bufferSize: 1 }),
      );
      this.itemsCount$ = annotations$.pipe(map(x => x.count))
      this.items$ = annotations$.pipe(
        switchMap(as =>

          combineLatestOrEmpty(as.statements.map(s =>
            //  subentity field refers to
            this.i.pipeFieldPage({
              isOutgoing: true,
              property: { fkProperty: P_1875_ANNOTATED_ENTITY_ID },
              limit: 1,
              offset: 0,
              scope: this.scope,
              source: { fkInfo: s.target.entity.resource.pk_entity }
            }, {}, false).pipe(
              map((refersTo) => ({
                hasAnnotation: s,
                refersTo: refersTo.statements
              }))
            )
          ))
        ),
        shareReplay({ refCount: true, bufferSize: 1 }),
      )

    }
    this.loading$ = this.loadingTrigger$.pipe(
      switchMap(() => this.lodaded$.pipe(
        first(),
        mapTo(false),
        startWith(true)
      )),
      startWith(true),
      shareReplay({ refCount: true, bufferSize: 1 }),
    )
  }



  private createGvFieldPageReq(): Observable<GvFieldPageReq> {
    return combineLatest([
      this.state.pkProject$,
      this.c.pipeTargetTypesOfClass(this.pkMappedClass, undefined, undefined, undefined, true)
    ])
      .pipe(map(([pkProject, targetTypeOfClass]) => {
        return {
          pkProject,
          targets: {
            [C_934_ANNOTATION_IN_TABLE_ID]: {

              nestedResource: [
                {
                  page: {
                    isOutgoing: true,
                    property: { fkProperty: P_1875_ANNOTATED_ENTITY_ID },
                    limit: 1,
                    offset: 0,
                    isCircular: false
                  },
                  targets: {
                    [this.pkMappedClass]: targetTypeOfClass.viewType
                  }
                }
              ]

            }
          },
          page: this.createGvFieldPageHasAnnotation()
        }
      }

      ))

  }
  private createGvFieldPageHasAnnotation(): GvFieldPage {
    return {
      isOutgoing: false,
      property: { fkProperty: P_1874_AT_POSITION_ID },
      limit: 1,
      offset: 0,
      scope: this.scope,
      source: this.source
    }
  }

  async create() {
    const result = await this.chooseEntity()
    if (result) {
      this.loadingTrigger$.next()
      await this.upsertAnnotation(result)
    }
  }

  async chooseEntity(item?: StatementWithTarget) {
    return this.dialog.open<CtrlEntityDialogComponent,
      CtrlEntityDialogData,
      CtrlEntityModel>(CtrlEntityDialogComponent, {
        height: 'calc(100% - 30px)',
        width: '980px',
        maxWidth: '100%',
        panelClass: 'gv-no-padding',
        data: {
          initVal$: new BehaviorSubject(statemenTargetToInfData(item?.target)),
          showAddList: true,
          hiddenProperty: { fkProperty: P_1875_ANNOTATED_ENTITY_ID },
          disableIfHasStatement: undefined,
          pkClass: this.pkMappedClass,
          defaultSearch: this.cellContent ?? ''
        }
      }).afterClosed().toPromise()
  }

  public async upsertAnnotation(result: CtrlEntityModel) {
    const annotation: InfResourceWithRelations = {
      fk_class: C_934_ANNOTATION_IN_TABLE_ID,
      outgoing_statements: [
        {
          fk_property: P_1872_IS_ANNOTATED_IN_ID,
          fk_object_info: this.tableDetail?.component?.pkEntity // Table
        },
        {
          fk_property: P_1874_AT_POSITION_ID,
          fk_object_tables_cell: this.pkCell
        },
        {
          fk_property: P_1875_ANNOTATED_ENTITY_ID,
          fk_object_info: result.pkEntity,
          object_resource: result.resource,
          object_appellation: result.appellation,
          object_dimension: result.dimension,
          object_lang_string: result.langString,
          object_language: result.language,
          object_place: result.place,
          object_time_primitive: result.timePrimitive,
        }
      ]
    }

    return this.state.data.upsertInfResourcesWithRelations(this.pkProject, [annotation])
      .pipe(first())
      .toPromise()
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
