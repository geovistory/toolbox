import { NgRedux } from '@angular-redux/store';
import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DfhConfig } from '@kleiolab/lib-config';
import { ActiveProjectPipesService, SchemaSelectorsService } from '@kleiolab/lib-queries';
import { ByPk, IAppState, InfActions, RootEpics } from '@kleiolab/lib-redux';
import { DatChunk, DatDigital, InfStatement } from '@kleiolab/lib-sdk-lb3';
import { WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { combineLatestOrEmpty } from '@kleiolab/lib-utils';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { ConfirmDialogComponent, ConfirmDialogData, ConfirmDialogReturn } from 'projects/app-toolbox/src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { QuillOpsToStrPipe } from 'projects/app-toolbox/src/app/shared/pipes/quill-delta-to-str/quill-delta-to-str.pipe';
import { ReduxMainService } from 'projects/lib-redux/src/lib/redux-store/state-schema/services/reduxMain.service';
import { values } from 'ramda';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, first, map, mergeMap, shareReplay, switchMap, takeUntil } from 'rxjs/operators';
import { ChunksPks } from '../../../quill/quill-edit/quill-edit.component';


// this is not for state, only for the table view
export interface Row {
  // data for actions
  statement: InfStatement;
  domainInfoEntity: WarEntityPreview;
  domainChunk: DatChunk;
  digital: DatDigital; // the digital
  rangeInfoEntity: WarEntityPreview;

  // for highlight
  highlight: boolean;

  // columns
  digitalLabel: string;
  domainLabel: string;
  propertyLabel: string;
  rangeLabel: string;

}

export interface MentioningListOf {
  type: 'digital-text' | 'digital-table' | 'f2-expresion' | 'geovC5-expression-portion' | 'entity'
  pkEntity: number
}


@Component({
  selector: 'gv-mentioning-list',
  templateUrl: './mentioning-list.component.html',
  styleUrls: ['./mentioning-list.component.scss'],
  providers: [QuillOpsToStrPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MentioningListComponent implements OnInit, AfterViewInit, OnDestroy {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // path to the substore
  @Input() basePath: string[];


  /**
   * FOR CREATING a new mentioning:
   *
   * 1. Add a Mentioned Entity to a source-like thing:
   *
   * 1.1. For associating 'F2 Expression' to entity provide
   *      - expressionPk
   * 1.2. For associating 'geovC5 Expression Portion' to entity provide
   *      - expressionPortionPk
   * 1.3. For associating an existing Chunk provide
   *      - chunkPk
   *      For assiciating a new Chunk provide
   *      - chunk
   *
   * 2. Add a source-like thing to a Entity provide
   *      - mentionedEntity
   */
  @Input() expressionPk$: Observable<number>;
  @Input() expressionPortionPk$: Observable<number>;
  // @Input() chunk$ = new BehaviorSubject<DatChunk>(null);

  // If true, the list is hidden and the create form is shown
  // @Input() create$ = new BehaviorSubject<boolean>(false);


  /**
   * FOR LOADING the list items:
   *
   * The list consists of statements of those properties
   * - refers To
   * - mentions
   * and previews / labels of the associated domain and range
   *
   *
   * type
   * - 'digital-text'
   *   Loads all chunks associated with the digital (with the given pkEntity).
   *   The chunks are the domain of the statements of the list.
   * - 'f2-expression'
   *   The persitent item with the given pkEntity is the domain
   *   of the statements of the list.
   * - 'geovC5-expression-portion'
   *   The persitent item with the given pkEntity is the domain
   *   of the statements of the list.
   * - 'entity'
   *   The persitent item or temporal entity with the given pkEntity is the range
   *   of the statements of the list.
   */
  @Input() listOf: MentioningListOf;

  @Input() chunksToHighligt$: Observable<ChunksPks>;

  // @Output() close = new EventEmitter<void>();

  // select observables of substore properties

  formGroup: FormGroup;
  mentioningCreateCtrl;

  data$: Observable<Row[]>;
  dataSource = new MatTableDataSource();

  @Output() dataChange = new EventEmitter<Row[]>();
  @Output() rowMouseenter = new EventEmitter<Row>();
  @Output() rowMouseleave = new EventEmitter<Row>();
  @Output() rowClick = new EventEmitter<Row>();

  @ViewChild(MatSort) sort: MatSort;

  // displayed columns of the table
  displayedColumns: string[] = [
    'domainLabel',
    'propertyLabel',
    'rangeInfoEntity',
    'actions'
    // 'rangeLabel',
    // 'isFocusedInText',
    // 'isFocusedInTable'
  ];

  constructor(
    protected rootEpics: RootEpics,
    public ngRedux: NgRedux<IAppState>,
    private p: ActiveProjectPipesService,
    private pp: ActiveProjectService,
    private s: SchemaSelectorsService,
    private inf: InfActions,
    fb: FormBuilder,
    private dialog: MatDialog,
    private dataService: ReduxMainService
  ) {
    this.mentioningCreateCtrl = new FormControl(null, [Validators.required])
    this.formGroup = fb.group({ 'mentioningCreateCtrl': this.mentioningCreateCtrl })
  }

  getBasePath = () => this.basePath;

  ngOnInit() {

    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {

      if (this.listOf.type === 'digital-text') {

        this.displayedColumns = ['domainLabel', 'propertyLabel', 'rangeInfoEntity', 'actions'];

        this.dataService.loadDatChunksOfDigital(this.listOf.pkEntity, pkProject)

        const chunks$ = this.s.dat$.digital$.by_pk_entity$.key(this.listOf.pkEntity)
          .pipe(
            filter(digitalVersions => !!digitalVersions && Object.keys(digitalVersions).length > 0),
            map(digitalVersions => values(digitalVersions)[0].pk_text),
            switchMap(pkText => this.s.dat$.chunk$.by_fk_text$.key(pkText)),
            map(chunksByPk => values(chunksByPk)),
            // tap(c => {
            //   console.log('1', c)
            // })
          )




        const rows$ = chunks$.pipe(
          // tap(c => {
          //   console.log('1.5', c)
          // }),
          mergeMap((chunks) => combineLatestOrEmpty(
            chunks.map(chunk => this.s.inf$.statement$
              .by_subject_and_property$({
                fk_property: DfhConfig.PROPERTY_PK_GEOVP11_REFERS_TO,
                fk_subject_data: chunk.pk_entity
              })
              .pipe(
                // tap(c => {
                //   console.log('2', c)
                // }),
                mergeMap(stmts => combineLatestOrEmpty(
                  stmts.map(statement => this.p.streamEntityPreview(statement.fk_object_info).pipe(
                    map(entityPreview => ({ chunk, statement, entityPreview })),
                  ))
                )),
                // tap(c => {
                //   console.log('3', c)
                // }),
                // switchMap((stmtsOfChunk => this.chunksToHighligt$.pipe(
                //   map(chunksToHi => {
                //     const partialRows = stmtsOfChunk.map(statement => ({
                //       statement: statement,
                //       domainChunk: chunk,
                //       highlight: !chunksToHi ? false : chunksToHi.includes(chunk.pk_entity)
                //     } as Row))
                //     return partialRows;
                //   })
                // ))
                // )
              )
            )),
          ),
          // tap(c => {
          //   console.log('4', c)
          // }),
          map((item) => {
            const r: Row[] = []
            item.forEach(i => {
              i.forEach(s => {
                r.push({
                  domainChunk: s.chunk,
                  domainLabel: '« ' + s.chunk.string + ' »',
                  statement: s.statement,
                  rangeInfoEntity: s.entityPreview,
                  rangeLabel: s.entityPreview.entity_label,
                  digital: undefined,
                  digitalLabel: undefined,
                  domainInfoEntity: undefined,
                  highlight: false,
                  propertyLabel: 'refers to'
                })
              })
            })
            return r
          })
        )

        // switchMap(stmts => combineLatest(
        //   this.s.inf$.statement$.by_fk_subject_data$.all$,
        //   this.chunksToHighligt$
        // )
        //   .pipe(
        //     map(([easByDataDomain, chunksToHi]) => chunks
        //       .map(chunk => {
        //         const easOfChunk = values(easByDataDomain[chunk.pk_entity]);
        //         const partialRows = easOfChunk.map(statement => ({
        //           statement: statement,
        //           domainChunk: chunk,
        //           highlight: !chunksToHi ? false : chunksToHi.includes(chunk.pk_entity)
        //         } as Row))

        //         return partialRows;
        //       })
        //     ),
        //     map(rowsNested => (
        //       flatten(rowsNested) as any as Row[])
        //       .filter(row => row.statement)
        //     )
        //   )
        // )

        // const addRange$ = addDomain$.pipe(
        //   switchMap((rows) => {
        //     const ranges = rows.map(row => row.statement.fk_object_info)
        //     const pks = flatten(ranges) as any as number[]; // https://github.com/types/npm-ramda/issues/356
        //     return combineLatestOrEmpty(pks.map(pk => this.p.streamEntityPreview(pk)))
        //       .pipe(
        //         map(previews => {
        //           const prevs = indexBy((i) => i.pk_entity.toString(), previews)
        //           rows = rows.map(row => ({
        //             ...row,
        //             rangeInfoEntity: prevs[row.statement.fk_object_info],
        //             domainLabel: this.getDomainLabel(row),
        //             rangeLabel: this.getRangeLabel(prevs, row),
        //             propertyLabel: this.getPropertyLabel(row)
        //           }))
        //           return rows;
        //         })
        //       )
        //   }))
        // setTimeout(() => {
        //   rows$.subscribe((r) => { console.log(r) })
        // }, 2000)

        this.data$ = combineLatest([this.chunksToHighligt$, rows$]).pipe(
          // tap(c => {
          //   console.log('5', c)
          // }),
          map(([hi, rows]) => {
            return rows.map(r => ({
              ...r,
              highlight: hi.includes(r.domainChunk.pk_entity)
            }))
          }),
          shareReplay()
        );

        this.data$.pipe(takeUntil(this.destroy$)).subscribe(data => {
          this.dataSource.data = data
          this.dataChange.emit(data)
        })

      }
      // else if (this.listOf.type === 'entity') {

      //   this.displayedColumns = ['digital', 'domainLabel', 'actions'];

      //   this.inf.statement.sourcesAndDigitalsOfEntity(true, pkProject, this.listOf.pkEntity)

      //   const rows$ = this.s.inf$.statement$.by_object$({ fk_object_info: this.listOf.pkEntity })
      //     .pipe(
      //       switchMap((statements) => combineLatestOrEmpty(
      //         statements.filter(statement => statement.fk_property === DfhConfig.PROPERTY_PK_GEOVP11_REFERS_TO)
      //           .map(statement => this.s.dat$.chunk$.by_pk_entity$.key(statement.fk_subject_data)
      //             .pipe(
      //               filter(item => !!item),
      //               switchMap(domainChunk => this.s.dat$.digital$.by_pk_text$.key(domainChunk.fk_text).pipe(
      //                 filter(item => !!item),
      //                 map(texts => latestVersion(texts)),
      //                 map(digital => ({
      //                   statement: statement,
      //                   domainChunk,
      //                   domainLabel: this.getStringFromChunk(domainChunk),
      //                   digital,
      //                   digitalLabel: digital.string.substr(0, 20) + (digital.string.length > 20 ? '...' : '')
      //                 } as Row))))
      //             )
      //           )))
      //     )

      //   this.data$ = rows$;

      //   this.data$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      //     this.dataSource.data = data
      //     this.dataChange.emit(data)
      //   })
      // }

    })


  }

  private getPropertyLabel(row: Row): string {
    return row.statement.fk_property === DfhConfig.PROPERTY_PK_GEOVP11_REFERS_TO ? 'Refers To' : '';
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  private getRangeLabel(prevs: ByPk<WarEntityPreview>, row: Row): string {
    if (row.statement && row.statement.fk_object_info) {
      const e = prevs[row.statement.fk_object_info];
      return [e.entity_label, e.class_label, e.type_label].join(' ');
    }
  }

  private getDomainLabel(row: Row): string {
    if (row.domainChunk) {
      return this.getStringFromChunk(row.domainChunk);
    }
  }

  private getStringFromChunk(chunk: DatChunk): string {
    if (chunk) {
      return '« ' +
        // (chunk.quill_doc as QuillDoc).ops.map(op => op.insert).join('')
        chunk.string
        + ' »';
    }
  }

  submit() {
    if (this.formGroup.valid) {
      this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
        const statement: InfStatement = this.mentioningCreateCtrl.value;
        this.dataService.upsertInfStatementsWithRelations(pkProject, [statement])
          .pipe(first(r => !!r), takeUntil(this.destroy$)).subscribe(resolved => {
            // this.create$.next(false)
          })
      })
    }
  }

  remove(row: Row) {
    this.dialog.open<ConfirmDialogComponent, ConfirmDialogData, ConfirmDialogReturn>(ConfirmDialogComponent, {
      data: {
        title: 'Remove Annotation',
        paragraphs: [
          'Are you sure?',
          '(This can\'t be undone)',
        ],
        yesBtnColor: 'warn',
        yesBtnText: 'Remove',
        noBtnText: 'Cancel'
      }
    })
      .afterClosed()
      .subscribe(confirmed => {
        if (confirmed) {
          this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
            this.dataService.removeInfEntitiesFromProject([row.statement.pk_entity], pkProject)
          })
        }
      })
  }
  openEntity(entity: WarEntityPreview) {
    this.pp.addEntityTab(entity.pk_entity, entity.fk_class)
  }

  ngOnDestroy() {
    // this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }



}
