import { Component, HostBinding, OnDestroy } from '@angular/core';
import { ConfigurationPipesService } from '@kleiolab/lib-queries';
import { WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'gv-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.css']
})
export class EntityListComponent implements OnDestroy {

  @HostBinding('class.h-100') h = true;
  @HostBinding('class.gv-flex-fh') flexFh = true;

  destroy$ = new Subject<boolean>();

  pkAllowedClasses$ = this.c.pipeClassesOfProject().pipe(
    map(items => items
      .filter(item => item.belongsToCategory?.entities?.showInAddMenu)
      .filter(item => item.projectRel?.enabled_in_entities)
      .map(item => item.dfhClass.pk_class)
    )
  );

  constructor(
    public p: ActiveProjectService,
    private c: ConfigurationPipesService,
  ) {
  }


  openEntity(preview: WarEntityPreview) {
    this.p.addEntityTab(preview.pk_entity, preview.fk_class)
  }


  startCreate() {
    this.p.setListType('')
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
