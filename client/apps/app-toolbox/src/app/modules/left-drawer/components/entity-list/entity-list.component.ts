import { Component, HostBinding, OnDestroy } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { ConfigurationPipesService, StateFacade } from '@kleiolab/lib-redux';
import { WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActiveProjectService } from '../../../../services/active-project.service';
import { AddEntityMenuComponent } from '../../../base/components/add-entity-menu/add-entity-menu.component';
import { ListService } from '../../services/list.service';
import { EntitiesTabsComponent } from '../entities-tabs/entities-tabs.component';
import { ListDrawerHeaderComponent } from '../list-drawer-header/list-drawer-header.component';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'gv-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.css'],
  providers: [
    ListService
  ],
  standalone: true,
  imports: [ListDrawerHeaderComponent, AddEntityMenuComponent, EntitiesTabsComponent, MatDividerModule, ListComponent]
})
export class EntityListComponent implements OnDestroy {

  @HostBinding('class.h-100') h = true;
  @HostBinding('class.gv-flex-fh') flexFh = true;

  destroy$ = new Subject<boolean>();


  constructor(
    public p: ActiveProjectService,
    private state: StateFacade,
    private c: ConfigurationPipesService,
    listService: ListService
  ) {
    // set peIt as initial value
    listService.entityType$.next('peIt')
    listService.pkAllowedClasses$ = this.c.pipeClassesOfProject().pipe(
      map(items => items
        .filter(item => item.belongsToCategory?.entities?.showInAddMenu)
        .filter(item => item.projectRel?.enabled_in_entities)
        .map(item => item.dfhClass.pk_class)
      )
    );
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
