import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActiveProjectPipesService, InformationBasicPipesService, InformationPipesService } from '@kleiolab/lib-queries';
import { ReduxMainService } from '@kleiolab/lib-redux';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { DetailBaseComponent } from 'projects/app-toolbox/src/app/shared/classes/detail-base-component';
import { TabLayout } from 'projects/app-toolbox/src/app/shared/components/tab-layout/tab-layout';
import { TruncatePipe } from 'projects/app-toolbox/src/app/shared/pipes/truncate/truncate.pipe';
import { EditModeService } from '../../../base/services/edit-mode.service';
import { slideInOut } from '../../../information/shared/animations';
import { TabBody } from '../../../projects/containers/project-edit/project-edit.component';

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
  providers: [EditModeService]
})
export class TableDetailComponent
  extends DetailBaseComponent<TableDetailConfig>
  implements OnInit {

  t: TabLayout;
  @Input() tab: TabBody<any>;

  constructor(
    protected p: ActiveProjectService,
    dialog: MatDialog,
    ref: ChangeDetectorRef,
    ap: ActiveProjectPipesService,
    i: InformationPipesService,
    b: InformationBasicPipesService,
    truncatePipe: TruncatePipe,
    dataService: ReduxMainService,
    public editMode: EditModeService
  ) {
    super(
      p,
      dialog,
      ref,
      ap,
      i,
      b,
      truncatePipe,
      dataService,
      editMode
    )
  }

  ngOnInit() {
    this.initialize();
    this.t.setLayoutMode('both')


  }




}
