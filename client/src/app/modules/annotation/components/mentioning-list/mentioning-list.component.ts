import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActiveProjectService, DatChunk, EntityPreview, IAppState, SubstoreComponent, DatDigital, latestVersion, InfRole } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { DfhConfig } from 'app/modules/information/shared/dfh-config';
import { QuillOpsToStrPipe } from 'app/shared/pipes/quill-delta-to-str/quill-delta-to-str.pipe';
import { flatten, indexBy, values } from 'ramda';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { filter, first, map, mergeMap, takeUntil, switchMap } from 'rxjs/operators';
import { MatSort, MatTableDataSource } from '../../../../../../node_modules/@angular/material';
import { InfActions } from '../../../../core/inf/inf.actions';
import { ByPk } from '../../../../core/store/model';
import { QuillDoc } from '../../../quill';
import { ChunksPks } from '../../../quill/quill-edit/quill-edit.component';
import { combineLatestOrEmpty } from '../../../../core/util/combineLatestOrEmpty';


// this is not for state, only for the table view
export interface Row {
  // data for actions
  role: InfRole;
  domainInfoEntity: EntityPreview;
  domainChunk: DatChunk;
  digital: DatDigital; // the digital
  rangeInfoEntity: EntityPreview;

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
};


@Component({
  selector: 'gv-mentioning-list',
  templateUrl: './mentioning-list.component.html',
  styleUrls: ['./mentioning-list.component.scss'],
  providers: [QuillOpsToStrPipe]
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
  @Input() chunk$ = new BehaviorSubject<DatChunk>(null);

  // If true, the list is hidden and the create form is shown
  @Input() create$ = new BehaviorSubject<boolean>(false);


  /**
   * FOR LOADING the list items:
   *
   * The list consists of roles of those properties
   * - refers To
   * - mentions
   * and previews / labels of the associated domain and range
   *
   *
   * type
   * - 'digital-text'
   *   Loads all chunks associated with the digital (with the given pkEntity).
   *   The chunks are the domain of the roles of the list.
   * - 'f2-expression'
   *   The persitent item with the given pkEntity is the domain
   *   of the roles of the list.
   * - 'geovC5-expression-portion'
   *   The persitent item with the given pkEntity is the domain
   *   of the roles of the list.
   * - 'entity'
   *   The persitent item or temporal entity with the given pkEntity is the range
   *   of the roles of the list.
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

  @ViewChild(MatSort, { static: false }) sort: MatSort;

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
    private p: ActiveProjectService,
    private inf: InfActions,
    fb: FormBuilder
  ) {
    this.mentioningCreateCtrl = new FormControl(null, [Validators.required])
    this.formGroup = fb.group({ 'mentioningCreateCtrl': this.mentioningCreateCtrl })
  }

  getBasePath = () => this.basePath;

  ngOnInit() {

    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {

      if (this.listOf.type === 'digital-text') {

        this.displayedColumns = ['domainLabel', 'propertyLabel', 'rangeInfoEntity', 'actions'];

        this.p.dat$.chunk.loadChunksOfDigital(this.listOf.pkEntity, pkProject)

        const chunks$ = this.p.dat$.digital$.by_pk_entity$.key(this.listOf.pkEntity).pipe(
          filter(digitalVersions => !!digitalVersions && Object.keys(digitalVersions).length > 0),
          map(digitalVersions => values(digitalVersions)[0].pk_text),
          mergeMap(pkText => this.p.dat$.chunk$.by_fk_text$.key(pkText)),
          map(chunksByPk => values(chunksByPk)),
        )

        const addDomain$ = chunks$.pipe(
          mergeMap(chunks => combineLatest(
            this.p.inf$.role$.by_fk_data_subject$.all$,
            this.chunksToHighligt$
          )
            .pipe(
              map(([easByDataDomain, chunksToHi]) => chunks
                .map(chunk => {
                  const easOfChunk = values(easByDataDomain[chunk.pk_entity]);
                  const partialRows = easOfChunk.map(role => ({
                    role: role,
                    domainChunk: chunk,
                    highlight: !chunksToHi ? false : chunksToHi.includes(chunk.pk_entity)
                  } as Row))

                  return partialRows;
                })
              ),
              map(rowsNested => (
                flatten(rowsNested) as any as Row[])
                .filter(row => row.role)
              )
            )
          ))

        const addRange$ = addDomain$.pipe(
          mergeMap((rows) => {
            const ranges = rows.map(row => row.role.fk_entity)
            const pks = flatten(ranges) as any as number[]; // https://github.com/types/npm-ramda/issues/356
            return combineLatestOrEmpty(pks.map(pk => this.p.streamEntityPreview(pk)))
              .pipe(
                filter(previews => !previews.find(p => p.loading)),
                map(previews => {
                  const prevs = indexBy((i) => i.pk_entity.toString(), previews)
                  rows = rows.map(row => ({
                    ...row,
                    rangeInfoEntity: prevs[row.role.fk_entity],
                    domainLabel: this.getDomainLabel(row),
                    rangeLabel: this.getRangeLabel(prevs, row),
                    propertyLabel: this.getPropertyLabel(row)
                  }))
                  return rows;
                })
              )
          }))

        this.data$ = addRange$;

        this.data$.pipe(takeUntil(this.destroy$)).subscribe(data => {
          this.dataSource.data = data
          this.dataChange.emit(data)
        })

      }
      else if (this.listOf.type === 'entity') {

        this.displayedColumns = ['digital', 'domainLabel', 'actions'];

        this.inf.role.sourcesAndDigitalsOfEntity(true, pkProject, this.listOf.pkEntity)

        const rows$ = this.p.inf$.role$.by_fk_entity$.key(this.listOf.pkEntity)
          .pipe(
            switchMap((roles) => combineLatestOrEmpty(values(roles)
              .filter(role => role.fk_property === DfhConfig.PROPERTY_PK_GEOVP11_REFERS_TO)
              .map(role => this.p.dat$.chunk$.by_pk_entity$.key(role.fk_data_subject)
                .pipe(
                  filter(item => !!item),
                  switchMap(domainChunk => this.p.dat$.digital$.by_pk_text$.key(domainChunk.fk_text).pipe(
                    filter(item => !!item),
                    map(texts => latestVersion(texts)),
                    map(digital => ({
                      role: role,
                      domainChunk,
                      domainLabel: this.getStringFromChunk(domainChunk),
                      digital,
                      digitalLabel: digital.string.substr(0, 20) + (digital.string.length > 20 ? '...' : '')
                    } as Row))))
                )
              )))
          )

        this.data$ = rows$;

        this.data$.pipe(takeUntil(this.destroy$)).subscribe(data => {
          this.dataSource.data = data
          this.dataChange.emit(data)
        })
      }

    })


  }

  private getPropertyLabel(row: Row): string {
    return row.role.fk_property === DfhConfig.PROPERTY_PK_GEOVP11_REFERS_TO ? 'Refers To' : '';
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  private getRangeLabel(prevs: ByPk<EntityPreview>, row: Row): string {
    if (row.role && row.role.fk_entity) {
      const e = prevs[row.role.fk_entity];
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
      return "« " + (chunk.quill_doc as QuillDoc).ops.map(op => op.insert).join('') + " »";
    }
  }

  submit() {
    if (this.formGroup.valid) {
      this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
        const role: InfRole = this.mentioningCreateCtrl.value;
        this.inf.role.upsert([role], pkProject).resolved$
          .pipe(first(r => !!r), takeUntil(this.destroy$)).subscribe(resolved => {
            this.create$.next(false)
          })
      })
    }
  }

  remove(row: Row) {
    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
      this.inf.role.remove([row.role], pkProject)
    })
  }

  ngOnDestroy() {
    // this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }



}
