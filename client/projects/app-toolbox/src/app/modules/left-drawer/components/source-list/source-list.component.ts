import { Component, HostBinding, OnDestroy } from '@angular/core';
import { StateFacade } from '@kleiolab/lib-redux';
import { WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { Subject } from 'rxjs';
import { ListService } from '../../services/list.service';


@Component({
  selector: 'gv-source-list',
  templateUrl: './source-list.component.html',
  styleUrls: ['./source-list.component.scss'],
  providers: [
    ListService
  ]
})
export class SourceListComponent implements OnDestroy {

  @HostBinding('class.h-100') h = true;
  @HostBinding('class.gv-flex-fh') flexFh = true;

  destroy$ = new Subject<boolean>();

  constructor(
    public p: ActiveProjectService,
    private state: StateFacade
  ) {
  }

  openEntity(preview: WarEntityPreview) {
    this.p.addEntityTab(preview.pk_entity, preview.fk_class)
  }

  startCreate() {
    this.state.ui.activeProject.setListType('')
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
