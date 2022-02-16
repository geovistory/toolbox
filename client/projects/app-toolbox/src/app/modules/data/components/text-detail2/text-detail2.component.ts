import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActiveProjectPipesService, ConfigurationPipesService, Field, InformationBasicPipesService, InformationPipesService } from '@kleiolab/lib-queries';
import { ReduxMainService } from '@kleiolab/lib-redux';
import { QuillDoc } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { P_1864_HAS_VALUE_VERSION_ID } from 'projects/app-toolbox/src/app/ontome-ids';
import { DetailBaseComponent } from 'projects/app-toolbox/src/app/shared/classes/detail-base-component';
import { TruncatePipe } from 'projects/app-toolbox/src/app/shared/pipes/truncate/truncate.pipe';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { slideInOut } from '../../../information/shared/animations';
import { IndexedCharids } from '../../../quill/quill-edit/quill-edit.component';

export interface TextDetail2Config {
  pkEntity: number
}
@Component({
  selector: 'gv-text-detail2',
  templateUrl: './text-detail2.component.html',
  styleUrls: ['./text-detail2.component.scss'],
  animations: [slideInOut],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextDetail2Component
  extends DetailBaseComponent<TextDetail2Config>
  implements OnInit {

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
    private c: ConfigurationPipesService,
    protected p: ActiveProjectService,
    dialog: MatDialog,
    ref: ChangeDetectorRef,
    ap: ActiveProjectPipesService,
    i: InformationPipesService,
    b: InformationBasicPipesService,
    truncatePipe: TruncatePipe,
    dataService: ReduxMainService,
  ) {
    super(
      p,
      dialog,
      ref,
      ap,
      i,
      b,
      truncatePipe,
      dataService
    )
  }
  ngOnInit(): void {
    this.initialize()
    this.t.setLayoutMode('both')


    this.hasValueVersionField$ = this.fkClass$.pipe(
      switchMap(pkClass => this.c.pipeFields(pkClass).pipe(
        map(fields => fields.find(field => field.isOutgoing && field.property?.fkProperty === P_1864_HAS_VALUE_VERSION_ID))
      ))
    )
    this.characterPositionMap$ = this.quillDoc$.pipe(
      debounceTime(1000),
      map(q => this.createCharacterPositionMap(q))
    )

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
