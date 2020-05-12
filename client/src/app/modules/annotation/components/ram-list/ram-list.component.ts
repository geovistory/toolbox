import { Component, OnDestroy, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActiveProjectService, InfStatement, switchMapOr, EntityPreview } from 'app/core';
import { InfActions } from 'app/core/inf/inf.actions';
import { SchemaObjectService } from 'app/core/store/schema-object.service';
import { values, equals } from 'ramda';
import { BehaviorSubject, combineLatest, Observable, Subject, of } from 'rxjs';
import { filter, first, map, switchMap, takeUntil, distinctUntilChanged, tap, shareReplay } from 'rxjs/operators';
import { GraphPathSegment } from '../graph-path/graph-path.component';
import { DfhConfig } from 'app/modules/information/shared/dfh-config';
import { ByPk } from 'app/core/store/model';
import { QuillOpsToStrPipe } from 'app/shared/pipes/quill-delta-to-str/quill-delta-to-str.pipe';
import { MatDialog } from '@angular/material/dialog';
import { RamListEditDialogComponent, RamListEditDialogData } from '../ram-list-edit-dialog/ram-list-edit-dialog.component';
import { RamListRemoveDialogData, RamListRemoveDialogComponent } from '../ram-list-remove-dialog/ram-list-remove-dialog.component';
import { combineLatestOrEmpty } from 'app/core/util/combineLatestOrEmpty';
import { TruncatePipe } from 'app/shared/pipes/truncate/truncate.pipe';

interface GraphPath {
  segments: GraphPathSegment[];
  text?: string;
}
interface Reference {
  label: string;
  tooltip?: string;
  icon?: string;
}
interface AnnotatedText {
  label: string;
  tooltip?: string;
}
export interface RamListItem {
  // the statement (role) connecting source and target
  statement: InfStatement
  // the path of the source (is part of, etc)
  path: GraphPath;
  // the exact reference
  location?: Reference;
  // the exact reference
  annotatedText?: AnnotatedText;
  // configuration for the action menu
  actions: any;
}


@Component({
  selector: 'gv-ram-list',
  templateUrl: './ram-list.component.html',
  styleUrls: ['./ram-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    QuillOpsToStrPipe
  ]
})
export class RamListComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<boolean>();

  @Input() pkEntity: number;
  @Input() fkProperty: number;

  items$: Observable<RamListItem[]>;
  cols: any[];

  viewMode = 'small';

  filtersVisible = false;

  // the entity giving the context for the ram list
  rootEntity$: Observable<EntityPreview>

  loading$ = new BehaviorSubject(true);

  constructor(
    private s: SchemaObjectService,
    private inf: InfActions,
    public p: ActiveProjectService,
    private quillPipe: QuillOpsToStrPipe,
    private dialog: MatDialog,
    public ref: ChangeDetectorRef
  ) {
    // To improve performance, we want to check and update the list less often than the changes actually occur.
    // To do that, we detach the component's change detector and perform an explicit local check on upadte of ...
    // https://angular.io/api/core/ChangeDetectorRef#detach
    // ref.detach();
    // setInterval(() => {
    //   this.ref.detectChanges();
    // }, 5000);


  }

  rowTrackByFn(_, i: RamListItem) {
    return _;
  }

  ngOnInit() {
    this.cols = this.setCols();

    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
      this.s.store(this.s.api.getRamList(pkProject, this.pkEntity, this.fkProperty), pkProject)
        .pipe(first(), takeUntil(this.destroy$))
        .subscribe(() => {
          this.loading$.next(false);
        })
    })

    this.rootEntity$ = this.p.streamEntityPreview(this.pkEntity).pipe(
      shareReplay({ refCount: true, bufferSize: 1 })
    );

    this.items$ = this.pipeItems();

    this.items$.pipe(
      takeUntil(this.destroy$),
    ).subscribe((items) => {
      const y = items;
    })

  }

  private pipeItems(): Observable<RamListItem[]> {

    // the roles associating the root entity with the next items
    const basicRoles$: Observable<InfStatement[]> = this.p.inf$.role$.by_object_and_property$({
      fk_property: this.fkProperty,
      fk_entity: this.pkEntity
    }).pipe(

      // TODO find out why this is triggered on wrong moments
      tap((s) => {

      }),
      distinctUntilChanged<InfStatement[]>(equals),
      tap((s) => {

      }),
    )


    // if property is 'refers to' we need to get the chunk and the digital
    if (this.fkProperty == DfhConfig.PROPERTY_PK_GEOVP11_REFERS_TO) {
      return basicRoles$.pipe(
        switchMap(roles => {
          return combineLatestOrEmpty(
            roles.map(role => this.p.dat$.chunk$.by_pk_entity$.key(role.fk_subject_data)
              .pipe(
                switchMap(chunk => {
                  const item: RamListItem = {
                    path: {
                      segments: []
                    },
                    location: undefined,
                    statement: role,
                    actions: {
                      edit: this.propertyHasReference()
                    }
                  };

                  if (!chunk) return new BehaviorSubject(item);

                  return this.p.dat$.digital$.by_pk_text$.key(chunk.fk_text).pipe(
                    map(digitalIdx => values(digitalIdx)),
                    switchMap(digitals => {
                      if (digitals.length < 1) return new BehaviorSubject(item);
                      const digital = digitals[0];
                      return this.p.inf$.role$.by_subject_and_property$({
                        fk_subject_data: digital.pk_entity,
                        fk_property: DfhConfig.PROPERTY_PK_GEOVP1_IS_REPRODUCTION_OF,
                      }).pipe(
                        switchMap(rolesToExpression => {

                          if (rolesToExpression.length < 1) return new BehaviorSubject(item)

                          return this.pipePathRecursivly(rolesToExpression[0].fk_object_info, '').pipe(
                            map((path) => {
                              const annotatedText: AnnotatedText = {
                                label: this.quillPipe.transform(chunk.quill_doc.ops)
                              }
                              path.segments = [
                                ...path.segments,
                                {
                                  property: {
                                    label: 'is reproduced by',
                                    tooltip: 'is reproduced by'
                                  }
                                },
                                {
                                  entity: {
                                    icon: 'text',
                                    label: 'Text ' + digital.pk_entity,
                                    tooltip: 'Text ' + digital.pk_entity,
                                    pkEntity: digital.pk_entity,
                                    isDigitalText: true
                                  }
                                }
                              ]
                              return { ...item, path, annotatedText };
                            })
                          )

                        })
                      )

                    })
                  )
                })
              )
            )
          )
        })
      )

    }
    // if poperty is 'mentions' or 'is topic of' we need to get the path directly
    else if (
      this.fkProperty == DfhConfig.PROPERTY_PK_GEOVP2_MENTIONS ||
      this.fkProperty == DfhConfig.PROPERTY_PK_P129_IS_ABOUT
    ) {
      return combineLatest(
        this.rootEntity$,
        basicRoles$
      ).pipe(
        switchMap(([rootEntity, basicRoles]) => {
          const prefix = ''; // `${rootEntity.class_label} ${rootEntity.entity_label} is mentioned somewhere in`;

          // I map the input value to a Observable and switchMap will subscribe to the new one
          const rowsArray$: Observable<RamListItem>[] = basicRoles.map(role => {
            return combineLatest(
              this.pipePathRecursivly(role.fk_subject_info, prefix),
              this.getReference(role.pk_entity)
            ).pipe(
              map(([path, location]) => {
                return {
                  path,
                  location,
                  statement: role,
                  actions: {
                    edit: this.propertyHasReference()
                  }
                };
              })
            )
          });
          return combineLatestOrEmpty(rowsArray$);
        }));
    }
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
            return this.p.inf$.lang_string$.by_pk_entity$.key(r.fk_object_info)
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
                .pipe(map((r) => r.length ? r[0].fk_object_info : undefined)),
              // 979 -- R4 – carriers provided by
              this.p.inf$.role$.by_subject_and_property$({
                fk_property: 979,
                fk_temporal_entity: pkEntity
              })
                .pipe(map((r) => r.length ? r[0].fk_object_info : undefined)),
              // 1305 -- geovP4 – is server response to request
              this.p.inf$.role$.by_subject_and_property$({
                fk_property: 1305,
                fk_temporal_entity: pkEntity
              })
                .pipe(map((r) => r.length ? r[0].fk_object_info : undefined)),
              // 1016 -- R42 – is representative manifestation singleton for
              this.p.inf$.role$.by_object_and_property$({
                fk_property: 1016,
                fk_entity: pkEntity
              })
                .pipe(map((r) => r.length ? r[0].fk_subject_info : undefined)),
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
                  preview: ep,
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

                  return this.pipePathRecursivly(rs[0].fk_object_info, undefined, path)
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
    const annotatedTextCol = {
      field: 'annotatedText',
      header: 'Annotated Text',
      tooltip: 'Piece of text annotated in a larger text.',
      hasFilter: true,
      filterMatchMode: 'contains',
      filterCol: 'annotatedText.label',
      width: '40%'
    };
    const actionsCol = {
      field: 'action',
      header: 'Action',
      hasFilter: false,
      width: '40px'
    };
    // mentions
    if (this.fkProperty === DfhConfig.PROPERTY_PK_GEOVP2_MENTIONS) return [pathCol, referenceCol, actionsCol]

    // is about
    else if (this.fkProperty === DfhConfig.PROPERTY_PK_P129_IS_ABOUT) return [pathCol, actionsCol]

    // refers to
    else if (this.fkProperty === DfhConfig.PROPERTY_PK_GEOVP11_REFERS_TO) {
      pathCol.width = '40%'
      return [pathCol, annotatedTextCol, actionsCol]
    }

    return [pathCol, actionsCol]
  }
  /**
   *
   * @param pkEntity Persistent item/temporal entity that is mentionned i.e. CRM Entity
   */
  getMentions(pkEntity: number) {
    const fakeStatements: InfStatement[] = [
      {
        pk_entity: 789,
        fk_subject_info: 737367, // subject (F2 Expression) !!
        fk_property: 1218, // predicate (geovP2 mentions)
        fk_object_info: pkEntity, // object (E1 CRM Entity / e.g. a Person)
      } as InfStatement,
      {
        pk_entity: 790,
        fk_subject_info: 737367, // subject (F2 Expression) !!
        fk_property: 1316, // predicate (geovP5 carrier provided by)
        fk_object_info: 737365, // object (F5 Item / e.g. Copy of a book)
      } as InfStatement,
      {
        pk_entity: 791,
        fk_subject_info: 747097, // subject (geovC5 Expression Portion) !!
        fk_property: 1218, // predicate (geovP2 mentions)
        fk_object_info: pkEntity, // object (E1 CRM Entity / e.g. a Person)
      } as InfStatement
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
        this.p.ramTitle$.next(`Annotate ${rootEntity.class_label} – ${rootEntity.entity_label}`);
        // this.p.ramTitlePart2$.next(`${rootEntity.class_label} – ${rootEntity.entity_label}`);
        this.p.ramBoxLeft$.next('select-text');
        this.p.ramTargetIsFix$.next(true)
      })
    } else {
      this.p.ramTitle$.next(`Create:`);
      console.warn('fkProperty not found.')
    }
  }

  onEdit(statement: InfStatement) {
    const data: RamListEditDialogData = {
      statement,
      propertyLabel: this.getPropertyLabel()
    }
    this.dialog.open(RamListEditDialogComponent, {
      data,
      height: 'calc(100% - 30px)',
      width: '690px',
      maxHeight: '100%'
    })
  }

  onRemove(statement: InfStatement) {
    const propertyHasReferences = this.propertyHasReference()
    const data: RamListRemoveDialogData = {
      statement,
      propertyLabel: this.getPropertyLabel(),
      propertyHasReferences
    }
    this.dialog.open(RamListRemoveDialogComponent, {
      data,
      height: propertyHasReferences ? 'calc(100% - 30px)' : undefined,
      width: '690px',
      maxHeight: '100%'
    })
  }

  getPropertyLabel(): string {
    if (this.fkProperty === DfhConfig.PROPERTY_PK_GEOVP2_MENTIONS) {
      return 'mentions'
    }
    else if (this.fkProperty === DfhConfig.PROPERTY_PK_P129_IS_ABOUT) {
      return 'is about'
    }
    else if (this.fkProperty === DfhConfig.PROPERTY_PK_GEOVP11_REFERS_TO) {
      return 'refers to'
    }
  }

  propertyHasReference() {
    return this.fkProperty === DfhConfig.PROPERTY_PK_GEOVP2_MENTIONS
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


}
