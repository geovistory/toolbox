import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DfhConfig } from '@kleiolab/lib-config';
import { ActiveProjectPipesService, ConfigurationPipesService, Field, InformationBasicPipesService, InformationPipesService } from '@kleiolab/lib-queries';
import { ReduxMainService } from '@kleiolab/lib-redux';
import { GvFieldPageScope, GvFieldSourceEntity, QuillDoc } from '@kleiolab/lib-sdk-lb4';
import { TabLayout } from 'projects/app-toolbox/src/app/shared/components/tab-layout/tab-layout';
import { TruncatePipe } from 'projects/app-toolbox/src/app/shared/pipes/truncate/truncate.pipe';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { debounceTime, first, map, switchMap, takeUntil } from 'rxjs/operators';
import { IndexedCharids } from '../../../quill/quill-edit/quill-edit.component';

@Component({
  selector: 'gv-text-detail2',
  templateUrl: './text-detail2.component.html',
  styleUrls: ['./text-detail2.component.scss']
})
export class TextDetail2Component implements OnInit, OnDestroy {
  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // path to the substore
  @Input() tabId: string;
  @Input() pkEntity: number;
  @Output() close = new EventEmitter<void>();

  t: TabLayout;
  readonly$ = new BehaviorSubject(false)
  showOntoInfo$ = new BehaviorSubject(false)

  scope$: Observable<GvFieldPageScope>
  fkClass$: Observable<number>;
  source: GvFieldSourceEntity

  hasValueVersionField$: Observable<Field>

  // characterPositionMap$
  // - charid identifies the character
  // - number is the zero-based position of the character in the text
  characterPositionMap$: Observable<IndexedCharids<number>>;

  // annotatedCharsMap$
  // - charid identifies the character
  // - number[] is an array of pk_entity of the annotations referencing the character
  annotatedCharsMap$ = new BehaviorSubject<IndexedCharids<number[]>>({});

  // annotationsToHighlightInList$
  // - number[] the an array of pk_entity of the annotations of the hovered character
  annotationsToHighlightInList$ = new BehaviorSubject<number[]>([]);

  charsToHighlight$ = new BehaviorSubject<IndexedCharids<true>>([]);

  annotationsPinnedInList$ = new BehaviorSubject<number[]>([]);

  quillDoc$ = new BehaviorSubject<QuillDoc>({});

  constructor(
    public ref: ChangeDetectorRef,
    private ap: ActiveProjectPipesService,
    private b: InformationBasicPipesService,
    private dataService: ReduxMainService,
    private c: ConfigurationPipesService,
    private i: InformationPipesService,
    private truncatePipe: TruncatePipe,


  ) { }

  ngOnInit(): void {
    this.t = new TabLayout(this.tabId, this.ref, this.destroy$);
    this.t.setLayoutMode('both')

    this.t.setTabLoading(true)

    this.source = { fkInfo: this.pkEntity }
    this.scope$ = this.ap.pkProject$.pipe(first(), map(pkProject => ({ inProject: pkProject })));
    this.fkClass$ = this.b.pipeClassOfEntity(this.pkEntity)

    this.ap.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
      this.dataService.loadInfResource(this.pkEntity, pkProject)
        .pipe(first(), takeUntil(this.destroy$)).subscribe(loaded => {
          this.t.setTabLoading(false)
        })

    })
    this.hasValueVersionField$ = this.fkClass$.pipe(
      switchMap(pkClass => this.c.pipeFields(pkClass).pipe(
        map(fields => fields.find(field => field.isOutgoing && field.property?.fkProperty === DfhConfig.PROPERTY_PK_HAS_VALUE_VERSION))
      ))
    )
    this.characterPositionMap$ = this.quillDoc$.pipe(
      debounceTime(1000),
      map(q => this.createCharacterPositionMap(q))
    )
    const preview$ = this.ap.streamEntityPreview(this.pkEntity, true)
    const classLabel$ = this.i.pipeClassLabelOfEntity(this.pkEntity)
    const tabTitle$ = combineLatest(preview$, classLabel$).pipe(
      map(([preview, classLabel]) => {
        const trucatedClassLabel = this.truncatePipe.transform(classLabel, ['7']);
        return [trucatedClassLabel, preview.entity_label].filter(i => !!i).join(' - ')
      })
    )
    tabTitle$.pipe(takeUntil(this.destroy$))
      .subscribe((tabTitle) => {
        this.t.setTabTitle(tabTitle)
      })
  }

  public quillDocUpdated(q: QuillDoc) {
    this.quillDoc$.next(q)
  }

  public annotatedCharsMapUpdated(annotatedCharsMap: IndexedCharids<number[]>) {
    this.annotatedCharsMap$.next(annotatedCharsMap)
  }


  private createCharacterPositionMap(q: QuillDoc): { [charid: string]: number } {
    if (!q?.ops?.length) return {}
    const positionMap = {}
    for (let i = 0; i < q.ops.length; i++) {
      const op = q.ops[i];
      if (op.insert && op?.attributes?.charid) positionMap[op?.attributes?.charid] = i
    }
    return positionMap
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }





}
