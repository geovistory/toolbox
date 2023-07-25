import { Component, HostBinding, OnDestroy } from '@angular/core';
import { ConfigurationPipesService } from '@kleiolab/lib-queries';
import { WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'gv-source-list',
  templateUrl: './source-list.component.html',
  styleUrls: ['./source-list.component.scss']
})
export class SourceListComponent implements OnDestroy {

  @HostBinding('class.h-100') h = true;
  @HostBinding('class.gv-flex-fh') flexFh = true;

  destroy$ = new Subject<boolean>();

  pkClassesOfAddBtn$: Observable<number[]>

  constructor(
    public p: ActiveProjectService,
    private c: ConfigurationPipesService,
  ) {
    this.pkClassesOfAddBtn$ = this.c.pipeClassesOfProject().pipe(
      map(items => items
        .filter(item => item.belongsToCategory?.sources?.showInAddMenu)
        .map(item => item.dfhClass.pk_class)
      )
    );
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
