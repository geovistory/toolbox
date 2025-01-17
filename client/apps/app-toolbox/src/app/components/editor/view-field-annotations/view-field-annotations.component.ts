import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ConfigurationPipesService, GvFieldTargets, InformationPipesService, StateFacade } from '@kleiolab/lib-redux';
import { GvFieldPage, GvFieldPageReq, GvFieldPageScope, GvFieldSourceEntity, StatementWithTarget } from '@kleiolab/lib-sdk-lb4';
import { combineLatestOrEmpty } from '@kleiolab/lib-utils';
import { Observable, Subject, combineLatest } from 'rxjs';
import { filter, first, map, shareReplay, switchMap, takeUntil } from 'rxjs/operators';
import { C_456_CHUNK_ID, C_933_ANNOTATION_IN_TEXT_ID, P_1872_IS_ANNOTATED_IN_ID, P_1874_AT_POSITION_ID, P_1875_ANNOTATED_ENTITY_ID } from '../../../lib/constants/ontome-ids';
import { EditModeService } from '../../../services/edit-mode.service';
import { PaginationService } from '../../../services/pagination.service';
import { TextDetailService } from '../../layout/tab-bodies/text-detail/text-detail.service';
import { IndexedCharids } from '../../text-editor/quill-edit/quill-edit.component';
import { ViewFieldAnnotationItemComponent } from '../view-field-annotation-item/view-field-annotation-item.component';
export interface ViewFieldAnnotationItemData {
  hasAnnotation: StatementWithTarget;
  hasSpot: StatementWithTarget[];
  refersTo: StatementWithTarget[];
}
@Component({
  selector: 'gv-view-field-annotations',
  templateUrl: './view-field-annotations.component.html',
  styleUrls: ['./view-field-annotations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatDividerModule, NgFor, ViewFieldAnnotationItemComponent, AsyncPipe]
})
export class ViewFieldAnnotationsComponent implements OnInit {

  destroy$ = new Subject<boolean>();

  @Input() pkClass: number;
  @Input() source: GvFieldSourceEntity;
  @Input() scope: GvFieldPageScope
  readmode$: Observable<boolean>
  @Input() showOntoInfo$: Observable<boolean>
  items$: Observable<ViewFieldAnnotationItemData[]>
  pinnedItems$: Observable<ViewFieldAnnotationItemData[]>

  constructor(
    private state: StateFacade,
    private pag: PaginationService,
    private i: InformationPipesService,
    private c: ConfigurationPipesService,
    public textDetail: TextDetailService,
    public editMode: EditModeService
  ) {
    this.readmode$ = this.editMode.value$.pipe(map(v => !v))

  }
  trackByFn(_, i: ViewFieldAnnotationItemData) {
    return i.hasAnnotation.statement.pk_entity
  }
  ngOnInit() {
    const errors: string[] = []
    if (!this.source) errors.push('@Input() pkEntity is required.');
    if (!this.scope) errors.push('@Input() scope is required.');
    if (!this.showOntoInfo$) errors.push('@Input() showOntoInfo$ is required.');
    if (errors.length) throw new Error(errors.join('\n'));

    const gvFieldPageReq$ = this.createGvFieldPageReq();
    const annotations$ = gvFieldPageReq$.pipe(
      switchMap((field) => {
        // load data from server
        this.pag.addPageLoader(field, this.destroy$)

        // pipe data from store
        return this.i.pipeFieldPage(field.page, field.targets, false)
      }),
      shareReplay({ refCount: true, bufferSize: 1 }),
    );

    const unsorted$: Observable<ViewFieldAnnotationItemData[]> = annotations$.pipe(
      switchMap(as =>

        combineLatestOrEmpty(as.statements.map(s =>
          combineLatest([
            //  subentity field has spot
            this.i.pipeFieldPage({
              isOutgoing: true,
              property: { fkProperty: P_1874_AT_POSITION_ID },
              limit: 1,
              offset: 0,
              scope: this.scope,
              source: { fkInfo: s.target.entity.resource.pk_entity }
            }, {}, false),
            //  subentity field refers to
            this.i.pipeFieldPage({
              isOutgoing: true,
              property: { fkProperty: P_1875_ANNOTATED_ENTITY_ID },
              limit: 1,
              offset: 0,
              scope: this.scope,
              source: { fkInfo: s.target.entity.resource.pk_entity }
            }, {}, false),
          ]).pipe(
            map(([hasSpot, refersTo]) => ({
              hasAnnotation: s,
              hasSpot: hasSpot.statements,
              refersTo: refersTo.statements
            }))
          )
        ))
      ),
      shareReplay({ refCount: true, bufferSize: 1 }),
    )

    this.items$ = combineLatest([unsorted$, this.textDetail.component.characterPositionMap$]).pipe(
      map(([unsorted, positions]) => {
        const getPositon = (stmts: StatementWithTarget[]): number =>
          positions[stmts?.[0]?.target?.appellation?.quill_doc?.ops?.[0]?.attributes?.charid]
        return unsorted.sort((a, b) => {
          return getPositon(a.hasSpot) - getPositon(b.hasSpot)
        })
      }),
      shareReplay({ refCount: true, bufferSize: 1 }),
    )
    this.pinnedItems$ = combineLatest([this.items$, this.textDetail.component.annotationsPinnedInList$]).pipe(
      map(([items, pinned]) => items.filter(item => pinned.includes(item.hasAnnotation.target.entity.resource.pk_entity)))
    )

    unsorted$.pipe(takeUntil(this.destroy$)).subscribe(items => {
      this.updateAnnotatedCharsMap(items)
    })
  }


  private createGvFieldPageHasAnnotation(): GvFieldPage {
    return {
      isOutgoing: false,
      property: { fkProperty: P_1872_IS_ANNOTATED_IN_ID },
      limit: 100000,
      offset: 0,
      scope: this.scope,
      source: this.source
    }
  }

  private createGvFieldPageReq(): Observable<GvFieldPageReq> {
    const refersToTargets$: Observable<GvFieldTargets> = this.c.pipeClassesEnabledByProjectProfiles().pipe(
      filter(allClasses => allClasses.length > 0),
      map(allClasses => {
        const refersToTarget: GvFieldTargets = {}
        allClasses.forEach(pkClass => {
          refersToTarget[pkClass.pk_class] = { entityPreview: 'true' }
        })
        return refersToTarget
      })
    )

    return refersToTargets$
      .pipe(
        first(),
        map((refersToTargets) => {
          return {
            pkProject: this.state.pkProject,
            targets: {
              [C_933_ANNOTATION_IN_TEXT_ID]: {

                nestedResource: [
                  {
                    page: {
                      isOutgoing: true,
                      property: { fkProperty: P_1874_AT_POSITION_ID },
                      limit: 1,
                      offset: 0,
                      isCircular: false
                    },
                    targets: {
                      [C_456_CHUNK_ID]: {
                        appellation: 'true'
                      }
                    }
                  },
                  {
                    page: {
                      isOutgoing: true,
                      property: { fkProperty: P_1875_ANNOTATED_ENTITY_ID },
                      limit: 1,
                      offset: 0,
                      isCircular: false
                    },
                    targets: refersToTargets
                  }
                ]

              }
            },
            page: this.createGvFieldPageHasAnnotation()
          }
        })
      )
  }

  /**
   * updates the annotatedCharsMap of textDetail
   * @param items
   */
  updateAnnotatedCharsMap(items: ViewFieldAnnotationItemData[]) {
    const annotatedCharsMap: IndexedCharids<number[]> = {}
    items.forEach(item => {
      const ops = item.hasSpot?.[0]?.target?.appellation?.quill_doc?.ops
      if (ops) {
        ops.forEach(op => {
          const id = op?.attributes?.charid
          if (id) annotatedCharsMap[id] = [...(annotatedCharsMap[id] || []), item.hasAnnotation.target.entity.resource.pk_entity]
        })
      }
    })
    this.textDetail.component.annotatedCharsMap$.next(annotatedCharsMap);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
