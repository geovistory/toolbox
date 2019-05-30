import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActiveProjectService, DatChunk, EntityPreview, IAppState, InfEntityAssociation, SubstoreComponent } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { DfhConfig } from 'app/modules/information/shared/dfh-config';
import { QuillOpsToStrPipe } from 'app/shared/pipes/quill-delta-to-str/quill-delta-to-str.pipe';
import { flatten, indexBy, values } from 'ramda';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { filter, first, map, mergeMap, takeUntil } from 'rxjs/operators';
import { MatSort, MatTableDataSource } from '../../../../../../node_modules/@angular/material';
import { InfActions } from '../../../../core/inf/inf.actions';
import { ByPk } from '../../../../core/store/model';
import { QuillDoc } from '../../../quill';
import { ChunksPks } from '../../../quill/quill-edit/quill-edit.component';


// this is not for state, only for the table view
export interface Row {
  // data for actions
  entityAssociation: InfEntityAssociation;
  domainInfoEntity: EntityPreview;
  domainChunk: DatChunk;
  rangeInfoEntity: EntityPreview;

  // for highlight
  highlight: boolean;

  // columns
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
   * The list consists of entity associations of those properties
   * - refers To
   * - mentions
   * and previews / labels of the associated domain and range
   *
   *
   * type
   * - 'digital-text'
   *   Loads all chunks associated with the digital (with the given pkEntity).
   *   The chunks are the domain of the entity associations of the list.
   * - 'f2-expression'
   *   The persitent item with the given pkEntity is the domain
   *   of the entity associations of the list.
   * - 'geovC5-expression-portion'
   *   The persitent item with the given pkEntity is the domain
   *   of the entity associations of the list.
   * - 'entity'
   *   The persitent item or temporal entity with the given pkEntity is the range
   *   of the entity associations of the list.
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
    private p: ActiveProjectService,
    private inf: InfActions,
    fb: FormBuilder,
    private quillOpsToStr: QuillOpsToStrPipe
  ) {
    this.mentioningCreateCtrl = new FormControl(null, [Validators.required])
    this.formGroup = fb.group({ 'mentioningCreateCtrl': this.mentioningCreateCtrl })
  }

  getBasePath = () => this.basePath;

  ngOnInit() {

    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {

      if (this.listOf.type === 'digital-text') {

        this.p.dat$.chunk.loadChunksOfDigital(this.listOf.pkEntity, pkProject)

        const chunks$ = this.p.dat$.digital$.by_pk_entity$.key(this.listOf.pkEntity).pipe(
          filter(digitalVersions => !!digitalVersions && Object.keys(digitalVersions).length > 0),
          map(digitalVersions => values(digitalVersions)[0].pk_text),
          mergeMap(pkText => this.p.dat$.chunk$.by_fk_text$.key(pkText)),
          map(chunksByPk => values(chunksByPk)),
        )

        const addDomain$ = chunks$.pipe(
          mergeMap(chunks => combineLatest(
            this.p.inf$.entity_association$.by_fk_data_domain$.all$,
            this.chunksToHighligt$
          )
            .pipe(
              map(([easByDataDomain, chunksToHi]) => chunks
                .map(chunk => {
                  const easOfChunk = values(easByDataDomain[chunk.pk_entity]);
                  const partialRows = easOfChunk.map(ea => ({
                    entityAssociation: ea,
                    domainChunk: chunk,
                    highlight: !chunksToHi ? false : chunksToHi.includes(chunk.pk_entity)
                  } as Row))

                  return partialRows;
                })
              ),
              map(rowsNested => (
                flatten(rowsNested) as any as Row[])
                .filter(row => row.entityAssociation)
              )
            )
          ))

        const addRange$ = addDomain$.pipe(
          mergeMap((rows) => {
            const ranges = rows.map(row => row.entityAssociation.fk_info_range)
            const pks = flatten(ranges) as any as number[]; // https://github.com/types/npm-ramda/issues/356
            return combineLatest(pks.map(pk => this.p.streamEntityPreview(pk)))
              .pipe(
                filter(previews => !previews.find(p => p.loading)),
                map(previews => {
                  const prevs = indexBy((i) => i.pk_entity.toString(), previews)
                  rows = rows.map(row => ({
                    ...row,
                    rangeInfoEntity: prevs[row.entityAssociation.fk_info_range],
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

    })


  }

  private getPropertyLabel(row: Row): string {
    return row.entityAssociation.fk_property === DfhConfig.PROPERTY_OF_ORIGIN_PK_GEOVP11_REFERS_TO ? 'Refers To' : '';
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  private getRangeLabel(prevs: ByPk<EntityPreview>, row: Row): string {
    if (row.entityAssociation && row.entityAssociation.fk_info_range) {
      const e = prevs[row.entityAssociation.fk_info_range];
      return [e.entity_label, e.class_label, e.type_label,].join(' ');
    }
  }

  private getDomainLabel(row: Row): string {
    if (row.domainChunk) {
      return "« " + (row.domainChunk.quill_doc as QuillDoc).ops.map(op => op.insert).join('') + " »";
    }
  }

  submit() {
    if (this.formGroup.valid) {
      this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
        const ea: InfEntityAssociation = this.mentioningCreateCtrl.value;
        this.inf.entity_association.upsert([ea], pkProject).resolved$
          .pipe(first(r => !!r), takeUntil(this.destroy$)).subscribe(resolved => {
            this.create$.next(false)
          })
      })
    }
  }

  remove(row: Row) {
    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
      this.inf.entity_association.remove([row.entityAssociation], pkProject)
    })
  }

  ngOnDestroy() {
    // this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }



}
