import { ChangeDetectionStrategy, Component, Input, OnInit, Optional } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DfhConfig } from '@kleiolab/lib-config';
import { ActiveProjectPipesService, ConfigurationPipesService, Field, InformationPipesService } from '@kleiolab/lib-queries';
import { ReduxMainService } from '@kleiolab/lib-redux';
import { GvFieldPage, GvFieldPageReq, GvFieldPageScope, GvFieldSourceEntity, InfResourceWithRelations, StatementWithTarget } from '@kleiolab/lib-sdk-lb4';
import { combineLatestOrEmpty } from '@kleiolab/lib-utils';
import { TableComponent } from 'projects/app-toolbox/src/app/shared/components/digital-table/components/table/table.component';
import { DfhApiClassMock } from 'projects/__test__/data/auto-gen/gvDB/DfhApiClassMock';
import { DfhApiPropertyMock } from 'projects/__test__/data/auto-gen/gvDB/DfhApiPropertyMock';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { first, map, mapTo, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
import { TableDetailComponent } from '../../../data/components/table-detail/table-detail.component';
import { PaginationService } from '../../services/pagination.service';
import { CtrlEntityDialogComponent, CtrlEntityDialogData } from '../ctrl-entity/ctrl-entity-dialog/ctrl-entity-dialog.component';
import { CtrlEntityModel } from '../ctrl-entity/ctrl-entity.component';
export interface ViewFieldAnnotationOfCellItemData {
  hasAnnotation: StatementWithTarget;
  refersTo: StatementWithTarget[];
}
@Component({
  selector: 'gv-view-field-annotations-of-cell',
  templateUrl: './view-field-annotations-of-cell.component.html',
  styleUrls: ['./view-field-annotations-of-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewFieldAnnotationsOfCellComponent implements OnInit {

  destroy$ = new Subject<boolean>();
  @Input() pkProject: number;
  @Input() pkCell?: number;
  @Input() pkMappedClass: number;
  @Input() cellContent: string; // the content of the cell (for auto search)

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
    private p: ActiveProjectPipesService,
    private c: ConfigurationPipesService,
    private dataService: ReduxMainService,
    private dialog: MatDialog,
    public tableComponent: TableComponent,
    @Optional() private tableDetailComponent?: TableDetailComponent,

  ) { }

  ngOnInit(): void {
    const errors: string[] = []
    if (!this.pkProject) errors.push('@Input() pkProject is required.');
    if (!this.pkMappedClass) errors.push('@Input() pkMappedClass is required.');
    if (errors.length) throw new Error(errors.join('\n'));

    if (this.pkCell) {

      const gvFieldPageReq$ = this.createGvFieldPageReq();

      this.source = { fkTablesCell: this.pkCell }
      this.scope = { inProject: this.pkProject }
      this.showOntoInfo$ = this.tableDetailComponent ? this.tableDetailComponent.showOntoInfo$ : new BehaviorSubject(false);
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
              property: { fkProperty: DfhConfig.PROPERTY_PK_GEOVP11_REFERS_TO },
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
      this.p.pkProject$,
      this.c.pipeTargetTypesOfClass(this.pkMappedClass, undefined, undefined, undefined, true)
    ])
      .pipe(map(([pkProject, targetTypeOfClass]) => {
        return {
          pkProject,
          targets: {
            [DfhApiClassMock.EN_9905_TABLE_ANNOTATION.dfh_pk_class]: {

              nestedResource: [
                {
                  page: {
                    isOutgoing: true,
                    property: { fkProperty: DfhApiPropertyMock.EN_1334_TABLE_ANNOTATION_REFERS_TO.dfh_pk_property },
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
      property: { fkProperty: DfhApiPropertyMock.EN_99005_TEXT_ANNOTATION_HAS_SPOT.dfh_pk_property },
      limit: 1,
      offset: 0,
      scope: this.scope,
      source: this.source
    }
  }

  async create() {
    const result = await this.chooseEntity()
    this.loadingTrigger$.next()
    if (result) await this.upsertAnnotation(result)
  }

  async chooseEntity() {
    return this.dialog.open<CtrlEntityDialogComponent,
      CtrlEntityDialogData,
      CtrlEntityModel>(CtrlEntityDialogComponent, {
        height: 'calc(100% - 30px)',
        width: '980px',
        maxWidth: '100%',
        panelClass: 'gv-no-padding',
        data: {
          initVal$: new BehaviorSubject(undefined),
          showAddList: true,
          hiddenProperty: { fkProperty: DfhConfig.PROPERTY_PK_GEOVP11_REFERS_TO },
          disableIfHasStatement: undefined,
          pkClass: this.pkMappedClass,
          defaultSearch: this.cellContent
        }
      }).afterClosed().toPromise()
  }

  public async upsertAnnotation(result: CtrlEntityModel) {
    const annotation: InfResourceWithRelations = {
      fk_class: DfhApiClassMock.EN_9905_TABLE_ANNOTATION.dfh_pk_class,
      outgoing_statements: [
        {
          fk_property: DfhApiPropertyMock.EN_99004_TABLE_ANNOTATION_IS_ANNOTATION_IN.dfh_pk_property,
          fk_object_info: this.tableDetailComponent.pkEntity // Table
        },
        {
          fk_property: DfhApiPropertyMock.EN_99005_TABLE_ANNOTATION_HAS_SPOT.dfh_pk_property,
          fk_object_tables_cell: this.pkCell
        },
        {
          fk_property: DfhApiPropertyMock.EN_1334_TABLE_ANNOTATION_REFERS_TO.dfh_pk_property,
          fk_object_info: result.pkEntity,
          object_resource: result.resource
        }
      ]
    }

    return this.dataService.upsertInfResourcesWithRelations(this.pkProject, [annotation])
      .pipe(first())
      .toPromise()
  }


}
