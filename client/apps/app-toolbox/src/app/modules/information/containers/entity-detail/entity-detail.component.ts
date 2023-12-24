import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ActiveProjectPipesService, InformationBasicPipesService, InformationPipesService, SectionName, StateFacade } from '@kleiolab/lib-redux';
import { ContentComponent } from '../../../../components/data/content/content.component';
import { EntityCardHeaderComponent } from '../../../../components/data/entity-card-header/entity-card-header.component';
import { ViewSectionComponent } from '../../../../components/data/view-section/view-section.component';
import { ViewSectionsComponent } from '../../../../components/data/view-sections/view-sections.component';
import { TruncatePipe } from '../../../../pipes/truncate/truncate.pipe';
import { ActiveProjectService } from '../../../../services/active-project.service';
import { EditModeService } from '../../../../services/edit-mode.service';
import { DetailBaseComponent } from '../../../../shared/classes/detail-base-component';
import { TabLayoutService } from '../../../../shared/components/tab-layout/tab-layout.service';
import { TabLayoutComponent } from '../../../../shared/components/tab-layout/tab-layout/tab-layout.component';
import { FactoidListComponent } from '../../../annotation/components/factoid-list/factoid-list.component';
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
  providers: [EditModeService],
  standalone: true,
  imports: [TabLayoutComponent, EntityCardHeaderComponent, MatDividerModule, NgIf, ViewSectionsComponent, MatTabsModule, MatIconModule, ContentComponent, ViewSectionComponent, FactoidListComponent, AsyncPipe]
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
