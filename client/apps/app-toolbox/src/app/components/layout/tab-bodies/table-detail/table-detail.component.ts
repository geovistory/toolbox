import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ActiveProjectPipesService, InformationBasicPipesService, InformationPipesService, StateFacade } from '@kleiolab/lib-redux';
import { EntityCardHeaderComponent } from '../../../../components/data/entity-card-header/entity-card-header.component';
import { ViewSectionsComponent } from '../../../../components/data/view-sections/view-sections.component';
import { slideInOut } from '../../../../lib/animations/animations';
import { TruncatePipe } from '../../../../pipes/truncate/truncate.pipe';
import { ActiveProjectService } from '../../../../services/active-project.service';
import { EditModeService } from '../../../../services/edit-mode.service';
import { DetailBaseComponent } from '../../../../shared/classes/detail-base-component';
import { TabLayoutService } from '../../../../shared/components/tab-layout/tab-layout.service';
import { TabLayoutComponent } from '../../../../shared/components/tab-layout/tab-layout/tab-layout.component';
import { ViewFieldHasTableValueComponent } from '../../../table-editor/view-field-has-table-value/view-field-has-table-value.component';

export interface TableDetailConfig {
  pkEntity: number,
  filterOnRow?: number

}


@Component({
  selector: 'gv-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.scss'],
  animations: [slideInOut],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EditModeService],
  standalone: true,
  imports: [TabLayoutComponent, EntityCardHeaderComponent, MatDividerModule, NgIf, ViewFieldHasTableValueComponent, MatTabsModule, MatIconModule, ViewSectionsComponent, AsyncPipe]
})
export class TableDetailComponent
  extends DetailBaseComponent<TableDetailConfig>
  implements OnInit {


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
    this.tabLayout.t.setLayoutMode('both')


  }




}
