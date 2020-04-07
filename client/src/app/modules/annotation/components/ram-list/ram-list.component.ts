import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { ActiveProjectService, InfRole, switchMapOr, EntityPreview } from 'app/core';
import { InfActions } from 'app/core/inf/inf.actions';
import { SchemaObjectService } from 'app/core/store/schema-object.service';
import { values } from 'ramda';
import { BehaviorSubject, combineLatest, Observable, Subject, of } from 'rxjs';
import { filter, first, map, switchMap, takeUntil } from 'rxjs/operators';
import { GraphPathSegment } from '../graph-path/graph-path.component';
import { DfhConfig } from 'app/modules/information/shared/dfh-config';
import { ByPk } from 'app/core/store/model';
import { QuillOpsToStrPipe } from 'app/shared/pipes/quill-delta-to-str/quill-delta-to-str.pipe';
import { MatDialog } from '@angular/material/dialog';
import { RamListEditDialogComponent, RamListEditDialogData } from '../ram-list-edit-dialog/ram-list-edit-dialog.component';

interface GraphPath {
  segments: GraphPathSegment[];
  text?: string;
}
interface Reference {
  label: string;
  tooltip?: string;
  icon?: string;
}
export interface Mentioning {
  // the statement (role) connecting source and target
  statement: InfRole
  // the path of the source (is part of, etc)
  path: GraphPath;
  // the exact reference
  location?: Reference;
  // configuration for the action menu
  actions: any;
}


@Component({
  selector: 'gv-ram-list',
  templateUrl: './ram-list.component.html',
  styleUrls: ['./ram-list.component.scss'],
  providers: [
    QuillOpsToStrPipe
  ]
})
export class RamListComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<boolean>();

  @Input() pkEntity: number;
  @Input() fkProperty: number;

  items$: Observable<Mentioning[]>;
  cols: any[];

  viewMode = 'small';

  filtersVisible = false;

  // the entity giving the context for the ram list
  rootEntity$: Observable<EntityPreview>

  loading = true;

  constructor(
    private s: SchemaObjectService,
    private inf: InfActions,
    public p: ActiveProjectService,
    private quillPipe: QuillOpsToStrPipe,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.cols = this.setCols();

    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
      this.s.store(this.s.api.getRamList(pkProject, this.pkEntity, this.fkProperty), pkProject)
        .pipe(first(), takeUntil(this.destroy$))
        .subscribe(() => {
          this.loading = false;
        })
    })

    this.rootEntity$ = this.p.streamEntityPreview(this.pkEntity);

    this.items$ = this.pipeItems();

  }

  private pipeItems(): Observable<Mentioning[]> {

    return combineLatest(
      this.rootEntity$,
      this.p.inf$.role$.by_object_and_property$({
        fk_property: this.fkProperty,
        fk_entity: this.pkEntity
      })
    ).pipe(
      switchMap(([rootEntity, isMentionedInRoles]) => {
        const prefix = `${rootEntity.class_label} ${rootEntity.entity_label} is mentioned somewhere in`;

        // I map the input value to a Observable and switchMap will subscribe to the new one
        const arrayOfObs$: Observable<Mentioning>[] = isMentionedInRoles.map(role => {
          return combineLatest(
            this.pipePathRecursivly(role.fk_temporal_entity, prefix),
            this.getReference(role.pk_entity)
          ).pipe(
            map(([path, location]) => {
              return {
                path,
                location,
                statement: role,
                actions: {
                  open: true
                }
              };
            })
          )
        });
        return combineLatest(arrayOfObs$);
      }));
  }

  getReference(pkSubjectRole: number): Observable<Reference> {
    return this.p.inf$.role$.by_subject_and_property$({
      fk_property_of_property: DfhConfig.P_O_P_GEOV_HAS_REFERENCE,
      fk_temporal_entity: pkSubjectRole
    })
      .pipe(
        switchMap((roles) => {
          if (roles.length < 1) return new BehaviorSubject(undefined);
          return combineLatest(roles.map(r => {
            return this.p.inf$.lang_string$.by_pk_entity$.key(r.fk_entity)
              .pipe(
                map(langStr => !langStr ? null :
                  !langStr.quill_doc ? null :
                    langStr.quill_doc.ops),
                map(ops => !ops ? null : this.quillPipe.transform(ops)))
          }))
            .pipe(map(langStrArr => {
              return {
                label: langStrArr.filter(s => !!s).join(', '),
                tooltip: 'Reference to place in item',
                icon: ''
              }
            }))
        })
      )

  }

  private getFirstRole() {
    return map((idxRoles: ByPk<InfRole>) => {
      const rs = values(idxRoles);
      if (rs.length > 0) return rs[0];
      return undefined;
    });
  }

  private getEntityPathSegment(pkEntity: number, rootEntityLabel?: string): Observable<GraphPathSegment> {
    return this.p.streamEntityPreview(pkEntity)
      .pipe(
        filter((ep) => !!ep),
        switchMap((ep) => {
          // Q: What is subject of is mentioned in role?
          if (ep.fk_class == 218) {
            // A: F2 Expression!
            // ... so we need to find the source: F5 Item, F3 Manifestation Singleton, F4 Manifestation Product Type or geovC4 Web Request
            // because this will give us the entity preview for the entity to display in the path
            return combineLatest(
              // 1316 -- geovP5 – carrier provided by
              this.p.inf$.role$.by_subject_and_property$({
                fk_property: 1316,
                fk_temporal_entity: pkEntity
              })
                .pipe(map((r) => r.length ? r[0].fk_entity : undefined)),
              // 979 -- R4 – carriers provided by
              this.p.inf$.role$.by_subject_and_property$({
                fk_property: 979,
                fk_temporal_entity: pkEntity
              })
                .pipe(map((r) => r.length ? r[0].fk_entity : undefined)),
              // 1305 -- geovP4 – is server response to request
              this.p.inf$.role$.by_subject_and_property$({
                fk_property: 1305,
                fk_temporal_entity: pkEntity
              })
                .pipe(map((r) => r.length ? r[0].fk_entity : undefined)),
              // 1016 -- R42 – is representative manifestation singleton for
              this.p.inf$.role$.by_object_and_property$({
                fk_property: 1016,
                fk_entity: pkEntity
              })
                .pipe(map((r) => r.length ? r[0].fk_temporal_entity : undefined)),
            )
              .pipe(
                map((pks) => pks.find(pk => !!pk)),
                filter(pk => !!pk)
              )

          }
          return new BehaviorSubject(pkEntity);
        }),
        switchMap(pk => {
          return this.p.streamEntityPreview(pk).pipe(
            filter((ep) => !ep.loading),
            map(ep => {
              let icon: string;

              if (ep.entity_type === 'teEn') {
                icon = 'temporal_entity';
              }
              else if (ep.fk_class === DfhConfig.CLASS_PK_EXPRESSION_PORTION) {
                icon = 'expression-portion';
              }
              else if (DfhConfig.CLASS_PKS_SOURCE_PE_IT.includes(ep.fk_class)) {
                icon = 'source';
              }
              else {
                icon = 'persistent-item';
              }

              return {
                entity: {
                  fkClass: ep.fk_class,
                  pkEntity: ep.pk_entity,
                  label: ep.entity_label,
                  icon,
                  tooltip: `${rootEntityLabel ? rootEntityLabel + ' ' : ''} ${ep.class_label}${ep.type_label ? `, ${ep.type_label}` : ''}: «${ep.entity_label}»`
                }
              }
            })
          )
        })
      )
  }


  private pipePathRecursivly(
    pkEntity: number,
    entitySegmentTooltipPrefix?: string,
    graphPath: GraphPath = { segments: [], text: '' }
  ): Observable<GraphPath> {

    const finish = (sE: GraphPathSegment, p: GraphPath) => {
      return new BehaviorSubject<GraphPath>({
        text: `${sE.entity.label} ${p.text}`,
        segments: [sE, ...p.segments],
      })
    }

    return this.getEntityPathSegment(pkEntity, entitySegmentTooltipPrefix).pipe(
      switchMap(segE => {


        // If Expression Portion (uncomment this if() for allowing F2 - Expressions as part of another F2 in a path)
        if (segE.entity.fkClass == 503) {

          // get 'is part of' role
          return this.p.inf$.role$
            .by_subject_and_property$({
              fk_property: 1317,
              fk_temporal_entity: pkEntity
            })
            .pipe(
              switchMap((rs) => {

                if (rs.length > 0) {
                  const label = 'has part';
                  // add segments to path
                  const segP: GraphPathSegment = {
                    property: { label, tooltip: 'has part' }
                  }
                  const path = {
                    text: `${segP.property.label} ${segE.entity.label} ${graphPath.text}`,
                    segments: [segP, segE, ...graphPath.segments]
                  };

                  return this.pipePathRecursivly(rs[0].fk_entity, undefined, path)
                }

                return finish(segE, graphPath);
              })
            )
        }



        return finish(segE, graphPath);

      })
    )
  }



  setCols() {
    const pathCol = {
      field: 'path',
      header: 'Item',
      hasFilter: true,
      filterMatchMode: 'contains',
      filterCol: 'path.text',
      width: '50%'
    };
    const referenceCol = {
      field: 'location',
      header: 'Reference',
      tooltip: 'Location within item',
      hasFilter: true,
      filterMatchMode: 'contains',
      filterCol: 'location.label',
      width: '25%'
    };
    const actionsCol = {
      field: 'action',
      header: 'Action',
      hasFilter: false,
      width: '40px'
    };

    if (this.fkProperty === 1218) return [pathCol, referenceCol, actionsCol]
    else if (this.fkProperty === 117) return [pathCol, actionsCol]
    else if (this.fkProperty === 1334) return [pathCol, actionsCol]

    return [pathCol, actionsCol]
  }
  /**
   *
   * @param pkEntity Persistent item/temporal entity that is mentionned i.e. CRM Entity
   */
  getMentions(pkEntity: number) {
    const fakeStatements: InfRole[] = [
      {
        pk_entity: 789,
        fk_temporal_entity: 737367, // subject (F2 Expression) !!
        fk_property: 1218, // predicate (geovP2 mentions)
        fk_entity: pkEntity, // object (E1 CRM Entity / e.g. a Person)
      } as InfRole,
      {
        pk_entity: 790,
        fk_temporal_entity: 737367, // subject (F2 Expression) !!
        fk_property: 1316, // predicate (geovP5 carrier provided by)
        fk_entity: 737365, // object (F5 Item / e.g. Copy of a book)
      } as InfRole,
      {
        pk_entity: 791,
        fk_temporal_entity: 747097, // subject (geovC5 Expression Portion) !!
        fk_property: 1218, // predicate (geovP2 mentions)
        fk_entity: pkEntity, // object (E1 CRM Entity / e.g. a Person)
      } as InfRole
    ];
    this.inf.role.loadSucceeded(fakeStatements, '', 591);
  }

  /**
   * When user clicks add
   */
  onAdd() {
    this.p.ramReset()
    this.p.ramTarget$.next(this.pkEntity);
    this.p.ramProperty$.next(this.fkProperty);
    this.p.ramOpen$.next(true);

    if (this.fkProperty === DfhConfig.PROPERTY_PK_GEOVP2_MENTIONS) {
      this.rootEntity$.pipe(first(), takeUntil(this.destroy$)).subscribe(rootEntity => {
        this.p.ramTitle$.next(`${rootEntity.class_label} – ${rootEntity.entity_label}`);
        this.p.ramTitlePart2$.next(`is mentioned in:`);
        this.p.ramBoxLeft$.next('drag-source-or-section');

      })
    } else if (this.fkProperty === DfhConfig.PROPERTY_PK_P129_IS_ABOUT) {
      this.rootEntity$.pipe(first(), takeUntil(this.destroy$)).subscribe(rootEntity => {
        this.p.ramTitle$.next(`${rootEntity.class_label} – ${rootEntity.entity_label}`);
        this.p.ramTitlePart2$.next(`is topic of:`);
        this.p.ramBoxLeft$.next('drag-source-or-section');

      })
    } else if (this.fkProperty === DfhConfig.PROPERTY_PK_GEOVP11_REFERS_TO) {
      this.rootEntity$.pipe(first(), takeUntil(this.destroy$)).subscribe(rootEntity => {
        this.p.ramTitle$.next(`${rootEntity.class_label} – ${rootEntity.entity_label}`);
        this.p.ramTitlePart2$.next(`is referred to by:`);
        this.p.ramBoxLeft$.next('select-text');

      })
    } else {
      this.p.ramTitle$.next(`Create:`);
      console.warn('fkProperty not found.')
    }
  }

  onEdit(statement: InfRole) {
    const data: RamListEditDialogData = {
      statement
    }
    this.dialog.open(RamListEditDialogComponent, {
      data,
      height: 'calc(100% - 30px)',
      width: '690px',
      maxHeight: '100%'
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


}
