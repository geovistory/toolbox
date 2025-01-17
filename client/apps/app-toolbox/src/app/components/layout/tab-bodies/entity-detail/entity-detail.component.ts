import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ActiveProjectPipesService, InformationBasicPipesService, InformationPipesService, SectionName, StateFacade } from '@kleiolab/lib-redux';
import { TabLayoutComponentInterface } from '../../../../directives/on-activate-tab.directive';
import { slideInOut } from '../../../../lib/animations/animations';
import { DetailBaseComponent } from '../../../../lib/classes/detail-base-component';
import type { EntityDetailConfig } from '../../../../lib/types/EntityDetailConfig';
import { TruncatePipe } from '../../../../pipes/truncate/truncate.pipe';
import { ActiveProjectService } from '../../../../services/active-project.service';
import { EditModeService } from '../../../../services/edit-mode.service';
import { TabLayoutService } from '../../../../services/tab-layout.service';
import { ContentComponent } from '../../../editor/content/content.component';
import { EntityCardHeaderComponent } from '../../../editor/entity-card-header/entity-card-header.component';
import { FactoidListComponent } from '../../../editor/factoid-list/factoid-list.component';
import { ViewSectionComponent } from '../../../editor/view-section/view-section.component';
import { ViewSectionsComponent } from '../../../editor/view-sections/view-sections.component';
import { TabLayoutComponent } from '../../tab-layout/tab-layout/tab-layout.component';

@Component({
  selector: 'gv-entity-detail',
  templateUrl: './entity-detail.component.html',
  styleUrls: ['./entity-detail.component.scss'],
  animations: [slideInOut],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EditModeService, TruncatePipe],
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
