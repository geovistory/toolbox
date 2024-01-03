import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ActiveProjectPipesService, InformationBasicPipesService, InformationPipesService, StateFacade } from '@kleiolab/lib-redux';
import { slideInOut } from '../../../../lib/animations/animations';
import { DetailBaseComponent } from '../../../../lib/classes/detail-base-component';
import { TableDetailConfig } from '../../../../lib/types/TableDetailConfig';
import { TruncatePipe } from '../../../../pipes/truncate/truncate.pipe';
import { ActiveProjectService } from '../../../../services/active-project.service';
import { EditModeService } from '../../../../services/edit-mode.service';
import { TabLayoutService } from '../../../../services/tab-layout.service';
import { EntityCardHeaderComponent } from '../../../editor/entity-card-header/entity-card-header.component';
import { ViewSectionsComponent } from '../../../editor/view-sections/view-sections.component';
import { ViewFieldHasTableValueComponent } from '../../../table-editor/view-field-has-table-value/view-field-has-table-value.component';
import { TabLayoutComponent } from '../../tab-layout/tab-layout/tab-layout.component';
import { TableDetailService } from './table-detail.service';

@Component({
  selector: 'gv-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.scss'],
  animations: [slideInOut],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EditModeService, TableDetailService],
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
    tableDetailService: TableDetailService,
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
    tableDetailService.registerComponent(this);
  }

  ngOnInit() {
    this.initialize();
    this.tabLayout.t.setLayoutMode('both')


  }




}
