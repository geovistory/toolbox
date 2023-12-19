import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ActiveProjectPipesService, ConfigurationPipesService, Field, InformationBasicPipesService, InformationPipesService, StateFacade } from '@kleiolab/lib-redux';
import { QuillDoc } from '@kleiolab/lib-sdk-lb4';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { P_1864_HAS_VALUE_VERSION_ID } from '../../../../ontome-ids';
import { DetailBaseComponent } from '../../../../shared/classes/detail-base-component';
import { TabLayoutService } from '../../../../shared/components/tab-layout/tab-layout.service';
import { TabLayoutComponent } from '../../../../shared/components/tab-layout/tab-layout/tab-layout.component';
import { TruncatePipe } from '../../../../shared/pipes/truncate/truncate.pipe';
import { ActiveProjectService } from '../../../../shared/services/active-project.service';
import { EntityCardHeaderComponent } from '../../../base/components/entity-card-header/entity-card-header.component';
import { ViewFieldAnnotationsComponent } from '../../../base/components/view-field-annotations/view-field-annotations.component';
import { ViewFieldHasValueVersionComponent } from '../../../base/components/view-field-has-value-version/view-field-has-value-version.component';
import { ViewSectionsComponent } from '../../../base/components/view-sections/view-sections.component';
import { EditModeService } from '../../../base/services/edit-mode.service';
import { slideInOut } from '../../../information/shared/animations';
import { IndexedCharids } from '../../../quill/quill-edit/quill-edit.component';
import { TextDetail2Service } from './text-detail2.service';

export interface TextDetail2Config {
  pkEntity: number
}
@Component({
  selector: 'gv-text-detail2',
  templateUrl: './text-detail2.component.html',
  styleUrls: ['./text-detail2.component.scss'],
  animations: [slideInOut],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    EditModeService,
    TextDetail2Service
  ],
  standalone: true,
  imports: [TabLayoutComponent, EntityCardHeaderComponent, MatDividerModule, NgIf, ViewFieldHasValueVersionComponent, MatTabsModule, MatIconModule, ViewFieldAnnotationsComponent, ViewSectionsComponent, AsyncPipe]
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
    protected override p: ActiveProjectService,
    dialog: MatDialog,
    ref: ChangeDetectorRef,
    ap: ActiveProjectPipesService,
    i: InformationPipesService,
    b: InformationBasicPipesService,
    state: StateFacade,
    truncatePipe: TruncatePipe,
    public override editMode: EditModeService,
    public override tabLayout: TabLayoutService,
    textDetailService: TextDetail2Service
  ) {
    super(
      p,
      dialog,
      ref,
      ap,
      i,
      b,
      truncatePipe,
      state,
      editMode,
      tabLayout
    )
    textDetailService.registerComponent(this)
  }
  ngOnInit(): void {
    this.initialize()
    this.tabLayout.t.setLayoutMode('both')

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

  override ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }





}
