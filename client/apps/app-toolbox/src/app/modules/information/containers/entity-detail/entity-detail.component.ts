import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActiveProjectPipesService, InformationBasicPipesService, InformationPipesService, SectionName, StateFacade } from '@kleiolab/lib-redux';
import { ActiveProjectService } from '../../../../core/active-project/active-project.service';
import { TabLayoutService } from '../../../../shared/components/tab-layout/tab-layout.service';
import { TruncatePipe } from '../../../../shared/pipes/truncate/truncate.pipe';
import { DetailBaseComponent } from '../../../../shared/classes/detail-base-component';
import { EditModeService } from '../../../base/services/edit-mode.service';
import { TabLayoutComponentInterface } from '../../../projects/directives/on-activate-tab.directive';
import { slideInOut } from '../../shared/animations';
export interface EntityDetailConfig {
  pkEntity: number,
  showContentTree: boolean,
  // showLinkedSources: boolean
  showLinkedEntities: boolean
  showFactoids: boolean
  // showAnnotations: boolean // anntotations where this entity is referred to by an annotation
}

// @WithSubStore({
//   // localReducer: entityDetailReducer,
//   basePathMethodName: 'getBasePath'
// })
@Component({
  selector: 'gv-entity-detail',
  templateUrl: './entity-detail.component.html',
  styleUrls: ['./entity-detail.component.scss'],
  animations: [slideInOut],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EditModeService]
})
export class EntityDetailComponent
  extends DetailBaseComponent<EntityDetailConfig>
  implements TabLayoutComponentInterface, OnInit, OnDestroy {

  linkedSources = SectionName.linkedSources;
  linkedEntities = SectionName.linkedEntities;

  constructor(
    protected override p: ActiveProjectService,
    dialog: MatDialog,
    ref: ChangeDetectorRef,
    ap: ActiveProjectPipesService,
    i: InformationPipesService,
    b: InformationBasicPipesService,
    truncatePipe: TruncatePipe,
    state: StateFacade,
    public override editMode: EditModeService,
    public override tabLayout: TabLayoutService
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
  }

  ngOnInit() {
    this.initialize();
    this.tabLayout.t.defaultSizeRight = 33;
  }

}
