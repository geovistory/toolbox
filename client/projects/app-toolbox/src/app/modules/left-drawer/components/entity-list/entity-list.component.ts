import { Component, HostBinding, OnDestroy } from '@angular/core';
import { ConfigurationPipesService } from '@kleiolab/lib-queries';
import { StateFacade } from '@kleiolab/lib-redux/public-api';
import { WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ListService } from '../../services/list.service';

@Component({
  selector: 'gv-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.css'],
  providers: [
    ListService
  ]
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
