import { Component, HostBinding, OnDestroy } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { StateFacade } from '@kleiolab/lib-redux';
import { WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { Subject } from 'rxjs';
import { ActiveProjectService } from '../../../../services/active-project.service';
import { AddEntityMenuComponent } from '../../../base/components/add-entity-menu/add-entity-menu.component';
import { ListService } from '../../services/list.service';
import { ListDrawerHeaderComponent } from '../list-drawer-header/list-drawer-header.component';
import { ListComponent } from '../list/list.component';
import { SourcesTabsComponent } from '../sources-tabs/sources-tabs.component';


@Component({
  selector: 'gv-source-list',
  templateUrl: './source-list.component.html',
  styleUrls: ['./source-list.component.scss'],
  providers: [
    ListService
  ],
  standalone: true,
  imports: [ListDrawerHeaderComponent, AddEntityMenuComponent, SourcesTabsComponent, MatDividerModule, ListComponent]
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
